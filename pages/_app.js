import "./styles/globals.css";
import "./styles/design-system.css";
import "./styles/mouse-follower.css";
import localFont from "next/font/local";
import { useRef, useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import { ScrollProvider } from "@/context/ScrollContext";
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

const times = localFont({
  src: [
    {
      path: "./fonts/TimesItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times",
  preload: true,
  display: "swap",
  variable: "--times",
});

function MyApp({ Component, pageProps, router }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [numbersProgress, setNumbersProgress] = useState(0);
  const [linesCount, setLinesCount] = useState(0);
  const mainRef = useRef(null);

  // Use useCallback to ensure setNumbersProgress does not change on re-renders
  const updateProgress = useCallback((progress) => {
    setNumbersProgress(progress);
  }, []);

  const updateLines = useCallback((count) => {
    setLinesCount(count);
  }, []);

  return (
    <>
      {isAnimating && (
        <Preloader
          numbersProgress={numbersProgress}
          mainRef={mainRef}
          setNumbersProgress={updateProgress}
          className={`${lausanne.variable}`}
        />
      )}
      <CursorContainer
        className={`${lausanne.variable}`}
        isAnimating={isAnimating}
      />
      <ScrollProvider>
        <TransitionProvider>
          <Transition
            numbersProgress={numbersProgress}
            onLoadingComplete={() => {
              setIsAnimating(false);
            }}
            setLinesCount={updateLines}
          >
            <SmoothScrolling isAnimating={isAnimating}>
              <main
                ref={mainRef}
                key={router.route}
                className={`${lausanne.variable} ${times.variable}`}
              >
                <Component
                  numbersProgress={numbersProgress}
                  isAnimating={isAnimating}
                  linesCount={linesCount}
                  {...pageProps}
                />
              </main>
            </SmoothScrolling>
          </Transition>
        </TransitionProvider>
      </ScrollProvider>
    </>
  );
}

export default MyApp;
