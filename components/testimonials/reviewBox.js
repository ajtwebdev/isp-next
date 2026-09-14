import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { AnchorUnderline } from "../buttons";
import { Flex } from "../layoutComponents";

const Wrapper = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  border-radius: var(--br);
  border: 1px solid var(--clr-accent);
  text-align: center;
  padding: 2em;
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

export default function ReviewBox(props) {
  return (
    <Wrapper className="spacing">
      <div>
        <Image
          src="/frill.jpg"
          alt="review of boudoir studio in Calgary"
          height={7}
          width={100}
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
      <FlexName>
        <FcGoogle />
        <p className="upper">{props.name}</p>
      </FlexName>
      <AnchorUnderline href={props.href}>{props.buttonText}</AnchorUnderline>
    </Wrapper>
  );
}
