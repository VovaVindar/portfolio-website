import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";
import DesignerChair from "@/components/Chairs/DesignerChair";
import Magnetic from "@/components/Magnetic";

const Hero = ({ staggerInterval, duration, easing, startPageAnimation }) => {
  const heroOnload = useRef([]);

  useEffect(() => {
    heroOnload.current = heroOnload.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  useGSAP(() => {
    if (heroOnload.current.length) {
      gsap.fromTo(
        // Hero onload
        heroOnload.current,
        { autoAlpha: 0, filter: "blur(1.5px)", color: "red" },
        {
          autoAlpha: startPageAnimation ? 1 : 0,
          filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
          color: "#0F1010",
          duration: duration,
          delay: 0.4,
          ease: easing,
          stagger: (index) => heroStagger(index, staggerInterval),
        }
      );
    }
  }, [startPageAnimation]);

  const heroStagger = (index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 7) return 1 * interval;
    if (index >= 8 && index <= 10) return 2 * interval;
    if (index >= 11 && index <= 13) return 3 * interval;
    if (index < 35) return (index - 9) * interval;
    if (index >= 35 && index <= 36) return 26 * interval;
    return (index - 10) * interval;
  };

  return (
    <div className={`${styles["hero-container"]}`}>
      <div className={`${styles["skills"]} text-body-1`}>
        <div className={`${styles["chair-container"]}`}>
          <div>
            <span
              className="text-header-3"
              ref={(el) => (heroOnload.current[0] = el)}
            >
              Digital Designer:
            </span>
            <p ref={(el) => (heroOnload.current[3] = el)}>Art Direction,</p>
            <p ref={(el) => (heroOnload.current[8] = el)}>Website Design,</p>
            <p ref={(el) => (heroOnload.current[11] = el)}>Product Design,</p>
            <p ref={(el) => (heroOnload.current[14] = el)}>Brand Identity</p>
          </div>
          <div
            className={`${styles["chair"]}`}
            ref={(el) => (heroOnload.current[4] = el)}
          >
            <Magnetic>
              <DesignerChair />
            </Magnetic>
          </div>
        </div>
        <div className={`${styles["chair-container"]}`}>
          <div>
            <span
              className="text-header-3"
              ref={(el) => (heroOnload.current[1] = el)}
            >
              & Developer:
            </span>
            <p ref={(el) => (heroOnload.current[5] = el)}>Websites,</p>
            <p ref={(el) => (heroOnload.current[9] = el)}>WebGL,</p>
            <p ref={(el) => (heroOnload.current[12] = el)}>NextJS</p>
          </div>
          <div
            className={`${styles["chair"]}`}
            ref={(el) => (heroOnload.current[6] = el)}
          >
            <Magnetic>
              <DesignerChair />
            </Magnetic>
          </div>
        </div>
        <div>
          <span
            className="text-header-3"
            ref={(el) => (heroOnload.current[2] = el)}
          >
            Specializing In:
          </span>
          <p ref={(el) => (heroOnload.current[7] = el)}>AI,</p>
          <p ref={(el) => (heroOnload.current[10] = el)}>Fintech,</p>
          <p ref={(el) => (heroOnload.current[13] = el)}>Technology</p>
        </div>
      </div>
      <div className={`${styles["description"]} text-body-2`}>
        <div
          className={`${styles["timeline"]}`}
          ref={(el) => (heroOnload.current[15] = el)}
        >
          <span className="text-header-3">From 2019</span>
          <div></div>
          <span className="text-header-3">To Present</span>
        </div>
        <div className={`${styles["desktop"]}`}>
          <p ref={(el) => (heroOnload.current[16] = el)}>
            I’m a detail-oriented designer-developer based
          </p>{" "}
          <p ref={(el) => (heroOnload.current[17] = el)}>
            in Vancouver, obsessed with creating immersive
          </p>{" "}
          <p ref={(el) => (heroOnload.current[18] = el)}>
            websites and intuitive digital interfaces.
          </p>
          <br />
          <p ref={(el) => (heroOnload.current[19] = el)}>
            During my career, I’ve had the privilege of working
          </p>{" "}
          <p ref={(el) => (heroOnload.current[20] = el)}>
            with clients like UNIT9, Twitch, Dolce & Gabbana,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[21] = el)}>
            Paradigm, and Cognition, helping them explore
          </p>{" "}
          <p ref={(el) => (heroOnload.current[22] = el)}>
            new business ideas, shape their identity, and
          </p>{" "}
          <p ref={(el) => (heroOnload.current[23] = el)}>
            {" "}
            secure early-stage funding.
          </p>
        </div>
        <div className={`${styles["mobile"]}`}>
          <p ref={(el) => (heroOnload.current[24] = el)}>
            I’m a detail-oriented designer-developer
          </p>{" "}
          <p ref={(el) => (heroOnload.current[25] = el)}>
            based in Vancouver, obsessed with
          </p>{" "}
          <p ref={(el) => (heroOnload.current[26] = el)}>
            creating immersive websites and
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[27] = el)}
            className={`${styles["align-left"]}`}
          >
            intuitive digital interfaces.
          </p>
          <br />
          <p ref={(el) => (heroOnload.current[28] = el)}>
            During my career, I’ve had the privilege
          </p>{" "}
          <p ref={(el) => (heroOnload.current[29] = el)}>
            of working with clients like UNIT9,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[30] = el)}>
            Twitch, Dolce & Gabbana, Paradigm, and
          </p>{" "}
          <p ref={(el) => (heroOnload.current[31] = el)}>
            Cognition, helping them explore new
          </p>{" "}
          <p ref={(el) => (heroOnload.current[32] = el)}>
            business ideas, shape their identity, and
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[33] = el)}
            className={`${styles["align-left"]}`}
          >
            secure early-stage funding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
