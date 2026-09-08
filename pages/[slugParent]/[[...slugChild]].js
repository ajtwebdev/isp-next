import Link from "next/link";
import { Helmet } from "react-helmet";

import PageComponents from "lib/pageComponents";
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from "lib/pages";
import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import styled from "styled-components";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostPage from "../../components/blogPage";

export default function Page(props) {
  const { page, post } = props;

  if (post) {
    return (
      <>
        <PostPage {...props} />
      </>
    );
  }

  const {
    title,
    metaTitle,
    description,
    slug,
    content,
    featuredImage,
    children,
    acf,
  } = page;

  const hasFlexibleFields =
    Array.isArray(acf.flexibleFields) && acf.flexibleFields.length > 0;

  return (
    <LayoutJs>
      <Seo title={title} description={description} />
      <div>
        {/* Iterate over ACF flexible fields and pass props to imported component */}
        {hasFlexibleFields && (
          <div>
            {acf.flexibleFields.map((obj, index) => {
              let DynamicComponent = PageComponents.get(obj.type);
              if (DynamicComponent !== undefined && DynamicComponent !== null) {
                return <DynamicComponent key={index} {...obj} />;
              }
            })}
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </LayoutJs>
  );
}

export async function getStaticProps({
  params = {},
  preview = false,
  previewData,
} = {}) {
  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;
  let blogSlug = ""

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join("/")}/`;
    blogSlug = slugChild[0]
  }

  const { page } = await getPageByUri(pageUri);
  if (!page) {
    const allPosts = await getAllPostsWithSlug();
    const isBlog = allPosts.edges.find(
      ({ node }) => node.slug === blogSlug
    );
    if (!isBlog) {
      return {
        props: {},
        notFound: true,
      };
    }

    const data = await getPostAndMorePosts(
      blogSlug,
      preview,
      previewData
    );
    return {
      props: {
        preview,
        post: data.post,
        posts: data.posts,
      },
    };
  }

  // In order to show the proper breadcrumbs, we need to find the entire
  // tree of pages. Rather than querying every segment, the query should
  // be cached for all pages, so we can grab that and use it to create
  // our trail

  const { pages } = await getAllPages({
    queryIncludes: "index",
  });

  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  return {
    props: {
      page,
      breadcrumbs,
    },
  };
}

export async function getStaticPaths() {
  const { pages } = await getAllPages({
    queryIncludes: "all",
  });

  // Take all the pages and create path params. The slugParent will always be
  // the top level parent page, where the slugChild will be an array of the
  // remaining segments to make up the path or URI

  // We also filter out the `/` homepage as it will conflict with index.js if
  // as they have the same path, which will fail the build

  const paths = pages
    .filter(({ uri }) => typeof uri === "string" && uri !== "/")
    .map(({ uri }) => {
      const segments = uri.split("/").filter((seg) => seg !== "");

      return {
        params: {
          slugParent: segments.shift(),
          slugChild: segments,
        },
      };
    });

  const allPosts = await getAllPostsWithSlug();
  const allPostsPaths = allPosts.edges.flatMap(({ node }) =>
    node.categories.edges.map(({ node: categoryNode }) => ({
      params: { slugParent: categoryNode.slug, slugChild: [node.slug] },
    }))
  );

  return {
    paths: [...paths, ...allPostsPaths],
    fallback: "blocking",
  };
}
