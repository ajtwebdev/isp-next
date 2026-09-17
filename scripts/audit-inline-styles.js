/**
 * Audits published post content for legacy inline styling and presentational
 * markup carried over from the old editor.
 *
 * Writes reports/inline-style-audit.json.
 * Usage: node scripts/audit-inline-styles.js
 */

const fs = require("fs");
const path = require("path");

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

const QUERY = `
  {
    posts(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          title
          slug
          content
        }
      }
    }
  }
`;

// Each rule pairs a detection regex with plain-English wording for the client.
const RULES = [
  {
    id: "inlineStyleAttr",
    label: "Hard-coded colours/sizes on text",
    test: (html) => /<[a-z][^>]*\sstyle\s*=\s*["'][^"']+["']/gi,
  },
  {
    id: "fontTag",
    label: "Obsolete <font> tag",
    test: () => /<font[\s>]/gi,
  },
  {
    id: "fakeHeading",
    label: "Old-style bold/underlined heading",
    test: () => /<p[^>]*>\s*(<(strong|b|u)[^>]*>){1,3}[^<]{3,120}(<\/(strong|b|u)>\s*){1,3}\s*<\/p>/gi,
  },
  {
    id: "presentationalTag",
    label: "Presentational bold/italic/underline tags",
    test: () => /<\/?(b|i|u|strike|s)>/gi,
  },
  {
    id: "centerTag",
    label: "Obsolete <center> tag",
    test: () => /<center[\s>]/gi,
  },
  {
    id: "deprecatedAttr",
    label: "Deprecated align/bgcolor/width attributes",
    test: () => /<[a-z][^>]*\s(align|bgcolor|valign|border|cellpadding|cellspacing)\s*=/gi,
  },
  {
    id: "nbspRun",
    label: "Manual spacing with &nbsp;",
    test: () => /(&nbsp;\s*){2,}/gi,
  },
  {
    id: "emptyParagraph",
    label: "Empty paragraphs used as spacing",
    test: () => /<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi,
  },
  {
    id: "embeddedJsonLd",
    label: "Hand-pasted schema/code block in post body",
    test: () => /<script[^>]*application\/ld\+json/gi,
  },
];

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

function auditPost(node) {
  const html = node?.content || "";
  const issues = [];

  RULES.forEach((rule) => {
    const matches = html.match(rule.test(html));
    if (matches && matches.length > 0) {
      issues.push({ id: rule.id, label: rule.label, count: matches.length });
    }
  });

  return {
    title: node.title,
    slug: node.slug,
    url: `/blog/${node.slug}`,
    issues,
  };
}

async function main() {
  const apiUrl = loadEnvApiUrl();
  if (!apiUrl) throw new Error("WORDPRESS_API_URL is not set.");

  console.log(`Fetching posts from ${apiUrl}`);

  const edges = await fetchPosts(apiUrl);
  const audited = edges.map(({ node }) => auditPost(node));
  const flagged = audited
    .filter((post) => post.issues.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));

  const report = {
    generatedAt: new Date().toISOString(),
    totalPosts: audited.length,
    flaggedCount: flagged.length,
    cleanCount: audited.length - flagged.length,
    posts: flagged,
  };

  const outDir = path.join(__dirname, "..", "reports");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "inline-style-audit.json");
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Total posts:  ${report.totalPosts}`);
  console.log(`Flagged:      ${report.flaggedCount}`);
  console.log(`Clean:        ${report.cleanCount}`);
  console.log(`Wrote ${outPath}`);
}

main().catch((error) => {
  console.error(`[audit-inline-styles] ${error.message}`);
  process.exit(1);
});