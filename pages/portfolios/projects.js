import React from "react";
import BannerSecondary from "../../components/banners/bannerSecondary";
import LayoutJs from "../../components/layoutJs";
import Seo from "../../components/seo";
import CTAsecondary from "../../components/CTAsecondary";
import CTA from "../../components/CTA";
import { Container, Section } from "../../components/layoutComponents";
import styled from "styled-components";
import { getProjectImages } from "../../lib/images";
import ImageGallery from "../../components/PageComponents/ImageGallery/ImageGallery";

const Text = styled.div`
  max-width: 100ch;
  width: 100%;
`;
export async function getStaticProps() {
  try {
    const allProjectsImages = await getProjectImages();

    return {
      props: {
        allProjectsImages,
      },
    };
  } catch (error) {
    console.error("[projects] Failed to load project images:", error);
    return {
      props: {
        allProjectsImages: null,
      },
    };
  }
}

export default function Projects({ allProjectsImages }) {
  const galleryNode =
    allProjectsImages?.data?.pages?.edges[0]?.node?.ACF_GalleryPage;
  const totalProjectsImages = galleryNode?.gallery;
  return (
    <LayoutJs>
      <Seo
        title="Projects | Inner Spirit Photography"
        description="Here is the full gallery of Inner Spirit Photography!"
      />
      <BannerSecondary
        img="/banners/projects-banner.jpg"
        to1="/"
        link1="Home"
        to2="/portfolios"
        link2="Portfolios"
        to3="/portfolios/projects"
        link3="Projects"
        headline="projects"
        description="Now I know what it feels like to be transformed into pure art!!!"
        name="- Julie K."
      />
      <ImageGallery totalGalleryImages={totalProjectsImages} />
      <CTAsecondary />
      <Section>
        <Container>
          <Text className="spacing">
            <h2 style={{ color: "var(--clr-dark" }} className="headline ">
              nude, boudoir, & beauty projects
            </h2>
            <div className="spacing">
              <p>
                To push boundaries, gain new skills, experiment, or create a new
                purpose, Mark Laurie does personal projects.
              </p>
              <p>
                Often, he pulls together a team: makeup artist, body painters,
                models, hair stylists, assistants, specialists and occasionally
                other photographers. All working towards a vision he has
                created.
              </p>
              <p>
                The photography projects are usually in Calgary, but he has
                traveled to international locations. They may be his signature
                nudes, boudoir, glamour but can easily go beyond that.
              </p>
              <p>
                His Mermaid project is an example. They did a test session in a
                smaller pool with only a couple of mermaids. Got the kinks out,
                sourced a larger pool, 6 models, an assistant and another
                photographer. Staged the pool then spent 13 hours in the water,
                under the water. It was amazing and the images were fantastic!
              </p>
              <p>
                The big project right now is Her Body Speaks
                (http://herbodyspeaks.ca). The vision for this is to amass a
                body of work with words that are an empowerment statement and a
                role model inspiration event. The end goal is a book and Art
                gallery display. Each woman gets makeup done then their
                positive, powerful word choices are painted on their bodies.
                Following that they step onto the white seamless background for
                an empowering photo shoot. The session wraps with the current
                writer, Terry Groves, interviewing them for their story.
              </p>
              <p>
                Mark usually draws from his clients for his projects. He brings
                in models if the project needs it. That is one of the perks of
                being photographed by Mark, more adventures can wait!
              </p>
              <p>
                Everyone at Inner Spirit loves body painting, so we host Paint
                Jams at least every couple of months. (Covid causing a blip to
                that!) You will find up to 6 painters, with a model each; free
                to express any artistic vision that they wish. An amazing body
                of painted body art is created!
              </p>
              <p>
                You will find the empowerment thread emerge somewhere in his
                personal work. Body embracing, confidence, expressions of female
                power are underlying themes he does not stray far from.
              </p>
              <p>He is open to collaborative ideas too, just Contact Us !</p>
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