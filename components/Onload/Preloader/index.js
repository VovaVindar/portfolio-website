import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import { useLoading } from "@/context/PreloaderContext";
import { usePreloaderOnloadAnimations } from "@/hooks/animations/onload/usePreloaderOnloadAnimations";
import { PRELOADER as getPreloader } from "@/constants/animations";

const Preloader = ({ className }) => {
  const PRELOADER = getPreloader();

  const { loadProgress } = useLoading();
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const { containerRef, progressIndicatorRef } =
    usePreloaderOnloadAnimations(loadProgress);

  useEffect(() => {
    if (containerRef.current) {
      setOpacity(1);
    }

    if (loadProgress >= 100) {
      const hideDelay =
        (PRELOADER.FADE.DURATION + PRELOADER.FADE.DELAY) * 1000 + 10;

      setTimeout(() => {
        setIsLoading(false);
      }, hideDelay);
    }
  }, [loadProgress, containerRef, PRELOADER]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`${styles["preloader"]} ${className}`}
      style={{ opacity }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={loadProgress}
      aria-label="Page loading progress"
    >
      <div className={styles["text-container"]} ref={containerRef}>
        <div>
          <p
            className="text-body-3"
            ref={progressIndicatorRef}
            aria-hidden="true" // Hide from screen readers since we have the progressbar role above
          >
            {loadProgress}
          </p>
        </div>
      </div>

      {/* Announce completion to screen readers */}
      {loadProgress >= 100 && (
        <div role="status" className="sr-only">
          Loading complete
        </div>
      )}
    </div>
  );
};

export default Preloader;
