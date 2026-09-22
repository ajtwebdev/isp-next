import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import pLimit from "p-limit";

import { removeLastTrailingSlash } from "lib/util";

// Kept in step with lib/api.ts - see the comment there for why these values.
const CONCURRENCY = Number(process.env.WP_FETCH_CONCURRENCY || 1);
const limit = pLimit(CONCURRENCY);
const RETRY_DELAYS_MS = [1000, 3000, 5000];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function throttledFetchWithRetry(url, init) {
  return limit(async () => {
    let lastError;

    for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
      try {
        const res = await fetch(url, init);

        if (res.status >= 500 || res.status === 429) {
          if (attempt < RETRY_DELAYS_MS.length) {
            const wait = RETRY_DELAYS_MS[attempt];
            console.warn(
              `[wp:apollo] HTTP ${res.status} - retry ${attempt + 1}/${RETRY_DELAYS_MS.length} in ${wait}ms`
            );
            await sleep(wait);
            continue;
          }
          console.error(
            `[wp:apollo] HTTP ${res.status} after ${RETRY_DELAYS_MS.length} retries - giving up`
          );
        }

        return res;
      } catch (error) {
        lastError = error;
        if (attempt < RETRY_DELAYS_MS.length) {
          const wait = RETRY_DELAYS_MS[attempt];
          console.warn(
            `[wp:apollo] ${error.message} - retry ${attempt + 1}/${RETRY_DELAYS_MS.length} in ${wait}ms`
          );
          await sleep(wait);
          continue;
        }
      }
    }

    throw lastError;
  });
}

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
      // Apollo is a second route to the same WordPress server (the topic
      // archives use it), so it needs the same limiter and retry as
      // lib/api.ts. Without this it kept its own unbounded concurrency and
      // still turned 503s into 404s.
      fetch: throttledFetchWithRetry,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
  });
}
