import { useState, useEffect, useRef } from "react";
import styles from "../SelectedClients.module.css";
import { useScroll } from "@/context/ScrollbarContext";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

const WIDE_SCREEN_BREAKPOINT = 1060;
const MAX_HEIGHT_FOR_ANIMATION = 2800;

const ClientsSubheader = ({ clientsOnscroll }) => {
  // Add reduced motion check
  const prefersReducedMotion = useReducedMotion();

  const subheaderRef = useRef(null);
  //const resizeObserverRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const { scrollPosition } = useScroll();

  // State management
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isHeightCompatible, setIsHeightCompatible] = useState(true);
  const [position, setPosition] = useState("relative");
  const [top, setTop] = useState("unset");
  const [bottom, setBottom] = useState("unset");

  // Handle screen size changes
  useEffect(() => {
    setIsWideScreen(width > WIDE_SCREEN_BREAKPOINT);
    setIsHeightCompatible(height < MAX_HEIGHT_FOR_ANIMATION);
  }, [width, height]);

  // Calculate and update position
  useEffect(() => {
    if (!subheaderRef.current || !isWideScreen || !isHeightCompatible) {
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
        height * (scrollPosition * 0.01) -
        2 *
          parseFloat(window.getComputedStyle(subheaderRef.current).lineHeight),
    };

    // Determine position state
    const positionState = calculatePositionState(measurements);

    setPosition(positionState.position);
    setTop(positionState.top);
    setBottom(positionState.bottom);
  }, [
    scrollPosition,
    isWideScreen,
    isHeightCompatible,
    clientsOnscroll,
    height,
  ]);

  // Helper function to calculate position state
  const calculatePositionState = (measurements) => {
    const { firstClientRect, lastClientRect, rootLineHeight, scrollbarY } =
      measurements;

    if (firstClientRect.top - 0.54 * rootLineHeight > scrollbarY) {
      return {
        position: "static",
        top: "unset",
        bottom: "unset",
      };
    }

    if (
      firstClientRect.top - 0.6 * rootLineHeight <= scrollbarY &&
      lastClientRect.bottom - 1.34 * rootLineHeight >= scrollbarY
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
  const pStyle = prefersReducedMotion
    ? {}
    : {
        position,
        top:
          top === false && isWideScreen && isHeightCompatible
            ? `clamp(var(--global-padding), calc(${scrollPosition}% - 0.85rlh), calc(100% - 1lh - var(--global-padding)))`
            : top,
        bottom,
      };

  return (
    <div className="text-body-1" ref={subheaderRef} style={pStyle}>
      <h3
        ref={(el) => (clientsOnscroll.current[0] = el)}
        className={styles["subheader"]}
      >
        Selected Clients:
      </h3>
    </div>
  );
};

export default ClientsSubheader;
