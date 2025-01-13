import styles from "./TransitionLines.module.css";
import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

const LoadingLines = () => {
  const { startPageAnimation, completeTransition } = usePreloader();
  const [lines, setLines] = useState([]);
  const linesContainerRef = useRef(null);
  const linesReadyRef = useRef(false);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Generate lines based on screen height
  useEffect(() => {
    const generateLines = () => {
      const height = window.innerHeight;
      const rootLineHeight = parseInt(
        getComputedStyle(document.documentElement).lineHeight
      );
      const lineHeight = 1;
      const totalLines = Math.floor(height / (rootLineHeight - lineHeight));

      const linesArray = Array(totalLines)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={`${styles["line"]} mounted`}></div>
        ));

      setLines(linesArray);

      if (linesContainerRef.current) {
        linesContainerRef.current.style.backgroundColor = "transparent";
      }
      linesReadyRef.current = true;
    };

    generateLines();
  }, []);

  // Handle lines animation
  useGSAP(() => {
    if (
      !linesReadyRef.current ||
      !linesContainerRef.current ||
      hasAnimatedRef.current
    )
      return;

    const lines = Array.from(linesContainerRef.current.children);
    if (lines.length === 0) return;

    linesContainerRef.current.classList.add("loading");

    const isHighDensity = lines.length > 60;
    const config = {
      staggerInterval: isHighDensity ? 0.0002 : 0.038,
      duration: 1.25,
      delay: 0.71,
      completionDelay: 770,
    };

    timelineRef.current = gsap.timeline().fromTo(
      lines,
      {
        scaleY: 1,
        transformOrigin: "bottom",
        backgroundColor: "#0F1010",
      },
      {
        scaleY: startPageAnimation ? 0 : 1,
        backgroundColor: startPageAnimation ? "#C34356" : "#0F1010",
        duration: config.duration,
        delay: config.delay,
        ease: "power4.inOut",
        stagger: {
          each: config.staggerInterval,
          from: "start",
        },
        onComplete: () => {
          hasAnimatedRef.current = true;
          setTimeout(() => {
            completeTransition();
            linesContainerRef.current?.classList.remove("scroll-block");
          }, config.completionDelay);
        },
      }
    );

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(lines.current);
    };
  }, [startPageAnimation, completeTransition]);

  return (
    <div
      className={`${styles["line-container"]} loading`}
      ref={linesContainerRef}
    >
      {lines}
    </div>
  );
};

export default LoadingLines;
