import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ErrorPage from "next/error";
import styled from "styled-components";
import Image from "../Image";
import commentBox from "commentbox.io";

import Seo from "../seo";
import { ArticleJsonLd, toPlainText } from "lib/json-ld";
import ArticleAuthorBio from "../blog/ArticleAuthorBio";
import RelatedPosts from "../blog/RelatedPosts";
import CTA from "../CTA";
import { Section, Container, HeroBannerPadding } from "../layoutComponents";
import LayoutJs from "../layoutJs";

const Content = styled.div`
  width: 100%;
`;

const BlogWrapper = styled.div`
  max-width: 880px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  div {
    img {
      width: 100%;
      margin: 0;
    }
  }

  h1 {
    font-size: var(--fs-1);
  }

  h2 {
    font-size: var(--fs-1);
    margin-top: 2em;
  }

  h3 {
    font-size: var(--fs-3);
  }

  h1,
  h2,
  h3. h4,
  h5,
  h6 {
    margin-top: 2em;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2em;
  }
`;

const TextWrapper = styled.section`
  figure {
    @media screen and (max-width: 48em) {
      margin: 0;
    }
  }
`;

const EndOfArticle = styled.div`
  margin-top: 1.5rem;
  padding-top: 0;
`;

const FooterDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(17, 17, 17, 0.18);
  margin: 1.5rem 0 2rem;
`;

const BackToBlogLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0 2rem;
  color: var(--clr-dark);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
`;

// Search engines truncate descriptions around 155-160 characters; cut on a word
// boundary so the snippet does not end mid-word.
const META_DESCRIPTION_MAX = 155;

function truncateForMeta(text) {
  if (!text) return "";
  if (text.length <= META_DESCRIPTION_MAX) return text;

  const clipped = text.slice(0, META_DESCRIPTION_MAX);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[.,;:\s]+$/, "")}\u2026`;
}

export default function PostPage({ post, posts = [] }) {
  const router = useRouter();

  useEffect(() => {
    commentBox("5661567546818560-proj");
  }, []);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // Article-specific meta/OG/Twitter description from the post excerpt. When a
  // post has no excerpt this stays undefined so <Seo> falls back to the generic
  // site description rather than emitting an empty tag.
  const articleDescription = truncateForMeta(toPlainText(post?.excerpt)) || undefined;

  return (
    <LayoutJs>
      <Seo
        title={post.title}
        description={articleDescription}
        ogImage={post.featuredImage?.node?.sourceUrl}
        ogType="article"
      />
      <ArticleJsonLd post={post} />
      <HeroBannerPadding />
      <Section>
        <Container>
          <Content>
            <BlogWrapper
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h1 className="headline" itemProp="headline">
                  {post.title}
                </h1>
              </header>

              {post.featuredImage ? (
                <Image
                  src={post.featuredImage?.node.sourceUrl}
                  alt={post.title}
                />
              ) : null}

              {!!post.content && (
                <TextWrapper itemProp="articleBody">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </TextWrapper>
              )}

              <EndOfArticle>
                <FooterDivider />

                <ArticleAuthorBio />

                <RelatedPosts posts={posts} limit={3} />

                <BackToBlogLink href="/blog">
                  <span aria-hidden="true">←</span>
                  <span>Back to Blog</span>
                </BackToBlogLink>

                <CTA
                  headline="Plan Your Session"
                  subhead="Your story deserves a beautiful frame"
                  description="Create a boudoir experience that feels confident, safe, and unforgettable."
                  buttonLabel="Plan Your Session"
                  buttonHref="/contact"
                />
              </EndOfArticle>
            </BlogWrapper>
          </Content>
        </Container>
      </Section>
    </LayoutJs>
  );
}