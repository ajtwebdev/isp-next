import Head from "next/head";
import { Helmet } from "react-helmet";

import { authorPathByName } from "lib/users";
import { postPathBySlug } from "lib/posts";
import { pagePathBySlug } from "lib/pages";
import { SITE_ORIGIN } from "lib/canonical";

import config from "../package.json";

const SITE_NAME = "Inner Spirit Photography";
const SITE_LOGO_PATH = "/inner-spirit-logo-text-white.svg";

/**
 * Post data reaches this module in two shapes: the raw WPGraphQL response
 * (nested `{ node }` edges) used by the article template, and mapPostData's
 * flattened output used by the listing pages. Normalise both.
 */
function unwrap(value) {
  return value?.node ?? value;
}

function toCategoryNames(categories) {
  const list = Array.isArray(categories)
    ? categories
    : categories?.edges?.map(({ node }) => node) || [];

  return list.map((category) => category?.name).filter(Boolean);
}

function toIsoDate(value) {
  if (!value) return null;

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

// WordPress excerpts arrive as HTML; schema.org description wants plain text.
function toPlainText(html) {
  if (typeof html !== "string") return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "\u2019")
    .replace(/&#8216;|&lsquo;/g, "\u2018")
    .replace(/&#8220;|&ldquo;/g, "\u201c")
    .replace(/&#8221;|&rdquo;/g, "\u201d")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * BlogPosting structured data for a single article.
 *
 * All URLs are absolute, built from SITE_ORIGIN in lib/canonical.js — the
 * previous implementation read a `homepage` field that does not exist in
 * package.json, so every URL it emitted was relative and invalid for
 * search engines.
 */
export function ArticleJsonLd({ post = {}, siteTitle = SITE_NAME }) {
  const {
    title,
    slug,
    excerpt,
    date,
    modified,
    author,
    categories,
    featuredImage,
  } = post;

  const url = `${SITE_ORIGIN}${postPathBySlug(slug)}`;
  const datePublished = toIsoDate(date);
  const dateModified = toIsoDate(modified) || datePublished;
  const imageUrl = unwrap(featuredImage)?.sourceUrl;
  const authorName = unwrap(author)?.name;
  const keywords = toCategoryNames(categories);
  const description = toPlainText(excerpt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    headline: title,
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}${SITE_LOGO_PATH}`,
      },
    },
  };

  // Only emit fields we actually have, so the output never carries
  // null/undefined values that validators flag.
  if (description) jsonLd.description = description;
  if (imageUrl) jsonLd.image = [imageUrl];
  if (datePublished) jsonLd.datePublished = datePublished;
  if (dateModified) jsonLd.dateModified = dateModified;
  if (keywords.length > 0) jsonLd.keywords = keywords.join(", ");
  if (datePublished) {
    jsonLd.copyrightYear = new Date(datePublished).getFullYear();
  }
  if (authorName) {
    jsonLd.author = {
      "@type": "Person",
      name: authorName,
    };
  }

  return (
    <Head>
      <script
        key="jsonld-blogposting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function WebsiteJsonLd({ siteTitle = "" }) {
  const { homepage = "" } = config;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${homepage}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function WebpageJsonLd({
  title = "",
  description = "",
  siteTitle = "",
  slug = "",
}) {
  const { homepage = "" } = config;
  const path = pagePathBySlug(slug);

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `${homepage}${path}`,
    publisher: {
      "@type": "ProfilePage",
      name: siteTitle,
    },
  };

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function AuthorJsonLd({ author = {} }) {
  const { homepage = "" } = config;
  const { name, avatar, description } = author;
  const path = authorPathByName(name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    image: avatar?.url,
    url: `${homepage}${path}`,
    description: description,
  };

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function LogoJsonLd() {
  const { homepage = "", faviconPath = "/favicon.ico" } = config;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: `${homepage}`,
    logo: `${homepage}${faviconPath}`,
  };

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}