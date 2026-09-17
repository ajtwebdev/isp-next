import React, { Component } from "react";
import Image from "next/image";
import { Container, Section } from "../layoutComponents";
import styled from "styled-components";
import { ButtonUnderline } from "../buttons";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Frill = styled(Image)`

  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 2em auto;

  .review-img {
    grid-row: 1 / span 2;
    grid-column: 1 / -1;
    z-index: 1;
    display: block;

    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--br);
    }
  }

  .review-box {
  }
`;

const ReviewWrapper = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  border-radius: var(--br);
  border: 1px solid var(--clr-accent);
  text-align: center;
  padding: 2em;
  margin-left: auto;
  margin-right: auto;
  grid-row: 2 / -1;
  grid-column: 1 / -1;
  z-index: 2;

  p {
    max-width: 70ch;
  }
`;

const FlexStars = styled.div`
  display: flex;
  justify-content: center;

  & > * + * {
    margin-left: 2px;
  }
`;

const FlexName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > * + * {
    margin-left: 2px;
  }
`;

const ReviewBox = (props) => {
  return (
    <ReviewWrapper className="spacing">
      <div>
        <Frill
          src="/frill.jpg"
          alt="review of boudoir studio in Calgary"
          height={22}
          width={300}
        />
        <FlexStars>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </FlexStars>
      </div>
      <p className="italics">"{props.review}"</p>
      <p className="upper">{props.name}</p>
    </ReviewWrapper>
  );
};

export default function MercedesTestimonial(props) {
  return (
    <Section>
      <Container>
        <Wrapper>
          <picture className="review-img">
            <source
              media="(max-width: 43em)"
              srcSet="/calgary-boudoir-mercedes-review-mobile.webp"
              width="900"
              height="600"
            />
            <source
              srcSet="/calgary-boudoir-mercedes-review.webp"
              width="1600"
              height="1066"
            />
            <img
              src="/calgary-boudoir-mercedes-review.webp"
              width="1600"
              height="1066"
              loading="lazy"
              decoding="async"
              alt="review of calgary boudoir photographer"
            />
          </picture>
          <ReviewBox review={props.review} name={props.name} />
        </Wrapper>
      </Container>
    </Section>
  );
}
