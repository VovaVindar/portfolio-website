import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

// Create a shared reference for Lenis
const lenisRef = { current: null };

// Exported functions to control Lenis
export const startLenis = () => {
  if (lenisRef.current) {
    lenisRef.current.start();
  }
};

export const stopLenis = () => {
  if (lenisRef.current) {
    lenisRef.current.stop();
  }
};

function SmoothScrolling({ children, isAnimating }) {
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    if (!lenis) return;

    // Assign the Lenis instance to the shared ref
    lenisRef.current = lenis;

    lenis.stop();

    if (!isAnimating) {
      setTimeout(() => {
        lenis.start();
      }, 400);
    }

    // Cleanup on unmount
    return () => {
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [isAnimating, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
