import { supportsHEVCAlpha } from "@/hooks/core/useSupportsHEVC";
import { SITE_IMAGES, SITE_VIDEOS } from "@/constants/media";

// Separate function for filtering videos
function filterVideoSources(videos) {
  // This function can be called outside of React hooks
  if (typeof window === "undefined") {
    return videos;
  }

  const isHEVC = supportsHEVCAlpha();

  return videos.filter((videoPath) => {
    // If HEVC is supported, keep HEVC .mp4 files
    if (isHEVC && videoPath.includes("/mp4/") && videoPath.endsWith(".mp4")) {
      return true;
    }

    // If not HEVC, keep WebM files
    if (
      !isHEVC &&
      videoPath.includes("/webm/") &&
      videoPath.endsWith(".webm")
    ) {
      return true;
    }

    return false;
  });
}

// Export the filter function separately for use in non-hook contexts
export function getMediaForScreenSize(width) {
  const images = SITE_IMAGES;
  const videos = filterVideoSources(SITE_VIDEOS);

  const filterBySize = (media, sizes) => {
    return media.filter((path) =>
      sizes.some((size) => path.includes(`/${size}/`))
    );
  };

  if (width < 420) {
    return [
      ...filterBySize(images, ["300", "1260"]),
      ...filterBySize(videos, ["300", "1260"]),
    ];
  } else if (width < 1520) {
    return [
      ...filterBySize(images, ["400", "1260"]),
      ...filterBySize(videos, ["400", "1260"]),
    ];
  } else {
    return [
      ...filterBySize(images, ["650", "1880"]),
      ...filterBySize(videos, ["650", "1880"]),
    ];
  }
}
