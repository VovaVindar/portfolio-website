import MouseFollower from "@/components/MouseFollower";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import imagesLoaded from "imagesLoaded";

const Preloader = ({
  numbersProgress,
  mainRef,
  setNumbersProgress,
  className,
}) => {
  const intervalDuration = 60;

  useEffect(() => {
    if (mainRef.current) {
      const imgLoad = imagesLoaded(mainRef.current, { background: true });

      let currentProgress = 0;
      const intervalId = setInterval(() => {
        const newProgress =
          (imgLoad.progressedCount / imgLoad.images.length) * 100;
        if (newProgress > currentProgress) {
          const increment = Math.min(newProgress - currentProgress, 8);
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

  const mouseFollowerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mouseFollowerRef.current) {
      gsap.to(mouseFollowerRef.current, {
        autoAlpha: `${numbersProgress >= 100 ? 0 : 1}`,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        duration: 1,
        delay: 0.1,
        ease: "power4.out",
        onComplete: () => {
          numbersProgress >= 100 ? setIsLoading(false) : null;
        },
      });
    }
  }, [numbersProgress]);

  return (
    <>
      {isLoading && (
        <div className={`preloader ${className}`}>
          <MouseFollower
            ref={mouseFollowerRef}
            type="text"
            text={numbersProgress}
            className={`${className}`}
            style={{ color: "var(--token-color-text-contrast)" }}
          />
        </div>
      )}
    </>
  );
};

export default Preloader;
