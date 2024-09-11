import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function SmoothScrolling({ children, isAnimating }) {
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    if (!lenis) return;

    lenis.stop();
    if (!isAnimating) {
      lenis.start();
    }
  }, [isAnimating, lenis]);

  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScrolling;
