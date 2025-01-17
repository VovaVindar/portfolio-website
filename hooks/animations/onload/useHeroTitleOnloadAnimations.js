import { useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/constants/animations";
import { usePreloader } from "@/context/PreloaderContext";
import { useTransition } from "@/context/TransitionContext";

export const useHeroTitleOnloadAnimations = (titleRef, onLoadComplete) => {
  const { startPageAnimation } = usePreloader();
  const { globalOnload } = useTransition();

  useGSAP(() => {
    if (titleRef.current) {
      const containerHeight = titleRef.current.parentElement.offsetHeight;
      const startY = -(containerHeight / 1.5);

      // Set initial styles
      gsap.set(titleRef.current, {
        yPercent: startY,
        scale: HERO.LOAD.TITLE.SCALE.START,
      });

      // Create timeline for better control
      globalOnload.to(
        titleRef.current,
        {
          yPercent: 0,
          scale: HERO.LOAD.TITLE.SCALE.END,
          transformOrigin: "bottom",
          ease: HERO.EASING,
          duration:
            HERO.LOAD.GRID.CELL_DURATION + HERO.LOAD.TITLE.DURATION_OFFSET,
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
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(HERO.LOAD.TITLE.INITIAL_BLUR);
  const [transition, setTransition] = useState(null);

  useEffect(() => {
    setOpacity(0);
    setBlur(HERO.LOAD.TITLE.INITIAL_BLUR);

    if (startPageAnimation) {
      if (
        HERO.LOAD.TITLE.INITIAL_DELAY - globalOnload.time() >
        -1 * HERO.LOAD.TITLE.INITIAL_DELAY
      ) {
        const totalDelay =
          (HERO.LOAD.TITLE.INITIAL_DELAY - globalOnload.time()) * 1000;

        const timer = setTimeout(() => {
          setOpacity(1);
          setBlur(0);
        }, totalDelay);

        return () => clearTimeout(timer);
      } else {
        setTransition("none");
        setOpacity(1);
        setBlur(0);
      }
    }
  }, [startPageAnimation, globalOnload]);

  return { opacity, blur, transition };
};
