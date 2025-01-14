import { useEffect, useCallback, useRef } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Link from "next/link";
import { useScroll } from "@/context/ScrollContext";
import { useScrollbarOnloadAnimations } from "@/hooks/animations/onload/useScrollbarOnloadAnimations";

const MAX_HEIGHT_FOR_ANIMATION = 2900;

const Scrollbar = ({ text = "", href, onClick }) => {
  const { scrollPosition, setScrollPosition } = useScroll();

  // Refs for cleanup and optimization
  const scrollHandlerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const documentHeightRef = useRef(0);
  const isHeightCompatibleRef = useRef(
    window.innerHeight < MAX_HEIGHT_FOR_ANIMATION
  );

  // Calculate document height and check height compatibility
  const updateDocumentHeight = useCallback(() => {
    documentHeightRef.current =
      document.documentElement.scrollHeight - window.innerHeight;
    isHeightCompatibleRef.current =
      window.innerHeight < MAX_HEIGHT_FOR_ANIMATION;
  }, []);

  // Update scroll position with RAF
  const updateScrollPosition = useCallback(() => {
    if (!isHeightCompatibleRef.current) {
      setScrollPosition(0); // Reset position when height is incompatible
      return;
    }

    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / documentHeightRef.current) * 100;
    setScrollPosition(scrollPercent);
  }, [setScrollPosition]);

  // Initialize scroll handling
  useEffect(() => {
    // Initial height calculation
    updateDocumentHeight();

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

  const { y, opacity, blur, transition } = useScrollbarOnloadAnimations();

  const elementStyle = {
    transform: `translateY(${y}%)`,
    opacity,
    filter: `blur(${blur}px)`,
    top: isHeightCompatibleRef.current
      ? `clamp(var(--global-padding), calc(${scrollPosition}% - 1lh ), calc(100% - 1lh - var(--global-padding)))`
      : "var(--global-padding)", // Default position when height is incompatible
  };

  if (transition) {
    elementStyle.transition = transition;
  }

  return (
    <div className={`${styles["scrollbar-container"]} text-body-3 mf-hidden`}>
      {href ? (
        <Link href={href} style={elementStyle} scroll={false}>
          <Magnetic type="text">{text}</Magnetic>
        </Link>
      ) : (
        <button style={elementStyle} onClick={onClick}>
          <Magnetic type="text">{text}</Magnetic>
        </button>
      )}
    </div>
  );
};

export default Scrollbar;
