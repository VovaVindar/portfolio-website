import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Marquee.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Marquee = ({ startPageAnimation }) => {
  const [x, setX] = useState(0);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragXStart, setDragXStart] = useState(0);
  const [speed, setSpeed] = useState(0);
  const desktopSpeed = 0.2;
  const mobileSpeed = 0.7;
  const [trackWidth, setTrackWidth] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const marqueeTrackRef = useRef(null);
  const marqueeElementsRef = useRef([]);
  const animationRef = useRef(null);
  const copiesCount = 5;
  const dragMultiply = 1.15;

  const animationDelay = 17 * 85;
  const [pageAnimationStarted, setPageAnimationStarted] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => {
        marqueeTrackRef.current.classList.add(`${styles["visible"]}`);
        setPageAnimationStarted(true);
      }, animationDelay);
    }
  }, [startPageAnimation]);

  useEffect(() => {
    const updateSpeed = () => {
      setSpeed(window.innerWidth <= 820 ? mobileSpeed : desktopSpeed);
    };

    updateSpeed();
    window.addEventListener("resize", updateSpeed);

    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  const calculateTrackWidth = useCallback(() => {
    if (marqueeElementsRef.current[0] && marqueeTrackRef.current) {
      const elementWidth = marqueeElementsRef.current[0].offsetWidth;
      const newTrackWidth =
        marqueeTrackRef.current.scrollWidth - elementWidth * copiesCount;
      setTrackWidth(newTrackWidth);
      setShouldAnimate(newTrackWidth > window.innerWidth);
    }
  });

  useEffect(() => {
    calculateTrackWidth();

    // Debounced resize handler
    const handleResize = debounce(calculateTrackWidth, 100);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateTrackWidth]);

  useEffect(() => {
    if (!shouldAnimate) return; // Only animate if needed

    const animate = () => {
      setX((prevX) => {
        let nextX = prevX + speed + dragSpeed;
        if (nextX >= trackWidth) nextX = 1;
        if (nextX < 1) nextX = trackWidth;
        return nextX;
      });

      setDragSpeed((prevSpeed) => prevSpeed * 0.92);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dragSpeed, trackWidth, shouldAnimate, speed]);

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
      //style={{ opacity: opacity }}
    >
      <div
        className={styles["marquee-track"]}
        ref={marqueeTrackRef}
        style={{ transform: `translate3d(-${Math.round(x)}px, 0, 0)` }}
      >
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            ref={(el) => (marqueeElementsRef.current[index] = el)}
            data-cursor-text="Vitamin Living"
            className={`mf-exclusion`}
          >
            <Magnetic>
              <Image
                src="/marquee.png"
                alt="Picture of the author"
                fill
                priority={true}
              />
            </Magnetic>
          </div>
        ))}
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
