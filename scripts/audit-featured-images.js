/**
 * Audit which blog posts actually have a featured image in WordPress.
 *
 * The article template feeds post.featuredImage.node.sourceUrl into og:image
 * and twitter:image, so any post missing one silently falls back to the generic
 * site image. This script reports that per post, without touching app code.
 *
 * Usage: node scripts/audit-featured-images.js
 */
require("dotenv").config();

const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  console.error("WORDPRESS_API_URL is not set. Add it to .env first.");
  process.exit(1);
}

const QUERY = `
  query AllPostsFeaturedImage {
    posts(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

async function main() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) {
    throw new Error(`WordPress responded ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const posts = (json.data?.posts?.edges || []).map(({ node }) => node);
  const withImage = posts.filter((p) => p.featuredImage?.node?.sourceUrl);
  const withoutImage = posts.filter((p) => !p.featuredImage?.node?.sourceUrl);

  console.log(`\nTotal posts: ${posts.length}`);
  console.log(`With featured image:    ${withImage.length}`);
  console.log(`WITHOUT featured image: ${withoutImage.length}\n`);

  if (withoutImage.length > 0) {
    console.log("--- Posts with NO featured image (these fall back to the generic OG image) ---");
    withoutImage.forEach((p) => console.log(`  /blog/${p.slug}`));
    console.log("");
  }

  console.log("--- Posts WITH a featured image ---");
  withImage.forEach((p) =>
    console.log(`  /blog/${p.slug}\n      ${p.featuredImage.node.sourceUrl}`)
  );
}

main().catch((err) => {
  console.error("Audit failed:", err.message);
  process.exit(1);
});
