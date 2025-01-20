import { useMemo } from "react";
import { usePreloader } from "@/context/PreloaderContext";

const BaseConstants = () => {
  return useMemo(
    () => ({
      STAGGER_INTERVAL: 0.11,
      ANIMATION_DURATION: 0.75,
      ANIMATION_EASING: "power1.in", // Easing for: text fade in
      SCROLLTRIGGER_ONCE: true,
    }),
    []
  );
};

export const PRELOADER = () => {
  // usePreloader can't be used here
  const { isTallScreen, interval, incrementCap } = usePreloader();

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
        DURATION: isTallScreen ? 1.43 : 1.49,
        EASING: "power3.in",
        Y_OFFSET: 540,
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
    [isTallScreen, interval, incrementCap]
  );
};

export const LINES = () => {
  const { isTallScreen } = usePreloader();

  return useMemo(
    () => ({
      MAX_DURATION: 3,

      COLORS: {
        START: "#0F1010",
        END: "#C34356",
      },

      TRANSITION: {
        DURATION: 1.25,
        DELAY: isTallScreen ? 1 : 0.71,
        EASING: "power4.inOut",
        COMPLETION_DELAY: isTallScreen ? 150 : 770,
        STAGGER: isTallScreen ? 0.019 : 0.038,
      },
    }),
    [isTallScreen]
  );
};

export const HERO = () => {
  return useMemo(
    () => ({
      EASING: "power3.out",

      LOAD: {
        TITLE: {
          SCALE: {
            START: 1.4,
            END: 1,
          },
          DURATION_OFFSET: -0.14,
          INITIAL_BLUR: 4.5,
          SCROLLTRIGGER_START_DELAY: 50,
          INITIAL_DELAY: 2.7,
        },

        GRID: {
          INITIAL_DELAY: 2.03,
          CELL_DURATION: 3,
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
  const { isTallScreen } = usePreloader();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isTallScreen ? 2800 : 3400,
      },

      SCROLL: {
        STAGGER: BASE.STAGGER_INTERVAL,
        DURATION: BASE.ANIMATION_DURATION,
        ONCE: BASE.SCROLLTRIGGER_ONCE,

        BLUR: {
          START: "2px",
          END: "0px",
        },

        COLOR: {
          START: "red",
          END: "#0F1010",
        },
      },
    }),
    [BASE, isTallScreen]
  );
};

export const CLIENTS = () => {
  const BASE = BaseConstants();
  const { isTallScreen } = usePreloader();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: isTallScreen ? 3540 : 3840,
      },

      SCROLL: {
        STAGGER: isTallScreen ? 0.18 : BASE.STAGGER_INTERVAL,
        DURATION: BASE.ANIMATION_DURATION,
        BLUR: {
          START: "4px",
          END: "0px",
        },
        COLOR: {
          START: "red",
          END: "#0F1010",
        },
        ONCE: BASE.SCROLLTRIGGER_ONCE,
        TRIGGER: {
          START: "top 100%",
          END: "bottom+=100px top",
        },
      },
    }),
    [BASE, isTallScreen]
  );
};

export const WORK = () => {
  const BASE = BaseConstants();

  return useMemo(
    () => ({
      EASING: BASE.ANIMATION_EASING,

      LOAD: {
        START_DELAY: 4800,
      },

      SCROLL: {
        TEXT: {
          DURATION: BASE.ANIMATION_DURATION + 0.1,
          BLUR: {
            START: "4.5px",
            END: "0px",
          },
          TRIGGER: {
            START: "100% 100%",
          },
          ONCE: BASE.SCROLLTRIGGER_ONCE,
        },

        CONTAINER: {
          TRIGGER: {
            START: "top 80%",
          },
          ONCE: false,
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
        START_DELAY: 5300,
      },

      SCROLL: {
        DURATION: BASE.ANIMATION_DURATION,
        STAGGER: BASE.STAGGER_INTERVAL,
        STAGGER_MOBILE_OFFSET: -0.02,
        BLUR: {
          START: "1px",
          END: "0px",
        },
        COLOR: {
          START: "red",
          END: "#0F1010",
        },
        TRIGGER: {
          START: "top 100%",
        },
        ONCE: BASE.SCROLLTRIGGER_ONCE,
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
          DURATION: BASE.ANIMATION_DURATION - 0.1,
          EASING: "power1.inOut",
        },
        CONTENT: {
          DURATION: BASE.ANIMATION_DURATION,
          DELAY: 0.35,
          EASING: "power1.out",
        },
      },

      CLOSE: {
        CONTAINER: {
          DURATION: BASE.ANIMATION_DURATION - 0.1,
          DELAY: 0.4,
          EASING: "power1.inOut",
        },
        CONTENT: {
          DURATION: BASE.ANIMATION_DURATION - 0.2,
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
        DURATION: BASE.ANIMATION_DURATION,
        EASING: "power1.out",
      },

      EXIT: {
        DURATION: BASE.ANIMATION_DURATION - 0.2,
        EASING: "power1.in",
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
        AUTOALPHA: {
          ACTIVE: 1,
          INACTIVE: 0,
        },
      },
    }),
    [BASE]
  );
};
