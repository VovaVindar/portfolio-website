import { useRef, useEffect, useState } from "react";
import styles from "./SelectedClients.module.css";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Clients from "@/components/Sections/SelectedClients/Clients";
import AnimatedSubheader from "@/components/Sections/SelectedClients/AnimatedSubheader";

gsap.registerPlugin(ScrollTrigger);

const SelectedClients = ({
  staggerInterval = 0.1,
  duration = 1,
  easing = "power2.out",
  startPageAnimation = false,
}) => {
  const clientsOnscroll = useRef([]);
  const timelineRef = useRef(null);
  const [startPageAnimation2, setStartPageAnimation2] = useState(false);

  // Animation configuration
  const animConfig = {
    hidden: {
      autoAlpha: 0,
      filter: "blur(4px)",
      color: "red",
    },
    visible: {
      autoAlpha: 1,
      filter: "blur(0px)",
      color: "#0F1010",
      duration,
      ease: easing,
      stagger: staggerInterval,
    },
  };

  // Handle delayed animation start
  useEffect(() => {
    if (startPageAnimation) {
      const timer = setTimeout(() => {
        setStartPageAnimation2(true);
      }, 3100);

      return () => clearTimeout(timer);
    }
  }, [startPageAnimation]);

  useGSAP(() => {
    let batchInstance;

    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();

    if (clientsOnscroll.current.length) {
      // Set initial state
      timelineRef.current.set(clientsOnscroll.current, animConfig.hidden);

      if (startPageAnimation2) {
        batchInstance = ScrollTrigger.batch(clientsOnscroll.current, {
          onEnter: (batch) => {
            gsap.fromTo(batch, animConfig.hidden, animConfig.visible);
          },
          once: true,
          start: "top 100%",
          end: "bottom+=100px top",
        });
      }
    }

    // Cleanup function
    return () => {
      if (batchInstance) {
        // ScrollTrigger.batch returns an array of triggers
        if (Array.isArray(batchInstance)) {
          batchInstance.forEach((trigger) => trigger.kill());
        } else {
          batchInstance.kill();
        }
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [startPageAnimation2, duration, easing, staggerInterval]);

  return (
    <div className={styles["clients"]}>
      <div className="text-body-1">
        <AnimatedSubheader clientsOnscroll={clientsOnscroll} />
      </div>
      <div>
        <Clients clientsOnscroll={clientsOnscroll} />
      </div>
    </div>
  );
};

export default SelectedClients;
