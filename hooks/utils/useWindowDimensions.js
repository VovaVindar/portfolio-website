import { useState, useLayoutEffect } from "react";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scrollHeight:
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight
        : 0,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
  });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
        scrollY: window.scrollY,
      });
    };

    // Initial measurement
    updateDimensions();

    // Event listeners for subsequent updates can use regular event listeners
    // since they happen after initial render
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateDimensions);
    };
  }, []);

  return windowDimensions;
};
