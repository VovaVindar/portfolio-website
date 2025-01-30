import {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  createContext,
  useMemo,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";
import { useStart } from "@/context/PreloaderContext";
import { useScrollPreservation } from "@/hooks/transition/useScrollPreservation";
import { useRouteTracking } from "@/hooks/transition/useRouteTracking";
import { usePageTransitions } from "@/hooks/transition/usePageTransitions";
import { useConsoleMessage } from "@/hooks/core/useConsoleMessage";
import dynamic from "next/dynamic";
const SecondaryWrapper = dynamic(
  () => import("@/components/Global/SecondaryWrapper"),
  { ssr: false }
);
const SmoothScrolling = dynamic(
  () => import("@/components/Global/SmoothScrolling"),
  { ssr: false }
);

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

// Layout Component
const VALID_ROUTES = new Set([
  // Valid routes to show memes
  "/",
  "/privacy-policy",
]);

export function TransitionLayout({ children }) {
  const [homeChildren, setHomeChildren] = useState(null);
  const [secondaryChildren, setSecondaryChildren] = useState(null);
  const [notFoundChildren, setNotFoundChildren] = useState(null);
  const router = useRouter();

  const { setIsPageChanged, isPageMounted, setIsPageMounted } = useTransition();

  // DOM manipulation logic
  const { transitionFromHome, transitionToHome } = usePageTransitions(
    setHomeChildren,
    setSecondaryChildren
  );

  // Route tracking
  const { previousRoute, setPreviousRoute } = useRouteTracking(router);

  // Homepage scroll preservation
  useScrollPreservation(router);

  // Show memes in console
  // Only initialize with current route if it's valid
  const [visitedRoutes] = useState(() =>
    VALID_ROUTES.has(children.key) ? new Set([children.key]) : new Set()
  );

  const { showNewMeme } = useConsoleMessage(VALID_ROUTES.has(children.key));

  useLayoutEffect(() => {
    if (!isPageMounted) {
      // Set initial children on load
      if (children.key === "/") {
        setHomeChildren(children);
      } else if (children.key === "/404") {
        setNotFoundChildren(children);
      } else {
        setSecondaryChildren(children);
      }

      if (VALID_ROUTES.has(children.key)) {
        showNewMeme();
        setIsPageMounted(true);
      }
    }

    if (
      previousRoute &&
      previousRoute !== children.key &&
      children.key !== "/404" &&
      previousRoute !== "/404"
    ) {
      setIsPageChanged(true);

      // Only show meme and update visited routes if the route is valid
      /*if (VALID_ROUTES.has(children.key) && !visitedRoutes.has(children.key)) {
        showNewMeme();
        setVisitedRoutes((prev) => new Set([...prev, children.key]));
      }*/

      if (children.key === "/") {
        transitionToHome(homeChildren ? undefined : children);
      } else {
        transitionFromHome(children);
      }

      setPreviousRoute(children.key);
    }
  }, [
    children,
    previousRoute,
    transitionToHome,
    transitionFromHome,
    homeChildren,
    isPageMounted,
    setIsPageChanged,
    setIsPageMounted,
    setPreviousRoute,
    showNewMeme,
    visitedRoutes,
  ]);

  return (
    // Add region for live announcements of page transitions
    <>
      <div className="sr-only" role="status" aria-live="polite">
        {router.pathname === "/"
          ? "Opened home page"
          : `Navigated to ${router.pathname}`}
      </div>

      {!homeChildren && notFoundChildren}
      {homeChildren && <SmoothScrolling>{homeChildren}</SmoothScrolling>}
      {secondaryChildren && (
        <SecondaryWrapper>{secondaryChildren}</SecondaryWrapper>
      )}
    </>
  );
}
