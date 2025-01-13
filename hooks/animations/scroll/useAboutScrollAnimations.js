import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ABOUT } from "@/constants/animations";

gsap.registerPlugin(ScrollTrigger);

export const useAboutScrollAnimations = (startPageAnimation) => {
  const timelineRef = useRef(null);
  const [startScroll, setStartScroll] = useState(false);
  const elementRef = useRef([]);

  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, ABOUT.LOAD.START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  const animConfig = {
    hidden: {
      autoAlpha: 0,
      filter: `blur(${ABOUT.SCROLL.BLUR.START})`,
      color: ABOUT.SCROLL.COLOR.START,
    },
    visible: {
      autoAlpha: 1,
      filter: `blur(${ABOUT.SCROLL.BLUR.END})`,
      color: ABOUT.SCROLL.COLOR.END,
      delay: 0,
      duration: ABOUT.SCROLL.DURATION,
      ease: ABOUT.EASING,
      stagger: ABOUT.SCROLL.STAGGER,
    },
  };

  useGSAP(() => {
    let scrollTriggerInstance;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline();

    if (elementRef.current.length) {
      timelineRef.current.set(elementRef.current, animConfig.hidden);

      if (startScroll) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: elementRef.current,
          start: "top bottom",
          onEnter: () => {
            timelineRef.current.fromTo(
              elementRef.current,
              animConfig.hidden,
              animConfig.visible
            );
          },
          once: ABOUT.SCROLL.ONCE,
        });
      }
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
  }, [startScroll]);

  return elementRef;
};
