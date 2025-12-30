import React from "react";
import styled from "styled-components";

import { Section, Container, Flex, FlexMobileOpp } from "../layoutComponents";
import { Label, Input, TextArea, Submit, Select } from "./formItems";
import Map from "../map";
import { AnchorInline, AnchorUnderline } from "../buttons";
import Image from "next/image";
import { useRouter } from "next/router";
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

export default function FormContest(props) {
  const router = useRouter();
  const handleContactForm = () => {
    console.log(window.location, "lcation");
    window.location.href = "https://app.cyberimpact.com/clients/60137/subscribe-forms/85E2BDA2-3940-4988-AB06-552E4EC6D22E";
  };
  return (
    <Section>
      <center>
        {" "}
        <button onClick={handleContactForm}>
          <h1>Click to fill your detail</h1>
        </button>
      </center>
    </Section>
  );
}
