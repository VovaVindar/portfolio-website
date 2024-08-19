import "./styles/globals.css";
import "./styles/design-system.css";
import localFont from "next/font/local";
import { useRef, useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import imagesLoaded from "imagesLoaded";
import { TransitionProvider } from "@/context/TransitionContext";
import Transition from "@/components/Transition";

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

  const intervalDuration = 60;

  useEffect(() => {
    if (mainRef.current) {
      window.scrollTo(0, 0);

      const imgLoad = imagesLoaded(mainRef.current, { background: true });

      let currentProgress = 0;
      const intervalId = setInterval(() => {
        const newProgress =
          (imgLoad.progressedCount / imgLoad.images.length) * 100;
        if (newProgress > currentProgress) {
          const increment = Math.min(newProgress - currentProgress, 8);
          currentProgress += increment;
          setNumbersProgress(currentProgress.toFixed(0));
        } else if (currentProgress === 100) {
          clearInterval(intervalId);
        }
      }, intervalDuration);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [mainRef]);

  return (
    <>
      <Preloader
        numbersProgress={numbersProgress}
        className={`${lausanne.variable}`}
      />
      <TransitionProvider>
        <Transition
          numbersProgress={numbersProgress}
          onLoadingComplete={() => {
            setIsAnimating(false);
          }}
        >
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
        </Transition>
      </TransitionProvider>
    </>
  );
}

export default MyApp;
