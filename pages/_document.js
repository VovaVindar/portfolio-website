import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="description" content="Digital Designer & Developer" />
        <meta property="og:title" content="VOVA VINDAR" />
        <meta
          property="og:description"
          content="Digital Designer & Developer"
        />
        <meta property="og:url" content="https://www.vovavindar.com/" />
        <meta
          property="og:site_name"
          content="Vova Vindar — Digital Designer & Developer"
        />
        <meta property="og:image" content="https://www.vovavindar.com/og.png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VOVA VINDAR" />
        <meta
          name="twitter:description"
          content="Digital Designer & Developer"
        />
        <meta
          name="twitter:image"
          content="https://www.vovavindar.com/og.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
