import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const DimensionsContext = createContext(null);

export function DimensionsProvider({ children }) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
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
