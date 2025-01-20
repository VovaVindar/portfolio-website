import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";
import { PRELOADER as getPreloader } from "@/constants/animations";

export const usePreloaderOnloadAnimations = (loadProgress) => {
  const PRELOADER = getPreloader();

  const containerRef = useRef(null);
  const progressIndicatorRef = useRef(null);
  const timelineRefs = useRef({});

  useGSAP(() => {
    timelineRefs.current = {
      numbers: gsap.timeline({}),
      numbersOut: gsap.timeline({}),
      movement: gsap.timeline({}),
    };

    const isComplete = loadProgress >= 100;

    if (containerRef.current) {
      timelineRefs.current.numbers.to(containerRef.current, {
        autoAlpha: isComplete ? 0 : 1,
        filter: `blur(${
          isComplete ? PRELOADER.FADE.BLUR.COMPLETE : PRELOADER.FADE.BLUR.ACTIVE
        })`,
        duration: PRELOADER.FADE.DURATION,
        delay: PRELOADER.FADE.DELAY,
        ease: PRELOADER.FADE.EASING,
      });

      timelineRefs.current.numbersOut
        .set(containerRef.current, { y: 0 })
        .to(containerRef.current, {
          y: isComplete ? PRELOADER.SLIDE.Y_OFFSET : 0,
          duration: PRELOADER.SLIDE.DURATION,
          delay: 0,
          ease: PRELOADER.SLIDE.EASING,
        });
    }

    if (progressIndicatorRef.current) {
      timelineRefs.current.movement
        .set(progressIndicatorRef.current, {
          color: PRELOADER.PROGRESS.COLOR.START,
          opacity: PRELOADER.PROGRESS.OPACITY.START,
          textShadow: PRELOADER.PROGRESS.SHADOW.START,
        })
        .to(progressIndicatorRef.current, {
          marginLeft: `calc(${loadProgress}% - 3ch)`,
          color: isComplete
            ? PRELOADER.PROGRESS.COLOR.COMPLETE
            : PRELOADER.PROGRESS.COLOR.LOADING,
          textShadow: PRELOADER.PROGRESS.SHADOW.END,
          opacity: isComplete
            ? PRELOADER.PROGRESS.OPACITY.COMPLETE
            : PRELOADER.PROGRESS.OPACITY.LOADING,
          filter: `blur(${
            isComplete
              ? PRELOADER.PROGRESS.BLUR.COMPLETE
              : PRELOADER.PROGRESS.BLUR.START
          })`,
          duration: PRELOADER.PROGRESS.DURATION,
          ease: PRELOADER.PROGRESS.EASING,
        });
    }

    return () => {
      Object.values(timelineRefs.current).forEach((timeline) =>
        timeline?.kill()
      );
    };
  }, [loadProgress]);

  return { containerRef, progressIndicatorRef };
};
