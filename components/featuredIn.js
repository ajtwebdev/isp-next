import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import React from "react";
import { Container, Section } from "./layoutComponents";

const ImageStyle = {
  width: "100px",
  objectFit: "contain",
};

const ImageStyleEpcot = {
  width: "60px",
};

const GridAuto = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
  grid-gap: 2em;

  & > * {
    justify-self: center;
    align-self: center;
  }
`;

export default function FeaturedIn() {
  return (
    <Section>
      <Container className="spacing">
        <h2 className="headline center">
          Mark Laurie's boudoir photography{" "}
          <span className="italics accent">featured in:</span>
        </h2>
        <GridAuto>
          <a href="https://www.citytv.com/" target="_blank">
            <Image
              height={38}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-citytv.jpg"
              alt="calgary boudoir photographer featured in city tv"
            />
          </a>
          <a href="https://www.cbc.ca/" target="_blank">
            <Image
              height={51}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-cbc.jpg"
              alt="calgary boudoir photographer featured in cbc"
            />
          </a>
          <a href="https://calgarysun.com/" target="_blank">
            <Image
              height={101}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-calgary-sun.jpg"
              alt="calgary boudoir photographer featured in calgary sun"
            />
          </a>
          <a href="https://www.ctvnews.ca/live" target="_blank">
            <Image
              height={58}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-ctv-live.jpg"
              alt="calgary boudoir photographer featured in ctv live"
            />
          </a>
          {/* <a href="" target="_blank">
            <Image
              height={73}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-best-of-best.jpg"
              alt="calgary boudoir photographer featured in best of the best"
            />
          </a> */}
          {/* <a href="https://www.thebestcalgary.com/" target="_blank">
            <Image
              height={70}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-best-in-calgary.jpg"
              alt="calgary boudoir photographer featured in best in calgary"
            />
          </a> */}

          <a href="https://www.divorcemag.com/region/AB" target="_blank">
            <Image
              height={41}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-divorce-magazine.jpg"
              alt="calgary boudoir photographer featured in divorce magazine"
            />
          </a>
          <a href="https://weddingbells.ca/" target="_blank">
            <Image
              height={26}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-wedding-bells.jpg"
              alt="calgary boudoir photographer featured in wedding bells"
            />
          </a>
          {/* <a href="" target="_blank">
            <Image
              height={139}
              width={100}
              style={ImageStyleEpcot}
              src="/featured-in/calgary-boudoir-photographer-featured-epcot-center.jpg"
              alt="calgary boudoir photographer featured in best in epcot center"
            />
          </a>
          <a href="https://www.nationalgeographic.com/" target="_blank">
            <Image
              height={31}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-nat-geo.jpg"
              alt="calgary boudoir photographer featured in national geographic"
            />
          </a>
          <a href="" target="_blank">
            <Image
              height={33}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-gallerie.jpg"
              alt="calgary boudoir photographer featured in gallerie"
            />
          </a>
          <a href="https://www.ppoc.ca/" target="_blank">
            <Image
              height={25}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-professional-photographer.jpg"
              alt="calgary boudoir photographer featured in professional photographer"
            />
          </a>
          <a
            href="https://thesocieties.net/professionalimagemaker/"
            target="_blank"
          >
            <Image
              height={19}
              width={100}
              style={ImageStyle}
              src="/featured-in/calgary-boudoir-photographer-featured-image-maker.jpg"
              alt="calgary boudoir photographer featured in image maker"
            />
          </a> */}
        </GridAuto>
      </Container>
    </Section>
  );
}

