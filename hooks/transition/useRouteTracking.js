import { useState, useEffect } from "react";

export const useRouteTracking = (router) => {
  const [previousRoute, setPreviousRoute] = useState("/");

  useEffect(() => {
    setPreviousRoute(router.route);
  }, [router.route]);

  return {
    previousRoute,
    setPreviousRoute,
  };
};
