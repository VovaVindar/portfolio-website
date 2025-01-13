import styles from "./NextProject.module.css";
import Image from "next/image";
import Magnetic from "@/components/Global/Magnetic";

const NextProject = ({}) => {
  return (
    <div className={`${styles["next-project-container"]}`}>
      <div className={`${styles["el"]}`}>
        <Magnetic>
          <Image src="/marquee.png" alt="Picture of the author" fill />
        </Magnetic>
      </div>
    </div>
  );
};

export default NextProject;
