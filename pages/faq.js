import React from "react";
import LayoutJs from "../components/layoutJs";
import Banner from "../components/banners/bannerPrimary";
import FullFaq from "../components/faqs/fullFaq";
import FullImageTestimonial from "../components/testimonials/fullImageTestimonial";
import CTA from "../components/CTA";
import BannerFaq from "../components/banners/bannerFaq";
import Seo from "../components/seo";

export default function Faq() {
  return (
    <LayoutJs>
      <Seo
        title="FAQ | Inner Spirit Photography"
        description="Get answers to your questions about boudoir and nude photography!"
      />
      <BannerFaq
        img="/banners/faq-banner-new.jpg"
        to1="/"
        link1="Home"
        to2="/faq"
        link2="FAQ"
        headline="frequently asked questions"
        description="If you are new to nude, boudoir, & beauty photography, we understand you might have some questions. We are confident that we have answers to all your questions on this page. Should you have additional questions, please feel free to contact us."
      />
      <FullFaq />
      <FullImageTestimonial
        img="/testimonials/calgary-boudoir-testimonial-christine.jpg"
        alt="review of calgary boudoir photographer"
        review="Inner Spirit helped me rewrite past traumatic experiences with men where power was taken from me. It was very healing."
        name="christine r."
        to="/experience"
        link="explore the experience &#x2192;"
      />
      <CTA
        headline="take the leap!"
        subhead="We'll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered."
      />
    </LayoutJs>
  );
}
