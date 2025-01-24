import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import { work } from "@/constants/work";
import ChangeText from "@/components/Global/ChangeText";
import MediaContent from "@/components/Home/Work/MediaContent";
import Link from "next/link";
import Magnetic from "@/components/Global/Magnetic";

const AUTOPLAY_DELAY = 5500;

const Work = () => {
  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrowUpdate, setArrowUpdate] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const intervalRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Stable reference for current state values
  const stateRef = useRef({ isHovered, isInView, isInteracted });
  useEffect(() => {
    stateRef.current = { isHovered, isInView, isInteracted };
  }, [isHovered, isInView, isInteracted]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const { isHovered, isInView, isInteracted } = stateRef.current;

    if (isInView) {
      // Only start interval if:
      // 1. User hasn't interacted yet (autoplay) OR
      // 2. User has interacted AND is not hovering (resume autoplay)
      if (!isInteracted || (!isHovered && isInteracted)) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
          setArrowUpdate((prevCount) => prevCount + 1);
        }, AUTOPLAY_DELAY);
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
    if (!isInteracted) {
      setIsInteracted(true);
    }

    resetInterval();
  }, [resetInterval, isInteracted]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? work.length - 1 : prev - 1));
    if (!isInteracted) {
      setIsInteracted(true);
    }

    resetInterval();
  }, [resetInterval, isInteracted]);

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
  }, [isHovered, isInView, resetInterval, isInteracted]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isInView) {
        if (e.key === "ArrowLeft") handlePrevious();
        if (e.key === "ArrowRight") handleNext();

        setArrowUpdate((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious, isInView]);

  const currentWork = work[currentIndex];

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} mf-exclusion`}
        ref={sectionRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsInteracted(false);
        }}
      >
        <div ref={addToTextRefs} className={styles["project-details"]}>
          <div>
            <span className="text-header-3">Client:</span>
            <ChangeText
              text={currentWork.title}
              className={`${styles["info"]} text-body-1`}
            />
          </div>
          <div>
            <span className="text-header-3">Year:</span>
            <ChangeText
              text={currentWork.year}
              className={`${styles["info"]} text-body-1`}
            />
          </div>
        </div>

        <div className={styles["image-container"]}>
          <div
            className={styles["project-image"]}
            data-cursor-text="Open Project"
            ref={imgRef}
          >
            <MediaContent
              content={currentWork.media}
              title={currentWork.title}
            />
          </div>
        </div>

        <div className={styles["project-link"]}>
          <Link
            href="https://dribbble.com/VovaVindar"
            className={`text-body-3`}
            target="_blank"
            ref={addToTextRefs}
          >
            <Magnetic type="small-text">Open Project</Magnetic>
          </Link>
        </div>

        <ClickAreas
          currentIndex={currentIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          totalLength={work.length}
          arrowUpdate={arrowUpdate}
        />

        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;

const ClickAreas = ({
  currentIndex,
  onPrevious,
  onNext,
  totalLength,
  arrowUpdate,
}) => {
  const getLoopedIndex = (index) => {
    return (((index % totalLength) + totalLength) % totalLength) + 1;
  };

  return (
    <div className={styles["clicks"]} key={arrowUpdate}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrevious}
        className={styles["click-area"]}
        data-cursor-text={getLoopedIndex(currentIndex - 1)}
      />
      <button
        type="button"
        aria-label="Next"
        onClick={onNext}
        className={styles["click-area"]}
        data-cursor-text={getLoopedIndex(currentIndex + 1)}
      />
    </div>
  );
};
