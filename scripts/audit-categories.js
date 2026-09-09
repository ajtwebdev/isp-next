/**
 * Audit the blog categories coming from WordPress via GraphQL.
 *
 * Reports three things that can legitimately differ:
 *   1. every category WordPress returns, with its post count
 *   2. which of those have at least one published post
 *   3. which have a matching SEO entry in data/category-seo.js
 *
 * Usage: node scripts/audit-categories.js
 */
require("dotenv").config();

const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  console.error("WORDPRESS_API_URL is not set. Add it to .env first.");
  process.exit(1);
}

const QUERY = `
  query AllCategories {
    categories(first: 1000) {
      edges {
        node {
          databaseId
          name
          slug
          count
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

  const categories = (json.data?.categories?.edges || []).map(({ node }) => node);

  // Read the SEO map without importing ESM into this CommonJS script.
  const fs = require("fs");
  const path = require("path");
  const seoSource = fs.readFileSync(
    path.join(__dirname, "..", "data", "category-seo.js"),
    "utf8"
  );
  const seoSlugs = new Set(
    [...seoSource.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1])
  );

  console.log(`\nTOTAL CATEGORIES FROM GRAPHQL: ${categories.length}\n`);
  console.log(
    "slug".padEnd(24) + "posts".padStart(6) + "  seo?  " + "name"
  );
  console.log("-".repeat(72));

  categories
    .slice()
    .sort((a, b) => b.count - a.count)
    .forEach((c) => {
      console.log(
        c.slug.padEnd(24) +
          String(c.count).padStart(6) +
          "  " +
          (seoSlugs.has(c.slug) ? " yes " : " NO  ") +
          "  " +
          c.name
      );
    });

  const empty = categories.filter((c) => !c.count);
  const missingSeo = categories.filter((c) => !seoSlugs.has(c.slug));

  console.log("\nSummary");
  console.log(`  categories returned      : ${categories.length}`);
  console.log(`  with at least one post   : ${categories.length - empty.length}`);
  console.log(`  empty (no posts)         : ${empty.length}${empty.length ? " -> " + empty.map((c) => c.slug).join(", ") : ""}`);
  console.log(`  missing SEO title/intro  : ${missingSeo.length}${missingSeo.length ? " -> " + missingSeo.map((c) => c.slug).join(", ") : ""}`);
  console.log(
    `  total post assignments   : ${categories.reduce((n, c) => n + c.count, 0)} (a post in 2 categories counts twice)\n`
  );
}

main().catch((err) => {
  console.error("Audit failed:", err.message);
  process.exit(1);
});
