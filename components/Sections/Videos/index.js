import React, { useRef, useState, useEffect } from "react";
import styles from "./Videos.module.css";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Videos = ({ startPageAnimation, linesCount }) => {
  const containerRef = useRef(null);

  const animationDelay = linesCount ? 6 * 85 : 20 * 85;
  const [pageAnimationStarted, setPageAnimationStarted] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => {
        containerRef.current.classList.add(`${styles["visible"]}`);
        setPageAnimationStarted(true);
      }, animationDelay);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance;

    if (pageAnimationStarted) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom-=35px",
        end: "bottom+=65px top",
        toggleClass: `${styles["in-view"]}`,
        once: false,
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [pageAnimationStarted]);

  return (
    <div className={`${styles["videos-container"]}`} ref={containerRef}>
      <Marquee passedX={500}>
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            data-cursor-text="Vitamin Living"
            className={`mf-exclusion ${styles["el"]}`}
          >
            <Magnetic>
              <Image
                src="/marquee.png"
                alt="Picture of the author"
                fill
                priority={true}
              />
            </Magnetic>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Videos;
