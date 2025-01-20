import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { WORK as getWork } from "@/constants/animations";
import styles from "@/components/Home/Work/Work.module.css";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export const useWorkScrollAnimations = () => {
  const WORK = getWork();
  const { startPageAnimation } = usePreloader();

  const textRefs = useRef([]);
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const [startScroll, setStartScroll] = useState(false);

  // Handle delayed scroll start
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, WORK.LOAD.START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation, WORK]);

  // Text animation config
  const animConfig = {
    text: {
      hidden: {
        opacity: WORK.SCROLL.TEXT.OPACITY.START,
        filter: `blur(${WORK.SCROLL.TEXT.BLUR.START})`,
      },
      visible: {
        opacity: 1,
        filter: `blur(${WORK.SCROLL.TEXT.BLUR.END})`,
        duration: WORK.SCROLL.TEXT.DURATION,
        ease: WORK.EASING,
      },
    },
  };

  // Text and container scroll animations
  useGSAP(() => {
    let triggers = {
      container: null,
      text: [],
    };

    imgRef?.current?.classList.remove(styles["in-view"]);

    // Set initial state for all text elements
    textRefs.current.forEach((ref) => {
      gsap.set(ref, animConfig.text.hidden);
    });

    if (startScroll) {
      // Img animation
      triggers.container = ScrollTrigger.create({
        trigger: imgRef.current,
        start: WORK.SCROLL.CONTAINER.TRIGGER.START,
        toggleClass: styles["in-view"],
        once: WORK.SCROLL.CONTAINER.ONCE,
      });

      // Text animations - create independent animation for each text element
      textRefs.current.forEach((ref) => {
        const textTrigger = ScrollTrigger.create({
          trigger: ref,
          start: WORK.SCROLL.TEXT.TRIGGER.START,
          onEnter: () => {
            // Create a new timeline for each element
            gsap.to(ref, animConfig.text.visible);
          },
          once: WORK.SCROLL.TEXT.ONCE,
        });
        triggers.text.push(textTrigger);
      });
    }

    return () => {
      triggers.container?.kill();
      triggers.text.forEach((trigger) => trigger?.kill());
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

  return { imgRef, addToTextRefs, sectionRef };
};
