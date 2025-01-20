import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { SITE_IMAGES, SITE_VIDEOS } from "@/constants/media";

const allMedia = [...SITE_IMAGES, ...SITE_VIDEOS];

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [preloaderState, setPreloaderState] = useState({
    isOnloadLinesActive: true, // set to 'false' when lines are completed
    loadProgress: 0,
    startPageAnimation: false, // sets to 'true' when loadProgress == 100
    isTallScreen: false, // sets to 'true' if >60 onload lines
    incrementCap: 15,
    interval: 206,
  });

  const actualProgressRef = useRef(0);
  const isLoadingInitiatedRef = useRef(false);

  // Effect to handle progress updates
  useEffect(() => {
    let currentProgress = 0;
    let timeoutId = null;

    function updateProgress() {
      if (currentProgress < actualProgressRef.current) {
        const increment = Math.min(
          actualProgressRef.current - currentProgress,
          preloaderState.incrementCap
        );
        currentProgress += increment;

        setPreloaderState((prev) => ({
          ...prev,
          loadProgress: currentProgress.toFixed(0),
          startPageAnimation: currentProgress >= 100,
        }));

        // Schedule next update
        timeoutId = setTimeout(updateProgress, preloaderState.interval);
      }
    }

    // Start progress updates
    timeoutId = setTimeout(updateProgress, preloaderState.interval);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [preloaderState.incrementCap, preloaderState.interval]);

  const initiateLoading = useCallback(async () => {
    if (isLoadingInitiatedRef.current) {
      return;
    }

    isLoadingInitiatedRef.current = true;
    const totalFiles = allMedia.length;

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      actualProgressRef.current = (loadedCount / totalFiles) * 100;
    };

    const loadFile = (src) => {
      return new Promise((resolve) => {
        if (src.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            console.warn("Failed to load image:", src);
            updateProgress();
            resolve();
          };
          img.src = src;
        } else {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.onloadedmetadata = () => {
            updateProgress();
            resolve();
          };
          video.onerror = () => {
            console.warn("Failed to load video:", src);
            updateProgress();
            resolve();
          };
          video.src = src;
        }
      });
    };

    try {
      const loadingPromises = allMedia.map((src) => loadFile(src));
      await Promise.all(loadingPromises);
      actualProgressRef.current = 100;
    } catch (error) {
      console.error("Error loading files:", error);
    }
  }, []);

  const completeTransition = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      isOnloadLinesActive: false,
    }));
  }, []);

  const setTallScreen = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      isTallScreen: true,
    }));
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        ...preloaderState,
        initiateLoading,
        completeTransition,
        setTallScreen,
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
