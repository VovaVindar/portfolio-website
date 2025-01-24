import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { SITE_IMAGES, SITE_VIDEOS } from "@/constants/media";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";

// Track which sizes have been loaded
const loadedSizesRef = {
  300: false,
  400: false,
  650: false,
  1260: false,
  1880: false,
};

const getMediaForScreenSize = (width) => {
  const filterBySize = (media, sizes) => {
    return media.filter((path) =>
      sizes.some((size) => path.includes(`/${size}/`))
    );
  };

  if (width < 420) {
    return [
      ...filterBySize(SITE_IMAGES, ["300", "1260"]),
      ...filterBySize(SITE_VIDEOS, ["300", "1260"]),
    ];
  } else if (width < 1520) {
    return [
      ...filterBySize(SITE_IMAGES, ["400", "1260"]),
      ...filterBySize(SITE_VIDEOS, ["400", "1260"]),
    ];
  } else {
    return [
      ...filterBySize(SITE_IMAGES, ["650", "1880"]),
      ...filterBySize(SITE_VIDEOS, ["650", "1880"]),
    ];
  }
};

const getSizesForWidth = (width) => {
  if (width < 420) return ["300", "1260"];
  if (width < 1520) return ["400", "1260"];
  return ["650", "1880"];
};

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const { width } = useWindowDimensions();
  const [preloaderState, setPreloaderState] = useState({
    isOnloadLinesActive: true,
    loadProgress: 0,
    startPageAnimation: false,
    isTallScreen: false,
    isVeryTallScreen: false,
    isStartedLines: false,
    incrementCap: 15,
    interval: 206,
  });

  const actualProgressRef = useRef(0);
  const isLoadingInitiatedRef = useRef(false);
  const previousWidthRef = useRef(width);

  const loadFile = useCallback((src) => {
    return new Promise((resolve) => {
      if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn("Failed to load image:", src);
          resolve();
        };
        img.src = src;
      } else {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => resolve();
        video.onerror = () => {
          console.warn("Failed to load video:", src);
          resolve();
        };
        video.src = src;
      }
    });
  }, []);

  const loadNewSizes = useCallback(async () => {
    const requiredSizes = getSizesForWidth(width);
    const unloadedSizes = requiredSizes.filter((size) => !loadedSizesRef[size]);

    if (unloadedSizes.length === 0) return;

    const newMedia = getMediaForScreenSize(width).filter((path) =>
      unloadedSizes.some((size) => path.includes(`/${size}/`))
    );

    try {
      const loadingPromises = newMedia.map((src) => loadFile(src));
      await Promise.all(loadingPromises);

      // Mark these sizes as loaded
      unloadedSizes.forEach((size) => {
        loadedSizesRef[size] = true;
      });
    } catch (error) {
      console.error("Error loading new sizes:", error);
    }
  }, [width, loadFile]);

  // Initial load
  const initiateLoading = useCallback(async () => {
    if (isLoadingInitiatedRef.current) return;
    isLoadingInitiatedRef.current = true;

    const mediaToLoad = getMediaForScreenSize(width);
    const totalFiles = mediaToLoad.length;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      actualProgressRef.current = (loadedCount / totalFiles) * 100;
    };

    try {
      const loadingPromises = mediaToLoad.map(async (src) => {
        await loadFile(src);
        updateProgress();
      });

      await Promise.all(loadingPromises);

      // Mark initial sizes as loaded
      getSizesForWidth(width).forEach((size) => {
        loadedSizesRef[size] = true;
      });

      actualProgressRef.current = 100;
    } catch (error) {
      console.error("Error loading files:", error);
    }
  }, [width, loadFile]);

  // Watch for width changes that cross thresholds
  useEffect(() => {
    const prevWidth = previousWidthRef.current;
    const thresholds = [420, 1520];

    const crossedThreshold = thresholds.some(
      (threshold) =>
        (prevWidth < threshold && width >= threshold) ||
        (prevWidth >= threshold && width < threshold)
    );

    if (crossedThreshold) {
      loadNewSizes();
    }

    previousWidthRef.current = width;
  }, [width, loadNewSizes]);

  // Progress update effect
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

        timeoutId = setTimeout(updateProgress, preloaderState.interval);
      }
    }

    timeoutId = setTimeout(updateProgress, preloaderState.interval);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [preloaderState.incrementCap, preloaderState.interval]);

  const completeTransition = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      isOnloadLinesActive: false,
    }));
  }, []);

  const startedLines = useCallback(() => {
    setPreloaderState((prev) => ({
      ...prev,
      isStartedLines: true,
    }));
  }, []);

  const setTallScreen = useCallback((lines) => {
    setPreloaderState((prev) => ({
      ...prev,
      isTallScreen: lines > 60,
      isVeryTallScreen: lines >= 100,
    }));
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        ...preloaderState,
        initiateLoading,
        completeTransition,
        setTallScreen,
        startedLines,
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
