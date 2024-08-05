import styles from "./LoadingLines.module.css";
import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoadingLines = ({ linesAnimation }) => {
  const [lines, setLines] = useState([]);
  const lineContainerRef = useRef(null);
  const linesReadyRef = useRef(false);

  /*useEffect(() => {
    const generateLines = () => {
      const height = window.innerHeight;
      const rlh = parseInt(
        getComputedStyle(document.documentElement).lineHeight
      );
      const lineHeight = 1;
      const totalLines = Math.floor(height / (rlh - lineHeight)) - 1;

      const linesArray = [];
      for (let i = 0; i < totalLines; i++) {
        linesArray.push(<div key={i} className={`${styles["line"]}`}></div>);
      }
      setLines(linesArray);
      linesReadyRef.current = true;
    };

    generateLines();
  }, []);

  useGSAP(() => {
    if (linesReadyRef.current && lineContainerRef.current) {
      const lines = lineContainerRef.current.children;
      const timeline = gsap.timeline({});

      var staggerInterval = 0.045;
      var duration = 1.3;

      timeline.fromTo(
        lines,
        { scaleY: 1, transformOrigin: "bottom" },
        {
          scaleY: `${linesAnimation ? 0 : 1}`,
          duration: duration,
          delay: 0.05,
          ease: "power4.inOut",
          stagger: {
            each: staggerInterval,
            from: "start",
          },
        }
      );
    }
  }, [linesAnimation]);*/

  return (
    <div className={`${styles["line-container"]}`} ref={lineContainerRef}>
      {lines}
    </div>
  );
};

export default LoadingLines;
