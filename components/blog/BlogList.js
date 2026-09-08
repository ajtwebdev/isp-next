import React from "react";
import LayoutJs from "../layoutJs";
import { Container, Section } from "../layoutComponents";
import Link from "next/link";
import styled from "styled-components";
import Image from "components/Image";
import { postPathBySlug, sanitizeExcerpt } from "lib/posts";
import Seo from "../seo";
import Pagination from "components/Pagination";
import BlogBanner from "../banners/blogBanner";

const device = {
  md: "48em",
  lg: "64em",
};

const CategoryNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0 0 2rem;
  padding: 0;
`;

const CategoryLink = styled((props) => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.55rem 1rem;
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--clr-accent);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: var(--fw-button);
  transition: all 0.2s ease;

  ${(props) =>
    props.$active
      ? `
        background: var(--clr-accent);
        color: var(--txt-light);
        border-color: var(--clr-accent);
      `
      : ""}

  &:hover,
  &:focus {
    background: var(--clr-accent);
    color: var(--txt-light);
    border-color: var(--clr-accent);
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  width: 100%;
  min-width: 0;

  @media screen and (max-width: ${device.md}) {
    grid-template-columns: 1fr;
  }

  ${(props) =>
    props.$mode === "auto"
      ? `
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

        @media screen and (max-width: ${device.md}) {
          grid-template-columns: 1fr;
        }
      `
      : ""}
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  background: var(--clr-light);
  border: 1px solid rgba(17, 17, 17, 0.06);
  border-radius: var(--br);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft);
  }
`;

const CardLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(17, 17, 17, 0.04);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.25rem 1.5rem;
  min-width: 0;
`;

const CategoryBadge = styled.span`
  color: var(--clr-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: var(--fw-button);
  display: inline-block;
  width: fit-content;
`;

const CardTitle = styled.h2`
  margin: 0;
  color: var(--clr-accent);
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  line-height: 1.3;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const Excerpt = styled.div`
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.7;
  color: var(--txt-dark-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

// Short category intro rendered above the post grid on /blog/{category}.
const CategoryIntro = styled.p`
  margin: 0 auto 2rem;
  max-width: 720px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--txt-dark-secondary, #4b5563);
`;

// Small, unobtrusive invitation shown only on the main /blog index.
const ReflectionsInvite = styled.p`
  margin: 2.5rem auto 0;
  max-width: 640px;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--txt-dark-secondary, #4b5563);

  a {
    display: inline;
    color: var(--clr-accent);
    text-decoration: underline;
  }
`;

export default function BlogList({
  posts,
  pagination,
  bannerHeadline = "Blog",
  activeCategorySlug = null,
  seoTitle = "Inner Spirit Photography Blogs",
  seoDescription = "Welcome to the Inner Spirit Photo blogs!",
  gridMode = "fixed",
  intro = "",
  showReflectionsInvite = false,
}) {
  const categoryLinks = Array.from(
    new Map(
      posts
        .flatMap((post) => post.categories || [])
        .filter(Boolean)
        .map((category) => [category.slug, category])
    ).values()
  );

  return (
    <LayoutJs>
      <Seo title={seoTitle} description={seoDescription} />
      <BlogBanner
        to1="/"
        link1="Home"
        to2="/blog"
        link2="Blog"
        headline={bannerHeadline}
      />
      <Section>
        <Container>
          {categoryLinks.length > 0 && (
            <CategoryNav aria-label="Blog categories">
              <CategoryLink href="/blog" $active={!activeCategorySlug}>
                All
              </CategoryLink>
              {categoryLinks.map((category) => (
                <CategoryLink
                  key={category.slug}
                  href={`/blog/${category.slug}`}
                  $active={activeCategorySlug === category.slug}
                >
                  {category.name}
                </CategoryLink>
              ))}
            </CategoryNav>
          )}

          {intro ? <CategoryIntro>{intro}</CategoryIntro> : null}

          <PostsGrid $mode={gridMode}>
            {posts.map((post) => {
              const category = post.categories?.[0];
              const formattedExcerpt = sanitizeExcerpt(post.excerpt || "");

              return (
                <Article
                  key={post.slug}
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <CardLink
                    href={postPathBySlug(post.slug)}
                    aria-label={post.title}
                  >
                    {post.featuredImage ? (
                      <Media>
                        <Image
                          alt={post.featuredImage.altText || post.title || ""}
                          srcSet={post.featuredImage.srcSet}
                          src={post.featuredImage.src}
                          width="100%"
                          height="auto"
                        />
                      </Media>
                    ) : null}

                    <CardBody>
                      {category?.name ? (
                        <CategoryBadge>{category.name}</CategoryBadge>
                      ) : null}

                      <CardTitle>{post.title}</CardTitle>

                      <Excerpt
                        dangerouslySetInnerHTML={{ __html: formattedExcerpt }}
                      />
                    </CardBody>
                  </CardLink>
                </Article>
              );
            })}
          </PostsGrid>

          {pagination && (
            <Pagination
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}

          {showReflectionsInvite && (
            <ReflectionsInvite>
              Enjoying these stories?{" "}
              <Link href="/reflections">Receive Reflections Journal</Link> —
              twice a month, straight from the studio.
            </ReflectionsInvite>
          )}
        </Container>
      </Section>
    </LayoutJs>
  );
}