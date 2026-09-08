import Head from "next/head";
import { useRouter } from "next/router";
import { getCanonicalUrl } from "../lib/canonical";

const DEFAULT_OG_IMAGE =
  "https://staging.innerspiritphoto.com/wp-content/uploads/2022/10/X1171D-0007AY.jpg";

export default function Seo({
  title = "Inner Spirit Photography | Calgary Boudoir",
  description = "Inner Spirit Photography is a Calgary-based boudoir studio with more than 40 years of experience.",
  siteName = "Inner Spirit Photography",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterHandle = "",
}) {
  const router = useRouter();
  const canonicalUrl = getCanonicalUrl(router.asPath || "/");

  return (
    <Head>
      <title key="title">{`${title}`}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonicalUrl} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta key="robots" name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <link key="canonical" rel="canonical" href={canonicalUrl} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
}
