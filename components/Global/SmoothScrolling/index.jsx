import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePreloader } from "@/context/PreloaderContext";

// Create a shared reference for Lenis
const lenisRef = { current: null };
const LERP_VALUE = 0.09; // was 0.15

// Regular functions, not hooks
export const startLenis = () => {
  lenisRef.current?.start();
};

export const stopLenis = () => {
  lenisRef.current?.stop();
};

export const scrollToLenis = (target) => {
  lenisRef.current?.scrollTo(target, { immediate: true });
};

function SmoothScrolling({ children }) {
  const { isOnloadLinesActive } = usePreloader();
  const lenis = useLenis(() => {});

  useEffect(() => {
    if (!lenis) return;

    lenisRef.current = lenis;

    // Initial setup
    if (isOnloadLinesActive) {
      //lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    } else {
      lenis.start();
    }

    // Start scroll if not animating
    if (!isOnloadLinesActive) {
      lenis.start();
    }

    return () => {
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [isOnloadLinesActive, lenis]);

  return (
    <ReactLenis root options={{ lerp: LERP_VALUE, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
