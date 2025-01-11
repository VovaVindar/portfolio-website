import styles from "./Hero.module.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import HeroTitle from "@/components/Sections/NewHero/HeroTitle";
import HeroGrid from "@/components/Sections/NewHero/HeroGrid";

const ANIMATION_CONSTANTS = {
  IMG_DELAY: 1.595,
  CELL_DELAY: 1.595,
  STAGGER_DELAY: 0.064,
  EXTRA_STAGGER: 0.04,
  CELL_DURATION: 2.7,
  INITIAL_BLUR: 4.5,
};

const Hero = ({ isAnimating, startPageAnimation }) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const timelineImgRef = useRef(null);
  const timelineCellRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(ANIMATION_CONSTANTS.INITIAL_BLUR);

  const setupTimelines = () => {
    if (timelineImgRef.current) timelineImgRef.current.kill();
    if (timelineCellRef.current) timelineCellRef.current.kill();

    timelineImgRef.current = gsap.timeline();
    timelineCellRef.current = gsap.timeline();
  };

  useGSAP(() => {
    setupTimelines();

    if (startPageAnimation) {
      // Image filters animation
      if (imgOnload.current?.length) {
        timelineImgRef.current.to([...imgOnload.current].reverse(), {
          delay: ANIMATION_CONSTANTS.IMG_DELAY,
          stagger: {
            each:
              ANIMATION_CONSTANTS.STAGGER_DELAY +
              ANIMATION_CONSTANTS.EXTRA_STAGGER,
            onComplete() {
              this.targets()[0]?.classList.add(styles["in-view"]);
            },
          },
        });
      }

      // Cell slide animation
      if (cellOnload.current?.length) {
        const containerHeight =
          cellOnload.current[0]?.parentElement?.offsetHeight ?? 0;

        timelineCellRef.current.fromTo(
          [...cellOnload.current].reverse(),
          {
            y: -(containerHeight + 5),
          },
          {
            y: 0,
            duration: ANIMATION_CONSTANTS.CELL_DURATION,
            delay: ANIMATION_CONSTANTS.CELL_DELAY,
            ease: "power2.out",
            stagger: ANIMATION_CONSTANTS.STAGGER_DELAY,
          }
        );
      }
    }

    return () => {
      timelineImgRef.current?.kill();
      timelineCellRef.current?.kill();
      timelineImgRef.current = null;
      timelineCellRef.current = null;
    };
  }, [startPageAnimation]);

  useEffect(() => {
    setOpacity(isAnimating ? 0 : 1);
    setBlur(isAnimating ? ANIMATION_CONSTANTS.INITIAL_BLUR : 0);
  }, [isAnimating]);

  return (
    <div className={styles["hero-container"]}>
      <HeroTitle
        style={{ opacity, filter: `blur(${blur}px)` }}
        isAnimating={isAnimating}
        duration={ANIMATION_CONSTANTS.CELL_DURATION}
      />
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
