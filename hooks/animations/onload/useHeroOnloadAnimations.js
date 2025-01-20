import { useGSAP } from "@gsap/react";
import { HERO as getHero } from "@/constants/animations";
import styles from "@/components/Home/Hero/Hero.module.css";
import { useTransition } from "@/context/TransitionContext";

export const useHeroOnloadAnimations = (imgOnload, cellOnload) => {
  const HERO = getHero();

  const { globalOnload, isPageChanged } = useTransition();

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
          scale: 1.8,
        },
        {
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
      if (imgOnload.current?.length) {
        [...imgOnload.current].forEach((img) => {
          img.classList.add(styles["in-view"]);
        });
      }
    }
  }, []);

  return {};
};
