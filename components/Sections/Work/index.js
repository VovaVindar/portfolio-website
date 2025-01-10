import React, { useState, useRef, useEffect } from "react";
import styles from "./Work.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = ({
  duration = 1,
  easing = "power2.out",
  startPageAnimation = false,
}) => {
  // Refs for DOM elements
  const containerRef = useRef(null);
  const textOnscroll = useRef(null);
  const sectionRef = useRef(null);

  // Timeline refs for proper cleanup
  const timelineRefs = useRef({
    text: null,
  });

  // State management
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  // Animation configurations
  const animConfig = {
    text: {
      hidden: {
        opacity: 0,
        filter: "blur(4.5px)",
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        delay: 0,
        duration: duration + 0.1,
        ease: easing,
      },
    },
  };

  // Delayed animation start
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => setStartPageAnimation2(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  // Main animations setup
  useGSAP(() => {
    let triggers = {
      container: null,
      text: null,
    };

    // Kill previous timeline
    timelineRefs.current.text?.kill();

    // Initialize new timeline
    timelineRefs.current.text = gsap.timeline();

    // Reset container class
    containerRef?.current?.classList.remove(styles["in-view"]);

    // Set initial state
    timelineRefs.current.text.set(textOnscroll.current, animConfig.text.hidden);

    if (startPageAnimation2) {
      // Container in-view animation
      triggers.container = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        toggleClass: styles["in-view"],
        once: false,
      });

      // Text fade-in animation
      triggers.text = ScrollTrigger.create({
        trigger: textOnscroll.current,
        start: "100% 100%",
        onEnter: () => {
          timelineRefs.current.text.fromTo(
            textOnscroll.current,
            animConfig.text.hidden,
            animConfig.text.visible
          );
        },
        once: true,
      });
    }

    return () => {
      Object.values(triggers).forEach((trigger) => trigger?.kill());
      timelineRefs.current.text?.kill();
      timelineRefs.current.text = null;
    };
  }, [startPageAnimation2, duration, easing]);

  // Separate GSAP context for parallax effect
  useGSAP(() => {
    let parallaxAnimation;
    let scrollTriggerInstance;

    const lineHeight = parseFloat(
      getComputedStyle(document.documentElement).lineHeight
    );
    const rlhInPixels = 18 * lineHeight;

    if (sectionRef.current) {
      parallaxAnimation = gsap.fromTo(
        sectionRef.current,
        { yPercent: 10 },
        { yPercent: 0, ease: "none" }
      );

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: parallaxAnimation,
        scrub: 1,
        start: "top bottom",
        end: `bottom bottom-=${rlhInPixels}`,
      });
    }

    return () => {
      scrollTriggerInstance?.kill();
      parallaxAnimation?.kill();
    };
  }, []);

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} work-global mf-exclusion text-body-1-uppercase`}
        ref={sectionRef}
      >
        <h2 ref={textOnscroll}>Selected Work</h2>
        <div className={styles["el-container"]} ref={containerRef} />
        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
