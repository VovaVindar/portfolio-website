import { useEffect, useState } from "react";
import gsap from "gsap";
import MouseFollower from "@/mouse-follower/src";

MouseFollower.registerGSAP(gsap);

const CursorContainer = ({ className, isAnimating = true }) => {
  let deg = 0;

  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-exclusion": ".mf-exclusion",
        "-hidden": ".mf-hidden, p",
      },
      className: `mf-cursor ${className}`,
    });

    // Spin cursor on click
    cursor.on("addState", (cursor, state) => {
      if (state === "-active") {
        gsap.to(".mf-cursor", {
          "--rotation": `${deg + 45}deg`,
          duration: 0,
        });

        deg += 45;

        // Toggle between favicon1 and favicon2
        toggleFavicon();
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

  // State to track the currently active favicon
  const [currentFavicon, setCurrentFavicon] = useState("favicon");

  const setFavicon = (baseName) => {
    const cacheBuster = `?v=${Date.now()}`; // Add a unique timestamp to the URL

    const existingIcons = document.querySelectorAll("link[rel='icon']");
    existingIcons.forEach((link) => document.head.removeChild(link));

    const svgLink = document.createElement("link");
    svgLink.rel = "icon";
    svgLink.href = `/${baseName}.svg${cacheBuster}`;
    svgLink.type = "image/svg+xml";
    document.head.appendChild(svgLink);

    const pngLink = document.createElement("link");
    pngLink.rel = "icon";
    pngLink.href = `/${baseName}-96x96.png${cacheBuster}`;
    pngLink.type = "image/png";
    pngLink.sizes = "96x96";
    document.head.appendChild(pngLink);
  };

  const toggleFavicon = () => {
    setCurrentFavicon((prevFavicon) => {
      const newFavicon = prevFavicon === "favicon" ? "favicon2" : "favicon";
      setFavicon(newFavicon);
      return newFavicon;
    });
  };

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("User left the tab");

        // Change favicon based on the current favicon
        if (currentFavicon === "favicon") {
          setFavicon("favicon3"); // Switch to favicon3
        } else if (currentFavicon === "favicon2") {
          setFavicon("favicon4"); // Switch to favicon4
        }
      } else {
        console.log("User returned to the tab");
        // Restore the previous favicon
        setFavicon(currentFavicon);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentFavicon]);

  return null;
};

export default CursorContainer;
