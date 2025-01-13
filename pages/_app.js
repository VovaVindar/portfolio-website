import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import { useRef, useState, useCallback } from "react";
import Preloader from "@/components/Onload/Preloader";
import { ScrollProvider } from "@/context/ScrollContext";
import { TransitionProvider } from "@/context/TransitionContext";
import Transition from "@/components/Onload/Transition";
import CursorContainer from "@/components/Global/CursorContainer";
import SmoothScrolling from "@/components/Global/SmoothScrolling";

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
          className={`${fonts.variables}`}
        />
      )}
      <CursorContainer
        className={`${fonts.variables}`}
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
                className={`${fonts.variables}`}
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
