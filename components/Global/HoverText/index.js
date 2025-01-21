import { useProjectHoverAnimations } from "@/hooks/animations/hover/useProjectHoverAnimations";

const HoverText = ({ text = "", className }) => {
  const { elementRef, displayText } = useProjectHoverAnimations(text);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        width: "fit-content",
      }}
    >
      {displayText}
    </div>
  );
};

export default HoverText;
