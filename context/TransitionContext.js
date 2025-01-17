import { useState, useContext, useEffect, createContext, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";
import { usePreloader } from "@/context/PreloaderContext";
import { useScrollPreservation } from "@/hooks/transition/useScrollPreservation";
import { useRouteTracking } from "@/hooks/transition/useRouteTracking";
import { usePageTransitions } from "@/hooks/transition/usePageTransitions";

// Create Context
export const TransitionContext = createContext({});

// Provider Component
export const TransitionProvider = ({ children }) => {
  const [globalOnload, setGlobalOnload] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [secondaryExit, setSecondaryExit] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [secondaryEnter, setSecondaryEnter] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [isPageMounted, setIsPageMounted] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // Play onload when loading is 100
  const { startPageAnimation } = usePreloader();
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

  return (
    <TransitionContext.Provider
      value={{
        globalOnload,
        setGlobalOnload,
        secondaryExit,
        setSecondaryExit,
        secondaryEnter,
        setSecondaryEnter,
        isPageMounted,
        setIsPageMounted,
        isPageChanging,
        setIsPageChanging,
      }}
    >
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

// Layout Component
export function TransitionLayout({ children }) {
  const [homeChildren, setHomeChildren] = useState(null);
  const [secondaryChildren, setSecondaryChildren] = useState(null);
  const router = useRouter();

  const { setIsPageChanging, isPageMounted, setIsPageMounted } =
    useTransition();

  const { transitionFromHome, transitionToHome } = usePageTransitions(
    setHomeChildren,
    setSecondaryChildren
  );

  const { previousRoute, setPreviousRoute } = useRouteTracking(router);
  useScrollPreservation(router);

  useEffect(() => {
    if (!isPageMounted) {
      // Set initial children on load
      if (children.key === "/") {
        setHomeChildren(children);
      } else {
        setSecondaryChildren(children);
      }

      setIsPageMounted(true);
    }

    if (previousRoute !== children.key) {
      setIsPageChanging(true);

      if (children.key === "/") {
        transitionToHome(homeChildren ? undefined : children);
      } else {
        transitionFromHome(children);
      }

      setPreviousRoute(children.key);
    }
  }, [children, previousRoute, transitionToHome, transitionFromHome]);

  return (
    <>
      {homeChildren}
      {secondaryChildren && (
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}>
          {secondaryChildren}
        </div>
      )}
    </>
  );
}
