import React from "react";
import styled from "styled-components";
import {
  ButtonPrimary,
  ButtonLight,
  ButtonSecondaryDark,
} from "../buttons";
import { HeroBannerPadding } from "../layoutComponents";

const device = {
  md: "43em",
};

const HeroWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--txt-light);

  /* Below 75em the headline stacks beneath the image instead of overlaying
     it, so it would sit on this black ground - burgundy on black is 1.74:1.
     The stacked area goes light, keeping burgundy type at ~10:1 as it is on
     the photograph above. */
  @media screen and (max-width: 75em) {
    background: var(--clr-light-secondary);
  }
  padding-bottom: 2em;
  border-bottom: 8px solid var(--clr-light);

  // @media screen and (max-width: 32em) {
  //   padding: 8em 0 4em 0;
  // }

  // @media screen and (max-width: 22em) {
  //   padding: 6em 0 4em 0;
  // }
`;

const Text = styled.div`
  /* No panel: the type sits directly on the photograph. Burgundy measures
     8.74:1 against the pale bedding on the right of the hero image (white
     would be 1.38:1), so it stays well clear of the 4.5:1 requirement. */
  color: var(--clr-accent);
  width: min(38rem, 42vw);
  /* Headline, CTA and logo share one centred axis - previously the headline
     was left-aligned while the CTA and logo centred themselves, which read as
     misaligned. */
  text-align: center;

  @media screen and (max-width: 62em) {
    width: min(30rem, 52vw);
  }

  /* Stacked below the image, the type sits on the page background instead. */
  @media screen and (max-width: 75em) {
    width: 100%;
    padding: 1.5em 1.25em 2em;
  }

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    text-align: center;
    white-space: nowrap;
  }

  & > * + * {
    margin-top: var(--spacer);
  }
`;

/**
 * Single hero CTA, outlined in the brand burgundy to match the mockup.
 */
const HeroCta = styled(ButtonPrimary)`
  background: transparent;
  color: var(--clr-accent);
  border: 1px solid var(--clr-accent);
  letter-spacing: 0.12em;

  /* ButtonPrimary asks for --ff-alfa ("Alfa Slab One"), which has no
     @font-face anywhere, so it was silently falling back to Times at weight
     400 and reading thin. Trajan is actually loaded and matches the logo. */
  font-family: var(--ff-trajan);
  font-weight: var(--fw-900);

  /* Roughly half the text column rather than spanning it. */
  width: 45%;
  min-width: 190px;
  margin: 0 auto;

  &:hover,
  &:focus {
    background: var(--clr-accent);
    color: var(--txt-light);
    border-color: var(--clr-accent);
  }
`;

/**
 * Burgundy wordmark.
 *
 * There is no burgundy logo file in the repo - logo-white.svg is the only full
 * lockup and it is a white raster inside an SVG, so `fill` cannot recolour it
 * (and logo.svg is a leftover from another business entirely). Masking paints
 * the brand colour through the logo's alpha channel, giving the exact value
 * with no new asset and no filter approximation.
 */
const BrandMark = styled.span`
  display: block;
  width: 180px;
  height: 100px;
  background-color: var(--clr-accent);
  -webkit-mask: url("/logo-white.svg") center / contain no-repeat;
  mask: url("/logo-white.svg") center / contain no-repeat;

  @media screen and (max-width: 48em) {
    width: 150px;
    height: 84px;
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
              <span className="span-2">boudoir</span>{" "}
              <span className="span-3">
                photography in Calgary <br /> for those seeking adventure
              </span>
              <span className="span-4">and empowerment</span>
            </h1>

            <ActionsDesktop>
              <HeroCta href="/contact">Lets talk</HeroCta>
            </ActionsDesktop>
            <Logo>
              <BrandMark
                role="img"
                aria-label="Inner Spirit Photography"
              />
            </Logo>
          </Text>
        </Overlay>
      </HeroStage>
    </HeroWrapper>
  );
}
