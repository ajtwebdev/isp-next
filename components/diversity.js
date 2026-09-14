import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { ButtonPrimary } from "./buttons";
import { Container, Section } from "./layoutComponents";

const Flex = styled.div`
  display: flex;
  @media screen and (max-width: 80em) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  border-radius: var(--br);
  border: 1px solid var(--clr-accent);
  padding: 2em;
`;

export default function Diversity() {
  return (
    <Section>
      <Container>
        <Flex>
          <Image
            height={214}
            width={600}
            style={{objectFit:'cover'}}
            src="/diversity-for-boudoir-photography-calgary.jpg"
            alt="diversity and LGBTQ+ boudoir photography in calgary, ab"
            className="stretch"
          />
          <Text className="spacing">
            <h2 className="headline accent">LGBTQ+ and diversity welcome</h2>
            <p className="accent">
              For all women we have happily provided an inclusive, safe, and
              non-judgemental creative space since 1980. We have always created
              images that speak from soul to soul. We delight in bringing out
              your beauty in a way that makes you confident and showing your
              divineness while having a blast.We embrace LGBTQ+ community and
              all diverse women. You are welcome here!
            </p>
            <ButtonPrimary href="/experience">
              explore the experience &#x2192;
            </ButtonPrimary>
          </Text>
        </Flex>
      </Container>
    </Section>
  );
}
