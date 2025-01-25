const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [
    /\/images\/selected\/.*/,
    /\/images\/uncompressed\/.*/,
    /\.map$/, // Exclude source maps
  ],
  additionalManifestEntries: [
    { url: "/site.webmanifest", revision: null },
    { url: "/favicon.ico", revision: null },
    { url: "/favicon/favicon2.ico", revision: null },
    { url: "/favicon/favicon3.ico", revision: null },
    { url: "/favicon/favicon4.ico", revision: null },
    { url: "/favicon/favicon.svg", revision: null },
    { url: "/favicon/favicon2.svg", revision: null },
    { url: "/favicon/favicon3.svg", revision: null },
    { url: "/favicon/favicon4.svg", revision: null },
    { url: "/favicon/favicon-96x96.png", revision: null },
    { url: "/favicon/favicon2-96x96.png", revision: null },
    { url: "/favicon/favicon3-96x96.png", revision: null },
    { url: "/favicon/favicon4-96x96.png", revision: null },
    { url: "/favicon/apple-touch-icon.png", revision: null },
  ],
  runtimeCaching: [
    {
      // Explicitly exclude selected and uncompressed image directories
      urlPattern: /\/images\/(selected|uncompressed)\/.*/,
      handler: "NetworkOnly", // This will prevent any caching of these images
    },
    {
      // Images
      urlPattern: /\/images\/optimized\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "media-assets",
        expiration: {
          maxEntries: 100, // Adjust based on your total media files
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        matchOptions: {
          ignoreVary: true, // Ignore variations in headers
        },
        cacheableResponse: {
          statuses: [0, 200], // Cache successful responses and opaque responses
        },
      },
    },
    {
      // Fonts
      urlPattern: /^https:\/\/.*\.(woff|woff2|ttf|eot)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-fonts",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      // CSS & JS
      urlPattern: /^https:\/\/.*\.(js|css)$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "dynamic-assets",
        networkTimeoutSeconds: 5, // Wait 5 seconds before falling back to cache
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        cacheableResponse: {
          statuses: [0, 200], // Cache successful and opaque responses
        },
      },
    },
    {
      // Favicons
      urlPattern: /\/favicon(?:\.ico|\/.*\.(ico|png|svg|webmanifest))$/,
      handler: "CacheFirst",
      options: {
        cacheName: "favicon-assets",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      // Web manifest
      urlPattern: /\.webmanifest$/,
      handler: "CacheFirst",
      options: {
        cacheName: "manifest-assets",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      // Specific caching for screenshots
      urlPattern:
        /\/images\/(desktop-screenshot|mobile-screenshot)\.(png|jpg|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "screenshots",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: false, // Disable scroll restoration on arrow (pop) navigation
  },
  // Static site output:
  output: "export", // Enables static HTML export
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/, // Enable GLSL files
      type: "asset/source",
    });

    return config;
  },
};

// Chain the configurations
module.exports = withPWA(nextConfig);
