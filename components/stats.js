import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Container, GridAuto, Section } from "./layoutComponents";

const Wrapper = styled.div`
  background: var(--clr-dark);
  color: var(--txt-light);

  .gif {
    height: 110px;
    object-fit: cover;

    @media screen and (max-width: 79em) {
      max-width: 100px;

      @media screen and (max-width: 22em) {
        max-width: 100%;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 22em) {
    flex-direction: column;
  }

  & > * + * {
    margin-left: 1em;

    @media screen and (max-width: 22em) {
      margin-left: 0;
      margin-top: 4px;
    }
  }

  div {
    text-align: center;
    & > * + * {
      margin-top: 4px;
    }
  }
`;

export default function Stats() {
  return (
    <Wrapper>
      <Section>
        <Container>
          <GridAuto>
            <Flex>
              <Image
                className="gif"
                src="/women-moving-to-boudoir-photographer-in-calgary.gif"
                alt="number of women photographed for nudes"
                height={100}
                width={100}
              />
              <div>
                <p>Photographed</p>
                <p className="headline">5,127+</p>
                <p className="teriatary">Women</p>
              </div>
            </Flex>
            <Flex>
              <Image
                src="/charity.svg"
                alt="donations from boudoir studio in Calgary"
                height={100}
                width={100}
              />
              <div>
                <p>Donations</p>
                <p className="headline">$514,210+</p>
                <p className="teriatary">to Charity</p>
              </div>
            </Flex>
            <Flex>
              <Image
                src="/calendar.svg"
                alt="number of years Calgary boudoir has been in business"
                height={100}
                width={100}
              />
              <div>
                <p>in Business</p>
                <p className="headline">42+</p>
                <p className="teriatary">Years</p>
              </div>
            </Flex>
          </GridAuto>
        </Container>
      </Section>
    </Wrapper>
  );
}
