import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
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

  // Split state into logical groups
  const [loadingState, setLoadingState] = useState({
    loadProgress: 0,
    startPageAnimation: false,
    incrementCap: 15,
    interval: 206,
  });

  const [interfaceState, setInterfaceState] = useState({
    isOnloadLinesActive: true,
    isTallScreen: false,
    isVeryTallScreen: false,
    isStartedLines: false,
  });

  const actualProgressRef = useRef(0);
  const isLoadingInitiatedRef = useRef(false);
  const previousWidthRef = useRef(width);

  const loadFile = useCallback((src) => {
    return new Promise((resolve, reject) => {
      if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
        const img = new Image();
        const timeoutId = setTimeout(() => {
          reject(new Error(`Timeout loading image: ${src}`));
        }, 5000); // 5s timeout

        img.onload = () => {
          clearTimeout(timeoutId);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          console.warn("Failed to load image:", src);
          resolve(); // Still resolve to continue loading
        };
        img.src = src;
      } else {
        const video = document.createElement("video");
        const timeoutId = setTimeout(() => {
          reject(new Error(`Timeout loading video: ${src}`));
        }, 5000); // 5s timeout

        video.preload = "auto";
        video.onloadeddata = () => {
          clearTimeout(timeoutId);
          resolve();
        };
        video.onerror = () => {
          clearTimeout(timeoutId);
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

    try {
      const mediaToLoad = getMediaForScreenSize(width);
      const totalFiles = mediaToLoad.length;

      if (totalFiles === 0) {
        actualProgressRef.current = 100;
        return;
      }

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
    } catch (error) {
      console.error("Fatal error in initiateLoading:", error);
      actualProgressRef.current = 100; // Force completion on fatal error
    }
  }, [width, loadFile]);

  // Fallback timer
  useEffect(() => {
    if (loadingState.loadProgress > 0 && loadingState.loadProgress < 100) {
      const fallbackTimer = setTimeout(() => {
        console.warn("Forcing preloader completion after timeout");
        actualProgressRef.current = 100;
        setLoadingState((prev) => ({
          ...prev,
          loadProgress: "100",
          startPageAnimation: true,
        }));
      }, 10000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [loadingState.loadProgress]);

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
    // For unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.log("Unhandled promise rejection:", event);
    });

    let currentProgress = 0;
    let timeoutId = null;

    function updateProgress() {
      if (currentProgress < actualProgressRef.current) {
        const increment = Math.min(
          actualProgressRef.current - currentProgress,
          loadingState.incrementCap
        );
        currentProgress += increment;

        setLoadingState((prev) => ({
          ...prev,
          loadProgress: currentProgress.toFixed(0),
          startPageAnimation: currentProgress >= 100,
        }));

        timeoutId = setTimeout(updateProgress, loadingState.interval);
      } else if (actualProgressRef.current === 100 && currentProgress < 100) {
        setLoadingState((prev) => ({
          ...prev,
          loadProgress: "100",
          startPageAnimation: true,
        }));
      }
    }

    timeoutId = setTimeout(updateProgress, loadingState.interval);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loadingState.incrementCap, loadingState.interval]);

  const completeTransition = useCallback(() => {
    setInterfaceState((prev) => ({
      ...prev,
      isOnloadLinesActive: false,
    }));
  }, []);

  const startedLines = useCallback(() => {
    setInterfaceState((prev) => ({
      ...prev,
      isStartedLines: true,
    }));
  }, []);

  const setTallScreen = useCallback((lines) => {
    setInterfaceState((prev) => ({
      ...prev,
      isTallScreen: lines > 60,
      isVeryTallScreen: lines >= 100,
    }));
  }, []);

  // Split context value into separate memoized objects
  const loadingValue = useMemo(
    () => ({
      loadProgress: loadingState.loadProgress,
      startPageAnimation: loadingState.startPageAnimation,
      initiateLoading,
    }),
    [
      loadingState.loadProgress,
      loadingState.startPageAnimation,
      initiateLoading,
    ]
  );

  const interfaceValue = useMemo(
    () => ({
      isOnloadLinesActive: interfaceState.isOnloadLinesActive,
      isTallScreen: interfaceState.isTallScreen,
      isVeryTallScreen: interfaceState.isVeryTallScreen,
      isStartedLines: interfaceState.isStartedLines,
      completeTransition,
      setTallScreen,
      startedLines,
    }),
    [
      interfaceState.isOnloadLinesActive,
      interfaceState.isTallScreen,
      interfaceState.isVeryTallScreen,
      interfaceState.isStartedLines,
      completeTransition,
      setTallScreen,
      startedLines,
    ]
  );

  const value = useMemo(
    () => ({
      ...loadingValue,
      ...interfaceValue,
    }),
    [loadingValue, interfaceValue]
  );

  return (
    <PreloaderContext.Provider value={value}>
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
