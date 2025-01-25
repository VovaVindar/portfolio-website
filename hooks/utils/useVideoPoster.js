import { useEffect, useRef } from "react";

export const useVideoPoster = () => {
  const videoRef = useRef(null);
  const posterUrl = useRef("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const generatePoster = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0);
      video.poster = canvas.toDataURL("image/webp");
    };

    video.addEventListener("loadeddata", generatePoster);
    return () => video.removeEventListener("loadeddata", generatePoster);
  }, [posterUrl, videoRef]);

  return { videoRef };
};
