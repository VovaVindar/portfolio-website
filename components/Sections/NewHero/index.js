import styles from "./Hero.module.css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import HeroTitle from "@/components/Sections/NewHero/HeroTitle";
import HeroGrid from "@/components/Sections/NewHero/HeroGrid";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONSTANTS = {
  DELAY: 1.72,
  EASE: "power3.out",
  STAGGER_DELAY: 0.07,
  EXTRA_STAGGER: 0.074,
  CELL_DURATION: 3,
  INITIAL_BLUR: 4.5,
};

const Hero = ({ isAnimating, startPageAnimation }) => {
  const imgOnload = useRef([]);
  const cellOnload = useRef([]);
  const containerRef = useRef(null);
  const timelineImgRef = useRef(null);
  const scrolltriggerImgRef = useRef(null);
  const timelineCellRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [blur, setBlur] = useState(ANIMATION_CONSTANTS.INITIAL_BLUR);

  const setupTimelines = () => {
    if (timelineImgRef.current) timelineImgRef.current.kill();
    if (timelineCellRef.current) timelineCellRef.current.kill();
    if (scrolltriggerImgRef.current) scrolltriggerImgRef.current.kill();

    timelineImgRef.current = gsap.timeline();
    timelineCellRef.current = gsap.timeline();
  };

  useGSAP(() => {
    setupTimelines();

    if (startPageAnimation) {
      // Image filters animation
      if (imgOnload.current?.length) {
        timelineImgRef.current.to([...imgOnload.current].reverse(), {
          delay: ANIMATION_CONSTANTS.DELAY,
          duration: 0,
          stagger: {
            each:
              ANIMATION_CONSTANTS.STAGGER_DELAY +
              ANIMATION_CONSTANTS.EXTRA_STAGGER,
            onComplete() {
              this.targets()[0]?.classList.add(styles["in-view"]);
            },
          },
        });

        if (containerRef.current) {
          scrolltriggerImgRef.current = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom+=50px top",
            end: "max",
            onEnter: () => {
              containerRef.current.classList.add(`${styles["scroll"]}`);
              [...imgOnload.current].forEach((img) => {
                img.classList.remove(styles["in-view"]);
              });
            },
            onLeaveBack: () => {
              // Remove the class when scrolling back up
              [...imgOnload.current].forEach((img) => {
                img.classList.add(styles["in-view"]);
              });
            },
            once: false,
          });

          ScrollTrigger.refresh();
        }
      }

      // Cell slide animation
      if (cellOnload.current?.length) {
        const containerHeight =
          cellOnload.current[0]?.parentElement?.offsetHeight ?? 0;

        timelineCellRef.current.fromTo(
          [...cellOnload.current].reverse(),
          {
            y: -(containerHeight + 5),
            autoAlpha: 0,
            scale: 1.8,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            transformOrigin: "bottom",
            duration: ANIMATION_CONSTANTS.CELL_DURATION,
            delay: ANIMATION_CONSTANTS.DELAY,
            ease: ANIMATION_CONSTANTS.EASE,
            stagger: ANIMATION_CONSTANTS.STAGGER_DELAY,
          }
        );
      }
    }

    return () => {
      timelineImgRef.current?.kill();
      timelineCellRef.current?.kill();
      scrolltriggerImgRef.current?.kill();
      timelineImgRef.current = null;
      timelineCellRef.current = null;
      scrolltriggerImgRef.current = null;
    };
  }, [startPageAnimation]);

  useEffect(() => {
    setOpacity(isAnimating ? 0 : 1);
    setBlur(isAnimating ? ANIMATION_CONSTANTS.INITIAL_BLUR : 0);
  }, [isAnimating]);

  return (
    <div className={styles["hero-container"]} ref={containerRef}>
      <HeroTitle
        style={{ opacity, filter: `blur(${blur}px)` }}
        isAnimating={isAnimating}
        duration={ANIMATION_CONSTANTS.CELL_DURATION}
        ease={ANIMATION_CONSTANTS.EASE}
      />
      <HeroGrid imgOnload={imgOnload} cellOnload={cellOnload} />
    </div>
  );
};

export default Hero;
