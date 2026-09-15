import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Container, Section } from "./layoutComponents";

import { AnchorInline, ButtonInline } from "./buttons";

const TeamWrapper = styled.div`
  background: url("https://staging.innerspiritphoto.com/wp-content/uploads/2023/08/small-sprite.jpg"),
    rgba(255, 255, 255, 0.7);
  background-blend-mode: overlay;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

/**
 * Uniform headshot frame.
 *
 * The source images range from 600x668 to 3456x5184 and from 0.67 to 1.00
 * aspect, and were declared as width={150} height={50} (3:1) against portrait
 * photographs - so each one rendered at its own intrinsic ratio and the taller
 * ones filled the viewport. Every member now gets the same 3:4 box with the
 * crop anchored near the top, so faces stay in frame and all five match.
 *
 * Source files are untouched: next/image serves resized renditions from the
 * full-quality originals, so high-DPI screens still get a sharp image.
 */
const HeadshotFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  /* 420 x 560 - the max-height cap expressed as width, so the ratio holds. */
  max-width: 420px;
  overflow: hidden;
  /* The parallelogram is mirrored on reversed rows so its slanted leading
     edge always faces the text column and the accent border reads the same
     way down the page. */
  clip-path: ${({ $reverse }) =>
    $reverse
      ? "polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)"
      : "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"};
  border: 2px solid var(--clr-accent);

  @media screen and (max-width: 48em) {
    /* ~350px tall on mobile */
    max-width: 262px;
  }

  img {
    object-fit: cover;
    /* Anchored above centre: heads sit in the upper half of a portrait crop. */
    object-position: center 20%;
  }
`;

/**
 * Image column is pinned to the headshot's capped width so it can no longer
 * dictate the row; the text column takes the remaining space at a readable
 * measure rather than being squeezed by a 50/50 split.
 */
const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $reverse }) =>
    $reverse ? "minmax(0, 1fr) minmax(0, 420px)" : "minmax(0, 420px) minmax(0, 1fr)"};
  gap: 3rem;
  align-items: center;
  width: 100%;

  /* Image and text swap sides on alternate rows for visual rhythm. */
  .headshot-col {
    order: ${({ $reverse }) => ($reverse ? 2 : 1)};
  }

  .text-col {
    order: ${({ $reverse }) => ($reverse ? 1 : 2)};
    justify-self: ${({ $reverse }) => ($reverse ? "end" : "start")};
  }

  /* Below ~62em the 420px image leaves too little room for the bio, so the
     row stacks. Stacked rows never alternate. */
  @media screen and (max-width: 62em) {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    gap: 1.5rem;

    .headshot-col,
    .text-col {
      order: initial;
      justify-self: center;
    }
  }
`;

/* Section content is capped well inside the 95rem page Container so it does
   not stretch across ultra-wide viewports. */
const TeamList = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  gap: 70px;

  @media screen and (max-width: 48em) {
    gap: 48px;
  }
`;

const Text = styled.div`
  h4 {
    color: var(--txt-dark-secondary);
  }

  max-width: 560px;

  p {
    width: 100%;
  }

  @media screen and (max-width: 48em) {
    text-align: center;
  }
`;

const TeamMember = (props) => {
  // Odd rows (0-indexed even) keep image-left; every other row flips.
  const reverse = props.index % 2 === 1;

  return (
    <Wrapper>
      <MemberGrid $reverse={reverse}>
        <HeadshotFrame className="headshot-col" $reverse={reverse}>
          <Image
            className="headshot-img-desktop"
            src={props.img}
            alt={props.alt}
            fill
            /* Mobile pulls a ~262px rendition, desktop ~420px; next/image
               builds the srcset from the untouched original. */
            sizes="(max-width: 48em) 262px, 420px"
          />
        </HeadshotFrame>
        <Text className="text-col">
          <div>
            <h3 className="headline accent">{props.name}</h3>
            {/* <img
              className="headshot-img-mobile"
              src={props.img}
              alt={props.alt}
            /> */}
            <h4 className="subhead caps bold">{props.role}</h4>
          </div>
          <p>{props.description}</p>
        </Text>
      </MemberGrid>
    </Wrapper>
  );
};

export default function Team() {
  return (
    <TeamWrapper>
      <Section>
        <Container className="spacing-md">
          <h2 className="headline center">
            meet the <span className="italics accent">inner spirit team</span>
          </h2>
          <TeamList>
            <TeamMember
              index={0}
              img="/team/jan-headshot.jpg"
              alt="Jan, partner of inner spirit photography"
              name="Jan Howells-Laurie"
              role="Partner & Office admin"
              description="Jan is the behind-the-scenes person who helped build Inner Spirit. She has done makeup, hairstyling, and retouching in the past. Now, she may be the first friendly face who greets you when you arrive."
            />
            <TeamMember
              index={1}
              img="/team/fran.jpg"
              alt="Fran, expert photo retouched of inner spirit photography"
              name="Fran Williams"
              role="Expert retoucher, printer, and operations manager"
              description="Fran gives your images breathtaking polish. She retouches, enhances, and custom prints every image. She has been Mark's right hand for 22 years now, with 36 years in the industry. Few can come close to her skills and care."
            />
            <TeamMember
              index={2}
              img="/team/adrienne-headshot-2.jpg"
              alt="Makeup artist and hairstylist of inner spirit photography"
              name="Adrienne Furrie"
              role="Makeup artist and hairstylist"
              description="Adrienne has worked with the top stylists and photographers in North America for over 20 years. Her comforting approach complements her tremendous makeup skill and hairstyling. She is our warm-up act giving you your first rush of confidence."
            />
            <TeamMember
              index={3}
              img="/team/melody-headshot.jpg"
              alt="Body paint artist of inner spirit photo"
              name="Melody Kielek"
              role="Body paint artist"
              description="Melody is one of the best body painters in Alberta. She has been commissioned all over the world. Besides her awesome creative paint skills, she is warm and engaging. She will keep you amused and relaxed as she transforms your body into art.
"
            />
            <TeamMember
              index={4}
              img="/team/bonnie-headshot.jpg"
              alt="Registered Psychologist with inner spirit photo"
              name="Bonnie Sullivan, Ph.D"
              role="Registered Psychologist"
              description="Bonnie gives you tools and experience depth in the Beyond Empowerment sessions, Bonnie is a Registered Psychologist, her Ph.D. is from Palo Alto U. California. She is the core supporting and enhancing Inner Spirit client's emotional & mental health growth. Inner Spirit Photography is the only studio with a Psychologist on board.
"
            />
          </TeamList>
        </Container>
      </Section>
    </TeamWrapper>
  );
}
