import React, { useRef } from "react";
import styles from "./ForwardButton.module.css";
import Image from "next/image";
import Magnetic from "@/components/Global/Magnetic";

const ForwardButton = ({
  setSpeedCoef,
  isStopRunning,
  setFakeSpeedCoef,
  children,
}) => {
  const intervalRef = useRef(null);
  const isHoldingRef = useRef(false); // Tracks if the button is held
  const startTimeRef = useRef(null);
  const lastClickTimeRef = useRef(null); // Tracks the timestamp of the last click

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
      setFakeSpeedCoef(1);

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
    const now = Date.now();

    if (!isHoldingRef.current) {
      // Increment speed coefficient for single clicks
      setSpeedCoef((prev) => prev + 1);

      // Detect rapid clicks
      if (lastClickTimeRef.current && now - lastClickTimeRef.current < 1000) {
        // If the time between clicks is less than 200ms, treat as a rapid click
        setFakeSpeedCoef(1);
      }

      // Update the timestamp of the last click
      lastClickTimeRef.current = now;
    }
  };

  return (
    <button
      className={`${styles["forward"]}`}
      onClick={handleClick}
      onMouseDown={startIncreasingSpeed}
      onMouseUp={stopIncreasingSpeed}
      onMouseLeave={stopIncreasingSpeed}
      disabled={isStopRunning} // Disable FORWARD if STOP is running
    >
      {children}
      <Magnetic movement={0.108} passedScale={1.192}>
        <Image
          src="/icons/arrow--right.png"
          alt="Arrow right"
          width={20}
          height={20}
        />
      </Magnetic>
    </button>
  );
};

export default ForwardButton;
