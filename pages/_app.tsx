import { AppProps } from "next/app";
import "../styles/index.scss";
import Seo from "../components/seo";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <GoogleAnalytics gaMeasurementId={"G-P7TRKWJJE7"} trackPageViews />
      <Component {...pageProps} />

      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '329182807442531');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}

export default MyApp;
