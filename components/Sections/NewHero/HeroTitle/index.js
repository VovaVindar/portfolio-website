import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HeroTitle = ({ style, isAnimating = true, duration, ease }) => {
  const heroTitleRef = useRef(null);
  const scrollRef = useRef({ scrollTrigger: null, parallax: null });
  const onloadRef = useRef(null);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const cleanupAnimations = () => {
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

  // Create animation setup function
  const setupAnimation = useCallback(() => {
    try {
      cleanupAnimations();

      // Scroll animation
      if (heroTitleRef.current && loadCompleted) {
        scrollRef.current.parallax = gsap.fromTo(
          heroTitleRef.current,
          { yPercent: 0 },
          { yPercent: -80, ease: "none" }
        );

        scrollRef.current.scrollTrigger = ScrollTrigger.create({
          trigger: "body",
          animation: scrollRef.current.parallax,
          scrub: 1,
          start: "top top",
          end: "+=100%",
          invalidateOnRefresh: true,
        });
      }
    } catch (error) {
      console.error("Failed to setup animation:", error);
    }
  }, [loadCompleted]);

  useEffect(() => {
    let timeoutId;

    if (heroTitleRef.current) {
      const containerHeight = heroTitleRef.current.parentElement.offsetHeight;

      onloadRef.current = gsap.fromTo(
        heroTitleRef.current,
        { yPercent: -(containerHeight / 1.5) },
        {
          yPercent: !isAnimating ? 0 : -(containerHeight / 1.5),
          ease: ease,
          duration: duration - 0.14,
          delay: 0,
          onComplete: () => {
            timeoutId = setTimeout(() => {
              setLoadCompleted(true);
            }, 300);
          },
        }
      );
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnimating]);

  useGSAP(() => {
    // Initial setup
    setupAnimation();

    // Cleanup function
    return () => {
      cleanupAnimations();
    };
  }, [loadCompleted]);

  return (
    <h1 style={style} ref={heroTitleRef}>
      Designing for Permanence.
    </h1>
  );
};

export default HeroTitle;
