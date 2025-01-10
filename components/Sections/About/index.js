import styles from "./About.module.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About = ({
  staggerInterval = 0.1,
  duration = 1,
  easing = "power2.out",
  startPageAnimation,
}) => {
  const aboutOnscroll = useRef([]);
  const timelineRef = useRef(null);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartPageAnimation2(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  // Animation configuration
  const animConfig = {
    hidden: {
      autoAlpha: 0,
      filter: "blur(2px)",
      color: "red",
    },
    visible: {
      autoAlpha: 1,
      filter: "blur(0px)",
      color: "#0F1010",
      delay: 0,
      duration,
      ease: easing,
      stagger: staggerInterval,
    },
  };

  useGSAP(() => {
    let scrollTriggerInstance;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline();

    if (aboutOnscroll.current.length) {
      timelineRef.current.set(aboutOnscroll.current, animConfig.hidden);

      if (startPageAnimation2) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: aboutOnscroll.current,
          start: "top bottom",
          onEnter: () => {
            timelineRef.current.fromTo(
              aboutOnscroll.current,
              animConfig.hidden,
              animConfig.visible
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
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [startPageAnimation2, duration, easing, staggerInterval]);

  const aboutText = [
    `I'm a detail-oriented designer-developer based in Vancouver, obsessed with creating immersive websites and intuitive digital interfaces. During my career,`,
    `I've had the privilege of working with clients like UNIT9, Twitch, Dolce & Gabbana, Paradigm, and Cognition, helping them explore new business ideas,`,
    `shape their identity, and secure early-stage funding. From developing interactive experiences for UNIT9 and Twitch to shaping the digital presence of`,
    `luxury powerhouse Dolce & Gabbana, each project has been a unique adventure in digital storytelling.`,
  ];

  return (
    <div className={styles["about-container"]}>
      <div className={`${styles["about"]} text-body-3`}>
        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />

        <div className={`text-body-3 ${styles["text-container"]}`}>
          {aboutText.map((text, index) => (
            <p key={index} ref={(el) => (aboutOnscroll.current[index] = el)}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
