import styles from "../Hero.module.css";
import Image from "next/image";

const HeroGrid = ({}) => {
  const rows = [0, 1, 2, 3, 4];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  // Images
  const gridImages = [
    {
      row: 0,
      col: 0,
      src: "/path/to/image1.jpg",
      alt: "Image 1",
      priority: true,
    },
    {
      row: 0,
      col: 1,
      src: "/path/to/image1.jpg",
      alt: "Image 1",
      priority: true,
    },
    {
      row: 0,
      col: 4,
      src: "/path/to/image1.jpg",
      alt: "Image 1",
      priority: true,
    },
    {
      row: 0,
      col: 5,
      src: "/path/to/image1.jpg",
      alt: "Image 1",
      priority: true,
    },
    {
      row: 1,
      col: 0,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 1,
      col: 2,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 1,
      col: 7,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 2,
      col: 4,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 2,
      col: 6,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 3,
      col: 0,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 3,
      col: 2,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 3,
      col: 7,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
    },
    {
      row: 4,
      col: 5,
      src: "/path/to/image2.jpg",
      alt: "Image 2",
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
          return (
            <div key={`${row}-${col}`} className={`${styles["grid-cell"]}`}>
              {image && (
                <Image
                  //src={image.src}
                  src={""}
                  alt={image.alt || "Grid image"}
                  fill
                  className={styles["cell-image"]}
                  priority={image.priority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default HeroGrid;
