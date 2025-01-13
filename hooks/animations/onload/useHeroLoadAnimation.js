import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ANIMATION_CONSTANTS } from "@/utils/animation/constants";

export const useHeroLoadAnimation = (imgRefs, cellRefs, startPageAnimation) => {
  const timelineImgRef = useRef(null);
  const timelineCellRef = useRef(null);

  useEffect(() => {
    if (!startPageAnimation) return;

    // Setup timelines
    timelineImgRef.current = gsap.timeline();
    timelineCellRef.current = gsap.timeline();

    // Image initial animation
    if (imgRefs.current?.length) {
      timelineImgRef.current.to([...imgRefs.current].reverse(), {
        delay: ANIMATION_CONSTANTS.DELAY,
        duration: 0,
        stagger: {
          each:
            ANIMATION_CONSTANTS.STAGGER_DELAY +
            ANIMATION_CONSTANTS.EXTRA_STAGGER,
          onComplete() {
            this.targets()[0]?.classList.add("in-view");
          },
        },
      });
    }

    // Cell slide animation
    if (cellRefs.current?.length) {
      const containerHeight =
        cellRefs.current[0]?.parentElement?.offsetHeight ?? 0;

      timelineCellRef.current.fromTo(
        [...cellRefs.current].reverse(),
        {
          y: -(containerHeight + 5),
          autoAlpha: 0,
          scale: 1.8,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          transformOrigin: "bottom",
          duration: ANIMATION_CONSTANTS.CELL_DURATION,
          delay: ANIMATION_CONSTANTS.DELAY,
          ease: ANIMATION_CONSTANTS.EASE,
          stagger: ANIMATION_CONSTANTS.STAGGER_DELAY,
        }
      );
    }

    return () => {
      timelineImgRef.current?.kill();
      timelineCellRef.current?.kill();
    };
  }, [startPageAnimation, imgRefs, cellRefs]);
};
