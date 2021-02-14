// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// better-sqlite3 on worker threats for slow queries: https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/threads.md

import { NextApiRequest, NextApiResponse } from "next";
import { getLatestDatabase, loadLatestDatabase } from "../../../../helpers/api/db";
import { IGame, GameResult } from "../../../../helpers/interfaces/db/games";
import { generatePtnNinjaLink, playTakThemeString } from "../../../../helpers/ptnninja";
import { createPtn } from "../../../../helpers/ptn";

export type Result = {
  puzzleNotation: string
  puzzleUrl: string
  puzzleId: number
  puzzleSize: number
};

const firstValidGameDate = 1461430858755;

export default async (req: NextApiRequest, res: NextApiResponse<Result>) => {

  const boardSize = parseInt(req.query.boardSize as string, 10);
  const puzzleId = parseInt(req.query.puzzleId as string, 10);
  console.log(`GET puzzle random boardsize='${boardSize}'`);

  const latestDbPath = getLatestDatabase();
  if (!latestDbPath) {
    console.error("No DB found");
    throw new Error("No DB found");
  }

  const db = loadLatestDatabase(latestDbPath);
  if (typeof db === "string") {
    console.error("Failed to load db", db, latestDbPath);
    throw new Error("Failed to load db");
  }

  const game = db.prepare("SELECT * FROM games WHERE (result = ? OR result = ?) and size = ? and date > ? ORDER BY id LIMIT 1 OFFSET ?")
    .get(GameResult.WhiteRoadWin, GameResult.BlackRoadWin, boardSize, firstValidGameDate, puzzleId) as IGame;
  db.close();

  const actualPuzzleId = puzzleId; //(puzzleId as unknown as number) % games.length;

  if (!game) throw new Error(`No game of size '${boardSize}' found`);
  const { ptn, moveCount } = createPtn(game, 1);
  console.log(game);
  console.log(game.notation);
  console.log(ptn);

  const ptnNinjaHref = generatePtnNinjaLink(ptn, moveCount - 1);
  console.log(ptnNinjaHref);

  res.status(200).json({
    puzzleNotation: ptn,
    puzzleUrl: ptnNinjaHref,
    puzzleId: actualPuzzleId,
    puzzleSize: boardSize,
  });
}
