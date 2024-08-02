import React, { useState, useEffect, useRef } from "react";

const MouseFollower = ({ type, text = "", className = "" }) => {
  const [initialMovement, setInitialMovement] = useState(false);
  const followerRef = useRef(null);

  const handleMouseMove = (event) => {
    const keyframes = {
      transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
    };

    if (followerRef.current) {
      if (!initialMovement) {
        setInitialMovement(true);
        followerRef.current.style.transform = keyframes.transform; // Set initial position
        followerRef.current.classList.add("visible");
      }

      followerRef.current.animate(keyframes, {
        duration: 1000,
        easing: "ease",
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
    <>
      <div ref={followerRef} className={`cursor text-body-1 ${className}`}>
        {type === "text" && <p>{text}</p>}
      </div>
    </>
  );
};

export default MouseFollower;
