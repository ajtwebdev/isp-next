import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { IoCheckmarkCircle } from "react-icons/io5";

import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../../components/layoutComponents";
import { ButtonPrimary } from "../../components/buttons";

// Matches the card treatment on pages/thank-you.js so both confirmations read
// as the same moment in the site.
const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2.5rem 1.75rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;

const SuccessIcon = styled(IoCheckmarkCircle)`
  color: var(--clr-accent);
  font-size: 3rem;
  margin-bottom: 0.75rem;
`;

const Heading = styled.h1`
  font-size: 1.35rem;
  margin: 0 0 0.75rem;
`;

const Lead = styled.p`
  margin: 0 auto 2rem;
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--txt-dark-secondary, #4b5563);
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 auto 1rem;
  border: 3px solid rgba(17, 17, 17, 0.12);
  border-top-color: var(--clr-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2.4s;
  }
`;

const LoadingText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--txt-dark-secondary, #4b5563);
`;

const FallbackLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--clr-accent);
  text-decoration: underline;
`;

export default function ReflectionsThankYou() {
  // CyberImpact performs its redirect inside the signup iframe, which would
  // render the whole site nested in a 400px frame. Until we have confirmed we
  // are the top-level document we show a loading state instead of the
  // confirmation, so the framed copy never flashes the full page.
  const [isTopLevel, setIsTopLevel] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let framed = false;
    try {
      framed = window.top !== window.self;
    } catch (err) {
      // Cross-origin parent: reading window.top throws, which itself means
      // we are framed.
      framed = true;
    }

    if (framed) {
      // Ask the host page to navigate itself. This is the reliable path: it
      // works even when the parent is on a different origin (www vs apex, or a
      // Netlify preview domain), where touching window.top.location is blocked
      // and fails silently. pages/reflections.js listens for this message.
      try {
        window.parent.postMessage(
          { type: "isp:reflections-subscribed" },
          "*"
        );
      } catch (err) {
        // Nothing to do: the direct attempt below is the fallback.
      }

      // Same-origin fast path, in case the host page is an older build that
      // does not yet listen for the message above.
      try {
        window.top.location.replace(window.location.href);
      } catch (err) {
        // Cross-origin parent: blocked. The postMessage above handles it, and
        // the visible "Continue" link is the last resort.
      }
      return;
    }

    setIsTopLevel(true);

    // Only recorded once we are the top-level document, so the framed load
    // cannot double-count the conversion.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "signup-completion",
      signup_method: "cyberimpact",
      signup_list: "reflections-journal",
    });
  }, []);

  return (
    <LayoutJs>
      {/* Confirmation landing pages are not search results. */}
      <Seo
        title="You're subscribed to Reflections Journal | Inner Spirit Photography"
        description="Thank you for subscribing to Reflections Journal."
        noindex
      />
      <HeroBannerPadding />
      <Section>
        <Container>
          <Card>
            {isTopLevel ? (
              <>
                <SuccessIcon aria-hidden="true" />

                <Heading className="headline">
                  you&rsquo;re subscribed!
                </Heading>

                <Lead role="status">
                  Thank you for joining Reflections Journal. Your first entry
                  will arrive with the next issue twice each month, Mark
                  shares stories, photographs, insights, and occasional studio
                  news from Inner Spirit Photography.
                </Lead>

                <ButtonPrimary href="/blog">Read the blog</ButtonPrimary>
              </>
            ) : (
              <div role="status" aria-live="polite">
                <Spinner aria-hidden="true" />
                <LoadingText>Finishing your subscription&hellip;</LoadingText>
                {/* If scripting is blocked or the break-out is slow, the
                    visitor still has a way out of the frame. */}
                <FallbackLink href="/reflections/thank-you" target="_top">
                  Continue
                </FallbackLink>
              </div>
            )}
          </Card>
        </Container>
      </Section>
    </LayoutJs>
  );
}
