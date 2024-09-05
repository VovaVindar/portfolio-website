import Head from "next/head";
import Scrollbar from "@/components/Scrollbar";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/TransitionContext";
import gsap from "gsap";
import { useContext, useRef } from "react";
import Image from "next/image";

export default function Contact() {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 }
      );
      //timeline.add(gsap.to(container.current, { opacity: 0 }));
    },
    { scope: container }
  );

  return (
    <>
      <Head>
        <title>Contact Vova Vindar</title>
      </Head>
      <Scrollbar text={"Home"} href="/" />
      <div ref={container} style={{ height: "200vh" }}>
        <h1>Contact</h1>
        <Image
          src="/marquee.png"
          width={200}
          height={200}
          alt="Picture of the author"
          priority
        />
      </div>
    </>
  );
}
