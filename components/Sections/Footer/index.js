import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Footer.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import LocalTime from "@/components/Sections/Footer/LocalTime";

const Footer = ({ staggerInterval, duration, easing, startPageAnimation }) => {
  const footerOnscroll = useRef([]);
  const socialRef = useRef(null);
  const timelineRef = useRef(null);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [copyEmail, setCopyEmail] = useState("Email");
  const copyTimeoutRef = useRef(null);

  // Memoized stagger calculations
  const footerStaggerDesktop = useCallback((index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 5) return 1 * interval;
    if (index >= 6 && index <= 7) return 2 * interval;
    if (index == 8) return 3 * interval;
    if (index == 9) return 4 * interval;
    if (index >= 9) return 6 * interval;
  }, []);

  const footerStaggerMobile = useCallback((index, interval) => {
    const multipliers = [0, 3, 7, 1, 4, 7, 2, 5, 6, 3, 10, 10];
    return (multipliers[index] ?? 0) * interval;
  }, []);

  // Animation delay effect
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => setStartPageAnimation2(true), 2250);
      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  // Handle email copy
  const handleCopyEmail = useCallback((e) => {
    e.preventDefault();
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    navigator.clipboard.writeText("vovavindar@gmail.com");
    setCopyEmail("Copied");

    copyTimeoutRef.current = setTimeout(() => {
      setCopyEmail("Email");
    }, 850);
  }, []);

  useGSAP(() => {
    let scrollTriggerInstance;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline();

    if (footerOnscroll.current.length && startPageAnimation2) {
      timelineRef.current.set(footerOnscroll.current, {
        opacity: 0,
        filter: "blur(2px)",
        color: "red",
      });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: footerOnscroll.current,
        start: "top 100%",
        onEnter: () => {
          timelineRef.current.fromTo(
            footerOnscroll.current,
            { opacity: 0, filter: "blur(2px)", color: "red" },
            {
              opacity: 1,
              filter: "blur(0px)",
              color: "#0F1010",
              delay: 0,
              duration: duration,
              ease: easing,
              stagger: (index) =>
                window.innerWidth > 820
                  ? footerStaggerDesktop(index, staggerInterval)
                  : footerStaggerMobile(index, staggerInterval - 0.02),
              onComplete: () => {
                if (socialRef.current) {
                  socialRef.current.classList.add(styles["in-view"]);
                }
              },
            }
          );
        },
        once: true,
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [
    startPageAnimation2,
    duration,
    easing,
    staggerInterval,
    footerStaggerDesktop,
    footerStaggerMobile,
  ]);

  return (
    <div className={`${styles["footer-container"]} text-body-1`}>
      <div className={styles["footer-top"]}>
        <div>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (footerOnscroll.current[0] = el)}
          >
            Pacific Time:
          </span>
          <p>
            <LocalTime ref={(el) => (footerOnscroll.current[3] = el)} />
          </p>
          <p ref={(el) => (footerOnscroll.current[6] = el)}>Vancouver</p>
        </div>
        <div className={styles["social-links"]} ref={socialRef}>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (footerOnscroll.current[1] = el)}
          >
            Directory:
          </span>
          <p
            onMouseEnter={() => setHoveredLink("linkedin")}
            onMouseLeave={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "linkedin" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://www.linkedin.com/in/vovavindar/"
                ref={(el) => (footerOnscroll.current[4] = el)}
                target="_blank"
              >
                LinkedIn,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("instagram")}
            onMouseLeave={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "instagram" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://www.instagram.com/vovavindar/"
                ref={(el) => (footerOnscroll.current[7] = el)}
                target="_blank"
              >
                Instagram,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("dribbble")}
            onMouseLeave={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "dribbble" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://dribbble.com/VovaVindar"
                ref={(el) => (footerOnscroll.current[8] = el)}
                target="_blank"
              >
                Dribbble<span className={styles["no-mobile"]}>,</span>
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("email")}
            onMouseLeave={() => setHoveredLink(null)}
            className={`${
              hoveredLink && hoveredLink !== "email"
                ? `${styles["faded"]} ${styles["no-mobile"]}`
                : styles["no-mobile"]
            }`}
          >
            <Magnetic type="text">
              <button
                ref={(el) => (footerOnscroll.current[9] = el)}
                data-cursor-text="Copy"
                onClick={handleCopyEmail}
              >
                {copyEmail}
              </button>
            </Magnetic>
          </p>
        </div>
        <div>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (footerOnscroll.current[2] = el)}
          >
            Colophon:
          </span>
          <p ref={(el) => (footerOnscroll.current[5] = el)}>
            Lausanne and Times.
          </p>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <div>
          <div></div>
          <div>
            <div className="text-body-3">
              <p ref={(el) => (footerOnscroll.current[10] = el)}>
                <Magnetic type="text">
                  <Link href="/privacy-policy">
                    Privacy <span>Policy</span>
                  </Link>
                </Magnetic>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-body-3">
            <p ref={(el) => (footerOnscroll.current[11] = el)}>
              <Magnetic type="text">
                <Link href="/cv">CV</Link>
              </Magnetic>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
