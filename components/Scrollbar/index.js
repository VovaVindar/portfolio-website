import React, { useState, useEffect } from "react";
import styles from "./Scrollbar.module.css";
import Link from "next/link";

const Scrollbar = ({ text = "", href = "/", isLoading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollPosition(scrollPercent);

      if (!isLoading) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const pStyle = {
    opacity: opacity,
    top: `clamp(1rlh, ${scrollPosition}%, calc(100% - 2rlh))`,
  };

  return (
    <div className={`${styles["scrollbar-container"]} text-body-1-uppercase`}>
      <Link href={href} style={pStyle} scroll={false}>
        {text}
      </Link>
    </div>
  );
};

export default Scrollbar;
