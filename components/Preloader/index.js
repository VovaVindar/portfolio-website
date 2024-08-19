import MouseFollower from "@/components/MouseFollower";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ numbersProgress, className }) => {
  const mouseFollowerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mouseFollowerRef.current) {
      gsap.to(mouseFollowerRef.current, {
        autoAlpha: `${numbersProgress >= 100 ? 0 : 1}`,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        duration: 1,
        delay: 0.1,
        ease: "power4.out",
        onComplete: () => {
          numbersProgress >= 100 ? setIsLoading(false) : null;
        },
      });
    }
  }, [numbersProgress]);

  return (
    <>
      {isLoading && (
        <div className={`preloader ${className}`}>
          <MouseFollower
            ref={mouseFollowerRef}
            type="text"
            text={numbersProgress}
            className={`${className}`}
            style={{ color: "var(--token-color-text-contrast)" }}
          />
        </div>
      )}
    </>
  );
};

export default Preloader;
