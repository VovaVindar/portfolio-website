import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { usePreloaderOnloadAnimations } from "@/hooks/animations/onload/usePreloaderOnloadAnimations";
import { PRELOADER, LINES } from "@/constants/animations";

const Preloader = ({ className }) => {
  const { loadProgress, removeLines } = usePreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const { containerRef, progressIndicatorRef } =
    usePreloaderOnloadAnimations(loadProgress);

  useEffect(() => {
    if (containerRef.current) {
      setOpacity(1);
    }

    if (loadProgress >= 100) {
      const removeDelay =
        (PRELOADER.FADE.DURATION + PRELOADER.FADE.DELAY + LINES.MAX_DURATION) *
          1000 +
        10;
      const hideDelay =
        (PRELOADER.FADE.DURATION + PRELOADER.FADE.DELAY) * 1000 + 10;

      setTimeout(() => {
        removeLines();
      }, removeDelay);

      setTimeout(() => {
        setIsLoading(false);
      }, hideDelay);
    }
  }, [loadProgress, containerRef, removeLines]);

  // Track progress changes
  useEffect(() => {}, [loadProgress]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`${styles["preloader"]} ${className}`} style={{ opacity }}>
      <div className={styles["text-container"]} ref={containerRef}>
        <div>
          <p className="text-body-3" ref={progressIndicatorRef}>
            {loadProgress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
