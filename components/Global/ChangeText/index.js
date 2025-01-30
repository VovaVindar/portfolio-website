import { useChangeTextAnimations } from "@/hooks/animations/interaction/useChangeTextAnimations";

const ChangeText = ({ text = "", className, ...props }) => {
  const { elementRef, displayText } = useChangeTextAnimations(text);

  return (
    <span
      ref={elementRef}
      className={className}
      style={{
        width: "fit-content",
      }}
      {...props}
    >
      {displayText}
    </span>
  );
};

export default ChangeText;
