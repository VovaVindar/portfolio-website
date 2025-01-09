import { useState, useEffect, useRef } from "react";
import styles from "../SelectedClients.module.css";
import { useScroll } from "@/context/ScrollContext";

const AnimatedSubheader = ({ clientsOnscroll }) => {
  // Check screen size
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 1060);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  // Subheader pinning
  const subheaderRef = useRef(null);
  const { scrollPosition } = useScroll();
  const [position, setPosition] = useState("relative");
  const [top, setTop] = useState("unset");
  const [bottom, setBottom] = useState("unset");

  useEffect(() => {
    if (subheaderRef.current && isWideScreen) {
      const lastClient =
        clientsOnscroll.current[clientsOnscroll.current.length - 1];
      const firstClient = clientsOnscroll.current[1];
      if (!lastClient || !firstClient) return;

      const firstClientRect = firstClient.getBoundingClientRect();
      const lastClientRect = lastClient.getBoundingClientRect();
      const lineHeight = parseFloat(
        window.getComputedStyle(subheaderRef.current).lineHeight
      );
      const rootLineHeight = parseFloat(
        getComputedStyle(document.documentElement).lineHeight
      );
      const scrollbarY =
        window.innerHeight * (scrollPosition * 0.01) - lineHeight;

      if (firstClientRect.top > scrollbarY) {
        setPosition("static");
        setTop("unset");
        setBottom("unset");
      } else if (
        firstClientRect.top <= scrollbarY &&
        lastClientRect.bottom - 1.1 * rootLineHeight >= scrollbarY
      ) {
        setPosition("fixed");
        setTop(false);
        setBottom("unset");
      } else {
        setPosition("absolute");
        setTop("unset");
        setBottom("0.26089rlh");
      }
    } else if (!isWideScreen) {
      setPosition("static");
      setTop("unset");
      setBottom("unset");
    }
  }, [scrollPosition, isWideScreen]);

  const pStyle = {
    position: `${position}`,
    top: `${
      top
        ? `${top}`
        : isWideScreen
        ? `clamp(var(--global-padding), calc(${scrollPosition}% - 1lh), calc(100% - 1lh - var(--global-padding)))`
        : "unset"
    }`,
    bottom: `${bottom}`,
  };

  return (
    <div className={`text-body-3`} ref={subheaderRef} style={pStyle}>
      <p
        ref={(el) => (clientsOnscroll.current[0] = el)}
        className={`${styles["subheader"]}`}
      >
        Selected Clients:
      </p>
    </div>
  );
};

export default AnimatedSubheader;
