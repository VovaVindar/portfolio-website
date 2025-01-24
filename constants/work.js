import styles from "@/components/Home/Work/Work.module.css";

const getResponsivePaths = (filename) => {
  const basePath = "/images/optimized";
  return {
    desktop: `${basePath}/1260/${filename}`,
    largeDesktop: `${basePath}/1880/${filename}`,
  };
};

export const work = [
  {
    title: "Paradigm",
    year: "2024",
    media: {
      type: "video",
      url: getResponsivePaths("paradigm_cube.webm"),
      mimeType: "video/webm; codecs=vp9",
      className: `${styles["paradigm"]}`,
    },
  },
  {
    title: "Dolce & Gabbana",
    year: "2023",
    media: {
      type: "video",
      url: getResponsivePaths("dg_animation.webm"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Aya Muse",
    year: "2025",
    media: {
      type: "image",
      url: getResponsivePaths("am_1.avif"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Endex",
    year: "2024",
    media: {
      type: "video",
      url: getResponsivePaths("endex_light.webm"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Rove Miles",
    year: "2023",
    media: {
      type: "image",
      url: getResponsivePaths("card_render_1.avif"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Align Fund",
    year: "2024",
    media: {
      type: "video",
      url: getResponsivePaths("align_2.webm"),
      mimeType: "video/webm; codecs=vp9",
      className: `${styles["align"]}`,
    },
  },
  {
    title: "Cognition",
    year: "2024",
    media: {
      type: "image",
      url: getResponsivePaths("cognition_grey.avif"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Twitch",
    year: "2023",
    media: {
      type: "video",
      url: getResponsivePaths("twitch_clips.webm"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
  {
    title: "Jon-Paul Wheatley",
    year: "2022",
    media: {
      type: "image",
      url: getResponsivePaths("jonpaulsballs.avif"),
      mimeType: "video/webm; codecs=vp9",
      className: `${styles["jpw"]}`,
    },
  },
  {
    title: "Blackster",
    year: "2021",
    media: {
      type: "image",
      url: getResponsivePaths("blackster_re.avif"),
      mimeType: "video/webm; codecs=vp9",
    },
  },
];
