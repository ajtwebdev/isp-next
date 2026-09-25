import React, { useState } from "react";
import styled from "styled-components";
import NextImage from "next/image";
import { Section } from "components/layoutComponents";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Wrapper = styled.div`
  background: var(--clr-dark);
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
`;


const Tile = styled.figure`
  position: relative;
  margin: 10px 0;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  cursor: pointer;
  background: var(--clr-dark);

  img {
    object-fit: cover;
  }
`;

export default function ImageGallery({ totalGalleryImages }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const images = totalGalleryImages || [];

  // The lightbox still shows the full-resolution original - that is the one
  // place the large file is actually wanted.
  const slides = images.map(({ sourceUrl, title }) => ({
    src: sourceUrl,
    title,
  }));

  return (
    <Wrapper>
      <Section>
        <Container className="spacing">
          <Grid>
            {images.map((image, index) => (
              <Tile
                key={image.sourceUrl || index}
                onClick={() => setLightboxIndex(index)}
              >
                <NextImage
                  src={image.sourceUrl}
                  alt={image.altText || "Inner Spirit Photography gallery image"}
                  fill
                  sizes="(max-width: 37.5em) 90vw, (max-width: 95rem) 43vw, 640px"
                  loading="lazy"
                />
              </Tile>
            ))}
          </Grid>
        </Container>
      </Section>

      {images.length > 0 && (
        <Lightbox
          index={lightboxIndex}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          plugins={[Video, Zoom]}
          slides={slides}
        />
      )}
    </Wrapper>
  );
}
