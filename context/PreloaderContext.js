import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { getMediaForScreenSize } from "@/hooks/core/useSiteMedia";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useReducedMotion } from "@/context/ReducedMotionContext";

// Create separate contexts for loading and interface states
const LoadingContext = createContext(null);
const StartContext = createContext(null);
const InterfaceContext = createContext(null);
const LinesStatusContext = createContext(null);
const StartedLinesContext = createContext(null);

// Track which sizes have been loaded
const loadedSizesRef = {
  300: false,
  400: false,
  650: false,
  1260: false,
  1880: false,
};

const getSizesForWidth = (width) => {
  if (width < 420) return ["300", "1260"];
  if (width < 1520) return ["400", "1260"];
  return ["650", "1880"];
};

// Functions
const loadFile = (src) => {
  return new Promise((resolve) => {
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        console.warn(`Timeout loading image: ${src}`);
        resolve();
      }, 5000);

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve();
      };
      img.onerror = () => {
        clearTimeout(timeoutId);
        console.warn("Failed to load image:", src);
        resolve();
      };
      img.src = src;
    } else {
      const video = document.createElement("video");
      const timeoutId = setTimeout(() => {
        console.warn(`Timeout loading video: ${src}`);
        resolve();
      }, 15000);

      window._preloadedVideos = window._preloadedVideos || new Map();

      video.addEventListener("canplay", () => {
        clearTimeout(timeoutId);
        window._preloadedVideos.set(src, video);
        resolve();
      });

      video.onerror = () => {
        clearTimeout(timeoutId);
        console.warn("Failed to load video:", src);
        resolve();
      };

      video.preload = "auto";
      video.muted = true;
      video.src = src;
      video.load();
    }
  });
};

const loadNewSizes = async (width) => {
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
};

const initiateLoading = async (width, progressCallback) => {
  try {
    const mediaToLoad = getMediaForScreenSize(width);

    const images = mediaToLoad.filter((src) =>
      src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)
    );
    const videos = mediaToLoad.filter(
      (src) => !src.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)
    );

    const IMAGE_WEIGHT = 0.1;
    const VIDEO_WEIGHT = 0.8;

    const imageIncrement = (IMAGE_WEIGHT * 100) / images.length;
    const videoIncrement = (VIDEO_WEIGHT * 100) / videos.length;

    let loadedCount = 0;

    try {
      const imagePromises = images.map(async (src) => {
        await loadFile(src);
        loadedCount += imageIncrement;
        progressCallback(Math.min(loadedCount, 100));
      });

      await Promise.all(imagePromises);

      const videoPromises = videos.map(async (src) => {
        await loadFile(src);
        loadedCount += videoIncrement;
        progressCallback(Math.min(loadedCount, 100));
      });

      await Promise.all(videoPromises);

      progressCallback(100);

      // Mark initial sizes as loaded
      getSizesForWidth(width).forEach((size) => {
        loadedSizesRef[size] = true;
      });
    } catch (error) {
      console.error("Error loading files:", error);
    }
  } catch (error) {
    console.error("Fatal error in initiateLoading:", error);
    progressCallback(100);
  }
};

