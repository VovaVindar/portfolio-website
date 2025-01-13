import React, { useRef, useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";

const Preloader = ({
  numbersProgress,
  mainRef,
  setNumbersProgress,
  className,
}) => {
  const containerRef = useRef(null);
  const progressIndicatorRef = useRef(null);
  const timelineRefs = useRef({});
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const INTERVAL_DURATION = 135 * 1.6;

  // Handle image loading progress
  useEffect(() => {
    if (!mainRef.current) return;

    const imgLoad = imagesLoaded(mainRef.current, { background: true });
    let currentProgress = 0;

    const intervalId = setInterval(() => {
      const newProgress =
        (imgLoad.progressedCount / imgLoad.images.length) * 100;
      if (newProgress > currentProgress) {
        const increment = Math.min(newProgress - currentProgress, 14);
        currentProgress += increment;
        setNumbersProgress(currentProgress.toFixed(0));
      } else if (currentProgress === 100) {
        clearInterval(intervalId);
      }
    }, INTERVAL_DURATION);

    return () => clearInterval(intervalId);
  }, [mainRef, setNumbersProgress]);

  // Handle animations
  useEffect(() => {
    timelineRefs.current = {
      numbers: gsap.timeline({}),
      numbersOut: gsap.timeline({}),
      movement: gsap.timeline({}),
    };

    if (containerRef.current) {
      setOpacity(1);

      // Fade animation
      timelineRefs.current.numbers.to(containerRef.current, {
        autoAlpha: numbersProgress >= 100 ? 0 : 1,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (numbersProgress >= 100) setIsLoading(false);
        },
      });

      // Slide animation
      timelineRefs.current.numbersOut
        .set(containerRef.current, { y: 0 })
        .to(containerRef.current, {
          y: numbersProgress >= 100 ? 540 : 0,
          duration: 1.49,
          delay: 0,
          ease: "power3.in",
        });
    }

    if (progressIndicatorRef.current) {
      timelineRefs.current.movement
        .set(progressIndicatorRef.current, {
          color: "red",
          opacity: 0.4,
          textShadow: "0 0 10px rgba(255, 0, 0, 0.7)",
        })
        .to(progressIndicatorRef.current, {
          marginLeft: `calc(${numbersProgress}% - 3ch)`,
          color: numbersProgress >= 100 ? "red" : "white",
          textShadow: "none",
          opacity: numbersProgress >= 100 ? 0.85 : 1,
          filter: `blur(${numbersProgress >= 100 ? 0.7 : 0}px)`,
          duration: 1,
          ease: "power4.out",
        });
    }

    return () => {
      Object.values(timelineRefs.current).forEach((timeline) =>
        timeline?.kill()
      );
    };
  }, [numbersProgress]);

  const style = {
    opacity: opacity,
    /* Y margin flashing fix */
  };

  if (!isLoading) return null;

  return (
    <div className={`${styles["preloader"]} ${className}`} style={style}>
      <div className={styles["text-container"]} ref={containerRef}>
        <div>
          <p className="text-body-3" ref={progressIndicatorRef}>
            {numbersProgress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
