import React, { useEffect } from "react";
import styled from "styled-components";
import { IoCheckmarkCircle } from "react-icons/io5";
import LayoutJs from "../components/layoutJs";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../components/layoutComponents";
import { ButtonPrimary } from "../components/buttons";
import Seo from "../components/seo";

// Mirrors the card treatment used on the contact and reflections pages so the
// confirmation reads as part of the same flow the visitor just came from.
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
  margin: 0 auto;
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--txt-dark-secondary, #4b5563);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(17, 17, 17, 0.1);
  margin: 2rem 0 1.75rem;
`;

const CtaBlock = styled.div`
  h2 {
    font-size: 1.05rem;
    margin: 0 0 0.6rem;
  }

  p {
    margin: 0 auto 1.5rem;
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--txt-dark-secondary, #4b5563);
  }
`;

export default function ThankYou() {
  // useEffect(() => {
  //     console.log("ThankYouContest component mounted");
  //       // Check if event has already been fired in this session
  //       if (!sessionStorage.getItem("cr_fired")) {
  //         setTimeout(() => {
  //           console.log("Waiting 2 seconds before firing fbq event");
  //           if (typeof fbq === "function") {
  //             fbq("track", "CompleteRegistration");
  //             sessionStorage.setItem("cr_fired", "1");
  //             console.log("fbq CompleteRegistration fired");
  //           } else {
  //             console.warn("fbq not defined — make sure the Facebook Pixel script is loaded");
  //           }
  //         }, 2000); 
          
  //       }
  //     }, []); // Empty dependency array → runs once on component mount
    
  return (
    <LayoutJs>
      <Seo
        title="Thank you for filling out our contact form!"
        description="Thank you!"
      />
      <HeroBannerPadding />
      <Section>
        <Container>
          <Card>
            <SuccessIcon aria-hidden="true" />

            <Heading className="headline">
              thank you for contacting us!
            </Heading>

            <Lead role="status">
              Your message has been sent successfully. We will be reaching out
              to you soon.
            </Lead>

            <Divider />

            <CtaBlock>
              <h2>While you wait, join Reflections Journal</h2>
              <p>
                Twice each month, Mark shares a short story or personal insight
                from the studio on confidence, creativity and life
                behind the camera.
              </p>
              <ButtonPrimary href="/reflections">
                Receive Reflections Journal
              </ButtonPrimary>
            </CtaBlock>
          </Card>
        </Container>
      </Section>
    </LayoutJs>
  );
}
