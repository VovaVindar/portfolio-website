import { useRef, useState, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { LINES as getLines } from "@/config/animations";
import { useTransition } from "@/context/TransitionContext";
import {
  useLinesStatus,
  useInterface,
  useStartedLines,
} from "@/context/PreloaderContext";

export const useLinesOnloadAnimations = (linesReady) => {
  const LINES = getLines();
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const { globalOnload } = useTransition();
  const { setTallScreen } = useInterface();
  const { completeTransition } = useLinesStatus();
  const { startedLines } = useStartedLines();

  const [lines, setLines] = useState([]);

  // Set lines and screen height
  useLayoutEffect(() => {
    if (!linesReady || !containerRef.current) return;

    const currentLines = Array.from(containerRef.current.children);
    if (currentLines.length === 0) return;

    // Set tall screen state based on line count
    if (currentLines.length > 60 && currentLines.length < 100) {
      setTallScreen(60);
    } else if (currentLines.length >= 100) {
      setTallScreen(100);
    }

    setLines(currentLines);
  }, [linesReady, setTallScreen]);

  // Run animation when lines are ready
  useGSAP(() => {
    if (!lines.length || !containerRef.current || hasAnimatedRef.current)
      return;

    globalOnload.fromTo(
      lines,
      {
        scaleY: 1,
        transformOrigin: "bottom",
        backgroundColor: LINES.COLORS.START,
      },
      {
        scaleY: LINES.TRANSITION.SCALEY,
        backgroundColor: LINES.COLORS.END,
        duration: LINES.TRANSITION.DURATION,
        delay: LINES.TRANSITION.DELAY,
        ease: LINES.TRANSITION.EASING,
        opacity: LINES.TRANSITION.OPACITY,
        stagger: {
          each: LINES.TRANSITION.STAGGER,
          from: "start",
        },
        onStart: () => {
          startedLines();
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
  }, [completeTransition, lines, LINES]);

  return containerRef;
};
