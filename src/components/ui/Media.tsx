/**
 * Image helper.
 * - Hero/priority images load eagerly with high fetch priority (no lazy
 *   loading on the largest contentful paint image).
 * - Everything else lazy-loads and decodes asynchronously.
 * - Sizing and cropping are handled by the containing element's aspect-ratio
 *   in CSS, which avoids layout shift while the file downloads.
 */
export function Media({
  src,
  alt,
  priority = false,
  focus,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Optional object-position, e.g. "50% 30%". */
  focus?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={focus ? { objectPosition: focus } : undefined}
    />
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
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <figure className={`figure ${className ?? ""}`}>
      <div className="figure__media" style={{ aspectRatio: aspect }}>
        <Media src={src} alt={alt} priority={priority} />
      </div>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
