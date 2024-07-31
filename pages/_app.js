import "./styles/design-system.css";
import "./styles/globals.css";
import localFont from "next/font/local";

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

const oldstandard = localFont({
  src: [
    {
      path: "./fonts/OldStandardTT-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
  preload: true,
  display: "swap",
  variable: "--oldstandard",
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${lausanne.variable} ${oldstandard.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
