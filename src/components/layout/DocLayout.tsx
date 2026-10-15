import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Callout } from "../ui/primitives";

/**
 * Shared shell for long-form pages (privacy, terms, accessibility):
 * a page hero followed by readable prose with a small information column.
 */
export function DocLayout({
  eyebrow,
  title,
  lede,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="container doc-layout">
          <div className="prose">{children}</div>
          {aside && (
            <aside className="doc-aside" aria-label="Page information">
              {aside}
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

/** True while the business details in the config are still placeholder text. */
export const legalDetailsPending = () => /\bupdate before launch\b/i.test(site.legal.entityName);

/**
 * Shown on legal pages while the config still contains placeholder business
 * details. It disappears automatically once `site.legal.entityName` (and the
 * other placeholder fields) are replaced with real values.
 */
export function LaunchNotice() {
  if (!legalDetailsPending()) return null;

  return (
    <Callout title="Note for the site owner" tone="warn">
      <p>
        The business details used on this page are still template values from{" "}
        <code>src/config/site.ts</code>. Before launch, replace them and have this page
        reviewed against your actual business practices and legal obligations in your
        jurisdiction. This notice disappears once the placeholder details are updated.
      </p>
    </Callout>
  );
}

/** Cross-links between the legal and accessibility pages, used in the aside. */
export function LegalNav({ current }: { current: "privacy" | "terms" | "accessibility" }) {
  const links = [
    { key: "privacy", label: "Privacy", to: "/privacy" },
    { key: "terms", label: "Terms of use", to: "/terms" },
    { key: "accessibility", label: "Accessibility", to: "/accessibility" },
  ] as const;

  return (
    <nav className="doc-aside__links" aria-label="Related pages">
      <p className="doc-aside__label">Also in this group</p>
      <ul>
        {links.map((link) => (
          <li key={link.key}>
            {link.key === current ? (
              <span aria-current="page">{link.label}</span>
            ) : (
              <Link to={link.to}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
