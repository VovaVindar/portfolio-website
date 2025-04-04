import styles from "./About.module.css";
import { useAboutScrollAnimations } from "@/hooks/animations/scroll/useAboutScrollAnimations";

const About = () => {
  const elementRef = useAboutScrollAnimations();

  return (
    <section className={styles["about-container"]}>
      {/* Add visually hidden heading for screen readers */}
      <h2 id="about-title" className="sr-only">
        About Me
      </h2>

      <div className={`${styles["text-container"]} text-body-3`}>
        <p>
          <span ref={(el) => (elementRef.current[0] = el)}>
            I&apos;m a designer-developer currently based in rainy Vancouver,
            obsessed with creating immersive websites and beautiful digital
            interfaces.
            <br className={`${styles["mobile-breaker"]}`} />
          </span>{" "}
          <span ref={(el) => (elementRef.current[1] = el)}>
            I&apos;ve had the privilege of working with clients like UNIT9,
            Twitch, Dolce&Gabbana, Paradigm, and Cognition, delivering web
            experiences and digital
          </span>{" "}
          <span ref={(el) => (elementRef.current[2] = el)}>
            products that shape the presence of established brands and helping
            emerging startups build identities that have secured{" "}
            <span style={{ whiteSpace: "nowrap" }}>Y Combinator backing.</span>
            <br className={`${styles["mobile-breaker"]}`} />
          </span>{" "}
          <span ref={(el) => (elementRef.current[3] = el)}>
            In an industry that chases trends, I ground my work in permanent
            design principles, creating things that remain purposeful and
            impactful.
          </span>
        </p>

        <div className="text-body-1 left-layout" aria-hidden="true"></div>
        <div className="text-header-1 right-layout" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default About;

About.whyDidYouRender = true;
