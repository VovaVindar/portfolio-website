import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const [time, setTime] = useState({ hours: "", minutes: "" });

  useEffect(() => {
    const updateTime = () => {
      const vancouverTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Vancouver",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const [hours, minutes] = vancouverTime.split(":");
      setTime({ hours, minutes });
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 60000); // Update time every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className={`${styles["footer-container"]} text-body-1`}>
      <div className={`${styles["footer-top"]}`}>
        <div>
          <span className="text-header-3">Pacific Time:</span>
          <p>
            <span className={styles["time"]}>
              {time.hours}
              <span>:</span>
              {time.minutes},
            </span>
          </p>
          <p>Vancouver,</p>
          <p>Canada</p>
        </div>
        <div>
          <span className="text-header-3">Social:</span>
          <p>
            <Link href="https://www.linkedin.com/in/vovavindar/">
              LinkedIn,
            </Link>
          </p>
          <p>
            <Link href="https://www.instagram.com/vovavindar/">Instagram,</Link>
          </p>
          <p>
            <Link href="https://dribbble.com/VovaVindar">Dribbble</Link>
          </p>
        </div>
        <div>
          <span className="text-header-3">Colophon:</span>
          <p>Fonts by Type.Weltkern</p>
          <p>and Monotype.</p>
        </div>
      </div>
      <div className={`${styles["footer-bottom"]}`}>
        <div>
          <div className="text-body-3">
            <p>2024 ©</p>
          </div>
        </div>
        <div className="text-body-3">
          <p>
            <span>
              Privacy <span>Policy</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
