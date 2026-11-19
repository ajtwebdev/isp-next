import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";

// GA4 is configured inside this GTM container, so no Measurement ID belongs in
// the codebase. Do not add gtag.js or nextjs-google-analytics alongside it:
// running either next to GTM double-fires page_view.
const GTM_ID = "GTM-NW9ZRS3G";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      {/* lazyOnload: GTM (and the GA4 and Facebook tags it injects) starts after
          the window load event, so its ~430 KB of script no longer competes with
          the homepage hero for the main thread. Tags and container are unchanged. */}
      <Script id="gtm-base" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
