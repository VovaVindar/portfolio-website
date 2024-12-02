import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Work.module.css";
import gsap from "gsap";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import Controls from "@/components/Sections/Work/Controls";
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
  const controlsOnscroll = useRef(null);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => setStartPageAnimation2(true), 2000);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance1,
      scrollTriggerInstance2,
      scrollTriggerInstance3,
      scrollTriggerInstance4;
    const controlsAnimation = gsap.timeline({});
    const textAnimation = gsap.timeline({});
    const circlesAnimation = gsap.timeline({});

    containerRef?.current.classList.remove(`${styles["in-view"]}`);

    controlsAnimation.set(controlsOnscroll.current, {
      opacity: 0,
      filter: "blur(4px)",
    });
    textAnimation.set(textOnscroll.current, {
      opacity: 0,
      filter: "blur(4.5px)",
    });
    circlesAnimation.set(circlesOnscroll.current, {
      autoAlpha: 0,
      filter: "blur(2px)",
    });

    if (startPageAnimation2) {
      scrollTriggerInstance1 = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        toggleClass: `${styles["in-view"]}`,
        once: false,
      });
      scrollTriggerInstance2 = ScrollTrigger.create({
        trigger: textOnscroll.current,
        start: "100% 100%" /* was top 95% */,
        onEnter: () => {
          textAnimation.fromTo(
            textOnscroll.current,
            { opacity: 0, filter: "blur(4.5px)" },
            {
              opacity: 1,
              filter: `blur(0px)`,
              delay: 0,
              duration: duration + 0.1,
              ease: easing,
            }
          );
        },
        once: false,
      });
      scrollTriggerInstance3 = ScrollTrigger.create({
        trigger: circlesOnscroll.current,
        start: "100% 100%" /* was top bottom-=10px */,
        onEnter: () => {
          circlesAnimation.fromTo(
            circlesOnscroll.current,
            { autoAlpha: 0, filter: "blur(2)px" },
            {
              autoAlpha: 1,
              filter: `blur(0px)`,
              delay: 0,
              duration: duration,
              ease: easing,
            }
          );
        },
        once: false,
      });
      scrollTriggerInstance4 = ScrollTrigger.create({
        trigger: controlsOnscroll.current,
        start: "100% 100%" /* was top bottom-=10px */,
        onEnter: () => {
          controlsAnimation.fromTo(
            controlsOnscroll.current,
            { opacity: 0, filter: "blur(4px)" },
            {
              opacity: 1,
              filter: `blur(0px)`,
              delay: 0,
              duration: duration + 0.1,
              ease: easing,
            }
          );
        },
        once: false,
      });
    }

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
      if (scrollTriggerInstance4) {
        scrollTriggerInstance4.kill();
      }
    };
  }, [startPageAnimation2]);

  /* Control speed */
  const [speedCoef, setSpeedCoef] = useState(1);

  // Use useCallback to ensure setNumbersProgress does not change on re-renders
  const updateSpeedCoef = useCallback((coef) => {
    setSpeedCoef(coef);
  }, []);

  // Parallax effect on scroll
  const sectionRef = useRef(null);

  useGSAP(() => {
    let sectionParallax;

    // Compute `rlh` value in pixels
    const lineHeight = parseFloat(
      getComputedStyle(document.documentElement).lineHeight
    ); // Get the line height in pixels
    const rlhInPixels = 18 * lineHeight; // Convert 19rlh to pixels

    if (sectionRef.current) {
      sectionParallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top bottom",
          end: `bottom bottom-=${rlhInPixels}`,
        },
      });

      sectionParallax.set(sectionRef.current, {
        yPercent: 10,
      });
      sectionParallax.to(sectionRef.current, {
        yPercent: 0,
        ease: "none",
      });
    }

    return () => {
      if (sectionParallax) {
        sectionParallax.kill();
      }
    };
  });

  return (
    <div
      className={`${styles["work"]} work-global mf-exclusion text-body-1-uppercase`}
      ref={sectionRef}
    >
      <Controls
        speedCoef={speedCoef}
        setSpeedCoef={updateSpeedCoef}
        duration={duration}
        easing={easing}
        ref={controlsOnscroll}
      />
      <h2 ref={textOnscroll}>Selected Work</h2>
      <div className={`${styles["el-container"]}`} ref={containerRef}>
        <Marquee
          setMarqueeProgress={updateProgress}
          speedCoef={speedCoef}
          style={{ padding: "4rlh 0 " }}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22,
          ].map((item, index) => (
            <div
              key={index}
              className={`${styles["el"]} ${styles[`num${index + 1}`]}`}
              style={{
                color: "white",
                filter: `blur(${Math.min(Math.floor(speedCoef / 100), 9)}px)`,
              }}
              data-cursor-text="Vitamin Living"
            >
              <Magnetic movement={0.072} passedScale={1.032}>
                <Image
                  src="/marquee.png"
                  alt="Picture of the author"
                  fill
                  draggable="false"
                  onDragStart={() => {
                    return false;
                  }}
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
        style={{
          filter: `blur(${Math.min(
            Math.max(0, Math.floor((speedCoef - 250) / 250) + 2),
            5
          )}px)`,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={`${styles["circle"]}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Work;
