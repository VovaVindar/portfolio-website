import Head from "next/head";
import styles from "./Home.module.css";
import ContactPopup from "@/components/Home/ContactPopup";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import SelectedClients from "@/components/Home/SelectedClients";
import Work from "@/components/Home/Work";
import Footer from "@/components/Home/Footer";

export default function Home({}) {
  return (
    <>
      <Head>
        <title>Vova Vindar - Digital Designer & Developer</title>
      </Head>
      <div className={`${styles["home-container"]} container`}>
        <div className={`${styles["safari-bug-fix"]}`} aria-hidden="true" />
        <ContactPopup />
        <Hero />
        <About />
        <SelectedClients />
        <Work />
        <Footer />
      </div>
    </>
  );
}
