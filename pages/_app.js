// 1. Development imports
if (process.env.NODE_ENV === "development") {
  require("../scripts/wdyr");
}

// 2. React and Next.js core imports
import Head from "next/head";
import dynamic from "next/dynamic";

// 3. Styles
import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";

// 4. Configuration/Constants
import { fonts } from "@/config/fonts";

// 5. Context providers
import { DimensionsProvider } from "@/context/DimensionsContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { ScrollbarProvider } from "@/context/ScrollbarContext";
import { TransitionProvider } from "@/context/TransitionContext";
const ReducedMotionProvider = dynamic(
  () =>
    import("@/context/ReducedMotionContext").then(
      (mod) => mod.ReducedMotionProvider
    ),
  { ssr: false }
);

// 6. Dynamic Components
const Lines = dynamic(() => import("@/components/Onload/Lines"), {
  ssr: false,
});
const CTA = dynamic(() => import("@/components/Global/CTA"), {
  ssr: false,
});
const TransitionLayout = dynamic(
  () =>
    import("@/components/TransitionLayout").then((mod) => mod.TransitionLayout),
  { ssr: false }
);

// 7. Components
import Preloader from "@/components/Onload/Preloader";
import CursorContainer from "@/components/Global/CursorContainer";

// 8. Hooks
import { usePreventStyleRemoval } from "@/hooks/navigation/usePreventStyleRemoval";

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
