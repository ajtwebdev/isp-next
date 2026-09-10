import React from "react";
import LayoutJs from "../components/layoutJs";
import BannerExperience from "../components/banners/bannerExperience";
import Stats from "../components/stats";
import FullImageTestimonial from "../components/testimonials/fullImageTestimonial";

import HowItWorks from "../components/overlap/howItWorks";
import Investment from "../components/overlap/investment";
import BeyondEmpowerment from "../components/videos/beyondEmpowerment";
import CTAsecondary from "../components/CTAsecondary";
import WhatToDo from "../components/overlap/whatToDo";
import ReassuranceVideoTestimonial from "../components/videos/reassuranceVideoTestimonial";
import CTA from "../components/CTA";
import Seo from "../components/seo";

export default function Experience() {
  return (
    <LayoutJs>
      <Seo
        title="Your Experience of a Lifetime | Inner Spirit Photography"
        description="An Inner Spirit photography session is the experience of a lifetime! Choose from dozens of creative sets to create your unique photography session."
      />
      <BannerExperience
        img="/banners/experience-banner.jpg"
        to1="/"
        link1="Home"
        to2="/experience"
        link2="Experience"
        headline="get the experience of a lifetime"
        description="Boost your self-esteem, love yourself more, and see how amazing you truly are."
      />
      <Stats />
      <FullImageTestimonial
        img="/testimonials/calgary-boudoir-kerry-review.jpg"
        alt="review of calgary boudoir photographer"
        review="Mark really captures the essence of you that you just never see. We females are so critical of our bodies and critical of ourselves that when you see the photos he takes, you're thinking, ‘oh my God, that’s me?"
        name="kerry p."
        to="/contact"
        link="book planning session &#x2192;"
      />
      <HowItWorks />
      <Investment />
      <BeyondEmpowerment />
      <CTAsecondary />
      <WhatToDo />
      <FullImageTestimonial
        img="/testimonials/calgary-boudoir-renilda-review.jpg"
        alt="review of calgary boudoir photographer"
        review="For me, the experience was about being bold and being true to myself and knowing that I can accomplish anything. I can be who I want to be, without hesitation."
        name="renilda f."
        to="/contact"
        link="book planning session &#x2192;"
      />
      <ReassuranceVideoTestimonial />
      <FullImageTestimonial
        img="/testimonials/calgary-boudoir-deanna-review.jpg"
        alt="review of calgary boudoir photographer"
        review="Mark sees your unspoken boundaries, and I think through respecting those boundaries, he creates the safety needed to help people heal."
        name="deanna b."
        to="/contact"
        link="book planning session &#x2192;"
      />
      <CTA
        headline="we'll create your experience of a lifetime"
        subhead="Take the leap, we'll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered."
      />
    </LayoutJs>
  );
}
