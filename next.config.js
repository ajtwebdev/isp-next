if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

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
    // Keep Next.js Image Optimization enabled. When deploying to Netlify we use
    // the Netlify Next.js plugin (`@netlify/plugin-nextjs`) which provides
    // support for the Next image optimizer on Netlify. If you cannot use the
    // plugin, set `process.env.NO_NETLIFY_IMAGE_PLUGIN` to `1` in Netlify to
    // fall back to `unoptimized: true`.
    unoptimized: process.env.NO_NETLIFY_IMAGE_PLUGIN === '1' ? true : false,
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  swcMinify: true,
});
