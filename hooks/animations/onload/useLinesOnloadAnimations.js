import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";
import { LINES } from "@/constants/animations";

export const useLinesOnloadAnimations = (
  startPageAnimation,
  completeTransition,
  linesReady
) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useGSAP(() => {
    if (!linesReady || !containerRef.current || hasAnimatedRef.current) return;

    const lines = Array.from(containerRef.current.children);
    if (lines.length === 0) return;

    const isHighDensity = lines.length > 60;
    const staggerInterval = isHighDensity
      ? LINES.TRANSITION.STAGGER.HIGH_DENSITY
      : LINES.TRANSITION.STAGGER.NORMAL;

    timelineRef.current = gsap.timeline().fromTo(
      lines,
      {
        scaleY: 1,
        transformOrigin: "bottom",
        backgroundColor: LINES.COLORS.START,
      },
      {
        scaleY: startPageAnimation ? 0 : 1,
        backgroundColor: startPageAnimation
          ? LINES.COLORS.END
          : LINES.COLORS.START,
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
      }
    );

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(containerRef.current?.children);
    };
  }, [startPageAnimation, completeTransition, linesReady]);

  return containerRef;
};
