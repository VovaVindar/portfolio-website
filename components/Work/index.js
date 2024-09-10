import React, { useState, useCallback } from "react";
import styles from "./Work.module.css";

const Work = () => {
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

  return (
    <div className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}>
      <h2>Selected Work</h2>
      <div className={`text-body-1`}></div>
      <div className={`text-header-1`}></div>
      <div
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
      ></div>
      <div className={`${styles["image"]}`}></div>
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
