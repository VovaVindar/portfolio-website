import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Marquee.module.css";

const Marquee = ({
  children,
  setMarqueeProgress = null,
  passedX = 0,
  speedCoef = 1,
  style,
}) => {
  const [x, setX] = useState(passedX);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragXStart, setDragXStart] = useState(0);
  const [speed, setSpeed] = useState(0);
  const desktopSpeed = 0.2;
  const mobileSpeed = 0.38;
  const [trackWidth, setTrackWidth] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const marqueeContainerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(0); // Store the last timestamp
  const dragMultiply = 1.15;

  useEffect(() => {
    const updateSpeed = () => {
      setSpeed(window.innerWidth <= 820 ? mobileSpeed : desktopSpeed);
    };

    updateSpeed();
    window.addEventListener("resize", updateSpeed);

    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  const calculateTrackWidth = useCallback(() => {
    if (
      marqueeTrackRef.current &&
      marqueeTrackRef.current.children.length > 0
    ) {
      const newTrackWidth = Math.round(
        marqueeTrackRef.current.scrollWidth / 2 + 1
      );
      setTrackWidth(newTrackWidth);
      setShouldAnimate(newTrackWidth > marqueeContainerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    calculateTrackWidth();

    const handleResize = debounce(calculateTrackWidth, 100);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateTrackWidth]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp; // Initialize timestamp
      }
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // Convert to seconds
      lastTimestampRef.current = timestamp;

      setX((prevX) => {
        let nextX = prevX + (speed * speedCoef + dragSpeed) * deltaTime * 120; // Adjust for 120 FPS baseline
        if (nextX >= trackWidth) nextX = 1;
        if (nextX < 1) nextX = trackWidth;
        return nextX;
      });

      setDragSpeed((prevSpeed) => prevSpeed * 0.92);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dragSpeed, trackWidth, shouldAnimate, speed, speedCoef]);

  useEffect(() => {
    const containerWidth = marqueeContainerRef.current.offsetWidth;
    if (setMarqueeProgress && trackWidth > 0) {
      setMarqueeProgress(Math.round(((x + containerWidth) / trackWidth) * 100));
    }
  }, [x, trackWidth, setMarqueeProgress]);

  const onDragStart = (t) => {
    setIsDragging(true);
    setDragXStart(t.clientX || (t.touches ? t.touches[0].clientX : 0));
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDrag = (t) => {
    if (isDragging) {
      const clientX = t.clientX || (t.touches ? t.touches[0].clientX : 0);
      setDragSpeed((dragXStart - clientX) * dragMultiply);
      setDragXStart(clientX);
    }
  };

  return (
    <div
      className={styles["marquee-container"]}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDrag}
      onTouchEnd={onDragEnd}
      ref={marqueeContainerRef}
      style={style}
    >
      <div
        className={styles["marquee-track"]}
        ref={marqueeTrackRef}
        style={{ transform: `translate3d(-${Math.round(x)}px, 0, 0)` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

// Debounce function to limit how often calculateTrackWidth runs
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default Marquee;
