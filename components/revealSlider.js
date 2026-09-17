import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: var(--br);
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

/**
 * Before/after is now a single composite image rather than an interactive
 * comparison slider. Intrinsic dimensions are passed so the box is reserved
 * before the file loads (no layout shift); next/image lazy-loads by default,
 * which is right here since this sits below the fold.
 */
export default function RevealSlider() {
  return (
    <Wrapper className="spacing">
      <Image
        src="/home-BeforeAfter-with-logo.webp"
        alt="Before and after of Rosemarie's Calgary boudoir photography session with Inner Spirit Photography."
        width={2000}
        height={1445}
        sizes="(max-width: 74em) 100vw, 50vw"
      />
    </Wrapper>
  );
}
