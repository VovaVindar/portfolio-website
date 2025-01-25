import styles from "@/components/Home/Work/Work.module.css";
import { supportsHEVCAlpha } from "@/hooks/utils/useSupportsHEVC";

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
    media: {
      type: "video",
      url: getResponsivePaths("paradigm_cube", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hevc" : "video/webm; codecs=vp9",
      className: `${styles["paradigm"]}`,
    },
  },
  {
    title: "Dolce & Gabbana",
    year: "2023",
    media: {
      type: "video",
      url: getResponsivePaths("dg_animation", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hevc" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Aya Muse",
    year: "2025",
    media: {
      type: "image",
      url: getResponsivePaths("am_1", "image"),
    },
  },
  {
    title: "Endex",
    year: "2024",
    media: {
      type: "video",
      url: getResponsivePaths("endex_light", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hevc" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Rove Miles",
    year: "2023",
    media: {
      type: "image",
      url: getResponsivePaths("card_render_1", "image"),
    },
  },
  {
    title: "Align Fund",
    year: "2024",
    media: {
      type: "video",
      url: getResponsivePaths("align_2", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hevc" : "video/webm; codecs=vp9",
      className: `${styles["align"]}`,
    },
  },
  {
    title: "Cognition",
    year: "2024",
    media: {
      type: "image",
      url: getResponsivePaths("cognition_grey", "image"),
    },
  },
  {
    title: "Twitch",
    year: "2023",
    media: {
      type: "video",
      url: getResponsivePaths("twitch_clips", "video"),
      mimeType: isHEVC ? "video/mp4; codecs=hevc" : "video/webm; codecs=vp9",
    },
  },
  {
    title: "Jon-Paul Wheatley",
    year: "2022",
    media: {
      type: "image",
      url: getResponsivePaths("jonpaulsballs", "image"),
      className: `${styles["jpw"]}`,
    },
  },
  {
    title: "Blackster",
    year: "2021",
    media: {
      type: "image",
      url: getResponsivePaths("blackster_re", "image"),
    },
  },
];
