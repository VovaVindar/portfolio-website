import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CLIENTS as getClients } from "@/constants/animations";
import { useTransition } from "@/context/TransitionContext";

gsap.registerPlugin(ScrollTrigger);

export const useClientsScrollAnimations = () => {
  const CLIENTS = getClients();

  const elementRef = useRef([]);

  const { globalOnload } = useTransition();

  const animConfig = useMemo(
    () => ({
      hidden: {
        autoAlpha: CLIENTS.SCROLL.AUTOALPHA.START,
        filter: `blur(${CLIENTS.SCROLL.BLUR.START})`,
        //color: CLIENTS.SCROLL.COLOR.START,
      },
      visible: {
        autoAlpha: 1,
        filter: `blur(${CLIENTS.SCROLL.BLUR.END})`,
        //color: CLIENTS.SCROLL.COLOR.END,
        duration: CLIENTS.SCROLL.DURATION,
        ease: CLIENTS.EASING,
        stagger: CLIENTS.SCROLL.STAGGER,
      },
    }),
    [CLIENTS]
  );

  useGSAP(() => {
    let batchInstance;

    if (elementRef.current.length) {
      gsap.set(elementRef.current, animConfig.hidden);

      // Add the batch scroll trigger creation to the timeline at the desired point
      globalOnload.add(() => {
        batchInstance = ScrollTrigger.batch(elementRef.current, {
          onEnter: (batch) => {
            // Create and execute the animation only when the scroll trigger fires
            gsap.to(batch, animConfig.visible);
          },
          once: CLIENTS.SCROLL.ONCE,
          start: CLIENTS.SCROLL.TRIGGER.START,
          end: CLIENTS.SCROLL.TRIGGER.END,
        });
      }, CLIENTS.LOAD.START_DELAY / 1000); // Convert ms to seconds for GSAP
    }

    return () => {
      if (batchInstance) {
        if (Array.isArray(batchInstance)) {
          batchInstance.forEach((trigger) => trigger.kill());
        } else {
          batchInstance.kill();
        }
      }
    };
  }, [globalOnload, animConfig]);

  return elementRef;
};
