import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { useLinesStatus } from "@/context/PreloaderContext";
//import gsap from "gsap";
import { useReducedMotion } from "@/context/ReducedMotionContext";

// Create a shared reference for Lenis
export const lenisRef = { current: null };
export const LERP_VALUE = 0.09; // was 0.15

// Regular functions, not hooks
export const startLenis = () => {
  return lenisRef.current?.lenis?.start();
};

export const stopLenis = () => {
  lenisRef.current?.lenis?.stop();
};

/*export const scrollToLenis = (target) => {
  lenisRef.current?.scrollTo(target, { immediate: true });
};*/

function SmoothScrolling({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const { isOnloadLinesActive } = useLinesStatus();

  const lenis = useLenis(() => {});

  useEffect(() => {
    if (!lenis) return;

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

  /*useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);*/

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: !prefersReducedMotion ? LERP_VALUE : 1,
        touchMultiplier: 0,
        prevent: (node) => node.hasAttribute("data-scroll-locked"),
        //autoRaf: false, // Set to false since we're using GSAP ticker
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
