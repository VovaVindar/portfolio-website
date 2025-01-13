import styles from "../Hero.module.css";
import Image from "next/image";
import Magnetic from "@/components/Global/Magnetic";
import { GRID_LAYOUT } from "@/constants/grid";

const HeroGrid = ({ imgOnload, cellOnload }) => {
  let refIndex = 0; // For ref handling
  let displayIndex = 0; // For alt text display

  const handleImageRef = (el) => {
    if (!el || !imgOnload?.current) return;
    imgOnload.current[refIndex] = el;
    refIndex++;
  };

  const handleCellRef = (el, index) => {
    if (!el || !cellOnload?.current) return;
    cellOnload.current[index] = el;
  };

  // Function to check if a cell has an image
  const getCellImage = (row, col) => {
    return GRID_LAYOUT.images.find((img) => img.row === row && img.col === col);
  };

  return (
    <>
      {GRID_LAYOUT.rows.map((row) =>
        GRID_LAYOUT.cols.map((col) => {
          const image = getCellImage(row, col);
          let currentIndex = displayIndex;
          if (image) displayIndex++; // Increment only if there's an image

          return (
            <div
              key={`${row}-${col}`}
              className={`${styles["grid-cell"]}`}
              ref={image ? (el) => handleCellRef(el, currentIndex) : undefined}
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
