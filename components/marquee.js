"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./marquee.module.css";

const Marquee = () => {
  const [x, setX] = useState(0);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragXStart, setDragXStart] = useState(0);
  const [speed, setSpeed] = useState(0.4);
  const marqueeTrackRef = useRef(null);
  const marqueeElementsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const updateSpeed = () => {
      if (window.innerWidth <= 820) {
        setSpeed(0.7);
      } else {
        setSpeed(0.4);
      }
    };

    updateSpeed();

    window.addEventListener("resize", updateSpeed);

    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  useEffect(() => {
    // Set opacity to 1 for all marquee elements
    marqueeTrackRef.current.style.opacity = "1";
    marqueeElementsRef.current.forEach((el) => {
      if (el) el.style.opacity = "1";
    });

    const animate = () => {
      const trackWidth =
        marqueeTrackRef.current.scrollWidth -
        marqueeElementsRef.current[0].offsetWidth * 3;

      setX((prevX) => {
        var nextX = prevX + speed + dragSpeed;
        if (nextX >= trackWidth) nextX = 1;
        if (nextX < 1) nextX = trackWidth;
        return nextX;
      });

      setDragSpeed((prevSpeed) => prevSpeed * 0.92);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dragSpeed]);

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
      setDragSpeed(dragXStart - clientX);
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
    >
      <div
        className={styles["marquee-track"]}
        ref={marqueeTrackRef}
        style={{ transform: `translate3d(-${x}px, 0, 0)` }}
      >
        {[1, 2, 3, 4, 5, 1, 2, 3].map((item, index) => (
          <div
            key={index}
            ref={(el) => (marqueeElementsRef.current[index] = el)}
            style={{ opacity: 0 }} // Initial opacity
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
