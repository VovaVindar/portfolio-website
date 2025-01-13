import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FOOTER } from "@/constants/animations";
import styles from "@/components/Home/Footer/Footer.module.css";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export const useFooterScrollAnimations = () => {
  const { startPageAnimation } = usePreloader();
  const elementRef = useRef([]);
  const socialRef = useRef(null);
  const timelineRef = useRef(null);
  const [startScroll, setStartScroll] = useState(false);

  // Stagger calculation functions
  const footerStaggerDesktop = useCallback((index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 5) return 1 * interval;
    if (index >= 6 && index <= 7) return 2 * interval;
    if (index == 8) return 3 * interval;
    if (index == 9) return 4 * interval;
    if (index >= 9) return 6 * interval;
  }, []);

  const footerStaggerMobile = useCallback((index, interval) => {
    const multipliers = [0, 3, 7, 1, 4, 7, 2, 5, 6, 3, 10, 10];
    return (multipliers[index] ?? 0) * interval;
  }, []);

  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, FOOTER.LOAD.START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline();

    if (elementRef.current.length && startScroll) {
      const initialState = {
        opacity: 0,
        filter: `blur(${FOOTER.SCROLL.BLUR.START})`,
        color: FOOTER.SCROLL.COLOR.START,
      };

      timelineRef.current.set(elementRef.current, initialState);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: elementRef.current,
        start: FOOTER.SCROLL.TRIGGER.START,
        onEnter: () => {
          timelineRef.current.fromTo(elementRef.current, initialState, {
            opacity: 1,
            filter: `blur(${FOOTER.SCROLL.BLUR.END})`,
            color: FOOTER.SCROLL.COLOR.END,
            delay: 0,
            duration: FOOTER.SCROLL.DURATION,
            ease: FOOTER.EASING,
            stagger: (index) =>
              window.innerWidth > 820
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
          });
        },
        once: FOOTER.SCROLL.ONCE,
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [startScroll, footerStaggerDesktop, footerStaggerMobile]);

  return { elementRef, socialRef };
};
