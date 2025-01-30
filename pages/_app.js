if (process.env.NODE_ENV === "development") {
  require("../scripts/wdyr");
}

import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import Preloader from "@/components/Onload/Preloader";
import Lines from "@/components/Onload/Lines";
import { ScrollbarProvider } from "@/context/ScrollbarContext";
import {
  TransitionProvider,
  TransitionLayout,
} from "@/context/TransitionContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { DimensionsProvider } from "@/context/DimensionsContext";
import CursorContainer from "@/components/Global/CursorContainer";
import { usePreventStyleRemoval } from "@/hooks/navigation/usePreventStyleRemoval";
import CTA from "@/components/Global/CTA";
import { ReducedMotionProvider } from "@/context/ReducedMotionContext";

// Persistent layer that stays mounted
const PersistentLayer = () => {
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
      <CTA className={fonts.variables} />
      <TransitionLayout>
        <main key={router.route} className={fonts.variables}>
          <Component {...pageProps} />
        </main>
      </TransitionLayout>
    </>
  );
};

function MyApp({ Component, pageProps, router }) {
  usePreventStyleRemoval();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ReducedMotionProvider>
        <DimensionsProvider>
          <PreloaderProvider>
            <ScrollbarProvider>
              <TransitionProvider>
                <>
                  <PersistentLayer />

                  <AppContent
                    Component={Component}
                    pageProps={pageProps}
                    router={router}
                  />
                </>
              </TransitionProvider>
            </ScrollbarProvider>
          </PreloaderProvider>
        </DimensionsProvider>
      </ReducedMotionProvider>
    </>
  );
}

export default MyApp;
