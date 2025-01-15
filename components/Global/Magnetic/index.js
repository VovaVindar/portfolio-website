import { useMagnetic } from "@/hooks/animations/hover/useMagnetic";
import { MAGNETIC } from "@/constants/animations";

const Magnetic = ({
  children,
  movement = MAGNETIC.MOVEMENT.IMAGE,
  type = "image",
  passedScale,
  style,
}) => {
  if (!children) {
    console.warn("Magnetic component requires children");
    return null;
  }

  const { magneticAreaRef } = useMagnetic(type, passedScale, movement);

  return type === "image" ? (
    <div
      ref={magneticAreaRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  ) : (
    <span ref={magneticAreaRef} style={{ willChange: "transform" }}>
      {children}
    </span>
  );
};

export default Magnetic;
