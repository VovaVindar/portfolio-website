import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";
import { ABOUT as getAbout } from "@/constants/animations";
import { useTransition } from "@/context/TransitionContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

export const usePrivacyOnloadAnimations = (container, content, CONTACT) => {
  const ABOUT = getAbout();
  const prefersReducedMotion = useReducedMotion();

  const elementRef = useRef([]);

  const { globalOnload, isPageChanged } = useTransition();

  const animConfig = useMemo(
    () => ({
      hidden: {
        autoAlpha: ABOUT.SCROLL.AUTOALPHA.START,
        filter: `blur(${ABOUT.SCROLL.BLUR.START})`,
        //color: ABOUT.SCROLL.COLOR.START,
      },
      visible: {
        autoAlpha: 1,
        filter: `blur(${ABOUT.SCROLL.BLUR.END})`,
        //color: ABOUT.SCROLL.COLOR.END,
        duration: ABOUT.SCROLL.DURATION,
        ease: ABOUT.EASING,
        stagger: ABOUT.SCROLL.STAGGER,
      },
    }),
    [ABOUT]
  );

  useGSAP(() => {
    if (elementRef.current.length && globalOnload && !prefersReducedMotion) {
      // Handle text elements animation
      globalOnload.add(() => {
        gsap.set(elementRef.current, animConfig.hidden);
      }, 0);

      globalOnload.add(() => {
        gsap.to(elementRef.current, animConfig.visible);
      }, 1.8);

      if (isPageChanged) {
        gsap.set(elementRef.current, animConfig.visible);
      }
    }
  }, [globalOnload, animConfig]);

  useGSAP(() => {
    if (container.current && content.current) {
      // Set initial state for container and content
      globalOnload.add(() => {
        gsap.set(container.current, {
          backdropFilter: "blur(4px)",
          opacity: 1,
        });
      }, 0);

      globalOnload.add(() => {
        gsap.set(content.current, {
          autoAlpha: 1,
          filter: `blur(${CONTACT.STYLES.BLUR.ACTIVE})`,
          color: CONTACT.STYLES.COLOR.ACTIVE,
        });
      }, 0);
    }
  }, [container, content]);

  return elementRef;
};
