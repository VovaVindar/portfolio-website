import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { HERO } from "@/constants/animations";

export const useHeroTitleOnloadAnimations = (
  titleRef,
  isAnimating,
  duration,
  onLoadComplete
) => {
  const onloadRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (titleRef.current) {
      const containerHeight = titleRef.current.parentElement.offsetHeight;
      const startY = -(containerHeight / 1.5);

      if (onloadRef.current) onloadRef.current.kill();

      onloadRef.current = gsap.fromTo(
        titleRef.current,
        {
          yPercent: startY,
          scale: HERO.LOAD.TITLE.SCALE.START,
        },
        {
          yPercent: !isAnimating ? 0 : startY,
          scale: !isAnimating
            ? HERO.LOAD.TITLE.SCALE.END
            : HERO.LOAD.TITLE.SCALE.START,
          transformOrigin: "bottom",
          ease: HERO.EASING,
          duration: duration + HERO.LOAD.TITLE.DURATION_OFFSET,
          delay: 0,
          onComplete: () => {
            timeoutId = setTimeout(() => {
              onLoadComplete(true);
            }, HERO.LOAD.TITLE.SCROLLTRIGGER_START_DELAY);
          },
        }
      );
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (onloadRef.current) onloadRef.current.kill();
    };
  }, [isAnimating, duration, onLoadComplete]);

  return onloadRef;
};
