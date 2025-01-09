import { useRef, useEffect, useState } from "react";
import styles from "./SelectedClients.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
//import Magnetic from "@/components/Magnetic";
import Clients from "@/components/Sections/SelectedClients/Clients";
import AnimatedSubheader from "@/components/Sections/SelectedClients/AnimatedSubheader";

gsap.registerPlugin(ScrollTrigger);

const SelectedClients = ({
  staggerInterval,
  duration,
  easing,
  startPageAnimation,
}) => {
  // Onscroll animations
  const clientsOnscroll = useRef([]);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  useEffect(() => {
    if (startPageAnimation) {
      setTimeout(() => setStartPageAnimation2(true), 3100);
      /* was 1100 */
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let scrollTriggerInstance, pinInstance;
    const clientsAnimation = gsap.timeline({});

    if (clientsOnscroll.current.length) {
      clientsAnimation.set(clientsOnscroll.current, {
        autoAlpha: 0,
        filter: "blur(4px)",
        color: "red",
      });

      if (startPageAnimation2) {
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
          once: true,
          start: "top 100%" /* was 95% */,
          end: "bottom+=100px top",
        });
      }

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
      if (pinInstance) {
        pinInstance.kill();
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
        <AnimatedSubheader clientsOnscroll={clientsOnscroll} />
      </div>
      <div>
        <Clients clientsOnscroll={clientsOnscroll} />
      </div>
    </div>
  );
};

export default SelectedClients;
