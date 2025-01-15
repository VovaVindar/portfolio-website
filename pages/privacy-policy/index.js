import Head from "next/head";
import { useTransition } from "@/context/TransitionContext";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default Privacy;
function Privacy({}) {
  const { secondaryExit, secondaryEnter } = useTransition();
  const container = useRef(null);

  useGSAP(
    () => {
      secondaryEnter.add(
        gsap.fromTo(
          container.current,
          { opacity: 0 },
          { opacity: 1, duration: 2 }
        )
      );
      secondaryExit.add(
        gsap.to(container.current, { opacity: 0, duration: 1 })
      );
    },
    { scope: container }
  );

  return (
    <>
      <Head>
        <title>Vova Vindar | Privacy Policy</title>
      </Head>
      <div ref={container}>
        <h1>privacy policy</h1>
        <Link href={"/"} scroll={false}>
          go home
        </Link>
      </div>
    </>
  );
}
