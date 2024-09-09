import React, { useState } from "react";
import styles from "./SocialLinks.module.css";
import MagneticLink from "@/components/MagneticLink";

const SocialLinks = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <div className={`${styles["social-links"]}`}>
      <p
        onMouseEnter={() => handleMouseEnter("linkedin")}
        onMouseLeave={handleMouseLeave}
        className={
          hoveredLink && hoveredLink !== "linkedin" ? `${styles["faded"]}` : ""
        }
      >
        <MagneticLink href={"https://www.linkedin.com/in/vovavindar/"}>
          LinkedIn,
        </MagneticLink>
      </p>
      <p
        onMouseEnter={() => handleMouseEnter("instagram")}
        onMouseLeave={handleMouseLeave}
        className={
          hoveredLink && hoveredLink !== "instagram" ? `${styles["faded"]}` : ""
        }
      >
        <MagneticLink href={"https://www.instagram.com/vovavindar/"}>
          Instagram,
        </MagneticLink>
      </p>
      <p
        onMouseEnter={() => handleMouseEnter("dribbble")}
        onMouseLeave={handleMouseLeave}
        className={
          hoveredLink && hoveredLink !== "dribbble" ? `${styles["faded"]}` : ""
        }
      >
        <MagneticLink href={"https://dribbble.com/VovaVindar"}>
          Dribbble
        </MagneticLink>
      </p>
    </div>
  );
};

export default SocialLinks;
