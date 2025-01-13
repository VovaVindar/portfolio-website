import { useState, useEffect } from "react";
import { usePreloader } from "@/context/PreloaderContext";
import { useTransition } from "@/context/TransitionContext";
import { SCROLLBAR } from "@/constants/animations";

export const useScrollbarOnloadAnimations = () => {
  const { isOnloadLinesActive } = usePreloader();
  const { isPageChanging } = useTransition();
  const [opacity, setOpacity] = useState(SCROLLBAR.LOAD.INITIAL.OPACITY);
  const [blur, setBlur] = useState(SCROLLBAR.LOAD.INITIAL.BLUR);
  const [y, setY] = useState(SCROLLBAR.LOAD.INITIAL.Y);
  const [transition, setTransition] = useState(null);

  useEffect(() => {
    if (isPageChanging) {
      // Remove transition when page is changing
      setTransition("none");
      setOpacity(SCROLLBAR.LOAD.FINAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.FINAL.BLUR);
      setY(SCROLLBAR.LOAD.FINAL.Y);
    } else if (!isOnloadLinesActive) {
      setOpacity(SCROLLBAR.LOAD.FINAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.FINAL.BLUR);
      setY(SCROLLBAR.LOAD.FINAL.Y);
    } else {
      setOpacity(SCROLLBAR.LOAD.INITIAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.INITIAL.BLUR);
      setY(SCROLLBAR.LOAD.INITIAL.Y);
    }
  }, [isOnloadLinesActive, isPageChanging]);

  return { y, opacity, blur, transition };
};
