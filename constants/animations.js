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
