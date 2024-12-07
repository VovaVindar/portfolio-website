import React, { useRef, useState } from "react";
import styles from "./SoundButton.module.css";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SoundButton = ({ speedCoef, isStopRunning, easing, duration }) => {
  // Effect to toggle the visibility of the STOP button
  const lastState = useRef(null); // Track the last state of the animation

  useGSAP(() => {
    const soundAnimation = gsap.timeline({ defaults: { overwrite: true } });

    // Determine the new state based on speedCoef
    const newState = speedCoef >= 50 ? "fadeIn" : "fadeOut";

    // Only run the animation if the state has changed
    if (lastState.current !== newState) {
      lastState.current = newState; // Update the tracked state

      if (newState === "fadeOut") {
        soundAnimation.to(soundButtonRef.current, {
          autoAlpha: 0,
          duration: 1.2,
          ease: "power4.out",
          filter: `blur(2px)`,
        });
      } else {
        soundAnimation.to(soundButtonRef.current, {
          autoAlpha: 1,
          duration: duration,
          ease: easing,
          filter: `blur(0px)`,
        });
      }
    }

    return () => {
      if (soundAnimation) {
        soundAnimation.kill();
      }
    };
  }, [speedCoef, lastState]);

  /* Sound controls */
  const soundButtonRef = useRef(null);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const fadeAudio = (audio, targetVolume, duration, onComplete) => {
    const step = 0.005; // Volume adjustment step
    const interval = duration / (targetVolume / step);
    const fadeInterval = setInterval(() => {
      if (
        (targetVolume > audio.volume && audio.volume + step >= targetVolume) ||
        (targetVolume < audio.volume && audio.volume - step <= targetVolume)
      ) {
        audio.volume = targetVolume; // Set to target volume to avoid overshooting
        clearInterval(fadeInterval);
        if (onComplete) onComplete();
      } else {
        audio.volume += targetVolume > audio.volume ? step : -step;
      }
    }, interval);
  };

  const handleClick = () => {
    const audio = audioRef.current;

    if (!playing) {
      audio.currentTime = 44;
      audio.volume = 0; // Start with volume at 0
      fadeAudio(audio, 1.0, 1000); // Fade in to full volume over 1 second
      audio.play();
    } else {
      fadeAudio(audio, 0, 1000, () => {
        audio.pause(); // Pause audio after fade-out
      });
    }

    setPlaying((prev) => !prev);
  };

  return (
    <button
      className={`${styles["sound"]}`}
      disabled={isStopRunning} // Disable FORWARD if STOP is running
      ref={soundButtonRef}
      onClick={handleClick}
    >
      <audio
        ref={audioRef}
        src="/sound/interstellar.webm"
        type="audio/webm"
        codec="opus"
        preload="metadata"
        loop
      />
      <Magnetic movement={0.108} passedScale={1.192}>
        <Image
          src={playing ? "/icons/volume--off.png" : "/icons/volume--on.png"}
          alt="Play sound"
          width={20}
          height={20}
        />
      </Magnetic>
    </button>
  );
};

export default SoundButton;
