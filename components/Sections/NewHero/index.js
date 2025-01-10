import styles from "./Hero.module.css";
import HeroTitle from "@/components/Sections/NewHero/HeroTitle";
import HeroGrid from "@/components/Sections/NewHero/HeroGrid";

const Hero = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
  linesCount,
}) => {
  return (
    <div className={`${styles["hero-container"]}`}>
      <HeroTitle />
      <HeroGrid />
    </div>
  );
};

export default Hero;
