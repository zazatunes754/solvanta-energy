/**
 * Re-encode a replacement JPEG/WebP pair from an original source image.
 * Usage: node scripts/process-images.mjs <source> <publicPathBase>
 * e.g.   node scripts/process-images.mjs C:\tmp\photo.jpg kawana-buddina-solar
 * Writes public/images/<base>.jpg (quality 80, progressive, mozjpeg)
 * and public/images/<base>.webp (quality 82).
 */
import sharp from "sharp";
import path from "node:path";

/** Optional third argument: target pixel width, e.g. 2400. */
const [, , source, base, widthArg] = process.argv;
if (!source || !base) {
  console.error("usage: node scripts/process-images.mjs <source> <baseName> [width]");
  process.exit(1);
}

const width = widthArg ? parseInt(widthArg, 10) : null;
const outDir = path.resolve("public/images");
const kebabBase = base.replace(/[^a-z0-9-]/gi, "").toLowerCase();
const meta = await sharp(source).metadata();
let pipeline = sharp(source);
if (width && meta.width > width) pipeline = pipeline.resize({ width, kernel: "lanczos3" });
await pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(path.join(outDir, `${kebabBase}.jpg`));
const out = await sharp(path.join(outDir, `${kebabBase}.jpg`)).metadata();
console.log(`${kebabBase}.jpg: ${out.width}x${out.height} written`);
