import { useState, useRef } from "react";
import styles from "./Footer.module.css";
import Magnetic from "@/components/Global/Magnetic";
import Link from "next/link";
import LocalTime from "@/components/Home/Footer/LocalTime";
import { useFooterScrollAnimations } from "@/hooks/animations/scroll/useFooterScrollAnimations";

const Footer = () => {
  const { elementRef, socialRef } = useFooterScrollAnimations();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [copyEmail, setCopyEmail] = useState("Email");
  const copyTimeoutRef = useRef(null);

  // Handle email copy
  const handleCopyEmail = async (e) => {
    e.preventDefault();
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText("vovavindar@gmail.com");
      setCopyEmail("Copied");
      // Add aria-live to announce copy success
      const message = document.getElementById("copy-message");
      if (message) message.textContent = "Email copied to clipboard";

      copyTimeoutRef.current = setTimeout(() => {
        setCopyEmail("Email");
        if (message) message.textContent = "";
      }, 850);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Announce failure to screen readers
      const message = document.getElementById("copy-message");
      if (message) message.textContent = "Failed to copy email";
    }
  };

  return (
    <footer className={`${styles["footer-container"]} text-body-1`}>
      {/* Add live region for copy feedback */}
      <div
        id="copy-message"
        role="status"
        aria-live="polite"
        className="sr-only"
      ></div>

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
            onFocus={() => setHoveredLink("linkedin")}
            onBlur={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "linkedin" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://www.linkedin.com/in/vovavindar/"
                ref={(el) => (elementRef.current[4] = el)}
                target="_blank"
                aria-label={`Visit my LinkedIn`}
                aria-description="opens in new tab"
              >
                LinkedIn,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("instagram")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("instagram")}
            onBlur={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "instagram" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://www.instagram.com/vovavindar/"
                ref={(el) => (elementRef.current[7] = el)}
                target="_blank"
                aria-label={`Visit my Instagram`}
                aria-description="opens in new tab"
              >
                Instagram,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("dribbble")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("dribbble")}
            onBlur={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "dribbble" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://dribbble.com/VovaVindar"
                ref={(el) => (elementRef.current[8] = el)}
                target="_blank"
                aria-label={`Visit my Dribbble`}
                aria-description="opens in new tab"
              >
                Dribbble,
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("cosmos")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("cosmos")}
            onBlur={() => setHoveredLink(null)}
            className={
              hoveredLink && hoveredLink !== "cosmos" ? styles["faded"] : ""
            }
          >
            <Magnetic type="text">
              <Link
                href="https://www.cosmos.so/vovavindar"
                ref={(el) => (elementRef.current[9] = el)}
                target="_blank"
                aria-label={`Visit my Cosmos`}
                aria-description="opens in new tab"
              >
                Cosmos<span className={styles["no-mobile"]}>,</span>
              </Link>
            </Magnetic>
          </p>
          <p
            onMouseEnter={() => setHoveredLink("email")}
            onMouseLeave={() => setHoveredLink(null)}
            onFocus={() => setHoveredLink("email")}
            onBlur={() => setHoveredLink(null)}
            className={`${
              hoveredLink && hoveredLink !== "email"
                ? `${styles["faded"]} ${styles["no-mobile"]}`
                : styles["no-mobile"]
            }`}
          >
            <Magnetic type="text">
              <button
                ref={(el) => (elementRef.current[10] = el)}
                data-cursor-text="Copy"
                onClick={handleCopyEmail}
                aria-label={`Copy email`}
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
              <p ref={(el) => (elementRef.current[11] = el)}>
                <Magnetic type="small-text">
                  <Link scroll={false} href="/privacy-policy">
                    Privacy <span>Policy</span>
                  </Link>
                </Magnetic>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-body-3">
            <p ref={(el) => (elementRef.current[12] = el)}>
              <Magnetic type="small-text">
                <Link
                  href="/cv"
                  style={{
                    opacity: 0,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  CV
                </Link>
              </Magnetic>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

Footer.whyDidYouRender = true;
