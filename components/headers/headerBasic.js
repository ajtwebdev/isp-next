import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container } from "../layoutComponents";
import { IoMdArrowDropdown } from "react-icons/io";
import Image from "next/image";

const device = {
  sm: "18em",
  md: "91em",
};

const Header = styled.header`
  background: var(--clr-accent);
  position: fixed;
  border-bottom: 1px solid var(--clr-accent);
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: top 0.5s ease-out;
  z-index: 999;
  transition: top 0.5s ease-out;
`;

const Headertop = styled.div`
  padding: 1em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;

    @media screen and (max-width: 38em) {
      flex-direction: column;
    }

    & > * + * {
      margin-left: 1.5em;

      @media screen and (max-width: 38em) {
        margin-top: 5px;
        margin-left: 0;
      }
    }
  }
`;

const NavPhone = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--fs-sm);
  font-weight: var(--fw-button);
  color: var(--txt-light);
  letter-spacing: 0.1em;
  transition: all 0.25s linear;

  // aligning text with icon
  display: flex;
  align-items: center;
  gap: 2px;

  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const Headerbottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`;

const LogoContainer = styled.div`
  img {
    height: 40px;
    transition: 0.4s;
    // *** adjust hero & banner padding as below screen widths are changed

    @media screen and (max-width: 22em) {
      height: 30px;
    }

    // &[data-active="true"] {
    //   height: 100px;
    // }
  }
`;

const Nav = styled.nav`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;

  & > * + * {
    margin-left: 1.5em;
  }

  @media screen and (max-width: ${device.md}) {
    display: ${({ nav }) => (nav ? "flex" : "none")};
    align-items: center;
    position: absolute;
    top: 73px;

    @media screen and (max-width: 22em) {
      top: 63px;
    }

    left: 0;
    right: 0;
    flex-direction: column;
    width: 100%;
    background: var(--clr-accent);
    box-shadow: var(--shadow-bottom);
    border-radius: var(--br);
    border-top: 1px solid var(--clr-light);
    padding: 1em 2em 2em;

    & > * + * {
      margin-left: 0;
      margin-top: 15px;
    }
  }
`;

const GetQuote = styled((props) => <Link {...props} />)`
  cursor: pointer;
  display: inline-block;
  font-size: var(--fs-sm);
  font-weight: var(--fw-button);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.4em 1.6em;
  transition: all 0.25s linear;

  background: var(--clr-light);
  color: var(--clr-accent);
  border: 1px solid var(--clr-light);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
`;

const NavCtaDesktop = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 38em) {
    flex-direction: column;
  }

  & > * + * {
    margin-left: 1.5em;

    @media screen and (max-width: 38em) {
      margin-top: 5px;
      margin-left: 0;
    }
  }

  @media screen and (max-width: ${device.md}) {
    display: none;
  }
`;
const NavCtaMobile = styled.div`
  display: none;

  @media screen and (max-width: ${device.md}) {
    display: flex;
    flex-direction: column;
  align-items: center;
    & > * + * {
        margin-top: 5px;
        margin-left: 0;
      }
`;

const Dropdown = styled.li`
  /* hover display only on desktop */
  @media screen and (min-width: ${device.md}) {
    ul {
      position: absolute;
      z-index: 1000;
      display: none;
      opacity: 1;
      margin: 0;
      padding: 2em 2em 2em 1em;
      list-style-type: none;
      background: var(--clr-dark);

      li {
        a {
          color: var(--txt-light);
        }
      }
    }

    &:hover {
      ul {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  text-transform: uppercase;
  font-size: var(--fs-sm);
  font-weight: var(--fw-button);
  color: var(--txt-light-secondary);
  letter-spacing: 0.1em;
  transition: all 0.25s linear;

  // aligning text with icon
  display: flex;
  align-items: center;
  gap: 2px;

  :hover,
  :focus {
    opacity: 0.7;
  }

  @media screen and (max-width: ${device.md}) {
    font-size: var(--fs-b);
  }
`;

