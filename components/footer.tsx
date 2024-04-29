import { EXAMPLE_PATH } from "../lib/constants";
import Image from "next/image";
import styled from "styled-components";
import { Container } from "./layoutComponents";
import { Icon } from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, TimeIcon } from "@chakra-ui/icons";
import {
  IoLogoPinterest,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io";
import Link from "next/link";
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
const LinkElement = styled.div``;
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
            height={100}
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
                +1 (403) 252-2662
              </p>
              <p>
                <AtSignIcon mr={"10px"} />
                info@innerspiritphoto.com
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
                711 84 Ave SW, Calgary, AB <br />
                Canada
              </p>
              <div
                style={{ display: "flex", marginTop: "10px" }}
                className="social-icons"
              >
                {" "}
                <a
                  target="_blank"
                  href="https://www.instagram.com/boudoirphotographycalgary/"
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
                >
                  <Icon
                    color="#2a7bb6"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoLinkedin}
                  />
                </a>
                <a target="_blank" href="https://twitter.com/marklaurie">
                  <Icon
                    color="#39a2f4"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoTwitter}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.pinterest.ca/innerspiritphot/_saved/"
                >
                  <Icon
                    color="red"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoPinterest}
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/c/InnerSpiritPhotographyCalgary/videos"
                >
                  <Icon
                    color="#ed3833"
                    ml={"10px"}
                    fontSize={"25px"}
                    as={IoLogoYoutube}
                  />
                </a>
              </div>
            </div>
            <div className="quickLinks">
              <HeadingTag>Quick Links</HeadingTag>
              <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                <LinkElement>
                  <NextLink href="/about">Home</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/about">About</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/experience">Experience</NextLink>
                </LinkElement>

                <LinkElement>
                  {" "}
                  <NextLink href="/portfolios">Portfolios</NextLink>
                </LinkElement>

                <LinkElement>
                  <NextLink href="/portfolios/gallery">Gallery</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/portfolios/books">Books</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/portfolios/wall-art">Wall art</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink href="/portfolios/projects">Projects</NextLink>
                </LinkElement>

                <LinkElement>
                  {" "}
                  <NextLink href="/resources">Resources</NextLink>
                </LinkElement>

                <LinkElement>
                  <NextLink href="/resources/faq">Faq</NextLink>
                </LinkElement>
                <LinkElement>
                  <NextLink
                    href="https://markl.sendly.co.uk/contact"
                    target="_blank"
                  >
                    Contact & Booking
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
                in Canada **** Inner Spirit creates a transformational
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
            <p>Copyright© 2024</p>
            <p>Inner Spirit Photography</p>
            <p>All Rights Reserved</p>
            <a
              target="_blank"
              href="https://www.innerspiritphoto.com/terms-of-use"
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
              height={100}
              width={150}
              alt={"website name"}
              src="/aaron-tonner-web-solutions-logo-white-white.svg"
            />
          </FooterCopyrightLogo>
        </Container>
      </footer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.0791090232547!2d-114.08319942383308!3d50.97772834925977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371711767f98659%3A0xbbb2559053a55ca5!2sInner%20Spirit%20Photography!5e0!3m2!1sen!2sin!4v1691152752711!5m2!1sen!2sin"
        width="600"
        height="450"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
        style={{
          width: "100%",
          height: "400px",
        }}
      ></iframe>
    </>
  );
}
