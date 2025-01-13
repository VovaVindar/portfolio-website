import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";
import { ONLOAD_LINES } from "@/constants/animations";

export const useOnloadLinesAnimation = (
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

    containerRef.current.classList.add("loading");

    const isHighDensity = lines.length > 60;
    const staggerInterval = isHighDensity
      ? ONLOAD_LINES.TRANSITION.STAGGER.HIGH_DENSITY
      : ONLOAD_LINES.TRANSITION.STAGGER.NORMAL;

    timelineRef.current = gsap.timeline().fromTo(
      lines,
      {
        scaleY: 1,
        transformOrigin: "bottom",
        backgroundColor: ONLOAD_LINES.COLORS.START,
      },
      {
        scaleY: startPageAnimation ? 0 : 1,
        backgroundColor: startPageAnimation
          ? ONLOAD_LINES.COLORS.END
          : ONLOAD_LINES.COLORS.START,
        duration: ONLOAD_LINES.TRANSITION.DURATION,
        delay: ONLOAD_LINES.TRANSITION.DELAY,
        ease: ONLOAD_LINES.TRANSITION.EASING,
        stagger: {
          each: staggerInterval,
          from: "start",
        },
        onComplete: () => {
          hasAnimatedRef.current = true;
          setTimeout(() => {
            completeTransition();
            containerRef.current?.classList.remove("scroll-block");
          }, ONLOAD_LINES.TRANSITION.COMPLETION_DELAY);
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
