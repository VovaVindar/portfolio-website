import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const Magnetic = ({
  children,
  movement = 0.036,
  type = "image",
  passedScale,
  style,
}) => {
  const magneticAreaRef = useRef(null);
  const timelineRef = useRef(null);

  const maxScale = passedScale || (type === "image" ? 1.016 : 1.04);
  const minScale = 0.95;
  const pMovement = type === "image" ? movement : 0.075;

  const [scale, setScale] = useState(maxScale);

  // Memoize the animation function
  const animate = useCallback((target, props) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.to(target, {
      ...props,
      ease: "power1.out",
      duration: 0.55,
    });
  }, []);

  // Memoize the parallax calculation
  const calculateParallax = useCallback(
    (e, element, currentScale) => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const boundingRect = element.getBoundingClientRect();
      const relX = e.pageX - boundingRect.left;
      const relY = e.pageY - boundingRect.top;

      return {
        scale: currentScale,
        x: (relX - boundingRect.width / 2) * pMovement,
        y: (relY - boundingRect.height / 2 - scrollTop) * pMovement,
        opacity: 1,
      };
    },
    [pMovement]
  );

  useEffect(() => {
    const element = magneticAreaRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      animate(element, calculateParallax(e, element, scale));
    };

    const handleMouseLeave = () => {
      setScale(maxScale);
      animate(element, {
        scale: 1,
        x: 0,
        y: 0,
      });
    };

    const handleMouseDown = (e) => {
      setScale(minScale);
      animate(element, calculateParallax(e, element, minScale));
    };

    const handleMouseUp = (e) => {
      setScale(maxScale);
      animate(element, calculateParallax(e, element, maxScale));
    };

    // Event listeners
    const events = [
      ["mousemove", handleMouseMove],
      ["mouseleave", handleMouseLeave],
      ["mousedown", handleMouseDown],
      ["mouseup", handleMouseUp],
    ];

    events.forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });

    return () => {
      events.forEach(([event, handler]) => {
        element.removeEventListener(event, handler);
      });
      timelineRef.current?.kill();
    };
  }, [scale, animate, calculateParallax, maxScale, minScale]);

  if (type === "image") {
    return (
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
    );
  }

  return (
    <span ref={magneticAreaRef} style={{ willChange: "transform" }}>
      {children}
    </span>
  );
};

export default Magnetic;
