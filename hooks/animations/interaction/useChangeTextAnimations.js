import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CHANGE_TEXT as getChangeText } from "@/config/animations";
import { useLinesStatus } from "@/context/PreloaderContext";

export const useChangeTextAnimations = (text) => {
  const CHANGE_TEXT = getChangeText();

  const animation = useRef(null);
  const elementRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const previousTextRef = useRef(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isOnloadLinesActive } = useLinesStatus();

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
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.ACTIVE,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.ACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.ACTIVE,
          });
        } else {
          gsap.set(elementRef.current, {
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.INACTIVE,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.INACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.INACTIVE,
          });
        }
        previousTextRef.current = text;
        return;
      }

      // Case 1: Fade out to empty
      if (isTextChanging && isTextEmpty) {
        animation.current.add(
          gsap.to(elementRef.current, {
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.INACTIVE,
            duration: CHANGE_TEXT.EXIT.DURATION,
            ease: CHANGE_TEXT.EXIT.EASING,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.INACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.INACTIVE,
            onComplete: () => setDisplayText(""),
          })
        );
      }
      // Case 2: Text changing between non-empty values
      else if (isTextChanging && !isTextEmpty && !wasPreviousTextEmpty) {
        animation.current
          .to(elementRef.current, {
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.INACTIVE,
            duration: CHANGE_TEXT.EXIT.DURATION,
            ease: CHANGE_TEXT.EXIT.EASING,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.INACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.INACTIVE,
            onComplete: () => setDisplayText(text),
          })
          .to(elementRef.current, {
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.ACTIVE,
            duration: CHANGE_TEXT.ENTER.DURATION,
            ease: CHANGE_TEXT.ENTER.EASING,
            delay: CHANGE_TEXT.ENTER.DELAY,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.ACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.ACTIVE,
          });
      }
      // Case 3: Fade in from empty to non-empty
      else if (isTextChanging && !isTextEmpty && wasPreviousTextEmpty) {
        animation.current.add(
          gsap.to(elementRef.current, {
            onStart: () => setDisplayText(text),
            autoAlpha: CHANGE_TEXT.STYLES.AUTOALPHA.ACTIVE,
            duration: CHANGE_TEXT.ENTER.DURATION,
            ease: CHANGE_TEXT.ENTER.EASING,
            filter: `blur(${CHANGE_TEXT.STYLES.BLUR.ACTIVE})`,
            color: CHANGE_TEXT.STYLES.COLOR.ACTIVE,
          })
        );
      }

      // Update previous text reference
      previousTextRef.current = text;
    }
  }, [text, isAnimating, isOnloadLinesActive]);

  return { elementRef, displayText };
};
