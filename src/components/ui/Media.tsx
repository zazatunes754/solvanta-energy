/**
 * Image helper.
 * - Hero/priority images load eagerly with high fetch priority (no lazy
 *   loading on the largest contentful paint image).
 * - Everything else lazy-loads and decodes asynchronously.
 * - Sizing and cropping are handled by the containing element's aspect-ratio
 *   in CSS, which avoids layout shift while the file downloads.
 * - Photos with generated variants (scripts/build-image-variants.mjs) are
 *   served through a <picture> element: a responsive WebP srcset the browser
 *   picks from, with a responsive JPEG fallback underneath.
 */
import { variantsFor } from "../../lib/imageVariants";
import { asset } from "../../lib/asset";

type MediaProps = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Optional object-position, e.g. "50% 30%". */
  focus?: string;
  className?: string;
  /**
   * `sizes` for the responsive srcset. Pass a layout-aware value for large
   * slots (e.g. "(min-width: 1000px) 60vw, 100vw"); the default is a safe
   * upper bound so browsers never pick a variant smaller than needed.
   */
  sizes?: string;
};

const DEFAULT_SIZES = "(min-width: 1400px) 100vw, 100vw";

/** Width entries -> "url 640w, url 960w, …" with the base path applied. */
function srcSet(base: string, ext: string, widths: number[], fullSrc: string, fullWidth: number): string {
  return [
    ...widths
      .filter((w) => w < fullWidth)
      .map((w) => `${asset(`/images/${base}-${w}.${ext}`)} ${w}w`),
    `${fullSrc} ${fullWidth}w`,
  ].join(", ");
}

export function Media({ src, alt, priority = false, focus, className, sizes }: MediaProps) {
  const resolved = asset(src);
  const entry = variantsFor(src);

  const imgProps = {
    alt,
    className,
    loading: (priority ? "eager" : "lazy") as "eager" | "lazy",
    decoding: (priority ? "sync" : "async") as "sync" | "async",
    fetchPriority: (priority ? "high" : "auto") as "high" | "low" | "auto",
    style: focus ? { objectPosition: focus } : undefined,
  };

  if (!entry) {
    // Equipment icons or images without generated variants: a plain img.
    return <img src={resolved} {...imgProps} />;
  }

  const { base, variants, ext } = entry;
  const srcAttr = ext === "jpg" || ext === "jpeg" ? resolved : asset(`/images/${base}.webp`);

  // WebP-only source: one responsive srcset, no <picture> needed.
  if (variants.webpOnly) {
    return (
      <img
        src={srcAttr}
        srcSet={srcSet(base, "webp", variants.webp, srcAttr, variants.width)}
        sizes={sizes ?? DEFAULT_SIZES}
        {...imgProps}
      />
    );
  }

  // Photo collection: responsive WebP inside <picture>, JPEG underneath.
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSet(base, "webp", variants.webp, asset(`/images/${base}.webp`), variants.width)}
        sizes={sizes ?? DEFAULT_SIZES}
      />
      <img
        src={srcAttr}
        srcSet={srcSet(base, "jpg", variants.jpeg ?? [variants.width], srcAttr, variants.width)}
        sizes={sizes ?? DEFAULT_SIZES}
        {...imgProps}
      />
    </picture>
  );
}

/** Image with a caption, used where the caption adds real information.
 * The image sits in its own fixed-ratio box (no layout shift) and the caption
 * flows below it, so long captions are never clipped by the image frame. */
export function Figure({
  src,
  alt,
  caption,
  priority,
  className,
  aspect = "4 / 3",
  focus,
  sizes,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  focus?: string;
  sizes?: string;
}) {
  return (
    <figure className={`figure ${className ?? ""}`}>
      <div className="figure__media" style={{ aspectRatio: aspect }}>
        <Media src={src} alt={alt} priority={priority} focus={focus} sizes={sizes} />
      </div>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
