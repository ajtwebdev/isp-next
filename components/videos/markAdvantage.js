import React from "react"
import styled from "styled-components"
import { AnchorUnderline } from "../buttons"
import { Container, GridAuto, Section } from "../layoutComponents"
import LazyVimeo from "./LazyVimeo"

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 4em auto 12em;

  @media screen and (max-width: 32em) {
    grid-template-rows: 4em auto 6em;
  }
`

const Bg = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / -1;
  z-index: 1;
  background: var(--clr-accent);
`

const Video = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / -1;
  z-index: 2;
  // iframe {
  //   height: 550px;
  //   width: 100%;
  //   border-radius: var(--br);

  //   @media screen and (max-width: 1200px) {
  //     height: auto;
  //   }
  // }
`

const Text = styled.div`
  color: var(--txt-light);
`

const Flex = styled.div`
  display: flex;
  img {
    /* width: 100%; */
  }
  @media screen and (max-width: 48em) {
    flex-direction: column;
  }

  & > * {
    width: 100%;
  }

  & > * + * {
    margin-left: 2em;

    @media screen and (max-width: 48em) {
      margin-left: 0;
      margin-top: var(--spacer);
    }
  }
`

export default function MarkAdvantage() {
  return (
    <Section className="spacing-lg">
      <Wrapper>
        <Bg>
          <div></div>
          <div></div>
        </Bg>
        <Video>
          <Container className="spacing">
            <Text className="center">
              {/* <h3 className="subhead upper">the mark advantage</h3> */}
              <h2 className="headline">
                The Advantages of a{" "}
                <span className="italics">safe male photographer</span> with a
                female team
              </h2>
              <p>
                Psychologist, Dr. Bonnie Sullivan discovered that women feel
                substantially more empowered and confident after a session with
                a safe male photographer.
              </p>
            </Text>
            <LazyVimeo
              src="https://player.vimeo.com/video/743214161?h=807d640dfd&badge=0&autopause=0&player_id=0&app_id=58479"
              title="Widescreen 2 Placeholder"
              poster="/posters/743214161.jpg"
              aspectRatio="42.6%"
            />
            {/* <center>
              <AnchorUnderline href="">
                watch the full video &#x2192;
              </AnchorUnderline>
            </center> */}
          </Container>
        </Video>
      </Wrapper>
      <Container>
        <Flex className="center spacing accent">
          <div className="center">
            <h3 className="subhead accent caps">advantage 1</h3>
            <p className="accent">
              With a Safe Male Photographer, the male/female dynamic kicks in,
              opening up her creativity. This dynamic pulls out a woman’s rich
              feminity. Her look into the camera becomes more authentically
              sensual, playful, and flirty, all while brimming with confidence.
            </p>
          </div>
          <div className="center">
            <h3 className="subhead accent caps">advantage 2</h3>
            <p className="accent">
              There is incredible power in being safe and totally in control of
              a situation. Like when you are intentionally and openly being
              personally expressive with a male photographer. It is an
              experience that alters and grows your sense of personal power and
              confidence.
            </p>
          </div>
          <div className="center">
            <h3 className="subhead accent caps">advantage 3</h3>
            <p className="accent">
              “The authentic warmth in Mark’s voice encourages a woman to
              respond with confidence. Allowing her to express herself freely,
              even boldly.”
            </p>
          </div>
        </Flex>
      </Container>
    </Section>
  )
}
