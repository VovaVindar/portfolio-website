import Head from "next/head";
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
const PersistentLayer = ({ renderPage }) => {
  const { initiateLoading } = usePreloader();

  useEffect(() => {
    initiateLoading();
    renderPage(true);
  }, [initiateLoading, renderPage]);

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
  const [startedLoading, setStartedLoading] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PreloaderProvider>
        <ScrollProvider>
          <TransitionProvider>
            <>
              <PersistentLayer renderPage={setStartedLoading} />
              {startedLoading && ( // Anti flash on reload
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
    </>
  );
}

export default MyApp;
