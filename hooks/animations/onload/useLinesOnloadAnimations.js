import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { LINES } from "@/constants/animations";
import { useTransition } from "@/context/TransitionContext";

export const useLinesOnloadAnimations = (completeTransition, linesReady) => {
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const { globalOnload } = useTransition();

  useGSAP(() => {
    if (!linesReady || !containerRef.current || hasAnimatedRef.current) return;

    const lines = Array.from(containerRef.current.children);
    if (lines.length === 0) return;

    const isHighDensity = lines.length > 60;
    const staggerInterval = isHighDensity
      ? LINES.TRANSITION.STAGGER.HIGH_DENSITY
      : LINES.TRANSITION.STAGGER.NORMAL;

    globalOnload.fromTo(
      lines,
      {
        scaleY: 1,
        transformOrigin: "bottom",
        backgroundColor: LINES.COLORS.START,
      },
      {
        scaleY: 0,
        backgroundColor: LINES.COLORS.END,
        duration: LINES.TRANSITION.DURATION,
        delay: LINES.TRANSITION.DELAY,
        ease: LINES.TRANSITION.EASING,
        stagger: {
          each: staggerInterval,
          from: "start",
        },
        onComplete: () => {
          hasAnimatedRef.current = true;
          setTimeout(() => {
            completeTransition();
            containerRef.current?.classList.remove("scroll-block");
          }, LINES.TRANSITION.COMPLETION_DELAY);
        },
      },
      0
    );
  }, [completeTransition, linesReady]);

  return containerRef;
};
