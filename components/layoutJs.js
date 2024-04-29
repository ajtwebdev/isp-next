import React from "react";
import styled from "styled-components";
import Footer from "./footer";
import HeaderBasic from "./headers/headerBasic";
import Seo from "./seo";

const Wrapper = styled.div`
  position: relative;
`;

export default function LayoutJs({ children }) {
  return (
    <Wrapper>
      <Seo
        title="Inner spirit Photography"
        description="This Site Is Meant To Encourage Believers In God’s Word, And To Persuade Seekers Of The Truth To Explore The Pages Of The Word."
      />
      <HeaderBasic />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}
