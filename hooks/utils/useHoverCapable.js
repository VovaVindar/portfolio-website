import { useState, useEffect } from "react";

export const useHoverCapable = () => {
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  useEffect(() => {
    const checkCapabilities = () => {
      // Check if it's a touch device
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      // Check if the device supports hover
      const supportsHover = window.matchMedia("(hover: hover)").matches;

      // Only enable magnetic effect if it supports hover and isn't using touch
      setIsHoverCapable(supportsHover && !isTouchDevice);
    };

    // Initial check
    checkCapabilities();

    // Setup media query listeners
    const hoverQuery = window.matchMedia("(hover: hover)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    // Listen for changes in capabilities
    const handleChange = () => checkCapabilities();

    hoverQuery.addEventListener("change", handleChange);
    touchQuery.addEventListener("change", handleChange);

    return () => {
      hoverQuery.removeEventListener("change", handleChange);
      touchQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isHoverCapable;
};
