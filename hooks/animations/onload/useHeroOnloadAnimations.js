import { useGSAP } from "@gsap/react";
import { HERO as getHero } from "@/constants/animations";
import styles from "@/components/Home/Hero/Hero.module.css";
import { useTransition } from "@/context/TransitionContext";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";
import { useCallback, useEffect, useRef } from "react";

export const useHeroOnloadAnimations = (imgOnload, cellOnload) => {
  const { width } = useWindowDimensions();
  const HERO = getHero();

  const isWideScreen = width > 820;
  const renderCount = useRef(0);

  const { globalOnload, isPageChanged } = useTransition();

  // Function to add in-view class to all images
  const addInView = useCallback(() => {
    if (imgOnload.current?.length) {
      [...imgOnload.current].forEach((img) => {
        img.classList.add(styles["in-view"]);
      });
    }
  }, [imgOnload]);

  // Monitor isWideScreen changes, skip initial 2 renders
  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current <= 2) {
      return;
    }

    if (imgOnload.current?.length) {
      addInView();
    }
  }, [isWideScreen, imgOnload, addInView]);

  useGSAP(() => {
    if (imgOnload.current?.length) {
      globalOnload.to(
        [...imgOnload.current].reverse(),
        {
          duration: 0,
          stagger: {
            each:
              HERO.LOAD.GRID.CELL_STAGGER + HERO.LOAD.GRID.IMG_EXTRA_STAGGER,
            onComplete() {
              this.targets()[0]?.classList.add(styles["in-view"]);
            },
          },
        },
        HERO.LOAD.GRID.INITIAL_DELAY
      );
    }

    // Cell slide animation
    if (cellOnload.current?.length) {
      const containerHeight =
        cellOnload.current[0]?.parentElement?.offsetHeight ?? 0;

      globalOnload.fromTo(
        [...cellOnload.current].reverse(),
        {
          y: -(containerHeight + 5),
          autoAlpha: 0,
          scale: isWideScreen ? 1.8 : 1,
          filter: `blur(${HERO.LOAD.GRID.CELL_BLUR.START})`,
        },
        {
          filter: `blur(${HERO.LOAD.GRID.CELL_BLUR.END})`,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          transformOrigin: "bottom",
          duration: HERO.LOAD.GRID.CELL_DURATION,
          ease: HERO.EASING,
          stagger: HERO.LOAD.GRID.CELL_STAGGER,
        },
        HERO.LOAD.GRID.INITIAL_DELAY
      );
    }

    if (isPageChanged) {
      // Add in-view class to all images when page is changing
      addInView();
    }
  }, []);
};
