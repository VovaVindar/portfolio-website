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
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const timelineRef = useRef(null);
  const timelineRef2 = useRef(null);

  const heroStagger = useCallback((index, interval) => {
    if (index <= 3) return 0;
    if (index >= 4 && index <= 6) return 2 * interval;
    if (index >= 7 && index <= 8) return 4 * interval;
    if (index >= 9 && index <= 11) return 6 * interval;
    if (index >= 12) return 8 * interval;
  }, []);

  useGSAP(() => {
    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (timelineRef2.current) {
      timelineRef2.current.kill();
    }

    timelineRef.current = gsap.timeline();
    timelineRef2.current = gsap.timeline();

    if (startPageAnimation) {
      // Img filters animation
      if (imgOnload.current.length) {
        timelineRef.current.to([...imgOnload.current].reverse(), {
          delay: 1.3,
          stagger: {
            each: 0.072,
            onComplete() {
              console.log(
                this.targets()[0].classList.add(`${styles["in-view"]}`)
              );
            },
          },
        });
      }

      // Slide animation
      if (cellOnload.current.length) {
        timelineRef2.current.fromTo(
          [...cellOnload.current].reverse(),
          {
            //autoAlpha: 0,
            y: "-105vh",
            //scale: 1.2,
          },
          {
            //autoAlpha: startPageAnimation ? 1 : 0,
            y: 0,
            scale: 1,
            duration: 3.2,
            delay: 1.3,
            ease: "power2.out",
            stagger: 0.072,
          }
        );
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (timelineRef2.current) {
        timelineRef2.current.kill();
        timelineRef2.current = null;
      }
    };
  }, [startPageAnimation]);

  return (
    <div className={styles["hero-container"]}>
      {/*<HeroTitle />*/}
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
