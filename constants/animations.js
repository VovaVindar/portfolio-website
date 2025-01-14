const STAGGER_INTERVAL = 0.11;
const ANIMATION_DURATION = 0.75;
const ANIMATION_EASING = "power1.in"; // Easing for: text fade in
const SCROLLTRIGGER_ONCE = true;

export const PRELOADER = {
  LOADING: {
    INTERVAL: 206,
    INCREMENT_CAP: 15,
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
    DURATION: 1.49,
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
};

export const LINES = {
  MAX_DURATION: 3,

  COLORS: {
    START: "#0F1010",
    END: "#C34356",
  },

  TRANSITION: {
    DURATION: 1.25,
    DELAY: 0.71,
    EASING: "power4.inOut",
    COMPLETION_DELAY: 770,
    STAGGER: {
      HIGH_DENSITY: 0.0002, // for screens with > 60 lines
      NORMAL: 0.038,
    },
  },
};

export const HERO = {
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
};

export const ABOUT = {
  EASING: ANIMATION_EASING,

  LOAD: {
    START_DELAY: 3400,
  },

  SCROLL: {
    STAGGER: STAGGER_INTERVAL,
    DURATION: ANIMATION_DURATION,
    ONCE: SCROLLTRIGGER_ONCE,
    //ONCE: false,
    BLUR: {
      START: "2px",
      END: "0px",
    },
    COLOR: {
      START: "red",
      END: "#0F1010",
    },
  },
};

export const CLIENTS = {
  EASING: ANIMATION_EASING,

  LOAD: {
    START_DELAY: 3840,
  },

  SCROLL: {
    STAGGER: STAGGER_INTERVAL,
    DURATION: ANIMATION_DURATION,
    BLUR: {
      START: "4px",
      END: "0px",
    },
    COLOR: {
      START: "red",
      END: "#0F1010",
    },
    ONCE: SCROLLTRIGGER_ONCE,
    TRIGGER: {
      START: "top 100%",
      END: "bottom+=100px top",
    },
  },
};

export const WORK = {
  EASING: ANIMATION_EASING,

  LOAD: {
    START_DELAY: 4800,
  },

  SCROLL: {
    TEXT: {
      DURATION: ANIMATION_DURATION + 0.1,
      BLUR: {
        START: "4.5px",
        END: "0px",
      },
      TRIGGER: {
        START: "100% 100%",
      },
      ONCE: SCROLLTRIGGER_ONCE,
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
};

export const FOOTER = {
  EASING: ANIMATION_EASING,

  LOAD: {
    START_DELAY: 5300,
  },

  SCROLL: {
    DURATION: ANIMATION_DURATION,
    STAGGER: STAGGER_INTERVAL,
    STAGGER_MOBILE_OFFSET: -0.02,
    BLUR: {
      START: "2px",
      END: "0px",
    },
    COLOR: {
      START: "red",
      END: "#0F1010",
    },
    TRIGGER: {
      START: "top 100%",
    },
    ONCE: SCROLLTRIGGER_ONCE,
  },
};

export const CONTACT = {
  OPEN: {
    CONTAINER: {
      DURATION: ANIMATION_DURATION - 0.1,
      EASING: "power1.inOut",
    },
    CONTENT: {
      DURATION: ANIMATION_DURATION,
      DELAY: 0.35,
      EASING: "power1.out",
    },
  },

  CLOSE: {
    CONTAINER: {
      DURATION: ANIMATION_DURATION - 0.1,
      DELAY: 0.4,
      EASING: "power1.inOut",
    },
    CONTENT: {
      DURATION: ANIMATION_DURATION - 0.2,
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
};

export const SCROLLBAR = {
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
};
