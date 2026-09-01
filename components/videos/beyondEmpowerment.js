import React from "react"
import styled from "styled-components"
import { AnchorUnderline } from "../buttons"
import { Container, GridAuto, Section, Flex } from "../layoutComponents"
import LazyVimeo from "./LazyVimeo"

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 2em auto 12em;

  @media screen and (max-width: 27em) {
    grid-template-rows: 4em auto 8em;
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

export default function BeyondEmpowerment() {
  return (
    <Section>
      <Wrapper>
        <Bg>
          <div></div>
          <div></div>
        </Bg>
        <Video>
          <Container className="spacing">
            <Text className="center">
              <h3 className="subhead upper">
                bonnie sullivan, psychologist, explains
              </h3>{" "}
              <h2 className="headline">the beyond empowerment session</h2>
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
    </Section>
  )
}
