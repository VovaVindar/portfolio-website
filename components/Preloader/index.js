import React, { useRef, useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import imagesLoaded from "imagesLoaded";

const Preloader = ({
  numbersProgress,
  mainRef,
  setNumbersProgress,
  className,
}) => {
  const intervalDuration = 135;

  useEffect(() => {
    if (mainRef.current) {
      const imgLoad = imagesLoaded(mainRef.current, { background: true });

      let currentProgress = 0;
      const intervalId = setInterval(() => {
        const newProgress =
          (imgLoad.progressedCount / imgLoad.images.length) * 100;
        if (newProgress > currentProgress) {
          const increment = Math.min(newProgress - currentProgress, 10);
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
    const movementAnimation = gsap.timeline({});

    if (containerRef.current) {
      setOpacity(1);

      numbersAnimation.to(containerRef.current, {
        autoAlpha: `${numbersProgress >= 100 ? 0 : 1}`,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        color: `${numbersProgress >= 100 ? "red" : "white"}`,
        duration: 1.2,
        delay: 0.05,
        ease: "power4.out" /* Easing for: text fade out */,
        onComplete: () => {
          numbersProgress >= 100 ? setIsLoading(false) : null;
        },
      });
    }
    if (progressIndicatorRef.current) {
      movementAnimation.to(progressIndicatorRef.current, {
        paddingLeft: `calc(${numbersProgress}% - 3ch)`,
        duration: 1,
        ease: "power4.out",
      });
    }

    return () => {
      if (numbersAnimation) {
        numbersAnimation.kill();
      }
      if (movementAnimation) {
        movementAnimation.kill();
      }
    };
  }, [numbersProgress]);

  const style = {
    opacity: opacity,
  };

  return (
    <>
      {isLoading && (
        <div className={`${styles["preloader"]} ${className}`} style={style}>
          <div className={`${styles["text-container"]}`} ref={containerRef}>
            <div>
              <p className={`text-body-3 ${styles["red"]}`}>Vova Vindar</p>
              {/*<p className={`text-header-3 ${styles["bracket"]} ${styles["red"]}`}>{"("}</p>*/}
            </div>
            <div>
              <p className={`text-body-3`} ref={progressIndicatorRef}>
                {numbersProgress}
              </p>
            </div>
            {/*<div>
              <p className={`text-header-3 ${styles["bracket"]} ${styles["red"]}`}>{"    )"}</p>
            </div>*/}
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
