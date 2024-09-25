import { useRef, useEffect } from "react";
import styles from "./SelectedClients.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SelectedClients = ({ staggerInterval, duration, easing }) => {
  const clientsOnscroll = useRef([]);

  useEffect(() => {
    clientsOnscroll.current = clientsOnscroll.current.slice(
      0,
      document.querySelectorAll("[data-gsap]").length
    );
  }, []);

  useGSAP(() => {
    if (clientsOnscroll.current.length) {
      gsap.set(clientsOnscroll.current, {
        autoAlpha: 0,
        filter: "blur(1.5px)",
        color: "red",
      });
      ScrollTrigger.create({
        trigger: clientsOnscroll.current,
        start: "top bottom", // Adjust the start position as needed
        onEnter: () => {
          console.log("enter clients");
          gsap.to(clientsOnscroll.current, {
            autoAlpha: 1,
            filter: `blur(0px)`,
            color: "#0F1010",
            delay: 0,
            duration: duration,
            ease: easing,
            stagger: staggerInterval,
          });
        },
        once: true,
      });
    }
  }, []);

  return (
    <div className={`${styles["clients"]}`}>
      <div className={`text-body-1`}>
        <div className={`text-body-2`}>
          <p ref={(el) => (clientsOnscroll.current[0] = el)}>
            Selected Clients:
          </p>
        </div>
      </div>
      <div>
        <div
          className={`${styles["client-container"]}`}
          ref={(el) => (clientsOnscroll.current[1] = el)}
        >
          <h1>Paradigm</h1>
          <span className="text-header-3">Web, Product, Brand, Deck, Dev</span>
        </div>
        <div
          className={`${styles["client-container"]}`}
          ref={(el) => (clientsOnscroll.current[2] = el)}
        >
          <h1>Cognition</h1>
          <span className="text-header-3">Web</span>
        </div>
        <div
          className={`${styles["client-container"]} ${styles["rove"]}`}
          ref={(el) => (clientsOnscroll.current[3] = el)}
        >
          <h1>Rove Card</h1>
          <span className="text-header-3">Web, Graphic, App, Deck</span>
        </div>
        <div
          className={`${styles["client-container"]}`}
          ref={(el) => (clientsOnscroll.current[4] = el)}
        >
          <h1>Dolce & Gabbana</h1>
          <span className="text-header-3">Web, Metaverse</span>
        </div>
        <div
          className={`${styles["client-container"]}`}
          ref={(el) => (clientsOnscroll.current[5] = el)}
        >
          <h1>PRJCTR Institute</h1>
          <span className="text-header-3">Mentoring</span>
        </div>
        <div
          className={`${styles["client-container"]}`}
          ref={(el) => (clientsOnscroll.current[6] = el)}
        >
          <h1>Twitch</h1>
          <span className="text-header-3">Game UI, Graphic</span>
        </div>
        <div
          className={`${styles["client-container"]} ${styles["jpw"]}`}
          ref={(el) => (clientsOnscroll.current[7] = el)}
        >
          <h1>Jon-Paul Wheatley</h1>
          <span className="text-header-3">Web</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedClients;
