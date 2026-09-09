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
import { ButtonPrimary } from "../buttons";
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

// Invitation to the journal, sitting directly under the story it refers to.
// Deliberately lighter than the full-width <CTA> further down so the article
// does not end in two competing calls to action.
const ReflectionsCta = styled.aside`
  margin: 2rem 0;
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(17, 17, 17, 0.14);
  border-radius: 12px;
  text-align: center;

  h2 {
    font-size: 1.1rem;
    margin: 0 0 0.6rem;
  }

  p {
    margin: 0 auto 1.5rem;
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--txt-dark-secondary, #4b5563);
  }
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

  // SEO values authored in WordPress (ACF group "ACF_BlogsPost") win when set.
  // Each falls back to what the page did before: the post title, the excerpt,
  // and <Seo>'s default OG image.
  const acf = post?.ACF_BlogsPost || {};
  const customTitle = acf.seoMetaTitle?.trim();
  // seoMetaDescription is a rich-text field, so WordPress returns it wrapped in
  // markup ("<p>...</p>\n"). Meta tags need plain text or the tags render as
  // escaped &lt;p&gt; in the description.
  const customDescription = toPlainText(acf.seoMetaDescription);
  const customOgImage = acf.socialogImage?.sourceUrl?.trim();

  const articleTitle = customTitle || post?.title;

  // undefined (not "") so <Seo> applies its own default rather than emitting
  // an empty tag.
  const articleDescription =
    customDescription || truncateForMeta(toPlainText(post?.excerpt)) || undefined;

  const articleOgImage = customOgImage || undefined;

  return (
    <LayoutJs>
      <Seo
        title={articleTitle}
        description={articleDescription}
        ogImage={articleOgImage}
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

                <ReflectionsCta aria-label="Receive Reflections Journal">
                  <h2>Enjoyed this story? Receive Reflections Journal.</h2>
                  <p>
                    Twice each month, Mark shares stories, photographs,
                    insights, and occasional studio news from Inner Spirit
                    Photography.
                  </p>
                  <ButtonPrimary href="/reflections">
                    Receive Reflections Journal
                  </ButtonPrimary>
                </ReflectionsCta>

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