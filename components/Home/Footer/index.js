import React, { useState, useRef, useCallback } from "react";
import styles from "./Footer.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Link from "next/link";
import LocalTime from "@/components/Home/Footer/LocalTime";
import { useFooterScrollAnimations } from "@/hooks/animations/scroll/useFooterScrollAnimations";

const Footer = ({ startPageAnimation }) => {
  const { elementRef, socialRef } =
    useFooterScrollAnimations(startPageAnimation);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [copyEmail, setCopyEmail] = useState("Email");
  const copyTimeoutRef = useRef(null);

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

  return (
    <div className={`${styles["footer-container"]} text-body-1`}>
      <div className={styles["footer-top"]}>
        <div>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (elementRef.current[0] = el)}
          >
            Pacific Time:
          </span>
          <p>
            <LocalTime ref={(el) => (elementRef.current[3] = el)} />
          </p>
          <p ref={(el) => (elementRef.current[6] = el)}>Vancouver</p>
        </div>
        <div className={styles["social-links"]} ref={socialRef}>
          <span
            className="text-header-3 mf-hidden"
            ref={(el) => (elementRef.current[1] = el)}
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
                ref={(el) => (elementRef.current[4] = el)}
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
                ref={(el) => (elementRef.current[7] = el)}
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
                ref={(el) => (elementRef.current[8] = el)}
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
                ref={(el) => (elementRef.current[9] = el)}
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
            ref={(el) => (elementRef.current[2] = el)}
          >
            Colophon:
          </span>
          <p ref={(el) => (elementRef.current[5] = el)}>Lausanne and Times.</p>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <div>
          <div></div>
          <div>
            <div className="text-body-3">
              <p ref={(el) => (elementRef.current[10] = el)}>
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
            <p ref={(el) => (elementRef.current[11] = el)}>
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
