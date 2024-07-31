import Head from "next/head";
import styles from "./Home.module.css";
import Scrollbar from "@/components/scrollbar";
import Marquee from "@/components/marquee";
import Work from "@/components/work";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import gsap from "gsap";
import { useContext, useRef, useEffect } from "react";

export default function Home() {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 }
      );
      timeline.add(gsap.to(container.current, { opacity: 0 }));
    },
    { scope: container }
  );

  return (
    <>
      <Head>
        <title>Vova Vindar</title>
      </Head>
      <Scrollbar text={"Contact"} href="/contact" />
      <div ref={container} className={`${styles["home-container"]}`}>
        <div className={`${styles["hero-container"]}`}>
          <div className={`${styles["skills"]} text-body-1`}>
            <div className={`${styles["chair-container"]}`}>
              <div>
                <span className="text-header-3">Digital Designer:</span>
                <p>Art Direction,</p>
                <p>Website Design,</p>
                <p>Product Design,</p>
                <p>Brand Identity</p>
              </div>
              <div className={`${styles["chair"]}`}></div>
            </div>
            <div className={`${styles["chair-container"]}`}>
              <div>
                <span className="text-header-3">& Developer:</span>
                <p>Websites,</p>
                <p>WebGL,</p>
                <p>NextJS</p>
              </div>
              <div className={`${styles["chair"]}`}></div>
            </div>
            <div>
              <span className="text-header-3">Specializing In:</span>
              <p>AI,</p>
              <p>Fintech,</p>
              <p>Technology</p>
            </div>
          </div>
          <div className={`${styles["description"]} text-body-2`}>
            <div className={`${styles["timeline"]}`}>
              <span className="text-header-3">From 2019</span>
              <div></div>
              <span className="text-header-3">To Present</span>
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
        <Marquee />
        <div className={`${styles["clients"]}`}>
          <div className={`text-body-1`}>
            <div className={`text-body-2`}>
              <p>Selected Clients:</p>
            </div>
          </div>
          <div>
            <div className={`${styles["client-container"]}`}>
              <h1>Paradigm</h1>
              <span className="text-header-3">
                Web, Product, Brand, Deck, Dev
              </span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1>Cognition</h1>
              <span className="text-header-3">Web</span>
            </div>
            <div className={`${styles["client-container"]} ${styles["rove"]}`}>
              <h1>Rove Card</h1>
              <span className="text-header-3">Web, Graphic, App, Deck</span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1>Dolce & Gabbana</h1>
              <span className="text-header-3">Web, Metaverse</span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1>PRJCTR Institute</h1>
              <span className="text-header-3">Mentoring</span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1>Twitch</h1>
              <span className="text-header-3">Game UI, Graphic</span>
            </div>
            <div className={`${styles["client-container"]} ${styles["jpw"]}`}>
              <h1>Jon-Paul Wheatley</h1>
              <span className="text-header-3">Web</span>
            </div>
          </div>
        </div>
        <Work />
        <div className={`${styles["footer-container"]} text-body-1`}>
          <div className={`${styles["footer-top"]}`}>
            <div>
              <span className="text-header-3">Pacific Time:</span>
              <p>3:21 AM,</p>
              <p>Vancouver,</p>
              <p>Canada</p>
            </div>
            <div>
              <span className="text-header-3">Social:</span>
              <p>LinkedIn,</p>
              <p>Instagram,</p>
              <p>Dribbble</p>
            </div>
            <div>
              <span className="text-header-3">Colophon:</span>
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
                <span>
                  Privacy <span>Policy</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
