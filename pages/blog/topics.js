import Link from "next/link";
import styled from "styled-components";

import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import BlogBanner from "../../components/banners/blogBanner";
import { Section, Container } from "../../components/layoutComponents";
import { getAllTags } from "../../lib/tags";

/* Shares the list's width and left edge so the two read as one block. */
const Intro = styled.p`
  margin: 0 auto 1.75rem;
  max-width: 56rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--txt-dark-secondary, #4b5563);

  @media screen and (max-width: 34em) {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
`;

/* Left-aligned rather than centred: 44 pills of differing widths produced
   ragged edges and left a single orphan on the last row. */
const TopicList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 56rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  @media screen and (max-width: 34em) {
    gap: 0.45rem;
  }
`;

// Matches the pill treatment of CategoryLink in components/blog/BlogList.js.
const TopicLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid rgba(17, 17, 17, 0.18);
  border-radius: 999px;
  font-size: 0.78rem;
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

  &:hover span {
    color: var(--txt-light);
    opacity: 0.75;
  }

  /* The count is reference information, not part of the label. */
  span {
    font-size: 0.68rem;
    font-variant-numeric: tabular-nums;
    color: var(--txt-dark-secondary, #4b5563);
    opacity: 0.7;
  }

  @media screen and (max-width: 34em) {
    padding: 0.4rem 0.7rem;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }
`;

export default function TopicsPage({ tags = [] }) {
  return (
    <LayoutJs>
      <Seo
        title="Topics | Inner Spirit Photography"
        description="Browse the Inner Spirit Photography blog by topic, from boudoir and body confidence to body painting and behind-the-image stories."
      />

      <BlogBanner
        to1="/"
        link1="Home"
        to2="/blog/topics"
        link2="Topics"
        headline="Topics"
        description="Every subject the blog covers, gathered in one place."
      />

      <Section>
        <Container>
          <Intro>
            Browse the blog by topic. Each one gathers the stories that share
            it.
          </Intro>

          <TopicList aria-label="All topics">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <TopicLink href={`/blog/topics/${tag.slug}`}>
                  {tag.name}
                  <span>{tag.count}</span>
                </TopicLink>
              </li>
            ))}
          </TopicList>
        </Container>
      </Section>
    </LayoutJs>
  );
}

export async function getStaticProps() {
  try {
    const tags = await getAllTags();

    return {
      props: {
        // Busiest topics first, so the most useful entry points lead.
        tags: tags.slice().sort((a, b) => (b.count || 0) - (a.count || 0)),
      },
    };
  } catch (error) {
    console.error("[blog/topics] Failed to load tags:", error);

    return { props: { tags: [] } };
  }
}
