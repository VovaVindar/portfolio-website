import Image from "next/image";
import { useSlideshowAnimations } from "@/hooks/animations/interaction/useSlideshowAnimations";

const MediaContent = ({ content, title }) => {
  const { containerRef, displayContent } = useSlideshowAnimations(content);

  if (!displayContent) return null;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
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
        <Image
          src={displayContent.url}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default MediaContent;
