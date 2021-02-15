import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tak Puzzles</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tak Puzzles
        </h1>

        <p className={styles.description}>
          Practice seeing roads by selecting a board size
        </p>

        <div className={styles.grid}>
          <Link href="/puzzle?boardSize=4">
            <a className={styles.card}>
              <h3>4x4 Road Puzzles</h3>
            </a>
          </Link>
          <Link href="/puzzle?boardSize=5">
            <a className={styles.card}>
              <h3>5x5 Road Puzzles</h3>
            </a>
          </Link>
          <Link href="/puzzle?boardSize=6">
            <a className={styles.card}>
              <h3>6x6 Road Puzzles</h3>
            </a>
          </Link>
          <Link href="/puzzle?boardSize=7">
            <a className={styles.card}>
              <h3>7x7 Road Puzzles</h3>
            </a>
          </Link>

          {/* <Link href="/player/nitzel">
            <a className={styles.card}>
              <h3>Played games &rarr;</h3>
              <p>All the history</p>
            </a>
          </Link> */}

          <p className={styles.description}>
            This website is work in progress. If you experience problems or have suggestions,
            please contact <code>nitzel#9159</code> on discord or <a className={styles.link} href="https://github.com/nitzel/tak-tinue-puzzles/issues">create an issue on github</a>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a className={styles.link} href="https://github.com/nitzel/tak-tinue-puzzles" target="_blank">
          Source on GitHub
        </a>
      </footer>
    </div>
  )
}
