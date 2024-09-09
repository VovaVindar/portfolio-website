import { useEffect } from "react";
import gsap from "gsap";
import MouseFollower from "mouse-follower";

MouseFollower.registerGSAP(gsap);

const CursorContainer = ({ className }) => {
  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      skewing: 3.5,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-exclusion": ".mf-exclusion",
        "-hidden": ".mf-hidden",
      },
      className: `mf-cursor ${className}`,
    });
  }, [className]);

  return null;
};

export default CursorContainer;
