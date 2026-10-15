import { Link } from "react-router-dom";
import { hasContactEmail, site } from "../config/site";
import { DocLayout, LaunchNotice, LegalNav } from "../components/layout/DocLayout";
import { formatMonth } from "../lib/format";
import { useSeo } from "../hooks/useSeo";

export default function Accessibility() {
  useSeo({
    title: "Accessibility",
    description:
      "How this website approaches accessibility — keyboard support, screen reader structure, reduced motion, contrast and reflow — and how to report a problem.",
    path: "/accessibility",
  });

  const lastUpdated = formatMonth(site.legal.lastUpdated);

  return (
    <DocLayout
      eyebrow="Accessibility"
      title="A site that works for everyone who needs it."
      lede="Energy decisions affect everyone, so this site is built to be usable with a keyboard, a screen reader, reduced motion preferences and small or heavily zoomed screens."
      aside={
        <>
          <div className="doc-aside__meta">
            <p className="doc-aside__label">Last updated</p>
            <p>{lastUpdated}</p>
            <p className="doc-aside__label" style={{ marginTop: "var(--space-4)" }}>
              Target standard
            </p>
            <p>WCAG 2.2 Level AA — designed and built against it</p>
          </div>
          <LegalNav current="accessibility" />
        </>
      }
    >
      <LaunchNotice />

      <h2>How this site is built</h2>
      <p>
        Accessibility on this site is treated as part of the build, not a later patch. The
        specifics:
      </p>

      <h3>Structure and screen readers</h3>
      <ul>
        <li>
          Every page has one main heading and a logical heading order, with standard landmarks
          (header, navigation, main content, footer) so screen reader users can jump between
          regions.
        </li>
        <li>
          A "skip to main content" link is the first thing keyboard users reach, letting them
          bypass the navigation on every page.
        </li>
        <li>
          Photography carries descriptive alternative text; purely decorative graphics are
          hidden from assistive technology.
        </li>
      </ul>

      <h3>Keyboard operation</h3>
      <ul>
        <li>Everything interactive is a real link, button, input or control — nothing relies on a mouse-only click handler.</li>
        <li>Focus is always visible, styled for both light and dark backgrounds.</li>
        <li>
          The mobile navigation menu closes with the Escape key and returns focus to the button
          that opened it.
        </li>
        <li>
          The image viewer on the solutions page behaves as a proper dialog: Escape closes it,
          arrow keys move between images, Tab stays inside it while open, and focus returns to
          the image you were viewing.
        </li>
        <li>
          Frequently asked questions use expandable panels built from real buttons, with the
          expanded state announced; collapsed answers are excluded from the tab order.
        </li>
      </ul>

      <h3>Forms and errors</h3>
      <ul>
        <li>Every field has a visible label — placeholders are never the only label.</li>
        <li>
          Hints and validation errors are programmatically associated with the fields they
          belong to, and invalid fields are marked so assistive technology reports them.
        </li>
        <li>Required and optional fields are stated in words, not colour or an asterisk alone.</li>
      </ul>

      <h3>Motion, colour and zoom</h3>
      <ul>
        <li>
          Scroll and hover animations are reduced or removed when your system requests reduced
          motion.
        </li>
        <li>
          Text colour combinations are chosen against WCAG AA contrast targets; the brightest
          accent colours are only used where the contrast against their background is
          sufficient.
        </li>
        <li>
          Layouts are designed to reflow down to 320px-wide screens and to keep working when
          text is enlarged substantially.
        </li>
        <li>There is no autoplaying audio or video, no flashing content, no CAPTCHAs and no time limits.</li>
      </ul>

      <h2>Honest limitations</h2>
      <ul>
        <li>
          This page describes how the site is designed and built. It has not yet been through
          an independent external audit; when one is carried out, its findings will be
          reflected here.
        </li>
        <li>
          The typefaces are loaded from Google Fonts. If that request is blocked, the site
          falls back to system fonts and remains fully usable.
        </li>
        <li>
          Links to third-party websites (for example, government rebate pages) are outside our
          control and may not meet the same standard.
        </li>
      </ul>

      <h2>Report a problem</h2>
      <p>
        If something on this site is difficult or impossible for you to use, we want to know —
        including which page it was and what assistive technology you were using.{" "}
        {hasContactEmail() ? (
          <>
            Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or use the{" "}
            <Link to="/contact">contact page</Link>.
          </>
        ) : (
          <>
            Use the <Link to="/contact">contact page</Link> and we will follow up.
          </>
        )}
      </p>

      <h2>Changes to this page</h2>
      <p>
        This statement is reviewed as the site changes, and updated whenever the way the site
        works changes in a way that affects accessibility.
      </p>
    </DocLayout>
  );
}
