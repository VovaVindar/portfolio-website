import Image from "next/image";

const BlurImage = ({ src, alt, priority }) => {
  return (
    <figure className={"media"}>
      <Image src={src} fill alt={alt} priority={priority} />
    </figure>
  );
};

export default BlurImage;
