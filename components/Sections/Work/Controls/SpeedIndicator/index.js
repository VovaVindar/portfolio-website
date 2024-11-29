import React, { useRef, useEffect, forwardRef } from "react";
import styles from "./SpeedIndicator.module.css";
import gsap from "gsap";

const SpeedIndicator = ({ speedCoef, isStopRunning }) => {
  const speedIndicatorRef = useRef(null);

  // Red flashing animation
  useEffect(() => {
    const updateSpeedAnimation = gsap.timeline();

    if (speedIndicatorRef.current) {
      updateSpeedAnimation.set(speedIndicatorRef.current, {
        color: `${!isStopRunning ? "red" : "var(--token-color-text-primary)"}`,
        opacity: 0.75,
        scale: 1.12,
      });
      updateSpeedAnimation.to(speedIndicatorRef.current, {
        color: `var(--token-color-text-primary)`,
        opacity: 0.4,
        scale: 1,
        duration: 1,
        delay: 0.05,
        ease: "power4.out",
      });
    }

    return () => {
      if (updateSpeedAnimation) {
        updateSpeedAnimation.kill();
      }
    };
  }, [speedCoef]);

  return (
    <p ref={speedIndicatorRef} className={`${styles["indicator"]}`}>
      {speedCoef}X
    </p>
  );
};

export default SpeedIndicator;
