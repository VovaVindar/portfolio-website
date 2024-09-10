import { useEffect } from "react";
import gsap from "gsap";
import MouseFollower from "mouse-follower";

MouseFollower.registerGSAP(gsap);

const CursorContainer = ({ className, scrollThreshold = 100 }) => {
  const images = [
    "/cursor/0001.png",
    "/cursor/0002.png",
    "/cursor/0003.png",
    "/cursor/0004.png",
  ];

  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      skewing: 0,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-exclusion": ".mf-exclusion",
        "-hidden": ".mf-hidden",
      },
      className: `mf-cursor ${className}`,
    });

    let currentImageIndex = 0;
    let scrollDistance = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      const scrollDelta = newScrollY - lastScrollY;

      scrollDistance += Math.abs(scrollDelta);
      lastScrollY = newScrollY;

      if (scrollDistance >= scrollThreshold) {
        scrollDistance = 0;

        if (scrollDelta > 0) {
          currentImageIndex = (currentImageIndex + 1) % images.length;
        } else if (scrollDelta < 0) {
          currentImageIndex =
            (currentImageIndex - 1 + images.length) % images.length;
        }

        cursor.setImg(images[currentImageIndex]);
      }
    };

    window.addEventListener("scroll", handleScroll);

    cursor.setImg(images[0]);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [className, scrollThreshold]);

  return null;
};

export default CursorContainer;
