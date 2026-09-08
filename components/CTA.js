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
  const buttonLabel = props.buttonLabel || "yes, i want to take the leap &#x2192;";
  const buttonHref = props.buttonHref || "/book-now";

  return (
    <Wrapper>
      <Section>
        <Container>
          <Flex>
            <Image
              className="stretch cta-image"
              fill={true}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius:'5px', border:'1px solid white' }}
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