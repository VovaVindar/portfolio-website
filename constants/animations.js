import { useMemo } from "react";
import { useInterface } from "@/context/PreloaderContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

const BaseConstants = () => {
  return useMemo(
    () => ({
      STAGGER_INTERVAL: 0.11,
      ANIMATION_DURATION: 1.15,
      ANIMATION_EASING: "power1.inOut", // Easing for: text fade in
      SCROLLTRIGGER_ONCE: true,
      TEXT_INACTIVE_COLOR: "red",
    }),
    []
  );
};

export const PRELOADER = () => {
  const { isTallScreen, interval, incrementCap, isVeryTallScreen } =
    useInterface();
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      LOADING: {
        INTERVAL: interval,
        INCREMENT_CAP: incrementCap,
      },

      FADE: {
        DURATION: !prefersReducedMotion ? 1.2 : 0.25,
        DELAY: !prefersReducedMotion ? 0.5 : 0.2,
        EASING: "power3.inOut",
        BLUR: {
          ACTIVE: "0px",
          COMPLETE: "2px",
        },
      },

      SLIDE: {
        DURATION: isVeryTallScreen ? 1.44 : isTallScreen ? 1.44 : 1.52,
        EASING: "power3.in",
        Y_OFFSET: 520,
      },

      PROGRESS: {
        DURATION: 1,
        EASING: "power4.out",
        COLOR: {
          START: "red",
          LOADING: "white",
          COMPLETE: "red",
        },
        OPACITY: {
          START: 0.4,
          LOADING: 1,
          COMPLETE: 0.8,
        },
        BLUR: {
          START: "0px",
          COMPLETE: "0.7px",
        },
        SHADOW: {
          START: "0 0 10px rgba(255, 0, 0, 0.7)",
          END: "none",
        },
      },
    }),
    [
      isTallScreen,
      interval,
      incrementCap,
      isVeryTallScreen,
      prefersReducedMotion,
    ]
  );
};

export const LINES = () => {
  const { isTallScreen, isVeryTallScreen } = useInterface();
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      COLORS: {
        START: "#0F1010",
        END: "#C34356",
      },

      TRANSITION: {
        SCALEY: !prefersReducedMotion ? 0 : 1,
        DURATION: !prefersReducedMotion
          ? isVeryTallScreen
            ? 1.1
            : isTallScreen
            ? 1.1
            : 1.25
          : 0.35,
        DELAY: !prefersReducedMotion
          ? isVeryTallScreen
            ? 0.95
            : isTallScreen
            ? 0.95
            : 0.55
          : 0.35,
        EASING: "power4.inOut",
        COMPLETION_DELAY: !prefersReducedMotion
          ? isVeryTallScreen
            ? 150
            : isTallScreen
            ? 150
            : 780
          : 150,
        STAGGER: !prefersReducedMotion
          ? isVeryTallScreen
            ? 0.019
            : isTallScreen
            ? 0.024
            : 0.037
          : 0,
        OPACITY: !prefersReducedMotion ? 1 : 0,
      },
    }),
    [isTallScreen, isVeryTallScreen, prefersReducedMotion]
  );
};

export const HERO = () => {
  return useMemo(
    () => ({
      EASING: "power2.out",

      LOAD: {
        TITLE: {
          SCALE: {
            START: 1.4,
            END: 1,
          },
          DURATION: 3,
          INITIAL_BLUR: 7,
          SCROLLTRIGGER_START_DELAY: 50,
          INITIAL_DELAY: 2.4,
        },

        GRID: {
          CELL_BLUR: {
            START: "9px",
            END: "0px",
          },
          INITIAL_DELAY: 1.93,
          CELL_DURATION: 3.1,
          CELL_STAGGER: 0.07,
          IMG_EXTRA_STAGGER: 0.084,
        },
      },

      SCROLL: {
        TITLE: {
          PARALLAX_END: -80,
          SCRUB: 1,
          END_TRIGGER: "+=100%",
          ONCE: false, // Override
        },

        GRID: {
          ONCE: false, // Override
        },
      },
    }),
    []
  );
};

export const ABOUT = () => {
  const BASE = BaseConstants();
  const { isTallScreen, isVeryTallScreen } = useInterface();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isVeryTallScreen ? 2.25 : isTallScreen ? 2.55 : 3.45,
      },

      SCROLL: {
        AUTOALPHA: {
          START: 0.16,
        },
        STAGGER: BASE.STAGGER_INTERVAL * 1.7,
        DURATION: BASE.ANIMATION_DURATION,
        ONCE: BASE.SCROLLTRIGGER_ONCE,

        BLUR: {
          START: "1.5px",
          //START: "0px", // Safari bug
          END: "0px",
        },

        COLOR: {
          START: BASE.TEXT_INACTIVE_COLOR,
          END: "#0F1010",
        },
      },
    }),
    [BASE, isTallScreen, isVeryTallScreen]
  );
};

export const CLIENTS = () => {
  const BASE = BaseConstants();
  const { isTallScreen, isVeryTallScreen } = useInterface();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isVeryTallScreen ? 2.48 : isTallScreen ? 2.84 : 3.49,
      },

      SCROLL: {
        STAGGER: isTallScreen ? 0.16 : BASE.STAGGER_INTERVAL * 1.2,
        DURATION: BASE.ANIMATION_DURATION,
        AUTOALPHA: {
          START: 0.16,
        },
        BLUR: {
          START: "4.5px",
          END: "0px",
        },
        COLOR: {
          START: BASE.TEXT_INACTIVE_COLOR,
          END: "#0F1010",
        },
        ONCE: BASE.SCROLLTRIGGER_ONCE,
        TRIGGER: {
          START: "bottom bottom",
          END: "bottom bottom-=25",
        },
      },
    }),
    [BASE, isTallScreen, isVeryTallScreen]
  );
};

