module.exports = {
  siteUrl: "https://vovavindar.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/private/*"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://vovavindar.com/server-sitemap.xml"],
  },
};
