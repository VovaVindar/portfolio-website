import { useState, useEffect, useRef } from "react";
import styles from "./OnloadLines.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { useOnloadLinesAnimation } from "@/hooks/animations/onload/useOnloadLinesAnimation";

const OnloadLines = () => {
  const { startPageAnimation, completeTransition } = usePreloader();
  const [lines, setLines] = useState([]);
  const linesReadyRef = useRef(false);

  const containerRef = useOnloadLinesAnimation(
    startPageAnimation,
    completeTransition,
    linesReadyRef.current
  );

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

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "transparent";
      }
      linesReadyRef.current = true;
    };

    generateLines();
  }, []);

  return (
    <div className={`${styles["line-container"]} loading`} ref={containerRef}>
      {lines}
    </div>
  );
};

export default OnloadLines;
