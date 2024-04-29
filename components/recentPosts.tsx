import React from "react";
import LayoutJs from "../components/layoutJs";
import { Container, Section } from "../components/layoutComponents";
import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/seo";
import { getAllPosts, postPathBySlugCategory } from "../lib/posts";

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

const StyledCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 26%;
`;

const StyledCardContainer = styled.div`
  padding: 10px;
  color: black;
`;

const CategoryContainer = styled.div`
  h2 {
    border-bottom: 1px solid #80808091;
    padding: 4px;
    margin-bottom: 14px;
  }
`;

const CategoryPostContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const PostContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

export default function Recent({ posts }) {
  return (
    <Section>
      <PostContainer>
        {Object.keys(posts).map((cat_id, index) => {
          const catgoryPost = posts[cat_id] || {};
          return (
            <CategoryContainer key={index}>
              <h2>{catgoryPost?.categoryName}</h2>
              <CategoryPostContainer>
                {catgoryPost?.posts?.slice(0, 6)?.map((post, index) => {
                  const categorySlug =
                    post?.categories?.length > 0
                      ? post?.categories[0]?.slug
                      : "";
                  return (
                    <StyledCard key={index}>
                      <Link
                        className="spacing accent"
                        href={postPathBySlugCategory(post.slug, categorySlug)}
                      >
                        <img
                          src={post?.featuredImage?.sourceUrl}
                          alt="Avatar"
                        ></img>
                        <StyledCardContainer>
                          <h4>
                            <b> {post?.title}</b>
                          </h4>
                          <Excerpt
                            dangerouslySetInnerHTML={{ __html: post?.excerpt }}
                          />
                        </StyledCardContainer>
                      </Link>
                    </StyledCard>
                  );
                })}
              </CategoryPostContainer>
            </CategoryContainer>
          );
        })}
      </PostContainer>
    </Section>
  );
}

const getPostByCategory = (posts) => {
  const postsByCategory = {};
  posts = posts.sort(
    (a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime()
  );
  // Iterate over the posts array
  for (const post of posts) {
    const categories = post.categories;

    // Iterate over the categories of each post
    for (const category of categories) {
      const categoryId = category.id;

      // Check if the category exists in the postsByCategory object
      if (!postsByCategory.hasOwnProperty(categoryId)) {
        // If the category does not exist, create an empty array for it
        postsByCategory[categoryId] = {
          categoryName: category.name,
          posts: [],
        };
      }

      // Push the post into the corresponding category's posts array
      postsByCategory[categoryId].posts.push(post);
    }
  }
  return postsByCategory;
};

export async function getStaticProps() {
  const { posts } = await getAllPosts({
    queryIncludes: "all",
  });
  return {
    props: {
      posts: getPostByCategory(posts),
    },
  };
}
