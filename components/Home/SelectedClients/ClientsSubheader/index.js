import { useState, useEffect, useRef } from "react";
import styles from "../SelectedClients.module.css";
import { useScroll } from "@/context/ScrollContext";

const WIDE_SCREEN_BREAKPOINT = 1060;
const MAX_HEIGHT_FOR_ANIMATION = 2900;

const ClientsSubheader = ({ clientsOnscroll }) => {
  const subheaderRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const { scrollPosition } = useScroll();

  // State management
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isHeightCompatible, setIsHeightCompatible] = useState(true);
  const [position, setPosition] = useState("relative");
  const [top, setTop] = useState("unset");
  const [bottom, setBottom] = useState("unset");

  // Handle screen size changes
  useEffect(() => {
    const updateScreenSize = () => {
      setIsWideScreen(window.innerWidth > WIDE_SCREEN_BREAKPOINT);
      setIsHeightCompatible(window.innerHeight < MAX_HEIGHT_FOR_ANIMATION);
    };

    // Initial check
    updateScreenSize();

    // Handle resize events
    const handleResize = () => {
      updateScreenSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate and update position
  useEffect(() => {
    if (
      !subheaderRef.current ||
      !isWideScreen ||
      window.innerHeight >= MAX_HEIGHT_FOR_ANIMATION
    ) {
      setPosition("static");
      setTop("unset");
      setBottom("unset");
      return;
    }

    const lastClient =
      clientsOnscroll.current[clientsOnscroll.current.length - 1];
    const firstClient = clientsOnscroll.current[1];

    if (!lastClient || !firstClient) return;

    // Get necessary measurements
    const measurements = {
      firstClientRect: firstClient.getBoundingClientRect(),
      lastClientRect: lastClient.getBoundingClientRect(),
      lineHeight: parseFloat(
        window.getComputedStyle(subheaderRef.current).lineHeight
      ),
      rootLineHeight: parseFloat(
        getComputedStyle(document.documentElement).lineHeight
      ),
      scrollbarY:
        window.innerHeight * (scrollPosition * 0.01) -
        2 *
          parseFloat(window.getComputedStyle(subheaderRef.current).lineHeight),
    };

    // Determine position state
    const positionState = calculatePositionState(measurements);

    setPosition(positionState.position);
    setTop(positionState.top);
    setBottom(positionState.bottom);
  }, [scrollPosition, isWideScreen, clientsOnscroll]);

  // Helper function to calculate position state
  const calculatePositionState = (measurements) => {
    const { firstClientRect, lastClientRect, rootLineHeight, scrollbarY } =
      measurements;

    if (firstClientRect.top > scrollbarY) {
      return {
        position: "static",
        top: "unset",
        bottom: "unset",
      };
    }

    if (
      firstClientRect.top <= scrollbarY &&
      lastClientRect.bottom - 1.1 * rootLineHeight >= scrollbarY
    ) {
      return {
        position: "fixed",
        top: false,
        bottom: "unset",
      };
    }

    return {
      position: "absolute",
      top: "unset",
      bottom: "0.26089rlh",
    };
  };

  // Style calculation
  const pStyle = {
    position,
    top:
      top === false &&
      isWideScreen &&
      window.innerHeight < MAX_HEIGHT_FOR_ANIMATION
        ? `clamp(var(--global-padding), calc(${scrollPosition}% - 2lh), calc(100% - 1lh - var(--global-padding)))`
        : top,
    bottom,
  };

  return (
    <div className="text-body-3" ref={subheaderRef} style={pStyle}>
      <p
        ref={(el) => (clientsOnscroll.current[0] = el)}
        className={styles["subheader"]}
      >
        Selected Clients:
      </p>
    </div>
  );
};

export default ClientsSubheader;
