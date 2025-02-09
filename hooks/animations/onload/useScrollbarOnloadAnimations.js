import { useState, useLayoutEffect } from "react";
import { useLinesStatus } from "@/context/PreloaderContext";
import { SCROLLBAR as getScrollbar } from "@/config/animations";

export const useScrollbarOnloadAnimations = () => {
  const SCROLLBAR = getScrollbar();

  const [scrollbarState, setScrollbarState] = useState({
    opacity: SCROLLBAR.LOAD.INITIAL.OPACITY,
    blur: SCROLLBAR.LOAD.INITIAL.BLUR,
    y: SCROLLBAR.LOAD.INITIAL.Y,
  });

  const { isOnloadLinesActive } = useLinesStatus();

  useLayoutEffect(() => {
    setScrollbarState(
      isOnloadLinesActive
        ? {
            opacity: SCROLLBAR.LOAD.INITIAL.OPACITY,
            blur: SCROLLBAR.LOAD.INITIAL.BLUR,
            y: SCROLLBAR.LOAD.INITIAL.Y,
          }
        : {
            opacity: SCROLLBAR.LOAD.FINAL.OPACITY,
            blur: SCROLLBAR.LOAD.FINAL.BLUR,
            y: SCROLLBAR.LOAD.FINAL.Y,
          }
    );
  }, [isOnloadLinesActive, SCROLLBAR]);

  return scrollbarState;
};
