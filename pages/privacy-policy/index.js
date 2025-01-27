import Head from "next/head";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Privacy.module.css";
import { CONTACT as getContact } from "@/constants/animations";
import Link from "next/link";
import { usePrivacyOnloadAnimations } from "@/hooks/animations/onload/usePrivacyOnloadAnimations";
import { useTransition } from "@/context/TransitionContext";

export default Privacy;
function Privacy({}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const CONTACT = getContact();
  const { secondaryExit, secondaryEnter } = useTransition();

  // Handle enter/exit transitions
  useGSAP(
    () => {
      secondaryEnter.add([
        gsap.set(containerRef.current, {
          backdropFilter: "blur(0px)",
          opacity: 0,
        }),
        gsap.to(containerRef.current, {
          duration: CONTACT.OPEN.CONTAINER.DURATION,
          ease: CONTACT.OPEN.CONTAINER.EASING,
          backdropFilter: "blur(4px)",
          opacity: 1,
        }),
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

  // Onload animations
  const elementRef = usePrivacyOnloadAnimations(
    containerRef,
    contentRef,
    CONTACT
  );

  return (
    <>
      <Head>
        <title>Vova Vindar | Privacy Policy</title>
      </Head>

      <div ref={containerRef} className={styles["privacy-container"]}>
        <div ref={contentRef} className={styles["text"]}>
          <p className="text-body-3" ref={(el) => (elementRef.current[0] = el)}>
            Your privacy is important to me.
            <br />
            <br /> This Privacy Policy document outlines how this website
            collects, uses, and safeguards information.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[1] = el)}
          >
            Information Collection and Use
          </h2>
          <p className="text-body-3" ref={(el) => (elementRef.current[2] = el)}>
            This website is a static site coded using Next.js. It does not
            collect, use, store or process any personal information from its
            visitors. This site does not employ cookies, tracking scripts or any
            other means of collecting user data.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[3] = el)}
          >
            Log Files
          </h2>
          <p className="text-body-3" ref={(el) => (elementRef.current[4] = el)}>
            As with most websites, the hosting and content delivery network
            (CDN) services used by this site, namely Amazon Web Services (AWS)
            S3 and CloudFront, may automatically log certain information about
            visitors, such as IP addresses, browser types, referring/exit pages,
            and operating systems. However, this information is not linked to
            any personally identifiable information and is managed by AWS in
            accordance with their{" "}
            <Link href="https://aws.amazon.com/privacy/" target="_blank">
              privacy policy
            </Link>
            .
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[5] = el)}
          >
            Third-Party Services
          </h2>
          <p className="text-body-3" ref={(el) => (elementRef.current[6] = el)}>
            This website is hosted on the AWS platform. AWS provides the online
            infrastructure that allows this portfolio to be accessible. For more
            insight into how AWS handles data, please refer to the{" "}
            <Link href="https://aws.amazon.com/privacy/" target="_blank">
              AWS Privacy Policy
            </Link>
            .
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[7] = el)}
          >
            External Links and Embedded Content
          </h2>
          <p className="text-body-3" ref={(el) => (elementRef.current[8] = el)}>
            This website may contain links to external sites or embedded content
            (such as GitHub repositories, social media widgets, or project
            demos). These external services may collect data about you. Please
            refer to their respective privacy policies for more information.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[9] = el)}
          >
            Governing Law
          </h2>
          <p
            className="text-body-3"
            ref={(el) => (elementRef.current[10] = el)}
          >
            This Privacy Policy is governed by and construed in accordance with
            the laws of British Columbia, Canada, including the Personal
            Information Protection Act (PIPA). While this website falls under
            BC&apos;s privacy laws, it does not collect, use, or disclose
            personal information in the course of commercial activities.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[11] = el)}
          >
            International Data Transfers
          </h2>
          <p
            className="text-body-3"
            ref={(el) => (elementRef.current[12] = el)}
          >
            While this website is operated from Canada, the AWS services used
            may store basic server logs in different regions. AWS complies with
            international data protection laws and maintains appropriate
            safeguards for cross-border data transfers.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[13] = el)}
          >
            Changes to This Privacy Policy
          </h2>
          <p
            className="text-body-3"
            ref={(el) => (elementRef.current[14] = el)}
          >
            The website owner reserves the right to update or change this
            Privacy Policy at any time. Any changes will be posted on this page.
          </p>

          <h2
            className="text-body-1"
            ref={(el) => (elementRef.current[15] = el)}
          >
            Contact Information
          </h2>
          <p
            className="text-body-3"
            ref={(el) => (elementRef.current[16] = el)}
          >
            If you have any questions about this Privacy Policy, please contact
            me at{" "}
            <span>
              <Link href="mailto:vovavindar@gmail.com">
                vovavindar@gmail.com
              </Link>
            </span>
            . This policy is effective as of January 25, 2025.
          </p>
        </div>
      </div>
    </>
  );
}
