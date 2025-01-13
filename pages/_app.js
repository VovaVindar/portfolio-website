import "@/styles/globals.css";
import "@/styles/design-system.css";
import "@/styles/mouse-follower.css";
import { fonts } from "@/config/fonts";
import { useRef } from "react";
import Preloader from "@/components/Onload/Preloader";
import { ScrollProvider } from "@/context/ScrollContext";
import { TransitionProvider } from "@/context/TransitionContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import Transition from "@/components/Onload/Transition";
import CursorContainer from "@/components/Global/CursorContainer";
import SmoothScrolling from "@/components/Global/SmoothScrolling";

function MyApp({ Component, pageProps, router }) {
  const mainRef = useRef(null);

  return (
    <PreloaderProvider>
      <ScrollProvider>
        <TransitionProvider>
          <>
            <Preloader mainRef={mainRef} className={fonts.variables} />
            <CursorContainer className={fonts.variables} />
            <Transition>
              <SmoothScrolling>
                <main
                  ref={mainRef}
                  key={router.route}
                  className={fonts.variables}
                >
                  <Component {...pageProps} />
                </main>
              </SmoothScrolling>
            </Transition>
          </>
        </TransitionProvider>
      </ScrollProvider>
    </PreloaderProvider>
  );
}

export default MyApp;
