import Head from "next/head";
import styles from "./Home.module.css";
import NewHero from "@/components/Sections/NewHero";
import About from "@/components/Sections/About";
import SelectedClients from "@/components/Sections/SelectedClients";
import Work from "@/components/Sections/Work";
import Footer from "@/components/Sections/Footer";
import Contact from "@/components/Contact";
import { useRef, useEffect, useState, useMemo } from "react";

const STAGGER_INTERVAL = 0.11;
const ANIMATION_DURATION = 0.75;
const ANIMATION_EASING = "power1.in"; // Easing for: text fade in

export default function Home({ isAnimating, numbersProgress, linesCount }) {
  const [startPageAnimation, setStartPageAnimation] = useState(false);
  const container = useRef(null);

  // Memoize common props to prevent recreation
  const commonProps = useMemo(
    () => ({
      staggerInterval: STAGGER_INTERVAL,
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
      startPageAnimation,
    }),
    [startPageAnimation]
  );

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
      <div ref={container} className={`${styles["home-container"]} container`}>
        <Contact isAnimating={isAnimating} duration={ANIMATION_DURATION} />
        <NewHero isAnimating={isAnimating} {...commonProps} />
        <About {...commonProps} linesCount={linesCount} />
        <SelectedClients {...commonProps} />
        <Work
          duration={ANIMATION_DURATION}
          easing={ANIMATION_EASING}
          startPageAnimation={startPageAnimation}
        />
        <Footer {...commonProps} />
      </div>
    </>
  );
}
