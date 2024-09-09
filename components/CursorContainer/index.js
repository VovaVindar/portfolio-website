import React, { useEffect, useRef } from "react";
import styles from "./CursorContainer.module.css";
import gsap from "gsap";
import MouseFollower from "mouse-follower";

MouseFollower.registerGSAP(gsap);

const MouseContainer = () => {
  const maskRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (maskRef.current) {
      maskRef.current.style.backgroundPosition = `0 -${scrollPosition}px`;
    }
  };

  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      skewing: 3.5,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-pointer": ".mf-pointer",
        "-exclusion": ".mf-exclusion",
        "-hidden": ".logo",
      },
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles["cursor-container"]}>
      <div className={styles["background-lines"]} ref={maskRef} />
    </div>
  );
};

export default MouseContainer;
