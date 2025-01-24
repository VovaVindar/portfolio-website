import { useLayoutEffect, useCallback, useRef } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Link from "next/link";
import { useScroll } from "@/context/ScrollContext";
import { useScrollbarOnloadAnimations } from "@/hooks/animations/onload/useScrollbarOnloadAnimations";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";
import { useHoverCapable } from "@/hooks/utils/useHoverCapable";

const MAX_HEIGHT_FOR_ANIMATION = 2800;

const Scrollbar = ({ text = "", href, onClick }) => {
  const isHoverCapable = useHoverCapable(); // Scrollbar text jitters onscroll on touch devices due to FPS limit
  const { height, scrollHeight, scrollY } = useWindowDimensions();
  const { scrollPosition, setScrollPosition } = useScroll();

  const documentHeightRef = useRef(0);
  const isHeightCompatibleRef = useRef(true);

  const updateDocumentHeight = useCallback(() => {
    documentHeightRef.current = scrollHeight - height;
    isHeightCompatibleRef.current = height < MAX_HEIGHT_FOR_ANIMATION;
  }, [height, scrollHeight]);

  const updateScrollPosition = useCallback(() => {
    if (!isHeightCompatibleRef.current || !isHoverCapable) {
      setScrollPosition(0);
      return;
    }

    const scrollTop = scrollY;
    const scrollPercent = (scrollTop / documentHeightRef.current) * 100;
    setScrollPosition(scrollPercent);
  }, [setScrollPosition, scrollY]);

  useLayoutEffect(() => {
    updateDocumentHeight();
    updateScrollPosition();
  }, [updateDocumentHeight, updateScrollPosition]);

  const { y, opacity, blur } = useScrollbarOnloadAnimations();

  const elementStyle = {
    transform: `translateY(${y}%)`,
    opacity,
    filter: `blur(${blur}px)`,
    top:
      isHeightCompatibleRef.current || !isHoverCapable
        ? `clamp(var(--global-padding), calc(${scrollPosition}% - 1lh ), calc(100% - 1lh - var(--global-padding-bottom)))`
        : "var(--global-padding)",
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-3 mf-hidden`}>
      {href ? (
        <Link href={href} style={elementStyle} scroll={false}>
          <Magnetic type="small-text">{text}</Magnetic>
        </Link>
      ) : (
        <button style={elementStyle} onClick={onClick}>
          <Magnetic type="small-text">{text}</Magnetic>
        </button>
      )}
    </div>
  );
};

export default Scrollbar;
