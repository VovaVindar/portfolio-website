import { useSlideshowAnimations } from "@/hooks/animations/interaction/useSlideshowAnimations";
import Magnetic from "@/components/Global/Magnetic";

const MediaContent = ({ content, title }) => {
  const { containerRef, displayContent } = useSlideshowAnimations(content);

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
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          >
            <source
              src={displayContent.url}
              type={displayContent.mimeType || "video/mp4"}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={displayContent.url}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </Magnetic>
    </div>
  );
};

export default MediaContent;
