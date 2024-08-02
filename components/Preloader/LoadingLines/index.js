import styles from "./LoadingLines.module.css";
import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoadingLines = ({ linesAnimation }) => {
  const [lines, setLines] = useState([]);
  const lineContainerRef = useRef(null);

  useEffect(() => {
    const generateLines = () => {
      const height = window.innerHeight;
      const rlh = parseInt(
        getComputedStyle(document.documentElement).lineHeight
      );
      const lineHeight = 1; // 1px height
      const totalLines = Math.floor(height / (rlh - lineHeight)) - 1;

      const linesArray = [];
      for (let i = 0; i < totalLines; i++) {
        linesArray.push(<div key={i} className={`${styles["line"]}`}></div>);
      }
      setLines(linesArray);
    };

    generateLines();
  }, []);

  useGSAP(() => {
    if (lineContainerRef.current) {
      const lines = lineContainerRef.current.children;
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          lines,
          { scaleX: 0, transformOrigin: "center" },
          {
            scaleX: `${linesAnimation ? 1 : 0}`,
            duration: 1.2,
            ease: "sine.in",
            stagger: {
              each: 0.025,
              from: "start",
            },
          }
        )
        .to(
          lines,
          {
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: {
              each: 0.025,
              from: "start",
            },
          },
          "+=0.3" // Optional delay before opacity animation starts
        );
    }
  }, [lines, linesAnimation, lineContainerRef]);

  return (
    <div className={`${styles["line-container"]}`} ref={lineContainerRef}>
      {lines}
    </div>
  );
};

export default LoadingLines;
