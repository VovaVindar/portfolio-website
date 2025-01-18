import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CONTACT } from "@/constants/animations";

export const useHeroHoverAnimations = (text) => {
  const animation = useRef(null);
  const elementRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!elementRef.current) return;

    // Kill any existing animation
    if (animation.current) {
      animation.current.kill();
    }

    // Create new animation
    animation.current = gsap.timeline();

    if (text) {
      // Update text immediately for fade in
      setDisplayText(text);

      animation.current.to(elementRef.current, {
        autoAlpha: 1,
        duration: CONTACT.OPEN.CONTENT.DURATION,
        ease: CONTACT.OPEN.CONTENT.EASING,
        filter: `blur(${CONTACT.STYLES.BLUR.ACTIVE})`,
        color: CONTACT.STYLES.COLOR.ACTIVE,
      });
    } else {
      // Fade out and then update text
      animation.current.to(elementRef.current, {
        autoAlpha: 0,
        duration: CONTACT.CLOSE.CONTENT.DURATION,
        ease: CONTACT.CLOSE.CONTENT.EASING,
        filter: `blur(${CONTACT.STYLES.BLUR.INACTIVE})`,
        color: CONTACT.STYLES.COLOR.INACTIVE,
        onComplete: () => setDisplayText(""), // Clear text only after animation
      });
    }

    return () => {
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, [text]);

  return { elementRef, displayText };
};
