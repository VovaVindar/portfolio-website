import { useSlideshowAnimations } from "@/hooks/animations/interaction/useSlideshowAnimations";
import Magnetic from "@/components/Global/Magnetic";
import { useWindowDimensions } from "@/hooks/utils/useWindowDimensions";

const MediaContent = ({ content, title }) => {
  const { width } = useWindowDimensions();

  // Get appropriate URL based on screen width
  const getResponsiveUrl = (urls) => {
    if (width < 1520) return urls.desktop; // 1260px
    return urls.largeDesktop; // 1880px
  };

  const responsiveUrl = getResponsiveUrl(content.url);
  const { containerRef, displayContent } = useSlideshowAnimations({
    ...content,
    url: responsiveUrl,
  });

  if (!displayContent) return null;

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <Magnetic type="image" scale={1.016} movement={0.035}>
        {displayContent.type === "video" ? (
          <video
            key={displayContent.url}
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className={displayContent.className}
          >
            <source
              src={displayContent.url}
              type={displayContent.mimeType || "video/webm; codecs=vp9"}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={displayContent.url}
            alt={title}
            fill="true"
            style={{ objectFit: "cover" }}
            className={displayContent.className}
          />
        )}
      </Magnetic>
    </div>
  );
};

export default MediaContent;
