import { useSlideshowAnimations } from "@/hooks/animations/interaction/useSlideshowAnimations";
import Magnetic from "@/components/Global/Magnetic";
import { useWindowDimensions } from "@/context/DimensionsContext";
import { useVideoPoster } from "@/hooks/utils/useVideoPoster";
import { useCallback, memo, useMemo } from "react";
import Link from "next/link";

const MediaContent = memo(function MediaContent({ content, title, link }) {
  const { width } = useWindowDimensions();
  const { videoRef } = useVideoPoster();

  // Get appropriate URL based on screen width
  const getResponsiveUrl = useCallback(
    (urls) => {
      if (width < 1520) return urls.desktop; // 1260px
      return urls.largeDesktop; // 1880px
    },
    [width]
  );

  const getImageDimensions = useCallback(() => {
    if (width < 1520) return { width: 630, height: 630 };
    return { width: 936, height: 936 };
  }, [width]);

  const responsiveUrl = useMemo(
    () => getResponsiveUrl(content.url),
    [content.url, getResponsiveUrl]
  );

  const dimensions = useMemo(() => getImageDimensions(), [getImageDimensions]);

  // Memoize the content object
  const slideShowContent = useMemo(
    () => ({
      ...content,
      url: responsiveUrl,
    }),
    [content, responsiveUrl]
  );

  const { containerRef, displayContent } =
    useSlideshowAnimations(slideShowContent);

  if (!displayContent) return null;

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <Link
        href={link}
        target="_blank"
        aria-label={`Visit ${title} project page (opens in new tab)`}
        tabIndex={-1}
      >
        <Magnetic type="image" scale={1.016} movement={0.035}>
          {displayContent.type === "video" ? (
            <video
              ref={videoRef}
              key={displayContent.url}
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className={displayContent.className}
            >
              <source src={displayContent.url} type={displayContent.mimeType} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={displayContent.url}
              alt={title}
              style={{ objectFit: "cover" }}
              className={displayContent.className}
              width={dimensions.width}
              height={dimensions.height}
            />
          )}
        </Magnetic>
      </Link>
    </div>
  );
});

MediaContent.displayName = "MediaContent";
export default MediaContent;

MediaContent.whyDidYouRender = true;
