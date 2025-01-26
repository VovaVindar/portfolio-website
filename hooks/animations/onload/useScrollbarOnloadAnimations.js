import { useState, useLayoutEffect } from "react";
import { useLinesStatus } from "@/context/PreloaderContext";
import { SCROLLBAR as getScrollbar } from "@/constants/animations";

export const useScrollbarOnloadAnimations = () => {
  const SCROLLBAR = getScrollbar();

  const { isOnloadLinesActive } = useLinesStatus();
  const [opacity, setOpacity] = useState(SCROLLBAR.LOAD.INITIAL.OPACITY);
  const [blur, setBlur] = useState(SCROLLBAR.LOAD.INITIAL.BLUR);
  const [y, setY] = useState(SCROLLBAR.LOAD.INITIAL.Y);

  useLayoutEffect(() => {
    if (!isOnloadLinesActive) {
      setOpacity(SCROLLBAR.LOAD.FINAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.FINAL.BLUR);
      setY(SCROLLBAR.LOAD.FINAL.Y);
    } else {
      setOpacity(SCROLLBAR.LOAD.INITIAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.INITIAL.BLUR);
      setY(SCROLLBAR.LOAD.INITIAL.Y);
    }
  }, [isOnloadLinesActive, SCROLLBAR]);

  return { y, opacity, blur };
};
