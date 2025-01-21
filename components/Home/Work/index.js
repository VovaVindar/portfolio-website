import { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import { work } from "@/constants/work";
import ChangeText from "@/components/Global/ChangeText";
import MediaContent from "@/components/Home/Work/MediaContent";

const AUTOPLAY_DELAY = 5000;

// Memoized PlayControl Component
/*<PlayControl
            isPlaying={isPlaying}
            isHovered={isHovered}
            isInView={isInView}
            onToggle={togglePlayPause}
            textRef={addToTextRefs}
          />*/

/*
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

const PlayControl = memo(
  ({ isPlaying, isHovered, isInView, onToggle, textRef }) => {
    return (
      <button
        className={styles["control"]}
        ref={textRef}
        onClick={onToggle}
        type="button"
        aria-label={isPlaying && !isHovered ? "Pause" : "Play"}
      >
        <Image
          src={`/icons/${
            isPlaying && !isHovered && isInView ? "pause" : "play"
          }.png`}
          alt={isPlaying && !isHovered ? "Pause" : "Play"}
          height="18"
          width="18"
        />
      </button>
    );
  }
);
PlayControl.displayName = "PlayControl";*/

const Work = () => {
  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Stable reference for current state values
  const stateRef = useRef({ isHovered, isInView });
  useEffect(() => {
    stateRef.current = { isHovered, isInView };
  }, [isHovered, isInView]);

  const handleNext = useCallback(() => {
    resetInterval();
    setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrevious = useCallback(() => {
    resetInterval();
    setCurrentIndex((prev) => (prev === 0 ? work.length - 1 : prev - 1));
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const { isHovered, isInView } = stateRef.current;
    if (!isHovered && isInView) {
      intervalRef.current = setInterval(handleNext, AUTOPLAY_DELAY);
    }
  }, [handleNext]);

  // Check for in-view class
  useEffect(() => {
    const checkInView = () => {
      const imgContainer = imgRef.current;
      const isNowInView = imgContainer?.classList.contains(styles["in-view"]);
      if (isNowInView !== stateRef.current.isInView) {
        setIsInView(isNowInView);
      }
    };

    // Initial check
    checkInView();

    // Set up mutation observer to watch for class changes
    const observer = new MutationObserver(checkInView);
    if (imgRef.current) {
      observer.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, [imgRef]);

  // Autoplay effect
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [isHovered, isInView, resetInterval]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isInView) {
        if (e.key === "ArrowLeft") handlePrevious();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious, isInView]);

  const currentWork = work[currentIndex];

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}
        ref={sectionRef}
      >
        <div className={styles["clicks"]}>
          <button
            type="button"
            aria-label="Previous"
            onClick={handlePrevious}
            className={styles["click-area"]}
          />
          <button
            type="button"
            aria-label="Next"
            onClick={handleNext}
            className={styles["click-area"]}
          />
        </div>

        <div className={styles["pagination"]} ref={addToTextRefs}>
          <div className={styles["text-container"]}>
            <p className="text-body-3">{currentIndex + 1}</p>
            <p className="text-body-3">/{work.length}</p>
          </div>
        </div>

        <div className={styles["image-container"]}>
          <div
            className={styles["project-image"]}
            data-cursor-text="Open Project"
            ref={imgRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MediaContent
              content={currentWork.media}
              title={currentWork.title}
            />
          </div>
        </div>

        <div ref={addToTextRefs} className={styles["project-details"]}>
          <div>
            <span className="text-header-3">Year:</span>
            <ChangeText text={currentWork.year} className="text-body-1" />
          </div>
          <div>
            <span className="text-header-3">Client:</span>
            <ChangeText text={currentWork.title} className="text-body-1" />
          </div>
        </div>

        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
