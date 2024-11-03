import React, { useState, useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

const Footer = ({ staggerInterval, duration, easing }) => {
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

  const footerOnscroll = useRef([]);

  useGSAP(() => {
    let scrollTriggerInstance;
    const footerAnimation = gsap.timeline({});

    if (footerOnscroll.current.length) {
      footerAnimation.set(footerOnscroll.current, {
        autoAlpha: 0,
        filter: "blur(1.5px)",
        color: "red",
      });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: footerOnscroll.current,
        start: "top bottom",
        onEnter: () => {
          footerAnimation.to(footerOnscroll.current, {
            autoAlpha: 1,
            filter: `blur(0px)`,
            color: "#0F1010",
            delay: 0,
            duration: duration,
            ease: easing,
            stagger: (index) => footerStagger(index, staggerInterval),
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
  }, []);

  const footerStagger = (index, interval) => {
    if (index <= 2) return 0;
    if (index >= 3 && index <= 5) return 1 * interval;
    if (index >= 6 && index <= 8) return 2 * interval;
    if (index >= 9 && index <= 10) return 3 * interval;
    if (index >= 11) return 5 * interval;
  };

  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className={`${styles["footer-container"]} text-body-1`}>
      <div className={`${styles["footer-top"]}`}>
        <div>
          <span
            className="text-header-3"
            ref={(el) => (footerOnscroll.current[0] = el)}
          >
            Pacific Time:
          </span>
          <p>
            <span
              className={styles["time"]}
              ref={(el) => (footerOnscroll.current[3] = el)}
            >
              {time.hours}
              <span>:</span>
              {time.minutes},
            </span>
          </p>
          <p ref={(el) => (footerOnscroll.current[6] = el)}>Vancouver,</p>
          <p ref={(el) => (footerOnscroll.current[9] = el)}>Canada</p>
        </div>
        <div className={`${styles["social-links"]}`}>
          <span
            className="text-header-3"
            ref={(el) => (footerOnscroll.current[1] = el)}
          >
            Social:
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
              >
                Dribbble,
              </Link>
            </Magnetic>
          </p>
        </div>
        <div>
          <span
            className="text-header-3"
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
              <p ref={(el) => (footerOnscroll.current[11] = el)}>2024 ©</p>
            </div>
          </div>
          <div>
            <div className="text-body-3">
              <p ref={(el) => (footerOnscroll.current[12] = el)}>
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
          <p ref={(el) => (footerOnscroll.current[13] = el)}>
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
