import { AppProps } from "next/app";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
