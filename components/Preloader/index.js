import MouseFollower from "@/components/MouseFollower";
import LoadingLines from "@/components/Preloader/LoadingLines";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);

const Preloader = ({ numbersProgress, linesAnimation, className }) => {
  const counterRef = useRef(null);

  useGSAP(() => {
    if (counterRef.current) {
      const timeline = gsap.timeline();

      timeline.fromTo(
        counterRef.current,
        { opacity: 1 },
        {
          opacity: linesAnimation ? 0 : 1,
          duration: 0.4,
          delay: 0.4,
          ease: "power4.out",
        }
      );
    }
  }, [linesAnimation]);

  return (
    <>
      <div
        className={`preloader ${linesAnimation ? "complete" : ""} ${className}`}
      >
        {/*<MouseFollower
          type="text"
          text={followerProgress}
          className={`${className} ${followerProgress >= 100 ? "hidden" : ""}`}
        />*/}
        <div className="text-body-3 counter" ref={counterRef}>
          <p>{numbersProgress}</p>
        </div>
        <LoadingLines linesAnimation={linesAnimation} />
      </div>
    </>
  );
};

export default Preloader;
