import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PROJECT_HOVER as getProjectHover } from "@/constants/animations";
import { usePreloader } from "@/context/PreloaderContext";

export const useProjectHoverAnimations = (text) => {
  const PROJECT_HOVER = getProjectHover();

  const animation = useRef(null);
  const elementRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const previousTextRef = useRef(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isOnloadLinesActive } = usePreloader();

  useGSAP(() => {
    if (!elementRef.current) return;

    // If currently animating, don't start a new animation
    if (isAnimating) return;

    // Kill any existing animation
    if (animation.current) {
      animation.current.kill();
    }

    // Create new animation timeline
    animation.current = gsap.timeline({
      onStart: () => setIsAnimating(true),
      onComplete: () => setIsAnimating(false),
    });

    const isInitialRender = previousTextRef.current === text;
    const isTextEmpty = text === "";
    const wasPreviousTextEmpty = previousTextRef.current === "";
    const isTextChanging = previousTextRef.current !== text;

    if (!isOnloadLinesActive) {
      // Initial render
      if (isInitialRender) {
        if (!isTextEmpty) {
          gsap.set(elementRef.current, {
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.ACTIVE,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.ACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.ACTIVE,
          });
        } else {
          gsap.set(elementRef.current, {
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.INACTIVE,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.INACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.INACTIVE,
          });
        }
        previousTextRef.current = text;
        return;
      }

      // Case 1: Fade out to empty
      if (isTextChanging && isTextEmpty) {
        animation.current.add(
          gsap.to(elementRef.current, {
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.INACTIVE,
            duration: PROJECT_HOVER.EXIT.DURATION,
            ease: PROJECT_HOVER.EXIT.EASING,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.INACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.INACTIVE,
            onComplete: () => setDisplayText(""),
          })
        );
      }
      // Case 2: Text changing between non-empty values
      else if (isTextChanging && !isTextEmpty && !wasPreviousTextEmpty) {
        animation.current
          .to(elementRef.current, {
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.INACTIVE,
            duration: PROJECT_HOVER.EXIT.DURATION,
            ease: PROJECT_HOVER.EXIT.EASING,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.INACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.INACTIVE,
            onComplete: () => setDisplayText(text),
          })
          .to(elementRef.current, {
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.ACTIVE,
            duration: PROJECT_HOVER.ENTER.DURATION,
            ease: PROJECT_HOVER.ENTER.EASING,
            delay: PROJECT_HOVER.ENTER.DELAY,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.ACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.ACTIVE,
          });
      }
      // Case 3: Fade in from empty to non-empty
      else if (isTextChanging && !isTextEmpty && wasPreviousTextEmpty) {
        animation.current.add(
          gsap.to(elementRef.current, {
            onStart: () => setDisplayText(text),
            autoAlpha: PROJECT_HOVER.STYLES.AUTOALPHA.ACTIVE,
            duration: PROJECT_HOVER.ENTER.DURATION,
            ease: PROJECT_HOVER.ENTER.EASING,
            filter: `blur(${PROJECT_HOVER.STYLES.BLUR.ACTIVE})`,
            color: PROJECT_HOVER.STYLES.COLOR.ACTIVE,
          })
        );
      }

      // Update previous text reference
      previousTextRef.current = text;
    }
  }, [text, isAnimating, isOnloadLinesActive]);

  return { elementRef, displayText };
};
