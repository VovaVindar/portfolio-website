import React, { useState } from "react";
import styles from "./Work.module.css";

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCircleClick = (index) => {
    if (index < 0) {
      setActiveIndex(3);
      return;
    } else if (index > 3) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div className={`${styles["work"]} text-body-1-uppercase`}>
      <h2>Selected Work</h2>
      <div className={`text-body-1`}></div>
      <div className={`text-header-1`}></div>
      <div
        className={`${styles["click"]} ${styles["prev"]}`}
        role="button"
        aria-label="Previous"
        onClick={() => handleCircleClick(activeIndex - 1)}
      ></div>
      <div
        className={`${styles["click"]} ${styles["next"]}`}
        role="button"
        aria-label="Next"
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
