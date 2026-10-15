import { Sun } from "lucide-react";

/**
 * Continuously scrolling capability strip. Purely decorative motion that
 * duplicates its content for a seamless loop; it pauses on hover and stops
 * entirely for visitors who prefer reduced motion (see components.css).
 */
export function Marquee({
  items,
  tone = "light",
  durationSeconds = 46,
}: {
  items: string[];
  tone?: "light" | "deep";
  durationSeconds?: number;
}) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          <Sun />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${tone === "deep" ? "marquee--deep" : ""}`}
      style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
    >
      {track}
      {track}
      {/* Accessible equivalent of the decorative strip. */}
      <span className="visually-hidden">{items.join(". ")}</span>
    </div>
  );
}
