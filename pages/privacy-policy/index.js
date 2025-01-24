import Head from "next/head";
import { useTransition } from "@/context/TransitionContext";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import styles from "./Privacy.module.css";
import { CONTACT as getContact } from "@/constants/animations";

export default Privacy;
function Privacy({}) {
  const CONTACT = getContact();

  const { secondaryExit, secondaryEnter } = useTransition();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      secondaryEnter.add([
        // Opening animation
        gsap.fromTo(
          containerRef.current,
          { backdropFilter: "blur(0px)", opacity: 0 },
          {
            duration: CONTACT.OPEN.CONTAINER.DURATION,
            ease: CONTACT.OPEN.CONTAINER.EASING,
            backdropFilter: "blur(4px)",
            opacity: 1,
          }
        ),
        gsap.fromTo(
          contentRef.current,
          {
            filter: "blur(0px)",
            autoAlpha: 0,
            color: CONTACT.STYLES.COLOR.INACTIVE,
          },
          {
            autoAlpha: 1,
            duration: CONTACT.OPEN.CONTENT.DURATION,
            ease: CONTACT.OPEN.CONTENT.EASING,
            filter: `blur(${CONTACT.STYLES.BLUR.ACTIVE})`,
            color: CONTACT.STYLES.COLOR.ACTIVE,
            delay: CONTACT.OPEN.CONTENT.DELAY,
          }
        ),
      ]);
      secondaryExit.add([
        // Closing animation
        gsap.to(containerRef.current, {
          duration: CONTACT.CLOSE.CONTAINER.DURATION,
          ease: CONTACT.CLOSE.CONTAINER.EASING,
          delay: CONTACT.CLOSE.CONTAINER.DELAY,
          backdropFilter: "blur(0px)",
          opacity: 0,
        }),
        gsap.to(contentRef.current, {
          autoAlpha: 0,
          duration: CONTACT.CLOSE.CONTENT.DURATION,
          ease: CONTACT.CLOSE.CONTENT.EASING,
          filter: `blur(${CONTACT.STYLES.BLUR.INACTIVE})`,
          color: CONTACT.STYLES.COLOR.INACTIVE,
        }),
      ]);
    },
    { scope: containerRef }
  );

  return (
    <>
      <Head>
        <title>Vova Vindar | Privacy Policy</title>
      </Head>
      <div ref={containerRef} className={styles["privacy-container"]}>
        <div ref={contentRef}>
          <h1>privacy policy</h1>
          <Link href={"/"} scroll={false}>
            go home
          </Link>
        </div>
      </div>
    </>
  );
}
