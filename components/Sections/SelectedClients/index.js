import { useRef, useEffect, useState } from "react";
import styles from "./SelectedClients.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
//import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const SelectedClients = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
}) => {
  const clientsOnscroll = useRef([]);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => setStartPageAnimation2(true), 1100);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance;
    const clientsAnimation = gsap.timeline({});

    if (clientsOnscroll.current.length && startPageAnimation2) {
      ScrollTrigger.batch(clientsOnscroll.current, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              autoAlpha: 0,
              filter: "blur(4px)",
              color: "red",
            },
            {
              autoAlpha: 1,
              filter: `blur(0px)`,
              color: "#0F1010",
              duration: duration,
              ease: easing,
              stagger: staggerInterval,
            }
          );
          /*batch.forEach((el) => {
            setTimeout(() => {
              el.classList.add(`${styles["in-view"]}`);
            }, duration * 1000 + 100);
          });*/
        },
        once: false,
        start: "top 100%" /* was 95% */,
        end: "bottom+=100px top",
      });

      clientsAnimation.set(clientsOnscroll.current, {
        autoAlpha: 0,
        filter: "blur(4px)",
        color: "red",
      });
      /*scrollTriggerInstance = ScrollTrigger.create({
        trigger: clientsOnscroll.current,
        start: "top 85%",
        onEnter: () => {
          clientsAnimation.to(clientsOnscroll.current, {
            autoAlpha: startPageAnimation2 ? 1 : 0,
            filter: `blur(${startPageAnimation2 ? 0 : 1.5}px)`,
            color: `${startPageAnimation2 ? "#0F1010" : "red"}`,
            delay: 0,
            duration: duration,
            ease: easing,
            stagger: staggerInterval,
            onComplete: () => {
              clientsOnscroll.current.forEach((el) => {
                el.classList.add(`${styles["in-view"]}`);
              });
            },
          });
        },
        once: true,
      });*/
    }

    return () => {
      //ScrollTrigger.getAll().forEach((st) => st.kill());
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (clientsAnimation) {
        clientsAnimation.kill();
      }
    };
  }, [startPageAnimation2]);

  /*const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };*/

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
          {
            name: "Paradigm",
            services: "Web, Product, Brand, Deck, Dev",
            description: "Description 1",
          },
          { name: "Cognition", services: "Web", description: "Description 2" },
          {
            name: "Rove Card",
            services: "Web, Graphic, App, Deck",
            description: "Description 3",
          },
          {
            name: "Dolce & Gabbana",
            services: "Web, Metaverse",
            description: "Description 4",
          },
          {
            name: "PRJCTR Institute",
            services: "Mentoring",
            description: "Description 5",
          },
          {
            name: "Twitch",
            services: "Game UI, Graphic",
            description: "Description 6",
          },
          {
            name: "Jon-Paul Wheatley",
            services: "Web",
            description: "Description 7",
          },
        ].map((client, index) => (
          <div
            key={client.name}
            ref={(el) => (clientsOnscroll.current[index + 1] = el)}
            data-cursor-text={client.description}
            className={`${styles["client-container"]} mf-exclusion`}
          >
            {/*<Magnetic>*/}
            <div
            //onMouseEnter={() => handleMouseEnter(client.name)}
            //onMouseLeave={handleMouseLeave}
            /*className={`${
                  hoveredLink && hoveredLink !== client.name
                    ? `${styles["faded"]}`
                    : ""
                }`}*/
            >
              <h1>{client.name}</h1>
              <span className="text-header-3">{client.services}</span>
            </div>
            {/*</Magnetic>*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClients;
