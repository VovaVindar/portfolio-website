import { useRef, useState } from "react";
import { useHeroTitleOnloadAnimations } from "@/hooks/animations/onload/useHeroTitleOnloadAnimations";
import { useHeroTitleScrollAnimations } from "@/hooks/animations/scroll/useHeroTitleScrollAnimations";

const HeroTitle = ({ style, isAnimating = true, duration }) => {
  const heroTitleRef = useRef(null);
  const [loadCompleted, setLoadCompleted] = useState(false);

  useHeroTitleOnloadAnimations(
    heroTitleRef,
    isAnimating,
    duration,
    setLoadCompleted
  );

  useHeroTitleScrollAnimations(heroTitleRef, loadCompleted);

  return (
    <h1 style={style} ref={heroTitleRef}>
      Designing for Permanence.
    </h1>
  );
};

export default HeroTitle;
