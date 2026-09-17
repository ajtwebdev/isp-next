import Link from "next/link";
import styled from "styled-components";

/**
 * Blog category / topics navigation.
 *
 * Extracted from components/blog/BlogList.js so the same nav can appear on
 * individual articles as well as the listing pages. BlogList still owns where
 * it sits on those pages; this module owns what it looks like.
 */

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0 0 2rem;
  padding: 0;
`;

const NavLink = styled((props) => <Link {...props} />)`
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

export default function BlogNav({
  categories = [],
  activeCategorySlug = null,
  activeTopicSlug = null,
  className,
}) {
  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <Nav aria-label="Blog categories" className={className}>
      <NavLink href="/blog" $active={!activeCategorySlug && !activeTopicSlug}>
        All
      </NavLink>
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          href={`/blog/${category.slug}`}
          $active={activeCategorySlug === category.slug}
        >
          {category.name}
        </NavLink>
      ))}
      <NavLink href="/blog/topics" $active={!!activeTopicSlug}>
        Topics
      </NavLink>
    </Nav>
  );
}
