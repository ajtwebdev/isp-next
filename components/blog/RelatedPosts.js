import Link from "next/link";
import styled from "styled-components";

import Image from "components/Image";
import { postPathBySlug, sanitizeExcerpt } from "lib/posts";

// Matches the breakpoints and card treatment used by components/blog/BlogList.js
// so related articles read as the same card system as /blog and category pages.
const device = {
  md: "48em",
  lg: "64em",
};

const Wrapper = styled.section`
  margin-top: 2.5rem;
`;

const Heading = styled.h2`
  margin: 0 0 1.5rem;
  color: var(--clr-dark);
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  line-height: 1.2;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  width: 100%;
  min-width: 0;

  @media screen and (max-width: ${device.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: ${device.md}) {
    grid-template-columns: 1fr;
  }
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

  figure,
  figure > div {
    margin: 0;
    width: 100%;
    height: 100%;
  }

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

const CardTitle = styled.h3`
  margin: 0;
  color: var(--clr-accent);
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  line-height: 1.3;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const Excerpt = styled.div`
  margin: 0;
  font-size: 0.92rem;
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

export default function RelatedPosts({ posts = [], limit = 3 }) {
  const related = (Array.isArray(posts) ? posts : []).slice(0, limit);

  if (related.length === 0) return null;

  return (
    <Wrapper aria-label="More stories">
      <Heading>More Stories</Heading>

      <PostsGrid>
        {related.map((post) => {
          const category = post.categories?.[0];
          const excerpt = sanitizeExcerpt(post.excerpt || "");

          return (
            <Article
              key={post.slug}
              itemScope
              itemType="http://schema.org/Article"
            >
              <CardLink href={postPathBySlug(post.slug)} aria-label={post.title}>
                {post.featuredImage ? (
                  <Media>
                    <Image
                      alt={post.featuredImage.altText || post.title || ""}
                      src={post.featuredImage.sourceUrl}
                      srcSet={post.featuredImage.srcSet}
                      width="100%"
                      height="auto"
                    />
                  </Media>
                ) : null}

                <CardBody>
                  {category?.name ? (
                    <CategoryBadge>{category.name}</CategoryBadge>
                  ) : null}

                  <CardTitle
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  {excerpt ? (
                    <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
                  ) : null}
                </CardBody>
              </CardLink>
            </Article>
          );
        })}
      </PostsGrid>
    </Wrapper>
  );
}