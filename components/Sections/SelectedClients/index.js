import { useRef, useEffect } from "react";
import styles from "./SelectedClients.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SelectedClients = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
}) => {
  const clientsOnscroll = useRef([]);

  useGSAP(() => {
    if (clientsOnscroll.current.length) {
      ScrollTrigger.batch(clientsOnscroll.current, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              autoAlpha: 0,
              filter: "blur(1.5px)",
              color: "red",
            },
            {
              autoAlpha: startPageAnimation ? 1 : 0,
              filter: `blur(${startPageAnimation ? 0 : 1.5}px)`,
              color: `${startPageAnimation ? "#0F1010" : "red"}`,
              duration: duration,
              ease: easing,
              stagger: staggerInterval,
            }
          );
        },
        once: true,
        start: "top bottom",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [startPageAnimation]);

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
        {[
          { name: "Paradigm", services: "Web, Product, Brand, Deck, Dev" },
          { name: "Cognition", services: "Web" },
          { name: "Rove Card", services: "Web, Graphic, App, Deck" },
          { name: "Dolce & Gabbana", services: "Web, Metaverse" },
          { name: "PRJCTR Institute", services: "Mentoring" },
          { name: "Twitch", services: "Game UI, Graphic" },
          { name: "Jon-Paul Wheatley", services: "Web" },
        ].map((client, index) => (
          <div
            key={client.name}
            className={`${styles["client-container"]}`}
            ref={(el) => (clientsOnscroll.current[index + 1] = el)}
          >
            <h1>{client.name}</h1>
            <span className="text-header-3">{client.services}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClients;
