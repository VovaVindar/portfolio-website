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
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [barComplete, setBarComplete] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      window.scrollTo(0, 0);

      const imgLoad = imagesLoaded(mainRef.current, { background: true });

      let currentProgress = 0;
      const intervalId = setInterval(() => {
        const newProgress =
          (imgLoad.progressedCount / imgLoad.images.length) * 100;
        if (newProgress > currentProgress) {
          const increment = Math.min(newProgress - currentProgress, 7);
          currentProgress += increment;
          setProgress(currentProgress);
        } else if (currentProgress === 100) {
          setTimeout(() => {
            setExitAnimation(true);
            clearInterval(intervalId);
            setTimeout(() => {
              setIsLoading(false);
            }, 700);
          }, 300);
        }
      }, 60);

      imgLoad.on("always", () => {
        setBarComplete(true);
      });

      imgLoad.on("fail", () => {
        console.error("Image loading failed");
        setBarComplete(true);

        setTimeout(() => {
          setExitAnimation(true);
          clearInterval(intervalId);
          setTimeout(() => {
            setIsLoading(false);
          }, 700);
        }, 300);
      });

      return () => {
        clearInterval(intervalId);
        imgLoad.off("always");
        imgLoad.off("fail");
      };
    }
  }, []);

  return (
    <>
      {isLoading && (
        <Preloader
          progress={progress.toFixed(0)}
          exitAnimation={exitAnimation}
          barComplete={barComplete}
          className={`${timesNew.variable}`}
        />
      )}
      <TransitionProvider>
        <Transition>
          <main
            ref={mainRef}
            key={router.route}
            className={`${lausanne.variable} ${timesNew.variable}`}
          >
            <Component {...pageProps} />
          </main>
        </Transition>
      </TransitionProvider>
    </>
  );
}

export default MyApp;
