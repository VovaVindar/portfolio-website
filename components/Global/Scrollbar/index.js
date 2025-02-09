import { useEffect, useCallback, useRef, useState } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Link from "next/link";
import { useScroll } from "@/context/ScrollbarContext";
import { useScrollbarOnloadAnimations } from "@/hooks/animations/onload/useScrollbarOnloadAnimations";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useHoverCapable } from "@/hooks/core/useHoverCapable";
import { Router } from "next/router";
import { useReducedMotion } from "@/context/ReducedMotionContext";

const MAX_HEIGHT_FOR_ANIMATION = 2800;

const Scrollbar = ({ text = "", href, onClick, className }) => {
  // Add reduced motion check
  const prefersReducedMotion = useReducedMotion();

  const isHoverCapable = useHoverCapable(); // Scrollbar text jitters onscroll on touch devices due to FPS limit
  const { height } = useWindowDimensions();
  const { scrollPosition, setScrollPosition } = useScroll();
  const scrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const [scrollHeight, setScrollHeight] = useState(
    typeof document !== "undefined" ? document.documentElement.scrollHeight : 0
  );

  // Set scroll height
  const updateScrollHeight = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;

    setScrollHeight(documentHeight);
  }, []);

  // Initial setup and route change handling
  useEffect(() => {
    // Initial delay to let content render
    const initialTimer = setTimeout(updateScrollHeight, 150);

    Router.events.on("routeChangeComplete", updateScrollHeight);

    return () => {
      clearTimeout(initialTimer);

      Router.events.off("routeChangeComplete", updateScrollHeight);
    };
  }, [updateScrollHeight]);

  const isHeightCompatibleRef = useRef(true);

  const updateScrollPosition = useCallback(() => {
    const isHeightCompatible = height < MAX_HEIGHT_FOR_ANIMATION;

    if (!isHeightCompatible || !isHoverCapable || !scrollHeight) {
      setScrollPosition(0);
      return;
    }

    const scrollTop = scrollYRef.current;
    const maxScroll = Math.max(0, scrollHeight - height);

    // Prevent division by zero and ensure positive scroll range
    if (maxScroll <= 0) {
      setScrollPosition(0);
      return;
    }

    const scrollPercent = Math.min(
      100,
      Math.max(0, (scrollTop / maxScroll) * 100)
    );
    setScrollPosition(scrollPercent);
  }, [setScrollPosition, isHoverCapable, scrollHeight, height]);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      // Since updateScrollPosition depends on scrollY, we need to call it here
      updateScrollPosition();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrollPosition]);

  useEffect(() => {
    updateScrollPosition();
  }, [updateScrollPosition]);

  const { y, opacity, blur } = useScrollbarOnloadAnimations();

  const elementStyle = {
    transform: `translateY(${y}%)`,
    opacity,
    filter: `blur(${blur}px)`,
    top:
      isHeightCompatibleRef.current && isHoverCapable && !prefersReducedMotion
        ? `clamp(calc(var(--global-padding) + 1px), calc(${scrollPosition}% - 1lh ), calc(100% - 1lh - var(--global-padding-bottom)))`
        : "var(--global-padding)",
  };

  return (
    <nav
      className={`${styles["scrollbar-container"]} text-body-3 mf-hidden ${className}`}
      aria-label="Page navigation"
    >
      {href ? (
        <Link href={href} style={elementStyle} scroll={false}>
          <Magnetic type="small-text">{text}</Magnetic>
        </Link>
      ) : (
        <button style={elementStyle} onClick={onClick}>
          <Magnetic type="small-text">{text}</Magnetic>
        </button>
      )}
    </nav>
  );
};

export default Scrollbar;

//Scrollbar.whyDidYouRender = true;
