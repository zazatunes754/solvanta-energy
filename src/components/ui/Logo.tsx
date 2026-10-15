import { site } from "../../config/site";

/**
 * Original Solvanta mark: a rising sun arc over a valley line, with a small
 * solar-gold disc at the horizon. Drawn in SVG so it stays crisp at any size
 * and adapts to light or dark surfaces via currentColor.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      role="img"
      aria-label={`${site.brand.name} logo`}
      focusable="false"
    >
      <path
        d="M6 25.5a14 14 0 0 1 28 0"
        fill="none"
        stroke="var(--lime-500)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="20" cy="18.4" r="2.7" fill="var(--gold-400)" />
      <path
        d="M11.5 22.5 20 35l8.5-12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`brand ${className ?? ""}`}>
      <LogoMark className="brand__mark" />
      <span className="brand__text">
        <span className="brand__name">{site.brand.wordmarkPrimary}</span>{" "}
        <span className="brand__sub">{site.brand.wordmarkSecondary}</span>
      </span>
    </span>
  );
}
