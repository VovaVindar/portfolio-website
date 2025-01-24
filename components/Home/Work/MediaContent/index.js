import { useSlideshowAnimations } from "@/hooks/animations/interaction/useSlideshowAnimations";
import { useResponsiveMedia } from "@/hooks/utils/useResponsiveMedia";
import Magnetic from "@/components/Global/Magnetic";

const MediaContent = ({ content, title }) => {
  const responsiveUrl = useResponsiveMedia(content.url);
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
            key={responsiveUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className={displayContent.className}
          >
            <source
              src={responsiveUrl}
              type={displayContent.mimeType || "video/webm; codecs=vp9"}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={responsiveUrl}
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
