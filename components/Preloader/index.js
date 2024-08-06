import MouseFollower from "@/components/MouseFollower";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ numbersProgress, className, onLoadingComplete }) => {
  const mouseFollowerRef = useRef(null);
  useGSAP(() => {
    if (mouseFollowerRef.current) {
      const timeline = gsap.timeline({
        onComplete: onLoadingComplete,
      });

      timeline.to(mouseFollowerRef.current, {
        autoAlpha: `${numbersProgress >= 100 ? 0 : 1}`,
        filter: `blur(${numbersProgress >= 100 ? 2 : 0}px)`,
        duration: 1,
        delay: 0.1,
        ease: "power4.out",
      });
    }
  }, [numbersProgress]);

  return (
    <>
      <div className={`preloader ${className}`}>
        <MouseFollower
          ref={mouseFollowerRef}
          type="text"
          text={numbersProgress}
          className={`${className}`}
          style={{ color: "var(--token-color-text-contrast)" }}
        />
      </div>
    </>
  );
};

export default Preloader;
