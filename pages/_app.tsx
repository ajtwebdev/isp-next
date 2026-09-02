import { AppProps } from "next/app";
import "../styles/index.scss";
import Seo from "../components/seo";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <Seo />
      {/* <GoogleAnalytics strategy="beforeInteractive"  gaMeasurementId={"G-P7TRKWJJE7"} trackPageViews /> */}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
