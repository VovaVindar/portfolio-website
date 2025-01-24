import { createContext, useContext, useState, useMemo } from "react";

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const value = useMemo(
    () => ({
      scrollPosition,
      setScrollPosition,
    }),
    [scrollPosition]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}
