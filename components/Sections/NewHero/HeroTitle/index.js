import { useRef, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HeroTitle = () => {
  const heroTitleRef = useRef(null);
  const animationRef = useRef({ scrollTrigger: null, parallax: null });

  // Create animation setup function
  const setupAnimation = useCallback(() => {
    // Kill previous instances if they exist
    if (animationRef.current.scrollTrigger) {
      animationRef.current.scrollTrigger.kill();
    }
    if (animationRef.current.parallax) {
      animationRef.current.parallax.kill();
    }

    // Create new animation
    if (heroTitleRef.current) {
      animationRef.current.parallax = gsap.fromTo(
        heroTitleRef.current,
        { yPercent: 0 },
        { yPercent: -65, ease: "none" }
      );

      animationRef.current.scrollTrigger = ScrollTrigger.create({
        trigger: "body",
        animation: animationRef.current.parallax,
        scrub: 1,
        start: "top top",
        end: "+=100%",
      });
    }
  }, []);

  useGSAP(() => {
    // Initial setup
    setupAnimation();

    // Add resize handler
    const handleResize = gsap.delayedCall(0.1, setupAnimation).pause();

    const resizeObserver = new ResizeObserver(() => {
      // Reset the delayed call
      handleResize.restart(true);
    });

    // Observe the window/document size changes
    resizeObserver.observe(document.documentElement);

    // Cleanup function
    return () => {
      handleResize.kill();
      resizeObserver.disconnect();
      if (animationRef.current.scrollTrigger) {
        animationRef.current.scrollTrigger.kill();
      }
      if (animationRef.current.parallax) {
        animationRef.current.parallax.kill();
      }
    };
  }, []); // Empty dependency array since setupAnimation is memoized

  return <h1 ref={heroTitleRef}>Designing for Permanence.</h1>;
};

export default HeroTitle;
