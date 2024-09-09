import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function SmoothScrolling({ children }) {
  const lenis = useLenis(({ scroll }) => {});

  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScrolling;