export const WORK = () => {
  const BASE = BaseConstants();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: 3.5,
      },

      SCROLL: {
        TEXT: {
          DURATION: BASE.ANIMATION_DURATION + 0.1,
          BLUR: {
            START: "1.5px",
            END: "0px",
          },
          OPACITY: {
            START: 0.16,
          },
          TRIGGER: {
            START: "top bottom-=5",
          },
          ONCE: BASE.SCROLLTRIGGER_ONCE,
        },

        CONTAINER: {
          TRIGGER: {
            START: "top 85%",
          },
          ONCE: false, // override
        },

        PARALLAX: {
          Y_PERCENT: {
            START: 9,
            END: 0,
          },
          SCRUB: 1,
          TRIGGER: {
            START: "top bottom",
            END_OFFSET_MULTIPLIER: 18, // Will be multiplied by lineHeight
          },
        },
      },
    }),
    [BASE]
  );
};

export const FOOTER = () => {
  const BASE = BaseConstants();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: 3.5,
      },

      SCROLL: {
        DURATION: BASE.ANIMATION_DURATION,
        STAGGER: BASE.STAGGER_INTERVAL,
        STAGGER_MOBILE_OFFSET: -0.02,
        OPACITY: {
          START: 0.16,
        },
        BLUR: {
          START: "2.5px",
          //START: "0px", // Safari bug
          END: "0px",
        },
        COLOR: {
          START: BASE.TEXT_INACTIVE_COLOR,
          END: "#0F1010",
        },
        TRIGGER: {
          START: "top bottom-=50",
        },
        ONCE: BASE.SCROLLTRIGGER_ONCE,
      },
    }),
    [BASE]
  );
};

export const SCROLLBAR = () => {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      LOAD: {
        INITIAL: {
          Y: !prefersReducedMotion ? -100 : 0,
          OPACITY: !prefersReducedMotion ? 0 : 1,
          BLUR: !prefersReducedMotion ? 1.5 : 0,
        },
        FINAL: {
          Y: 0,
          OPACITY: 1,
          BLUR: 0,
        },
      },
    }),
    [prefersReducedMotion]
  );
};

export const MAGNETIC = () => {
  return useMemo(
    () => ({
      SCALE: {
        IMAGE: 1.041,
        MEDIUM_TEXT: 1.032,
        SMALL_TEXT: 1.054,
        MIN: 0.95,
      },
      MOVEMENT: {
        IMAGE: 0.05,
        MEDIUM_TEXT: 0.1,
        SMALL_TEXT: 0.125,
      },
      ANIMATION: {
        DURATION: 0.65,
        EASING: "power1.out",
      },
    }),
    []
  );
};

export const CHANGE_TEXT = () => {
  const BASE = BaseConstants();
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      ENTER: {
        DURATION: !prefersReducedMotion ? BASE.ANIMATION_DURATION - 0.1 : 0.1,
        EASING: BASE.ANIMATION_EASING,
        DELAY: -0.0125,
      },

      EXIT: {
        DURATION: !prefersReducedMotion ? 0.5 : 0.1,
        EASING: "power1.in",
      },

      STYLES: {
        BLUR: {
          ACTIVE: "0px",
          INACTIVE: "1.5px",
        },
        COLOR: {
          ACTIVE: "#0F1010",
          //INACTIVE: BASE.TEXT_INACTIVE_COLOR,
          INACTIVE: "#0F1010",
        },
        AUTOALPHA: {
          ACTIVE: 1,
          INACTIVE: 0,
        },
      },
    }),
    [BASE, prefersReducedMotion]
  );
};

export const SLIDESHOW = () => {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      //return {
      ENTER: {
        DURATION: !prefersReducedMotion ? 3 : 0.35,
        EASING: "power2.out",
        //DELAY: -0.0125,
        DELAY: 0,
        SCALE: !prefersReducedMotion ? 1.04 : 1.005,
      },
      EXIT: {
        DURATION: !prefersReducedMotion ? 0.5 : 0.2,
        EASING: "power1.in",
        SCALE: 1.005,
      },
    }),
    [prefersReducedMotion]
  );
  //};
};

export const CONTACT = () => {
  const BASE = BaseConstants();
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      OPEN: {
        CONTAINER: {
          DURATION: !prefersReducedMotion ? 1.35 : 0.1,
          EASING: BASE.ANIMATION_EASING,
        },
        CONTENT: {
          DURATION: !prefersReducedMotion ? BASE.ANIMATION_DURATION : 0.2,
          DELAY: !prefersReducedMotion ? 0.3 : 0,
          EASING: BASE.ANIMATION_EASING,
        },
      },

      CLOSE: {
        CONTAINER: {
          DURATION: !prefersReducedMotion ? 1.1 : 0.1,
          DELAY: 0.15,
          EASING: BASE.ANIMATION_EASING,
        },
        CONTENT: {
          DURATION: !prefersReducedMotion ? 0.6 : 0.2,
          EASING: "power1.in",
        },
      },

      STYLES: {
        BLUR: {
          ACTIVE: "0px",
          INACTIVE: "3px",
        },
        COLOR: {
          ACTIVE: "#0F1010",
          INACTIVE: "red",
        },
      },
    }),
    [BASE, prefersReducedMotion]
  );
};
