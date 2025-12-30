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



    export default function SorryPage() {
    return (
        <LayoutJs>
        <Seo
            title="We’re Sorry"
            description="You declined to enter the contest."
        />

        <HeroBannerPadding />

        <Section>
            <Container>
            <ContentWrapper>
                <h3 className="headline">We’re sorry</h3>

                <MessageText>
                You declined to enter the contest.
                <br />
                <br />
                Your entry needs a subscription to be complete.
                <br />
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
        </Section>
        </LayoutJs>
    );
    }