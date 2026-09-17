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

  @media screen and (max-width: 48em) {
    /* Two columns with the third centred beneath. This was stacked to a single
       column when the labels went to 16px, because "Contributed to Charities"
       could not fit a ~142px cell. "Charity Contributions" is shorter and the
       top-row labels fit again. */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 0.55em;
    padding: 0.1em 0;
    /* Top-aligned, not centred. "Women Photographed" needs two lines in a
       ~150px cell at 16px while "Calgary Studio" needs one, so the two cells
       are different heights. Centring each one in the row then pushed their
       numerals onto different lines; aligning to the top keeps the numerals
       level and lets only the labels differ in depth. */
    align-items: start;

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
  /* Capped at 1.4rem (22.4px), down from 1.85rem: at the old size the
     numeral overwhelmed the label rather than leading it. */
  font-size: clamp(1.2rem, 1.1vw + 0.6rem, 1.4rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
  color: var(--txt-light);

  @media screen and (max-width: 48em) {
    font-size: clamp(1.2rem, 5vw, 1.45rem);
    white-space: nowrap;
  }
`;

const Label = styled.span`
  display: block;
  margin-top: 0.28em;
  /* 0.94rem (15px), up from 0.82rem. With the numeral at 22.4px this is a
     1.5x ratio - the numeral still leads, the label is comfortably legible. */
  font-size: 0.94rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.85);

  @media screen and (max-width: 48em) {
    font-size: 1rem; /* 16px */
    letter-spacing: 0.04em;
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
