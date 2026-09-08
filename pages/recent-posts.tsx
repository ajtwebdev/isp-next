import React from "react"
import LayoutJs from "../components/layoutJs"
import { Container, Section } from "../components/layoutComponents"
import Link from "next/link"
import styled from "styled-components"
import Seo from "../components/seo"
import { getAllPosts, postPathBySlugCategory } from "../lib/posts"
import PostList from "../components/recent-posts/components/PostList"

const BannerWrapper = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / -1;
  z-index: 1;
  background: url("http://www.wp-content.shelterinplace3.ca/wp-content/uploads/2023/03/IMGP2222-scaled-1.jpg"),
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
`

const BannerText = styled.div`
  max-width: 140ch;
  width: 100%;
  color: var(--txt-light);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

export default function RecentPosts({ posts }) {
  return (
    <LayoutJs>
      <Seo
        title="Recent Posts | Inner Spirit Photography"
        description="Recent posts from Inner Spirit Photography."
      />
      <p>Recent Posts</p>
    </LayoutJs>
  )
}

export const getPostByCategory = (posts) => {
  const postsByCategory = {}
  posts = posts.sort(
    (a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime()
  )
  // Iterate over the posts array
  for (const post of posts) {
    const categories = Array.isArray(post.categories)
      ? post.categories
      : post.categories.edges
    // Iterate over the categories of each post
    for (const category of categories) {
      const categoryId = category?.id || category?.node?.id
      // Check if the category exists in the postsByCategory object
      if (!postsByCategory.hasOwnProperty(categoryId)) {
        // If the category does not exist, create an empty array for it
        postsByCategory[categoryId] = {
          categoryName: category?.name || category?.node?.name,
          categorySlug: category?.slug || category?.node?.slug,
          posts: [],
        }
      }

      // Push the post into the corresponding category's posts array
      postsByCategory[categoryId].posts.push(post)
    }
  }
  return postsByCategory
}

export async function getStaticProps() {
  const { posts } = await getAllPosts({
    queryIncludes: "all",
  })
  return {
    props: {
      posts: getPostByCategory(posts),
    },
  }
}
