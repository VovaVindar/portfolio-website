import { useEffect, useState, useRef } from "react";
import styles from "./Contact.module.css";
import Scrollbar from "@/components/Scrollbar";
import Magnetic from "@/components/Magnetic";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { startLenis, stopLenis } from "@/components/SmoothScrolling";

export default function Contact({ isAnimating, easing, duration }) {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleMailtoClick = (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href.startsWith("mailto:")) return;

      let timeout;

      const handleBlur = () => {
        // Clear timeout if the browser opens the mail client
        clearTimeout(timeout);
        window.removeEventListener("blur", handleBlur);
      };

      window.addEventListener("blur", handleBlur);

      // Fallback if the mail client doesn't open within 500ms
      timeout = setTimeout(() => {
        setContactOpen(true); // show contact-container
        stopLenis();

        window.removeEventListener("blur", handleBlur);
      }, 210);
    };

    // Attach event listeners to mailto links
    const mailtoLinks = document.querySelectorAll('a[href^="mailto"]');
    mailtoLinks.forEach((link) =>
      link.addEventListener("click", handleMailtoClick)
    );

    // Attach event listener for Esc key
    const handleEscClose = (event) => {
      if (event.key === "Escape" && contactOpen) {
        setContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      // Clean up event listeners
      mailtoLinks.forEach((link) =>
        link.removeEventListener("click", handleMailtoClick)
      );

      window.removeEventListener("keydown", handleEscClose);
    };
  }, [contactOpen]);

  // Fade in / out animation
  const containerRef = useRef(null);
  const contactRef = useRef(null);

  useGSAP(() => {
    const containerAnimation = gsap.timeline({});
    const contactAnimation = gsap.timeline({});

    if (containerRef.current && contactRef.current) {
      if (contactOpen) {
        containerAnimation.to(containerRef.current, {
          autoAlpha: 1,
          duration: duration - 0.1,
          ease: "power1.inOut",
        });
        contactAnimation.to(contactRef.current, {
          autoAlpha: 1,
          duration: duration,
          ease: "power1.out",
          filter: "blur(0px)",
          color: "#0F1010",
          delay: 0.35,
        });
      } else {
        contactAnimation.to(containerRef.current, {
          autoAlpha: 0,
          duration: duration - 0.1,
          ease: "power1.inOut",
          delay: 0.4,
        });
        containerAnimation.to(contactRef.current, {
          autoAlpha: 0,
          duration: duration - 0.2,
          ease: "power1.in",
          filter: "blur(3px)",
          color: "red",
          delay: 0,
        });
      }
    }
  }, [contactOpen]);

  // Copy email tooltip
  const [copyEmail, setCopyEmail] = useState("vovavindar@gmail.com");

  return (
    <>
      {!contactOpen ? (
        <Scrollbar
          text={"Contact"}
          href="mailto:vovavindar@gmail.com"
          isAnimating={isAnimating}
        />
      ) : (
        <Scrollbar
          text={"Close"}
          isAnimating={isAnimating}
          onClick={() => {
            setContactOpen(false);
            startLenis();
          }}
        />
      )}
      <div className={`${styles["contact-container"]}`} ref={containerRef}>
        <Magnetic
          style={{ height: "min-content", width: "min-content" }}
          movement={0.11}
          passedScale={1.048}
        >
          <button
            ref={contactRef}
            className="text-body-1-uppercase mf-exclusion"
            data-cursor-text="Copy"
            onClick={(e) => {
              e.preventDefault();
              const email = "vovavindar@gmail.com";

              // Copy email to clipboard
              navigator.clipboard.writeText(email);

              setCopyEmail("Copied");

              setTimeout(() => {
                setContactOpen(false);
                startLenis();
                setTimeout(() => {
                  setCopyEmail("vovavindar@gmail.com");
                }, 600);
              }, 400);
            }}
          >
            {copyEmail}
          </button>
        </Magnetic>
      </div>
    </>
  );
}
