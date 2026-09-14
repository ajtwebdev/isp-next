import React from "react";
import styled from "styled-components";
import {
  ButtonPrimary,
  ButtonLight,
  ButtonSecondaryDark,
  ButtonOutlineLight,
} from "../buttons";
import { HeroBannerPadding } from "../layoutComponents";
import Image from "next/image";

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
  background: var(--clr-accent);
  padding: 2em 1.75em;
  border-radius: 4px;
  width: min(38rem, 42vw);

  @media screen and (max-width: 62em) {
    width: min(30rem, 52vw);
    padding: 1.5em 1.25em;
  }

  @media screen and (max-width: 75em) {
    width: 100%;
    border-radius: 0;
    padding: 1.75em 1.25em;
  }

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

/**
 * Hero media.
 *
 * Art direction uses a <picture> with media-scoped <source>s rather than two
 * next/image elements hidden by CSS: hidden images are still downloaded, and
 * with priority both would be preloaded. This way the browser fetches exactly
 * one file. width/height are set from the real intrinsic sizes so the box is
 * reserved before load (no layout shift), and fetchPriority replaces the
 * priority prop since this is a plain <img>.
 */
const HeroMedia = styled.div`
  width: 100%;

  picture,
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

/* The image runs full width; the headline overlays its right-hand side. */
const HeroStage = styled.div`
  position: relative;
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 clamp(1rem, 5vw, 5rem);
  pointer-events: none;

  /* The headline block only overlays the image where the image is actually
     tall enough to contain it. The hero is 2.22:1, so below ~1200px the image
     is shorter than the headline + buttons + logo and an absolute overlay
     spills over the section beneath. Under that width the block stacks below
     the image instead. */
  @media screen and (max-width: 75em) {
    position: static;
    padding: 0;
    justify-content: stretch;
  }

  > * {
    pointer-events: auto;
  }
`;

/**
 * The two CTAs stack at every width.
 *
 * They previously sat side by side above 103em, but the headline panel is
 * capped at min(38rem, 42vw), so each button only got ~271px there and the
 * labels wrapped - leaving the arrow stranded on its own line. Stacked, each
 * button spans the panel and the label always fits on one line. This is also
 * what every width below 103em already did, so the design is now consistent
 * rather than changing shape on very wide screens.
 */
const ActionsDesktop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > * {
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }

  & > * + * {
    margin-top: var(--spacer);
  }
`;
/**
 * ButtonPrimary fills with var(--clr-accent) and borders with the same colour.
 * The hero headline panel is also var(--clr-accent), so on this panel the
 * button's fill and border both disappeared into the background. Giving it the
 * same light border as the outline button beside it restores a visible edge
 * without touching ButtonPrimary elsewhere on the site.
 */
const HeroPrimaryButton = styled(ButtonPrimary)`
  border: 1px solid var(--clr-light);
  width: 70% !important;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export default function HeroBasic() {
  return (
    <HeroWrapper>
      <HeroBannerPadding />
      <HeroStage>
        <HeroMedia>
          <picture>
            <source
              media="(max-width: 43em)"
              srcSet="/_Home-hero-mobile.webp"
              width="1346"
              height="1125"
            />
            <source srcSet="/_Home-hero.webp" width="2500" height="1125" />
            <img
              src="/_Home-hero.webp"
              width="2500"
              height="1125"
              fetchPriority="high"
              decoding="async"
              alt="Blonde woman in brown lingerie sits on bed looking up at camera in her Calgary Boudoir Session."
            />
          </picture>
        </HeroMedia>

        <Overlay>
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
              <HeroPrimaryButton href="/contact">
                book planning session now &#x2192;
              </HeroPrimaryButton>
            </ActionsDesktop>
            <Logo>
              {/* ~55% smaller than the previous 400px. White lettering is kept
                  because this sits on the burgundy panel (var(--clr-accent)),
                  not on the photograph: white gives 12:1 contrast there, while
                  black would be 1.75:1 and burgundy invisible. */}
              <Image
                src="/logo-white.svg"
                alt="nude & boudoir photography in calgary"
                width={180}
                height={100}
              />
            </Logo>
          </Text>
        </Overlay>
      </HeroStage>
    </HeroWrapper>
  );
}
