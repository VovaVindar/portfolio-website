import { useMagnetic } from "@/hooks/animations/hover/useMagnetic";

const Magnetic = ({ children, movement, type, scale, style, ...props }) => {
  const { magneticAreaRef } = useMagnetic(type, scale, movement);

  if (!children) {
    console.warn("Magnetic component requires children");
    return null;
  }

  return type === "image" ? (
    <div
      ref={magneticAreaRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ) : (
    <span ref={magneticAreaRef} style={{ willChange: "transform" }} {...props}>
      {children}
    </span>
  );
};

export default Magnetic;
