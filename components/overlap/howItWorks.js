import React from "react";
import Image from "next/image";
import { ButtonUnderline } from "../buttons";
import { Container, Section } from "../layoutComponents";
import styled from "styled-components";

const WrapperTextLeft = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;

  @media screen and (max-width: 82em) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
  }

  .img-right {
    border-radius: var(--br);

    @media screen and (max-width: 82em) {
      height: 800px;
    }
  }
`;

const Text = styled.div`
  background: var(--clr-light);
  color: var(--clr-accent);
  padding: 2em;
  border: 1px solid var(--clr-accent);
  border-radius: var(--br);
  align-self: center;

  h2 {
    font-size: var(--fs-1);
    line-height: 1.1;
    font-family: var(--ff-trajan);

    @media screen and (max-width: 31.5em) {
      font-size: var(--fs-3);
    }
  }
`;

export default function HowItWorks() {
  return (
    <Section>
      <Container className="spacing">
        <WrapperTextLeft>
          <Text className="spacing text-left">
            <div className="">
              <h2 className="">
                your{" "}
                <span className="italics accent">inner spirit experience</span>{" "}
                awaits...
              </h2>
              <h3 className="subhead italics caps">how it works</h3>
            </div>
            <div className="spacing">
              <h4 className="teriatary italics caps">
                1. getting comfortable and planning
              </h4>
              <div>
                <p className="subhead accent caps">
                  Complimentary Planning Session
                </p>
                <p>
                  <span className="italics">It all begins!</span> Book your
                  complimentary planning session using our booking page.
                </p>
              </div>
              <div>
                <p className="subhead accent caps">Introductory Conversation</p>
                <p>
                  Chat with Mark in person or over Zoom to see his work, explore
                  ideas, and go over artwork choices. All your concerns will
                  vanish as you connect with Mark and plan your unique
                  photography session!{" "}
                  <span className="italics">
                    Don’t worry if you’re not sure what you want yet.
                  </span>{" "}
                  Mark asks great questions to get to the heart of the
                  experience you’re seeking.
                </p>
              </div>
            </div>
            <div className="spacing">
              <h4 className="teriatary italics caps">
                2. your personal session day
              </h4>
              <div>
                <p className="subhead accent caps">
                  Makeup, Hair, and Conversation
                </p>
                <p>
                  <span className="italics">Session day is here!</span> Relax
                  into your session with a drink in hand while you get
                  professional makeup and hairstyling done the way you want it.
                  (We think you’ll enjoy the conversation as much as the
                  pampering!). Meanwhile, watch the studio transform as Mark
                  builds your chosen sets!
                </p>
              </div>
              <div>
                <p className="subhead accent caps">Your Session</p>
                <p>
                  <span className="italics">
                    Now your experience really starts!
                  </span>{" "}
                  Mark guides you into elegant poses and offers gentle
                  encouragement. Some of our clients have become emotional
                  seeing how raw and breathtaking they look through the lens —
                  it feels like Mark is intuitively revealing who you are.
                </p>
              </div>
            </div>
            <div className="spacing">
              <h4 className="teriatary italics caps">
                3. ordering your portraits
              </h4>
              <div>
                <p className="subhead accent caps">Image Reveal and Ordering</p>
                <p>
                  <span className="italics">It’s reveal day!</span> Return to
                  the studio, grab a comfy seat, and watch as we project each of
                  your I-can’t-believe-that’s-me images up on our big screen.
                  You can take your time to revel in the experience and select
                  the images you’d like to order! We have a visual selection
                  process that makes it easy and fun even if you’re a little
                  indecisive.
                </p>
              </div>
            </div>
            <div className="spacing">
              <h4 className="teriatary italics caps">
                4. Taking home your artwork
              </h4>
              <div>
                <p className="subhead accent caps">
                  Final Portrait Unveiling and Pickup
                </p>
                <p>
                  <span className="italics">
                    Finally, your portraits are yours to take home!
                  </span>{" "}
                  Every stage is an experience, and so is this. Framed wall
                  prints are unveiled; custom books are unwrapped. You might
                  find yourself gasping as you see them! Take your final images
                  home to cherish forever, as artwork or as a treasured object
                  to admire whenever you need an extra dose of confidence.
                </p>
              </div>
            </div>
          </Text>
          <Image
            className="img-right"
            src="/your-boudoir-experience-awaits.jpg"
            alt="how your boudoir experience works"
            width={350}
            height={1148}
            objectFit="contain"
          />
        </WrapperTextLeft>
      </Container>
    </Section>
  );
}
