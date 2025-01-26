import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Router } from "next/router";

const DimensionsContext = createContext(null);

export function DimensionsProvider({ children }) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scrollHeight:
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight
        : 0,
  });

  const updateDimensions = useCallback(() => {
    setTimeout(() => {
      setDimensions(
        {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
        },
        100
      );
    });
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeComplete", updateDimensions);
    window.addEventListener("resize", updateDimensions);

    // Wait for document load
    if (document.readyState === "complete") {
      updateDimensions();
    } else {
      window.addEventListener("load", updateDimensions);
    }

    return () => {
      Router.events.off("routeChangeComplete", updateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <DimensionsContext.Provider value={{ ...dimensions }}>
      {children}
    </DimensionsContext.Provider>
  );
}

export const useWindowDimensions = () => {
  const dimensions = useContext(DimensionsContext);
  if (!dimensions) {
    throw new Error(
      "useWindowDimensions must be used within a DimensionsProvider"
    );
  }
  return dimensions;
};
