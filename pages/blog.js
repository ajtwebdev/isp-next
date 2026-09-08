import BlogList from "components/blog/BlogList";
import { getPaginatedPosts } from "lib/posts";

export default function Blog(props) {
  return <BlogList {...props} showReflectionsInvite />;
}

export async function getStaticProps() {
  try {
    const { posts, pagination } = await getPaginatedPosts({
      currentPage: 1,
      queryIncludes: "all",
    });

    return {
      props: {
        posts: Array.isArray(posts) ? posts : [],
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
