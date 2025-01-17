import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import { useEffect } from "react";
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

// Wrapper component to handle loading initiation
const AppContent = ({ Component, pageProps, router }) => {
  const { initiateLoading } = usePreloader();

  // Start loading when the app mounts
  useEffect(() => {
    initiateLoading();
  }, [initiateLoading]);

  return (
    <>
      <Preloader className={fonts.variables} />
      <Lines />
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
  return (
    <PreloaderProvider>
      <ScrollProvider>
        <TransitionProvider>
          <AppContent
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </TransitionProvider>
      </ScrollProvider>
    </PreloaderProvider>
  );
}

export default MyApp;