export const PreloaderProvider = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const { width } = useWindowDimensions();

  // Loading state
  const [loadProgress, setLoadProgress] = useState(0);
  const [startPageAnimation, setStartPageAnimation] = useState(false);
  const [isStartedLines, setIsStartedLines] = useState(false);
  const [isOnloadLinesActive, setIsOnloadLinesActive] = useState(true);

  // Loading config using refs to avoid unnecessary re-renders
  const incrementCapRef = useRef(!prefersReducedMotion ? 20 : 25);
  const intervalRef = useRef(!prefersReducedMotion ? 206 : 100);

  useEffect(() => {
    incrementCapRef.current = !prefersReducedMotion ? 20 : 25;
    intervalRef.current = !prefersReducedMotion ? 206 : 100;
  }, [prefersReducedMotion]);

  // Interface state
  const [interfaceState, setInterfaceState] = useState({
    isTallScreen: false,
    isVeryTallScreen: false,
  });

  const actualProgressRef = useRef(0);
  const isLoadingInitiatedRef = useRef(false);
  const previousWidthRef = useRef(width);
  const debounceTimeoutRef = useRef(null);

  // Initial loading
  useEffect(() => {
    if (!isLoadingInitiatedRef.current) {
      isLoadingInitiatedRef.current = true;

      // Call initiateLoading and update the progress via callback
      initiateLoading(width, (progress) => {
        actualProgressRef.current = progress;
      });
    }
  }, [width]);

  // Fallback timer
  useEffect(() => {
    if (loadProgress > 0 && loadProgress < 100) {
      const fallbackTimer = setTimeout(() => {
        console.warn("Forcing preloader completion after timeout");
        actualProgressRef.current = 100;
        setLoadProgress(100);
        setStartPageAnimation(true);
      }, 20000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [loadProgress]);

  // Watch for width changes with debounce
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
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
    }, 300); // 300ms debounce delay

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [width]);

  // Progress update effect with refs and proper cleanup for event listener
  useEffect(() => {
    const rejectionHandler = (event) => {
      console.warn("Unhandled promise rejection:", event);
    };
    window.addEventListener("unhandledrejection", rejectionHandler);

    let currentProgress = 0;
    let timeoutId = null;

    function updateProgress() {
      if (currentProgress < 100) {
        const increment = Math.min(
          actualProgressRef.current - currentProgress,
          incrementCapRef.current
        );
        currentProgress += increment;

        setLoadProgress(parseFloat(currentProgress.toFixed(0)));

        timeoutId = setTimeout(updateProgress, intervalRef.current);
      } else if (actualProgressRef.current >= 100 && currentProgress <= 100) {
        setLoadProgress(100);
        setStartPageAnimation(true);
      }
    }

    timeoutId = setTimeout(updateProgress, intervalRef.current);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);

  // Interface callbacks with early return to avoid unnecessary state updates
  const completeTransition = useCallback(() => {
    setIsOnloadLinesActive((prev) => {
      if (prev === false) return prev; // If already false, don't update
      return false; // Otherwise, set to false
    });
  }, []);

  const startedLines = useCallback(() => {
    setIsStartedLines((prev) => {
      if (prev === true) return prev;
      return true;
    });
  }, []);

  const setTallScreen = useCallback((lines) => {
    setInterfaceState((prev) => {
      const newIsTallScreen = lines > 60;
      const newIsVeryTallScreen = lines >= 100;

      if (
        prev.isTallScreen === newIsTallScreen &&
        prev.isVeryTallScreen === newIsVeryTallScreen
      ) {
        return prev;
      }

      return {
        ...prev,
        isTallScreen: newIsTallScreen,
        isVeryTallScreen: newIsVeryTallScreen,
      };
    });
  }, []);

  // Memoize context values
  const loadingValue = useMemo(
    () => ({
      loadProgress,
    }),
    [loadProgress]
  );

  const startValue = useMemo(
    () => ({
      startPageAnimation,
    }),
    [startPageAnimation]
  );

  const interfaceValue = useMemo(
    () => ({
      ...interfaceState,
      setTallScreen,
    }),
    [interfaceState, setTallScreen]
  );

  const linesStatusValue = useMemo(
    () => ({
      isOnloadLinesActive,
      completeTransition,
    }),
    [isOnloadLinesActive, completeTransition]
  );

  const startedLinesValue = useMemo(
    () => ({
      isStartedLines,
      startedLines,
    }),
    [startedLines, isStartedLines]
  );

  return (
    <LoadingContext.Provider value={loadingValue}>
      <StartContext.Provider value={startValue}>
        <InterfaceContext.Provider value={interfaceValue}>
          <LinesStatusContext.Provider value={linesStatusValue}>
            <StartedLinesContext.Provider value={startedLinesValue}>
              {children}
            </StartedLinesContext.Provider>
          </LinesStatusContext.Provider>
        </InterfaceContext.Provider>
      </StartContext.Provider>
    </LoadingContext.Provider>
  );
};

// Custom hooks for accessing context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a PreloaderProvider");
  }
  return context;
};

export const useStart = () => {
  const context = useContext(StartContext);
  if (!context) {
    throw new Error("useStart must be used within a PreloaderProvider");
  }
  return context;
};

export const useInterface = () => {
  const context = useContext(InterfaceContext);
  if (!context) {
    throw new Error("useInterface must be used within a PreloaderProvider");
  }
  return context;
};

export const useLinesStatus = () => {
  const context = useContext(LinesStatusContext);
  if (!context) {
    throw new Error("useLinesStatus must be used within a PreloaderProvider");
  }
  return context;
};

export const useStartedLines = () => {
  const context = useContext(StartedLinesContext);
  if (!context) {
    throw new Error("useStartedLines must be used within a PreloaderProvider");
  }
  return context;
};
