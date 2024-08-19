import React, { useState, createContext } from "react";
import gsap from "gsap";

const TransitionContext = createContext({});

const TransitionProvider = ({ children }) => {
  const [timelineExit, setTimelineExit] = useState(() =>
    gsap.timeline({ paused: true })
  );

  return (
    <TransitionContext.Provider
      value={{
        timelineExit,
        setTimelineExit,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
