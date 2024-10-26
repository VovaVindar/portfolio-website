import React, { useRef, useState, useEffect } from "react";
import styles from "./Videos.module.css";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Videos = ({ startPageAnimation }) => {
  const containerRef = useRef(null);
  const marqueeElementsRef = useRef([]);

  const animationDelay = 17 * 85;
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
        onEnter: () => {
          containerRef.current.classList.add(`${styles["in-view"]}`);
        },
        once: true,
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
      <Marquee>
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => (
          <div
            key={index}
            ref={(el) => (marqueeElementsRef.current[index] = el)}
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
