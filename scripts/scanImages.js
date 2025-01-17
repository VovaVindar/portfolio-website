const fs = require("fs");
const path = require("path");

// Next.js public directory
const mediaDir = path.join(process.cwd(), "public", "images", "selected");
const outputFilePath = path.join(process.cwd(), "constants", "media.js");

// Supported file extensions
const extensions = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
  videos: [".mp4", ".webm", ".ogg", ".mov"],
};

function getAllMediaPaths(dir) {
  const media = {
    images: [],
    videos: [],
  };

  function scanDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDir(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();

        // Convert to Next.js public path format
        let webPath = filePath
          .replace(path.join(process.cwd(), "public"), "")
          .split(path.sep)
          .join("/");

        if (extensions.images.includes(ext)) {
          media.images.push(webPath);
        } else if (extensions.videos.includes(ext)) {
          media.videos.push(webPath);
        }
      }
    });
  }

  scanDir(dir);
  return media;
}

// Run the scanner
try {
  console.log("Scanning for media files...");
  const mediaPaths = getAllMediaPaths(mediaDir);

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputFilePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate the constants file content
  const fileContent = `// Auto-generated media paths
// Generated on: ${new Date().toLocaleString()}

export const SITE_IMAGES = ${JSON.stringify(mediaPaths.images, null, 2)};

export const SITE_VIDEOS = ${JSON.stringify(mediaPaths.videos, null, 2)};
`;

  // Write the file
  fs.writeFileSync(outputFilePath, fileContent);

  console.log("\nFound:");
  console.log(`${mediaPaths.images.length} images`);
  console.log(`${mediaPaths.videos.length} videos`);

  console.log("\nImages:");
  mediaPaths.images.forEach((path) => console.log(` - ${path}`));

  console.log("\nVideos:");
  mediaPaths.videos.forEach((path) => console.log(` - ${path}`));

  console.log(`\nMedia paths saved to: ${outputFilePath}`);
} catch (error) {
  console.error("Error:", error.message);
}
