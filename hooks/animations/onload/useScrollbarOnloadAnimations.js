import { useState, useEffect } from "react";
import { usePreloader } from "@/context/PreloaderContext";
import { SCROLLBAR } from "@/constants/animations";

export const useScrollbarOnloadAnimations = () => {
  const { isTransitionLinesActive } = usePreloader();
  const [opacity, setOpacity] = useState(SCROLLBAR.LOAD.INITIAL.OPACITY);
  const [blur, setBlur] = useState(SCROLLBAR.LOAD.INITIAL.BLUR);
  const [y, setY] = useState(SCROLLBAR.LOAD.INITIAL.Y);

  useEffect(() => {
    if (!isTransitionLinesActive) {
      setOpacity(SCROLLBAR.LOAD.FINAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.FINAL.BLUR);
      setY(SCROLLBAR.LOAD.FINAL.Y);
    } else {
      setOpacity(SCROLLBAR.LOAD.INITIAL.OPACITY);
      setBlur(SCROLLBAR.LOAD.INITIAL.BLUR);
      setY(SCROLLBAR.LOAD.INITIAL.Y);
    }
  }, [isTransitionLinesActive]);

  return { y, opacity, blur };
};
