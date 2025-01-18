import styles from "./Hero.module.css";
import { useRef, useState } from "react";
import HeroTitle from "@/components/Home/Hero/HeroTitle";
import HoverText from "@/components/Home/Hero/HoverText";
import HeroGrid from "@/components/Home/Hero/HeroGrid";
import { useHeroOnloadAnimations } from "@/hooks/animations/onload/useHeroOnloadAnimations";
import { useHeroScrollAnimations } from "@/hooks/animations/scroll/useHeroScrollAnimations";

const Hero = ({}) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const containerRef = useRef(null);

  useHeroOnloadAnimations(imgOnload, cellOnload);

  useHeroScrollAnimations(containerRef, imgOnload);

  const [hoverText, setHoverText] = useState("");

  return (
    <div className={styles["hero-container"]} ref={containerRef}>
      <HeroTitle />
      <HoverText text={hoverText} />
      <HeroGrid
        imgOnload={imgOnload}
        cellOnload={cellOnload}
        onHover={setHoverText}
      />
    </div>
  );
};

export default Hero;
