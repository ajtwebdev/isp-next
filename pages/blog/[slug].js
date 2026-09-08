import { getAllPosts, getRelatedPosts } from "../../lib/posts";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import { getPostByCategory } from "../recent-posts";
import BlogList from "../../components/blog/BlogList";
import PostPage from "../../components/blogPage";

/**
 * A single dynamic segment under /blog serves two kinds of content:
 * an article (/blog/she-came-to-celebrate-herself) or a category archive
 * (/blog/confidence). Posts take precedence over categories.
 */
export default function BlogSlugPage(props) {
  const { post, catgoryPost } = props;

  if (post) {
    return <PostPage {...props} />;
  }

  if (!catgoryPost?.posts?.length) {
    return null;
  }

  return (
    <BlogList
      posts={catgoryPost.posts}
      pagination={null}
      bannerHeadline={catgoryPost.categoryName}
      activeCategorySlug={catgoryPost.categorySlug}
      seoTitle={catgoryPost.categoryName}
      seoDescription={`Browse ${catgoryPost.categoryName} posts on the Inner Spirit Photography blog.`}
      gridMode="auto"
    />
  );
}

export async function getStaticProps({
  params = {},
  preview = false,
  previewData,
} = {}) {
  const { slug } = params;

  try {
    // Posts win over categories, so look for an article first.
    const allPosts = await getAllPostsWithSlug();
    const isBlog = allPosts?.edges?.find(({ node }) => node.slug === slug);

    if (isBlog) {
      const data = await getPostAndMorePosts(slug, preview, previewData);

      const categories = (data.post?.categories?.edges || []).map(
        ({ node }) => node
      );
      // Dev-only visibility into whether WordPress actually returned a featured
      // image for this post: it feeds og:image/twitter:image, and a missing one
      // silently falls back to the generic site image.
      if (process.env.NODE_ENV === "development") {
        const featured = data.post?.featuredImage?.node?.sourceUrl;
        console.log(
          `[blog] ${slug} — featured image: ${featured || "MISSING (falls back to default OG image)"}`
        );
      }

      const related = await getRelatedPosts(
        categories,
        data.post?.databaseId,
        3
      );

      return {
        props: {
          preview,
          post: data.post,
          // RelatedPosts consumes mapPostData's flat shape directly, which is
          // exactly what getRelatedPosts already returns.
          posts: Array.isArray(related?.posts) ? related.posts : [],
        },
      };
    }

    // Otherwise fall back to a category archive.
    const { posts } = await getAllPosts({
      queryIncludes: "all",
    });
    const postsByCategory = getPostByCategory(posts);
    const catgoryPost = Object.values(postsByCategory).find(
      (item) => item?.categorySlug === slug
    );

    if (!catgoryPost) {
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        catgoryPost,
      },
    };
  } catch (error) {
    console.error("[blog/slug] Failed to load blog page data:", error);

    return {
      props: {},
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const [allPosts, { posts }] = await Promise.all([
      getAllPostsWithSlug(),
      getAllPosts({ queryIncludes: "all" }),
    ]);

    const postPaths = (allPosts?.edges || []).map(({ node }) => node.slug);

    const categoryPaths = [].concat(
      ...(posts?.map((item) =>
        item?.categories?.map((category) => category?.slug)
      ) || [])
    );

    // Posts are added first so a slug shared with a category resolves as a post,
    // matching the precedence in getStaticProps.
    const uniqueSlugs = [...new Set([...postPaths, ...categoryPaths])].filter(
      Boolean
    );

    return {
      paths: uniqueSlugs.map((slug) => ({ params: { slug } })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("[blog/slug] Failed to generate static paths:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}