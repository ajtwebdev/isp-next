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
import BlogNav from "../blog/BlogNav";
import CTA from "../CTA";
import { Section, Container, HeroBannerPadding } from "../layoutComponents";
import { ButtonPrimary } from "../buttons";
import LayoutJs from "../layoutJs";

const Content = styled.div`
  width: 100%;
`;

// Aligns the nav with the article column below it rather than the full
// container width, which left the two starting at different left edges.
const NavWrapper = styled.div`
  max-width: 880px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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

// Topics (WordPress tags) for this article. Same pill treatment as the blog
// nav and /blog/topics so the three read as one system.
const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
`;

const TopicLabel = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--txt-dark-secondary, #4b5563);
  margin-right: 0.25rem;
`;

const TopicLink = styled(Link)`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border: 1px solid rgba(17, 17, 17, 0.18);
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--clr-dark);
  transition: all 0.2s ease;

  &:hover {
    background: var(--clr-accent);
    border-color: var(--clr-accent);
    color: var(--txt-light);
  }
`;

// Thin invitation to the journal. Deliberately a rule-bounded row rather than
// a bordered card: the article already sits inside one, and a second box read
// as a card inside a card. Uses the same hairline as FooterDivider.
const ReflectionsCta = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  margin: 1.5rem 0;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(17, 17, 17, 0.18);
  border-bottom: 1px solid rgba(17, 17, 17, 0.18);

  /* Stack only when the row genuinely cannot fit, keeping mobile height low. */
  @media screen and (max-width: 34em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const ReflectionsCopy = styled.div`
  h2 {
    margin: 0 0 0.15rem;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--txt-dark-secondary, #4b5563);
  }
`;

// Slightly tighter than the page's default button so the row stays thin.
const ReflectionsButton = styled(ButtonPrimary)`
  flex-shrink: 0;
  padding: 0.7em 1.1em;
  white-space: nowrap;
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

export default function PostPage({ post, posts = [], categories = [] }) {
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

  // WordPress tags, surfaced as "Topics".
  const topics = (post?.tags?.edges || [])
    .map(({ node }) => node)
    .filter((tag) => tag?.slug);

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
          <NavWrapper>
            <BlogNav
              categories={categories}
              activeCategorySlug={post?.categories?.edges?.[0]?.node?.slug}
            />
          </NavWrapper>

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

                {topics.length > 0 && (
                  <TopicList aria-label="Topics">
                    <TopicLabel>Topics</TopicLabel>
                    {topics.map((tag) => (
                      <TopicLink
                        key={tag.slug}
                        href={`/blog/topics/${tag.slug}`}
                      >
                        {tag.name}
                      </TopicLink>
                    ))}
                  </TopicList>
                )}

                <ReflectionsCta aria-label="Reflections Journal">
                  <ReflectionsCopy>
                    <h2>Reflections Journal</h2>
                    <p>A little inspiration, delivered to your inbox.</p>
                  </ReflectionsCopy>
                  <ReflectionsButton href="/reflections">
                    Join the journal
                  </ReflectionsButton>
                </ReflectionsCta>

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