import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Section, Container, Flex, FlexMobileOpp } from "../layoutComponents";
import { Label, Input, TextArea, Submit, Select } from "./formItems";
import Map from "../map";
import { AnchorInline, AnchorUnderline } from "../buttons";
import Image from "next/image";

const FormWrapper = styled.div``;

const Text = styled.div`
  max-width: 130ch;
  widht: 100%;
`;

const Info = styled.div`
  align-self: flex-start;
`;

const Socials = styled.div`
  display: flex;

  & > * + * {
    margin-left: 15px;
  }

  div {
    display: flex;

    & > * + * {
      margin-left: 5px;
    }
  }

  img {
    width: 25px;
  }
`;

export default function FormContact(props) {
  const [properties, setProperties] = useState({
    keep_up_with_us: "",
    Session_wanted_for: "",
    message: "",
    first_Name: "",
    last_name: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    properties: [
      {
        name: "first_name",
        value: "",
      },
      {
        name: "last_name",
        value: "",
      },
      {
        name: "keep_up_with_us",
        value: "",
      },
      {
        name: "Session_wanted_for",
        value: "",
      },
      {
        name: "message",
        value: "",
      },
    ],
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: properties?.first_Name + " " + properties.last_name,
      properties: [
        {
          name: "first_name",
          value: properties?.first_Name,
        },
        {
          name: "last_name",
          value: properties?.last_name,
        },
        {
          name: "keep_up_with_us",
          value: properties?.keep_up_with_us,
        },
        {
          name: "Session_wanted_for",
          value: properties?.Session_wanted_for,
        },
        {
          name: "message",
          value: properties?.message,
        },
      ],
    }));
  }, [properties]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://markl.sendly.co.uk/api/site/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer w74fd560ced9a463990c64c52592be364", // Set the content type to JSON
            // Add any other headers if needed
          },
          body: JSON.stringify(formData), // Convert your data to a JSON string
        }
      );
      if (response.status === 200) {
        console.log("dat saved");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Section>
      <Container className="spacing">
        <Text>
          <h3 className="subhead caps accent">
            your complimentary planning session is the first step on your{" "}
            <span className="italics">transformative journey!</span>
          </h3>
        </Text>
        <Flex className="spacing-lg">
          {/* flex item 1 */}
          <FormWrapper>
            <form
              acceptCharset="UTF-8"
              // action="https://markl.sendly.co.uk/api/site/contacts"
              // method="POST"
            >
              {/* <input
                name="send_form_xid"
                type="hidden"
                defaultValue="874dc5be8f3ee257d63dd0f53f29707e"
              />
              <input
                name="send_form_name"
                type="hidden"
                defaultValue="10. Marketing - Free &#a;Consultation Form (471)"
              />
              <input
                name="infusionsoft_version"
                type="hidden"
                defaultValue="1.70.0.503005"
              /> */}
              <div>
                <div>
                  <div className="title">
                    <div className="title" contentid="title">
                      <div>
                        <span data-mce-mark={1}>
                          <strong>
                            <span data-mce-mark={1}>
                              Request a Free Consultation
                            </span>
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>&nbsp;</div>
              </div>
              <div className="spacing">
                <div className="field">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name *"
                    value={properties.first_Name}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        first_Name: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                <div className="field">
                  <Label htmlFor="lastname">Last Name *</Label>
                  <Input
                    id="Lastname"
                    name="lastname"
                    value={properties.last_name}
                    onChange={(e) =>
                      setProperties({
                        ...properties,
                        last_name: e.target.value,
                      })
                    }
                    placeholder="Last Name *"
                    type="text"
                  />
                </div>
                <div className="infusion-field">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email *"
                    type="text"
                  />
                </div>
                <div className="infusion-field">
                  <Label htmlFor="inf_field_Phone1">Phone Number *</Label>
                  <Input
                    id="inf_field_Phone1"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    name="phone"
                    placeholder="Phone Number *"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <div>&nbsp;</div>
              </div>
              <div>
                <div className="text">
                  <div className="text" contentid="paragraph">
                    <div> </div>
                  </div>
                </div>
              </div>
              <div className="infusion-field">
                <Label htmlFor="inf_option_KeepUpWithUs">
                  Keep Up With Us *
                </Label>
                <div className="infusion-radio">
                  <div className="options-container">
                    <span className="infusion-option">
                      <>
                        <Label htmlFor="inf_option_KeepUpWithUs_701">
                          Yes, I would love to get updates on contests, photo
                          tips, specials, and more.
                        </Label>
                        <Input
                          id="inf_option_KeepUpWithUs_701"
                          name="inf_option_KeepUpWithUs"
                          value={
                            "Yes, I would love to get updates on contests, phototips, specials, and more."
                          }
                          onChange={(e) =>
                            setProperties({
                              ...properties,
                              keep_up_with_us: e.target.value,
                            })
                          }
                          type="radio"
                          className="radio"
                          defaultValue={701}
                        />
                      </>
                    </span>
                    <span className="infusion-option">
                      <>
                        <Label htmlFor="inf_option_KeepUpWithUs_703">
                          No, I don't want to get updates
                        </Label>
                        <Input
                          id="inf_option_KeepUpWithUs_703"
                          name="inf_option_KeepUpWithUs"
                          value={"No, I don't want to get updates"}
                          onChange={(e) =>
                            setProperties({
                              ...properties,
                              keep_up_with_us: e.target.value,
                            })
                          }
                          type="radio"
                          className="radio"
                          defaultValue={703}
                        />
                      </>
                    </span>
                  </div>
                </div>
              </div>
              <div className="infusion-field">
                <Label htmlFor="inf_custom_SessionWantedFor">
                  Session Wanted For:
                </Label>
                <div className="infusion-field-input-container">
                  <Select
                    id="inf_custom_SessionWantedFor"
                    name="inf_custom_SessionWantedFor"
                    onChange={(e) => {
                      setProperties({
                        ...properties,
                        Session_wanted_for: e.target.value,
                      });
                    }}
                  >
                    <option value="Please select one">Please select one</option>
                    <option value="Gift">Gift</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Empowerment">Empowerment</option>
                    <option value="Mix">Mix</option>
                    <option value="Not Sure">Not Sure</option>
                  </Select>
                </div>
              </div>
              <div>
                <div>&nbsp;</div>
              </div>
              <div className="infusion-field">
                <Label htmlFor="inf_custom_Message">Message *</Label>
                <TextArea
                  onChange={(e) => {
                    setProperties({ ...properties, message: e.target.value });
                  }}
                  cols={24}
                  id="inf_custom_Message"
                  name="inf_custom_Message"
                  placeholder="Message *"
                  rows={5}
                  defaultValue={""}
                />
              </div>
              <div>
                <div>&nbsp;</div>
              </div>
              <div className="infusion-submit">
                <button
                  className="infusion-recaptcha"
                  id="recaptcha_874dc5be8f3ee257d63dd0f53f29707e"
                  // type="submit"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </FormWrapper>
          {/* flex item 2 */}
          <Info className="spacing">
            <div>
              <h3 className="caps subhead accent">contact us:</h3>
              <AnchorUnderline href="tel: 403-252-2662">
                403-252-2662
              </AnchorUnderline>{" "}
              <br />
              <AnchorUnderline href="mailto: info@innerspirit.com">
                info@innerspirit.com
              </AnchorUnderline>
            </div>
            <div>
              <h3 className="caps subhead accent">our location:</h3>
              <AnchorUnderline href="https://www.google.com/maps/place/Inner+Spirit+Photography/@50.977725,-114.0806245,15z/data=!4m2!3m1!1s0x0:0xbbb2559053a55ca5?sa=X&ved=2ahUKEwiG9tu9j975AhXlATQIHfAzDv8Q_BJ6BAhAEB8">
                711 84 Ave SW Calgary, AB, Canada T2V 0V8
              </AnchorUnderline>
            </div>
            <div>
              <h3 className="caps subhead accent">hours:</h3>
              <p className="bold italics">
                10 AM to 7 PM Weekdays By Appointment <br />
                Weekends By Appointment
              </p>
            </div>

            <Socials>
              <div>
                <a
                  target="_blank"
                  href="https://www.instagram.com/boudoirphotographycalgary/"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/socials/instagram.svg"
                    alt="Inner Spirit Photography Instagram - Boudoir Photographer in Calgary"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/innerspiritphoto"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/socials/facebook.svg"
                    alt="Inner Spirit Photography - Boudoir Photographer in Calgary"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/marklauriephotographer/"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/socials/linkedin.svg"
                    alt="Inner Spirit Photography Instagram - Boudoir Photographer in Calgary"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/c/InnerSpiritPhotographyCalgary/videos"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/socials/youtube.svg"
                    alt="Inner Spirit Photography Instagram - Boudoir Photographer in Calgary"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.pinterest.ca/innerspiritphot/_saved/"
                >
                  <Image
                    width={100}
                    height={100}
                    src="/socials/pinterest.svg"
                    alt="Inner Spirit Photography Instagram - Boudoir Photographer in Calgary"
                  />
                </a>
                <a target="_blank" href="https://twitter.com/marklaurie">
                  <Image
                    width={100}
                    height={100}
                    src="/socials/twitter.svg"
                    alt="Inner Spirit Photography Instagram - Boudoir Photographer in Calgary"
                  />
                </a>
              </div>
            </Socials>
          </Info>
        </Flex>
      </Container>
    </Section>
  );
}
