import { useRef, useEffect, useState, useLayoutEffect, useMemo } from "react";
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

  // Calculate lineHeight and endOffset after mount
  const [endOffset, setEndOffset] = useState(0);

  useLayoutEffect(() => {
    const lineHeight = parseFloat(
      getComputedStyle(document.documentElement).lineHeight
    );
    setEndOffset(
      lineHeight * WORK.SCROLL.PARALLAX.TRIGGER.END_OFFSET_MULTIPLIER
    );
  }, [WORK.SCROLL.PARALLAX.TRIGGER.END_OFFSET_MULTIPLIER]);

  // Handle delayed scroll start
  const [startScroll, setStartScroll] = useState(false);
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartScroll(true);
      }, WORK.LOAD.START_DELAY);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation, WORK]);

  // Text animation config
  const animConfig = useMemo(
    () => ({
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
    }),
    [WORK]
  );

  // Text and container scroll animations
  useGSAP(() => {
    let triggers = {
      container: null,
      text: [],
    };

    //imgRef?.current?.classList.remove(styles["in-view"]);

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
  }, [startScroll, animConfig]);

  // Combined parallax scroll animation
  useGSAP(() => {
    if (!endOffset) return;

    let scrollTriggers = [];

    [sectionRef, imgRef].forEach((ref) => {
      if (ref.current) {
        // Different values for imgRef
        const startPercent =
          ref === imgRef
            ? WORK.SCROLL.PARALLAX.Y_PERCENT.START * 0.9
            : WORK.SCROLL.PARALLAX.Y_PERCENT.START;

        const endTrigger =
          ref === imgRef ? "center center" : `bottom bottom-=${endOffset}`;

        const animation = gsap.fromTo(
          ref.current,
          {
            yPercent: startPercent,
          },
          {
            yPercent: WORK.SCROLL.PARALLAX.Y_PERCENT.END,
            ease: "none",
          }
        );

        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          animation: animation,
          scrub: WORK.SCROLL.PARALLAX.SCRUB,
          start: WORK.SCROLL.PARALLAX.TRIGGER.START,
          end: endTrigger,
        });

        scrollTriggers.push({ trigger, animation });
      }
    });

    return () => {
      scrollTriggers.forEach(({ trigger, animation }) => {
        trigger?.kill();
        animation?.kill();
      });
    };
  }, [endOffset]);

  return { imgRef, addToTextRefs, sectionRef };
};
