import { createContext, useContext, useState, useCallback } from "react";
import { SITE_IMAGES, SITE_VIDEOS } from "@/constants/media";

const allMedia = [...SITE_IMAGES, ...SITE_VIDEOS];

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [preloaderState, setPreloaderState] = useState({
    isOnloadLinesActive: true, // controls transition lines animation state
    loadProgress: 0, // tracks loading progress percentage
    startPageAnimation: false, // indicates when to start the page transition animation
    noLines: false, // remove lines after onload animation is complete
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

  const removeLines = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      noLines: true,
    }));
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        ...preloaderState,
        updateProgress,
        completeTransition,
        removeLines,
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
