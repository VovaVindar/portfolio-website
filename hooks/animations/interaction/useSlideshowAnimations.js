import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SLIDESHOW as getSlideshow } from "@/constants/animations";

export const useSlideshowAnimations = (content) => {
  const SLIDESHOW = getSlideshow();

  const containerRef = useRef(null);
  const [displayContent, setDisplayContent] = useState(content);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Only animate if content has changed
    if (displayContent?.url !== content?.url) {
      gsap
        .timeline()
        .to(containerRef.current, {
          autoAlpha: 0,
          duration: SLIDESHOW.EXIT.DURATION,
          scale: SLIDESHOW.EXIT.SCALE,
          ease: SLIDESHOW.EXIT.EASING,
          onComplete: () => {
            setDisplayContent(content);
          },
        })
        .to(containerRef.current, {
          autoAlpha: 1,
          scale: SLIDESHOW.ENTER.SCALE,
          delay: SLIDESHOW.ENTER.DELAY,
          duration: SLIDESHOW.ENTER.DURATION,
          ease: SLIDESHOW.ENTER.EASING,
        });
    }
  }, [content?.url, displayContent?.url]); // Only depend on urls

  return { containerRef, displayContent };
};
