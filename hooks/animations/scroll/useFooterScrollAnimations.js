import { useRef, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FOOTER as getFooter } from "@/config/animations";
import styles from "@/components/Home/Footer/Footer.module.css";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useTransition } from "@/context/TransitionContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 820;

export const useFooterScrollAnimations = () => {
  const FOOTER = getFooter();
  const { width } = useWindowDimensions();
  const prefersReducedMotion = useReducedMotion();

  const elementRef = useRef([]);
  const socialRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  const { globalOnload } = useTransition();

  // Stagger calculation functions
  const footerStaggerDesktop = useCallback((index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 5) return 1 * interval;
    if (index >= 6 && index <= 7) return 2 * interval;
    if (index == 8) return 3 * interval;
    if (index == 9) return 4 * interval;
    if (index >= 10) return 7 * interval;
  }, []);

  const footerStaggerMobile = useCallback((index, interval) => {
    const multipliers = [0, 3, 8, 1, 4, 9, 2, 5, 6, 7, 0, 11, 12];
    return (multipliers[index] ?? 0) * interval;
  }, []);

  const animConfig = useMemo(
    () => ({
      hidden: {
        opacity: FOOTER.SCROLL.OPACITY.START,
        filter: `blur(${FOOTER.SCROLL.BLUR.START})`,
        //color: FOOTER.SCROLL.COLOR.START,
      },
      visible: {
        opacity: 1,
        filter: `blur(${FOOTER.SCROLL.BLUR.END})`,
        //color: FOOTER.SCROLL.COLOR.END,
        delay: 0,
        duration: FOOTER.SCROLL.DURATION,
        ease: FOOTER.EASING,
        stagger: (index) =>
          width > DESKTOP_BREAKPOINT
            ? footerStaggerDesktop(index, FOOTER.SCROLL.STAGGER)
            : footerStaggerMobile(
                index,
                FOOTER.SCROLL.STAGGER + FOOTER.SCROLL.STAGGER_MOBILE_OFFSET
              ),
        onComplete: () => {
          if (socialRef.current) {
            socialRef.current.classList.add(styles["in-view"]);
          }
        },
      },
    }),
    [FOOTER, footerStaggerDesktop, footerStaggerMobile, socialRef, width]
  );

  useGSAP(() => {
    if (prefersReducedMotion) return;

    let scrollTriggerInstance;

    if (elementRef.current.length) {
      // Only set to hidden state if we haven't entered the viewport yet
      if (!hasEntered) {
        gsap.set(elementRef.current, animConfig.hidden);
      }

      // Add the scroll trigger creation to the timeline at the desired point
      globalOnload.add(() => {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: elementRef.current,
          start: FOOTER.SCROLL.TRIGGER.START,
          onEnter: () => {
            // Create and execute the animation only when the scroll trigger fires
            gsap.to(elementRef.current, animConfig.visible);
            setHasEntered(true);
          },
          once: FOOTER.SCROLL.ONCE,
        });
      }, FOOTER.LOAD.START_DELAY);
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [globalOnload, animConfig, footerStaggerDesktop, footerStaggerMobile]);

  return { elementRef, socialRef };
};
