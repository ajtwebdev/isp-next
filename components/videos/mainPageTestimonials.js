import React from "react"
import styled from "styled-components"
import { Container, Section } from "../layoutComponents"

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 4em auto 20em;

  @media screen and (max-width: 25em) {
    grid-template-rows: 4em auto 25em;
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

  //   @media screen and (max-width: 1000px) {
  //     height: auto;
  //   }
  // }
`

const Text = styled.div`
  color: var(--txt-light);
`

const ReviewText = styled.div`
  max-width: 70ch;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--spacer-lg);
`

const GridAuto = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
  grid-gap: 2em;
`

const Video2 = styled.div`
  // iframe {
  //   height: 450px;
  //   width: 100%;
  //   border-radius: var(--br);
  //   object-fit: cover;

  //   @media screen and (max-width: 1500px) {
  //     height: auto;
  //   }
  // }
`

const Spacer = styled.div`
  margin-bottom: var(--spacer-lg);
`

export default function MainPageTestimonials() {
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
              <h3 className="subhead upper">what can you expect?</h3>{" "}
              <h2 className="headline">
                we'll let <span className="italics">our clients</span> answer
                that...{" "}
              </h2>
            </Text>
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/743214435?h=892cd0c99b&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="HD 2 Placeholder"
              />
            </div>
            <ReviewText className="center spacing accent">
              <h2 className="subhead caps">from baggy sweats to confidence</h2>
              <p className="italics">
                Mark is very gifted at allowing you to feel comfortable in your own skin, by helping you remember the beauty that lies within, which is expressed through the images he captures. For many of us, we do not see what others see in ourselves and through this experience I went from not wanting to look at myself in the mirror to, let’s get these pictures on the wall!
              </p>
              <p className="caps">Kenisha M.</p>
            </ReviewText>
          </Container>
        </Video>
      </Wrapper>
      <Container>
        <GridAuto>
          <Video2 className="spacing">
            <div style={{ padding: "100% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/743213750?h=7891e55ab4&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Testimonial 3 Placeholder"
              />
            </div>
            <ReviewText className="center spacing">
              <h2 className="subhead caps">Nude but Elegant</h2>
              <p className="italics">
                "Are you sure this is me? It is so elegant, It is nude but so
                elegant. I love it. It is so worth it. It’s even better than my
                first time, this is my favorite."
              </p>
              <p className="caps">Renilda F.</p>
            </ReviewText>
          </Video2>
          <Video2 className="spacing">
            <div style={{ padding: "100% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/743213628?h=412ec769f5&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Testimonial 2 Placeholder.mov"
              />
            </div>
            <ReviewText className="center spacing">
              <h2 className="subhead caps">The Day was Empowering</h2>
              <p className="italics">
                "I am in awe, just blown away. The day was empowering, I saw a
                side of myself I never imagined! You have to do this!"
              </p>
              <p className="caps">Allison O.</p>
            </ReviewText>
          </Video2>
          <Video2 className="spacing">
            <div style={{ padding: "100% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/743214578?h=76cb221d47&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Testimonial 1 Placeholder"
              />
            </div>
            <ReviewText className="center spacing">
              <h2 className="subhead caps">I did this for me</h2>
              <p className="italics">
                "I will have wall prints all over my house. All my fav parts are
                highlighted. I have some girlfriends excited to see these and
                have their time. I did this for myself, It is intended for have
                me feel better about myself. Once we started, I didn’t even
                notice I was naked. I was so proud of myself."
              </p>
              <p className="caps">Alison M.</p>
            </ReviewText>
          </Video2>
        </GridAuto>
      </Container>
    </Section>
  )
}
