import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * styled-components server-side rendering.
 *
 * The babel plugin (.babelrc) only makes class names deterministic; it does
 * not put any CSS in the server response. Without this collector the HTML
 * shipped ~129 sc-* class names and zero stylesheets, so every page painted
 * unstyled and snapped into layout at hydration - a ~1.0 layout shift on
 * every page. This extracts the styles during the server render and injects
 * them into <head>.
 *
 * Note: next.config.js `compiler.styledComponents` is an SWC option and is
 * ignored while a custom .babelrc exists, so it is deliberately not used.
 */
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
    <Html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {/* Preconnects and font preloads for faster first paint */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      {/* Only the two faces actually used above the fold are preloaded:
          Trajan Pro Regular (--ff-trajan, all headings and banner text) and
          Optima (--ff-optima-r, body copy). Optima_Italic and OPTIMA_B were
          previously preloaded but their families are barely referenced. */}
      <link rel="preload" href="/fonts/TrajanPro-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/OPTIMA.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        {/* <script
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
        /> */}
        
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NW9ZRS3G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </Html>
    );
  }
}
