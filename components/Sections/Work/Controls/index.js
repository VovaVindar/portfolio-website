import React, { useState, useRef, forwardRef } from "react";
import styles from "./Controls.module.css";
import Circle from "@/components/Sections/Work/Controls/Circle";
import SpeedIndicator from "@/components/Sections/Work/Controls/SpeedIndicator";
import StopButton from "@/components/Sections/Work/Controls/StopButton";
import ForwardButton from "@/components/Sections/Work/Controls/ForwardButton";

const Controls = forwardRef(
  ({ speedCoef = 1, setSpeedCoef, duration, easing }, ref) => {
    const [isStopRunning, setIsStopRunning] = useState(false);
    const [fakeSpeedCoef, setFakeSpeedCoef] = useState(0);

    return (
      <div className={`${styles["controls-container"]} text-body-2`} ref={ref}>
        <StopButton
          speedCoef={speedCoef}
          isStopRunning={isStopRunning}
          duration={duration}
          easing={easing}
          setSpeedCoef={setSpeedCoef}
          setIsStopRunning={setIsStopRunning}
          setFakeSpeedCoef={setFakeSpeedCoef}
        />
        <SpeedIndicator
          speedCoef={speedCoef}
          isStopRunning={isStopRunning}
          fakeSpeedCoef={fakeSpeedCoef}
        />
        <ForwardButton
          setSpeedCoef={setSpeedCoef}
          isStopRunning={isStopRunning}
          setFakeSpeedCoef={setFakeSpeedCoef}
        >
          <Circle
            speedCoef={speedCoef}
            setSpeedCoef={setSpeedCoef}
            isStopRunning={isStopRunning}
            setFakeSpeedCoef={setFakeSpeedCoef}
          />
        </ForwardButton>
      </div>
    );
  }
);

export default Controls;
