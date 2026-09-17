import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Container, Section } from "../layoutComponents";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 2em auto;

  .container {
    grid-row: 1 / span 2;
    grid-column: 1 / -1;
    z-index: 2;
  }

  .bottom-img {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
    z-inedx: 1;
    min-height: 450px;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
  }
`;

const TextBox = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  padding: 1em;
  border: 1px solid var(--clr-accent);
  border-radius: var(--br);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

export default function BeyondSexy() {
  return (
    <Section>
      <Wrapper>
        <Container className="container">
          <TextBox className="spacing">
            <h2 className="headline">we go beyond just sexy photos</h2>
            <div className="spacing-sm">
              <p>Our name, Inner Spirit, reflects how deep we go.</p>
              <p>Inside is where your beauty truly shines from.</p>
              <p>Your power, vulnerability, humour, spirit. </p>
              <p>This is what we reveal.</p>
              <p>We celebrate your Inner Spirit. </p>
            </div>
          </TextBox>
        </Container>
        <Image
          className="bottom-img"
          src="/beyond-sexy-nude-photos.jpg"
          alt="we go beyond taking just sexy nude photos"
          width={1500}
          height={551}
        />
      </Wrapper>
    </Section>
  );
}
