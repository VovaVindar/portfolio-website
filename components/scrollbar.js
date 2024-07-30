"use client";

import React, { useState, useEffect } from "react";
import styles from "./scrollbar.module.css";

const Scrollbar = ({ text = "" }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPosition(scrollPercent);

      setOpacity(1);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pStyle = {
    opacity: opacity,
    top: `clamp(1rlh, ${scrollPosition}%, calc(100% - 2rlh))`,
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-1-uppercase`}>
      <p style={pStyle}>{text}</p>
    </div>
  );
};

export default Scrollbar;
