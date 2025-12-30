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
    max-width: 650px;
    gap: 1.5rem;

     h3{
  text-align: left;
}
    `;

    const MessageText = styled.p`
    font-size: 1.1rem;
    text-align: left;
    margin-left: 0px;
    `;

    const ButtonGroup = styled(Flex)`
    gap: 1rem;
    margin-top: 1rem;
    margin-left: 0px;
    `;

    export const SectionWrapper = styled.section`
      padding-top: 1.5rem;
      padding-bottom: 4rem;
    `;


    export default function SorryPage() {
    return (
        <LayoutJs>
        <Seo
            title="We’re Sorry"
            description="You declined to enter the contest."
        />

        <HeroBannerPadding />

        <SectionWrapper>
            <Container>
            <ContentWrapper>
                <h3 className="headline">We’re sorry</h3>

                <MessageText>
                You declined to enter the contest.
                <br />
                Your entry needs a subscription to be complete.
                <br />
                If you change your mind, you can re-enter by choosing{" "}
                <strong>Yes</strong>.
                </MessageText>

                <ButtonGroup>
                <ButtonPrimary href="/contest">
                    Go Back & Enter Contest
                </ButtonPrimary>

                <ButtonSecondary href="/">
                    Return Home
                </ButtonSecondary>
                </ButtonGroup>
            </ContentWrapper>
            </Container>
        </SectionWrapper>
        </LayoutJs>
    );
    }