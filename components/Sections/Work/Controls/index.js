import React, { useState, useRef, useEffect, forwardRef } from "react";
import styles from "./Controls.module.css";
import gsap from "gsap";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import { useGSAP } from "@gsap/react";
import Circle from "@/components/Sections/Work/Controls/Circle";
import SpeedIndicator from "./SpeedIndicator";
import StopButton from "./StopButton";

const Controls = forwardRef(
  ({ speedCoef = 1, setSpeedCoef, duration, easing }, ref) => {
    const intervalRef = useRef(null);
    const isHoldingRef = useRef(false); // Tracks if the button is held
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [isStopRunning, setIsStopRunning] = useState(false);
    const stopButtonRef = useRef(null);
    const speedIndicatorRef = useRef(null);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const decreaseSpeedCoef = () => {
      const duration = 2000;
      const startSpeed = speedCoef;
      const startTime = performance.now();
      const steps = startSpeed - 1; // Total number of steps to decrease

      if (steps <= 0) return; // No need to decrease if already at 1

      setIsStopRunning(true); // Disable forward button

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp progress to [0, 1]
        const easedProgress = easeOutCubic(progress);
        const targetSpeed = Math.round(startSpeed - easedProgress * steps); // Calculate next integer speed

        if (targetSpeed !== speedCoef) {
          setSpeedCoef(targetSpeed); // Update speed only when it changes
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setSpeedCoef(1);
          setIsStopRunning(false); // Re-enable forward button
        }
      };

      cancelAnimationFrame(animationFrameRef.current); // Cancel any previous animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const calculateInterval = (holdTime) => {
      const baseInterval = 400; // Starting interval in milliseconds
      const minInterval = 65; // Minimum interval
      return Math.max(baseInterval - holdTime / 10, minInterval);
    };

    const startIncreasingSpeed = () => {
      const now = Date.now();
      startTimeRef.current = now;
      isHoldingRef.current = true;

      const increaseSpeed = () => {
        const elapsed = Date.now() - startTimeRef.current;

        setSpeedCoef((prev) => prev + 1);

        const newInterval = calculateInterval(elapsed);
        clearInterval(intervalRef.current); // Reset the interval with a shorter duration
        intervalRef.current = setInterval(increaseSpeed, newInterval);
      };

      intervalRef.current = setInterval(increaseSpeed, calculateInterval(0)); // Start with the initial interval
    };

    const stopIncreasingSpeed = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      isHoldingRef.current = false;
    };

    const handleClick = () => {
      if (!isHoldingRef.current) {
        // Only increment by 1 if the button wasn't held
        setSpeedCoef((prev) => prev + 1);
      }
    };

    return (
      <div className={`${styles["controls-container"]} text-body-2`} ref={ref}>
        <StopButton
          speedCoef={speedCoef}
          isStopRunning={isStopRunning}
          duration={duration}
          easing={easing}
          decreaseSpeedCoef={decreaseSpeedCoef}
        />
        <SpeedIndicator speedCoef={speedCoef} isStopRunning={isStopRunning} />
        <button
          className={`${styles["forward"]}`}
          onClick={handleClick}
          onMouseDown={startIncreasingSpeed}
          onMouseUp={stopIncreasingSpeed}
          onMouseLeave={stopIncreasingSpeed}
          disabled={isStopRunning} // Disable FORWARD if STOP is running
        >
          <Circle speedCoef={speedCoef} isStopRunning={isStopRunning} />
          <Magnetic movement={0.108} passedScale={1.192}>
            <Image
              src="/icons/arrow--right.png"
              alt="Arrow right"
              width={20}
              height={20}
            />
          </Magnetic>
        </button>
      </div>
    );
  }
);

export default Controls;
