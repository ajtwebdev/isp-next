import React, { useEffect } from "react";
import LayoutJs from "../components/layoutJs";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../components/layoutComponents";
import Seo from "../components/seo";

export default function ThankYou() {
  useEffect(() => {
      console.log("ThankYouContest component mounted");
        // Check if event has already been fired in this session
        if (!sessionStorage.getItem("cr_fired")) {
          setTimeout(() => {
            console.log("Waiting 2 seconds before firing fbq event");
            if (typeof fbq === "function") {
              fbq("track", "CompleteRegistration");
              sessionStorage.setItem("cr_fired", "1");
              console.log("fbq CompleteRegistration fired");
            } else {
              console.warn("fbq not defined — make sure the Facebook Pixel script is loaded");
            }
          }, 2000); 
          
        }
      }, []); // Empty dependency array → runs once on component mount
    
  return (
    <LayoutJs>
      <Seo
        title="Thank you for filling out our contact form!"
        description="Thank you!"
      />
      <HeroBannerPadding />
      <Section>
        <Container>
          <h1 className="headline">thank you for contacting us!</h1>
          <p>We Will be Reaching Out To You Soon.</p>
        </Container>
      </Section>
    </LayoutJs>
  );
}
