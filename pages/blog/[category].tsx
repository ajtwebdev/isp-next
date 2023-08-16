import { getAllPosts, postPathBySlugCategory } from "../../lib/posts";
import { getPostByCategory } from "../recent-posts";
import { Container, Section } from "../../components/layoutComponents";

import styled from "styled-components";
import Seo from "../../components/seo";
import LayoutJs from "../../components/layoutJs";
import Link from "next/link";

import HeaderBasic from "../../components/headers/headerBasic";
import Footer from "../../components/footer";

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

  min-height: 40vh;
  height: 100%;

  @media screen and (max-width: 26em) {
    min-height: 40vh;
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

const CategoryPage = ({ catgoryPost }) => {
  return (
    <div>
      <Seo
        title={`${catgoryPost?.categoryName}`}
        description="Welcome to the blog."
      />
      <HeaderBasic />
      <BannerWrapper>
        <Container className="spacing">
          <BannerText className="spacing">
            <div>
              <h1 className="title">{catgoryPost?.categoryName}</h1>
            </div>
          </BannerText>
        </Container>
      </BannerWrapper>
      <Section>
        <PostContainer>
          <CategoryContainer>
            <CategoryPostContainer>
              {catgoryPost?.posts?.map((post, index) => {
                const categorySlug =
                  post?.categories?.length > 0 ? post?.categories[0]?.slug : "";
                return (
                  <StyledCard key={index}>
                    <Link
                      className="spacing accent"
                      href={postPathBySlugCategory(post?.slug, categorySlug)}
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
        </PostContainer>
      </Section>

      <Footer />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const { posts } = await getAllPosts({
    queryIncludes: "all",
  });
  const postsByCategory = getPostByCategory(posts);
  const catgoryPost = Object.values(postsByCategory).find(
    (item: any) => item?.categorySlug === params?.category
  );
  return {
    props: {
      catgoryPost,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: "all",
  });

  const paths = [].concat(
    ...posts?.map((item: any) =>
      item?.categories?.map((category) => ({
        params: {
          category: category?.slug,
        },
      }))
    )
  );

  return {
    paths,
    fallback: false,
  };
}

export default CategoryPage;
