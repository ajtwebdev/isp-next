import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { AnchorInline, ButtonPrimary } from "./buttons";
import { Actions, Container, Section } from "./layoutComponents";

const Wrapper = styled.div`
  background: var(--clr-dark);
  border-bottom: 1px solid var(--clr-light);
  .cta-img {
    border-radius: vavr(--br);
    border: 1px solid var(--clr-light);
    width: 80%;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  img {
    /* width: 100%; */
    position:relative !important
  }
  @media screen and (max-width: 57em) {
    flex-direction: column;
  }

  & > * {
    width: 100%;
    /* A flex item defaults to min-width:auto, which for a replaced element
       resolves to its intrinsic width - so the image refuses to shrink below
       the natural width of the file it was served. On Netlify next/image
       optimization is disabled, so the raw 662px-wide original is served and
       the image held 662px of a 748px row, pushing the text column off the
       right edge. Locally the optimizer returns a smaller rendition, the floor
       is lower, and it happened to fit - which is why this only broke on the
       deployed site. min-width: 0 lets the image shrink; flex: 1 1 0 makes the
       two columns split the row evenly regardless of intrinsic size. */
    min-width: 0;
    flex: 1 1 0;
  }

  & > * + * {
    margin-left: 2em;

    @media screen and (max-width: 57em) {
      margin-left: 0;
      margin-top: var(--spacer);
    }
  }
`;

const Text = styled.div`
  color: var(--txt-light);

  h3 {
    color: var(--txt-light-secondary);
  }
`;

export default function CTA(props) {
  const buttonLabel = props.buttonLabel || "yes, i want to take the leap \u2192";
  const buttonHref = props.buttonHref || "/contact";

  return (
    <Wrapper>
      <Section>
        <Container>
          <Flex>
            <Image
              className="stretch cta-image"
              width={662}
              height={880}
              sizes="(max-width: 57em) 100vw, 50vw"
              style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius:'5px', border:'1px solid white' }}
              src="/book-your-calgary-boudoir-session.jpg"
              alt="calgary boudoir session"
            />
            <Text className="spacing">
              <div>
                <h2 className="headline">{props.headline}</h2>
                <h3 className="subhead caps">{props.subhead}</h3>
              </div>
              <p>{props.description}</p>
              <ButtonPrimary href={buttonHref}>
                {buttonLabel}
              </ButtonPrimary>
            </Text>
          </Flex>
        </Container>
      </Section>
    </Wrapper>
  );
}