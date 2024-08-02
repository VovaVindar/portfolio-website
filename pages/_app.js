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
  const [followerProgress, setFollowerProgress] = useState(0);
  const [linesAnimation, setLinesAnimation] = useState(false);
  const [barComplete, setBarComplete] = useState(false);
  const mainRef = useRef(null);

  const exitAnimationDuration = 1010;
  const exitAnimationDelay = 300;
  const intervalDuration = 58;

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
          setFollowerProgress(currentProgress);
        } else if (currentProgress === 100) {
          setLinesAnimation(true);
          setTimeout(() => {
            clearInterval(intervalId);
            setTimeout(() => {
              //setIsLoading(false);
            }, exitAnimationDuration);
          }, exitAnimationDelay);
        }
      }, intervalDuration);

      imgLoad.on("always", () => {
        setLinesAnimation(true);
      });

      imgLoad.on("fail", () => {
        console.error("Image loading failed");
        setLinesAnimation(true);
        setTimeout(() => {
          clearInterval(intervalId);
          setTimeout(() => {
            //setIsLoading(false);
          }, exitAnimationDuration);
        }, exitAnimationDelay);
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
          followerProgress={followerProgress.toFixed(0)}
          linesAnimation={linesAnimation}
          className={`${timesNew.variable} ${lausanne.variable}`}
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
