import styles from "./Hero.module.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import HeroTitle from "@/components/Sections/NewHero/HeroTitle";
import HeroGrid from "@/components/Sections/NewHero/HeroGrid";

const Hero = ({ duration, easing, startPageAnimation, isAnimating }) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const timelineImgRef = useRef(null);
  const timelineCellRef = useRef(null);

  useGSAP(() => {
    // Kill previous timeline if it exists
    if (timelineImgRef.current) {
      timelineImgRef.current.kill();
    }
    if (timelineCellRef.current) {
      timelineCellRef.current.kill();
    }

    timelineImgRef.current = gsap.timeline();
    timelineCellRef.current = gsap.timeline();

    if (startPageAnimation) {
      // Img filters onload animation
      if (imgOnload.current.length) {
        timelineImgRef.current.to([...imgOnload.current].reverse(), {
          delay: 1.695,
          stagger: {
            each: 0.072,
            onComplete() {
              this.targets()[0].classList.add(`${styles["in-view"]}`);
            },
          },
        });
      }

      // Slide onload animation
      if (cellOnload.current.length) {
        const containerHeight =
          cellOnload.current[0].parentElement.offsetHeight;

        timelineCellRef.current.fromTo(
          [...cellOnload.current].reverse(),
          {
            y: -(containerHeight + 5),
          },
          {
            y: 0,
            duration: 3,
            delay: 1.595,
            ease: "power2.out",
            stagger: 0.072,
          }
        );
      }
    }

    return () => {
      if (timelineImgRef.current) {
        timelineImgRef.current.kill();
        timelineImgRef.current = null;
      }
      if (timelineCellRef.current) {
        timelineCellRef.current.kill();
        timelineCellRef.current = null;
      }
    };
  }, [startPageAnimation]);

  // Title fade-in animation
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(4.5);

  useEffect(() => {
    if (!isAnimating) {
      setOpacity(1);
      setBlur(0);
    } else {
      setOpacity(0);
      setBlur(4.5);
    }
  }, [isAnimating]);

  const titleStyle = {
    opacity,
    filter: `blur(${blur}px)`,
  };

  return (
    <div className={styles["hero-container"]}>
      <HeroTitle style={titleStyle} isAnimating={isAnimating} />
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
