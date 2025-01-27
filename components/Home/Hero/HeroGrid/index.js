import styles from "../Hero.module.css";
import Magnetic from "@/components/Global/Magnetic";
import { GRID_LAYOUT_DESKTOP, GRID_LAYOUT_MOBILE } from "@/constants/hero-grid";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useVideoPoster } from "@/hooks/utils/useVideoPoster";
import { memo, useCallback, useMemo } from "react";

const MediaRenderer = memo(({ media, currentIndex, handleMediaRef }) => {
  const { width } = useWindowDimensions();
  const { videoRef } = useVideoPoster();

  const getResponsiveUrl = useCallback(
    (urls) => {
      if (width < 420) return urls.mobile;
      if (width < 1520) return urls.desktop;
      return urls.largeDesktop;
    },
    [width]
  );

  const getImageDimensions = useCallback(() => {
    if (width < 420) return { width: 105, height: 105 };
    if (width < 1520) return { width: 147, height: 144 };
    return { width: 249, height: 243 };
  }, [width]);

  const responsiveUrl = useMemo(
    () => getResponsiveUrl(media.src),
    [media.src, getResponsiveUrl]
  );

  const dimensions = useMemo(() => getImageDimensions(), [getImageDimensions]);

  const commonProps = {
    style: {
      "--media-brightness": media.brightness,
      "--media-blur": `${media.blur}px`,
      "--media-scale": `${media.scale}`,
      ...media.styles,
    },
  };

  if (media.type === "video") {
    const handleVideoError = (e) => {
      console.error("Video loading error:", e, responsiveUrl);
    };

    return (
      <div
        ref={handleMediaRef}
        className={`${styles["cell-video"]} ${media.className}`}
        {...commonProps}
      >
        <video
          ref={videoRef}
          key={responsiveUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
        >
          <source src={responsiveUrl} type={media.mimeType} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <img
      src={responsiveUrl}
      alt={`${media.alt} (Index: ${currentIndex})`}
      className={`${styles["cell-image"]} ${media.className}`}
      priority="true"
      ref={handleMediaRef}
      width={dimensions.width}
      height={dimensions.height}
      {...commonProps}
    />
  );
});

MediaRenderer.displayName = "MediaRenderer";

const HeroGrid = memo(({ imgOnload, cellOnload, onHover }) => {
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

  const handleMouseEnter = useCallback(
    (media) => {
      onHover(media.industry);
    },
    [onHover]
  );

  const handleMouseLeave = useCallback(() => {
    onHover("");
  }, [onHover]);

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
});

HeroGrid.displayName = "HeroGrid";
export default HeroGrid;

HeroGrid.whyDidYouRender = true;
