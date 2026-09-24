
const pLimit = require("p-limit");


const CONCURRENCY = Number(process.env.WP_FETCH_CONCURRENCY || 1);
const limit = pLimit(CONCURRENCY);

// Delay before each retry. Three attempts total, so a single request rides out
// roughly 9s of instability before it is treated as a real failure.
const RETRY_DELAYS_MS = [1000, 3000, 5000];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url: string, init: any): Promise<Response> {
  let lastError: any;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    try {
      const res = await fetch(url, init);

      if (res.status >= 500 || res.status === 429) {
        if (attempt < RETRY_DELAYS_MS.length) {
          const wait = RETRY_DELAYS_MS[attempt];
          console.warn(
            `[wp] HTTP ${res.status} from WordPress - retry ${attempt + 1}/${RETRY_DELAYS_MS.length} in ${wait}ms`
          );
          await sleep(wait);
          continue;
        }
        console.error(
          `[wp] HTTP ${res.status} from WordPress after ${RETRY_DELAYS_MS.length} retries - giving up`
        );
      }

      return res;
    } catch (error) {

      lastError = error;
      if (attempt < RETRY_DELAYS_MS.length) {
        const wait = RETRY_DELAYS_MS[attempt];
        console.warn(
          `[wp] ${(error as Error).message} - retry ${attempt + 1}/${RETRY_DELAYS_MS.length} in ${wait}ms`
        );
        await sleep(wait);
        continue;
      }
    }
  }

  throw lastError;
}

const API_URL = process.env.WORDPRESS_API_URL || "https://www.content.shelterinplace3.ca/graphql";
async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled.
  //
  // Every request goes through a shared limiter and a retry loop. The build
  // prerenders -190 pages and each getStaticProps issues several GraphQL
  // calls, with Next running one worker per CPU core - previously all of that
  // hit WordPress at once, which answered a growing share with 503 HTML error
  // pages. A failed fetch makes getStaticProps return notFound, so a transient
  // 503 was being baked into the build as a permanent 404.
  const res = await limit(() =>
    fetchWithRetry(API_URL, {
      headers,
      method: "POST",
      body: JSON.stringify({ query, variables }),
    })
  );

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            categories{
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
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      modified
      databaseId
      ACF_BlogsPost {
        seoMetaTitle
        seoMetaDescription
        socialogImage {
          altText
          # sourceUrl is the image file. Note MediaItem.uri is the attachment
          # *page* path (/client-stories/../attachment/..), not the image, so it
          # cannot be used for og:image.
          sourceUrl
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
            slug
            databaseId
          }
        }
      }
      tags {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export async function getAllPostsData() {
  const data = await fetchAPI(`
  fragment PostFields on Post {
    id
    categories {
      edges {
        node {
          databaseId
          id
          name
          slug
        }
      }
    }
    databaseId
    date
    isSticky
    postId
    slug
    title
  }
  query AllPosts {
    posts(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
         ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          content
          excerpt
          featuredImage {
            node {
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
            }
          }
          modified
        }
      }
    }
  }
  `);
  return data?.posts;
}

export async function getProverbData() {
  return await fetchAPI(`
  query ProverbQuery{
    generalSettings{
        proverb
      proverbImg
    }
}   
  `)
}

export async function getSearchInputData(searchVal){
return await fetchAPI(`
query SearchQuery {
  posts(where: {search: "${searchVal}"}) {
    nodes {
      title
       featuredImage {
            node {
              altText
              sourceUrl
            }
          }
      slug
      categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }

    }
  }
}
`)
} 