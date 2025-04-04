import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b1bb98c7-3281-40f8-8d6d-60c0550bac45"
        ></script>

        {/* Favicons */}
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />

        {/* PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="VOVA VINDAR" />
        <meta name="theme-color" content="#ff0000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* SEO */}
        <meta
          name="description"
          content="Digital Designer & Developer based in Vancouver. Focused on creating immersive websites and intuitive digital interfaces."
        />
        <meta name="author" content="Vova Vindar" />
        <link rel="canonical" href="https://www.vovavindar.com/" />
        <meta
          name="keywords"
          content="web design, web development, digital design, UI design, UX design, Vancouver designer, interface design, web development, react, next.js, creative development, webgl, 3d"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vovavindar.com/" />
        <meta property="og:title" content="VOVA VINDAR" />
        <meta
          property="og:description"
          content="Digital Designer & Developer based in Vancouver. Focused on creating immersive websites and intuitive digital interfaces."
        />
        <meta
          property="og:image"
          content="https://www.vovavindar.com/images/og.png"
        />
        <meta
          property="og:site_name"
          content="Vova Vindar - Digital Designer & Developer"
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VOVA VINDAR" />
        <meta
          name="twitter:description"
          content="Digital Designer & Developer based in Vancouver. Focused on creating immersive websites and intuitive digital interfaces."
        />
        <meta
          name="twitter:image"
          content="https://www.vovavindar.com/images/og.png"
        />

        {/* Pinterest verification */}
        <meta
          name="p:domain_verify"
          content="117d8171a44b094216c651a045b56130"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.vovavindar.com/#website",
                url: "https://www.vovavindar.com",
                name: "Vova Vindar",
                description:
                  "Digital Designer & Developer based in Vancouver. Focused on creating immersive websites and intuitive digital interfaces.",
                publisher: { "@id": "https://www.vovavindar.com/#person" },
              },
              {
                "@type": "Person",
                "@id": "https://www.vovavindar.com/#person",
                name: "Vova Vindar",
                url: "https://www.vovavindar.com",
                image: "https://www.vovavindar.com/images/og.png",
                jobTitle: "Digital Designer & Developer",
                description:
                  "Digital Designer & Developer based in Vancouver. Focused on creating immersive websites and intuitive digital interfaces.",
                knowsAbout: [
                  "Web Design",
                  "UI/UX Design",
                  "Creative Development",
                  "WebGL",
                  "3D Web Design",
                  "React",
                  "Next.js",
                ],
                award: [
                  {
                    "@type": "Award",
                    name: "CSS Design Awards Winner",
                  },
                  {
                    "@type": "Award",
                    name: "Awwwards Honorable Mention",
                  },
                  {
                    "@type": "Award",
                    name: "Diamond Challenge Winner",
                  },
                ],
                accomplishment: [
                  {
                    "@type": "Accomplishment",
                    name: "Helped multiple startups successfully get accepted into Y Combinator",
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Vancouver",
                  addressCountry: "CA",
                },
              },
            ],
          })}
        </script>

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
