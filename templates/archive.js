import { Helmet } from "react-helmet";

// import { WebpageJsonLd } from "lib/json-ld";
// import { helmetSettingsFromMetadata } from "lib/site";
// import useSite from "hooks/use-site";

import LayoutJs from "components/layoutJs";
import {
  Section,
  Container,
  HeroBannerPadding,
} from "../components/layoutComponents";
import Pagination from "components/Pagination/Pagination";
import Image from "components/Image";

import styles from "styles/templates/Archive.module.scss";
import styled from "styled-components";
import Link from "next/link";
import Seo from "../components/seo";
import { postPathBySlug, sanitizeExcerpt } from "lib/posts";

const device = {
  md: "48em",
};

const Article = styled.article`
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: var(--shadow-light);
  border-raidus: var(--br);
  display: flex;
  align-items: center;
  img {
    /* width: 100%; */
  }
  @media screen and (max-width: ${device.md}) {
    flex-direction: column;
  }

  & > * {
    width: 100%;
  }

  & > * + * {
    margin-left: 2em;

    @media screen and (max-width: ${device.md}) {
      margin-left: 0;
      margin-top: var(--spacer);
    }
  }
`;

const Ol = styled.ol`
  list-style-type: none;
`;

const Text = styled.div`
  padding: 2em;

  h2 {
    color: var(--clr-accent);
  }
  @media screen and (max-width: 400px) {
    h2 {
      font-size: var(--fs-3);
    }
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Banner
const BannerGrid = styled.div`
  display: grid;
  grid-template-rows: auto 4em auto;
`;

const BannerWrapper = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / -1;
  z-index: 1;
  background: url("http://21-pl.purpleparrotwebsites.com/wp-content/uploads/2023/05/calgary-landscaping-testimonials-banner.jpg"),
    rgba(0, 0, 0, 0.7);
  background-blend-mode: overlay;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 4em 0;

  display: grid;
  place-items: center;

  min-height: 80vh;
  height: 100%;

  @media screen and (max-width: 26em) {
    min-height: 100vh;
    height: 100%;
  }
`;

const BannerText = styled.div`
  max-width: 140ch;
  width: 100%;
  color: var(--txt-light);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const Excerpt = styled.div`
  font-size: var(--fs-sm);
`;

const BannerBottomText = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / -1;
  z-index: 2;

  background: var(--clr-dark);
  color: var(--txt-light);
  padding: 2em;
  width: 80%;
`;

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = "Archive",
  Title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  //   const { metadata: siteMetadata = {} } = useSite();

  //   if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
  //     metadata.title = `${title} - ${siteMetadata.title}`;
  //     metadata.og.title = metadata.title;
  //     metadata.twitter.title = metadata.title;
  //   }

  //   const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <LayoutJs>
      {/* <Helmet {...helmetSettings} /> */}

      {/* <WebpageJsonLd
        title={title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      /> */}
      <Seo
        title="Inner Spirit Photography Blog"
        description="The Inner Spirit Photo blog."
      />
      <Section>
        <Container>
          {Array.isArray(posts) && (
            <>
              <ul>
                {posts.map((post) => {
                  return (
                    <Ol key={post.slug}>
                      <Article
                        className="post-list-item"
                        itemScope
                        itemType="http://schema.org/Article"
                      >
                        {post.featuredImage ? (
                          <Image
                            alt={post.featuredImage.altText || ""}
                            srcSet={post.featuredImage.srcSet}
                            src={post.featuredImage.src}
                          />
                        ) : null}

                        <Text>
                          <header>
                            <h2 className="subheader upper">
                              <Link
                                className="spacing accent"
                                href={postPathBySlug(post.slug)}
                              >
                                {post.title}
                              </Link>
                            </h2>
                            <Excerpt
                              dangerouslySetInnerHTML={{ __html: post.excerpt }}
                            />
                          </header>
                        </Text>
                      </Article>
                    </Ol>
                  );
                })}
              </ul>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
        </Container>
      </Section>
    </LayoutJs>
  );
}