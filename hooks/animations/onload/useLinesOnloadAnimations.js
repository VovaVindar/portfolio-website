import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { LINES as getLines } from "@/constants/animations";
import { useTransition } from "@/context/TransitionContext";
import { usePreloader } from "@/context/PreloaderContext";

export const useLinesOnloadAnimations = (linesReady) => {
  const LINES = getLines();

  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const { globalOnload } = useTransition();
  const { completeTransition, setTallScreen } = usePreloader();

  useGSAP(() => {
    if (!linesReady || !containerRef.current || hasAnimatedRef.current) return;

    const lines = Array.from(containerRef.current.children);
    if (lines.length === 0) return;

    if (lines.length > 60) {
      setTallScreen();
    }

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
          each: LINES.TRANSITION.STAGGER,
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
