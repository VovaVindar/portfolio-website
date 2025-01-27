import { useRef, useMemo } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ABOUT as getAbout } from "@/constants/animations";
import { useTransition } from "@/context/TransitionContext";

gsap.registerPlugin(ScrollTrigger);

export const useAboutScrollAnimations = () => {
  const ABOUT = getAbout();

  const elementRef = useRef([]);

  const { globalOnload } = useTransition();

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

    if (elementRef.current.length && globalOnload) {
      // Set initial state
      gsap.set(elementRef.current, animConfig.hidden);

      // Add the scroll trigger creation to the timeline at the desired point
      globalOnload.add(() => {
        // Create and store the ScrollTrigger instance
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: elementRef.current,
          start: "top bottom",
          once: ABOUT.SCROLL.ONCE,
          onEnter: () => {
            // Create and execute the animation only when the scroll trigger fires
            gsap.to(elementRef.current, animConfig.visible);
          },
        });
      }, ABOUT.LOAD.START_DELAY / 1000);
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [globalOnload, animConfig]);

  return elementRef;
};
