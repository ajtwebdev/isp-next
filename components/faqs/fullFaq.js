import React, { useState } from "react";
import styled from "styled-components";
import { Section, Container, Flex } from "../layoutComponents";
import { ButtonUnderline } from "../buttons";
import Image from "next/image";

const device = {
  md: "48em",
};

const AccordionWrapper = styled.div`
  border-bottom: ${({ item }) =>
    item ? "none" : "1px solid var(--clr-accent)"};
  margin-bottom: var(--spacer-md);
`;

const TitleFlex = styled.div`
  padding: var(--spacer-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ item }) => (item ? "4px solid #9ecaed" : "none")};

  &:hover {
    cursor: pointer;
    background: var(--clr-light-secondary);
    transition: 0.25s ease-in;
  }
`;

const Wrapper = styled.div`
  padding: 2em;
  background: var(--clr-light-secondary);
  border-radius: var(--br);
`;

const Text = styled.div`
  align-self: start;
`;

const AccordionContent = styled.div`
  display: ${({ item }) => (item ? "block" : "none")};

  p {
    font-size: var(--fs-b);
    white-space: pre-line;
  }
`;

const ArrowImg = styled.img`
  width: 25px;
  transform: ${({ item }) => (item ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.25s;
`;

const Spacer = styled.div`
  margin-bottom: var(--spacer);
`;

const AccordionItem = (props) => {
  const [item, itemOpen] = useState(false);

  function toggleItem() {
    itemOpen(!item);
  }
  return (
    <AccordionWrapper item={item}>
      <TitleFlex item={item} onClick={toggleItem}>
        <h3 className="bold italics accent subhead">{props.question}</h3>
        <ArrowImg
          item={item}
          src="/arrow-down.svg"
          alt="questions about nude & boudoir photography calgary"
        />
      </TitleFlex>
      <AccordionContent className="spacing" item={item}>
        <div className="spacing">
          <p>{props.answer}</p>
        </div>
        <Spacer />
      </AccordionContent>
    </AccordionWrapper>
  );
};

export default function FullFaq() {
  return (
    <Section>
      <Container>
        <Wrapper className="spacing">
          <h2 className="headline italics accent center">
            Get your boudoir questions answered
          </h2>
          <div>
            <AccordionItem
              question="I feel so nervous. Can you help with that?"
              answer={`Yes, it's very common to feel nervous at first.\n\nMark will guide you one step at a time. Many women are surprised by how quickly their nerves settle and their confidence grows once they see a few photos on the back of the camera.`}
            />
            <AccordionItem
              question="Are nude portraits an option?"
              answer={`Yes, nude portraits are entirely your choice.\n\nMany clients feel comfortable enough to add a few fine art nudes during their session. Mark is internationally known for his nude portraiture and has a way of making it feel natural. For some women, it's one of the most confidence-building parts of the session.`}
            />
            <AccordionItem
              question="What is the investment range?"
              answer={`Clients typically invest $1,500 to $5,000 for their session and images.\n\nThat includes a four-hour session, plus professional hair and makeup. Choose from wall art, books, digital images, and loose prints.\n\nWe also offer a $795 Teaser session that includes prints.`}
            />
            <AccordionItem
              question="Is there a planning session, or do we wing it?"
              answer={`Yes, we offer a complimentary planning session in person or on Zoom.\n\nIt's a chance to explore ideas, talk about the sets you like, ask as many questions as you like, and book your photo session.`}
            />
            <AccordionItem
              question="I'm not photogenic. Will Mark help me pose?"
              answer={`Yes, Mark will guide you through the posing.\n\nHe'll help you find poses that bring out what you like about yourself. Seeing a few images on the back of the camera as you go can help you settle in.`}
            />
            <AccordionItem
              question="Can you help with areas I'm self-conscious about?"
              answer={`Yes, Mark can help draw attention to the features you want to highlight.\n\nTell him what you're comfortable showing. He'll use posing and lighting to guide the eye, and we can use subtle retouching if you'd like.`}
            />
            <AccordionItem
              question="What outfits should I bring, and what can I borrow?"
              answer={`Bring a few favourite pieces of your own.\n\nAlong with lingerie, think fashion pieces, a favourite shirt, or props with a story. We have robes, wraps, shirts, and plenty of props you can borrow.`}
            />
            <AccordionItem
              question="Is hair and makeup included, or can I do my own?"
              answer={`Yes, professional hair and makeup are included.\n\nOur stylist will work with you to create a look that suits your style and taste. If you'd prefer to do your own, you're welcome to.`}
            />
            <AccordionItem
              question="Can a friend join me?"
              answer={`Yes, you're welcome to bring a friend.\n\nYou can even have a few photos together if you like. We encourage whatever helps you feel comfortable and get the photos you came for.`}
            />
            <AccordionItem
              question="How do you retouch my photos?"
              answer={`We keep retouching natural so you still look like yourself.\n\nLet us know what you'd like softened and what you'd like us to leave as it is.`}
            />
            <AccordionItem
              question="Where is your boudoir studio?"
              answer={`Our private studio is in southwest Calgary, near Heritage Park.\n\nFree street parking is available.`}
            />
          </div>
        </Wrapper>
      </Container>
    </Section>
  );
}
