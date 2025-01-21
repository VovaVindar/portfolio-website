import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useSlideshowAnimations = (content) => {
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
          duration: 0.5,
          ease: "power1.in",
          onComplete: () => {
            setDisplayContent(content);
          },
        })
        .to(containerRef.current, {
          autoAlpha: 1,
          delay: -0.025,
          duration: 4,
          ease: "power2.out",
        });
    }
  }, [content, displayContent]);

  return { containerRef, displayContent };
};
