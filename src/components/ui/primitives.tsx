import type { ReactNode } from "react";
import { Info, TriangleAlert, Check } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

/** Small monospaced section label with a leading rule. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Heading block used to open most sections. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  aside,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div className={`section-head ${aside ? "section-head--split" : ""}`}>
      <div className="stack">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="section-head__title" id={id}>
          {title}
        </h2>
      </div>
      {aside ?? (lede ? <p className="lede">{lede}</p> : null)}
    </div>
  );
}

/** Wrapper that fades children in on first scroll into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>({ delay });
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className ?? ""}`}>
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "lime" | "deep" | "gold";
}) {
  return <span className={`badge ${tone !== "default" ? `badge--${tone}` : ""}`}>{children}</span>;
}

/** Highlighted note. Used for honesty statements, caveats and helpful tips. */
export function Callout({
  title,
  tone = "info",
  children,
}: {
  title?: string;
  tone?: "info" | "warn" | "default";
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? TriangleAlert : tone === "info" ? Info : Info;
  return (
    <div className={`callout ${tone === "warn" ? "callout--warn" : tone === "info" ? "callout--info" : ""}`}>
      <Icon className="callout__icon" aria-hidden="true" />
      <div>
        {title && <p className="callout__title">{title}</p>}
        {children}
      </div>
    </div>
  );
}

/** Bulleted list with an inline icon, used for inclusions and benefit lists. */
export function TickList({
  items,
  variant = "tick",
  className,
}: {
  items: string[];
  variant?: "tick" | "cross";
  className?: string;
}) {
  return (
    <ul className={`tick-list ${variant === "cross" ? "cross-list" : ""} ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
