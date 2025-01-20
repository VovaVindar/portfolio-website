import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT as getContact } from "@/constants/animations";

export const useContactTransition = (isOpen) => {
  const CONTACT = getContact();

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isInitialMount = useRef(true);

  useGSAP(() => {
    // Skip animation on initial mount
    if (isInitialMount.current) {
      if (containerRef.current && contentRef.current) {
        gsap.set(containerRef.current, {
          visibility: "hidden",
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
        });
        gsap.set(contentRef.current, {
          autoAlpha: 0,
          filter: `blur(${CONTACT.STYLES.BLUR.INACTIVE})`,
          color: CONTACT.STYLES.COLOR.INACTIVE,
        });
      }
      isInitialMount.current = false;
      return;
    }

    const containerAnimation = gsap.timeline();
    const contentAnimation = gsap.timeline();

    if (containerRef.current && contentRef.current) {
      if (isOpen) {
        // Opening animation
        containerAnimation.to(containerRef.current, {
          onStart: () => {
            gsap.set(containerRef.current, {
              visibility: "visible",
            });
          },
          duration: CONTACT.OPEN.CONTAINER.DURATION,
          ease: CONTACT.OPEN.CONTAINER.EASING,

          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255, 255, 255, 1)",
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
        // Only run closing animation if not on initial mount
        contentAnimation.to(contentRef.current, {
          autoAlpha: 0,
          duration: CONTACT.CLOSE.CONTENT.DURATION,
          ease: CONTACT.CLOSE.CONTENT.EASING,
          filter: `blur(${CONTACT.STYLES.BLUR.INACTIVE})`,
          color: CONTACT.STYLES.COLOR.INACTIVE,
        });

        containerAnimation.to(containerRef.current, {
          duration: CONTACT.CLOSE.CONTAINER.DURATION,
          ease: CONTACT.CLOSE.CONTAINER.EASING,
          delay: CONTACT.CLOSE.CONTAINER.DELAY,
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          onComplete: () => {
            gsap.set(containerRef.current, {
              visibility: "hidden",
            });
          },
        });
      }
    }
  }, [isOpen]);

  return { containerRef, contentRef };
};
