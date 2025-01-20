import { useMemo } from "react";
import { usePreloader } from "@/context/PreloaderContext";

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
    usePreloader();

  return useMemo(
    () => ({
      LOADING: {
        INTERVAL: interval,
        INCREMENT_CAP: incrementCap,
      },

      FADE: {
        DURATION: 1.2,
        DELAY: 0.5,
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
          COMPLETE: "rgba(255, 0, 0, 0.9)",
        },
        OPACITY: {
          START: 0.4,
          LOADING: 1,
          COMPLETE: 0.85,
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
    [isTallScreen, interval, incrementCap, isVeryTallScreen]
  );
};

export const LINES = () => {
  const { isTallScreen, isVeryTallScreen } = usePreloader();

  return {
    COLORS: {
      START: "#0F1010",
      END: "#C34356",
    },

    TRANSITION: {
      DURATION: isVeryTallScreen ? 1.1 : isTallScreen ? 1.1 : 1.25,
      DELAY: isVeryTallScreen ? 0.95 : isTallScreen ? 0.95 : 0.71,
      EASING: "power4.inOut",
      COMPLETION_DELAY: isVeryTallScreen ? 150 : isTallScreen ? 150 : 780,
      STAGGER: isVeryTallScreen ? 0.019 : isTallScreen ? 0.024 : 0.037,
    },
  };
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
          INITIAL_DELAY: 2.5,
        },

        GRID: {
          CELL_BLUR: {
            START: "9px",
            END: "0px",
          },
          INITIAL_DELAY: 2.03,
          CELL_DURATION: 3.1,
          CELL_STAGGER: 0.07,
          IMG_EXTRA_STAGGER: 0.074,
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
  const { isTallScreen, isVeryTallScreen } = usePreloader();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isVeryTallScreen ? 2250 : isTallScreen ? 2550 : 3450,
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
  const { isTallScreen, isVeryTallScreen } = usePreloader();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isVeryTallScreen ? 2480 : isTallScreen ? 2840 : 3490,
      },

      SCROLL: {
        STAGGER: isTallScreen ? 0.16 : BASE.STAGGER_INTERVAL * 1.2,
        DURATION: BASE.ANIMATION_DURATION,
        AUTOALPHA: {
          START: 0.16,
        },
        BLUR: {
          START: "5px",
          END: "0px",
        },
        COLOR: {
          START: BASE.TEXT_INACTIVE_COLOR,
          END: "#0F1010",
        },
        ONCE: BASE.SCROLLTRIGGER_ONCE,
        TRIGGER: {
          START: "bottom bottom",
          END: "bottom bottom-=75",
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
        START_DELAY: 3500,
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
            START: "top bottom-=50",
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
            START: 10,
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
        START_DELAY: 3500,
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
  return useMemo(
    () => ({
      LOAD: {
        INITIAL: {
          Y: -100,
          OPACITY: 0,
          BLUR: 1.5,
        },
        FINAL: {
          Y: 0,
          OPACITY: 1,
          BLUR: 0,
        },
      },
    }),
    []
  );
};

export const MAGNETIC = () => {
  return useMemo(
    () => ({
      SCALE: {
        IMAGE: 1.04,
        MEDIUM_TEXT: 1.034,
        SMALL_TEXT: 1.054,
        MIN: 0.95,
      },
      MOVEMENT: {
        IMAGE: 0.06,
        MEDIUM_TEXT: 0.11,
        SMALL_TEXT: 0.125,
      },
      ANIMATION: {
        DURATION: 0.55,
        EASING: "power1.out",
      },
    }),
    []
  );
};

export const PROJECT_HOVER = () => {
  const BASE = BaseConstants();

  return useMemo(
    () => ({
      ENTER: {
        DURATION: BASE.ANIMATION_DURATION - 0.1,
        EASING: BASE.ANIMATION_EASING,
        DELAY: -0.025,
      },

      EXIT: {
        DURATION: 0.5,
        EASING: "power1.in",
      },

      STYLES: {
        BLUR: {
          ACTIVE: "0px",
          INACTIVE: "2px",
        },
        COLOR: {
          ACTIVE: "#0F1010",
          INACTIVE: BASE.TEXT_INACTIVE_COLOR,
        },
        AUTOALPHA: {
          ACTIVE: 1,
          INACTIVE: 0,
        },
      },
    }),
    [BASE]
  );
};

export const CONTACT = () => {
  const BASE = BaseConstants();

  return useMemo(
    () => ({
      OPEN: {
        CONTAINER: {
          DURATION: 1.35,
          EASING: BASE.ANIMATION_EASING,
        },
        CONTENT: {
          DURATION: BASE.ANIMATION_DURATION,
          DELAY: 0.3,
          EASING: BASE.ANIMATION_EASING,
        },
      },

      CLOSE: {
        CONTAINER: {
          DURATION: 1.1,
          DELAY: 0.15,
          EASING: BASE.ANIMATION_EASING,
        },
        CONTENT: {
          DURATION: 0.6,
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
    [BASE]
  );
};
