import React from "react";
import { ButtonPrimary } from "../components/buttons";
import CTA from "../components/CTA";
import Diversity from "../components/diversity";
import FeaturedIn from "../components/featuredIn";
import HeroBasic from "../components/heros/hero";
import LayoutJs from "../components/layoutJs";
import { Container, Flex, Section } from "../components/layoutComponents";
import MeetMark from "../components/meetMark";
import RevealSlider from "../components/revealSlider";
import Seo from "../components/seo";
import Stats from "../components/stats";
import MercedesTestimonial from "../components/testimonials/MercedesTestimonial";
import ReviewSlider from "../components/testimonials/reviewSlider";
import HomeMain from "../components/videos/homeMain";
import MainPageTestimonials from "../components/videos/mainPageTestimonials";
import MarkAdvantage from "../components/videos/markAdvantage";

export default function Index() {
  return (
    <LayoutJs>
      <Seo
        title="Boudoir Photography Calgary | See How Amazing You Truly Are | Inner Spirit Photo"
        description="Encouraging, supportive, life-changing. Calgary boudoir photography to build your self-esteem, love yourself more deeply, and see how amazing you truly are!"
      />
      <HeroBasic />
      <Stats />
      <HomeMain />
      <ReviewSlider />
      <Section>
        <Container>
          <Flex>
            <div className="spacing">
              <h2 className="headline">
                Looking for an encouraging and supportive boudoir experience?{" "}
              </h2>
              <h3 className="subhead upper">we’re here for you</h3>
              <div className="spacing">
                <p>
                  Most of our clients arrive feeling a little nervous (who
                  wouldn’t?)… but they leave feeling more confident and
                  comfortable in their skin than ever before.
                </p>
                <p>
                  We’ll help you move through any nerves and make you feel at
                  home: with genuine encouragement, complimentary beverages, and
                  a studio with in-floor heating.
                </p>
                <p className="bold">
                  If you’re curious about boudoir or nude photography as a path
                  to more confidence, you’ve found the right studio.{" "}
                </p>
              </div>
              <ButtonPrimary href="experience">
                explore the experience &#x2192;
              </ButtonPrimary>
            </div>
            <RevealSlider />
          </Flex>
        </Container>
      </Section>
      <MainPageTestimonials />
      <MercedesTestimonial
        review="This is not about the picture. It's about the power you feel and the good that you feel about yourself. I'm 50. I have two kids. I don't have a ' model body,’ but I look great. And I feel great. I believe I owe that to Mark."
        name="mercedes b."
        to="/experience"
        link="explore the experience &#x2192;"
      />
      {/* <MarkAdvantage /> */}
      <MeetMark />
      <FeaturedIn />
      {/* <Diversity /> */}
      <CTA
        headline="take the leap!"
        subhead="We'll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered."
      />
    </LayoutJs>
  );
}