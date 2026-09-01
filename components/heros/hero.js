import React from "react";
import styled from "styled-components";
import { Container, Flex } from "../layoutComponents";
import {
  ButtonPrimary,
  ButtonLight,
  ButtonSecondaryDark,
  ButtonOutlineLight,
} from "../buttons";
import { HeroBannerPadding } from "../layoutComponents";
import Image from "next/image";
import LazyVimeo from "../videos/LazyVimeo";

const device = {
  md: "43em",
};

const HeroWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--txt-light);
  padding-bottom: 4em;
  border-bottom: 8px solid var(--clr-light);

  // @media screen and (max-width: 32em) {
  //   padding: 8em 0 4em 0;
  // }

  // @media screen and (max-width: 22em) {
  //   padding: 6em 0 4em 0;
  // }
`;

const Text = styled.div`
  h1 {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    font-family: var(--ff-trajan);

    @media screen and (max-width: 34em) {
      font-size: var(--fs-2);
    }

    @media screen and (max-width: 23em) {
      font-size: 1rem;
    }

    @media (min-width: 89em) {
      .span-1 {
        font-size: 3rem;
        line-height: 1;
      }
      .span-2 {
        font-size: 4rem;
      }
      .span-3 {
        font-size: 2rem;
      }
      .span-4 {
        font-size: 3rem;
      }
    }
  }
`;

const Video = styled.div`
  @media screen and (max-width: 48em) {
    p {
      display: none;
    }
  }
  // iframe {
  //   height: 550px;
  //   width: 100%;
  //   border-radius: var(--br);
  //   object-fit: cover;

  //   @media screen and (max-width: 400px) {
  //     height: auto;
  //   }
  // }
`;

const ActionsDesktop = styled.div`
  display: flex;
  align-items: center;

  & > * {
    width: 100%;
    text-align: center;
  }

  & > * + * {
    margin-left: 10px;
  }

  @media screen and (max-width: 103em) {
    flex-direction: column;
    text-align: center;
    & > * {
      width: 100%;
    }

    & > * + * {
      margin-left: 0;
      margin-top: var(--spacer);
    }
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export default function HeroBasic() {
  return (
    <HeroWrapper>
      <HeroBannerPadding />
      <Container>
        <Flex className="spacing-lg">
          <Video className="spacing-lg">
            <LazyVimeo
              src="https://player.vimeo.com/video/743211749?h=a77b06545f&background=1&badge=0&autopause=0&player_id=0&app_id=58479"
              title="Home Page Nudes-1080p"
              poster="/posters/743211749.jpg"
              aspectRatio="100%"
              autoLoad={true}
              priority
            />
            <p className="italics subhead">
              “When I saw my photos, I broke into tears because I thought, I
              can't believe how beautiful that person is.” - Deanna
            </p>
          </Video>

          <Text className="spacing-md">
            <h1 className="">
              <span className="span-1">the best Creative</span>{" "}
              <span className="span-2">nude & boudoir</span>{" "}
              <span className="span-3">
                photography in Calgary <br /> for those seeking adventure
              </span>
              <span className="span-4">and empowerment</span>
            </h1>

            <ActionsDesktop>
              <ButtonOutlineLight href="/experience">
                explore the experience &#x2192;
              </ButtonOutlineLight>
              <ButtonPrimary href="/book-now">
                book planning session now &#x2192;
              </ButtonPrimary>
            </ActionsDesktop>
            <Logo>
              <Image
                src="/logo-white.svg"
                alt="nude & boudoir photography in calgary"
                width={400}
                height={100}
              />
            </Logo>
          </Text>
        </Flex>
      </Container>
    </HeroWrapper>
  );
}
