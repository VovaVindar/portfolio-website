const STAGGER_INTERVAL = 0.11;
const ANIMATION_DURATION = 0.75;
const ANIMATION_EASING = "power1.in"; // Easing for: text fade in
const SCROLLTRIGGER_ONCE = true;

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
      SCROLLTRIGGER_START_DELAY: 300,
    },

    GRID: {
      INITIAL_DELAY: 1.72,
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
    START_DELAY: 2000,
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
    START_DELAY: 3100,
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
    START_DELAY: 2000,
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
    START_DELAY: 2250,
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
