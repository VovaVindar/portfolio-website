import styles from "./Hero.module.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const Hero = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
  linesCount,
}) => {
  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className={`${styles["hero-container"]}`}>
      {rows.map((row) =>
        cols.map((col) => (
          <div key={`${row}-${col}`} className={`${styles["grid-cell"]}`} />
        ))
      )}
    </div>
  );
};

export default Hero;
