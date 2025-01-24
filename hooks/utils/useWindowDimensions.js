import { useState, useLayoutEffect } from "react";

export const useWindowDimensions = () => {
  // Split into separate states
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scrollHeight:
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight
        : 0,
  });
  const [scrollY, setScrollY] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
      });
    };

    const updateScroll = () => {
      setScrollY(window.scrollY);
    };

    // Initial measurement
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return { ...dimensions, scrollY };
};
