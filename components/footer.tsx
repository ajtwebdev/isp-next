import { EXAMPLE_PATH } from "../lib/constants";
import Image from "next/image";
import styled from "styled-components";
import { Container } from "./layoutComponents";
import { Icon } from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, TimeIcon } from "@chakra-ui/icons";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
} from "react-icons/io";
import Link from "next/link";

import { STUDIO_ADDRESS, STUDIO_MAP_URL } from "../lib/studio";
import { ReactNode } from "react";
interface NextLink {
  children: ReactNode;
  href: string;
  target?: string;
}
const LinkBox = styled.div`
display: flex;
justify-content: space-between;

  color: white;
  margin-top: var(--spacer-lg);
  margin-bottom: 25px;

  .About{
    width:40%
  }
  @media (max-width: 768px) { 
   display:block;
   .About{
    width:100%;
    margin-top:3em
  }
  .quickLinks{
    margin-top:3em
  }
  }
}
`;
const HeadingTag = styled.h3`
  margin-bottom: 15px;
`;
const CopyRight = styled.div`
  display: flex;
  color: white;
  gap: 20px;
  justify-content: center;
  margin: 30px 0;
  flexwrap: wrap;

  p {
    font-size: 12px;
  }
  a {
    font-size: 12px;
    display: block;
    padding: 4px 0;
    min-height: 24px;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;
const FooterCopyrightLogo = styled.div`
  color: white;
  display: flex;
  alignitems: center;
  margin: 30px 0;
  justify-content: end;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NextLink = ({ children, href, target }: NextLink) => {
  return (
    <Link
      style={{ color: "white", textDecoration: "underline" }}
      href={href}
      target={target}
    >
      {children}
    </Link>
  );
};

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: inline-block;
  min-height: 24px;

  :hover,
  :focus {
    text-decoration: underline;
  }
`;

const LinkElement = styled.li``;
export default function Footer() {
  return (
    <>
      <footer
        className="bg-accent-1 border-t border-accent-2"
        style={{ backgroundColor: "var( --clr-dark)", padding: "10px 0" }}
      >
        <div className="footer-logo">
          <Image
            width={200}
            height={112}
            src="/logo-white.svg"
            alt="footer logo"
            style={{ margin: "0 auto", padding: "15px 0px" }}
          />
        </div>
        <hr
          style={{
            backgroundColor: "var(--clr-accent)",
            width: "80%",
            margin: "0 auto",
          }}
        />
        <Container>
          <LinkBox className="footer-links">
            <div className="contact-box">
              <HeadingTag>Contact Us</HeadingTag>
              <p>
                <PhoneIcon mr={"10px"} />
                <ContactLink href="tel:+14032522662">
                  +1 (403) 252-2662
                </ContactLink>
              </p>
              <p>
                <AtSignIcon mr={"10px"} />
                <ContactLink href="mailto:info@innerspiritphoto.com">
                  info@innerspiritphoto.com
                </ContactLink>
              </p>
              <p>
                <TimeIcon mr={"10px"} mt={"10px"} />
                10:00 AM - 7:00 PM Monday to Friday
                <br />
                <span style={{ fontSize: "20px", marginLeft: "22px" }}>
                  Hours by appointment
                </span>
              </p>

              <p style={{ marginTop: "20px" }}>
                <a
                  href={STUDIO_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline", color: "inherit" }}
                >
                  {STUDIO_ADDRESS}
                </a>
              </p>
              <div
                style={{ display: "flex", marginTop: "10px" }}
                className="social-icons"
              >
                {" "}
                <a
                  target="_blank"
                  href="https://www.instagram.com/boudoirphotographycalgary/"
                  aria-label="Inner Spirit Photography on Instagram"
                >
                  <Icon
                    color="#973cb7"
                    fontSize={"25px"}
                    as={IoLogoInstagram}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/innerspiritphoto"
                  aria-label="Inner Spirit Photography on Facebook"
                >
                  <Icon
                    color="#1877f2"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoFacebook}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/marklauriephotographer/"
                  aria-label="Mark Laurie on LinkedIn"
                >
                  <Icon
                    color="#2a7bb6"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoLinkedin}
                  />
                </a>
              </div>
            </div>
            <div className="quickLinks">
              <HeadingTag>Quick Links</HeadingTag>
              <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                <LinkElement>
                  <NextLink href="/">Home</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/about">About</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/experience">Experience</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/gallery">Gallery</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/blog">Blog</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink
                    // href="https://app.cyberimpact.com/clients/60137/subscribe-forms/85E2BDA2-3940-4988-AB06-552E4EC6D22E"
                    href="/contact"
                    // target="_blank"
                  >
                    Contact & Booking
                  </NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/reflections">
                    Receive Reflections Journal
                  </NextLink>
                </LinkElement>
              </ul>
            </div>
            <div className="About">
              <HeadingTag>About Us</HeadingTag>
              <p>
                Canadian Portrait Photographer of the Year, Mark Laurie, is the
                photographer for Inner Spirit Photography. Internationally
                renowned, his clients fly in from all over the world or fly Mark
                out. He has done portraits in 16 countries plus every province
                in Canada Inner Spirit creates a transformational
                experience with imagery that has been described as life
                changing. Timeless images that portray the soul, desires and
                personality of his clients. We create an enviroment that is so
                safe and creative it becomes easy to express anything you want,
                to experiment, to indulge in exploring you. Everyone is amazed
                how easy and fun the session is.
              </p>
            </div>
          </LinkBox>
          <hr
            style={{
              backgroundColor: "var(--clr-accent)",
              width: "100%",
              margin: "0 auto",
            }}
          />
          <CopyRight className="copyright">
            <p>Copyright© 2026</p>
            <p>Inner Spirit Photography</p>
            <p>All Rights Reserved</p>
            <a
              target="_blank"
              href="/terms-of-use"
              style={{
                color: "white",
              }}
            >
              Terms of use
            </a>
            <a
              target="_blank"
              href="/privacy-policy"
              style={{
                color: "white",
              }}
            >
              Privacy Policy
            </a>
          </CopyRight>
          <hr
            style={{
              backgroundColor: "var(--clr-accent)",
              width: "100%",
              margin: "0 auto",
            }}
          />
          <FooterCopyrightLogo>
            <p>Website by:</p>
            <Image
              height={28}
              width={150}
              alt={"website name"}
              src="/aaron-tonner-web-solutions-logo-white-white.svg"
            />
          </FooterCopyrightLogo>
        </Container>
      </footer>
    </>
  );
}