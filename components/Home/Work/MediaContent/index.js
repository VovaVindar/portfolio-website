import Image from "next/image";

const MediaContent = ({ content, title }) => {
  if (content.type === "video") {
    return (
      <video
        key={content.url} // To update the video when the project changes
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      >
        <source src={content.url} type={content.mimeType || "video/mp4"} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image src={content.url} alt={title} fill style={{ objectFit: "cover" }} />
  );
};

export default MediaContent;
