import React, { useState, useEffect } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { useScroll } from "@/context/ScrollContext";

const Scrollbar = ({ text = "", href, isAnimating = true, onClick }) => {
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(1.5);
  const { scrollPosition, setScrollPosition } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollPosition(scrollPercent);

      if (!isAnimating) {
        setOpacity(1);
        setBlur(0);
      } else {
        setOpacity(0);
        setBlur(1.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAnimating, setScrollPosition]);

  const pStyle = {
    opacity: opacity,
    filter: `blur(${blur}px)`,
    top: `clamp(var(--global-padding), calc(${scrollPosition}% - 1lh ), calc(100% - 1lh - var(--global-padding)))`,
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-3 mf-hidden`}>
      {href ? (
        <Link href={href} style={pStyle} scroll={false}>
          <Magnetic type="text">{text}</Magnetic>
        </Link>
      ) : (
        <button
          style={pStyle}
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
