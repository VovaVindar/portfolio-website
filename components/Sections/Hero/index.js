import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

const Hero = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
  linesCount,
}) => {
  const heroOnload = useRef([]);

  useEffect(() => {
    heroOnload.current = heroOnload.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  useGSAP(() => {
    const heroAnimation = gsap.timeline({});

    if (heroOnload.current.length) {
      heroAnimation.fromTo(
        // Hero onload
        heroOnload.current,
        { autoAlpha: 0, filter: "blur(1.5px)", color: "red" },
        {
          autoAlpha: startPageAnimation ? 1 : 0,
          filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
          color: "#0F1010",
          duration: duration - 0.1,
          delay: linesCount ? 0.3 : 0.9,
          ease: easing,
          stagger: (index) => heroStagger(index, staggerInterval - 0.02),
        }
      );
    }

    return () => {
      if (heroAnimation) {
        heroAnimation.kill();
      }
    };
  }, [startPageAnimation]);

  const heroStagger = (index, interval) => {
    if (index <= 8) {
      return index * interval;
    } else {
      return (index - 8) * interval;
    }
  };

  return (
    <div className={`${styles["hero-container"]}`}>
      <div className={`${styles["description"]} text-body-2`}>
        <div
          className={`${styles["timeline"]}`}
          ref={(el) => (heroOnload.current[0] = el)}
        >
          <span className="text-header-3 mf-hidden">Est. MMXIX</span>
          <div></div>
          <span className="text-header-3 mf-hidden">Ad Infinitum</span>
        </div>
        <div className={`${styles["desktop"]}`}>
          <p ref={(el) => (heroOnload.current[1] = el)}>
            I’m a detail-oriented designer-developer based
          </p>{" "}
          <p ref={(el) => (heroOnload.current[2] = el)}>
            in Vancouver, obsessed with creating immersive
          </p>{" "}
          <p ref={(el) => (heroOnload.current[3] = el)}>
            websites and intuitive digital interfaces.
          </p>
          <p
            ref={(el) => (heroOnload.current[4] = el)}
            style={{ marginTop: "1rlh" }}
          >
            During my career, I’ve had the privilege of working
          </p>{" "}
          <p ref={(el) => (heroOnload.current[5] = el)}>
            with clients like UNIT9, Twitch, Dolce & Gabbana,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[6] = el)}>
            Paradigm, and Cognition, helping them explore
          </p>{" "}
          <p ref={(el) => (heroOnload.current[7] = el)}>
            new business ideas, shape their identity, and
          </p>{" "}
          <p ref={(el) => (heroOnload.current[8] = el)}>
            {" "}
            secure early-stage funding.
          </p>
        </div>
        <div className={`${styles["mobile"]}`}>
          <p ref={(el) => (heroOnload.current[9] = el)}>
            I’m a detail-oriented designer-developer
          </p>{" "}
          <p ref={(el) => (heroOnload.current[10] = el)}>
            based in Vancouver, obsessed with
          </p>{" "}
          <p ref={(el) => (heroOnload.current[11] = el)}>
            creating immersive websites and
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[12] = el)}
            className={`${styles["align-left"]}`}
          >
            intuitive digital interfaces.
          </p>
          <br />
          <p ref={(el) => (heroOnload.current[13] = el)}>
            During my career, I’ve had the privilege
          </p>{" "}
          <p ref={(el) => (heroOnload.current[14] = el)}>
            of working with clients like UNIT9,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[15] = el)}>
            Twitch, Dolce & Gabbana, Paradigm, and
          </p>{" "}
          <p ref={(el) => (heroOnload.current[16] = el)}>
            Cognition, helping them explore new
          </p>{" "}
          <p ref={(el) => (heroOnload.current[17] = el)}>
            business ideas, shape their identity, and
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[18] = el)}
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
