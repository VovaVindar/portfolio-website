import React, { useState, useEffect, useRef, forwardRef } from "react";
import styles from "./MouseFollower.module.css";

const MouseFollower = forwardRef(
  ({ type, text = "", className = "", style = "" }, ref) => {
    const [initialMovement, setInitialMovement] = useState(false);
    const followerRef = useRef(null);

    const handleMouseMove = (event) => {
      const keyframes = {
        transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
        //opacity: "1",
      };

      if (followerRef.current) {
        if (!initialMovement) {
          setInitialMovement(true);
          followerRef.current.style.transform = `translate3d(0px, 0px, 0)`; // Set initial position
        }

        followerRef.current.animate(keyframes, {
          duration: 950,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
    };

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    return (
      <div
        ref={followerRef}
        className={`${styles["cursor-container"]} text-body-3 ${className}`}
      >
        {type === "text" && (
          <p ref={ref} style={style}>
            {text}
          </p>
        )}
      </div>
    );
  }
);

export default MouseFollower;
