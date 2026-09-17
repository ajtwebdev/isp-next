import React from "react";
import styled from "styled-components";
import Footer from "./footer";
import HeaderBasic from "./headers/headerBasic";

const Wrapper = styled.div`
  position: relative;
`;

export default function LayoutJs({ children }) {
  return (
    <Wrapper>
      <HeaderBasic />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}
