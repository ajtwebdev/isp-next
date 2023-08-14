import React from "react";
import styled from "styled-components";
import { Section } from "components/layoutComponents";
import Image from "components/Image";

const Wrapper = styled.div`
  background: var(--clr-dark);
`;
const Text = styled.div`
  max-width: 110ch;
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  max-width: 95rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px;

  @media screen and (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }

  figure {
    div {
      img {
        object-fit: cover;
        max-height: 600px;
      }
    }
  }
`;

export default function ImageGallery({ totalGalleryImages }) {
  let width = "100%";
  let height = "100%";
  return (
    <Wrapper>
      <Section>
        <Container className="spacing">
          <Grid>
            {totalGalleryImages?.map((image, index) => {
              return (
                <Image
                  alt={"galleryImage"}
                  src={image.sourceUrl}
                  width={600}
                  height={100}
                  objectFit={"cover"}
                  allImages={totalGalleryImages}
                  index={index}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>
    </Wrapper>
  );
}
