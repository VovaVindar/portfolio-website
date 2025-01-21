import styles from "./About.module.css";
import { useAboutScrollAnimations } from "@/hooks/animations/scroll/useAboutScrollAnimations";

const About = () => {
  const elementRef = useAboutScrollAnimations();

  const aboutText = [
    `I'm a detail-oriented designer-developer based in Vancouver, obsessed with creating immersive websites and beautiful digital interfaces.`,
    `I've had the privilege of working with clients like UNIT9, Twitch, Dolce & Gabbana, Paradigm, and Cognition, delivering web experiences, digital`,
    `products, and brand identities, shaping digital presence for established brands, and helping startups secure funding including Y Combinator.`,
    `In an industry driven by trends, I focus on creating things that stay.`,
  ];

  return (
    <div className={styles["about-container"]}>
      <div className={`text-body-3 ${styles["text-container"]}`}>
        {aboutText.map((text, index) => (
          <p key={index} ref={(el) => (elementRef.current[index] = el)}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
