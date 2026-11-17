import React from "react";
import styled from "styled-components";
import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import { Section, Container } from "../components/layoutComponents";
import { ButtonPrimary } from "../components/buttons";

// The Be Bold contest closed on Oct 15. This page used to hold the entry form
// (a Cyberimpact opt-in posting to list group 9). The form has been removed so
// no new entries can be submitted; the URL stays live with a closed notice so
// existing links do not 404. The page is noindex.

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  margin: 30px auto;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
`;

export default function ContestEntryPage() {
  return (
    <LayoutJs>
      <Seo
        title="Contest Closed"
        description="The Be Bold Contest has closed and is no longer accepting entries."
        noindex
      />

      <Section>
        <Container>
          <Card>
            <h3 className="headline" style={{ textAlign: "center" }}>
              This contest has closed
            </h3>
            <p style={{ textAlign: "center" }}>
              The Be Bold Contest is no longer accepting entries. Thank you to
              everyone who entered.
            </p>
            <p style={{ textAlign: "center" }}>
              <ButtonPrimary href="/contact">Contact us</ButtonPrimary>
            </p>
          </Card>
        </Container>
      </Section>
    </LayoutJs>
  );
}
