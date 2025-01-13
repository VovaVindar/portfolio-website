import { useState, useEffect, useRef } from "react";
import styles from "./Lines.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { useLinesOnloadAnimations } from "@/hooks/animations/onload/useLinesOnloadAnimations";

const Lines = () => {
  const { startPageAnimation, completeTransition, noLines } = usePreloader();
  const [lines, setLines] = useState([]);
  const linesReadyRef = useRef(false);

  const containerRef = useLinesOnloadAnimations(
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
        .map((_, i) => <div key={i} className={`${styles["line"]}`}></div>);

      setLines(linesArray);

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "transparent";
        containerRef.current.parentNode.classList.add("mounted");
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
