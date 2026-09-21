if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

// Legacy category-prefixed article URLs (/{category}/{slug}) now live at
// /blog/{slug}. Regenerate with: node scripts/generate-blog-redirects.js
const blogRedirects = require("./data/blog-redirects.json");

/** @type {import('next').NextConfig} */
let withBundleAnalyzer
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
} catch (err) {
  // If the analyzer isn't installed, fall back to identity function so Next doesn't crash.
  if (err && err.code !== 'MODULE_NOT_FOUND') throw err
  withBundleAnalyzer = (config) => config
}

module.exports = withBundleAnalyzer({
  images: {
    // Image Optimization is ON everywhere, Netlify included.
    //
    // It used to be forced off under NETLIFY: @netlify/plugin-nextjs v4 served
    // /_next/image through its own IPX function, which could not load sharp's
    // native library on Linux and returned 500 for every optimized image
    // ("IPX Error: libvips-cpp.so.42: cannot open shared object file"). v5
    // drops IPX for the Netlify Image CDN, so the workaround is no longer
    // needed. v5 requires Next >= 13.5, which is why the two were upgraded
    // together.
    //
    // `domains` is deprecated in favour of `remotePatterns`; every host that
    // was listed there is reproduced below, so nothing lost access.
    remotePatterns: [
      {
        protocol: "https",
        // Valid WP image domain, derived from WORDPRESS_API_URL.
        hostname: process.env.WORDPRESS_API_URL.match(
          /(?!(w+)\.)\w*(?:\w+\.)+\w+/
        )[0],
      },
      { protocol: "https", hostname: "0.gravatar.com" },
      { protocol: "https", hostname: "1.gravatar.com" },
      { protocol: "https", hostname: "2.gravatar.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/books',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/wall-art',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/portfolio/gallery',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/portfolios',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/portfolios/gallery',
        destination: '/gallery',
        permanent: true,
      },
      {
        // FAQ is a top-level nav item now, so it lives at /faq rather than
        // under the Resources section. /resources itself is still live.
        source: "/resources/faq",
        destination: "/faq",
        statusCode: 301,
      },
      // Content/SEO cleanup: 301s added only where a clear, relevant
      // replacement exists. Verified against the build that every destination
      // returns 200, so none of these create a redirect chain or loop.
      {
        // Internal utility listing superseded by the real blog index.
        source: "/recent-posts",
        destination: "/blog",
        statusCode: 301,
      },
      {
        // Empty WordPress shell (chrome only); the content lives here.
        source: "/portfolio/projects",
        destination: "/portfolios/projects",
        statusCode: 301,
      },
      {
        // Empty WordPress shell (chrome only); the content lives here.
        source: "/portfolio/wall-art",
        destination: "/portfolios/wall-art",
        statusCode: 301,
      },
      // The post was renamed once it was clear it covers six women, changing
      // its slug. A newsletter had already gone out with the old slug. Both
      // URL shapes are covered because the live site currently serves posts
      // under /creative-experiences-behind-the-image/ while this branch moves
      // them to /blog/, so recipients may land on either.
      {
        source:
          "/creative-experiences-behind-the-image/5-women-become-a-fire-breathing-dragon",
        destination: "/blog/6-women-become-a-fire-breathing-dragon",
        permanent: true,
      },
      {
        source: "/blog/5-women-become-a-fire-breathing-dragon",
        destination: "/blog/6-women-become-a-fire-breathing-dragon",
        permanent: true,
      },
      ...blogRedirects,
    ];
  },
});