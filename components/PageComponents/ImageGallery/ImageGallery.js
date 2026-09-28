import React, { useState } from "react";
import styled from "styled-components";
import NextImage from "next/image";
import { Section } from "components/layoutComponents";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";


const GALLERY = {
  columns: { mobile: 2, tablet: 2, desktop: 3 },
  breakpoints: { mobile: "47.9375em", tablet: "63.9375em" },
  gap: "4px",
  containerWidth: 85,
  containerMax: 1520,
  /* Declared tile width is nudged up by this factor.
   *
   * A tile is genuinely ~43vw in the 2-column layout, but the srcset steps
   * jump 384 -> 640, and Chrome picks the nearest candidate rather than the
   * next one up. At a true 43vw the requirement landed just below the midpoint
   * and it chose 384w, giving ratios of 0.85-0.96 against the device pixels
   * actually needed - visibly soft on a 3x phone. Over-declaring slightly
   * pushes the choice to 640w. Costs a few KB per tile and buys back the
   * sharpness measured in the previous pass. */
  sizeSafety: 1.25,
};


function buildSizes({ columns, breakpoints, containerWidth, containerMax, sizeSafety }) {
  const vw = (cols) =>
    `${Math.min(100, Math.round((containerWidth / cols) * sizeSafety))}vw`;
  const capped = `${Math.round((containerMax / columns.desktop) * sizeSafety)}px`;
  return [
    `(max-width: ${breakpoints.mobile}) ${vw(columns.mobile)}`,
    `(max-width: ${breakpoints.tablet}) ${vw(columns.tablet)}`,
    `(max-width: 95rem) ${vw(columns.desktop)}`,
    capped,
  ].join(", ");
}

const GALLERY_SIZES = buildSizes(GALLERY);

const Wrapper = styled.div`
  background: var(--clr-dark);
`;

const Container = styled.div`
  width: ${GALLERY.containerWidth}%;
  margin: 0 auto;
  max-width: 95rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${GALLERY.columns.desktop}, minmax(0, 1fr));
  gap: ${GALLERY.gap};

  @media screen and (max-width: ${GALLERY.breakpoints.tablet}) {
    grid-template-columns: repeat(${GALLERY.columns.tablet}, minmax(0, 1fr));
  }

  @media screen and (max-width: ${GALLERY.breakpoints.mobile}) {
    grid-template-columns: repeat(${GALLERY.columns.mobile}, minmax(0, 1fr));
  }
`;

const Tile = styled.figure`
  position: relative;
  margin: 0;
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
                  sizes={GALLERY_SIZES}
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
