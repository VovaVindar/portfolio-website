import { useState, useEffect } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import Image from "next/image";
import { work } from "@/constants/work";

const AUTOPLAY_DELAY = 2500; // 5 seconds between transitions

const Work = () => {
  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? work.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === work.length - 1 ? 0 : prevIndex + 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle auto-play
  useEffect(() => {
    let interval;

    if (isPlaying && !isHovered) {
      interval = setInterval(() => {
        handleNext();
      }, AUTOPLAY_DELAY);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isHovered, handleNext]);

  // Handle keyboard navigation when image is in view
  useEffect(() => {
    const imgContainer = imgRef.current;
    const handleKeyPress = (e) => {
      if (imgContainer?.classList.contains("in-view")) {
        if (e.key === "ArrowLeft") {
          handlePrevious();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
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
          <p
            className={`${styles["project-name"]} text-header-3`}
            ref={addToTextRefs}
          >
            {work[currentIndex].title}
          </p>
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
