if (process.env.NODE_ENV === "development") {
  require("../scripts/wdyr");
}

import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import { useLayoutEffect, useState } from "react";
import Preloader from "@/components/Onload/Preloader";
import Lines from "@/components/Onload/Lines";
import { ScrollProvider } from "@/context/ScrollContext";
import {
  TransitionProvider,
  TransitionLayout,
} from "@/context/TransitionContext";
import { PreloaderProvider, usePreloader } from "@/context/PreloaderContext";
import { DimensionsProvider } from "@/context/DimensionsContext";
import CursorContainer from "@/components/Global/CursorContainer";
import { usePreventStyleRemoval } from "@/hooks/transition/usePreventStyleRemoval";
import Contact from "@/components/Home/Contact";

// Persistent layer that stays mounted
const PersistentLayer = ({ renderPage }) => {
  const { initiateLoading } = usePreloader();

  useLayoutEffect(() => {
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
      <Contact className={fonts.variables} />
      <TransitionLayout>
        <main key={router.route} className={fonts.variables}>
          <Component {...pageProps} />
        </main>
      </TransitionLayout>
    </>
  );
};

function MyApp({ Component, pageProps, router }) {
  // Keep useState here because:
  // 1. We need reactivity for conditional rendering
  // 2. State changes should trigger re-renders
  // 3. It's a UI flag that affects the DOM structure
  const [startedLoading, setStartedLoading] = useState(false);
  // Using useRef would not be appropriate here because:
  // 1. Changes to ref values don't trigger re-renders
  // 2. You need the UI to update when the loading state changes

  usePreventStyleRemoval();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DimensionsProvider>
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
      </DimensionsProvider>
    </>
  );
}

export default MyApp;
