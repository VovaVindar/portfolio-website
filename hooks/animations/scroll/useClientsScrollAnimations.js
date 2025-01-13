import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CLIENTS } from "@/constants/animations";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export const useClientsScrollAnimations = () => {
  const { startPageAnimation } = usePreloader();
  const timelineRef = useRef(null);
  const [startScroll, setStartScroll] = useState(false);
  const elementRef = useRef([]);

  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, CLIENTS.LOAD.START_DELAY);

      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  const animConfig = {
    hidden: {
      autoAlpha: 0,
      filter: `blur(${CLIENTS.SCROLL.BLUR.START})`,
      color: CLIENTS.SCROLL.COLOR.START,
    },
    visible: {
      autoAlpha: 1,
      filter: `blur(${CLIENTS.SCROLL.BLUR.END})`,
      color: CLIENTS.SCROLL.COLOR.END,
      duration: CLIENTS.SCROLL.DURATION,
      ease: CLIENTS.EASING,
      stagger: CLIENTS.SCROLL.STAGGER,
    },
  };

  useGSAP(() => {
    let batchInstance;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();

    if (elementRef.current.length) {
      timelineRef.current.set(elementRef.current, animConfig.hidden);

      if (startScroll) {
        batchInstance = ScrollTrigger.batch(elementRef.current, {
          onEnter: (batch) => {
            gsap.fromTo(batch, animConfig.hidden, animConfig.visible);
          },
          once: CLIENTS.SCROLL.ONCE,
          start: CLIENTS.SCROLL.TRIGGER.START,
          end: CLIENTS.SCROLL.TRIGGER.END,
          fastScrollEnd: true,
        });
      }
    }

    return () => {
      if (batchInstance) {
        if (Array.isArray(batchInstance)) {
          batchInstance.forEach((trigger) => trigger.kill());
        } else {
          batchInstance.kill();
        }
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [startScroll]);

  return elementRef;
};
