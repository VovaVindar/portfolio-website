import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./Lines.module.css";
import { useLinesStatus } from "@/context/PreloaderContext";
import { useLinesOnloadAnimations } from "@/hooks/animations/onload/useLinesOnloadAnimations";
import { useWindowDimensions } from "@/context/DimensionsContext";

const Lines = () => {
  const { width, height } = useWindowDimensions();

  const { isOnloadLinesActive } = useLinesStatus();
  const [lines, setLines] = useState([]);
  const linesReadyRef = useRef(false);

  const containerRef = useLinesOnloadAnimations(linesReadyRef.current);

  // Prevent space key scrolling only while lines are active
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
  useLayoutEffect(() => {
    const generateLines = () => {
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
        .map((_, i) => (
          <div key={i} className={`${styles["line"]}`} aria-hidden="true"></div>
        ));

      setLines(linesArray);

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "transparent";
      }
      linesReadyRef.current = true;
    };

    generateLines();
  }, [containerRef, height, width]);

  if (!isOnloadLinesActive) return null;

  return (
    <div
      className={`${styles["line-container"]} scroll-block`}
      ref={containerRef}
      aria-hidden="true"
      role="presentation" // Indicates this is presentational only
    >
      {lines}
    </div>
  );
};

export default Lines;
