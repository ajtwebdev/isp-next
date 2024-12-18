import { AppProps } from "next/app";
import "../styles/index.scss";
import Seo from "../components/seo";
import { GoogleAnalytics } from "nextjs-google-analytics";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <GoogleAnalytics gaMeasurementId={"G-P7TRKWJJE7"} trackPageViews />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
