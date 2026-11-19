import Link from "next/link";
import { Helmet } from "react-helmet";

import PageComponents from "lib/pageComponents";
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from "lib/pages";
import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import styled from "styled-components";
import { Container } from "../../components/layoutComponents";

/**
 * "Contest closed." band at the top of /contest.
 *
 * The site header (components/headers/headerBasic.js) is position: fixed and
 * 73px tall: a 40px logo + 1em padding top and bottom + a 1px border. Below
 * 22em the logo drops to 30px, so the header is 63px - the same two values the
 * header's mobile nav uses for its `top`. The band's top padding clears that
 * height, then adds its own breathing room.
 *
 * Dark ground so it runs straight into the dark Banner beneath it. White
 * Trajan rather than burgundy: burgundy on black is only 1.74:1.
 */
const ContestClosedNotice = styled.div`
  background: var(--clr-dark);
  color: var(--txt-light);
  padding: calc(73px + 2.5rem) 0 1.5rem;

  @media screen and (max-width: 22em) {
    padding-top: calc(63px + 2rem);
  }

  p {
    margin: 0;
    text-align: center;
    font-family: var(--ff-trajan);
    font-size: clamp(1.5rem, 1.1rem + 2vw, 2.25rem);
    line-height: 1.2;
    letter-spacing: 0.08em;
  }
`;

export default function Page(props) {
  const { page } = props;

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
        {/* The Be Bold contest has ended. The page stays published as a record;
            this notice sits above its banner ("Be Bold Contest"). */}
        {slug === "contest" && (
          <ContestClosedNotice>
            <Container>
              <p>Contest closed.</p>
            </Container>
          </ContestClosedNotice>
        )}

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

  try {
    // We can use the URI to look up our page and subsequently its ID, so
    // we can first contruct our URI from the page params

    let pageUri = `/${slugParent}/`;

    // We only want to apply deeper paths to the URI if we actually have
    // existing children

    if (Array.isArray(slugChild) && slugChild.length > 0) {
      pageUri = `${pageUri}${slugChild.join("/")}/`;
    }

    const { page } = await getPageByUri(pageUri);

    // Blog articles are served by pages/blog/[slug].js; legacy
    // category-prefixed URLs are 301'd there from next.config.js.
    if (!page) {
      return {
        props: {},
        notFound: true,
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
  } catch (error) {
    console.error("[slugParent] Failed to load page data:", error);

    return {
      props: {},
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
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

    const uniquePaths = new Map();
    paths.forEach((entry) => {
      const key = [
        entry.params.slugParent,
        ...(Array.isArray(entry.params.slugChild)
          ? entry.params.slugChild
          : [entry.params.slugChild]),
      ]
        .filter(Boolean)
        .join("/");

      if (!uniquePaths.has(key)) {
        uniquePaths.set(key, entry);
      }
    });

    return {
      paths: Array.from(uniquePaths.values()),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("[slugParent] Failed to generate static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}