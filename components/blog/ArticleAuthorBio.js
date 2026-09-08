import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 1rem;
  padding-top: 0;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: #f5f1eb;
  box-shadow: 0 5px 18px rgba(17, 17, 17, 0.08);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Copy = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: clamp(1.4rem, 2vw, 2.1rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--clr-dark);
  font-weight: 700;
`;

const Bio = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.78);
  max-width: 44rem;
`;

const AboutLink = styled(Link)`
  display: inline-block;
  margin-top: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.72rem;
  color: var(--clr-accent, #9f7a5b);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ArticleAuthorBio() {
  return (
    <Wrapper aria-label="About Mark Laurie">
      <Inner>
        <ImageWrap>
          <Image
            src="/mark-nude-boudoir-photographer-calgary.gif"
            alt="Mark Laurie"
            width={240}
            height={240}
            priority={false}
          />
        </ImageWrap>

        <Copy>
          <Title>About Mark Laurie</Title>
          <Bio>
            Mark Laurie is the founder and photographer of Inner Spirit
            Photography, a Calgary boudoir and nude portrait studio established
            in 1980. Since beginning his photographic career in 1978, he has
            photographed more than 5,300 women, creating portraits that explore
            confidence, individuality and personal transformation.
          </Bio>
          <AboutLink href="/about">Learn more about Mark</AboutLink>
        </Copy>
      </Inner>
    </Wrapper>
  );
}