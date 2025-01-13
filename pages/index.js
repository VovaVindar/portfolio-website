import Head from "next/head";
import styles from "./Home.module.css";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import SelectedClients from "@/components/Home/SelectedClients";
import Work from "@/components/Home/Work";
import Footer from "@/components/Home/Footer";
import Contact from "@/components/Home/Contact";
import { useEffect, useState } from "react";

export default function Home({ isAnimating, numbersProgress, linesCount }) {
  const [startPageAnimation, setStartPageAnimation] = useState(false);

  useEffect(() => {
    if (numbersProgress >= 100) {
      setTimeout(() => setStartPageAnimation(true), 250);
    }
  }, [numbersProgress]);

  return (
    <>
      <Head>
        <title>Vova Vindar — Digital Designer & Developer</title>
      </Head>
      <div className={`${styles["home-container"]} container`}>
        <Contact isAnimating={isAnimating} />
        <Hero
          isAnimating={isAnimating}
          startPageAnimation={startPageAnimation}
        />
        <About
          startPageAnimation={startPageAnimation}
          linesCount={linesCount}
        />
        <SelectedClients startPageAnimation={startPageAnimation} />
        <Work startPageAnimation={startPageAnimation} />
        <Footer startPageAnimation={startPageAnimation} />
      </div>
    </>
  );
}
