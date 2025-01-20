import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "@/components/Home/Hero/Hero.module.css";
import { HERO as getHero } from "@/constants/animations";

gsap.registerPlugin(ScrollTrigger);

export const useHeroScrollAnimations = (containerRef, imgOnload) => {
  const HERO = getHero();

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
        once: HERO.SCROLL.GRID.ONCE,
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
