import BlogList from "components/blog/BlogList";
import { getPaginatedPosts } from "lib/posts";
import { getAllCategories } from "lib/categories";

export default function Blog(props) {
  return <BlogList {...props} showReflectionsInvite />;
}

export async function getStaticProps() {
  try {
    const [{ posts, pagination }, categories] = await Promise.all([
      getPaginatedPosts({ currentPage: 1, queryIncludes: "all" }),
      getAllCategories(),
    ]);

    return {
      props: {
        posts: Array.isArray(posts) ? posts : [],
        categories,
        pagination: {
          ...pagination,
          basePath: "/blog",
        },
      },
    };
  } catch (error) {
    console.error("[blog] Failed to load blog posts:", error);

    return {
      props: {
        posts: [],
        pagination: null,
      },
    };
  }
}
