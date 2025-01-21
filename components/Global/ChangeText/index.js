import { useChangeTextAnimations } from "@/hooks/animations/hover/useChangeTextAnimations";

const ChangeText = ({ text = "", className }) => {
  const { elementRef, displayText } = useChangeTextAnimations(text);

  return (
    <span
      ref={elementRef}
      className={className}
      style={{
        width: "fit-content",
      }}
    >
      {displayText}
    </span>
  );
};

export default ChangeText;
