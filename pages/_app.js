import { Afacad } from "next/font/google";
import Header from "../components/Header";
import "../styles/globals.scss";
import Footer from "../components/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient"; // prilagodi ako je client u drugom folderu

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <main className={afacad.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ApolloProvider>
  );
}
