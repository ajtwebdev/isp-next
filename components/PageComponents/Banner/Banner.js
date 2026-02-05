import React from "react";
import styled from "styled-components";
import { Container, Actions, HeroBannerPadding } from "../../layoutComponents";
import { ButtonLight, AnchorInline, ButtonPrimary } from "../../buttons";
import Breadcrumb3Links from "../../breadcrumbs/breadcrumb3links";
import Image from "next/image";

const Wrapper = styled.div`
  background: var(--clr-dark);
  padding-bottom: 4em;
  border-bottom: 8px solid var(--clr-light);

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media screen and (max-width: 74em) {
      display: grid;
      grid-template-rows: auto 2em auto;

      img {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
        z-index: 1;
      }
    }

    & > * + * {
      margin-left: 2em;
    }
  }

  hr {
    background-color: var(--clr-light);
    height: 1px;
    border: none;

    @media screen and (max-width: 74em) {
      background-color: var(--clr-accent);
      height: 1px;
      border: none;
    }
  }

  img {
    border-radius: var(--br);
    object-fit: cover;
  }
`;

const Text = styled.div`
  color: var(--txt-light);

  h1 {
    font-size: var(--fs-1);
    line-height: 1.1;
    font-family: var(--ff-trajan);
    @media screen and (max-width: 26em) {
      font-size: var(--fs-2);
      line-height: 1.1;
      font-family: var(--ff-trajan);
    }
  }

  .btn-accent {
    display: none;
  }
  @media screen and (max-width: 74em) {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
    z-index: 2;
    padding: 2em;
    background: var(--clr-light);
    color: var(--clr-accent);

    .btn-accent {
      display: block;
    }

    .btn-light {
      display: none;
    }
  }
`;

export default function Banner({ title, subheader, description, image }) {
  return (
    <Wrapper>
      <HeroBannerPadding />
      <Container className="container">
        <Image
          className="stretch clip-img "
          height={100}
          width={580}
          src={image.sourceUrl}
          alt={image.altText}
        />
        <Text className="spacing">
          <div>
            <h1 className="">{title}</h1>
          </div>
          <p style={{
            fontSize: '24px'
          }} >{description}</p>
          {subheader ? <p dangerouslySetInnerHTML={{ __html: subheader }} style={{
            marginTop: "0rem",
          }} />: null}
        </Text>
      </Container>
    </Wrapper>
  );
}

// const Banner = ({ title, subheader, description, image }) => {
//   let width = '100%';
//   let height = 'auto';
//   return (
//     <div>
//       <h2>PageComponent Banner</h2>
//       <h3>{title}</h3>
//       <p>{subheader}</p>
//       <p>{description}</p>
//       {image ? (
//         <img width={width} height={height} src={image.sourceUrl} alt={image.altText || ''} srcSet={image.srcSet} />
//       ) : null}
//     </div>
//   );
// };

// export default Banner;
