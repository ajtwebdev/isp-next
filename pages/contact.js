import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import { Section, Container } from "../components/layoutComponents";
import { ButtonPrimary } from "../components/buttons";

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.75rem 1.75rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  margin: 30px auto;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
`;

const Heading = styled.h3`
  text-align: center;
  font-size: 1.35rem;
  margin-bottom: 1.25rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  display: grid;
  gap: 0.85rem;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  transition: opacity 0.2s ease;
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

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  padding: 0.55rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--clr-accent);
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const PhoneInputWrapper = styled.div`
  .PhoneInput {
    display: flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.4rem 0.7rem;
    font-size: 0.9rem;
  }

  .PhoneInput--focus {
    border-color: var(--clr-accent);
  }

  .PhoneInputInput {
    border: none;
    outline: none;
    font-size: 0.9rem;
    flex: 1;
    padding: 0.2rem 0;
  }

  .PhoneInputCountry {
    margin-right: 0.5rem;
  }
`;

const SubmitButton = styled(ButtonPrimary)`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: ${spin} 0.7s linear infinite;
`;

const ErrorText = styled.p`
  color: #b91c1c;
  font-size: 0.85rem;
  margin: -0.3rem 0 0;
`;

const HoneypotWrapper = styled.div`
  position: absolute;
  left: -9999px;
  top: -9999px;
`;

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [phone, setPhone] = useState();
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (website) {
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: phone || "",
          message: formValues.message,
          website: "",
        }),
      });

      const data = await resp.json();

      if (resp.ok && data.success) {
        router.push("/thank-you");
      } else {
        setFormError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <LayoutJs>
      <Seo
        title="Contact Us"
        description="Get in touch with Inner Spirit Photography."
      />

      <Section>
        <Container>
          <Card>
            <Heading className="headline">Contact Us</Heading>

            <FormWrapper>
              <form onSubmit={handleSubmit} noValidate>
                <Fieldset disabled={loading} $disabled={loading}>
                  <Field>
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                      maxLength={255}
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                      maxLength={255}
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      maxLength={255}
                      required
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="phone_input">Phone number</Label>
                    <PhoneInputWrapper>
                      <PhoneInput
                        id="phone_input"
                        international
                        defaultCountry="US"
                        value={phone}
                        onChange={setPhone}
                        placeholder="Enter phone number"
                        disabled={loading}
                      />
                    </PhoneInputWrapper>
                  </Field>

                  <Field>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={4}
                      required
                    />
                  </Field>

                  {/* Honeypot — leave completely alone, real users never touch this */}
                  <HoneypotWrapper aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </HoneypotWrapper>

                  {formError && <ErrorText>{formError}</ErrorText>}

                  <SubmitButton as="button" type="submit" disabled={loading}>
                    {loading && <Spinner />}
                    {loading ? "Sending…" : "Send"}
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