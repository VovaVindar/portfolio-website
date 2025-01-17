import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import Preloader from "@/components/Onload/Preloader";
import Lines from "@/components/Onload/Lines";
import { ScrollProvider } from "@/context/ScrollContext";
import {
  TransitionProvider,
  TransitionLayout,
} from "@/context/TransitionContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import CursorContainer from "@/components/Global/CursorContainer";
import SmoothScrolling from "@/components/Global/SmoothScrolling";

function MyApp({ Component, pageProps, router }) {
  return (
    <PreloaderProvider>
      <ScrollProvider>
        <TransitionProvider>
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
        </TransitionProvider>
      </ScrollProvider>
    </PreloaderProvider>
  );
}

export default MyApp;
