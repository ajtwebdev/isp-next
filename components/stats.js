import React from "react";
import styled from "styled-components";
import { Container } from "./layoutComponents";

const Wrapper = styled.div`
  background: linear-gradient(
    180deg,
    var(--clr-accent) 0%,
    var(--clr-accent-darker) 100%
  );
  color: var(--txt-light);
`;

export const Section = styled.section`
  padding: 0.5em 0;

  @media screen and (max-width: 48em) {
    padding: 0.45em 0;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  padding: 0.15em 0;


  @media screen and (max-width: 47.9375em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1.2em;
    padding: 0.1em 0;
    align-items: start;

    & > :first-child {
      grid-column: 1 / -1;
      margin-bottom: 0.2em;
    }
  }


  @media screen and (max-width: 23.4375em) {
    grid-template-columns: 1fr;
    row-gap: 0.9em;

    & > :first-child {
      margin-bottom: 0;
    }
  }
`;

const StatItem = styled.p`
  position: relative;
  margin: 0;
  padding: 0 1.5em;
  text-align: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 2.1em;
    width: 1px;
    background: rgba(255, 255, 255, 0.18);
  }

  @media screen and (max-width: 47.9375em) {
    padding: 0 0.5em;

    &::after {
      display: none !important;
    }

    /* Only the two cells sharing the second row are divided. */
    &:nth-child(2) {
      border-right: 1px solid rgba(255, 255, 255, 0.18);
      padding-right: 0.5em;
    }
    &:nth-child(3) {
      padding-left: 0.5em;
    }
  }


  @media screen and (max-width: 23.4375em) {
    padding: 0 0.75em;

    &:nth-child(2) {
      border-right: none;
      padding-right: 0.75em;
    }
    &:nth-child(3) {
      padding-left: 0.75em;
    }

    &:not(:last-child) {
      padding-bottom: 0.9em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    }
  }
`;

const Value = styled.span`
  display: block;
  font-family: var(--ff-trajan);
  font-weight: 300;
  font-size: clamp(1.2rem, 1.1vw + 0.6rem, 1.4rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
  color: var(--txt-light);

  @media screen and (max-width: 48em) {
    font-size: clamp(1.3rem, 5vw, 1.6rem);
    white-space: nowrap;
  }
`;

const Label = styled.span`
  display: block;
  margin-top: 0.28em;
  font-size: 0.94rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.85);

  @media screen and (max-width: 48em) {
    font-size: 0.95rem;
    letter-spacing: 0.03em;
    line-height: 1.3;
  }
`;

const STATS = [
  { value: "5,300+", label: "Women Photographed" },
  { value: "Founded 1980", label: "Calgary Studio" },
  { value: "$525,000+", label: "Charity Contributions" },
];

export default function Stats() {
  return (
    <Wrapper>
      <Section>
        <Container>
          <StatGrid>
            {STATS.map((s) => (
              <StatItem key={s.label}>
                <Value>{s.value}</Value>
                <Label>{s.label}</Label>
              </StatItem>
            ))}
          </StatGrid>
        </Container>
      </Section>
    </Wrapper>
  );
}