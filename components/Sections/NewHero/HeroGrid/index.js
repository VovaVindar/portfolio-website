import styles from "../Hero.module.css";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

const HeroGrid = ({ imgOnload, cellOnload }) => {
  let refIndex = 0; // For ref handling
  let displayIndex = 0; // For alt text display

  const handleImageRef = (el) => {
    if (el) {
      imgOnload.current[refIndex] = el;
      refIndex++;
    }
  };

  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  // Images
  const gridImages = [
    {
      row: 0,
      col: 0,
      src: "/images/rove/app/app_mockup.png",
      alt: "Rove App",
      brightness: 2.4,
      blur: 6,
      scale: 1.15,
    },
    {
      row: 0,
      col: 1,
      src: "/images/rove/card/card_render_1.png",
      alt: "Rove Card",
      brightness: 3,
      blur: 8,
      scale: 1.32,
    },
    {
      row: 0,
      col: 4,
      src: "/images/paradigm/logo/paradigm_logo_dark.png",
      alt: "Image 1",
      brightness: 3.7,
      blur: 8,
      scale: 1.24,
    },
    {
      row: 0,
      col: 5,
      src: "/images/paradigm/logo/paradigm_shirt.png",
      alt: "Paradigm Shirt",
      brightness: 2.8,
      blur: 6,
      scale: 1.24,
    },
    {
      row: 1,
      col: 0,
      src: "/images/dg/dg_gallery.png",
      alt: "Dolce&Gabbana Website",
      brightness: 3.3,
      blur: 5,
      scale: 1.21,
    },
    {
      row: 1,
      col: 2,
      src: "/images/ayamuse/am_1.png",
      alt: "Aya Muse Website",
      brightness: 3.4,
      blur: 6,
      scale: 1.24,
    },
    {
      row: 1,
      col: 7,
      src: "/images/cognition/cognition.png",
      alt: "Cognition Website",
      brightness: 1,
      blur: 2,
      scale: 1.18,
    },
    {
      row: 2,
      col: 4,
      src: "/images/cognition/cognition_white.png",
      alt: "Cognition Graphic",
      brightness: 2,
      blur: 2,
      scale: 1.24,
    },
    {
      row: 2,
      col: 6,
      src: "/images/explorations/mobius_2.png",
      alt: "3D Mobius",
      brightness: 3.4,
      blur: 4,
      scale: 1.34,
    },
    {
      row: 3,
      col: 0,
      src: "/images/explorations/ai_value.png",
      alt: "Image 2",
      brightness: 1.05,
      blur: 2,
      scale: 1.16,
    },
    {
      row: 3,
      col: 2,
      src: "/images/paradigm/product/paradigm_product_1.png",
      alt: "Paradigm Product",
      brightness: 1.1,
      blur: 5,
      scale: 1.26,
    },
    {
      row: 3,
      col: 7,
      src: "/images/blackster/blackster_re.png",
      alt: "",
      brightness: 2.5,
      blur: 5,
      scale: 1.19,
    },
    {
      row: 4,
      col: 5,
      src: "/images/blackster/blackster_com.png",
      alt: "Blackster Website",
      brightness: 1.4,
      blur: 4,
      scale: 1.14,
    },
  ];

  // Function to check if a cell has an image
  const getCellImage = (row, col) => {
    return gridImages.find((img) => img.row === row && img.col === col);
  };

  return (
    <>
      {rows.map((row) =>
        cols.map((col) => {
          const image = getCellImage(row, col);
          let currentIndex = displayIndex;
          if (image) displayIndex++; // Increment only if there's an image

          return (
            <div
              key={`${row}-${col}`}
              className={`${styles["grid-cell"]}`}
              ref={
                image
                  ? (el) => (cellOnload.current[currentIndex] = el)
                  : undefined
              }
            >
              {image && (
                <Magnetic movement={0.072} passedScale={1.032}>
                  <Image
                    src={image.src}
                    alt={`${image.alt} (Index: ${currentIndex})`}
                    fill
                    className={styles["cell-image"]}
                    style={{
                      "--image-brightness": image.brightness,
                      "--image-blur": `${image.blur}px`,
                      "--image-scale": `${image.scale}`,
                    }}
                    priority={true}
                    ref={handleImageRef}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Magnetic>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default HeroGrid;
