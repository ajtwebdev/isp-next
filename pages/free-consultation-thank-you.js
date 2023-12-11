import react from "react";
import LayoutJs from "../components/layoutJs";
import {
  Container,
  HeroBannerPadding,
  Section,
} from "../components/layoutComponents";
import Seo from "../components/seo";

export default function ThankYouContact() {
  return (
    <LayoutJs>
      <Seo
        title="Thank you for Reaching out!"
        description="This is our thank you page for our contact!"
      />
      <HeroBannerPadding />
      <Section>
        <Container>
          <h1 className="headline">Thank You for Reaching Out!</h1>
          <p>
            We appreciate your interest in our services. Our team will review
            your message, and we'll get back to you as soon as possible <br />
            If your inquiry is urgent, feel free to give us a call at
            403.252.2662. We look forward to connecting with you!
          </p>
        </Container>
      </Section>
    </LayoutJs>
  );
}
