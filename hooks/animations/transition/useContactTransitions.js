import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT } from "@/constants/animations";

export const useContactTransition = (isOpen) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const containerAnimation = gsap.timeline({});
    const contentAnimation = gsap.timeline({});

    if (containerRef.current && contentRef.current) {
      if (isOpen) {
        // Opening animation
        containerAnimation.to(containerRef.current, {
          autoAlpha: 1,
          duration: CONTACT.OPEN.CONTAINER.DURATION,
          ease: CONTACT.OPEN.CONTAINER.EASING,
        });

        contentAnimation.to(contentRef.current, {
          autoAlpha: 1,
          duration: CONTACT.OPEN.CONTENT.DURATION,
          ease: CONTACT.OPEN.CONTENT.EASING,
          filter: `blur(${CONTACT.STYLES.BLUR.ACTIVE})`,
          color: CONTACT.STYLES.COLOR.ACTIVE,
          delay: CONTACT.OPEN.CONTENT.DELAY,
        });
      } else {
        // Closing animation
        contentAnimation.to(containerRef.current, {
          autoAlpha: 0,
          duration: CONTACT.CLOSE.CONTAINER.DURATION,
          ease: CONTACT.CLOSE.CONTAINER.EASING,
          delay: CONTACT.CLOSE.CONTAINER.DELAY,
        });

        containerAnimation.to(contentRef.current, {
          autoAlpha: 0,
          duration: CONTACT.CLOSE.CONTENT.DURATION,
          ease: CONTACT.CLOSE.CONTENT.EASING,
          filter: `blur(${CONTACT.STYLES.BLUR.INACTIVE})`,
          color: CONTACT.STYLES.COLOR.INACTIVE,
        });
      }
    }
  }, [isOpen]);

  return { containerRef, contentRef };
};
