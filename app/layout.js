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
      path: "./fonts/TWKLausanne-700.woff2",
      weight: "700",
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

export const metadata = {
  title: {
    template: "%s | Vova Vindar",
    default: "Vova Vindar",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-192x192.png",
    apple: "/apple-touch-icon.png",
  },
  description: "",
  category: "Digital Designer & Developer",
  openGraph: {
    title: "",
    description: "",
    url: "https://www.vovavindar.com/",
    siteName: "Align",
    images: [
      {
        url: "https://www.vovavindar.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vova Vindar",
    description: "",
    images: ["https://www.vovavindar.com/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lausanne.variable} ${timesnew.variable}`}>
        {children}
      </body>
    </html>
  );
}
