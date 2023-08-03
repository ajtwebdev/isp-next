import React from "react";
import LayoutJs from "../components/layoutJs";
import BannerBooking from "../components/banners/bannerBooking";

import FormContact from "../components/forms/formContact";
import Nervous from "../components/nervous";
import Guarantee from "../components/guarantee";
import FullImageTestimonial from "../components/testimonials/fullImageTestimonial";
import CTA from "../components/CTA";
import Seo from "../components/seo";

export default function BookNow() {
  return (
    <LayoutJs>
      <Seo
        title="Book Your Inner Spirit Photography Session"
        description="We’d be honoured to welcome you to our family of Inner Spirit Goddesses! To get started, book your introductory call today."
      />
      <BannerBooking
        img="/banners/contact-banner-phone.jpg"
        to1="/"
        link1="Home"
        to2="/book-now"
        link2="Contact & Booking"
        headline="book your complimentary planning session!"
      />
      <FormContact />
      <Nervous />
      <Guarantee />
      <FullImageTestimonial
        img="/testimonials/calgary-boudoir-testimonial-barb.jpg"
        alt="review of calgary boudoir photographer"
        review="I had just turned 50 when I found myself unexpectedly single. I felt sad and angry, and my inner spirit needed some serious healing. 

        Doing boudoir with Mark was a way for me to get my divine femininity power back, and I needed that to move forward with my new single life.
        
        Since then, I have achieved a whole new way of seeing myself. The empowering experience with Inner Spirit gave me the confidence to ignite a new acting and modelling career alongside my matchmaking career. I also received an amazing opportunity to share my gifts as an empath with the world, doing a docuseries about my expertise on dating, healing your past relationships, and connecting with your intuition.
        
        Mark captured my true essence — boudoir photography at Inner Spirit ignited my divine strength, and I now own my feminine strength."
        name="barb s."
        to="/experience"
        link="explore the experience &#x2192;"
      />
      {/* <CTA
        headline="take the leap!"
        subhead="We'll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered"
      /> */}
    </LayoutJs>
  );
}
