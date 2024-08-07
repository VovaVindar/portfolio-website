import React, { useEffect, useRef, forwardRef } from "react";
import styles from "./MouseFollower.module.css";

const MouseFollower = forwardRef(
  ({ type, text = "", className = "", style = "" }, ref) => {
    const followerRef = useRef(null);
    const maskRef = useRef(null);
    const maskGradientRef = useRef(null);

    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;

      const keyframes = {
        transform: `translate3d(${x}px, ${y}px, 0)`,
      };

      const clipPathKeyframes = {
        clipPath: `circle(1rlh at ${x}px ${y}px)`,
      };

      if (followerRef.current) {
        followerRef.current.animate(keyframes, {
          duration: 950,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
      if (maskRef.current && maskGradientRef.current) {
        maskRef.current.animate(clipPathKeyframes, {
          duration: 950,
          easing: "ease-in-out",
          fill: "forwards",
        });

        maskGradientRef.current.animate(keyframes, {
          duration: 950,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (maskRef.current) {
        maskRef.current.style.backgroundPosition = `0 -${scrollPosition}px`;
      }
    };

    useEffect(() => {
      handleMouseMove({ clientX: 0, clientY: 0 });
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <div className={styles["cursor-container"]}>
        {type === "lines" && (
          <>
            <div className={styles["background-lines"]} ref={maskRef} />
            <div
              className={`${styles["lines-gradient"]}`}
              ref={maskGradientRef}
            />
          </>
        )}
        {type === "text" && (
          <div
            ref={followerRef}
            className={`${styles["cursor"]} text-body-3 ${className}`}
          >
            <p ref={ref} style={style}>
              {text}
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default MouseFollower;
