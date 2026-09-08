import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import { Section, Container } from "../components/layoutComponents";
import { ButtonPrimary } from "../components/buttons";

/**
 * CyberImpact subscription settings.
 *
 * The account id is shared with the contest form (pages/contest-form.js).
 *
 * TODO(client): CI_GROUP_ID currently reuses the CONTEST list id ("9") because
 * the Reflections Journal list id has not been supplied yet. Subscribers will
 * land on the wrong list until this is replaced.
 */
// TEMP: CyberImpact submission disabled until list ID confirmed.
// Flip this single flag back to `true` to restore the real POST to CyberImpact.
// Nothing else needs to change: the form action, the hidden ci_* inputs and
// CI_GROUP_ID below are all left intact and are used as soon as this is true.
const CYBERIMPACT_SUBMISSION_ENABLED = false;

const CI_ACCOUNT_ID = "d5d6a294-fdde-4c20-3de4-87103dafd0d8";
const CI_GROUP_ID = "9";
const SITE_ORIGIN = "https://innerspiritphoto.com";

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem 1.75rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 640px;
  margin: 30px auto;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 1.35rem;
  margin-bottom: 1.25rem;
`;

const Body = styled.div`
  margin: 0 0 1.75rem;

  p {
    margin: 0 0 1rem;
    font-size: 1rem;
    line-height: 1.7;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const FormWrapper = styled.div`
  border-top: 1px solid rgba(17, 17, 17, 0.1);
  padding-top: 1.5rem;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.55rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--clr-accent);
  }
`;

const SubmitButton = styled(ButtonPrimary)`
  justify-self: start;
  cursor: pointer;
`;

// Unsubscribe notice and privacy link sit BELOW the form, not above it.
const FinePrint = styled.p`
  margin: 1.25rem 0 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--txt-dark-secondary, #4b5563);

  a {
    display: inline;
    color: var(--clr-accent);
    text-decoration: underline;
  }
`;

const Confirmation = styled.div`
  background: rgba(17, 17, 17, 0.04);
  border-left: 3px solid var(--clr-accent);
  border-radius: 8px;
  padding: 1.1rem 1.25rem;
  margin: 0 0 1.75rem;

  h2 {
    font-size: 1.05rem;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export default function ReflectionsPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  // CyberImpact posts natively and redirects back here via ci_sent_url, so the
  // success state arrives as a query param rather than an in-page callback.
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.subscribed !== "1") return;

    setConfirmed(true);

    // GA4 signup-completion event via the GTM dataLayer. Guarded so a missing
    // container (see note in _document.tsx) can never break the page.
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "signup-completion",
        signup_method: "cyberimpact",
        signup_list: "reflections-journal",
      });
    }
  }, [router.isReady, router.query.subscribed]);

  const handleSubmit = (event) => {
    // When enabled, let the browser perform its normal POST to CyberImpact.
    if (CYBERIMPACT_SUBMISSION_ENABLED) return;

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("[reflections] TEMP: CyberImpact submission disabled — no data sent.", {
      firstName: formData.get("ci_firstname"),
      email: formData.get("ci_email"),
    });

    // Route through the same ?subscribed=1 state the real CyberImpact redirect
    // uses, so the confirmation message and GA4 event behave identically.
    router.push("/reflections?subscribed=1", undefined, { shallow: true });
  };

  return (
    <LayoutJs>
      <Seo
        title="Receive Reflections Journal | Inner Spirit Photography"
        description="Twice each month, Mark Laurie shares a short story or personal insight from the studio: confidence, creativity, beauty, transformation and life behind the camera."
      />

      <Section>
        <Container>
          <Card>
            <Heading className="headline">Receive Reflections Journal</Heading>

            {confirmed && (
              <Confirmation role="status" aria-live="polite">
                <h2>Thank you — one last step</h2>
                <p>
                  Please check your inbox and confirm your email address to
                  finish subscribing to Reflections Journal.
                </p>
              </Confirmation>
            )}

            <Body>
              <p>
                Reflections Journal has become something close to my personal
                written journal a place where I pause over a photograph, a
                conversation or a moment from the studio and explore why it
                stayed with me.
              </p>
              <p>
                Twice each month, I share one of those entries: short stories
                and personal insights about confidence, creativity, beauty,
                transformation and life behind the camera.
              </p>
              <p>
                From time to time, you may also receive special offers, contest
                news and notices of upcoming Inner Spirit events or creative
                experiences.
              </p>
              <p>
                If this sounds like something you would enjoy, I would be
                delighted to have you join me.
              </p>
            </Body>

            <FormWrapper>
              <form
                action="https://app.cyberimpact.com/optin"
                method="post"
                acceptCharset="utf-8"
                onSubmit={handleSubmit}
              >
                <Fieldset>
                  <Field>
                    <Label htmlFor="ci_firstname">First name *</Label>
                    <Input
                      type="text"
                      id="ci_firstname"
                      name="ci_firstname"
                      autoComplete="given-name"
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="ci_email">Email *</Label>
                    <Input
                      type="email"
                      id="ci_email"
                      name="ci_email"
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <input type="hidden" name="ci_groups" value={CI_GROUP_ID} />
                  <input
                    type="hidden"
                    name="ci_account"
                    value={CI_ACCOUNT_ID}
                  />
                  <input type="hidden" name="ci_language" value="en_ca" />
                  <input
                    type="hidden"
                    name="ci_sent_url"
                    value={`${SITE_ORIGIN}/reflections?subscribed=1`}
                  />
                  <input
                    type="hidden"
                    name="ci_confirm_url"
                    value={`${SITE_ORIGIN}/reflections?subscribed=1`}
                  />

                  <SubmitButton as="button" type="submit">
                    Subscribe
                  </SubmitButton>
                </Fieldset>
              </form>

              <FinePrint>
                You may unsubscribe at any time. Read our{" "}
                <Link href="/privacy-policy">privacy policy</Link>.
              </FinePrint>
            </FormWrapper>
          </Card>
        </Container>
      </Section>
    </LayoutJs>
  );
}
