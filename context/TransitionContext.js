// Core imports
import { useState, useContext, useEffect, createContext, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Hooks imports
import { useStart } from "@/context/PreloaderContext";

// Create Context
export const TransitionContext = createContext({});

// Provider Component
export const TransitionProvider = ({ children }) => {
  const [globalOnload, setGlobalOnload] = useState(() =>
    gsap.timeline({ paused: true, smoothChildTiming: true })
  );
  const [secondaryExit, setSecondaryExit] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [secondaryEnter, setSecondaryEnter] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [isPageMounted, setIsPageMounted] = useState(false);
  const [isPageChanged, setIsPageChanged] = useState(false);

  // Play onload when loading is 100
  const { startPageAnimation } = useStart();
  const { contextSafe } = useGSAP();

  const playOnloadAnimation = contextSafe(() => {
    //add a dummy set() at a time of 10 that does nothing to nothing (basically a tween with no duration, target or vars)
    //globalOnload.set({}, {}, 10);
    globalOnload.play();
  });

  useEffect(() => {
    if (startPageAnimation && globalOnload) {
      playOnloadAnimation();
    }
  }, [startPageAnimation, globalOnload, playOnloadAnimation]);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      globalOnload,
      setGlobalOnload,
      secondaryExit,
      setSecondaryExit,
      secondaryEnter,
      setSecondaryEnter,
      isPageMounted,
      setIsPageMounted,
      isPageChanged,
      setIsPageChanged,
    }),
    [globalOnload, secondaryExit, secondaryEnter, isPageMounted, isPageChanged]
  );

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
};

// Hook
export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
