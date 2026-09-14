import React from "react";
import { Container, Flex, Section } from "../layoutComponents";
import styled from "styled-components";
import Image from "next/image";

const BottomWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 2em auto;

  .img-top {
    grid-row: 1 / span 2;
    grid-column: 1 / -1;
    z-index: 1;
    min-height: 800px;
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  padding: 2em;
  border: 1px solid var(--clr-accent);
  border-radius: var(--br);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  min-height: 200px;
  display: grid;
  place-items: center;

  grid-row: 2 / -1;
  grid-column: 1 / -1;
  z-index: 2;
  align-self: center;
`;

export default function WhatToDo() {
  return (
    <Section>
      <Container>
        <h2 className="headline italics center">
          what to do with your images...
        </h2>
        <Flex>
          <BottomWrapper>
            <Image
              className="img-top"
              src="/bound-boudoir-photography-book-in-calgary-2.jpg"
              alt="bound book of boudoir photography session"
              width={600}
              height={600}
            />
            <TextBox>
              <p>
                Get a{" "}
                <span className="italics bold">bound book of your images</span>{" "}
                as a gift or as a private keepsake to be a symbol of your
                strength and beauty
              </p>
            </TextBox>
          </BottomWrapper>
          <BottomWrapper>
            <Image
              className="img-top"
              src="/boudoir-wall-art-in-calgary-3.jpg"
              alt="wall art of boudoir photography session"
              width={600}
              height={600}
            />
            <TextBox>
              <p>
                Showcase your images for yourself or a romantic partner in{" "}
                <span className="bold italics">stunning wall art</span>
              </p>
            </TextBox>
          </BottomWrapper>
        </Flex>
      </Container>
    </Section>
  );
}
