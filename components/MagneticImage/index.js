import { useEffect, useRef, useState } from "react";
//import BlurImage from "@/components/BlurImage";
import gsap from "gsap";

const MagneticImage = ({ children, movement = 0.036 }) => {
  const magneticAreaRef = useRef(null);
  const maxScale = 1.016;
  const minScale = 0.975;
  const [scale, setScale] = useState(maxScale);
  var pMovement = movement;

  useEffect(() => {
    const mArea = magneticAreaRef.current;

    if (!mArea) return;

    const parallaxIt = (e, scale, movement = pMovement) => {
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
      setScale(maxScale);
      gsap.to(mArea, {
        scale: 1,
        x: 0,
        y: 0,
        ease: "power1.out",
        duration: 0.6,
      });
    };

    const handleMouseDown = (e) => {
      setScale(minScale);
      parallaxIt(e, minScale);
    };

    const handleMouseUp = (e) => {
      setScale(maxScale);
      parallaxIt(e, maxScale);
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
    <div ref={magneticAreaRef}>
      {/*<BlurImage
        src="/marquee.png"
        alt="Picture of the author"
        priority={true}
      />*/}
      {children}
    </div>
  );
};

export default MagneticImage;
