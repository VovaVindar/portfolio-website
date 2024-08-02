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
    const lines = lineContainerRef.current.children;
    gsap.fromTo(
      lines,
      { width: 0 },
      {
        width: `${linesAnimation ? "100" : "0"}%`,
        duration: 1.6,
        ease: "power4.out",
        stagger: {
          each: 0.02,
          from: "start",
        },
      }
    );
  }, [lines, linesAnimation]);

  return (
    <div className={`${styles["line-container"]}`} ref={lineContainerRef}>
      {lines}
    </div>
  );
};

export default LoadingLines;
