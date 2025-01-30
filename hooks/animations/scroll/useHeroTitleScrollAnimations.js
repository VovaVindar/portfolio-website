import { useRef, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HERO as getHero } from "@/config/animations";
import { useReducedMotion } from "@/context/ReducedMotionContext";

gsap.registerPlugin(ScrollTrigger);

export const useHeroTitleScrollAnimations = (titleRef, loadCompleted) => {
  const HERO = getHero();
  const prefersReducedMotion = useReducedMotion();

  const scrollRef = useRef({ scrollTrigger: null, parallax: null });

  const cleanupScrollAnimations = useCallback(() => {
    if (scrollRef.current.scrollTrigger) {
      scrollRef.current.scrollTrigger.kill();
    }
    if (scrollRef.current.parallax) {
      scrollRef.current.parallax.kill();
    }
  }, []);

  const setupScrollAnimation = useCallback(() => {
    if (prefersReducedMotion) return;

    try {
      cleanupScrollAnimations();

      if (titleRef.current && loadCompleted) {
        scrollRef.current.parallax = gsap.fromTo(
          titleRef.current,
          { yPercent: 0 },
          {
            yPercent: HERO.SCROLL.TITLE.PARALLAX_END,
            ease: "none",
          }
        );

        scrollRef.current.scrollTrigger = ScrollTrigger.create({
          trigger: "body",
          animation: scrollRef.current.parallax,
          scrub: HERO.SCROLL.TITLE.SCRUB,
          start: "top top",
          end: HERO.SCROLL.TITLE.END_TRIGGER,
          invalidateOnRefresh: true,
          once: HERO.SCROLL.TITLE.ONCE,
        });
      }
    } catch (error) {
      console.error("Failed to setup scroll animation:", error);
    }
  }, [
    loadCompleted,
    cleanupScrollAnimations,
    titleRef,
    HERO,
    prefersReducedMotion,
  ]);

  useGSAP(() => {
    setupScrollAnimation();
    return cleanupScrollAnimations;
  }, [loadCompleted, setupScrollAnimation, cleanupScrollAnimations]);

  return scrollRef;
};
