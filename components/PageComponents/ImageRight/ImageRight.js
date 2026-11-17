import React from "react";
import styled from "styled-components";
import { Container, Section, Flex } from "components/layoutComponents";
import Image from "components/Image";
import  { useState } from "react";

const Text = styled.div``;

// const StyledImg = styled(GatsbyImage)`
//   box-shadow: 20px 20px 0px 1px var(--clr-accent);
// `

const Img = styled.div`
  figure {
    div {
      box-shadow: 20px 20px 0px 1px var(--clr-accent);
      img {
        max-height: 600px;
        min-height: 400px;
        object-fit: cover;
      }
    }
  }
`;

export default function ImageRight({
  subheader,
  title,
  body,
  image,
  button,
  link,
}) {


  return (
    <Section>
      <Container>
        <Flex>
          <Text className="spacing">
            <div>
              <p className="subheader accent">{subheader}</p>
              <h2 className="title">{title}</h2>
            </div>
            {body ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${body}`,
                }}
              ></div>
            ) : null}

            {/* {link ? <ButtonPrimary href={link}>{button}</ButtonPrimary> : null} */}
            {/* <ButtonPrimary
              href="https://markl.sendly.co.uk/contest"
              target="_blank"
            >
              Enter Contest Here
            </ButtonPrimary> */}
            {/* Contest closed: newsletter/contest entry buttons removed. */}
<p className="subText bold">
  The Be Bold Contest has closed and is no longer accepting entries.
</p>
          </Text>
          <Img>
            <Image
              className="stretch"
              alt={image.altText || ""}
              srcSet={image.srcSet}
            />
          </Img>
        </Flex>
      </Container>
    </Section>
  );
}
