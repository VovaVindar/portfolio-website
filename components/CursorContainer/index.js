import { useEffect } from "react";
import gsap from "gsap";
import MouseFollower from "@/mouse-follower/src";

MouseFollower.registerGSAP(gsap);

const CursorContainer = ({ className, isAnimating = true }) => {
  let deg = 0;

  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      //skewing: 2.3,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-exclusion": ".mf-exclusion",
        "-hidden": ".mf-hidden, p",
      },
      className: `mf-cursor ${className}`,
    });

    // spin cursor on click
    cursor.on("addState", (cursor, state) => {
      if (state === "-active") {
        gsap.to(".mf-cursor", {
          "--rotation": `${deg + 45}deg`,
          duration: 0,
        });

        deg += 45;
      }
    });

    gsap.set(".mf-cursor", {
      autoAlpha: 0,
    });
    if (!isAnimating) {
      gsap.to(".mf-cursor", {
        duration: 0.75,
        delay: 0.4,
        ease: "power1.in",
        autoAlpha: 1,
      });
    }

    return () => {
      if (cursor) cursor.destroy();
    };
  }, [className, isAnimating]);

  return null;
};

export default CursorContainer;
