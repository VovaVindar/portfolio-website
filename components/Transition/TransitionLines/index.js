import styles from "./TransitionLines.module.css";
//import { TransitionContext } from "@/context/TransitionContext";
import React, { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoadingLines = ({ onLoadingComplete, numbersProgress }) => {
  const [lines, setLines] = useState([]);
  const linesContainerRef = useRef(null);
  const linesReadyRef = useRef(false);
  var totalLines = 0;

  //const { timelineExit } = useContext(TransitionContext);

  useEffect(() => {
    const generateLines = () => {
      const height = window.innerHeight;
      const rlh = parseInt(
        getComputedStyle(document.documentElement).lineHeight
      );
      const lineHeight = 1;
      totalLines = Math.floor(height / (rlh - lineHeight));

      const linesArray = [];
      for (let i = 0; i < totalLines; i++) {
        linesArray.push(
          <div key={i} className={`${styles["line"]} mounted`}></div>
        );
      }
      setLines(linesArray);
      linesContainerRef.current.style.backgroundColor = "transparent";
      linesReadyRef.current = true;
    };

    generateLines();
  }, []);

  // TODO: fix lines animation on high screens

  useGSAP(() => {
    const timelineIntro = gsap.timeline({});

    if (linesReadyRef.current && linesContainerRef.current) {
      linesContainerRef.current.classList.add("loading");

      const lines = Array.from(linesContainerRef.current.children);

      if (lines.length > 0) {
        var staggerInterval =
          totalLines <= 50 ? 0.038 : totalLines >= 100 ? 0.0025 : 0.008;
        var duration = 1.25;

        timelineIntro.fromTo(
          lines,
          {
            scaleY: 1,
            transformOrigin: "bottom",
            backgroundColor: "#0F1010",
          },
          {
            scaleY: `${numbersProgress >= 100 ? 0 : 1}`,
            backgroundColor: `${
              numbersProgress >= 100 ? `#C34356` : `#0F1010`
            }`,
            duration: duration,
            delay: 0.05,
            ease: "power4.inOut",
            stagger: {
              each: staggerInterval,
              from: "start",
            },
            onComplete: () => {
              setTimeout(() => {
                onLoadingComplete();
                linesContainerRef.current.classList.remove("loading");
              }, 540); // for some reason, onComplete is called early
            },
          }
        );

        /*timelineExit
        .add(
          gsap.to(lines, {
            scaleY: 1,
            transformOrigin: "top",
            delay: 0,
            duration: duration,
            ease: "power4.in",
            stagger: { each: staggerInterval, from: "start" },
          })
        )
        .add(
          gsap.to(lines, {
            scaleY: 0,
            duration: duration,
            delay: 0.2,
            ease: "power4.inOut",
            stagger: {
              each: staggerInterval,
              from: "start",
            },
          })
        );*/
      }
    }

    return () => {
      if (timelineIntro) {
        timelineIntro.kill();
      }
      //timelineExit.kill();
    };
  }, [numbersProgress]);

  return (
    <div
      className={`${styles["line-container"]} loading`}
      ref={linesContainerRef}
    >
      {lines}
    </div>
  );
};

export default LoadingLines;
