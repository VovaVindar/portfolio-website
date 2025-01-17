import { useState, useEffect, useRef } from "react";
import styles from "./Lines.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { useLinesOnloadAnimations } from "@/hooks/animations/onload/useLinesOnloadAnimations";

const Lines = () => {
  const { completeTransition, noLines, isOnloadLinesActive } = usePreloader();
  const [lines, setLines] = useState([]);
  const linesReadyRef = useRef(false);

  const containerRef = useLinesOnloadAnimations(
    completeTransition,
    linesReadyRef.current
  );

  // Prevent space key scrolling only while isOnloadLinesActive is true
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        isOnloadLinesActive &&
        e.code === "Space" &&
        e.target === document.body
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOnloadLinesActive]);

  // Generate lines based on screen height
  useEffect(() => {
    const generateLines = () => {
      const height = window.innerHeight;
      const width = document.documentElement.clientWidth;

      // Determine root line height based on screen width
      let rootLineHeight;
      if (width >= 2400) {
        rootLineHeight = 40;
      } else if (width >= 1800) {
        rootLineHeight = 30;
      } else {
        rootLineHeight = 23;
      }

      /*const rootLineHeight = parseInt(
        getComputedStyle(document.documentElement).lineHeight
      );*/
      const lineHeight = 1;
      const totalLines = Math.floor(height / (rootLineHeight - lineHeight));

      const linesArray = Array(totalLines)
        .fill(null)
        .map((_, i) => <div key={i} className={`${styles["line"]}`}></div>);

      setLines(linesArray);

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "transparent";
      }
      linesReadyRef.current = true;
    };

    generateLines();
  }, []);

  if (noLines) return null;

  return (
    <div className={`${styles["line-container"]}`} ref={containerRef}>
      {lines}
    </div>
  );
};

export default Lines;
