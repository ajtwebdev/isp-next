import BlogList from "components/blog/BlogList";
import { getAllPosts } from "lib/posts";
import { getAllCategories } from "lib/categories";
import { getAllTags, filterPostsByTag } from "lib/tags";

/**
 * A single topic archive: /blog/topics/{tag-slug}.
 *
 * Topics live under their own path segment rather than /blog/{slug} so they
 * cannot collide with article or category slugs (several tags share a name
 * with a category, e.g. "body-painting"). Article URLs stay /blog/{slug}.
 */
export default function TopicArchive({ posts, categories, tagName, tagSlug }) {
  return (
    <BlogList
      posts={posts}
      pagination={null}
      categories={categories}
      bannerHeadline={tagName}
      seoTitle={`${tagName} | Topics | Inner Spirit Photography`}
      seoDescription={`Blog posts about ${tagName} from Inner Spirit Photography.`}
      intro={`Stories tagged ${tagName}.`}
      activeTopicSlug={tagSlug}
      gridMode="auto"
    />
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slug } = params;

  try {
    const [{ posts }, tags, categories] = await Promise.all([
      // "archive" carries everything BlogList renders (title, excerpt,
      // featured image, categories, tags) but omits full post content, which
      // otherwise pushed this page's data past 500kB.
      getAllPosts({ queryIncludes: "archive" }),
      getAllTags(),
      getAllCategories(),
    ]);

    const tag = tags.find((item) => item.slug === slug);
    const tagPosts = filterPostsByTag(posts, slug);

    if (!tag || tagPosts.length === 0) {
      return { props: {}, notFound: true };
    }

    return {
      props: {
        posts: tagPosts,
        categories,
        tagName: tag.name,
        tagSlug: tag.slug,
      },
    };
  } catch (error) {
    console.error("[blog/topics/slug] Failed to load topic archive:", error);

    return { props: {}, notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const tags = await getAllTags();

    return {
      paths: tags.map((tag) => ({ params: { slug: tag.slug } })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("[blog/topics/slug] Failed to generate paths:", error);

    return { paths: [], fallback: "blocking" };
  }
}
