import { Afacad } from "next/font/google";
import Header from "../components/Header";
import Head from "next/head";
import "../styles/globals.scss";
import Footer from "../components/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="icon" href="favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png" />
        <link rel="manifest" href="favicon/manifest.webmanifest" />
      </Head>
      <main className={afacad.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ApolloProvider>
  );
}
