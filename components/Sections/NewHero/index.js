import styles from "./Hero.module.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import HeroTitle from "@/components/Sections/NewHero/HeroTitle";
import HeroGrid from "@/components/Sections/NewHero/HeroGrid";

const Hero = ({
  staggerInterval = 0.02,
  duration,
  easing,
  startPageAnimation,
  linesCount,
}) => {
  const heroOnload = useRef([]);
  const timelineRef = useRef(null);

  // Keep the original useEffect for ref initialization
  useEffect(() => {
    heroOnload.current = heroOnload.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  const heroStagger = (index, interval) => {
    if (index === 0) {
      return 0;
    } else if (index <= 8) {
      return (index + 2) * interval;
    } else {
      return (index - 9) * interval;
    }
  };

  useGSAP(() => {
    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();

    if (heroOnload.current.length) {
      timelineRef.current.fromTo(
        heroOnload.current,
        {
          autoAlpha: 0,
          filter: "blur(2.5px)",
          color: "red",
        },
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
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [startPageAnimation, duration, easing, linesCount, staggerInterval]);

  return (
    <div className={styles["hero-container"]}>
      <HeroTitle />
      <HeroGrid heroOnload={heroOnload} />
    </div>
  );
};

export default Hero;
