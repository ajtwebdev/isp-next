import BlogList from "components/blog/BlogList";
import { getAllPosts, getPagesCount, getPaginatedPosts } from "lib/posts";
import { getAllCategories } from "lib/categories";

export default function BlogPage({ posts, pagination, categories }) {
  return (
    <BlogList posts={posts} pagination={pagination} categories={categories} />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  try {
    const page = Number(params?.page || 1);
    const [{ posts, pagination }, categories] = await Promise.all([
      getPaginatedPosts({ currentPage: page, queryIncludes: "all" }),
      getAllCategories(),
    ]);

    if (!pagination?.currentPage) {
      return {
        props: {},
        notFound: true,
      };
    }

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
    console.error("[blog/page] Failed to load paginated blog posts:", error);

    return {
      props: {
        posts: [],
        pagination: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({ queryIncludes: "all" });
  const pagesCount = await getPagesCount(posts);

  const paths = Array.from({ length: pagesCount }, (_, index) => ({
    params: { page: String(index + 1) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}