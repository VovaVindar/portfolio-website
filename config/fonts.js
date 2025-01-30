import localFont from "next/font/local";

const lausanne = localFont({
  src: [
    {
      path: "../public/fonts/TWKLausanne-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  adjustFontFallback: "Arial",
  preload: true,
  display: "swap",
  variable: "--lausanne",
});

const times = localFont({
  src: [
    {
      path: "../public/fonts/TimesItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times",
  preload: true,
  display: "swap",
  variable: "--times",
});

export const fonts = {
  lausanne,
  times,
  variables: `${lausanne.variable} ${times.variable}`,
};
