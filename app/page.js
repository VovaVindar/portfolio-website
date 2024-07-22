import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles["skills"]}>
        <div>
          <h3>Digital Designer:</h3>
          <p>
            Art Direction,
            <br />
            Website Design, <br />
            Product Design,
            <br />
            Brand Identity
          </p>
        </div>
        <div>
          <h3>& Developer:</h3>
          <p>
            Websites,
            <br />
            WebGL,
            <br />
            NextJS
          </p>
        </div>
        <div>
          <h3>Specializing In:</h3>
          <p>
            AI,
            <br />
            Fintech,
            <br />
            Technology
          </p>
        </div>
      </div>
    </main>
  );
}
