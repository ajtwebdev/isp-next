import React from "react";
import styled from "styled-components";
import { Container } from "./layoutComponents";

/**
 * Stats banner.
 *
 * Was a full-bleed pure-black bar (139px desktop / 221px mobile) with heavy
 * 500-weight white caps. It now uses the brand burgundy already used by the
 * header/nav, splits each stat into a Trajan numeral and a muted label, and
 * runs roughly half the height.
 */
const Wrapper = styled.div`
  /* Brand burgundy, matching the header/nav, with a subtle lift so the bar
     reads as a band rather than a flat block. */
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

  @media screen and (max-width: 48em) {
    /* Two columns instead of one tall stack; the third centres beneath. */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.55em;
    padding: 0.1em 0;

    & > :last-child {
      grid-column: 1 / -1;
    }
  }
`;

const StatItem = styled.p`
  position: relative;
  margin: 0;
  padding: 0 1.5em;
  text-align: center;

  /* Hairline dividers rather than borders or heavy rules. */
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

  @media screen and (max-width: 48em) {
    padding: 0 0.75em;

    /* Only the divider between the two top cells remains. */
    &:nth-child(2)::after,
    &:last-child::after {
      display: none;
    }
  }
`;

const Value = styled.span`
  display: block;
  font-family: var(--ff-trajan);
  font-weight: 300;
  font-size: clamp(1.35rem, 1.6vw + 0.75rem, 1.85rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
  color: var(--txt-light);

  @media screen and (max-width: 48em) {
    font-size: clamp(1.2rem, 5vw, 1.45rem);
  }
`;

const Label = styled.span`
  display: block;
  margin-top: 0.22em;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  /* Muted rather than stark white, so the numeral leads. */
  color: rgba(255, 255, 255, 0.72);

  @media screen and (max-width: 48em) {
    font-size: 0.66rem;
    letter-spacing: 0.1em;
  }
`;

const STATS = [
  { value: "5,300+", label: "Women Photographed" },
  { value: "Since 1980", label: "Calgary Studio" },
  { value: "$525,000+", label: "Contributed to Charities" },
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
