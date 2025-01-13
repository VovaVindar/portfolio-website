import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { WORK } from "@/constants/animations";
import styles from "@/components/Home/Work/Work.module.css";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export const useWorkScrollAnimations = () => {
  const { startPageAnimation } = usePreloader();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [startScroll, setStartScroll] = useState(false);

  // Handle delayed scroll start
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, WORK.LOAD.START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  // Text animation config
  const animConfig = {
    text: {
      hidden: {
        opacity: 0,
        filter: `blur(${WORK.SCROLL.TEXT.BLUR.START})`,
      },
      visible: {
        opacity: 1,
        filter: `blur(${WORK.SCROLL.TEXT.BLUR.END})`,
        delay: 0,
        duration: WORK.SCROLL.TEXT.DURATION,
        ease: WORK.EASING,
      },
    },
  };

  // Text and container scroll animations
  useGSAP(() => {
    let triggers = {
      container: null,
      text: null,
    };

    if (timelineRef.current) timelineRef.current.kill();
    timelineRef.current = gsap.timeline();

    containerRef?.current?.classList.remove(styles["in-view"]);
    timelineRef.current.set(textRef.current, animConfig.text.hidden);

    if (startScroll) {
      // Container animation
      triggers.container = ScrollTrigger.create({
        trigger: containerRef.current,
        start: WORK.SCROLL.CONTAINER.TRIGGER.START,
        toggleClass: styles["in-view"],
        once: WORK.SCROLL.CONTAINER.ONCE,
      });

      // Text animation
      triggers.text = ScrollTrigger.create({
        trigger: textRef.current,
        start: WORK.SCROLL.TEXT.TRIGGER.START,
        onEnter: () => {
          timelineRef.current.fromTo(
            textRef.current,
            animConfig.text.hidden,
            animConfig.text.visible
          );
        },
        once: WORK.SCROLL.TEXT.ONCE,
      });
    }

    return () => {
      Object.values(triggers).forEach((trigger) => trigger?.kill());
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [startScroll]);

  // Parallax scroll animation
  useGSAP(() => {
    let parallaxAnimation;
    let scrollTriggerInstance;

    if (sectionRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(document.documentElement).lineHeight
      );
      const endOffset =
        lineHeight * WORK.SCROLL.PARALLAX.TRIGGER.END_OFFSET_MULTIPLIER;

      parallaxAnimation = gsap.fromTo(
        sectionRef.current,
        {
          yPercent: WORK.SCROLL.PARALLAX.Y_PERCENT.START,
        },
        {
          yPercent: WORK.SCROLL.PARALLAX.Y_PERCENT.END,
          ease: "none",
        }
      );

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: parallaxAnimation,
        scrub: WORK.SCROLL.PARALLAX.SCRUB,
        start: WORK.SCROLL.PARALLAX.TRIGGER.START,
        end: `bottom bottom-=${endOffset}`,
      });
    }

    return () => {
      scrollTriggerInstance?.kill();
      parallaxAnimation?.kill();
    };
  }, []);

  return { containerRef, textRef, sectionRef };
};
