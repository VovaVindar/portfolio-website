import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Work.module.css";
import gsap from "gsap";
import Marquee from "@/components/Marquee";

const Work = () => {
  const [marqueeProgress, setMarqueeProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const pages = [0, 1, 2, 3];
  const totalPages = pages.length;
  //const [nextIndex, setNextIndex] = useState(pages[1] + 1);
  //const [prevIndex, setPrevIndex] = useState(pages[pages.length - 1] + 1);

  // Use useCallback to ensure setNumbersProgress does not change on re-renders
  const updateProgress = useCallback((progress) => {
    const breakpoint = 100 / totalPages;
    const currentIndex = Math.floor(progress / breakpoint);

    if (currentIndex != activeIndex) {
      setActiveIndex((currentIndex + totalPages) % totalPages);
    }
  }, []);

  return (
    <div className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}>
      <h2>Selected Work</h2>
      <div className={`${styles["el-container"]}`}>
        <Marquee setMarqueeProgress={updateProgress}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22,
          ].map((item, index) => (
            <div
              key={index}
              className={`${styles["el"]} ${styles[`num${index + 1}`]}`}
              style={{
                color: "white",
              }}
            >
              {index + 1}
            </div>
          ))}
        </Marquee>
      </div>
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
