import React from "react";
import BannerSecondary from "../../components/banners/bannerSecondary";
import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import CTAsecondary from "../../components/CTAsecondary";
import CTA from "../../components/CTA";
import { Container, Section } from "../../components/layoutComponents";
import styled from "styled-components";
import { getWallArtImages } from "../../lib/images";
import ImageGallery from "../../components/PageComponents/ImageGallery/ImageGallery";

const Text = styled.div`
  max-width: 100ch;
  width: 100%;
`;
const Heading = styled.h2`
  color: var(--clr-dark);
`;
export async function getStaticProps() {
  const allWallArtImages = await getWallArtImages();

  return {
    props: {
      allWallArtImages,
    },
  };
}

export default function WallArt({ allWallArtImages }) {
  const galleryNode =
    allWallArtImages?.data?.pages?.edges[0]?.node?.ACF_GalleryPage;
  const totalWallArtImages = galleryNode?.gallery || [];
  return (
    <LayoutJs>
      <Seo
        title="Wall Art | Inner Spirit Photography"
        description="Here is the full gallery of Inner Spirit Photography!"
      />
      <BannerSecondary
        img="/banners/wall-art-banner.jpg"
        to1="/"
        link1="Home"
        to2="/portfolios"
        link2="Portfolios"
        to3="/portfolios/wall-art"
        link3="Wall-Art"
        headline="wall-art"
        description="Now I know what it feels like to be transformed into pure art!!!"
        name="- Julie K."
      />
      <ImageGallery totalGalleryImages={totalWallArtImages} />
      <CTAsecondary />
      <Section>
        <Container>
          <Text className="spacing">
            <Heading className="headline wallArtheading ">Wall Art</Heading>
            <div className="spacing">
              <Heading className="headline wallArtheading ">
                Enlargements and Framed Photos
              </Heading>
              <p>
                Be the Art on your walls! Single powerful images or collages of
                images telling a story. Options are paper, metal, canvas and
                acrylic. Boudoir, nude or fashion, all work well.
              </p>
              <Heading className="headline wallArtheading ">
                Paper Prints
              </Heading>
              <p>
                Rich and lush traditional paper is still desirable. With a
                tested lifespan for over 200 years plus a protective museum
                quality finish means no glass. Custom sizes from 11×14 to 40×60.
                Included is our Flush Frame that floats on your wall. You can
                also go with matted and framed.
              </p>
              <Heading className="headline wallArtheading ">
                Metal Prints
              </Heading>
              <p>
                Detailed in high gloss the metal print showcases vibrant colors
                making it a stylish choice. The illusion of floating off the
                wall is created with special pre-installed hanging hardware.
                Being metal it won’t degrade.
              </p>
              <Heading className="headline wallArtheading ">
                {" "}
                Canvas Prints
              </Heading>
              <p>
                Archival artist canvas wrapped around a one-inch wood frame. You
                can add a metal or wood frame to it as well to make a classy art
                piece. Alternatively, your image can be mounted on museum
                quality board to make for easy framing.
              </p>
              <Heading className="headline wallArtheading ">
                Acrylic Print
              </Heading>
              <p>
                The unique, crisp look gives your image a futuristic look. Your
                mage appears to be painted on the glass and arrives ready to
                hang.
              </p>
              <Heading className="headline wallArtheading ">
                why a wall print?{" "}
              </Heading>
              <p>
                Having art on your walls is the personal touch, giving your
                walls a flavour unique to you. Women put personal images up for
                very different reasons. The room itself lends to different looks
                too. It is a reminder of your power and confidence. In the
                tumble of the day, our sense of self can get bruised a bit. An
                image reflecting back to you your true spirit lifts you up. In a
                bedroom a more daring, sultry nude or boudoir image sets the
                mood. Here it reminds you of your sensuality, how sexy you are.
                The right look shows your sensual side is more than skin deep
                :it’s how you express yourself. Living and dining rooms are
                great for those sweeping emotional images with rich colors that
                warm a room. Here you can switch it up with something artsy and
                dramatic or go earthy and quiet. Family rooms are where the
                playful images go, something fun that flavours the room with
                joy. The nice thing about photographs is they are easy to change
                seasonally. We do that in our home, loving the change it gives
                for the season. We can break out of traditional sizes. Images
                can be all sorts of shapes to go anywhere, even to fit together
                creating a larger concept on the wall. Some women get nervous
                that a wall print could be seen as vain, self-indulgent but more
                often they are viewed with envy. The common comment is “If I
                looked that good it would be on my wall too!” It may take a few
                days to adjust to a large size image but after you do, you can
                never go back! A wall size print is amazing art. You do deserve
                that for yourself.
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
