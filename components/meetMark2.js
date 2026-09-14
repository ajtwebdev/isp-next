import React from "react";
import { Container, Section, GridAuto, Flex } from "./layoutComponents";
import styled from "styled-components";
import { ButtonUnderline } from "./buttons";
import Awards from "./awards";
import Image from "next/image";

const Text = styled.div`
  h3 {
    color: var(--txt-dark-secondary);
  }
`;

const Stats = styled.div`
  color: var(--clr-accent);
`;

const FlexDesktop = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 74em) {
    display: none;
  }

  & > * {
    width: 100%;
  }

  & > * + * {
    margin-left: 2em;

    @media screen and (max-width: 74em) {
      margin-left: 0;
      margin-top: var(--spacer);
    }
  }
`;

const FlexMobile = styled.div`
  display: flex;
  @media screen and (min-width: 74em) {
    display: none;
  }
`;

const MarkImg = styled.div`
  img {
    max-height: 600px;
  }
`;

export default function MeetMark2() {
  return (
    <Section>
      <Container id="mark">
        <FlexDesktop>
          <Text className="spacing">
            <div>
              <h2 className="headline accent">meet mark laurie</h2>
              {/* <h3 className="subhead upper accent italics">
                your boudoir photographer
              </h3> */}
            </div>
            <h3 className="subhead">
              MPA, SPA, M.Photog, Cr.Photog, F/PPOC, F/SWPP <br />
              International Photoartist | Speaker | Writer
            </h3>
            <p>
              Mark believes that women are extraordinary and deserve unique
              images to express who they are. That’s why he is constantly
              seeking to add more creativity to his work.
            </p>
            <p>
              He also deeply understands how vulnerable this experience can be,
              so he infuses encouragement, emotional support, and compassion
              into every photography session.
            </p>
            <p>
              In addition to running Inner Spirit, Mark is the host of the
              Fascinating Women podcast and the creator of the Her Body Speaks
              project.
            </p>
            <p>
              When he’s not behind the camera, he’s probably hiking around
              Alberta with his wife, Jan, and his cat, Lucy. (Well, admittedly,
              getting Lucy to hike is still a work in progress…)
            </p>
          </Text>
          <MarkImg>
            <Image
              className="stretch"
              height={625}
              width={500}
              src="/mark-nude-boudoir-photographer-calgary.gif"
              alt="nude and boudoir photographer in calgary, AB"
            />
          </MarkImg>
        </FlexDesktop>
        <FlexMobile>
          <Text className="spacing">
            <h2 className="headline">
              meet mark laurie, <br />
              <span className="italics accent">your boudoir photographer</span>
            </h2>
            <div>
              <Image
                className="stretch"
                height={625}
                width={500}
                src="/mark-nude-boudoir-photographer-calgary.gif"
                alt="nude and boudoir photographer in calgary, AB"
              />
            </div>
            <p>
              It’s Mark’s intuition and emotional presence with clients that
              makes the Inner Spirit Photography experience life-changing.
            </p>
            <p>
              Mark offered the first nude & boudoir photography studio in
              Calgary and remains the best. His imaginative portraits expand
              beyond the typical “lingerie and satin sheets” boudoir. Mark’s
              creatively passionate presentation of women has earned him the
              honour of being the most awarded photographer in his niche in
              Canada. Possibly North America.
            </p>
            <p>
              It is common for his clients to be thrilled to have gained much
              more than breathtaking images. They discover a sense of
              reconnecting with themselves. And their images become reminders of
              their beauty, courage and resilience.
            </p>
            <p>
              Be it for a fun adventure or a much deeper need, your experience
              with Mark will touch your soul while showcasing your breathtaking
              beauty, all through his talented skills.
            </p>
            <p>
              He’s not alone, an incredible team of women, along with Jan, his
              partner and wife, makes your time with Mark exceptional.
            </p>
          </Text>
        </FlexMobile>
      </Container>
    </Section>
  );
}
