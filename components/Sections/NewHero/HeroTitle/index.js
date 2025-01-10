import { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HeroTitle = ({}) => {
  // Parallax effect on scroll
  const heroTitleRef = useRef(null);

  useGSAP(() => {
    let heroTitleParallax;
    let scrollTriggerInstance;

    if (heroTitleRef.current) {
      heroTitleParallax = gsap.fromTo(
        heroTitleRef.current,
        { yPercent: 0 },
        { yPercent: -65, ease: "none" }
      );

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: "body",
        animation: heroTitleParallax,
        scrub: 1,
        start: "top top",
        end: "+=100%",
        markers: true,
      });
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (heroTitleParallax) {
        heroTitleParallax.kill();
      }
    };
  });
  return <h1 ref={heroTitleRef}>Designing for Permanence.</h1>;
};

export default HeroTitle;
