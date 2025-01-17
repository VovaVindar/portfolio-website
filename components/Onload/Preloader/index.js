import React, { useState, useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import { usePreloader } from "@/context/PreloaderContext";
import { usePreloaderOnloadAnimations } from "@/hooks/animations/onload/usePreloaderOnloadAnimations";
import { PRELOADER, LINES } from "@/constants/animations";
import { SITE_IMAGES, SITE_VIDEOS } from "@/constants/media";

const Preloader = ({ className }) => {
  const { loadProgress, updateProgress, removeLines } = usePreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const actualProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const intervalIdRef = useRef(null);

  const { containerRef, progressIndicatorRef } =
    usePreloaderOnloadAnimations(loadProgress);

  useEffect(() => {
    const totalFiles = SITE_IMAGES.length + SITE_VIDEOS.length;

    intervalIdRef.current = setInterval(() => {
      if (displayProgressRef.current < actualProgressRef.current) {
        const increment = Math.min(
          actualProgressRef.current - displayProgressRef.current,
          PRELOADER.LOADING.INCREMENT_CAP
        );
        displayProgressRef.current += increment;
        updateProgress(displayProgressRef.current.toFixed(0));
      }

      if (displayProgressRef.current >= 100) {
        clearInterval(intervalIdRef.current);
      }
    }, PRELOADER.LOADING.INTERVAL);

    const updateActualProgress = (loadedCount) => {
      actualProgressRef.current = (loadedCount / totalFiles) * 100;
    };

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn("[Preloader] Failed to load image:", src);
          resolve();
        };
        img.src = src;
      });
    };

    const loadVideo = (src) => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => resolve();
        video.onerror = () => {
          console.warn("[Preloader] Failed to load video:", src);
          resolve();
        };
        video.src = src;
      });
    };

    const loadAllMedia = async () => {
      let loadedCount = 0;
      const updateProgress = () => {
        loadedCount++;
        updateActualProgress(loadedCount);
      };

      const imagePromises = SITE_IMAGES.map((src) =>
        loadImage(src).then(updateProgress)
      );

      const videoPromises = SITE_VIDEOS.map((src) =>
        loadVideo(src).then(updateProgress)
      );

      try {
        await Promise.all([...imagePromises, ...videoPromises]);
        actualProgressRef.current = 100;
      } catch (error) {
        console.error("[Preloader] Error loading media:", error);
      }
    };

    loadAllMedia();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [updateProgress]);

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

      setTimeout(() => removeLines(), removeDelay);
      setTimeout(() => setIsLoading(false), hideDelay);
    }
  }, [loadProgress, containerRef, removeLines]);

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
