import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "@/components/Home/Hero/Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export const useHeroScrollAnimations = (containerRef, imgOnload) => {
  const scrollTriggerRef = useRef(null);

  useGSAP(() => {
    if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

    if (containerRef.current && imgOnload.current?.length) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom+=50px top",
        end: "max",
        onEnter: () => {
          containerRef.current.classList.add(`${styles["scroll"]}`);
          [...imgOnload.current].forEach((img) => {
            img.classList.remove(styles["in-view"]);
          });
        },
        onLeaveBack: () => {
          [...imgOnload.current].forEach((img) => {
            img.classList.add(styles["in-view"]);
          });
        },
        once: false,
      });

      ScrollTrigger.refresh();
    }

    return () => {
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
    };
  }, []);

  return scrollTriggerRef;
};
