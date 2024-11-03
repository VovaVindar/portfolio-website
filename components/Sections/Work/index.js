import React, { useState, useRef, useCallback } from "react";
import styles from "./Work.module.css";
import gsap from "gsap";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = ({ duration, easing, startPageAnimation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const pages = [0, 1, 2, 3];
  const totalPages = pages.length;

  // Use useCallback to ensure setNumbersProgress does not change on re-renders
  const updateProgress = useCallback((progress) => {
    const breakpoint = 100 / totalPages;
    const currentIndex = Math.floor(progress / breakpoint);

    if (currentIndex != activeIndex) {
      setActiveIndex((currentIndex + totalPages) % totalPages);
    }
  }, []);

  const containerRef = useRef(null);
  const textOnscroll = useRef(null);
  const circlesOnscroll = useRef(null);

  useGSAP(() => {
    let scrollTriggerInstance1, scrollTriggerInstance2, scrollTriggerInstance3;
    const textAnimation = gsap.timeline({});
    const circlesAnimation = gsap.timeline({});

    containerRef?.current.classList.remove(`${styles["in-view"]}`);

    textAnimation.set(textOnscroll.current, {
      opacity: 0,
      filter: "blur(1.5px)",
    });

    circlesAnimation.set(circlesOnscroll.current, {
      autoAlpha: 0,
      filter: "blur(1.5px)",
    });

    scrollTriggerInstance1 = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom-=3rlh",
      onEnter: () => {
        if (startPageAnimation) {
          containerRef.current.classList.add(`${styles["in-view"]}`);
        }
      },
      once: true,
    });

    scrollTriggerInstance2 = ScrollTrigger.create({
      trigger: textOnscroll.current,
      start: "top bottom-=0.5rlh",
      onEnter: () => {
        textAnimation.to(textOnscroll.current, {
          opacity: startPageAnimation ? 1 : 0,
          filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
          delay: 0,
          duration: duration,
          ease: easing,
        });
      },
      once: true,
    });

    scrollTriggerInstance3 = ScrollTrigger.create({
      trigger: circlesOnscroll.current,
      start: "top bottom",
      onEnter: () => {
        circlesAnimation.to(circlesOnscroll.current, {
          autoAlpha: startPageAnimation ? 1 : 0,
          filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
          delay: 0,
          duration: duration,
          ease: easing,
        });
      },
      once: true,
    });

    return () => {
      if (scrollTriggerInstance1) {
        scrollTriggerInstance1.kill();
      }
      if (scrollTriggerInstance2) {
        scrollTriggerInstance2.kill();
      }
      if (scrollTriggerInstance3) {
        scrollTriggerInstance3.kill();
      }
    };
  }, [startPageAnimation]);

  return (
    <div
      className={`${styles["work"]} work-global mf-exclusion text-body-1-uppercase`}
    >
      <h2 ref={textOnscroll}>Selected Work</h2>
      <div className={`${styles["el-container"]}`} ref={containerRef}>
        <Marquee setMarqueeProgress={updateProgress}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22,
          ].map((item, index) => (
            <div
              key={index}
              className={`${styles["el"]} ${styles[`num${index + 1}`]}`}
              style={{
                color: "white",
              }}
              data-cursor-text="Vitamin Living"
            >
              <Magnetic movement={0.072} passedScale={1.032}>
                <Image
                  src="/marquee.png"
                  alt="Picture of the author"
                  fill
                  priority={true}
                />
              </Magnetic>
            </div>
          ))}
        </Marquee>
      </div>
      <div className={`text-body-1 ${styles["left"]}`}></div>
      <div className={`text-header-1 ${styles["right"]}`}></div>
      <div
        className={`${styles["circle-container"]} ${
          styles[`active-${activeIndex}`]
        }`}
        ref={circlesOnscroll}
      >
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={`${styles["circle"]}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Work;
