import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import imagesLoaded from "imagesloaded";
import { usePreloader } from "@/context/PreloaderContext";
import { usePreloaderOnloadAnimations } from "@/hooks/animations/onload/usePreloaderOnloadAnimations";
import { PRELOADER, LINES } from "@/constants/animations";

const Preloader = ({ mainRef, className }) => {
  const { loadProgress, updateProgress, removeLines } = usePreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const { containerRef, progressIndicatorRef } =
    usePreloaderOnloadAnimations(loadProgress);

  useEffect(() => {
    if (!mainRef.current) return;

    const imgLoad = imagesLoaded(mainRef.current, { background: true });
    let currentProgress = 0;

    const intervalId = setInterval(() => {
      const newProgress =
        (imgLoad.progressedCount / imgLoad.images.length) * 100;
      if (newProgress > currentProgress) {
        const increment = Math.min(
          newProgress - currentProgress,
          PRELOADER.LOADING.INCREMENT_CAP
        );
        currentProgress += increment;
        updateProgress(currentProgress.toFixed(0));
      } else if (currentProgress === 100) {
        clearInterval(intervalId);
      }
    }, PRELOADER.LOADING.INTERVAL);

    return () => clearInterval(intervalId);
  }, [mainRef, updateProgress]);

  useEffect(() => {
    if (containerRef.current) {
      setOpacity(1);
    }
    if (loadProgress >= 100) {
      setTimeout(
        () => removeLines(),
        (PRELOADER.FADE.DURATION + PRELOADER.FADE.DELAY + LINES.MAX_DURATION) *
          1000 +
          10
      );
      setTimeout(
        () => setIsLoading(false),
        (PRELOADER.FADE.DURATION + PRELOADER.FADE.DELAY) * 1000 + 10
      );
    }
  }, [loadProgress, containerRef]);

  if (!isLoading) return null;

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
