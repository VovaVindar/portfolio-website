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

  // Combine related states into a single object to reduce re-renders
  const [carouselState, setCarouselState] = useState({
    isHovered: false,
    isInteracted: false,
    isInView: false,
  });

  const intervalRef = useRef(null);

  // Use ref for state access in intervals/timeouts
  const stateRef = useRef(carouselState);
  stateRef.current = carouselState;

  const updateCarouselState = useCallback((updates) => {
    setCarouselState((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const { isHovered, isInView, isInteracted } = stateRef.current;

    if (isInView && (!isInteracted || (!isHovered && isInteracted))) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
        setArrowUpdate((prev) => prev + 1);
      }, AUTOPLAY_DELAY);
    }
  }, []);

  const handleNavigation = useCallback(
    (direction) => {
      setCurrentIndex((prev) => {
        if (direction === "next") {
          return prev === work.length - 1 ? 0 : prev + 1;
        }
        return prev === 0 ? work.length - 1 : prev - 1;
      });

      if (!stateRef.current.isInteracted) {
        updateCarouselState({ isInteracted: true });
      }

      resetInterval();
    },
    [resetInterval, updateCarouselState]
  );

  // Check for in-view class
  useEffect(() => {
    const checkInView = () => {
      const imgContainer = imgRef.current;
      const isNowInView = imgContainer?.classList.contains(styles["in-view"]);

      if (isNowInView !== stateRef.current.isInView) {
        updateCarouselState({ isInView: isNowInView });
      }
    };

    checkInView();

    const observer = new MutationObserver(checkInView);
    if (imgRef.current) {
      observer.observe(imgRef.current, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, [imgRef, updateCarouselState]);

  // Autoplay effect
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [
    carouselState.isHovered,
    carouselState.isInView,
    resetInterval,
    carouselState.isInteracted,
  ]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (carouselState.isInView) {
        if (e.key === "ArrowLeft") handleNavigation("prev");
        if (e.key === "ArrowRight") handleNavigation("next");
        setArrowUpdate((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNavigation, carouselState.isInView]);

  const currentWork = work[currentIndex];

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} mf-exclusion`}
        ref={sectionRef}
        onMouseEnter={() => updateCarouselState({ isHovered: true })}
        onMouseLeave={() =>
          updateCarouselState({
            isHovered: false,
            isInteracted: false,
          })
        }
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
            className="text-body-3"
            target="_blank"
            ref={addToTextRefs}
          >
            <Magnetic type="small-text">Open Project</Magnetic>
          </Link>
        </div>

        <ClickAreas
          currentIndex={currentIndex}
          onPrevious={() => handleNavigation("prev")}
          onNext={() => handleNavigation("next")}
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
