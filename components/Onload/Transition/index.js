import React, { useState, useContext, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
gsap.registerPlugin(useGSAP);
import Lines from "@/components/Onload/Lines";

export default function TransitionLayout({ children, ...props }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timelineExit } = useContext(TransitionContext);
  const { contextSafe } = useGSAP();

  const exit = contextSafe(() => {
    timelineExit.play().then(() => {
      setDisplayChildren(children);
      timelineExit.pause().clear();
    });
  });

  useEffect(() => {
    if (children.key !== displayChildren.key) {
      exit();
    }
  }, [children]);

  // Clone the child component and pass all props to it
  const childrenWithProps = React.cloneElement(children, { ...props });

  return (
    <>
      <Lines />
      {childrenWithProps}
    </>
  );
}
