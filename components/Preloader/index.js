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
  const intervalDuration = 135 * 1.6;

  useEffect(() => {
    if (mainRef.current) {
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
      }, intervalDuration);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [mainRef, setNumbersProgress]);

  const containerRef = useRef(null);
  const progressIndicatorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const numbersAnimation = gsap.timeline({});
    const numbersAnimationOut = gsap.timeline({});
    const movementAnimation = gsap.timeline({});

    if (containerRef.current) {
      setOpacity(1);

      numbersAnimation.to(containerRef.current, {
        autoAlpha: `${numbersProgress >= 100 ? 0 : 1}`,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out" /* Easing for: text fade out */,
        onComplete: () => {
          numbersProgress >= 100 ? setIsLoading(false) : null;
        },
      });

      numbersAnimationOut.set(containerRef.current, {
        y: 0,
      });
      numbersAnimationOut.to(containerRef.current, {
        y: `${numbersProgress >= 100 ? 200 : 0}`,
        duration: 1,
        delay: 0.3,
        ease: "power1.in",
      });
    }

    if (progressIndicatorRef.current) {
      movementAnimation.set(progressIndicatorRef.current, {
        color: `red`,
        opacity: 0.4,
        textShadow: "0 0 10px rgba(255, 0, 0, 0.7)",
      });
      movementAnimation.to(progressIndicatorRef.current, {
        marginLeft: `calc(${numbersProgress}% - 3ch)`,
        color: `${numbersProgress >= 100 ? "red" : "white"}`,
        textShadow: "none",
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });
    }

    return () => {
      if (numbersAnimation) {
        numbersAnimation.kill();
      }
      if (numbersAnimationOut) {
        numbersAnimationOut.kill();
      }
      if (movementAnimation) {
        movementAnimation.kill();
      }
    };
  }, [numbersProgress]);

  const style = {
    opacity: opacity,
    /* Y margin flashing fix */
  };

  return (
    <>
      {isLoading && (
        <div className={`${styles["preloader"]} ${className}`} style={style}>
          <div className={`${styles["text-container"]}`} ref={containerRef}>
            <div>
              <p className={`text-body-3`}>Vova Vindar Archive</p>
            </div>
            <div>
              <p className={`text-body-3`} ref={progressIndicatorRef}>
                {numbersProgress}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