const Burger = styled.div`
  display: none;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    margin: 5px;
    background-color: var(--clr-light);

    :nth-child(1) {
      transform: ${({ nav }) =>
        nav ? "rotate(-45deg) translate(-6px, 5px)" : ""};
    }
    :nth-child(2) {
      opacity: ${({ nav }) => (nav ? "0" : "")};
    }
    :nth-child(3) {
      transform: ${({ nav }) =>
        nav ? "rotate(45deg) translate(-6px, -5px)" : ""};
    }
  }

  @media screen and (max-width: ${device.md}) {
    transform: scale(1);
    display: block;
    z-index: 10000;
  }
`;

export default function HeaderBasic() {
  const [nav, navOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  function toggleMenu() {
    navOpen(!nav);
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled == scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // clean up the event handler when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div>
      <Header>
        <Container>
          <Headerbottom>
            <LogoContainer>
              <Link href="/">
                <Image
                  data-active={scrolled}
                  src="/inner-spirit-logo-text-white.svg"
                  alt="inner spirit photography logo"
                  height={100}
                  width={250}
                />
              </Link>
            </LogoContainer>
            <Nav>
              <Burger nav={nav} onClick={toggleMenu}>
                <div />
                <div />
                <div />
              </Burger>

              <NavList nav={nav}>
                <li>
                  <StyledLink href="/about">about</StyledLink>
                </li>
                <li>
                  <StyledLink href="/experience">experience</StyledLink>
                </li>
                <Dropdown>
                  <StyledLink href="/portfolios">
                    Portfolios
                    <IoMdArrowDropdown size={20} />
                  </StyledLink>
                  <ul>
                    <li>
                      <StyledLink href="/portfolios/gallery">
                        gallery
                      </StyledLink>
                    </li>
                    <li>
                      <StyledLink href="/portfolios/books">books</StyledLink>
                    </li>
                    <li>
                      <StyledLink href="/portfolios/wall-art">
                        wall art
                      </StyledLink>
                    </li>
                    <li>
                      <StyledLink href="/portfolios/projects">
                        projects
                      </StyledLink>
                    </li>
                  </ul>
                </Dropdown>
                <Dropdown>
                  <StyledLink href="/resources">
                    Resources
                    <IoMdArrowDropdown size={20} />
                  </StyledLink>
                  <ul>
                    <li>
                      <StyledLink href="/resources/faq">faq</StyledLink>
                    </li>
                    <li>
                      <StyledLink href="/contest">contest</StyledLink>
                    </li>
                  </ul>
                </Dropdown>
                <li>
                  <StyledLink href="/blog">blog</StyledLink>
                </li>

                <li>
                  <StyledLink
                    href="https://app.cyberimpact.com/clients/60137/subscribe-forms/85E2BDA2-3940-4988-AB06-552E4EC6D22E"
                    target="_blank"
                  >
                    contact
                  </StyledLink>
                </li>
                <NavCtaMobile>
                  <NavPhone href="tel: (403) 252-2662">
                    +1 (403) 252-2662
                  </NavPhone>
                  <GetQuote
                    href="https://app.cyberimpact.com/clients/60137/subscribe-forms/85E2BDA2-3940-4988-AB06-552E4EC6D22E"
                    target="_blank"
                  >
                    <span>book now &#x2192;</span>
                  </GetQuote>
                </NavCtaMobile>
              </NavList>
            </Nav>
            <NavCtaDesktop>
              <NavPhone href="tel: (403) 252-2662">+1 (403) 252-2662</NavPhone>
              <GetQuote
                href="https://app.cyberimpact.com/clients/60137/subscribe-forms/85E2BDA2-3940-4988-AB06-552E4EC6D22E"
                target="_blank"
              >
                <span>book now &#x2192;</span>
              </GetQuote>
            </NavCtaDesktop>
          </Headerbottom>
        </Container>
      </Header>
    </div>
  );
}
