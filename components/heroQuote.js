import React from "react";
import styled from "styled-components";

import { Container, Section } from "./layoutComponents";

/**
 * Deanna's testimonial. Moved out of the hero so the hero is purely image and
 * headline; it now reads as its own beat directly beneath.
 */
const QuoteSection = styled(Section)`
  padding: 3em 0;

  @media screen and (max-width: 43em) {
    padding: 2.25em 0;
  }
`;

const Quote = styled.blockquote`
  margin: 0 auto;
  max-width: 46rem;
  text-align: center;

  p {
    margin: 0;
  }
`;

export default function HeroQuote() {
  return (
    <QuoteSection>
      <Container>
        <Quote>
          <p className="italics subhead">
            &ldquo;When I saw my photos, I broke into tears because I thought, I
            can&apos;t believe how beautiful that person is.&rdquo; - Deanna
          </p>
        </Quote>
      </Container>
    </QuoteSection>
  );
}
