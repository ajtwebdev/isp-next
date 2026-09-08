import React from "react";
import Image from "next/image";
import LayoutJs from "../../layoutJs";
import { Container, Section } from "../..//layoutComponents";
import Link from "next/link";
import styled from "styled-components";
import Seo from "../../seo";
import { postPathBySlug } from "../../../lib/posts";

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

const PostHeading = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const PostList = ({ posts }) => {
  return (
    <Section>
      <PostHeading>Recent Posts</PostHeading>
      <PostContainer>
        {(posts && Object.keys(posts).length > 0) ? Object.keys(posts).map((cat_id, index) => {
          const catgoryPost = posts[cat_id] || {};
          return (
            <CategoryContainer key={index}>
              <h2>{catgoryPost?.categoryName}</h2>
              <CategoryPostContainer>
              {catgoryPost?.posts?.slice(0,6)?.map((post, index) => {
                return (
                  <StyledCard key={index}>
                  <Link
                  className="spacing accent"
                  href={postPathBySlug(post.slug)}
                >
                    {(() => {
                      const imgSrc = post?.featuredImage?.sourceUrl || post?.featuredImage?.node?.sourceUrl;
                      return imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={post?.title || "Avatar"}
                          width={400}
                          height={250}
                          style={{ objectFit: "cover" }}
                        />
                      ) : null;
                    })()}
                    <StyledCardContainer>
                      <h4><b> {post?.title}</b></h4> 
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
        }): <h2>No Recent Post Found!</h2>}
 
      </PostContainer>
    </Section>
  );
};
export default PostList;