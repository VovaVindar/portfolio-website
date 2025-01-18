import styles from "../Hero.module.css";
import Image from "next/image";
import Magnetic from "@/components/Global/Magnetic";
import { GRID_LAYOUT } from "@/constants/hero-grid";

const HeroGrid = ({ imgOnload, cellOnload, onHover }) => {
  let refIndex = 0;
  let displayIndex = 0;

  const handleMediaRef = (el) => {
    if (!el || !imgOnload?.current) return;
    imgOnload.current[refIndex] = el;
    refIndex++;
  };

  const handleCellRef = (el, index) => {
    if (!el || !cellOnload?.current) return;
    cellOnload.current[index] = el;
  };

  // Function to check if a cell has media content
  const getCellMedia = (row, col) => {
    return GRID_LAYOUT.media.find(
      (item) => item.row === row && item.col === col
    );
  };

  // Hover text logic
  const handleMouseEnter = (media) => {
    onHover(media.hoverText);
  };

  const handleMouseLeave = () => {
    onHover("");
  };

  // Render media based on type
  const renderMedia = (media, currentIndex) => {
    const commonProps = {
      style: {
        "--media-brightness": media.brightness,
        "--media-blur": `${media.blur}px`,
        "--media-scale": `${media.scale}`,
      },
    };

    if (media.type === "video") {
      return (
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          ref={handleMediaRef}
          className={`${styles["cell-video"]}`}
          {...commonProps}
        />
      );
    }

    return (
      <Image
        src={media.src}
        alt={`${media.alt} (Index: ${currentIndex})`}
        fill
        className={`${styles["cell-image"]}`}
        priority={true}
        ref={handleMediaRef}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...commonProps}
      />
    );
  };

  return (
    <>
      {GRID_LAYOUT.rows.map((row) =>
        GRID_LAYOUT.cols.map((col) => {
          const media = getCellMedia(row, col);
          let currentIndex = displayIndex;
          if (media) displayIndex++;

          return (
            <div
              key={`${row}-${col}`}
              className={`${styles["grid-cell"]}`}
              ref={media ? (el) => handleCellRef(el, currentIndex) : undefined}
            >
              {media && (
                <Magnetic
                  type="image"
                  data-cursor-text={"Open Project"}
                  onMouseEnter={() => media && handleMouseEnter(media)}
                  onMouseLeave={handleMouseLeave}
                  className={"mf-exclusion"}
                >
                  {renderMedia(media, currentIndex)}
                </Magnetic>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default HeroGrid;
