import React, { useState, useContext, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
gsap.registerPlugin(useGSAP);

export default function TransitionLayout({ children, ...props }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext);
  const { contextSafe } = useGSAP();

  const exit = contextSafe(() => {
    timeline.play().then(() => {
      window.scrollTo(0, 0);
      setDisplayChildren(children);
      timeline.pause().clear();
    });
  });

  useEffect(() => {
    if (children.key !== displayChildren.key) {
      exit();
    }
  }, [children]);

  // Clone the child component and pass all props to it
  const childrenWithProps = React.cloneElement(children, { ...props });

  return <div>{childrenWithProps}</div>;
}
