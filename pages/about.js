import React from "react";
import CTA from "../components/CTA";
import Awards from "../components/awards";
import Banner from "../components/banners/bannerPrimary";
import Facts from "../components/facts";
import LayoutJs from "../components/layoutJs";
import MeetMark2 from "../components/meetMark2";
import BeyondSexy from "../components/overlap/beyondSexy";
import Why from "../components/overlap/why";
import Stats from "../components/stats";
import Team from "../components/team";
import Seo from "../components/seo";

export default function About() {
  return (
    <LayoutJs>
      <Seo
        title="About Inner Spirit Photography"
        description="Inner Spirit Photography is a boudoir photography studio founded over 40 years ago by Canada’s most awarded portrait photographer, Mark Laurie."
      />
      <Banner
        img="/banners/about-banner.jpg"
        to1="/"
        link1="Home"
        to2="/about"
        link2="About"
        headline="Expressing your beauty & helping you embody your confident side
"
        description="When I saw my photos, I broke into tears because I thought, I can't believe how beautiful that person isssss."
        name="- Deanna B."
      />
      <Stats />
      <Why />
      <MeetMark2 />
      <Awards />
      <BeyondSexy />
      <Team />
      <Facts />
      <CTA
        headline="Your pivotal moment awaits..."
        subhead="Take the Leap. We'll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered."
      />
    </LayoutJs>
  );
}
