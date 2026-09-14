import React from "react";
import styled from "styled-components";
import { Container, Actions, HeroBannerPadding } from "../layoutComponents";
import {
  ButtonLight,
  AnchorInline,
  ButtonPrimary,
  AnchorUnderline,
} from "../buttons";
import Breadcrumb2Links from "../breadcrumbs/breadcrumb2links";
import Image from "next/image";

const Wrapper = styled.div`
  background: var(--clr-black);
  padding-bottom: 4em;
  border-bottom: 8px solid var(--clr-light);

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media screen and (max-width: 74em) {
      display: grid;
      grid-template-rows: auto 2em auto;

      img {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
        z-index: 1;
        border: 1px solid var(--clr-light);
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

  img {
    border-radius: var(--br);
    object-fit: cover;
  }
`;

const Text = styled.div`
  color: var(--txt-light);

  h1 {
    font-size: var(--fs-1);
    line-height: 1.1;
    font-family: var(--ff-trajan);
    @media screen and (max-width: 26em) {
      font-size: var(--fs-2);
      line-height: 1.1;
      font-family: var(--ff-trajan);
    }
  }

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

  .call {
    color: var(--txt-light);
    display: inline-block;

    @media screen and (max-width: 74em) {
      color: var(--txt-dark);
    }
  }
`;

// banner with only 2 links in the breadcrumb
export default function BannerBooking(props) {
  return (
    <Wrapper>
      <HeroBannerPadding />
      <Container className="container">
        <Image
          className="stretch clip-img "
          height={634}
          width={580}
          src={props.img}
          alt={props.alt}
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
            <h1 className="">{props.headline}</h1>
          </div>
          <p className="subhead caps">
            can't wait? call us:{" "}
            <a className="call" href="tel: 403-252-2662">
              403-252-2662
            </a>
          </p>
        </Text>
      </Container>
    </Wrapper>
  );
}
