import styles from "./Hero.module.css";
import { useRef, useEffect, useState } from "react";
import { HERO } from "@/constants/animations";
import HeroTitle from "@/components/Home/Hero/HeroTitle";
import HeroGrid from "@/components/Home/Hero/HeroGrid";
import { useHeroOnloadAnimations } from "@/hooks/animations/onload/useHeroOnloadAnimations";
import { useHeroScrollAnimations } from "@/hooks/animations/scroll/useHeroScrollAnimations";

const Hero = ({ isAnimating, startPageAnimation }) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const containerRef = useRef(null);

  useHeroOnloadAnimations(imgOnload, cellOnload, startPageAnimation);

  useHeroScrollAnimations(containerRef, imgOnload);

  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(HERO.LOAD.TITLE.INITIAL_BLUR);

  useEffect(() => {
    setOpacity(isAnimating ? 0 : 1);
    setBlur(isAnimating ? HERO.LOAD.TITLE.INITIAL_BLUR : 0);
  }, [isAnimating]);

  return (
    <div className={styles["hero-container"]} ref={containerRef}>
      <HeroTitle
        style={{ opacity, filter: `blur(${blur}px)` }}
        isAnimating={isAnimating}
        duration={HERO.LOAD.GRID.CELL_DURATION}
      />
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
