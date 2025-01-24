const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [
    /\/images\/selected\//,
    /\/images\/uncompressed\//,
    /\.map$/, // Exclude source maps
    /^manifest\..*$/, // Exclude manifest files if needed
  ],
  runtimeCaching: [
    {
      // Explicitly exclude selected and uncompressed image directories
      urlPattern: /\/images\/(selected|uncompressed)\/.*/,
      handler: "NetworkOnly", // This will prevent any caching of these images
    },
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
    {
      // Cache First for more static assets like fonts
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
      // Network First for CSS and JS files
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
    // Enable GLSL files
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    });
    return config;
  },
};

// Chain the configurations
module.exports = withPWA(nextConfig);
