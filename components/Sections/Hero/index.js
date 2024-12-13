import styles from "./Hero.module.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

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
        { autoAlpha: 0, filter: "blur(2.5px)", color: "red" },
        {
          autoAlpha: startPageAnimation ? 1 : 0,
          filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
          color: "#0F1010",
          duration: duration,
          delay: linesCount ? 0.3 : 0.7,
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
    if (index === 0) {
      return 0;
    } else if (index <= 8) {
      return (index + 2) * interval;
    } else {
      console.log(index);
      return (index - 9) * interval;
    }
  };

  return (
    <div className={`${styles["hero-container"]}`}>
      <div className={`${styles["description"]} text-body-2`}>
        <div className={`${styles["desktop"]}`}>
          <div
            className={`${styles["title"]} text-body-1-uppercase`}
            ref={(el) => (heroOnload.current[0] = el)}
          >
            <span>Portfolio—2025</span>
          </div>
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
            with clients like{" "}
            <Image
              src="/hero_logos/unit9.png"
              alt="Unit 9"
              width={70}
              height={17}
              style={{
                width: "3.04347rlh",
                aspectRatio: "70 / 17",
                height: "auto",
                marginLeft: "0.25em",
                marginRight: "-0.025em",
                marginTop: "-0.2173913rlh",
              }}
            />
            <span className={`${styles["invisible"]}`}> UNIT9</span>,{" "}
            <Image
              src="/hero_logos/twitch.png"
              alt="Twitch"
              width={53}
              height={18}
              style={{
                width: "2.304347824rlh",
                aspectRatio: "53 / 18",
                height: "auto",
                marginLeft: "0.25em",
                marginRight: "0.005em",
                marginTop: "-0.2595rlh",
              }}
            />
            <span className={`${styles["invisible"]}`}> Twitch</span>,{" "}
            <Image
              src="/hero_logos/dg.png"
              alt="Dolce & Gabbana"
              width={175}
              height={17}
              style={{
                width: "7.608695rlh",
                aspectRatio: "175 / 17",
                height: "auto",
                marginLeft: "0.25em",
                marginRight: "0.025em",
                marginTop: "-0.2173913rlh",
              }}
            />
            <span className={`${styles["invisible"]}`}> Dolce & Gabbana</span>,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[6] = el)}>
            <Image
              src="/hero_logos/paradigm.png"
              alt="Paradigm"
              width={94}
              height={21}
              style={{
                width: "4.086956rlh",
                aspectRatio: "94 / 21",
                height: "auto",
                marginLeft: "0",
                marginRight: "0.04em",
                marginTop: "-0.2173913rlh",
              }}
            />
            <span className={`${styles["invisible"]}`}> Paradigm</span>, and{" "}
            <Image
              src="/hero_logos/cognition.png"
              alt="Cognition"
              width={127}
              height={23}
              style={{
                width: "5.521739rlh",
                aspectRatio: "127 / 23",
                height: "auto",
                marginLeft: "0.275em",
                marginRight: "0.015em",
                marginTop: "-0.282608rlh",
              }}
            />
            <span className={`${styles["invisible"]}`}> Cognition</span>,
            enabling them to
          </p>{" "}
          <p ref={(el) => (heroOnload.current[7] = el)}>
            conceptualize new ideas, shape their identity,
          </p>{" "}
          <p ref={(el) => (heroOnload.current[8] = el)}>
            {" "}
            and secure early-stage funding.
          </p>
        </div>
        <div className={`${styles["mobile"]}`}>
          <div
            className={`${styles["timeline"]}`}
            ref={(el) => (heroOnload.current[9] = el)}
          >
            <span className="text-header-3 mf-hidden">Portfolio</span>
            <div></div>
            <span className="text-header-3 mf-hidden">2025</span>
          </div>
          <p ref={(el) => (heroOnload.current[10] = el)}>
            <span>I’m a detail-oriented designer-developer</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[11] = el)}>
            <span>based in Vancouver, obsessed with</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[12] = el)}>
            <span>creating immersive websites and</span>
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[13] = el)}
            className={`${styles["align-left"]}`}
          >
            <span>intuitive digital interfaces.</span>
          </p>
          <br />
          <p ref={(el) => (heroOnload.current[14] = el)}>
            <span>During my career, I’ve had the privilege</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[15] = el)}>
            <span>of working with clients like UNIT9,</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[16] = el)}>
            <span>Twitch, Dolce & Gabbana, Paradigm, and</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[17] = el)}>
            <span>Cognition, helping them explore new</span>
          </p>{" "}
          <p ref={(el) => (heroOnload.current[18] = el)}>
            <span>business ideas, shape their identity, and</span>
          </p>{" "}
          <p
            ref={(el) => (heroOnload.current[19] = el)}
            className={`${styles["align-left"]}`}
          >
            <span>secure early-stage funding.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
