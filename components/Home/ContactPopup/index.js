import { useEffect, useState } from "react";
import styles from "./ContactPopup.module.css";
import Magnetic from "@/components/Global/Magnetic";
import { useContactTransition } from "@/hooks/animations/transition/useContactTransitions";
import { startLenis, stopLenis } from "@/components/Global/SmoothScrolling";
import { useContact } from "@/context/ScrollbarContext";

export default function ContactPopup({ className }) {
  const { contactOpen, setContactOpen } = useContact();
  const { containerRef, contentRef } = useContactTransition(contactOpen);
  const [copyEmail, setCopyEmail] = useState("vovavindar@gmail.com");
  const [copyStatus, setCopyStatus] = useState(""); // For screen reader announcements

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
        startLenis();
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
  }, [contactOpen, setContactOpen]);

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    const email = "vovavindar@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setCopyEmail("Copied");
      setCopyStatus("Email copied to clipboard");

      setTimeout(() => {
        setContactOpen(false);
        startLenis();
        setTimeout(() => {
          setCopyEmail("vovavindar@gmail.com");
          setCopyStatus("");
        }, 680);
      }, 400);
    } catch (err) {
      console.error("Failed to copy email:", err);
      setCopyStatus("Failed to copy email");
    }
  };

  return (
    <div
      className={`${styles["contact-container"]} ${className}`}
      ref={containerRef}
      role="dialog"
      aria-label="Copy email address"
      aria-modal="true"
    >
      {/* Status message for screen readers */}
      <div role="status" className="sr-only" aria-live="polite">
        {copyStatus}
      </div>

      <Magnetic
        style={{ height: "min-content", width: "min-content" }}
        type="text"
      >
        <button
          ref={contentRef}
          className="text-body-3-uppercase mf-exclusion"
          data-cursor-text="Copy"
          onClick={handleCopyEmail}
          aria-label="Copy email address to clipboard"
        >
          {copyEmail}
        </button>
      </Magnetic>
    </div>
  );
}

ContactPopup.whyDidYouRender = true;
