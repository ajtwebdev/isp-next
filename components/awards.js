import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { AnchorInline } from "./buttons";
import { Container, Section, Flex } from "./layoutComponents";

const ImageStyle = {
  width: "200px",
};
const ImageStylePpoc = {
  width: "80px",
};

const AwardsList = styled.div`
  text-align: center;
  ul {
    list-style-type: none;
  }
`;

const GridAuto = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 0.5fr));
  grid-gap: 2em;
  & > * {
    justify-self: center;
    align-self: center;
  }
`;

export default function Awards() {
  return (
    <Container className="spacing-lg">
      <div className="spacing">
        <h2 className="headline center">
          mark is an active & awarded member of:
        </h2>
        <GridAuto>
          <a href="https://www.ppoc.ca/" target="_blank">
            <Image
              height={89}
              width={100}
              style={ImageStylePpoc}
              src="/awards/awarded-photographer-ppoc.jpg"
              alt="professional photographers of canada"
            />
          </a>
          <a href="https://www.ppa.com/" target="_blank">
            <Image
              height={37}
              width={100}
              style={ImageStyle}
              src="/awards/awarded-photographer-ppoa.jpg"
              alt="professional photographers of america"
            />
          </a>
          <a href="https://swpp.co.uk/" target="_blank">
            <Image
              height={37}
              width={100}
              style={ImageStyle}
              src="/awards/awarded-photographer-swpp.jpg"
              alt="professional photographers of swpp"
            />
          </a>
          <a href="https://www.worldphotographiccup.org/" target="_blank">
            <Image
              height={32}
              width={100}
              style={ImageStyle}
              src="/awards/awarded-photographer-wpc.jpg"
              alt="professional photographers of wpc"
            />
          </a>
        </GridAuto>
      </div>
      <AwardsList className="spacing">
        <div className="spacing">
          <h2 className="teriatary caps center">awards & certifications</h2>{" "}
        </div>
        <div>
          <h3 className="subhead italics accent">
            In the Professional Photographers of Canada (PPOC):
          </h3>
          <ul>
            <li>
              Master of Photographic Arts (MPA) <br /> (only 2 photographers in
              Canada have earned more than 13 bars)
            </li>
            <li>Service of Photographic Arts (SPA)</li>
            <li>Fellow of PPOC (F/PPCO)</li>
            <li>Yousuf Karsh Lifetime Achievement Award</li>
            <li>Photographer of the Year</li>
            <li>37 Accreditations</li>
            <li>Featured in Loan Collection Books</li>
            <li>National Accredited Judge</li>
            <li>National Convention Speaker</li>
          </ul>
        </div>
        <div>
          <h3 className="subhead italics accent">
            In the Professional Photographers of America (PPA):
          </h3>
          <ul>
            <li>Master of Photography Degree (M.Photog.)</li>
            <li>Photographic Craftsman Degree (Cr.Photog.)</li>
            <li>Featured in Loan Collection Books</li>
            <li>Instructor</li>
          </ul>
        </div>
        <div>
          <h3 className="subhead italics accent">
            In England, the Society for Wedding & Portrait Photographers (SWPP):
          </h3>
          <ul>
            <li>4 International Photographer of the Year Awards</li>
            <li>Fellowship Award (F/FWPP)</li>
            <li>National Accredited Judge</li>
            <li>National Convention Speaker</li>
          </ul>
        </div>
        <div>
          <h3 className="subhead italics accent caps">
            In the world photographic cup (WPC):
          </h3>
          <ul>
            <li>World Cup Judge</li>
            <li>Team Canada Judge</li>
            <li>Mexico Judge</li>
          </ul>
        </div>
        <div>
          <h3 className="subhead italics accent">
            Additionally, Mark is honoured to have been…
          </h3>
          <ul>
            <li>
              The recipient of hundreds (yes, really!) of trophies for Figure
              Study, Portrait, Experimental, and more
            </li>
            <li>
              The Photography Reality Show Best of The Best – Winner & Judge
            </li>
            <li>The host of the TV series Inner Spirit Photography Presents</li>
            <li>
              In{" "}
              <AnchorInline
                href="https://en.wikipedia.org/wiki/Mark_Laurie_(photographer)"
                target="_blank"
              >
                Wikipedia Celebrity Profile
              </AnchorInline>
            </li>
          </ul>
        </div>
      </AwardsList>
    </Container>
  );
}
