import React from "react";
import LayoutJs from "../components/layoutJs";
import Seo from "../components/seo";
import { Container, HeroBannerPadding } from "../components/layoutComponents";

const PrivacyPolicy = () => {
  return (
    <LayoutJs>
      <Seo
        title="Privay Policy"
        description="Encouraging, supportive, life-changing. Calgary boudoir photography to build your self-esteem, love yourself more deeply, and see how amazing you truly are!"
      />
      <HeroBannerPadding />
      <Container>
        <h1>Privacy Policy</h1>
        <p>
          We are committed to safeguarding the privacy of our website visitors;
          this policy sets out how we will treat your personal information. If
          you volunteer to provide certain information by which you can be
          identified when using this website to sign up for our email news
          updates or to request information, then you can be assured that it
          will only be used in accordance with this privacy statement.
        </p>
        <h2 style={{ margin: "10px 0px" }}>
          (1) What information do we collect?
        </h2>
        <p>
          We may collect, store and use for the purpose of monitoring website
          use the following kinds of personal data: information about your
          computer and about your visits to and use of this website (including
          your computer’s IP address, its geographical location, browser type,
          referral source, length of visit and number of page views). This
          information gathering is automated by website-monitoring software and
          is statistical information that is not identified with individual
          visitors to our website.
        </p>
        <h2 style={{ margin: "10px 0px" }}>(2) Cookies</h2>
        <p>
          A cookie consists of information sent by a web server to a web
          browser, and stored by the browser. The information is then sent back
          to the server each time the browser requests a page from the server.
          This enables the web server to identify and track the web browser.
        </p>
        <br />
        <p>
          We may use both “session” cookies and “persistent” cookies on the
          website. We will use the session cookies to: keep track of your
          computer whilst you navigate the website. We will use the persistent
          cookies to: enable our website to recognize your computer when you
          visit.
        </p>
        <br />
        <p>
          Session cookies will be deleted from your computer when you close your
          browser. Persistent cookies will remain stored on your computer until
          deleted, or until they reach a specified expiry date.
        </p>
        <br />
        <p>
          We use Google Analytics to analyze the use of this website. Google
          Analytics generates statistical and other information about website
          use by means of cookies, which are stored on users’ computers. The
          information generated relating to our website is used to create
          reports about the use of the website. Google will store this
          information. Google’s privacy policy is available at:
          <span>
            <a
              style={{ display: "table-cell" }}
              href="http://www.google.com/privacypolicy.html"
            >
              http://www.google.com/privacypolicy.html
            </a>
          </span>
          .
        </p>
        <br />
        <p>
          Most browsers allow you to refuse to accept cookies. (For example, in
          Internet Explorer you can refuse all cookies by clicking “Tools”,
          “Internet Options”, “Privacy”, and selecting “Block all cookies” using
          the sliding selector.) This will, however, have a negative impact upon
          the usability of many websites.
        </p>
        <h2 style={{ margin: "10px 0px" }}>(3) Policy amendments</h2>
        <p>
          We may update this privacy policy from time-to-time by posting a new
          version on our website. You should check this page occasionally to
          ensure you are happy with any changes.
        </p>

        <h2 style={{ margin: "10px 0px" }}>(4) Third party websites</h2>
        <p>
          We have provided links on this website to other photographers we know,
          galleries, our agent, etc. Once you use these links to leave our site,
          you should note that we do not have any control over the other
          website. We are not responsible for the privacy policies or practices
          of third party websites. Those websites and any information that you
          provide while visiting other sites are not governed by this privacy
          statement nor are we a recipient of any information about you from
          them.
        </p>
        <h2 style={{ margin: "10px 0px" }}>(5) Contact</h2>
        <p>
          If you have any questions about this privacy policy or our treatment
          of data gathered during visits to our website, please write to us by
          email via our{" "}
          <span>
            {" "}
            <a style={{ display: "table-cell" }} href="/contact-us">
              contact page.
            </a>
          </span>
        </p>
        <h2 style={{ margin: "10px 0px" }}>Copyright of Images</h2>
        <p>
          All of our work is copyright protected and no rights or usage are
          given without written permission from Mark Laurie or an officer of
          Inner Spirit Photography Inc.All the images displayed on our website
          have written permission to be displayed.Some images are available for
          purchase and some rights can be purchased for commercial or personal
          use.
        </p>
        <p>For more information please contact us at:</p>
        <p>
          Phone:
          <span>
            <a style={{ display: "table-cell" }} href="tel:403.252.2662">
              403.252.2662
            </a>
          </span>
        </p>
        <p>
          e-mail us:
          <span>
            <a
              style={{ display: "table-cell" }}
              href="mailto:markl@inner-spirit.com"
            >
              markl@inner-spirit.com
            </a>
          </span>
        </p>
        <p>mail us at:</p>
        <addresss>
          Inner Spirit Photography
          <br /> 711-84 Ave. SW
          <br /> Calgary, Alberta,
          <br /> Canada, T2V 0V8
        </addresss>
      </Container>
    </LayoutJs>
  );
};

export default PrivacyPolicy;
