import React from "react";
import styled from "styled-components";
import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import { Section, Container } from "../components/layoutComponents";
import { ButtonPrimary } from "../components/buttons";


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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Fieldset = styled.fieldset`
  border: none;
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
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  padding: 0.75rem 0.85rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--clr-accent);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 0.85rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--clr-accent);
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;

  input {
    margin-top: 0.25rem;
  }

  input[type="checkbox"] {
    accent-color: #6c0b3a;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  label {
    line-height: 1.5;
  }
`;

const SubmitButton = styled(ButtonPrimary)`
  margin-top: 1.5rem;
  width: 100%;
  text-align: center;
`;


export default function ContestEntryPage() {
  return (
    <LayoutJs>
      <Seo
        title="Enter the Contest"
        description="Subscribe to our newsletter to enter the contest."
      />

      <Section>
        <Container>
          <Card>
            <h3 className="headline" style={{ textAlign: "center" }}>
            Contest Form
            </h3>

            <FormWrapper>
              <form
                action="https://app.cyberimpact.com/optin"
                method="post"
                acceptCharset="utf-8"
              >
                <Fieldset>
                  <Field>
                    <Label htmlFor="ci_firstname">First name *</Label>
                    <Input
                      type="text"
                      id="ci_firstname"
                      name="ci_firstname"
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="ci_lastname">Last name</Label>
                    <Input type="text" id="ci_lastname" name="ci_lastname" />
                  </Field>

                  <Field>
                    <Label htmlFor="ci_email">Email *</Label>
                    <Input
                      type="email"
                      id="ci_email"
                      name="ci_email"
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="ci_custom_field__11">Phone number</Label>
                    <Input
                      type="tel"
                      id="ci_custom_field__11"
                      name="ci_custom_field__11"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="ci_custom_field__8">Comment *</Label>
                    <Textarea
                      id="ci_custom_field__8"
                      name="ci_custom_field__8"
                      rows={4}
                      required
                    />
                  </Field>

                  <CheckboxRow>
                    <input
                      type="checkbox"
                      id="ci_custom_field__10"
                      name="ci_custom_field__10"
                      value="yes"
                      required
                    />
                    <label htmlFor="ci_custom_field__10">
                      Subscribe to the newsletter *
                    </label>
                  </CheckboxRow>
                  <input type="hidden" name="ci_groups" value="9" />
                  <input
                    type="hidden"
                    name="ci_account"
                    value="d5d6a294-fdde-4c20-3de4-87103dafd0d8"
                  />
                  <input type="hidden" name="ci_language" value="en_ca" />
                  <input
                    type="hidden"
                    name="ci_sent_url"
                    value="https://innerspiritphoto.com/check-mail"
                  />
                  <input
                    type="hidden"
                    name="ci_confirm_url"
                    value="https://innerspiritphoto.com/thank-you-contest"
                  />

                  <SubmitButton as="button" type="submit">
                    Submit 
                  </SubmitButton>
                </Fieldset>
              </form>
            </FormWrapper>
          </Card>
        </Container>
      </Section>
    </LayoutJs>
  );
}
