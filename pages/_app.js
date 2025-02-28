import { Afacad } from "next/font/google";
import Header from "../components/Header";
import "../styles/globals.scss";
import Footer from "../components/Footer";

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={afacad.className}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
