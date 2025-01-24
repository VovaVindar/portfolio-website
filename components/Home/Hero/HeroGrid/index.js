import styles from "../Hero.module.css";
import Magnetic from "@/components/Global/Magnetic";
import { GRID_LAYOUT_DESKTOP, GRID_LAYOUT_MOBILE } from "@/constants/hero-grid";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";

const MediaRenderer = ({ media, currentIndex, handleMediaRef }) => {
  const { width } = useWindowDimensions();

  const getResponsiveUrl = (urls) => {
    if (width < 420) return urls.mobile; // 300px
    if (width < 1520) return urls.desktop; // 400px
    return urls.largeDesktop; // 650px
  };

  const responsiveUrl = getResponsiveUrl(media.src);

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
      <div
        ref={handleMediaRef}
        className={`${styles["cell-video"]} ${media.className}`}
        {...commonProps}
      >
        <video key={responsiveUrl} autoPlay loop muted playsInline>
          <source src={responsiveUrl} type="video/webm; codecs=vp9" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <img
      src={responsiveUrl}
      alt={`${media.alt} (Index: ${currentIndex})`}
      fill="true"
      className={`${styles["cell-image"]} ${media.className}`}
      priority="true"
      ref={handleMediaRef}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...commonProps}
    />
  );
};

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

  const getCellMedia = (row, col) => {
    return gridLayout.media.find(
      (item) => item.row === row && item.col === col
    );
  };

  const handleMouseEnter = (media) => {
    onHover(media.industry);
  };

  const handleMouseLeave = () => {
    onHover("");
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
                  <MediaRenderer
                    media={media}
                    currentIndex={currentIndex}
                    handleMediaRef={handleMediaRef}
                  />
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
