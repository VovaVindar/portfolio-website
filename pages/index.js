import Head from "next/head";
import styles from "./Home.module.css";
import Scrollbar from "@/components/Scrollbar";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import gsap from "gsap";
import { useContext, useRef, useEffect } from "react";

export default function Home({ firstLoadAnimation }) {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const onloadRefs = useRef([]);

  useEffect(() => {
    onloadRefs.current = onloadRefs.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  useGSAP(
    () => {
      if (container.current) {
        timeline.add(gsap.to(container.current, { opacity: 0 }));
      }
    },
    { scope: container }
  );

  useGSAP(() => {
    if (onloadRefs.current.length) {
      var staggerInterval = 0.095;
      var duration = 1.5;

      gsap.fromTo(
        onloadRefs.current,
        { opacity: 0 },
        {
          opacity: `${firstLoadAnimation ? 1 : 0}`,
          duration: duration,
          delay: 1,
          ease: "power4.inOut",
          stagger: function (index, target, list) {
            if (index <= 2) {
              return 0;
            } else if (index >= 3 && index <= 5) {
              return 1 * staggerInterval;
            } else if (index >= 6 && index <= 8) {
              return 2 * staggerInterval;
            } else if (index >= 9 && index <= 11) {
              return 3 * staggerInterval;
            } else {
              return (index - 7) * staggerInterval;
            }
          },
        }
      );
    }
  }, [firstLoadAnimation]);

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
                <span
                  className="text-header-3"
                  ref={(el) => (onloadRefs.current[0] = el)}
                >
                  Digital Designer:
                </span>
                <p ref={(el) => (onloadRefs.current[3] = el)}>Art Direction,</p>
                <p ref={(el) => (onloadRefs.current[6] = el)}>
                  Website Design,
                </p>
                <p ref={(el) => (onloadRefs.current[9] = el)}>
                  Product Design,
                </p>
                <p ref={(el) => (onloadRefs.current[12] = el)}>
                  Brand Identity
                </p>
              </div>
              <div
                className={`${styles["chair"]}`}
                style={{ opacity: 0 }}
              ></div>
            </div>
            <div className={`${styles["chair-container"]}`}>
              <div>
                <span
                  className="text-header-3"
                  ref={(el) => (onloadRefs.current[1] = el)}
                >
                  & Developer:
                </span>
                <p ref={(el) => (onloadRefs.current[4] = el)}>Websites,</p>
                <p ref={(el) => (onloadRefs.current[7] = el)}>WebGL,</p>
                <p ref={(el) => (onloadRefs.current[10] = el)}>NextJS</p>
              </div>
              <div
                className={`${styles["chair"]}`}
                style={{ opacity: 0 }}
              ></div>
            </div>
            <div>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[2] = el)}
              >
                Specializing In:
              </span>
              <p ref={(el) => (onloadRefs.current[5] = el)}>AI,</p>
              <p ref={(el) => (onloadRefs.current[8] = el)}>Fintech,</p>
              <p ref={(el) => (onloadRefs.current[11] = el)}>Technology</p>
            </div>
          </div>
          <div
            className={`${styles["description"]} text-body-2`}
            style={{ "--progress-width": `100%` }}
          >
            <div
              className={`${styles["timeline"]}`}
              ref={(el) => (onloadRefs.current[13] = el)}
            >
              <span className="text-header-3">From 2019</span>
              <div></div>
              <span className="text-header-3">To Present</span>
            </div>
            <div className={`${styles["desktop"]}`}>
              <p ref={(el) => (onloadRefs.current[14] = el)}>
                I’m a detail-oriented designer-developer based
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[15] = el)}>
                in Vancouver, obsessed with creating immersive
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[16] = el)}>
                websites and intuitive digital interfaces.
              </p>
              <br />
              <p ref={(el) => (onloadRefs.current[17] = el)}>
                During my career, I’ve had the privilege of working
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[18] = el)}>
                with clients like UNIT9, Twitch, Dolce & Gabbana,
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[19] = el)}>
                Paradigm, and Cognition, helping them explore
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[20] = el)}>
                new business ideas, shape their identity, and
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[21] = el)}>
                {" "}
                secure early-stage funding.
              </p>
            </div>
            <div className={`${styles["mobile"]}`}>
              <p ref={(el) => (onloadRefs.current[22] = el)}>
                I’m a detail-oriented designer-developer
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[23] = el)}>
                based in Vancouver, obsessed with
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[24] = el)}>
                creating immersive websites and
              </p>{" "}
              <p
                ref={(el) => (onloadRefs.current[25] = el)}
                className={`${styles["align-left"]}`}
              >
                intuitive digital interfaces.
              </p>
              <br />
              <p ref={(el) => (onloadRefs.current[26] = el)}>
                During my career, I’ve had the privilege
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[27] = el)}>
                of working with clients like UNIT9,
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[28] = el)}>
                Twitch, Dolce & Gabbana, Paradigm, and
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[29] = el)}>
                Cognition, helping them explore new
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[30] = el)}>
                business ideas, shape their identity, and
              </p>{" "}
              <p
                ref={(el) => (onloadRefs.current[31] = el)}
                className={`${styles["align-left"]}`}
              >
                secure early-stage funding.
              </p>
            </div>
          </div>
        </div>
        <Marquee style={{ opacity: 0 }} />
        <div className={`${styles["clients"]}`}>
          <div className={`text-body-1`}>
            <div className={`text-body-2`}>
              <p ref={(el) => (onloadRefs.current[32] = el)}>
                Selected Clients:
              </p>
            </div>
          </div>
          <div>
            <div className={`${styles["client-container"]}`}>
              <h1 ref={(el) => (onloadRefs.current[33] = el)}>Paradigm</h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[34] = el)}
              >
                Web, Product, Brand, Deck, Dev
              </span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1 ref={(el) => (onloadRefs.current[35] = el)}>Cognition</h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[36] = el)}
              >
                Web
              </span>
            </div>
            <div className={`${styles["client-container"]} ${styles["rove"]}`}>
              <h1 ref={(el) => (onloadRefs.current[37] = el)}>Rove Card</h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[38] = el)}
              >
                Web, Graphic, App, Deck
              </span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1 ref={(el) => (onloadRefs.current[39] = el)}>
                Dolce & Gabbana
              </h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[40] = el)}
              >
                Web, Metaverse
              </span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1 ref={(el) => (onloadRefs.current[41] = el)}>
                PRJCTR Institute
              </h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[42] = el)}
              >
                Mentoring
              </span>
            </div>
            <div className={`${styles["client-container"]}`}>
              <h1 ref={(el) => (onloadRefs.current[43] = el)}>Twitch</h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[44] = el)}
              >
                Game UI, Graphic
              </span>
            </div>
            <div className={`${styles["client-container"]} ${styles["jpw"]}`}>
              <h1 ref={(el) => (onloadRefs.current[45] = el)}>
                Jon-Paul Wheatley
              </h1>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[46] = el)}
              >
                Web
              </span>
            </div>
          </div>
        </div>
        <Work />
        <Footer />
      </div>
    </>
  );
}
