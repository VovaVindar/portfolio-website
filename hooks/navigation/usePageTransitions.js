import { useContext } from "react";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";

export const usePageTransitions = (setHomeChildren, setSecondaryChildren) => {
  const { contextSafe } = useGSAP();
  const { secondaryEnter, secondaryExit } = useContext(TransitionContext);

  const transitionFromHome = contextSafe((children) => {
    setSecondaryChildren(children);

    secondaryEnter.play().then(() => {
      secondaryEnter.pause().clear();
    });
  });

  const transitionToHome = contextSafe((children) => {
    if (children !== undefined && children !== null) {
      setHomeChildren(children);
    }

    secondaryExit.play().then(() => {
      setSecondaryChildren(null);
      secondaryExit.pause().clear();
    });
  });

  return {
    transitionFromHome,
    transitionToHome,
  };
};
