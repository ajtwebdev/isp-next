/**
 * next-sitemap configuration
 *
 * Article and category URLs under /blog are picked up automatically: since the
 * URL migration, pages/blog/[slug].js prerenders every post and category at
 * build time, so next-sitemap's crawl of the build output finds all of them.
 * No additionalPaths shim is needed.
 *
 * What this config does is subtract: pages that are intentionally noindex, and
 * paginated duplicates of /blog.
 */

// Utility / transactional pages that are noindex — form landings, confirmations
// and mail checks. They must not appear in the sitemap either.
const NOINDEX_PATHS = [
  "/check-mail",
  "/contest-form",
  "/enter-to-win",
  "/free-consultation-thank-you",
  "/sorry-page",
  "/thank-you",
  "/thank-you-contest",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://innerspiritphoto.com",
  generateRobotsTxt: true,

  exclude: [
    ...NOINDEX_PATHS,
    // /blog/page/1 is a duplicate of /blog, and the rest are paginated views of
    // articles that are already listed individually.
    "/blog/page/*",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...NOINDEX_PATHS, "/blog/page/"],
      },
    ],
  },
};