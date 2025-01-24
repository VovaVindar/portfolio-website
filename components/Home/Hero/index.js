import styles from "./Hero.module.css";
import { useRef, useState } from "react";
import HeroTitle from "@/components/Home/Hero/HeroTitle";
import ChangeText from "@/components/Global/ChangeText";
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
      <div className={`${styles["hover-text"]}`}>
        <ChangeText text={hoverText} className={"text-header-3"} />
      </div>
      <HeroGrid
        imgOnload={imgOnload}
        cellOnload={cellOnload}
        onHover={setHoverText}
      />
    </div>
  );
};

export default Hero;

Hero.whyDidYouRender = true;
