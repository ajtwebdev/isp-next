import React, { Component } from "react";
import Image from "next/image";
import { Container, Section } from "../layoutComponents";
import styled from "styled-components";
import { ButtonUnderline } from "../buttons";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 2em auto;

  .review-img {
    grid-row: 1 / span 2;
    grid-column: 1 / -1;
    z-index: 1;
    border-radius: var(--br);
  }

  .review-box {
    // i was trying to put grid row on this but it wasn't working - needs to be on the component
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
        <center>
          <Image
            src="/frill.jpg"
            alt="review of boudoir studio in Calgary"
            height={22}
            width={300}
          />
        </center>
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

export default function FullImageTestimonial(props) {
  return (
    <Section>
      <Container>
        <Wrapper>
          <img className="review-img" src={props.img} alt={props.alt} />
          <ReviewBox review={props.review} name={props.name} />
        </Wrapper>
      </Container>
    </Section>
  );
}
