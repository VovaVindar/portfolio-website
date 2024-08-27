import React, { useState, useEffect } from "react";
import styles from "./Scrollbar.module.css";
import MagneticLink from "@/components/MagneticLink";

const Scrollbar = ({ text = "", href = "/", isAnimating }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

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
  }, [isAnimating]);

  const pStyle = {
    opacity: opacity,
    filter: `blur(${blur}px)`,
    top: `clamp(1rlh, ${scrollPosition}%, calc(100% - 2rlh))`,
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-1-uppercase`}>
      <MagneticLink href={href} style={pStyle} scroll={false}>
        {text}
      </MagneticLink>
    </div>
  );
};

export default Scrollbar;
