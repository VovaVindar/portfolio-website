import { useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { HERO as getHero } from "@/config/animations";
import { useStartedLines } from "@/context/PreloaderContext";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useTransition } from "@/context/TransitionContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

export const useHeroTitleOnloadAnimations = (titleRef, onLoadComplete) => {
  const { width } = useWindowDimensions();
  const HERO = getHero();
  const prefersReducedMotion = useReducedMotion();

  const isWideScreen = width > 820;

  const { isStartedLines } = useStartedLines();
  const { globalOnload } = useTransition();

  useGSAP(() => {
    if (titleRef.current && !prefersReducedMotion) {
      const containerHeight = titleRef.current.parentElement.offsetHeight;
      const startY = -(containerHeight / 1.5);

      // Set initial styles
      gsap.set(titleRef.current, {
        y: startY,
        scale: isWideScreen ? HERO.LOAD.TITLE.SCALE.START : 1,
      });

      // Create timeline for better control
      globalOnload.to(
        titleRef.current,
        {
          y: 0,
          scale: HERO.LOAD.TITLE.SCALE.END,
          transformOrigin: "bottom",
          ease: HERO.EASING,
          duration: HERO.LOAD.TITLE.DURATION,
          onComplete: () => {
            setTimeout(() => {
              onLoadComplete(true);
            }, HERO.LOAD.TITLE.SCROLLTRIGGER_START_DELAY);
          },
        },
        HERO.LOAD.TITLE.INITIAL_DELAY
      );
    }
  }, [onLoadComplete]);

  // Blur & Opacity animation:
  const [titleStyles, setTitleStyles] = useState({
    opacity: HERO.LOAD.TITLE.INITIAL_OPACITY,
    blur: HERO.LOAD.TITLE.INITIAL_BLUR,
    transition: null,
  });

  useEffect(() => {
    if (isStartedLines) {
      if (
        HERO.LOAD.TITLE.INITIAL_DELAY - globalOnload.time() >
        -1 * HERO.LOAD.TITLE.INITIAL_DELAY
      ) {
        const totalDelay =
          (HERO.LOAD.TITLE.INITIAL_DELAY - globalOnload.time()) * 1000;

        const timer = setTimeout(() => {
          setTitleStyles({
            opacity: 1,
            blur: 0,
            transition: titleStyles.transition,
          });
        }, totalDelay);

        return () => clearTimeout(timer);
      } else {
        setTitleStyles({
          opacity: 1,
          blur: 0,
          transition: "none",
        });
      }
    }
  }, [isStartedLines, globalOnload, HERO]);

  return titleStyles;
};
