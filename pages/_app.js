import "./styles/globals.css";
import "./styles/design-system.css";
import "./styles/mouse-follower.css";
import localFont from "next/font/local";
import { useRef, useEffect, useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import { TransitionProvider } from "@/context/TransitionContext";
import Transition from "@/components/Transition";
import CursorContainer from "@/components/CursorContainer";
import SmoothScrolling from "@/components/SmoothScrolling";

const lausanne = localFont({
  src: [
    {
      path: "./fonts/TWKLausanne-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TWKLausanne-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  adjustFontFallback: "Arial",
  preload: true,
  display: "swap",
  variable: "--lausanne",
});

const timesNew = localFont({
  src: [
    {
      path: "./fonts/TimesNewRomanItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
  preload: true,
  display: "swap",
  variable: "--timesnew",
});

function MyApp({ Component, pageProps, router }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [numbersProgress, setNumbersProgress] = useState(0);
  const mainRef = useRef(null);

  // Scroll to top when mainRef changes
  useEffect(() => {
    if (mainRef.current) {
      window.scrollTo(0, 0);
    }
  }, [router.route]);

  // Use useCallback to ensure setNumbersProgress does not change on re-renders
  const updateProgress = useCallback((progress) => {
    setNumbersProgress(progress);
  }, []);

  return (
    <>
      <Preloader
        numbersProgress={numbersProgress}
        mainRef={mainRef}
        setNumbersProgress={updateProgress}
        className={`${lausanne.variable}`}
      />
      <CursorContainer
        className={`${lausanne.variable} ${timesNew.variable}`}
      />
      <TransitionProvider>
        <Transition
          numbersProgress={numbersProgress}
          onLoadingComplete={() => {
            setIsAnimating(false);
          }}
        >
          <SmoothScrolling>
            <main
              ref={mainRef}
              key={router.route}
              className={`${lausanne.variable} ${timesNew.variable}`}
            >
              <Component
                numbersProgress={numbersProgress}
                isAnimating={isAnimating}
                {...pageProps}
              />
            </main>
          </SmoothScrolling>
        </Transition>
      </TransitionProvider>
    </>
  );
}

export default MyApp;
