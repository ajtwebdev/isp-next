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

  outputFileTracingRoot: __dirname,
  images: {

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

        source: "/resources/faq",
        destination: "/faq",
        statusCode: 301,
      },

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