// Remove folders after build
const fs = require("fs-extra");
const path = require("path");

const buildDir = path.join(__dirname, "..", "out");

function removeDirectories() {
  const directoriesToRemove = [
    path.join(buildDir, "images", "uncompressed"),
    path.join(buildDir, "images", "selected"),
  ];

  directoriesToRemove.forEach((dir) => {
    if (fs.existsSync(dir)) {
      fs.removeSync(dir);
      console.log(`Removed directory: ${dir}`);
    }
  });
}

removeDirectories();
