import { Link } from "react-router-dom";
import { hasContactEmail, hasDeliveryEndpoint, site } from "../config/site";
import { DocLayout, LaunchNotice, LegalNav } from "../components/layout/DocLayout";
import { formatMonth } from "../lib/format";
import { useSeo } from "../hooks/useSeo";

export default function Privacy() {
  useSeo({
    title: "Privacy",
    description:
      "What this website collects (very little), what happens to an enquiry, which third-party requests the page makes, and how to ask a question about your information.",
    path: "/privacy",
  });

  const lastUpdated = formatMonth(site.legal.lastUpdated);

  return (
    <>
      <DocLayout
        eyebrow="Privacy"
        title="Privacy, in plain English."
        lede="This page describes what actually happens on this website — not a generic template. If you would like anything explained differently, ask us."
        aside={
          <>
            <div className="doc-aside__meta">
              <p className="doc-aside__label">Last updated</p>
              <p>{lastUpdated}</p>
              <p className="doc-aside__label" style={{ marginTop: "var(--space-4)" }}>
                Applies to
              </p>
              <p>
                This website ({site.url.replace(/^https?:\/\//, "")}) and enquiries
                submitted through it.
              </p>
            </div>
            <LegalNav current="privacy" />
          </>
        }
      >
        <LaunchNotice />

        <h2>The short version</h2>
        <ul>
          <li>No accounts, no logins, no advertising, no analytics and no tracking pixels.</li>
          <li>
            This site does not set cookies for tracking. Your estimator inputs are calculated
            in your browser.
          </li>
          <li>
            An enquiry reaches us only when you choose to send it — and exactly how that works
            is described below.
          </li>
        </ul>

        <h2>What this site collects</h2>
        <p>
          <strong>Nothing, until you act.</strong> You can browse every page, run the savings
          estimator and read the knowledge hub without providing any personal information.
        </p>
        <p>Two things are worth describing precisely:</p>
        <h3>The savings estimator</h3>
        <p>
          All estimator calculations run entirely in your browser. If you choose to carry your
          estimate across to the enquiry form, a small summary of your inputs and the modelled
          result is saved in your browser's session storage (under the key{" "}
          <code>solvanta-estimate-prefill</code>). It never leaves your device unless you send
          the enquiry, and it is cleared when the form reads it or when your browser session
          ends.
        </p>
        <h3>The enquiry form</h3>
        <p>
          The form asks for the details needed to respond usefully: your name, a way to reach
          you, your postcode or region, property notes, and a message. Only the fields marked
          required are required.
        </p>
        <p>
          {hasDeliveryEndpoint() ? (
            <>
              When you submit the form, its contents are sent to the enquiry service configured
              for this site and used only to respond to your enquiry.
            </>
          ) : hasContactEmail() ? (
            <>
              This site does not transmit form contents to any server. When you submit, your
              email app opens with a pre-filled draft that you can review, edit or discard —
              nothing is sent until you choose to send that email yourself.
            </>
          ) : (
            <>
              This site does not transmit form contents to any server, and no public email
              address is configured. Submitting the form offers you the details to copy, so
              nothing leaves your browser unless you choose to share it by another means.
            </>
          )}
        </p>

        <h2>How enquiry information is used</h2>
        <ul>
          <li>To respond to your enquiry and, if it progresses, to prepare an assessment or proposal.</li>
          <li>
            For the ordinary record-keeping any business keeps about its enquiries and jobs —
            we do not sell or rent personal information, and we do not use it for advertising.
          </li>
          <li>
            We do not add people who enquire to marketing lists without their agreement.
          </li>
        </ul>

        <h2>Third-party requests this site makes</h2>
        <p>Good privacy pages are specific. When you load a page, your browser makes these external requests:</p>
        <ul>
          <li>
            <strong>Google Fonts</strong> — the typefaces are loaded from Google's font
            service, which means your IP address and basic request data are visible to Google
            as the fonts download. If you prefer to avoid that, the site owner can self-host
            the font files; otherwise you can block the request, and the site falls back to
            system fonts.
          </li>
          <li>
            <strong>Hosting</strong> — the pages themselves are served by a hosting provider,
            which may keep standard server logs (including IP addresses) for security and
            operational purposes. We do not run analytics on top of those logs.
          </li>
        </ul>
        <p>
          There are no embedded social widgets, chat widgets, session-recording scripts or
          advertising networks on this site. Links to other websites (for example, government
          rebate pages) are governed by those websites' own privacy policies.
        </p>

        <h2>Access, correction and questions</h2>
        <p>
          You can ask what information we hold about you, ask for it to be corrected, or ask
          for it to be deleted where there is no legal reason for us to keep it.{" "}
          {hasContactEmail() ? (
            <>
              Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or use the{" "}
              <Link to="/contact">contact page</Link>.
            </>
          ) : (
            <>
              Use the <Link to="/contact">contact page</Link> to start that conversation.
            </>
          )}
        </p>
        <p>
          If you are not satisfied with how a privacy question is handled, you can contact the
          Office of the Australian Information Commissioner (
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
            oaic.gov.au
          </a>
          ), which also publishes broader guidance on privacy rights in Australia.
        </p>

        <h2>Changes to this page</h2>
        <p>
          If this site's data practices change (for example, if an enquiry service or
          analytics tool is added), this page will be updated and the date at the top changed
          before or at the same time as the change takes effect.
        </p>
      </DocLayout>
    </>
  );
}
