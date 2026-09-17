import { getApolloClient } from "lib/apollo-client";

import { QUERY_ALL_TAGS } from "data/posts";

/**
 * Tags are surfaced on the front end as "Topics". This module deliberately
 * mirrors lib/categories.js: same query shape, same failure behaviour, and no
 * new taxonomy - it reads the existing WordPress tags.
 */

/**
 * getAllTags
 *
 * Every tag WordPress exposes that has at least one post (hideEmpty), so the
 * topics list never advertises an archive with nothing in it.
 */
export async function getAllTags() {
  const apolloClient = getApolloClient();

  try {
    const { data } = await apolloClient.query({
      query: QUERY_ALL_TAGS,
    });

    return (data?.tags?.edges || [])
      .map(({ node }) => node)
      .filter((tag) => tag?.slug);
  } catch (error) {
    console.error(`[tags] Failed to query tags: ${error.message}`);

    return [];
  }
}

/**
 * filterPostsByTag
 *
 * Category archives already filter an in-memory post list rather than issuing
 * a per-term query (see pages/blog/[slug].js), so topics follow suit.
 */
export function filterPostsByTag(posts, slug) {
  if (!Array.isArray(posts) || !slug) return [];

  return posts.filter((post) =>
    (post?.tags || []).some((tag) => tag?.slug === slug)
  );
}
