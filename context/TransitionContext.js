import React, { useState, useContext, useEffect, createContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

// Create Context
const TransitionContext = createContext({});

// Provider Component
const TransitionProvider = ({ children }) => {
  const [timelineExit, setTimelineExit] = useState(() =>
    gsap.timeline({ paused: true })
  );
  const [isPageChanging, setIsPageChanging] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        timelineExit,
        setTimelineExit,
        isPageChanging,
        setIsPageChanging,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

// Hook
export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

// Layout Component
function TransitionLayout({ children, ...props }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timelineExit, setIsPageChanging } = useContext(TransitionContext);
  const { contextSafe } = useGSAP();

  const exit = contextSafe(() => {
    setIsPageChanging(true);
    timelineExit.play().then(() => {
      setDisplayChildren(children);
      timelineExit.pause().clear();
    });
  });

  useEffect(() => {
    if (children.key !== displayChildren.key) {
      console.log("Children changed, triggering exit");
      exit();
    }
  }, [children]);

  const childrenWithProps = React.cloneElement(children, { ...props });

  return <>{childrenWithProps}</>;
}

export { TransitionContext, TransitionProvider, TransitionLayout };
