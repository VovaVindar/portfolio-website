import Head from "next/head";
import styles from "./Home.module.css";
import Hero from "@/components/Sections/Hero";
import Videos from "@/components/Sections/Videos";
import SelectedClients from "@/components/Sections/SelectedClients";
import Work from "@/components/Sections/Work";
import Footer from "@/components/Sections/Footer";
import Scrollbar from "@/components/Scrollbar";
import { TransitionContext } from "@/context/TransitionContext";
import { useContext, useRef, useEffect, useState } from "react";

export default function Home({ isAnimating, numbersProgress }) {
  const { timeline } = useContext(TransitionContext);
  const [startPageAnimation, setStartPageAnimation] = useState(false);
  const container = useRef(null);

  var staggerInterval = 0.11;
  var duration = 0.75;
  var easing = "power1.in"; // Easing for: text fade in

  useEffect(() => {
    if (numbersProgress >= 100) {
      setTimeout(() => setStartPageAnimation(true), 250);
    }
  }, [numbersProgress]);

  return (
    <>
      <Head>
        <title>Vova Vindar</title>
      </Head>
      <Scrollbar
        text={"Contact"}
        href="mailto:vovavindar@gmail.com"
        isAnimating={isAnimating}
      />
      {/*<canvas id="gl"></canvas>*/}
      <div ref={container} className={`${styles["home-container"]} home`}>
        <Hero
          staggerInterval={staggerInterval}
          duration={duration}
          easing={easing}
          startPageAnimation={startPageAnimation}
        />
        <Videos startPageAnimation={startPageAnimation} />
        <SelectedClients
          staggerInterval={staggerInterval}
          duration={duration}
          easing={easing}
          startPageAnimation={startPageAnimation}
        />
        <Work
          duration={duration}
          easing={easing}
          startPageAnimation={startPageAnimation}
        />
        <Footer
          staggerInterval={staggerInterval}
          duration={duration}
          easing={easing}
          startPageAnimation={startPageAnimation}
        />
      </div>
    </>
  );
}
