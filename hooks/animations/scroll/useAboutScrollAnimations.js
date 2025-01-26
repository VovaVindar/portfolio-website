import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ABOUT as getAbout } from "@/constants/animations";
import { useStart } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export const useAboutScrollAnimations = () => {
  const ABOUT = getAbout();

  const { startPageAnimation } = useStart();
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
  }, [startPageAnimation, ABOUT]);

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
          fastScrollEnd: true,
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
