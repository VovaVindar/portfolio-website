import styles from "../Hero.module.css";
import Magnetic from "@/components/Global/Magnetic";
import { GRID_LAYOUT_DESKTOP, GRID_LAYOUT_MOBILE } from "@/constants/hero-grid";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";

const HeroGrid = ({ imgOnload, cellOnload, onHover }) => {
  const { width } = useWindowDimensions();
  const gridLayout = width > 820 ? GRID_LAYOUT_DESKTOP : GRID_LAYOUT_MOBILE;

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
    return gridLayout.media.find(
      (item) => item.row === row && item.col === col
    );
  };

  // Hover text logic
  const handleMouseEnter = (media) => {
    onHover(media.industry);
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
        ...media.styles,
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
          className={`${styles["cell-video"]} ${media.className}`}
          {...commonProps}
        />
      );
    }

    return (
      <img
        src={media.src}
        alt={`${media.alt} (Index: ${currentIndex})`}
        fill
        className={`${styles["cell-image"]} ${media.className}`}
        priority={true}
        ref={handleMediaRef}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...commonProps}
      />
    );
  };

  return (
    <div className={`${styles["grid"]}`}>
      {gridLayout.rows.map((row) =>
        gridLayout.cols.map((col) => {
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
                  data-cursor-text={media.hoverText}
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
    </div>
  );
};

export default HeroGrid;
