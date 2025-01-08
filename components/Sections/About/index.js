import styles from "./About.module.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About = ({ staggerInterval, duration, easing, startPageAnimation }) => {
  const aboutOnscroll = useRef([]);

  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => setStartPageAnimation2(true), 2000);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance;
    const aboutAnimation = gsap.timeline({});

    if (aboutOnscroll.current.length) {
      aboutAnimation.set(aboutOnscroll.current, {
        autoAlpha: 0,
        filter: "blur(2px)",
        color: "red",
      });

      if (startPageAnimation2) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: aboutOnscroll.current,
          start: "top bottom",
          onEnter: () => {
            aboutAnimation.fromTo(
              aboutOnscroll.current,
              { autoAlpha: 0, filter: "blur(2px)", color: "red" },
              {
                autoAlpha: 1,
                filter: `blur(0px)`,
                color: "#0F1010",
                delay: 0,
                duration: duration,
                ease: easing,
                stagger: staggerInterval,
              }
            );
          },
          once: true,
        });
      }
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (aboutAnimation) {
        aboutAnimation.kill();
      }
    };
  }, [startPageAnimation2]);

  return (
    <div className={`${styles["about-container"]}`}>
      <div className={`${styles["about"]} text-body-3`}>
        <div className={`text-body-1 left-layout`}></div>
        <div className={`text-header-1 right-layout`}></div>

        <div className={`text-body-3 ${styles["text-container"]}`}>
          <p ref={(el) => (aboutOnscroll.current[0] = el)}>
            I’m a detail-oriented designer-developer based in Vancouver,
            obsessed with creating immersive websites and intuitive digital
            interfaces. During my career,
          </p>
          <p ref={(el) => (aboutOnscroll.current[1] = el)}>
            I’ve had the privilege of working with clients like UNIT9, Twitch,
            Dolce & Gabbana, Paradigm, and Cognition, helping them explore new
            business ideas,
          </p>
          <p ref={(el) => (aboutOnscroll.current[2] = el)}>
            shape their identity, and secure early-stage funding. From
            developing interactive experiences for UNIT9 and Twitch to shaping
            the digital presence of
          </p>
          <p ref={(el) => (aboutOnscroll.current[3] = el)}>
            luxury powerhouse Dolce & Gabbana, each project has been a unique
            adventure in digital storytelling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
