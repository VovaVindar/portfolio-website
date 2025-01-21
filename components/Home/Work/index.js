import { useState, useEffect, useCallback } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import Image from "next/image";
import { work } from "@/constants/work";
import HoverText from "@/components/Global/HoverText"; // Adjust this import path as needed

const AUTOPLAY_DELAY = 3500;

const Work = () => {
  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? work.length - 1 : prevIndex - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === work.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && !isHovered) {
      interval = setInterval(handleNext, AUTOPLAY_DELAY);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isHovered, handleNext]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const imgContainer = imgRef.current;
      const isInView = imgContainer?.classList.contains(`${styles["in-view"]}`);

      if (isInView) {
        switch (e.key) {
          case "ArrowLeft":
            handlePrevious();
            break;
          case "ArrowRight":
            handleNext();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleNext, handlePrevious, imgRef]);

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}
        ref={sectionRef}
      >
        <div className={styles["clicks"]}>
          <div
            role="button"
            aria-label="Previous"
            onClick={handlePrevious}
            className={styles["click-area"]}
          />
          <div
            role="button"
            aria-label="Next"
            onClick={handleNext}
            className={styles["click-area"]}
          />
        </div>

        <div className={styles["work-pagination"]}>
          <div className={styles["counter"]}>
            <p className="text-body-3" ref={addToTextRefs}>
              {currentIndex + 1}
            </p>
            <p className="text-body-3" ref={addToTextRefs}>
              /{work.length}
            </p>
          </div>

          {/* Replaced the static text with HoverText component */}
          <div ref={addToTextRefs} className={styles["project-name"]}>
            <HoverText
              text={work[currentIndex].title}
              className={"text-header-3"}
            />
          </div>

          <div
            className={styles["control"]}
            ref={addToTextRefs}
            onClick={togglePlayPause}
          >
            <Image
              src={`/icons/${isPlaying && !isHovered ? "pause" : "play"}.png`}
              alt={isPlaying && !isHovered ? "Pause" : "Play"}
              height="18"
              width="18"
            />
          </div>
        </div>

        <div
          className={styles["img-container"]}
          data-cursor-text="Open Project"
          ref={imgRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={work[currentIndex].image}
            alt={work[currentIndex].title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="text-body-1 left-layout"></div>
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
