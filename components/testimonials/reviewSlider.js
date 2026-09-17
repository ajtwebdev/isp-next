import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Container, Section } from "../layoutComponents";
import styled from "styled-components";
import { AnchorUnderline } from "../buttons";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Frill = styled(Image)`

  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: var(--clr-accent);
    font-size: 24px;
  }
`;

const ItemGrid = styled.div`
  display: grid !important;
  grid-template-rows: auto 2em auto;
  position: relative;

  .slider-img {
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
`;

const ReviewWrapper = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  border-radius: var(--br);
  border: 1px solid var(--clr-accent);
  text-align: center;
  padding: 1em;
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
      <p className="italics ">"{props.review}"</p>
      <FlexName>
        <FcGoogle />
        <p className="upper">{props.name}</p>
      </FlexName>
      {/* <AnchorUnderline href="https://www.google.com/maps/place/Inner+Spirit+Photography/@50.977725,-114.0806245,15z/data=!4m7!3m6!1s0x0:0xbbb2559053a55ca5!8m2!3d50.977725!4d-114.0806245!9m1!1b1">
        read more google reviews &#x2192;
      </AnchorUnderline> */}
    </ReviewWrapper>
  );
};

export default function ReviewSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Section>
      <Container>
        <Wrapper>
          <Slider className="slider" {...settings}>
            <ItemGrid>
              <picture className="slider-img">
               
                <source
                  media="(max-width: 43em)"
                  srcSet="/calgary-boudoir-joy-review-mobile.webp"
                  width="900"
                  height="600"
                />
                <source srcSet="/calgary-boudoir-joy-review.webp" width="1600" height="1066" />
                <img
                  src="/calgary-boudoir-joy-review.webp"
                  width="1600"
                  height="1066"
                  loading="lazy"
                  decoding="async"
                  alt="calgary boudoir photography google review"
                />
              </picture>
              <ReviewBox
                review="At first I resisted, saying it was extravagant and unnecessary, but the more I talked to Mark and saw his work I realized it was a fantastic opportunity. We shot a mix of boudoir, sexy and sporty poses and once I saw the completed album,  my confidence soared! I was a huge fan from that point on. Do this now for yourself or a loved one. You will never stop enjoying the results!"
                name="Joy B."
              />
            </ItemGrid>
            <ItemGrid>
              <picture className="slider-img">
                <source
                  media="(max-width: 43em)"
                  srcSet="/calgary-boudoir-kb-review-mobile.webp"
                  width="900"
                  height="600"
                />
                <source srcSet="/calgary-boudoir-kb-review.webp" width="1600" height="1066" />
                <img
                  src="/calgary-boudoir-kb-review.webp"
                  width="1600"
                  height="1066"
                  loading="lazy"
                  decoding="async"
                  alt="calgary boudoir photography google review"
                />
              </picture>
              <ReviewBox
                className="review-box"
                review="I love the unexpected creativity of Mark's studio. I arrive and I get to be myself. I just finished my 6th session, it was as different and inspiring as the rest. Each one is a new adventure. No other studio touches what Mark does, he is on a whole different level. Mark gives you the confidence to be beautiful and he will find that beauty in every shot. You will never be disappointed in his professionalism, creativity and the beauty of you"
                name="Kathy B."
              />
            </ItemGrid>
            <ItemGrid>
              <picture className="slider-img">

                <source
                  media="(max-width: 43em)"
                  srcSet="/calgary-boudoir-photography-robin-mobile.webp"
                  width="900"
                  height="563"
                />
                <source srcSet="/calgary-boudoir-photography-robin.webp" width="1600" height="1000" />
                <img
                  src="/calgary-boudoir-photography-robin.webp"
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  alt="calgary boudoir photography google review"
                />
              </picture>
              <ReviewBox
                className="review-box"
                review="Mark was instrumental in changing the view my wife had of herself after three kids.  His thoughtful input, witty charm and great photography skills made for a memorable makeover session.  She has gone from hiding behind baggy sweats to wearing the clothes of a confident and sexy woman!"
                name="Robin H."
              />
            </ItemGrid>
          </Slider>
        </Wrapper>
      </Container>
    </Section>
  );
}
