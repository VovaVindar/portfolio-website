import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PROJECT_HOVER } from "@/constants/animations";

export const useProjectHoverAnimations = (text) => {
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
        autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.ACTIVE,
        duration: PROJECT_HOVER.ENTER.DURATION,
        ease: PROJECT_HOVER.ENTER.EASING,
        filter: `blur(${PROJECT_HOVER.STYLES.BLUR.ACTIVE})`,
        color: PROJECT_HOVER.STYLES.COLOR.ACTIVE,
      });
    } else {
      // Fade out and then update text
      animation.current.to(elementRef.current, {
        autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.INACTIVE,
        duration: PROJECT_HOVER.EXIT.DURATION,
        ease: PROJECT_HOVER.EXIT.EASING,
        filter: `blur(${PROJECT_HOVER.STYLES.BLUR.INACTIVE})`,
        color: PROJECT_HOVER.STYLES.COLOR.INACTIVE,
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
