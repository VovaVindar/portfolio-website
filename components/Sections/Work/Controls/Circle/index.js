import React, { useRef, useEffect } from "react";
import styles from "./Circle.module.css";
import gsap from "gsap";

const Circle = ({ speedCoef, isStopRunning, setFakeSpeedCoef }) => {
  // Circle animation
  const circleRef = useRef(null);

  const circleAnimation = gsap.timeline();

  useEffect(() => {
    if (circleRef.current) {
      // Spin the circle container
      circleAnimation.to(circleRef.current, {
        rotation: `${!isStopRunning ? "+=360" : "-=360"}`,
        duration: 0.8,
        ease: "power4.out",
        modifiers: {
          rotation: (value) => `${parseFloat(value) % 360}deg`, // Keep rotation within 0–360 degrees
        },
        onComplete: () => {
          // Reset the rotation to 0 after animation if not already at 0
          const currentRotation = parseFloat(
            circleRef.current.style.transform
              .replace("rotate(", "")
              .replace("deg)", "")
          );
          if (Math.abs(currentRotation) > 1) {
            setFakeSpeedCoef(0);
            gsap.to(circleRef.current, {
              rotation: 0,
              duration: 0.8, // Set a short duration to snap back to 0
              ease: "power4.out",
              onComplete: () => {},
            });
          }
        },
      });
    }

    return () => {
      if (circleAnimation) {
        circleAnimation.kill();
      }
    };
  }, [speedCoef]);

  return (
    <div className={`${styles["circle-container"]}`} ref={circleRef}>
      <div className={`${styles["circle"]}`} />
    </div>
  );
};

export default Circle;
