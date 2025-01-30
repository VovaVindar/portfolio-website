import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { MAGNETIC as getMagnetic } from "@/constants/animations";
import { useHoverCapable } from "@/hooks/utils/useHoverCapable";
import { useReducedMotion } from "@/context/ReducedMotionContext";

// Get the appropriate scale based on type
const getMaxScale = (type, passedScale, MAGNETIC) => {
  if (passedScale) return passedScale;

  switch (type) {
    case "image":
      return MAGNETIC.SCALE.IMAGE;
    case "medium-text":
      return MAGNETIC.SCALE.MEDIUM_TEXT;
    case "small-text":
      return MAGNETIC.SCALE.SMALL_TEXT;
    default:
      return MAGNETIC.SCALE.MEDIUM_TEXT;
  }
};

export const useMagnetic = (type, passedScale, passedMovement) => {
  const isHoverCapable = useHoverCapable();
  const MAGNETIC = getMagnetic();
  const prefersReducedMotion = useReducedMotion();

  const magneticAreaRef = useRef(null);
  const timelineRef = useRef(null);

  // Get the appropriate movement based on type
  const getMovement = () => {
    if (passedMovement) return passedMovement;

    switch (type) {
      case "image":
        return MAGNETIC.MOVEMENT.IMAGE;
      case "medium-text":
        return MAGNETIC.MOVEMENT.MEDIUM_TEXT;
      case "small-text":
        return MAGNETIC.MOVEMENT.SMALL_TEXT;
      default:
        return MAGNETIC.MOVEMENT.MEDIUM_TEXT;
    }
  };

  const maxScale = getMaxScale(type, passedScale, MAGNETIC);
  const minScale = MAGNETIC.SCALE.MIN;
  const pMovement = getMovement();

  const [scale, setScale] = useState(maxScale);

  const animate = useCallback(
    (target, props) => {
      if (!isHoverCapable || prefersReducedMotion) return; // Skip animation if hover is not supported

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.to(target, {
        ...props,
        ease: MAGNETIC.ANIMATION.EASING,
        duration: MAGNETIC.ANIMATION.DURATION,
      });
    },
    [MAGNETIC, isHoverCapable, prefersReducedMotion]
  );

  const calculateParallax = useCallback(
    (e, element, currentScale) => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const boundingRect = element.getBoundingClientRect();
      const relX = e.pageX - boundingRect.left;
      const relY = e.pageY - boundingRect.top;

      return {
        scale: currentScale,
        x: (relX - boundingRect.width / 2) * pMovement,
        y: (relY - boundingRect.height / 2 - scrollTop) * pMovement,
        opacity: 1,
      };
    },
    [pMovement]
  );

  useEffect(() => {
    const element = magneticAreaRef.current;
    if (!element || !isHoverCapable) return; // Skip effect if hover is not supported

    const handleMouseMove = (e) => {
      animate(element, calculateParallax(e, element, scale));
    };

    const handleMouseLeave = () => {
      setScale(maxScale);
      animate(element, {
        scale: 1,
        x: 0,
        y: 0,
      });
    };

    const handleMouseDown = (e) => {
      setScale(minScale);
      animate(element, calculateParallax(e, element, minScale));
    };

    const handleMouseUp = (e) => {
      setScale(maxScale);
      animate(element, calculateParallax(e, element, maxScale));
    };

    const events = [
      ["mousemove", handleMouseMove],
      ["mouseleave", handleMouseLeave],
      ["mousedown", handleMouseDown],
      ["mouseup", handleMouseUp],
    ];

    events.forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });

    return () => {
      events.forEach(([event, handler]) => {
        element.removeEventListener(event, handler);
      });
      timelineRef.current?.kill();
    };
  }, [scale, animate, calculateParallax, maxScale, minScale, isHoverCapable]);

  return { magneticAreaRef, scale };
};
