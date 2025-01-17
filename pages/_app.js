import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import { useEffect, useState } from "react";
import Preloader from "@/components/Onload/Preloader";
import Lines from "@/components/Onload/Lines";
import { ScrollProvider } from "@/context/ScrollContext";
import {
  TransitionProvider,
  TransitionLayout,
} from "@/context/TransitionContext";
import { PreloaderProvider, usePreloader } from "@/context/PreloaderContext";
import CursorContainer from "@/components/Global/CursorContainer";
import SmoothScrolling from "@/components/Global/SmoothScrolling";

// Persistent layer that stays mounted
const PersistentLayer = ({ onLoadComplete }) => {
  const { initiateLoading, loadProgress } = usePreloader();

  useEffect(() => {
    initiateLoading();
  }, [initiateLoading]);

  useEffect(() => {
    if (loadProgress >= 100) {
      onLoadComplete?.();
    }
  }, [loadProgress, onLoadComplete]);

  return (
    <>
      <Preloader className={fonts.variables} />
      <Lines />
    </>
  );
};

// Main app content that can change with routes
const AppContent = ({ Component, pageProps, router }) => {
  return (
    <>
      <CursorContainer className={fonts.variables} />
      <SmoothScrolling>
        <TransitionLayout>
          <main key={router.route} className={fonts.variables}>
            <Component {...pageProps} />
          </main>
        </TransitionLayout>
      </SmoothScrolling>
    </>
  );
};

function MyApp({ Component, pageProps, router }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <PreloaderProvider>
      <ScrollProvider>
        <TransitionProvider>
          <>
            <PersistentLayer onLoadComplete={() => setIsLoaded(true)} />
            {isLoaded && (
              <AppContent
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
            )}
          </>
        </TransitionProvider>
      </ScrollProvider>
    </PreloaderProvider>
  );
}

export default MyApp;
