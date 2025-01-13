import { createContext, useContext, useState, useCallback } from "react";

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [preloaderState, setPreloaderState] = useState({
    isOnloadLinesActive: true, // controls transition lines animation state
    loadProgress: 0, // tracks loading progress percentage
    startPageAnimation: false, // indicates when to start the page transition animation
  });

  const updateProgress = useCallback((progress) => {
    setPreloaderState((prev) => ({
      ...prev,
      loadProgress: progress,
      startPageAnimation: progress >= 100,
    }));
  }, []);

  const completeTransition = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      isOnloadLinesActive: false,
    }));
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        ...preloaderState,
        updateProgress,
        completeTransition,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
