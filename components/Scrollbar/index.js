import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { useScroll } from "@/context/ScrollContext";

// Throttle helper function
/* const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; */

const Scrollbar = ({ text = "", href, isAnimating = true, onClick }) => {
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(1.5);
  const { scrollPosition, setScrollPosition } = useScroll();

  // Refs for cleanup and optimization
  const scrollHandlerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const documentHeightRef = useRef(0);

  // Calculate document height
  const updateDocumentHeight = useCallback(() => {
    documentHeightRef.current =
      document.documentElement.scrollHeight - window.innerHeight;
  }, []);

  // Update scroll position with throttling
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / documentHeightRef.current) * 100;

    setScrollPosition(scrollPercent);

    if (!isAnimating) {
      setOpacity(1);
      setBlur(0);
    } else {
      setOpacity(0);
      setBlur(1.5);
    }
  }, [isAnimating, setScrollPosition]);

  // Initialize scroll handling
  useEffect(() => {
    // Initial height calculation
    updateDocumentHeight();

    // Create throttled scroll handler
    /* scrollHandlerRef.current = throttle(() => {
      requestAnimationFrame(updateScrollPosition);
    }, 4); // ~240fps (1000ms / 240) */
    // Throttle can cause jitter

    scrollHandlerRef.current = () => {
      requestAnimationFrame(updateScrollPosition);
    };

    // Setup ResizeObserver for height updates
    resizeObserverRef.current = new ResizeObserver(() => {
      updateDocumentHeight();
      requestAnimationFrame(updateScrollPosition);
    });

    // Observe document root
    resizeObserverRef.current.observe(document.documentElement);

    // Add scroll listener
    window.addEventListener("scroll", scrollHandlerRef.current);

    // Initial position update
    updateScrollPosition();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", scrollHandlerRef.current);
      resizeObserverRef.current?.disconnect();
    };
  }, [updateDocumentHeight, updateScrollPosition]);

  const elementStyle = {
    opacity,
    filter: `blur(${blur}px)`,
    top: `clamp(var(--global-padding), calc(${scrollPosition}% - 1lh ), calc(100% - 1lh - var(--global-padding)))`,
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-3 mf-hidden`}>
      {href ? (
        <Link href={href} style={elementStyle} scroll={false}>
          <Magnetic type="text">{text}</Magnetic>
        </Link>
      ) : (
        <button
          style={elementStyle}
          className="text-body-1-uppercase"
          onClick={onClick}
        >
          <Magnetic type="text">{text}</Magnetic>
        </button>
      )}
    </div>
  );
};

export default Scrollbar;
