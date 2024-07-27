import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={`${styles["home-container"]}`}>
      <div className={`${styles["contact-scroller"]} text-body-1-uppercase`}>
        <p>Contact</p>
      </div>
      <div className={`${styles["hero-container"]}`}>
        <div className={`${styles["skills"]} text-body-1`}>
          <div className={`${styles["chair-container"]}`}>
            <div>
              <h3>Digital Designer:</h3>
              <p>Art Direction,</p>
              <p>Website Design,</p>
              <p>Product Design,</p>
              <p>Brand Identity</p>
            </div>
            <div className={`${styles["chair"]}`}></div>
          </div>
          <div className={`${styles["chair-container"]}`}>
            <div>
              <h3>& Developer:</h3>
              <p>Websites,</p>
              <p>WebGL,</p>
              <p>NextJS</p>
            </div>
            <div className={`${styles["chair"]}`}></div>
          </div>
          <div>
            <h3>Specializing In:</h3>
            <p>AI,</p>
            <p>Fintech,</p>
            <p>Technology</p>
          </div>
        </div>
        <div className={`${styles["description"]} text-body-2`}>
          <div className={`${styles["timeline"]}`}>
            <h3>From 2019</h3>
            <div></div>
            <h3>To Present</h3>
          </div>
          <div className={`${styles["desktop"]}`}>
            <p>I’m a detail-oriented designer-developer based</p>{" "}
            <p>in Vancouver, obsessed with creating immersive</p>{" "}
            <p>websites and intuitive digital interfaces.</p>
            <br />
            <p>During my career, I’ve had the privilege of working</p>{" "}
            <p>with clients like UNIT9, Twitch, Dolce & Gabbana,</p>{" "}
            <p>Paradigm, and Cognition, helping them explore</p>{" "}
            <p>new business ideas, shape their identity, and</p>{" "}
            <p> secure early-stage funding.</p>
          </div>
          <div className={`${styles["mobile"]}`}>
            <p>I’m a detail-oriented designer-developer</p>{" "}
            <p>based in Vancouver, obsessed with</p>{" "}
            <p>creating immersive websites and</p>{" "}
            <p className={`${styles["align-left"]}`}>
              intuitive digital interfaces.
            </p>
            <br />
            <p>During my career, I’ve had the privilege</p>{" "}
            <p>of working with clients like UNIT9,</p>{" "}
            <p>Twitch, Dolce & Gabbana, Paradigm, and</p>{" "}
            <p>Cognition, helping them explore new</p>{" "}
            <p>business ideas, shape their identity, and</p>{" "}
            <p className={`${styles["align-left"]}`}>
              secure early-stage funding.
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles["marquee-container"]}`}>
        <div className={`${styles["marquee"]}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`${styles["clients"]}`}>
        <div className={`text-body-1`}>
          <div className={`text-body-2`}>
            <p>Selected Clients:</p>
          </div>
        </div>
        <div>
          <div className={`${styles["client-container"]}`}>
            <h1>Paradigm</h1>
            <h3>Web, Product, Brand, Deck, Dev</h3>
          </div>
          <div className={`${styles["client-container"]}`}>
            <h1>Cognition</h1>
            <h3>Web</h3>
          </div>
          <div className={`${styles["client-container"]} ${styles["rove"]}`}>
            <h1>Rove Card</h1>
            <h3>Web, Graphic, App, Deck</h3>
          </div>
          <div className={`${styles["client-container"]}`}>
            <h1>Dolce & Gabbana</h1>
            <h3>Web, Metaverse</h3>
          </div>
          <div className={`${styles["client-container"]}`}>
            <h1>PRJCTR Institute</h1>
            <h3>Mentoring</h3>
          </div>
          <div className={`${styles["client-container"]}`}>
            <h1>Twitch</h1>
            <h3>Game UI, Graphic</h3>
          </div>
          <div className={`${styles["client-container"]} ${styles["jpw"]}`}>
            <h1>Jon-Paul Wheatley</h1>
            <h3>Web</h3>
          </div>
        </div>
      </div>
      <div className={`${styles["work"]} text-body-1-uppercase`}>
        <h2>Selected Work</h2>
        <div className={`text-body-1`}></div>
        <div className={`text-header-1`}></div>
      </div>
      <div className={`${styles["footer-container"]} text-body-1`}>
        <div className={`${styles["footer-top"]}`}>
          <div>
            <h3>Pacific Time:</h3>
            <p>3:21 AM,</p>
            <p>Vancouver,</p>
            <p>Canada</p>
          </div>
          <div>
            <h3>Social:</h3>
            <p>LinkedIn,</p>
            <p>Instagram,</p>
            <p>Dribbble</p>
          </div>
          <div>
            <h3>Colophon:</h3>
            <p>Fonts by Type.Weltkern</p>
            <p>and Monotype.</p>
          </div>
        </div>
        <div className={`${styles["footer-bottom"]}`}>
          <div>
            <div className="text-body-3">
              <p>2024 ©</p>
            </div>
          </div>
          <div className="text-body-3">
            <p>
              Privacy <span>Policy</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
