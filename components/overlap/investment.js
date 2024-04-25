import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Section, Container } from "../layoutComponents";
import {
  TextBoxRight,
  TextBoxLeft,
  WrapperTextLeft,
  WrapperTextRight,
} from "./overlapStyles";

export default function Investment() {
  return (
    <Section>
      <Container className="spacing">
        <h2 className="headline center italics">investment & inclusions</h2>
        <WrapperTextRight>
          <Image
            className="img-left"
            src="/calgary-boudoir-photography-cost.png"
            alt="calgary boudoir photography cost"
            width={870}
            height={100}
          />
          <TextBoxRight className="spacing text-right">
            <h3 className="subhead accent caps">session & enlargements:</h3>
            <p>
              Our Signature Experience 4-hour Session is $495
            </p>
            <p>
              Our Connoisseur Experience 2-hour Session is $395
            </p>
            <p>
              Our  Essence Experience $795- 1 hour session with 3 prints.
            </p>
            <p>
              Image collections, framed prints, bound books and digital images
              range from $795 - $5000.
            </p>
            <p>
              We offer <span className="bold">flexible layaway options</span>{" "}
              because we believe every person should have access to this
              experience and images.
            </p>
          </TextBoxRight>
        </WrapperTextRight>
      </Container>
      <div className="spacing-md">
        <Container>
          <WrapperTextLeft>
            <TextBoxLeft className="spacing text-left">
              <h3 className="subhead italics caps">
                included with every session:
              </h3>
              <p>
                <span className="bold">Professional hair and makeup</span> to
                your taste by our makeup artist in our studio
              </p>
              <p>
                <span className="bold">Unlimited</span> outfit changes
              </p>
              <p>
                Choice of our{" "}
                <span className="bold">creative set variations</span>, ranging
                from a Bedroom Set to Red Rock Canyon to a Log Cabin
              </p>
              <p>
                <span className="bold">Posing guidance</span> to help you feel
                confident we’re capturing your best side
              </p>
              <p>
                <span className="bold">Access to our outfits and props</span> to
                help convey the attitude you envision
              </p>
              <p>
                <span className="bold">Image refinements</span> (until you’re
                happy!)
              </p>
              <p>
                <span className="bold">Private ordering session</span> in person
                or Zoom
              </p>
            </TextBoxLeft>
            <Image
              className="img-right"
              src="/included-with-boudoir-sessions-calgary.jpg"
              alt="what's included with our calgary boudoir session"
              width={720}
              height={100}
            />
          </WrapperTextLeft>
        </Container>
        <Container>
          <WrapperTextRight>
            <Image
              className="img-left"
              src="/special-boudoir-add-ons-calgary.jpg"
              alt="special boudoir add ons calgary"
              width={900}
              height={100}
            />
            <TextBoxRight className="spacing text-right">
              <h3 className="subhead accent caps">
                special add-ons - not offered at any other studios:
              </h3>
              <p>
                <span className="bold">The Body Painting Experience:</span>{" "}
                Imagine your body being transformed into living art. Our
                creative painters can take the slightest idea and expand it into
                a masterpiece.
              </p>
              <p>
                <span className="bold">The Beyond Empowerment:</span>{" "}
                Psychologist Dr. Bonnie Sullivan gives your experience more
                depth, revelation, and empowerment. She gives you insights with
                tools to maximize the personal value of your session. This
                embeds the empowerment and confidence much deeper and longer.
              </p>
              <p>
                <span className="bold">The Mesmerizing Shibari:</span> Artful
                Japanese rope designs as graceful bondage or fashion designs,
                done by our skilled Rope Master.
              </p>
            </TextBoxRight>
          </WrapperTextRight>
        </Container>
      </div>
    </Section>
  );
}
