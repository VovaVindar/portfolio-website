import React, { useState, useEffect } from "react";
import styles from "./Scrollbar.module.css";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

const Scrollbar = ({ text = "", href = "/", isAnimating = true }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(1.5);

  // CAN'T user GSAP or animate color due to bugs with mix-blend-mode propery

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
      <Magnetic type="text">
        <Link href={href} style={pStyle} scroll={false}>
          {text}
        </Link>
      </Magnetic>
    </div>
  );
};

export default Scrollbar;
