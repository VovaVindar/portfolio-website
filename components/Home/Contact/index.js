import { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import Scrollbar from "@/components/Global/Scrollbar";
import Magnetic from "@/components/Global/Magnetic";
import { useContactTransition } from "@/hooks/animations/transition/useContactTransitions";
import { startLenis, stopLenis } from "@/components/Global/SmoothScrolling";

export default function Contact() {
  const [contactOpen, setContactOpen] = useState(false);
  const { containerRef, contentRef } = useContactTransition(contactOpen);
  const [copyEmail, setCopyEmail] = useState("vovavindar@gmail.com");

  useEffect(() => {
    const handleMailtoClick = (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href.startsWith("mailto:")) return;

      let timeout;

      const handleBlur = () => {
        clearTimeout(timeout);
        window.removeEventListener("blur", handleBlur);
      };

      window.addEventListener("blur", handleBlur);

      timeout = setTimeout(() => {
        setContactOpen(true);
        stopLenis();
        window.removeEventListener("blur", handleBlur);
      }, 250);
    };

    const mailtoLinks = document.querySelectorAll('a[href^="mailto"]');
    mailtoLinks.forEach((link) =>
      link.addEventListener("click", handleMailtoClick)
    );

    const handleEscClose = (event) => {
      if (event.key === "Escape" && contactOpen) {
        setContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      mailtoLinks.forEach((link) =>
        link.removeEventListener("click", handleMailtoClick)
      );
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [contactOpen]);

  return (
    <>
      {!contactOpen ? (
        <Scrollbar text={"Contact"} href="mailto:vovavindar@gmail.com" />
      ) : (
        <Scrollbar
          text={"Close"}
          onClick={() => {
            setContactOpen(false);
            startLenis();
          }}
        />
      )}
      <div className={styles["contact-container"]} ref={containerRef}>
        <Magnetic
          style={{ height: "min-content", width: "min-content" }}
          type="text"
        >
          <button
            ref={contentRef}
            className="text-body-3-uppercase mf-exclusion"
            data-cursor-text="Copy"
            onClick={(e) => {
              e.preventDefault();
              const email = "vovavindar@gmail.com";
              navigator.clipboard.writeText(email);
              setCopyEmail("Copied");

              setTimeout(() => {
                setContactOpen(false);
                startLenis();
                setTimeout(() => {
                  setCopyEmail("vovavindar@gmail.com");
                }, 680);
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
