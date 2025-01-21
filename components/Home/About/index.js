import styles from "./About.module.css";
import { useAboutScrollAnimations } from "@/hooks/animations/scroll/useAboutScrollAnimations";

const About = () => {
  const elementRef = useAboutScrollAnimations();

  return (
    <div className={styles["about-container"]}>
      <div className={`text-body-3 ${styles["text-container"]}`}>
        <p>
          <span ref={(el) => (elementRef.current[0] = el)}>
            I'm a detail-oriented designer-developer based in Vancouver,
            obsessed with creating immersive websites and beautiful digital
            interfaces.
          </span>{" "}
          <span ref={(el) => (elementRef.current[1] = el)}>
            I've had the privilege of working with clients like UNIT9, Twitch,
            Dolce & Gabbana, Paradigm, and Cognition, delivering web
            experiences, digital
          </span>{" "}
          <span ref={(el) => (elementRef.current[2] = el)}>
            products, and brand identities, shaping digital presence for
            established brands, and helping startups secure funding including Y
            Combinator.
          </span>{" "}
          <span ref={(el) => (elementRef.current[3] = el)}>
            In an industry driven by trends, I focus on creating things that
            stay.
          </span>
        </p>

        <div class="text-body-1 left-layout"></div>
        <div class="text-header-1 right-layout"></div>
      </div>
    </div>
  );
};

export default About;
