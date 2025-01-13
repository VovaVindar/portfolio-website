import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/constants/animations";
import styles from "@/components/Home/Hero/Hero.module.css";
import { usePreloader } from "@/context/PreloaderContext";

export const useHeroOnloadAnimations = (imgOnload, cellOnload) => {
  const { startPageAnimation } = usePreloader();
  const timelineImgRef = useRef(null);
  const timelineCellRef = useRef(null);

  useGSAP(() => {
    if (timelineImgRef.current) timelineImgRef.current.kill();
    if (timelineCellRef.current) timelineCellRef.current.kill();

    timelineImgRef.current = gsap.timeline();
    timelineCellRef.current = gsap.timeline();

    if (startPageAnimation) {
      // Image filters animation
      if (imgOnload.current?.length) {
        timelineImgRef.current.to([...imgOnload.current].reverse(), {
          delay: HERO.LOAD.GRID.INITIAL_DELAY,
          duration: 0,
          stagger: {
            each:
              HERO.LOAD.GRID.CELL_STAGGER + HERO.LOAD.GRID.IMG_EXTRA_STAGGER,
            onComplete() {
              this.targets()[0]?.classList.add(styles["in-view"]);
            },
          },
        });
      }

      // Cell slide animation
      if (cellOnload.current?.length) {
        const containerHeight =
          cellOnload.current[0]?.parentElement?.offsetHeight ?? 0;

        timelineCellRef.current.fromTo(
          [...cellOnload.current].reverse(),
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
            duration: HERO.LOAD.GRID.CELL_DURATION,
            delay: HERO.LOAD.GRID.INITIAL_DELAY,
            ease: HERO.EASING,
            stagger: HERO.LOAD.GRID.CELL_STAGGER,
          }
        );
      }
    }

    return () => {
      timelineImgRef.current?.kill();
      timelineCellRef.current?.kill();
      timelineImgRef.current = null;
      timelineCellRef.current = null;
    };
  }, [startPageAnimation]);

  return { timelineImgRef, timelineCellRef };
};
