import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { MAGNETIC } from "@/constants/animations";

export const useMagnetic = (type, passedScale, movement) => {
  const magneticAreaRef = useRef(null);
  const timelineRef = useRef(null);

  const maxScale =
    passedScale ||
    (type === "image" ? MAGNETIC.SCALE.IMAGE : MAGNETIC.SCALE.DEFAULT);
  const minScale = MAGNETIC.SCALE.MIN;
  const pMovement = type === "image" ? movement : MAGNETIC.MOVEMENT.TEXT;

  const [scale, setScale] = useState(maxScale);

  const animate = useCallback((target, props) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.to(target, {
      ...props,
      ease: MAGNETIC.ANIMATION.EASING,
      duration: MAGNETIC.ANIMATION.DURATION,
    });
  }, []);

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
    if (!element) return;

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
  }, [scale, animate, calculateParallax, maxScale, minScale]);

  return { magneticAreaRef, scale };
};
