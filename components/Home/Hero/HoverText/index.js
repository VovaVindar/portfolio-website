import styles from "../Hero.module.css";
import { useHeroHoverAnimations } from "@/hooks/animations/hover/useHeroHoverAnimations";

const HoverText = ({ text = "" }) => {
  const { elementRef, displayText } = useHeroHoverAnimations(text);

  return (
    <div
      ref={elementRef}
      className={`${styles["hover-text"]} text-header-3`}
      style={{
        opacity: 0, // Start invisible
        visibility: "hidden",
      }}
    >
      {displayText}
    </div>
  );
};

export default HoverText;
