import { useState, useLayoutEffect } from "react";

export const useRouteTracking = (router) => {
  const [previousRoute, setPreviousRoute] = useState(null);

  useLayoutEffect(() => {
    setPreviousRoute(router.route);
  }, [router.route]);

  return {
    previousRoute,
    setPreviousRoute,
  };
};
