import React, { useRef, useEffect } from "react";
import styles from "./Circle.module.css";
import gsap from "gsap";

const Circle = ({ speedCoef, isStopRunning }) => {
  // Circle animation
  const circleRef = useRef(null);

  const circleAnimation = gsap.timeline({ defaults: { overwrite: true } });

  if (circleRef.current) {
    circleAnimation.set(circleRef.current, {
      rotation: 0,
    });
  }

  useEffect(() => {
    if (circleRef.current) {
      // Spin the circle container
      circleAnimation.to(circleRef.current, {
        rotation: `${!isStopRunning ? "+=360" : "-=360"}`,
        duration: 1,
        ease: "power4.out",
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
