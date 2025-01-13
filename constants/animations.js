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
      PARALLAX_END: -80, // percentage
      SCRUB: 1,
      END_TRIGGER: "+=100%",
    },

    GRID: {
      // Any future scroll animations for grid
    },
  },
};
