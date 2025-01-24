const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
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
