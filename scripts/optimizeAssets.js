// node scripts/optimizeAssets.js         # Skip existing files
// node scripts/optimizeAssets.js --force # Reprocess everything

const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// CLI flag to force reprocessing of all files
const FORCE_REPROCESS = process.argv.includes("--force");

// Configuration for different input directories and their target widths
const DIRECTORIES_CONFIG = [
  {
    inputDir: "public/images/selected/hero-grid",
    widths: [300, 400, 650],
    videoQualities: [
      { width: 650, bitrate: "1000k", crf: 28 },
      { width: 400, bitrate: "600k", crf: 28 },
      { width: 300, bitrate: "450k", crf: 28 },
    ],
  },
  {
    inputDir: "public/images/selected/work",
    widths: [1260, 1880],
    videoQualities: [
      { width: 1260, bitrate: "1900k", crf: 34 },
      {
        width: 1880,
        bitrate: "2900k", // Target bitrate. Simply suggests ~3 Mbps target.
        crf: 36, // Constant Rate Factor (0-63)
        // Higher = more compression/lower quality
        // 28-30: High quality
        // 31-33: Good balance
        // 34-37: Smaller files
      },
    ],
  },
];
// Lower bitrate + higher CRF = smaller file size

// Base directory for output files - where processed files will go:
const BASE_OUTPUT_DIR = "public/images/optimized";

// Check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function processVideo(filePath, outputDir, filename, videoQualities) {
  for (const quality of videoQualities) {
    // Create size-specific folder: e.g., "images/optimized/projects/300"
    const sizeDir = path.join(outputDir, quality.width.toString());
    await fs.mkdir(sizeDir, { recursive: true });

    // Final path will be like: "images/optimized/projects/300/video.webm"
    const webmPath = path.join(sizeDir, `${filename}.webm`);

    // Skip if file exists and not forcing reprocess
    if (!FORCE_REPROCESS && (await fileExists(webmPath))) {
      console.log(
        `Skipping existing video size: ${filename}-${quality.width}px`
      );
      continue;
    }

    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .videoCodec("libvpx-vp9")
        .audioCodec("libopus")
        .size(`${quality.width}x?`)
        .videoBitrate(quality.bitrate)
        .outputOptions([
          `-crf ${quality.crf}`, // Main quality control
          "-b:v 0", // Use CRF instead of target bitrate
          "-deadline good", // Balanced encoding speed
          "-cpu-used 2", // 0-4: Lower = better quality but slower
          "-row-mt 1", // Enable row-based multithreading
          "-auto-alt-ref 1", // Enable alternative reference frames
          "-lag-in-frames 25", // Maximum frames to look ahead
          "-keyint_min 60", // Minimum interval between keyframes
          "-g 240", // Maximum interval between keyframes
          "-sc_threshold 60", // Scene change threshold (0-100), lower = more sensitive
        ])
        .audioQuality(3) // Opus audio quality (0-10, lower is better)
        .on("end", () => {
          console.log(
            `Processed video: ${filename} to ${quality.width}px WebM`
          );
          resolve();
        })
        .on("error", (err) => {
          console.error(`Error processing WebM ${filename}:`, err);
          reject(err);
        })
        .save(webmPath);
    });
  }
}

async function* walkDir(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      yield* walkDir(fullPath);
    } else {
      const ext = path.extname(file.name).toLowerCase();
      if (
        [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov", ".avi"].includes(ext)
      ) {
        yield fullPath;
      }
    }
  }
}

async function processAsset(filePath, config) {
  // Get file extension (.jpg, .mp4, etc)
  const ext = path.extname(filePath).toLowerCase();

  // Get the relative path from input directory
  // e.g., if file is in "images/selected/project1/image.jpg"
  // relativePath will be "project1/image.jpg"
  const relativePath = path.relative(config.inputDir, filePath);

  // Construct the same folder structure in output directory
  // e.g., "images/optimized/project1"
  const outputDir = path.join(BASE_OUTPUT_DIR, path.dirname(relativePath));

  // Get just the filename without extension
  // e.g., "image.jpg" becomes "image"
  const filename = path.parse(filePath).name;

  try {
    // Create the project directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      for (const width of config.widths) {
        // Create size-specific folder
        // e.g., "images/optimized/project1/300"
        const sizeDir = path.join(outputDir, width.toString());
        await fs.mkdir(sizeDir, { recursive: true });

        // Final path: "images/optimized/project1/300/image.avif"
        const outputPath = path.join(sizeDir, `${filename}.avif`);

        // Skip if file exists and not forcing reprocess
        if (!FORCE_REPROCESS && (await fileExists(outputPath))) {
          console.log(`Skipping existing image size: ${filename}-${width}px`);
          continue;
        }

        const image = sharp(filePath);
        const metadata = await image.metadata();

        if (metadata.width > width) {
          image.resize(width, null, {
            withoutEnlargement: true,
            fit: "inside",
          });
        }

        await image
          .avif({
            quality: 65, // Main quality control (0-100)
            // Higher = better quality but larger file
            // 65 is good balance, try 50-75 range

            effort: 6, // Compression effort (0-9)
            // Higher = better compression but slower encoding
            // Doesn't affect final quality, just compression efficiency
          })
          .toFile(outputPath);

        console.log(`Processed image: ${filename}-${width}px`);
      }
    } else if ([".mp4", ".mov", ".avi"].includes(ext)) {
      await processVideo(filePath, outputDir, filename, config.videoQualities);
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function optimizeAssets() {
  try {
    await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });

    for (const config of DIRECTORIES_CONFIG) {
      console.log(`Processing directory: ${config.inputDir}`);
      console.log(`Target widths: ${config.widths.join(", ")}px`);

      try {
        for await (const filePath of walkDir(config.inputDir)) {
          await processAsset(filePath, config);
        }
      } catch (error) {
        console.error(`Error processing directory ${config.inputDir}:`, error);
        // Continue with next directory even if one fails
        continue;
      }
    }

    console.log("All assets processed!");
  } catch (error) {
    console.error("Error in optimization process:", error);
  }
}

// Start processing
console.log(
  `Starting asset optimization...${FORCE_REPROCESS ? " (Force mode)" : ""}`
);
optimizeAssets();
