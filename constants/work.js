import styles from "@/components/Home/Work/Work.module.css";
import { supportsHEVCAlpha } from "@/hooks/core/useSupportsHEVC";

const isHEVC = supportsHEVCAlpha();

const getResponsivePaths = (filename, type) => {
  let format;
  if (type !== "image") {
    format = isHEVC ? "mp4" : "webm";
  } else {
    format = "avif";
  }
  const basePath = "/images/optimized";
  return {
    desktop: `${basePath}/1260/${format}/${filename}.${format}`,
    largeDesktop: `${basePath}/1880/${format}/${filename}.${format}`,
  };
};

export const work = [
  {
    title: "Paradigm",
    year: "2024",
    link: "https://www.cosmos.so/vovavindar/paradigm",
    media: {
      type: "video",
      url: getResponsivePaths("paradigm_cube", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hvc1" : "video/webm; codecs=vp9",
      className: `${styles["paradigm"]}`,
    },
  },
  {
    title: "Aya Muse",
    year: "2025",
    link: "https://www.cosmos.so/vovavindar/aya-muse",
    media: {
      type: "image",
      url: getResponsivePaths("am_1", "image"),
    },
  },
  {
    title: "Dolce & Gabbana",
    year: "2023",
    link: "https://www.cosmos.so/vovavindar/dolce-gabbana",
    media: {
      type: "video",
      url: getResponsivePaths("dg_animation", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hvc1" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Endex",
    year: "2024",
    link: "https://www.cosmos.so/vovavindar/endex",
    media: {
      type: "video",
      url: getResponsivePaths("endex_light", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hvc1" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Rove Miles",
    year: "2023",
    link: "https://www.cosmos.so/vovavindar/rove-miles",
    media: {
      type: "image",
      url: getResponsivePaths("card_render_1", "image"),
    },
  },
  {
    title: "Align Fund",
    year: "2024",
    link: "https://www.cosmos.so/vovavindar/align-fund",
    media: {
      type: "video",
      url: getResponsivePaths("align_2", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hvc1" : "video/webm; codecs=vp9",
      className: `${styles["align"]}`,
    },
  },
  {
    title: "Cognition",
    year: "2024",
    link: "https://www.cosmos.so/vovavindar/cognition",
    media: {
      type: "image",
      url: getResponsivePaths("cognition_grey", "image"),
    },
  },
  {
    title: "Twitch",
    year: "2023",
    link: "https://www.cosmos.so/vovavindar/twitch",
    media: {
      type: "video",
      url: getResponsivePaths("twitch_clips", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hvc1" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Jon-Paul Wheatley",
    year: "2022",
    link: "https://www.cosmos.so/vovavindar/jon-paul-wheatley",
    media: {
      type: "image",
      url: getResponsivePaths("jonpaulsballs", "image"),
      className: `${styles["jpw"]}`,
    },
  },
  {
    title: "Blackster",
    year: "2021",
    link: "https://www.cosmos.so/vovavindar/blackster-capital",
    media: {
      type: "image",
      url: getResponsivePaths("blackster_re", "image"),
    },
  },
];
