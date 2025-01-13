import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/constants/animations";
import { usePreloader } from "@/context/PreloaderContext";
import { useTransition } from "@/context/TransitionContext";

export const useHeroTitleOnloadAnimations = (titleRef, onLoadComplete) => {
  const { startPageAnimation } = usePreloader();
  const { isPageChanging } = useTransition();
  const onloadRef = useRef(null);

  useGSAP(() => {
    if (onloadRef.current) onloadRef.current.kill();

    if (startPageAnimation && !isPageChanging) {
      if (titleRef.current) {
        const containerHeight = titleRef.current.parentElement.offsetHeight;
        const startY = -(containerHeight / 1.5);

        // Set initial styles
        gsap.set(titleRef.current, {
          yPercent: startY,
          scale: HERO.LOAD.TITLE.SCALE.START,
        });

        // Create timeline for better control
        onloadRef.current = gsap.timeline().to(titleRef.current, {
          yPercent: 0,
          scale: HERO.LOAD.TITLE.SCALE.END,
          transformOrigin: "bottom",
          ease: HERO.EASING,
          duration:
            HERO.LOAD.GRID.CELL_DURATION + HERO.LOAD.TITLE.DURATION_OFFSET,
          delay: HERO.LOAD.TITLE.INITIAL_DELAY,
          onComplete: () => {
            setTimeout(() => {
              onLoadComplete(true);
            }, HERO.LOAD.TITLE.SCROLLTRIGGER_START_DELAY);
          },
        });
      }
    }

    return () => {
      onloadRef.current?.kill();
      onloadRef.current = null;
    };
  }, [startPageAnimation, onLoadComplete]);

  // Blur & Opacity animation:
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(HERO.LOAD.TITLE.INITIAL_BLUR);
  const [transition, setTransition] = useState(null);

  useEffect(() => {
    if (isPageChanging && titleRef.current) {
      setTransition("none"); // Remove transition
      setOpacity(1);
      setBlur(0);
    } else if (startPageAnimation) {
      const totalDelay = HERO.LOAD.TITLE.INITIAL_DELAY * 1000;

      const timer = setTimeout(() => {
        setOpacity(1);
        setBlur(0);
      }, totalDelay);

      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
      setBlur(HERO.LOAD.TITLE.INITIAL_BLUR);
    }
  }, [startPageAnimation, isPageChanging]);

  return { onloadRef, opacity, blur, transition };
};
