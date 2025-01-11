import styles from "./Hero.module.css";
import { useRef, useEffect, useCallback } from "react";
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
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      // Only run once
      heroOnload.current = heroOnload.current.slice(
        0,
        document.querySelectorAll("[data-gsap]").length
      );
      hasInitialized.current = true;
    }
  }, []);

  const heroStagger = useCallback((index, interval) => {
    if (index <= 3) return 0;
    if (index >= 4 && index <= 6) return 2 * interval;
    if (index >= 7 && index <= 8) return 4 * interval;
    if (index >= 9 && index <= 11) return 6 * interval;
    if (index >= 12) return 4 * interval;
  }, []);

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
  }, [startPageAnimation]);

  return (
    <div className={styles["hero-container"]}>
      <HeroTitle />
      <HeroGrid heroOnload={heroOnload} />
    </div>
  );
};

export default Hero;
