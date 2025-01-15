import { useState, useContext, useEffect, createContext, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useScrollPreservation } from "@/hooks/transition/useScrollPreservation";
import { useRouteTracking } from "@/hooks/transition/useRouteTracking";
import { usePageTransitions } from "@/hooks/transition/usePageTransitions";

// Create Context
export const TransitionContext = createContext({});

// Provider Component
export const TransitionProvider = ({ children }) => {
  const [secondaryExit, setSecondaryExit] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [secondaryEnter, setSecondaryEnter] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [isPageChanging, setIsPageChanging] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        secondaryExit,
        setSecondaryExit,
        secondaryEnter,
        setSecondaryEnter,
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
  const [displayChildren, setDisplayChildren] = useState(children);
  const [overlayChildren, setOverlayChildren] = useState(null);
  const router = useRouter();

  const { transitionFromHome, transitionToHome, setIsPageChanging } =
    usePageTransitions(setOverlayChildren);

  const { previousRoute, setPreviousRoute } = useRouteTracking(router);
  useScrollPreservation(router);

  useEffect(() => {
    if (previousRoute !== children.key) {
      setIsPageChanging(true);

      if (children.key === "/") {
        transitionToHome();
      } else {
        transitionFromHome(children);
      }

      setPreviousRoute(children.key);
    }
  }, [children, previousRoute, transitionToHome, transitionFromHome]);

  return (
    <>
      {displayChildren}
      {overlayChildren && (
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}>
          {overlayChildren}
        </div>
      )}
    </>
  );
}
