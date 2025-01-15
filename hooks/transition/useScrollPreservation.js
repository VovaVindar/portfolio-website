import { useEffect, useRef } from "react";

export const useScrollPreservation = (router) => {
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleBeforePopState = () => {
      scrollPosRef.current = window.scrollY;
      return true;
    };

    const handleRouteChangeStart = () => {
      scrollPosRef.current = window.scrollY;
    };

    const handleRouteChangeComplete = () => {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosRef.current);
      });
    };

    router.beforePopState(handleBeforePopState);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
};
