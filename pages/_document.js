import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="VOVA VINDAR" />
        <meta name="theme-color" content="#ff0000" />
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
        {/* Tell the browser to never restore the scroll position on load: https://dev.to/mmazzarolo/scroll-restoration-in-next-js-ckc */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
