import React from "react";
import BannerSecondary from "../../components/banners/bannerSecondary";
import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import CTAsecondary from "../../components/CTAsecondary";
import CTA from "../../components/CTA";
import { Container, Section } from "../../components/layoutComponents";
import styled from "styled-components";
import { getGalleryImages } from "../../lib/images";
import ImageGallery from "../../components/PageComponents/ImageGallery/ImageGallery";

const Text = styled.div`
  max-width: 100ch;
  width: 100%;
`;
export async function getStaticProps() {
  try {
    const allGalleryImages = await getGalleryImages();

    return {
      props: {
        allGalleryImages,
      },
    };
  } catch (error) {
    console.error("[gallery] Failed to load gallery images:", error);
    return {
      props: {
        allGalleryImages: null,
      },
    };
  }
}

export default function Gallery({ allGalleryImages }) {
  const galleryNode =
    allGalleryImages?.data?.pages?.edges[0]?.node?.ACF_GalleryPage;
  const totalGalleryImages = galleryNode?.gallery;

  return (
    <LayoutJs>
      <Seo
        title="Gallery | Inner Spirit Photography"
        description="Here is the full gallery of Inner Spirit Photography!"
      />

      <BannerSecondary
        img="/banners/gallery-banner.jpg"
        to1="/"
        link1="Home"
        to2="/portfolios"
        link2="Portfolios"
        to3="/portfolios/gallery"
        link3="Gallery"
        headline="gallery"
        description="Now I know what it feels like to be transformed into pure art!!!"
        name="- Julie K."
      />
      <ImageGallery totalGalleryImages={totalGalleryImages} />
      <CTAsecondary />

      <Section>
        <Container>
          <Text className="spacing">
            <h2 className="headline italics accent">
              need more information on what it’s like?
            </h2>
            <div className="spacing">
              <p>
                So what’s it like to commission us to create something
                breathtaking for you? It’s a great question, especially since we
                provide a unique experience for mostly intimate images.
              </p>
              <p>
                For most women, it has varying degrees of emotional highs and
                lows. I thought a great way to explain this is with a
                third-person narrative. So this is what it is.
              </p>
              <p>
                It’s time to be outrageous, to be bold, to step out of your
                comfort zone, even if it’s only a little. This is the place to
                do it. To embrace how the world sees you, to showcase how you
                want to be seen.
              </p>
              <p>
                We will be honest, for most women, it’s a roller coaster of
                excitement and doubt. For most, here is how it goes.
              </p>
              <p>
                Something is happening in your life that gives you the
                determination to call. You meet Mark; he seems nice, better he
                seems to know what you are about. You get excited, this could
                work; you book a Signature Experience and leave. Then doubt,
                what have you done, you take horrid photos with your clothes on,
                oh my gosh. Then your session date arrives; you are nervous but
                there.
              </p>
              <p>
                Jan’s makeup and hair approach calm you, it looks amazing. This
                could work, you think. Then Mark’s magic starts, moving you out
                of your comfort zone with amazing ease. Embracing the rush of
                the experience. Even you have to admit, you look breathtaking in
                the images. Your excitement rockets! Really! Boudoir, glamour,
                even nudes; you sample them all, you really are bold.
              </p>
              <p>
                In a blink it seems the 4 hours are over, 140 of the most
                incredible images taken. You leave floating in the afterglow.
                Then you start to wonder, did you really do that? Can they
                possibly be as good as you thought? What if they aren’t?
              </p>
              <p>
                You come to your viewing, more nervous than to your session. Oh
                my gosh, the screen is huge, the images are huge. Wait, the
                images are fantastic, there is too many that are good. . .
                great. . . wait, better than great. Oh, this is satisfying. Oh,
                this feels even better than the session. No wonder he guarantees
                the experiences, it’s like magic what he does. Uh, oh, this is
                hard, picking so many as the best.
              </p>
              <p>
                You pick up your images, you comment on how the experience has
                changed you. You may not have planned for that, even expected
                it, but you see yourself differently. People see you
                differently. You have done what many cannot and they mention it.
                You feel elevated, unique because, well, you are.
              </p>
              <p>
                And now you get it. You have just become the newest member of an
                elite sisterhood of nearly 5,000 women who have plunged into an
                enriching experience with Mark.
              </p>
              <p>
                Or, it could be that you are already there. That Inner Spirit is
                just the perfect place to be the spectacular woman you already
                are.
              </p>
              <p>Either way, it’s a transformational experience.</p>
              <p>
                The arch of the experience, the planning, the session, the
                viewing, the picking up; even to the show to friends, appears to
                be hard to articulate to the depth you felt it.
              </p>
              <p>
                So what did you think? Is this what you felt when you went
                through it? Can you imagine yourself going through this? Let me
                know.
              </p>
              <p>
                Inner Spirit Photography is listed in the Best of Calgary
                Directory of Photographers
              </p>
            </div>
          </Text>
        </Container>
      </Section>
      <CTA
        headline="we’ll create your 
        experience of a liftetime"
        subhead="Take the leap, we’ll catch you!"
        description="Feeling insecure about your body can keep you from feeling confident and sexy. A boudoir photography session is a great way to start feeling more comfortable in your own skin. When you see yourself through a photographer's lens, beautiful and sexy, it will change the way you see yourself forever. You'll be able to look back at these photos years from now and still feel confident and empowered."
      />
    </LayoutJs>
  );
}