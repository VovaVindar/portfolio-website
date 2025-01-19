import styles from "../Hero.module.css";
import { useProjectHoverAnimations } from "@/hooks/animations/hover/useProjectHoverAnimations";

const HoverText = ({ text = "" }) => {
  const { elementRef, displayText } = useProjectHoverAnimations(text);

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
