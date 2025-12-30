import React from "react";
import styled from "styled-components";
import LayoutJs from "../components/layoutJs";
import {
  Container,
  HeroBannerPadding,
  Section,
  Flex,
} from "../components/layoutComponents";
import Seo from "../components/seo";
import { ButtonPrimary,ButtonSecondary } from "../components/buttons";

const ContentWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  gap: 1.5rem;
`;

const MessageText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ButtonGroup = styled(Flex)`
  gap: 1rem;
  margin-top: 1rem;
`;



export default function CheckMailPage() {
  return (
    <LayoutJs>
      <Seo
        title="Check Your Email"
        description="We’ve sent a confirmation email to complete your subscription."
      />

      <HeroBannerPadding />

      <Section>
        <Container>
          <ContentWrapper>
            <h3 className="headline">Check your email</h3>

            <MessageText>
              We’ve just sent you a confirmation email.
              <br />
              <br />
              To complete your subscription and officially enter the contest, please click the <strong>“Confirm my email”</strong> button inside that message.
              <br />
              <br />
              If you don’t see the email, please check your spam or junk folder.
              <br />
              <br />
              Once confirmed, you’re all set!
            </MessageText>

            <ButtonGroup>
              <ButtonPrimary href="/contest">
                Return to Contest
              </ButtonPrimary>

              <ButtonSecondary href="/">
                Return Home
              </ButtonSecondary>
            </ButtonGroup>
          </ContentWrapper>
        </Container>
      </Section>
    </LayoutJs>
  );
}