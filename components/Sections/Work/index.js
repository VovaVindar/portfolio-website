import React, { useState, useRef, useEffect } from "react";
import styles from "./Work.module.css";
import gsap from "gsap";
import Marquee from "@/components/Marquee";

const Work = () => {
  // WIP
  const magneticContainerRef = useRef(null);
  //const magneticAreaRef = useRef(null);
  //const maxScale = 1.016;
  //const minScale = 0.975;
  //const [scale, setScale] = useState(maxScale);

  const pages = [0, 1, 2, 3];
  const [activeIndex, setActiveIndex] = useState(pages[0]);
  const [nextIndex, setNextIndex] = useState(pages[1] + 1);
  const [prevIndex, setPrevIndex] = useState(pages[pages.length - 1] + 1);

  const handleCircleClick = (clickedIndex) => {
    const totalPages = pages.length;

    const validIndex = (clickedIndex + totalPages) % totalPages;

    setActiveIndex(validIndex);

    setNextIndex(((validIndex + 1) % totalPages) + 1);
    setPrevIndex(((validIndex - 1 + totalPages) % totalPages) + 1);
  };

  /* useEffect(() => {
    const mContainer = magneticContainerRef.current;
    const mArea = magneticAreaRef.current;

    if (!mContainer) return;

    const parallaxIt = (e, scale, movement = 0.036) => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const boundingRect = mContainer.getBoundingClientRect();
      const relX = e.pageX - boundingRect.left;
      const relY = e.pageY - boundingRect.top;

      gsap.to(mArea, {
        scale: scale,
        x: (relX - boundingRect.width / 2) * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) * movement,
        ease: "power1.out",
        z: 100 * movement,
        rotationY: 1000 * movement,
        opacity: 1,
        duration: 0.6,
      });
    };

    const handleMouseMove = (e) => parallaxIt(e, scale);

    mContainer.addEventListener("mousemove", handleMouseMove);

    return () => {
      mContainer.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scale]); */

  return (
    <div
      className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}
      ref={magneticContainerRef}
    >
      <h2>Selected Work</h2>
      <div style={{ position: "absolute", width: "100%", marginTop: "8rlh" }}>
        <Marquee>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                height: "200px",
                backgroundColor: "black",
                color: "white",
              }}
            >
              {index}
            </div>
          ))}
        </Marquee>
      </div>

      {/*<div ref={magneticAreaRef} className={`${styles["magnetic"]}`}>
        <div
          className={`${styles["image"]}`}
          style={{ transform: "translate(30%, 30%)" }}
        ></div>
      </div>*/}
      <div className={`text-body-1 ${styles["left"]}`}></div>
      <div className={`text-header-1 ${styles["right"]}`}></div>
      {/*<div
        className={`${styles["click"]} ${styles["prev"]}`}
        role="button"
        aria-label="Previous"
        data-cursor-text={prevIndex}
        onClick={() => handleCircleClick(activeIndex - 1)}
      ></div>
      <div
        className={`${styles["click"]} ${styles["next"]}`}
        role="button"
        aria-label="Next"
        data-cursor-text={nextIndex}
        onClick={() => handleCircleClick(activeIndex + 1)}
      ></div>*/}
      <div
        className={`${styles["circle-container"]} ${
          styles[`active-${activeIndex}`]
        }`}
      >
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={`${styles["circle"]}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Work;
