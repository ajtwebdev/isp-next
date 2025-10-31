import React, { useEffect } from "react";
import LayoutJs from "../components/layoutJs";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../components/layoutComponents";
import Seo from "../components/seo";

export default function ThankYouContest() {
  useEffect(() => {
      // Check if event has already been fired in this session
      if (!sessionStorage.getItem("cr_fired")) {
        if (typeof fbq === "function") {
          fbq("track", "CompleteRegistration");
          sessionStorage.setItem("cr_fired", "1");
          console.log("fbq CompleteRegistration fired");
        } else {
          console.warn("fbq not defined — make sure the Facebook Pixel script is loaded");
        }
      }
    }, []); // Empty dependency array → runs once on component mount
  
  return (
    <LayoutJs>
      <Seo
        title="Thank you for entering our contest!"
        description="This is our thank you page for our contest!"
      />
      <HeroBannerPadding />
      <Section>
        <Container>
          <h1 className="headline">thank you for entering our contest!</h1>
          <p>
            Best of Luck! We will be reaching out if you are one of the winners.{" "}
            <br /> By the way, have a session then win the contest, we credit
            the prize back to you. <br />
            Call us to explore what your session could look like. 403.252.2662
          </p>
        </Container>
      </Section>
    </LayoutJs>
  );
}
