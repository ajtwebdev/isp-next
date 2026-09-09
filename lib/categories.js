import { getApolloClient } from "lib/apollo-client";

import { QUERY_ALL_CATEGORIES } from "data/posts";

/**
 * getAllCategories
 *
 * Every category WordPress exposes, independent of which posts happen to be on
 * the page being rendered. The blog nav previously derived its categories from
 * the current page's posts, which silently hid any category with no post in
 * that slice (e.g. "planning-your-session" on /blog page 1).
 */
export async function getAllCategories() {
  const apolloClient = getApolloClient();

  try {
    const { data } = await apolloClient.query({
      query: QUERY_ALL_CATEGORIES,
    });

    return (data?.categories?.edges || [])
      .map(({ node }) => node)
      .filter((category) => category?.slug);
  } catch (error) {
    console.error(
      `[categories] Failed to query categories: ${error.message}`
    );

    // The nav falls back to deriving categories from the page's posts.
    return [];
  }
}
