import { createContext, useContext, useLayoutEffect, useState } from "react";

const ReducedMotionContext = createContext(null);

export function ReducedMotionProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export const useReducedMotion = () => {
  const context = useContext(ReducedMotionContext);
  if (context === null) {
    throw new Error(
      "useReducedMotion must be used within a ReducedMotionProvider"
    );
  }
  return context;
};
