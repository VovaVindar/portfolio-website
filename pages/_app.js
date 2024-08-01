import "./styles/design-system.css";
import "./styles/globals.css";
import localFont from "next/font/local";
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

const timesnew = localFont({
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
  return (
    <TransitionProvider>
      <Transition>
        <main
          key={router.route}
          className={`${lausanne.variable} ${timesnew.variable}`}
        >
          <Component {...pageProps} />
        </main>
      </Transition>
    </TransitionProvider>
  );
}

export default MyApp;
