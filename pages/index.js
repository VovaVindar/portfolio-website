import Head from "next/head";
import styles from "./Home.module.css";
import Scrollbar from "@/components/Scrollbar";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import { TransitionContext } from "@/context/TransitionContext";
import { useContext, useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ startPageAnimation, isAnimating }) {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const onloadRefs = useRef([]);

  /*useGSAP(
    () => {
      timeline.add(gsap.to(container.current, { y: 10, scale: 0.8 }));
    },
    { scope: container }
  );*/

  useEffect(() => {
    onloadRefs.current = onloadRefs.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  useGSAP(() => {
    if (onloadRefs.current.length) {
      var staggerInterval = 0.085;
      var duration = 1.5;

      ScrollTrigger.batch(onloadRefs.current, {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { autoAlpha: 0, filter: "blur(1.5px)" },
            {
              autoAlpha: startPageAnimation ? 1 : 0,
              filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
              duration: duration,
              ease: "power4.inOut",
              stagger: function (index, target, list) {
                if (index <= 2) {
                  return 0;
                } else if (index >= 3 && index <= 7) {
                  return 1 * staggerInterval;
                } else if (index >= 8 && index <= 10) {
                  return 2 * staggerInterval;
                } else if (index >= 11 && index <= 13) {
                  return 3 * staggerInterval;
                } else if (index < 35) {
                  return (index - 9) * staggerInterval;
                } else if (index >= 35 && index <= 36) {
                  return 26 * staggerInterval;
                } else {
                  return (index - 10) * staggerInterval;
                }
              },
            }
          );
        },
        once: true,
      });
    }
  }, [startPageAnimation]);

  return (
    <>
      <Head>
        <title>Vova Vindar</title>
      </Head>
      <Scrollbar text={"Contact"} href="/contact" isAnimating={isAnimating} />
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
                <p ref={(el) => (onloadRefs.current[8] = el)}>
                  Website Design,
                </p>
                <p ref={(el) => (onloadRefs.current[11] = el)}>
                  Product Design,
                </p>
                <p ref={(el) => (onloadRefs.current[14] = el)}>
                  Brand Identity
                </p>
              </div>
              <div
                className={`${styles["chair"]}`}
                ref={(el) => (onloadRefs.current[4] = el)}
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
                <p ref={(el) => (onloadRefs.current[5] = el)}>Websites,</p>
                <p ref={(el) => (onloadRefs.current[9] = el)}>WebGL,</p>
                <p ref={(el) => (onloadRefs.current[12] = el)}>NextJS</p>
              </div>
              <div
                className={`${styles["chair"]}`}
                ref={(el) => (onloadRefs.current[6] = el)}
              ></div>
            </div>
            <div>
              <span
                className="text-header-3"
                ref={(el) => (onloadRefs.current[2] = el)}
              >
                Specializing In:
              </span>
              <p ref={(el) => (onloadRefs.current[7] = el)}>AI,</p>
              <p ref={(el) => (onloadRefs.current[10] = el)}>Fintech,</p>
              <p ref={(el) => (onloadRefs.current[13] = el)}>Technology</p>
            </div>
          </div>
          <div className={`${styles["description"]} text-body-2`}>
            <div
              className={`${styles["timeline"]}`}
              ref={(el) => (onloadRefs.current[15] = el)}
            >
              <span className="text-header-3">From 2019</span>
              <div></div>
              <span className="text-header-3">To Present</span>
            </div>
            <div className={`${styles["desktop"]}`}>
              <p ref={(el) => (onloadRefs.current[16] = el)}>
                I’m a detail-oriented designer-developer based
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[17] = el)}>
                in Vancouver, obsessed with creating immersive
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[18] = el)}>
                websites and intuitive digital interfaces.
              </p>
              <br />
              <p ref={(el) => (onloadRefs.current[19] = el)}>
                During my career, I’ve had the privilege of working
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[20] = el)}>
                with clients like UNIT9, Twitch, Dolce & Gabbana,
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[21] = el)}>
                Paradigm, and Cognition, helping them explore
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[22] = el)}>
                new business ideas, shape their identity, and
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[23] = el)}>
                {" "}
                secure early-stage funding.
              </p>
            </div>
            <div className={`${styles["mobile"]}`}>
              <p ref={(el) => (onloadRefs.current[24] = el)}>
                I’m a detail-oriented designer-developer
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[25] = el)}>
                based in Vancouver, obsessed with
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[26] = el)}>
                creating immersive websites and
              </p>{" "}
              <p
                ref={(el) => (onloadRefs.current[27] = el)}
                className={`${styles["align-left"]}`}
              >
                intuitive digital interfaces.
              </p>
              <br />
              <p ref={(el) => (onloadRefs.current[28] = el)}>
                During my career, I’ve had the privilege
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[29] = el)}>
                of working with clients like UNIT9,
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[30] = el)}>
                Twitch, Dolce & Gabbana, Paradigm, and
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[31] = el)}>
                Cognition, helping them explore new
              </p>{" "}
              <p ref={(el) => (onloadRefs.current[32] = el)}>
                business ideas, shape their identity, and
              </p>{" "}
              <p
                ref={(el) => (onloadRefs.current[33] = el)}
                className={`${styles["align-left"]}`}
              >
                secure early-stage funding.
              </p>
            </div>
          </div>
        </div>
        <Marquee startPageAnimation={startPageAnimation} />
        <div className={`${styles["clients"]}`}>
          <div className={`text-body-1`}>
            <div className={`text-body-2`}>
              <p ref={(el) => (onloadRefs.current[35] = el)}>
                Selected Clients:
              </p>
            </div>
          </div>
          <div>
            <div
              className={`${styles["client-container"]}`}
              ref={(el) => (onloadRefs.current[36] = el)}
            >
              <h1>Paradigm</h1>
              <span className="text-header-3">
                Web, Product, Brand, Deck, Dev
              </span>
            </div>
            <div
              className={`${styles["client-container"]}`}
              ref={(el) => (onloadRefs.current[37] = el)}
            >
              <h1>Cognition</h1>
              <span className="text-header-3">Web</span>
            </div>
            <div
              className={`${styles["client-container"]} ${styles["rove"]}`}
              ref={(el) => (onloadRefs.current[38] = el)}
            >
              <h1>Rove Card</h1>
              <span className="text-header-3">Web, Graphic, App, Deck</span>
            </div>
            <div
              className={`${styles["client-container"]}`}
              ref={(el) => (onloadRefs.current[39] = el)}
            >
              <h1>Dolce & Gabbana</h1>
              <span className="text-header-3">Web, Metaverse</span>
            </div>
            <div
              className={`${styles["client-container"]}`}
              ref={(el) => (onloadRefs.current[40] = el)}
            >
              <h1>PRJCTR Institute</h1>
              <span className="text-header-3">Mentoring</span>
            </div>
            <div
              className={`${styles["client-container"]}`}
              ref={(el) => (onloadRefs.current[41] = el)}
            >
              <h1>Twitch</h1>
              <span className="text-header-3">Game UI, Graphic</span>
            </div>
            <div
              className={`${styles["client-container"]} ${styles["jpw"]}`}
              ref={(el) => (onloadRefs.current[42] = el)}
            >
              <h1>Jon-Paul Wheatley</h1>
              <span className="text-header-3">Web</span>
            </div>
          </div>
        </div>
        <Work />
        <Footer />
      </div>
    </>
  );
}
