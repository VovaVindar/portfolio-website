import styles from "./Work.module.css";
import { useWorkScrollAnimations } from "@/hooks/animations/scroll/useWorkScrollAnimations";

const Work = () => {
  const { containerRef, textRef, sectionRef } = useWorkScrollAnimations();

  return (
    <div className={styles["work-container"]}>
      <div
        className={`${styles["work"]} mf-exclusion text-body-1-uppercase`}
        ref={sectionRef}
      >
        <h2 className="text-header-2" ref={textRef}>
          Selected Work
        </h2>
        <div className={styles["el-container"]} ref={containerRef} />
        <div className="text-body-1 left-layout" />
        <div className="text-header-1 right-layout" />
      </div>
    </div>
  );
};

export default Work;
