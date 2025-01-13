import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

// Create a shared reference for Lenis
const lenisRef = { current: null };

const SCROLL_START_DELAY = 400;
const LERP_VALUE = 0.15;

// Regular functions, not hooks
export const startLenis = () => {
  lenisRef.current?.start();
};

export const stopLenis = () => {
  lenisRef.current?.stop();
};

function SmoothScrolling({ children, isAnimating }) {
  const lenis = useLenis(() => {});

  useEffect(() => {
    if (!lenis) return;

    lenisRef.current = lenis;

    // Initial setup
    lenis.scrollTo(0, { immediate: true });
    lenis.stop();

    // Start scroll if not animating
    let timeoutId;
    if (!isAnimating) {
      timeoutId = setTimeout(() => {
        lenis.start();
      }, SCROLL_START_DELAY);
    }

    return () => {
      timeoutId && clearTimeout(timeoutId);
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [isAnimating, lenis]);

  return (
    <ReactLenis root options={{ lerp: LERP_VALUE }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
