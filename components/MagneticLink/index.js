import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const MagneticLink = ({ href, children, style, className }) => {
  const magneticAreaRef = useRef(null);
  const [scale, setScale] = useState(1.04);

  useEffect(() => {
    const mArea = magneticAreaRef.current;

    if (!mArea) return;

    const parallaxIt = (e, scale, movement = 0.075) => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const boundingRect = mArea.getBoundingClientRect();
      const relX = e.pageX - boundingRect.left;
      const relY = e.pageY - boundingRect.top;

      gsap.to(mArea, {
        scale: scale,
        x: (relX - boundingRect.width / 2) * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) * movement,
        ease: "power1.out",
        opacity: 1,
        duration: 0.6,
      });
    };

    const handleMouseMove = (e) => parallaxIt(e, scale);

    const handleMouseLeave = () => {
      setScale(1.04);
      gsap.to(mArea, {
        scale: 1,
        x: 0,
        y: 0,
        ease: "power1.out",
        duration: 0.6,
      });
    };

    const handleMouseDown = (e) => {
      setScale(0.96);
      parallaxIt(e, 0.96);
    };

    const handleMouseUp = (e) => {
      setScale(1.04);
      parallaxIt(e, 1.04);
    };

    mArea.addEventListener("mousemove", handleMouseMove);
    mArea.addEventListener("mouseleave", handleMouseLeave);
    mArea.addEventListener("mousedown", handleMouseDown);
    mArea.addEventListener("mouseup", handleMouseUp);

    return () => {
      mArea.removeEventListener("mousemove", handleMouseMove);
      mArea.removeEventListener("mouseleave", handleMouseLeave);
      mArea.removeEventListener("mousedown", handleMouseDown);
      mArea.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scale]);

  return (
    <>
      <Link
        ref={magneticAreaRef}
        href={href}
        style={style}
        className={`mf-hidden ${className}`}
      >
        {children}
      </Link>
    </>
  );
};

export default MagneticLink;
