import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Hooks imports
import { useTransition } from "@/context/TransitionContext";
import { useScrollPreservation } from "@/hooks/navigation/useScrollPreservation";
import { useRouteTracking } from "@/hooks/navigation/useRouteTracking";
import { usePageTransitions } from "@/hooks/navigation/usePageTransitions";
import { useConsoleMessage } from "@/hooks/core/useConsoleMessage";

// Dynamic imports for components that use browser APIs
const SecondaryWrapper = dynamic(
  () => import("@/components/Global/SecondaryWrapper"),
  { ssr: false }
);
const SmoothScrolling = dynamic(
  () => import("@/components/Global/SmoothScrolling"),
  { ssr: false }
);

// Valid routes to show memes
const VALID_ROUTES = new Set(["/", "/privacy-policy"]);

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
