/**
 * Generates data/blog-redirects.json — a static map of every legacy
 * category-prefixed article URL to its new /blog/{slug} location.
 *
 * Stage 1 of the blog URL migration: this only produces the data file.
 * Wiring it into next.config.js happens separately.
 *
 * Usage: node scripts/generate-blog-redirects.js
 */

const fs = require("fs");
const path = require("path");

// Match the .env files without pulling in a dependency the project may not have.
function loadEnvApiUrl() {
  if (process.env.WORDPRESS_API_URL) return process.env.WORDPRESS_API_URL;

  for (const file of [".env.local", ".env"]) {
    const envPath = path.join(__dirname, "..", file);
    if (!fs.existsSync(envPath)) continue;

    const match = fs
      .readFileSync(envPath, "utf8")
      .match(/^\s*WORDPRESS_API_URL\s*=\s*(.+)\s*$/m);

    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }

  return null;
}

// Same shape as the query in lib/api.ts:47 (getAllPostsWithSlug).
const QUERY = `
  {
    posts(first: 10000) {
      edges {
        node {
          categories {
            edges {
              node {
                slug
                name
              }
            }
          }
          slug
        }
      }
    }
  }
`;

async function fetchPosts(apiUrl) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`WPGraphQL returned errors: ${JSON.stringify(json.errors)}`);
  }

  return json?.data?.posts?.edges || [];
}

function buildRedirects(edges) {
  const redirects = [];
  const seen = new Set();
  const postsWithoutCategories = [];

  edges.forEach(({ node }) => {
    const slug = node?.slug;
    if (!slug) return;

    const categories = (node?.categories?.edges || [])
      .map(({ node: category }) => category?.slug)
      .filter(Boolean);

    if (categories.length === 0) {
      postsWithoutCategories.push(slug);
      return;
    }

    categories.forEach((categorySlug) => {
      const source = `/${categorySlug}/${slug}`;
      if (seen.has(source)) return;
      seen.add(source);

      // statusCode 301 rather than `permanent: true`, which Next emits as a 308.
      redirects.push({
        source,
        destination: `/blog/${slug}`,
        statusCode: 301,
      });
    });
  });

  redirects.sort((a, b) => a.source.localeCompare(b.source));

  return { redirects, postsWithoutCategories };
}

async function main() {
  const apiUrl = loadEnvApiUrl();

  if (!apiUrl) {
    throw new Error(
      "WORDPRESS_API_URL is not set (checked the environment, .env.local and .env)."
    );
  }

  console.log(`Fetching posts from ${apiUrl}`);

  const edges = await fetchPosts(apiUrl);
  const { redirects, postsWithoutCategories } = buildRedirects(edges);

  const outPath = path.join(__dirname, "..", "data", "blog-redirects.json");
  fs.writeFileSync(outPath, `${JSON.stringify(redirects, null, 2)}\n`);

  console.log("");
  console.log(`Posts processed:      ${edges.length}`);
  console.log(`Redirect entries:     ${redirects.length}`);
  console.log(`Posts with 0 cats:    ${postsWithoutCategories.length}`);

  if (postsWithoutCategories.length > 0) {
    console.log("");
    console.log(
      "WARNING: these posts have no category, so no legacy URL was mapped for them:"
    );
    postsWithoutCategories.forEach((slug) => console.log(`  - ${slug}`));
  }

  console.log("");
  console.log(`Wrote ${outPath}`);
}

main().catch((error) => {
  console.error(`[generate-blog-redirects] ${error.message}`);
  process.exit(1);
});