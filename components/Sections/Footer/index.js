import React, { useState, useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import LocalTime from "@/components/Sections/Footer/LocalTime";

const Footer = ({ staggerInterval, duration, easing, startPageAnimation }) => {
  // On-scroll animation
  const footerOnscroll = useRef([]);
  const socialRef = useRef(null);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => setStartPageAnimation2(true), 2250);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance;
    const footerAnimation = gsap.timeline({});

    if (footerOnscroll.current.length) {
      footerAnimation.set(footerOnscroll.current, {
        opacity: 0,
        filter: "blur(1.5px)",
        color: "red",
      });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: footerOnscroll.current,
        start: "top 90%",
        onEnter: () => {
          footerAnimation.to(footerOnscroll.current, {
            opacity: startPageAnimation2 ? 1 : 0,
            filter: `blur(${startPageAnimation2 ? 0 : 1.5}px)`,
            color: `${startPageAnimation2 ? "#0F1010" : "red"}`,
            delay: 0,
            duration: duration,
            ease: easing,
            stagger: (index) =>
              window.innerWidth > 820
                ? footerStaggerDesktop(index, staggerInterval)
                : footerStaggerMobile(index, staggerInterval - 0.02),
            onComplete: () => {
              if (socialRef.current) {
                socialRef.current.classList.add(`${styles["in-view"]}`);
              }
            },
          });
        },
        once: true,
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (footerAnimation) {
        footerAnimation.kill();
      }
    };
  }, [startPageAnimation2, socialRef]);

  const footerStaggerDesktop = (index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 5) return 1 * interval;
    if (index >= 6 && index <= 8) return 2 * interval;
    if (index >= 9 && index <= 10) return 3 * interval;
    if (index == 11) return 4 * interval;
    if (index >= 12) return 6 * interval;
  };
  function footerStaggerMobile(index, interval) {
    const multipliers = [0, 4, 8, 1, 5, 9, 2, 6, 10, 3, 7, 12, 12, 13, 13]; // Direct mapping of index to multiplier
    return (multipliers[index] ?? 0) * interval; // Default to 0 for out-of-range indices
  }

  // Links hover animation
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  // Copy email tooltip
  const [copyEmail, setCopyEmail] = useState("Email");
  const copyTimeoutRef = useRef(null); // Use a ref to store the timeout ID after re-renders

  return (
    <div className={`${styles["footer-container"]} text-body-1`}>
      <div className={`${styles["footer-top"]}`}>
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
          <p ref={(el) => (footerOnscroll.current[6] = el)}>Vancouver,</p>
          <p ref={(el) => (footerOnscroll.current[9] = el)}>Canada</p>
        </div>
        <div className={`${styles["social-links"]}`} ref={socialRef}>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (footerOnscroll.current[1] = el)}
          >
            Directory:
          </span>
          <p
            onMouseEnter={() => handleMouseEnter("linkedin")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredLink && hoveredLink !== "linkedin"
                ? `${styles["faded"]}`
                : ""
            }
          >
            <Magnetic type="text">
              <Link
                href={"https://www.linkedin.com/in/vovavindar/"}
                ref={(el) => (footerOnscroll.current[4] = el)}
                target="_blank"
              >
                LinkedIn,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => handleMouseEnter("instagram")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredLink && hoveredLink !== "instagram"
                ? `${styles["faded"]}`
                : ""
            }
          >
            <Magnetic type="text">
              <Link
                href={"https://www.instagram.com/vovavindar/"}
                ref={(el) => (footerOnscroll.current[7] = el)}
                target="_blank"
              >
                Instagram,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => handleMouseEnter("dribbble")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredLink && hoveredLink !== "dribbble"
                ? `${styles["faded"]}`
                : ""
            }
          >
            <Magnetic type="text">
              <Link
                href={"https://dribbble.com/VovaVindar"}
                ref={(el) => (footerOnscroll.current[10] = el)}
                target="_blank"
              >
                Dribbble<span className={`${styles["no-mobile"]}`}>,</span>
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={handleMouseLeave}
            className={
              hoveredLink && hoveredLink !== "email"
                ? `${styles["faded"]} ${styles["no-mobile"]}`
                : `${styles["no-mobile"]}`
            }
          >
            <Magnetic type="text">
              <Link
                href={"https://dribbble.com/VovaVindar"}
                ref={(el) => (footerOnscroll.current[11] = el)}
                data-cursor-text="Copy"
                onClick={(e) => {
                  e.preventDefault();
                  if (copyTimeoutRef.current) {
                    clearTimeout(copyTimeoutRef.current); // Clear the existing timeout
                  }
                  const email = "vovavindar@gmail.com";

                  // Copy email to clipboard
                  navigator.clipboard.writeText(email);

                  setCopyEmail("Copied");

                  copyTimeoutRef.current = setTimeout(() => {
                    setCopyEmail("Email");
                  }, 1000);
                }}
              >
                {copyEmail}
              </Link>
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
            Fonts by Type.Weltkern
          </p>
          <p ref={(el) => (footerOnscroll.current[8] = el)}>and Monotype.</p>
        </div>
      </div>
      <div className={`${styles["footer-bottom"]}`}>
        <div>
          <div>
            <div className="text-body-3">
              <p ref={(el) => (footerOnscroll.current[12] = el)}>2024 ©</p>
            </div>
          </div>
          <div>
            <div className="text-body-3">
              <p ref={(el) => (footerOnscroll.current[13] = el)}>
                <Magnetic type="text">
                  <Link href={"/privacy"}>
                    Privacy <span>Policy</span>
                  </Link>
                </Magnetic>
              </p>
            </div>
          </div>
        </div>
        <div className="text-body-3">
          <p ref={(el) => (footerOnscroll.current[14] = el)}>
            <Magnetic type="text">
              <Link href={"/cv"}>CV</Link>
            </Magnetic>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
