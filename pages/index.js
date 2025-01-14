import Head from "next/head";
import styles from "./Home.module.css";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import SelectedClients from "@/components/Home/SelectedClients";
import Work from "@/components/Home/Work";
import Footer from "@/components/Home/Footer";
import Contact from "@/components/Home/Contact";

export default function Home({}) {
  return (
    <>
      <Head>
        <title>Vova Vindar — Digital Designer & Developer</title>
      </Head>
      <div className={`${styles["home-container"]} container`}>
        <Contact />
        <Hero />
        <About />
        <SelectedClients />
        {/*<Work />*/}
        <Footer />
      </div>
    </>
  );
}
