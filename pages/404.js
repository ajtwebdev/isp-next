import LayoutJs from "../components/layoutJs";
import {
  Section,
  Container,
  HeroBannerPadding,
} from "../components/layoutComponents";
import Seo from "../components/seo";

export default function Custom404() {
  return (
    <LayoutJs>
      <Seo title="404: Not Found | ISP" noindex={true} hideCanonical={true} />
      <HeroBannerPadding />
      <Section>
        <Container>
          <h1>404: This page does not exist.</h1>
        </Container>
      </Section>
    </LayoutJs>
  );
}
