import React from "react";
import styled from "styled-components";
import { Container, Actions, HeroBannerPadding } from "../layoutComponents";
import { ButtonLight, AnchorInline, ButtonPrimary } from "../buttons";
import Breadcrumb2Links from "../breadcrumbs/breadcrumb2links";
import Image from "next/image";

const Wrapper = styled.div`
  background: var(--clr-dark);
  padding-bottom: 4em;

  .container {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
    z-index: 2;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media screen and (max-width: 74em) {
      display: grid;
      grid-template-rows: auto 2em auto;

      .img {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
        z-index: 1;
      }
    }

    & > * + * {
      margin-left: 2em;
    }
  }

  hr {
    background-color: var(--clr-light);
    height: 1px;
    border: none;

    @media screen and (max-width: 74em) {
      background-color: var(--clr-accent);
      height: 1px;
      border: none;
    }
  }

  .img {
    border-radius: var(--br);
    object-fit: cover;
  }
`;

const GridWrapper = styled.div`
  // display: grid;
  // grid-template-rows: 10em 600px auto;
`;

const Bg = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / -1;
  z-index: 1;
  background: var(--clr-accent);
`;

const Text = styled.div`
  color: var(--txt-light);

  .btn-accent {
    display: none;
  }
  @media screen and (max-width: 74em) {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
    z-index: 2;
    padding: 2em;
    background: var(--clr-light);
    color: var(--clr-accent);

    .btn-accent {
      display: block;
    }

    .btn-light {
      display: none;
    }
  }
`;

// banner with only 2 links in the breadcrumb
export default function BlogBanner(props) {
  return (
    <Wrapper>
      <HeroBannerPadding />
      <GridWrapper>
        {/* <Bg /> */}
        <Container className="container">
          <Image
            className="img stretch clip-img"
            src="/banners/blog-banner.jpg"
            alt="The inner spirit photography blog"
            height={100}
            width={580}
          />
          <Text className="spacing">
            <div>
              <Breadcrumb2Links
                to1={props.to1}
                link1={props.link1}
                to2={props.to2}
                link2={props.link2}
              />
              <hr />
              <h1 className="headline">{props.headline}</h1>
            </div>
            <p>
              {props.description ||
                "Welcome to the Inner Spirit Photography blog!"}
            </p>
            <Actions>
              <ButtonPrimary className="btn-light" href="/contact">
                contact us &#x2192;
              </ButtonPrimary>
              <ButtonPrimary className="btn-accent" href="/contact">
                contact us &#x2192;
              </ButtonPrimary>
            </Actions>
          </Text>
        </Container>
      </GridWrapper>
    </Wrapper>
  );
}
