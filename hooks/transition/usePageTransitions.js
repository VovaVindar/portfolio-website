import { useContext } from "react";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";

export const usePageTransitions = (setOverlayChildren) => {
  const { contextSafe } = useGSAP();
  const { secondaryEnter, secondaryExit, setIsPageChanging } =
    useContext(TransitionContext);

  const transitionFromHome = contextSafe((children) => {
    setOverlayChildren(children);

    secondaryEnter.play().then(() => {
      secondaryEnter.pause().clear();
    });
  });

  const transitionToHome = contextSafe(() => {
    secondaryExit.play().then(() => {
      setOverlayChildren(null);
      secondaryExit.pause().clear();
    });
  });

  return {
    transitionFromHome,
    transitionToHome,
    setIsPageChanging,
  };
};
