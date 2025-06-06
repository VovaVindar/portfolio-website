import { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";
import { work } from "@/constants/work";
import ChangeText from "@/components/Global/ChangeText";
import MediaContent from "@/components/Home/Work/MediaContent";
import Link from "next/link";
import Magnetic from "@/components/Global/Magnetic";

const AUTOPLAY_DELAY = 5500;

const Work = () => {
  // Add reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { imgRef, addToTextRefs, sectionRef } = useWorkScrollAnimations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrowUpdate, setArrowUpdate] = useState(0);

  // Use refs for both hover and inView states
  const hoverRef = useRef(false);
  const isInViewRef = useRef(false);
  const intervalRef = useRef(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isInViewRef.current && !hoverRef.current && !prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setArrowUpdate((prev) => prev + 1);
        setCurrentIndex((prev) => (prev === work.length - 1 ? 0 : prev + 1));
      }, AUTOPLAY_DELAY);
    }
  }, [prefersReducedMotion]);

  const handleNavigation = useCallback(
    (direction) => {
      setCurrentIndex((prev) => {
        if (direction === "next") {
          return prev === work.length - 1 ? 0 : prev + 1;
        }
        return prev === 0 ? work.length - 1 : prev - 1;
      });

      resetInterval();
    },
    [resetInterval]
  );

  // Check for in-view class
  useEffect(() => {
    const checkInView = () => {
      const imgContainer = imgRef.current;
      const isNowInView = imgContainer?.classList.contains(styles["in-view"]);

      if (isNowInView !== isInViewRef.current) {
        isInViewRef.current = isNowInView;
        resetInterval();
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
  }, [imgRef, resetInterval]);

  // Autoplay effect
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [resetInterval]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isInViewRef.current) {
        setArrowUpdate((prev) => prev + 1);

        if (e.key === "ArrowLeft") handleNavigation("prev");
        if (e.key === "ArrowRight") handleNavigation("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNavigation]);

  // Memoize the current work object
  const currentWork = useMemo(() => work[currentIndex], [currentIndex]);

  // Simplified hover handlers using ref
  const handleMouseEnter = useCallback(() => {
    if (window.matchMedia("(hover: hover)").matches) {
      hoverRef.current = true;
      resetInterval();
    }
  }, [resetInterval]);

  const handleMouseLeave = useCallback(() => {
    if (window.matchMedia("(hover: hover)").matches) {
      hoverRef.current = false;
      resetInterval();
    }
  }, [resetInterval]);

  return (
    <section
      className={styles["work-container"]}
      aria-label="Featured Work Projects. Use left and right arrow keys to navigate between projects"
    >
      <div aria-live="polite" className="sr-only">
        Currently showing {currentWork.title} project, {currentIndex + 1} of{" "}
        {work.length}
      </div>

      <div className={`${styles["work"]} mf-exclusion`} ref={sectionRef}>
        <dl ref={addToTextRefs} className={styles["project-details"]}>
          <div>
            <dt className="text-header-3">Client:</dt>
            <dd>
              <ChangeText
                text={currentWork.title}
                className={`${styles["info"]} text-body-1`}
              />
            </dd>
          </div>
          <div>
            <dt className="text-header-3">Year:</dt>
            <dd>
              <ChangeText
                text={currentWork.year}
                className={`${styles["info"]} text-body-1`}
              />
            </dd>
          </div>
        </dl>

        <div className={styles["image-container"]}>
          <div
            className={styles["project-image"]}
            data-cursor-text="Open Project"
            ref={imgRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <MediaContent
              content={currentWork.media}
              title={currentWork.title}
              link={currentWork.link}
            />
          </div>
        </div>

        <div className={styles["project-link"]}>
          <Link
            href={currentWork.link}
            className="text-body-3"
            target="_blank"
            ref={addToTextRefs}
            aria-label={`Visit ${currentWork.title} project page`}
            aria-description="opens in new tab"
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

        <div className="text-body-1 left-layout" aria-hidden="true" />
        <div className="text-header-1 right-layout" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Work;

Work.whyDidYouRender = true;

const ClickAreas = memo(function ClickAreas({
  currentIndex,
  onPrevious,
  onNext,
  totalLength,
  arrowUpdate,
}) {
  const getLoopedIndex = useCallback(
    (index) => {
      return (((index % totalLength) + totalLength) % totalLength) + 1;
    },
    [totalLength]
  );

  return (
    <div
      className={styles["clicks"]}
      aria-hidden="true" // Since these are supplementary mouse-only controls
    >
      <button
        type="button"
        onClick={onPrevious}
        className={styles["click-area"]}
        data-cursor-text={getLoopedIndex(currentIndex - 1)}
        key={arrowUpdate}
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={onNext}
        className={styles["click-area"]}
        data-cursor-text={getLoopedIndex(currentIndex + 1)}
        key={`next-${arrowUpdate}`}
        tabIndex={-1}
      />
    </div>
  );
});

ClickAreas.displayName = "ClickAreas";
