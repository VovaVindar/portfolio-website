import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HeroTitle = ({ style, isAnimating = true }) => {
  const heroTitleRef = useRef(null);
  const scrollRef = useRef({ scrollTrigger: null, parallax: null });
  const onloadRef = useRef(null);
  const [loadCompleted, setLoadCompleted] = useState(false);

  // Create animation setup function
  const setupAnimation = useCallback(() => {
    // Kill previous instances if they exist
    if (scrollRef.current.scrollTrigger) {
      scrollRef.current.scrollTrigger.kill();
    }
    if (scrollRef.current.parallax) {
      scrollRef.current.parallax.kill();
    }
    if (onloadRef.current) {
      onloadRef.current.kill();
    }

    // Create new animation
    if (heroTitleRef.current && loadCompleted) {
      scrollRef.current.parallax = gsap.fromTo(
        heroTitleRef.current,
        { yPercent: 0 },
        { yPercent: -65, ease: "none" }
      );

      scrollRef.current.scrollTrigger = ScrollTrigger.create({
        trigger: "body",
        animation: scrollRef.current.parallax,
        scrub: 1,
        start: "top top",
        end: "+=100%",
      });
    }
  }, [loadCompleted]);

  useEffect(() => {
    if (heroTitleRef.current) {
      onloadRef.current = gsap.fromTo(
        heroTitleRef.current,
        { yPercent: -600 },
        {
          yPercent: !isAnimating ? 0 : -600,
          ease: "power2.out",
          duration: 2.3,
          delay: 0,
          onComplete: () => {
            setTimeout(() => {
              setLoadCompleted(true);
            }, 300);
          },
        }
      );
    }
  }, [isAnimating]);

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
      if (scrollRef.current.scrollTrigger) {
        scrollRef.current.scrollTrigger.kill();
      }
      if (scrollRef.current.parallax) {
        scrollRef.current.parallax.kill();
      }
      if (onloadRef.current) {
        onloadRef.current.kill();
      }
    };
  }, [loadCompleted]);

  return (
    <h1 style={style} ref={heroTitleRef}>
      Designing for Permanence.
    </h1>
  );
};

export default HeroTitle;
