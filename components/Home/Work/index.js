import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import { work } from "@/constants/work";
import ChangeText from "@/components/Global/ChangeText";
import MediaContent from "@/components/Home/Work/MediaContent";
import Link from "next/link";
import Magnetic from "@/components/Global/Magnetic";

const AUTOPLAY_DELAY = 5000;

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

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const { isHovered, isInView } = stateRef.current;
    if (!isHovered && isInView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
      }, AUTOPLAY_DELAY);
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
    resetInterval();
  }, [resetInterval]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? work.length - 1 : prev - 1));
    resetInterval();
  }, [resetInterval]);

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

  // Function to handle index looping for display
  const getLoopedIndex = (index) => {
    return (((index % work.length) + work.length) % work.length) + 1;
  };

  return (
    <div className={styles["work-container"]}>
      <div className={`${styles["work"]} mf-exclusion`} ref={sectionRef}>
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MediaContent
              content={currentWork.media}
              title={currentWork.title}
            />
          </div>
        </div>

        <div className={styles["mobile-link"]}>
          <Link
            href="https://dribbble.com/VovaVindar"
            className={`text-body-3`}
            target="_blank"
          >
            <Magnetic type="small-text">Open Project</Magnetic>
          </Link>
        </div>

        <div className={styles["clicks"]}>
          <button
            type="button"
            aria-label="Previous"
            onClick={handlePrevious}
            className={styles["click-area"]}
            data-cursor-text={getLoopedIndex(currentIndex - 1)}
          />
          <button
            type="button"
            aria-label="Next"
            onClick={handleNext}
            className={styles["click-area"]}
            data-cursor-text={getLoopedIndex(currentIndex + 1)}
          />
        </div>

        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
