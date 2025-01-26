import { useEffect } from "react";
import { useRouter } from "next/router";
import FocusLock from "react-focus-lock";
import { ReactLenis } from "lenis/react";

export default function SecondaryWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        router.push("/");
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  });

  return (
    <FocusLock returnFocus={true}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 5,
          width: "100vw",
          height: "100vh",
          overflowY: "auto",
        }}
        data-scroll-locked
      >
        <ReactLenis
          options={{
            lerp: 0.09,
            touchMultiplier: 0,
          }}
        >
          {children}
        </ReactLenis>
      </div>
    </FocusLock>
  );
}
