import styles from "../Hero.module.css";
import { useRef, useState } from "react";
import { useHeroTitleOnloadAnimations } from "@/hooks/animations/onload/useHeroTitleOnloadAnimations";
import { useHeroTitleScrollAnimations } from "@/hooks/animations/scroll/useHeroTitleScrollAnimations";

const HeroTitle = () => {
  const heroTitleRef = useRef(null);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const { onloadRef, opacity, blur } = useHeroTitleOnloadAnimations(
    heroTitleRef,
    setLoadCompleted
  );

  useHeroTitleScrollAnimations(heroTitleRef, loadCompleted);

  return (
    <h1
      className={styles["hero-title"]}
      style={{ opacity, filter: `blur(${blur}px)` }}
      ref={heroTitleRef}
    >
      Designing for Permanence.
    </h1>
  );
};

export default HeroTitle;
