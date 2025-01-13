import styles from "./About.module.css";
import { useAboutScrollAnimations } from "@/hooks/animations/scroll/useAboutScrollAnimations";

const About = () => {
  const elementRef = useAboutScrollAnimations();

  const aboutText = [
    `I'm a detail-oriented designer-developer based in Vancouver, obsessed with creating immersive websites and intuitive digital interfaces. During my career,`,
    `I've had the privilege of working with clients like UNIT9, Twitch, Dolce & Gabbana, Paradigm, and Cognition, helping them explore new business ideas,`,
    `shape their identity, and secure early-stage funding. From developing interactive experiences for UNIT9 and Twitch to shaping the digital presence of`,
    `luxury powerhouse Dolce & Gabbana, each project has been a unique adventure in digital storytelling.`,
  ];

  return (
    <div className={styles["about-container"]}>
      <div className={`${styles["about"]} text-body-3`}>
        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />

        <div className={`text-body-3 ${styles["text-container"]}`}>
          {aboutText.map((text, index) => (
            <p key={index} ref={(el) => (elementRef.current[index] = el)}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
