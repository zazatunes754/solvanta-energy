/**
 * Generate responsive image variants for `public/images` and a typed manifest
 * module so `<Media>` can build `srcset`/`sizes` for the browser to pick from.
 *
 * For every `.jpg` in public/images (the photo collection) this emits:
 *   - `{base}-{W}.webp`  for W in 640, 960, 1280, 1920 and the full width
 *     (capped at the source's own width), and
 *   - `{base}-{W}.jpg`   JPEG fallbacks at 960 and 1920 (capped at full width),
 * plus `src/lib/imageVariants.ts` describing what exists.
 *
 * `.webp` sources (the Pexels equipment/process set) get `{base}-{W}.webp`
 * variants only — no extra fallback needed, WebP is served everywhere.
 *
 * Variants are committed, so `npm run build` stays fast and needs no image
 * tooling. Re-run this script after adding or replacing a source photo:
 *
 *   node scripts/build-image-variants.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const IMG_DIR = path.resolve("public/images");
const OUT_MODULE = path.resolve("src/lib/imageVariants.ts");

const WEBP_WIDTHS = [640, 960, 1280, 1920];
const JPEG_FALLBACK_WIDTHS = [960, 1920];

/** Never varianted: retired files kept for reference, and the fixed-size
 * Open Graph sharing image. */
const SKIP = new Set(["rooftop-solar-home.webp", "modern-home-1.webp", "social-card.jpg"]);

const files = fs
  .readdirSync(IMG_DIR)
  .filter(
    (f) =>
      /\.(jpe?g|webp)$/i.test(f) &&
      !/-\d{3,4}\.(jpe?g|webp)$/i.test(f) &&
      !SKIP.has(f) &&
      // A .webp twin of a .jpg source is a derived file, not a source.
      !(/\.webp$/i.test(f) && fs.existsSync(path.join(IMG_DIR, f.replace(/\.webp$/i, ".jpg")))),
  );

const manifest = {};

for (const file of files) {
  const full = path.join(IMG_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const meta = await sharp(full).metadata();
  const srcW = meta.width ?? 0;

  const entries = { width: srcW, webp: [], jpeg: [] };

  // WebP variants (for .jpg sources these serve inside <picture>).
  const webpTargets = [...new Set([...WEBP_WIDTHS, srcW])].filter((w) => w <= srcW).sort((a, b) => a - b);
  const webpOnlySource = ext === ".webp";
  for (const w of webpTargets) {
    if (webpOnlySource && w === srcW) {
      // The source itself is the full-width WebP — nothing to write.
      entries.webp.push(w);
      continue;
    }
    const outName = w === srcW ? `${base}.webp` : `${base}-${w}.webp`;
    await sharp(full).resize({ width: w, kernel: "lanczos3", withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(IMG_DIR, outName));
    entries.webp.push(w);
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    for (const w of JPEG_FALLBACK_WIDTHS.filter((w) => w < srcW)) {
      await sharp(full).resize({ width: w, kernel: "lanczos3", withoutEnlargement: true }).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(path.join(IMG_DIR, `${base}-${w}.jpg`));
      entries.jpeg.push(w);
    }
    // The original .jpg itself is the largest JPEG entry.
    entries.jpeg.push(srcW);
    manifest[base] = entries;
    console.log(`${base}: webp [${entries.webp.join(", ")}], jpg fallback [${entries.jpeg.join(", ")}]`);
  } else {
    // WebP-only source: the original is both the src and the largest entry.
    manifest[base] = { ...entries, webpOnly: true };
    console.log(`${base}: webp-only [${entries.webp.join(", ")}]`);
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
const ts = `/**
 * GENERATED FILE — do not edit by hand.
 * ---------------------------------------------------------------------------
 * Responsive image variant manifest, written by scripts/build-image-variants.mjs.
 * \`<Media>\` reads this to build srcset/sizes for every photo that has variants.
 * Re-run the script after adding or replacing a source photo.
 * ---------------------------------------------------------------------------
 */

export type ImageVariants = {
  /** Pixel width of the original source image. */
  width: number;
  /** Widths at which a .webp variant exists. */
  webp: number[];
  /** Widths at which a .jpg fallback variant exists (undefined for webp-only sources). */
  jpeg?: number[];
  /** True when the source itself is WebP (no <picture> fallback needed). */
  webpOnly?: boolean;
};

export const imageVariants: Record<string, ImageVariants> = ${JSON.stringify(sorted, null, 2)};

/** Look up variants for an image path like "/images/name.jpg"; null when none. */
export function variantsFor(publicPath: string): { base: string; ext: string; variants: ImageVariants } | null {
  const match = /\\/images\\/([a-z0-9-]+)\\.(jpe?g|webp)$/i.exec(publicPath);
  if (!match) return null;
  const [, base, ext] = match;
  const variants = imageVariants[base];
  if (!variants) return null;
  return { base, ext: ext.toLowerCase(), variants };
}
`;
fs.writeFileSync(OUT_MODULE, ts);
console.log(`\nwrote ${OUT_MODULE} with ${Object.keys(sorted).length} entries`);
