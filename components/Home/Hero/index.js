import styles from "./Hero.module.css";
import { useRef } from "react";
import HeroTitle from "@/components/Home/Hero/HeroTitle";
import HeroGrid from "@/components/Home/Hero/HeroGrid";
import { useHeroOnloadAnimations } from "@/hooks/animations/onload/useHeroOnloadAnimations";
import { useHeroScrollAnimations } from "@/hooks/animations/scroll/useHeroScrollAnimations";

const Hero = ({}) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const containerRef = useRef(null);

  useHeroOnloadAnimations(imgOnload, cellOnload);

  useHeroScrollAnimations(containerRef, imgOnload);

  return (
    <div className={styles["hero-container"]} ref={containerRef}>
      {/*<HeroTitle />*/}
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
