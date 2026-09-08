import React from "react";
import styled from "styled-components";
import { Container } from "./layoutComponents";

const Wrapper = styled.div`
  background: var(--clr-dark);
  color: var(--txt-light);
`;

export const Section = styled.section`
  padding: 1.5em 0;

  @media screen and (max-width: 450px) {
    padding: 1.5em 0;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1em 1em;
  gap: 0;

  @media screen and (max-width: 48em) {
    flex-direction: column;
    gap: 1em;
    padding: 1.2em 1em;
  }
`;

const StatItem = styled.p`
  text-align: center;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  padding: 0 2.5em;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 1px;
    background: rgba(255, 255, 255, 0.25);
  }

  @media screen and (max-width: 48em) {
    padding: 0;
    &:not(:last-child)::after {
      display: none;
    }
  }

  @media screen and (max-width: 30em) {
    font-size: 1rem;
  }
`;

export default function Stats() {
  return (
    <Wrapper>
      <Section>
        <Container>
          <Flex>
            <StatItem>5,300+ Women Photographed</StatItem>
            <StatItem>Calgary Studio Since 1980</StatItem>
            <StatItem>$525,000+ Contributed to Charities</StatItem>
          </Flex>
        </Container>
      </Section>
    </Wrapper>
  );
}