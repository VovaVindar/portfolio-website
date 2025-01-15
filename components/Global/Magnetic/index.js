import { useMagnetic } from "@/hooks/animations/hover/useMagnetic";

const Magnetic = ({ children, movement, type, scale, style }) => {
  if (!children) {
    console.warn("Magnetic component requires children");
    return null;
  }

  const { magneticAreaRef } = useMagnetic(type, scale, movement);

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
