const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      // Cache media files from optimized folder
      urlPattern:
        /\/images\/optimized\/.*\.(jpg|jpeg|png|gif|webp|avif|webm|mp4)$/i,
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
  ],
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: false, // Disable scroll restoration on arrow (pop) navigation
  },
  // Static site output:
  output: "export", // Enables static HTML export
  webpack: (config, options) => {
    // Enable GLSL files
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    });
    return config;
  },
};

// Chain the configurations
module.exports = withBundleAnalyzer(withPWA(nextConfig));
