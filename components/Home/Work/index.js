import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";

const Work = ({ startPageAnimation = false }) => {
  const { containerRef, textRef, sectionRef } =
    useWorkScrollAnimations(startPageAnimation);

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} work-global mf-exclusion text-body-1-uppercase`}
        ref={sectionRef}
      >
        <h2 ref={textRef}>Selected Work</h2>
        <div className={styles["el-container"]} ref={containerRef} />
        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
