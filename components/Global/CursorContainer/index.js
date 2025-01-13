import { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import MouseFollower from "@/components/Global/CursorContainer/mouse-follower/src";

MouseFollower.registerGSAP(gsap);

const FAVICON_TYPES = {
  MAIN: "favicon", // Main favicon
  MAIN_ROTATED: "favicon2", // Main favicon when rotated
  TAB_INACTIVE: "favicon3", // When user leaves tab
  TAB_INACTIVE_ROTATED: "favicon4", // When user leaves tab and was rotated
};

const FAVICON_CONFIG = {
  svg: { rel: "icon", type: "image/svg+xml" },
  png: { rel: "icon", type: "image/png", sizes: "96x96" },
  ico: { rel: "shortcut icon", type: "image/png", sizes: "48x48" },
};

const CursorContainer = ({ className = "", isAnimating = true }) => {
  const cursorRef = useRef(null);
  const rotationDegRef = useRef(0);
  const [currentFavicon, setCurrentFavicon] = useState(FAVICON_TYPES.MAIN);

  // Favicon management
  const setFavicon = useCallback((baseName) => {
    if (!baseName) return; // Add protection against undefined baseName

    const cacheBuster = `?v=${Date.now()}`;

    // Remove existing favicons
    document
      .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
      .forEach((link) => document.head.removeChild(link));

    // Create new favicon links
    Object.entries(FAVICON_CONFIG).forEach(([ext, config]) => {
      const link = document.createElement("link");
      Object.assign(link, {
        rel: config.rel,
        href: `/${baseName}${
          ext === "png" ? "-96x96" : ""
        }.${ext}${cacheBuster}`,
        type: config.type,
        ...(config.sizes && { sizes: config.sizes }),
      });
      document.head.appendChild(link);
    });
  }, []);

  const toggleFavicon = useCallback(() => {
    setCurrentFavicon((prev) => {
      const newFavicon =
        prev === FAVICON_TYPES.MAIN
          ? FAVICON_TYPES.MAIN_ROTATED
          : FAVICON_TYPES.MAIN;
      setFavicon(newFavicon);
      return newFavicon;
    });
  }, [setFavicon]);

  // Handle tab change
  const handleVisibilityChange = useCallback(() => {
    const hiddenFavicon =
      currentFavicon === FAVICON_TYPES.MAIN
        ? FAVICON_TYPES.TAB_INACTIVE
        : FAVICON_TYPES.TAB_INACTIVE_ROTATED;

    setFavicon(document.hidden ? hiddenFavicon : currentFavicon);
  }, [currentFavicon, setFavicon]);

  // Initialize cursor
  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 1.1,
      skewingText: 0,
      skewingMedia: 0,
      stickDelta: 0.3,
      stateDetection: {
        "-exclusion": ".mf-exclusion, p",
        "-hidden": ".mf-hidden",
      },
      className: `mf-cursor ${className}`,
    });

    cursorRef.current = cursor;

    // Handle cursor click rotation
    cursor.on("addState", (cursor, state) => {
      if (state === "-active") {
        rotationDegRef.current += 45;

        gsap.to(".mf-cursor", {
          "--rotation": `${rotationDegRef.current}deg`,
          duration: 0,
        });

        if (!isAnimating) {
          toggleFavicon();
        }
      }
    });

    // Initial cursor animation
    gsap.set(".mf-cursor", { autoAlpha: 0 });

    if (!isAnimating) {
      gsap.to(".mf-cursor", {
        duration: 0.75,
        delay: 0.4,
        ease: "power1.in",
        autoAlpha: 1,
      });
    }

    return () => cursor.destroy();
  }, [className, isAnimating, toggleFavicon]);

  // Visibility change listener
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);

  return null;
};

export default CursorContainer;
