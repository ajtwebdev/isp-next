import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../components/layoutComponents";

// The page sits directly on the section background rather than inside a raised
// card: the CyberImpact form already renders its own panel, and nesting one
// card inside another read as heavy.
const Wrapper = styled.div`
  max-width: 46rem;
  margin: 0 auto;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 0 0 0.5rem;
`;

const Standfirst = styled.p`
  text-align: center;
  max-width: 34rem;
  margin: 0 auto 1.25rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--clr-accent);
  font-weight: var(--fw-button, 700);
`;

const Body = styled.div`
  /* One short paragraph now, so it is centred to balance the heading above. */
  max-width: 34rem;
  margin: 0 auto;
  text-align: center;

  p {
    margin: 0 0 1.25rem;
    font-size: 1.05rem;
    line-height: 1.8;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const FormPanel = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(17, 17, 17, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// The iframe is given the full column width so it no longer floats in a
// narrow strip. Its internal layout is CyberImpact's and is not styled here.
// The frame and the overlay share these dimensions so the spinner sits exactly
// where the form was, with no layout shift when it appears.
const FrameWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 33rem;
  height: 323px;

  @media screen and (max-width: 34em) {
    height: 400px;
    max-width: 21rem;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  background: #ffffff;
  text-align: center;
`;

const Spinner = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border: 3px solid rgba(17, 17, 17, 0.12);
  border-top-color: var(--clr-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2.4s;
  }
`;

const OverlayText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: var(--txt-dark-secondary, #4b5563);
`;

const FormFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;

`;

const FinePrint = styled.p`
  margin: 1.5rem 0 0;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--txt-dark-secondary, #4b5563);

  a {
    display: inline;
    color: var(--clr-accent);
    text-decoration: underline;
  }
`;

export default function ReflectionsPage() {
  // CyberImpact redirects *inside* the signup iframe after a successful
  // submission. The framed confirmation page signals us here so the visitor
  // lands on the real full-page confirmation instead of a clipped copy of the
  // site nested in a 400px frame.
  // CyberImpact runs a bot check between submit and its redirect. We cannot
  // read inside a cross-origin frame, but its `load` event still fires on every
  // navigation, so the second load onward means the visitor has submitted.
  const [isWorking, setIsWorking] = useState(false);
  const loadCountRef = useRef(0);
  const revealTimerRef = useRef(null);

  const handleFrameLoad = () => {
    loadCountRef.current += 1;

    // First load is the form itself.
    if (loadCountRef.current < 2) return;

    setIsWorking(true);

    // Safety valve: if CyberImpact ever asks the visitor to complete a
    // challenge, they must be able to see and click it. Reveal the frame again
    // if we have not been redirected shortly after submitting.
    clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => setIsWorking(false), 6000);
  };

  useEffect(() => () => clearTimeout(revealTimerRef.current), []);

  useEffect(() => {
    function handleMessage(event) {
      if (event?.data?.type !== "isp:reflections-subscribed") return;

      // Nothing from the message is used: we always navigate to our own
      // confirmation route on the current origin, so a spoofed message can
      // only ever send the visitor to this same page.
      window.location.replace("/reflections/thank-you");
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <LayoutJs>
      <Seo
        title="Receive Reflections Journal | Inner Spirit Photography"
        description="Twice each month, Mark Laurie shares a short story or personal insight from the studio: confidence, creativity, beauty, transformation and life behind the camera."
      />

      <HeroBannerPadding />
      <Section>
        <Container>
          <Wrapper>
            <Heading className="headline">Receive Reflections Journal</Heading>

            <Standfirst>
              Enjoyed this story? Receive Reflections Journal.
            </Standfirst>

            <Body>
              <p>
                Twice each month, Mark shares stories, photographs, insights,
                and occasional studio news from Inner Spirit Photography.
              </p>
            </Body>

            <FormPanel>
              <FrameWrap>
                <FormFrame
                  src="https://app.cyberimpact.com/clients/60137/subscribe-forms/CF3FC3B8-63CA-458E-84B5-D9AD14F7BC99"
                  width="500"
                  height="323"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  scrolling="auto"
                  title="Reflections Journal subscription form"
                  onLoad={handleFrameLoad}
                />

                {isWorking && (
                  <Overlay role="status" aria-live="polite">
                    <Spinner aria-hidden="true" />
                    <OverlayText>Finishing your subscription&hellip;</OverlayText>
                  </Overlay>
                )}
              </FrameWrap>


              <FinePrint>
                You may unsubscribe at any time. Read our{" "}
                <Link href="/privacy-policy">privacy policy</Link>.
              </FinePrint>
            </FormPanel>
          </Wrapper>
        </Container>
      </Section>
    </LayoutJs>
  );
}
