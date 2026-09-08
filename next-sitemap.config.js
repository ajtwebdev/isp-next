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

// Test, utility and superseded pages that must not appear in the sitemap.
// Each was verified against the running build before being listed here:
//   /sample-page       WordPress default sample page
//   /loving-test-page  test page ("Loving test page make same")
//   /recent-posts      internal utility listing (4.5MB page dumping every post)
//   /yoga              server-side redirect to the yoga.innerspiritphoto.com subdomain
//   /yogas             superseded by that subdomain
//   /book-now          excluded at client request
const UNWANTED_PATHS = [
  "/sample-page",
  "/loving-test-page",
  "/recent-posts",
  "/yoga",
  "/yogas",
  "/book-now",
];

// Portfolio URLs that are confirmed duplicates. The first four already return
// a permanent redirect to /gallery via next.config.js, so listing them in the
// sitemap would advertise redirects; the last two are empty WordPress shells
// (chrome only, no body content) superseded by the /portfolios/* pages.
// NOTE: /portfolio/books is deliberately NOT listed - it has real content that
// differs from /portfolios/books, so it is ambiguous and left untouched.
const DUPLICATE_PORTFOLIO_PATHS = [
  "/portfolio",
  "/portfolios",
  "/portfolio/gallery",
  "/portfolios/gallery",
  "/portfolio/projects",
  "/portfolio/wall-art",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://innerspiritphoto.com",
  generateRobotsTxt: true,

  exclude: [
    ...NOINDEX_PATHS,
    ...UNWANTED_PATHS,
    ...DUPLICATE_PORTFOLIO_PATHS,
    // /blog/page/1 is a duplicate of /blog, and the rest are paginated views of
    // articles that are already listed individually.
    "/blog/page/*",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...NOINDEX_PATHS, ...UNWANTED_PATHS, "/blog/page/"],
      },
    ],
  },
};