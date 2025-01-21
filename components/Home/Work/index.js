import { useState, useEffect, useCallback, useRef, memo } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import Image from "next/image";
import { work } from "@/constants/work";
import ChangeText from "@/components/Global/ChangeText";
import MediaContent from "@/components/Home/Work/MediaContent";
import Magnetic from "@/components/Global/Magnetic";

const AUTOPLAY_DELAY = 5000;

// Memoized Controls Component
const Controls = memo(({ onPrevious, onNext }) => {
  return (
    <div className={styles["clicks"]}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrevious}
        className={styles["click-area"]}
      />
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className={styles["click-area"]}
      />
    </div>
  );
});
Controls.displayName = "Controls";

// Memoized PlayControl Component
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
PlayControl.displayName = "PlayControl";

// Memoized Project Content
const ProjectContent = memo(({ media, title, imgRef }) => (
  <div
    className={styles["img-container"]}
    data-cursor-text="Open Project"
    ref={imgRef}
  >
    <Magnetic type="image">
      <MediaContent content={media} title={title} />
    </Magnetic>
  </div>
));
ProjectContent.displayName = "ProjectContent";

const Work = () => {
  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Stable reference for current state values
  const stateRef = useRef({ isPlaying, isHovered, isInView });
  useEffect(() => {
    stateRef.current = { isPlaying, isHovered, isInView };
  }, [isPlaying, isHovered, isInView]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? work.length - 1 : prev - 1));
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const { isPlaying, isHovered, isInView } = stateRef.current;
    if (isPlaying && !isHovered && isInView) {
      intervalRef.current = setInterval(handleNext, AUTOPLAY_DELAY);
    }
  }, [handleNext]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

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
  }, [isPlaying, isHovered, isInView, resetInterval]);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Controls onPrevious={handlePrevious} onNext={handleNext} />

        <div className={styles["work-pagination"]}>
          <div className={styles["counter"]}>
            <p className="text-body-3" ref={addToTextRefs}>
              <ChangeText text={currentIndex + 1} />
            </p>
            <p className="text-body-3" ref={addToTextRefs}>
              /{work.length}
            </p>
          </div>

          <div ref={addToTextRefs} className={styles["project-name"]}>
            <ChangeText text={currentWork.title} className="text-header-3" />
          </div>

          <PlayControl
            isPlaying={isPlaying}
            isHovered={isHovered}
            isInView={isInView}
            onToggle={togglePlayPause}
            textRef={addToTextRefs}
          />
        </div>

        <ProjectContent
          media={currentWork.media}
          title={currentWork.title}
          imgRef={imgRef}
        />

        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
