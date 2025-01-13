import styles from "../Hero.module.css";
import { useRef, useState } from "react";
import { useHeroTitleOnloadAnimations } from "@/hooks/animations/onload/useHeroTitleOnloadAnimations";
import { useHeroTitleScrollAnimations } from "@/hooks/animations/scroll/useHeroTitleScrollAnimations";

const HeroTitle = () => {
  const heroTitleRef = useRef(null);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const { opacity, blur, transition } = useHeroTitleOnloadAnimations(
    heroTitleRef,
    setLoadCompleted
  );

  useHeroTitleScrollAnimations(heroTitleRef, loadCompleted);

  const elementStyle = {
    opacity,
    filter: `blur(${blur}px)`,
  };
  if (transition) {
    elementStyle.transition = transition;
  }

  return (
    <h1
      className={styles["hero-title"]}
      style={elementStyle}
      ref={heroTitleRef}
    >
      Designing for Permanence.
    </h1>
  );
};

export default HeroTitle;
