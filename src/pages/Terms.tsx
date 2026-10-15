import { Link } from "react-router-dom";
import { site } from "../config/site";
import { DocLayout, LaunchNotice, LegalNav } from "../components/layout/DocLayout";
import { formatMonth } from "../lib/format";
import { useSeo } from "../hooks/useSeo";

export default function Terms() {
  useSeo({
    title: "Terms of use",
    description:
      "The terms that apply to this website: what the information here is (and is not), how estimates should be read, and the ground rules for using the site.",
    path: "/terms",
  });

  const lastUpdated = formatMonth(site.legal.lastUpdated);

  return (
    <DocLayout
      eyebrow="Terms"
      title="Terms of use, without the legalese where possible."
      lede="These terms cover this website only. Any system you buy is governed by the written agreement and warranties for that job."
      aside={
        <>
          <div className="doc-aside__meta">
            <p className="doc-aside__label">Last updated</p>
            <p>{lastUpdated}</p>
            <p className="doc-aside__label" style={{ marginTop: "var(--space-4)" }}>
              Operated by
            </p>
            <p>{site.legal.entityName}</p>
            <p className="doc-aside__label" style={{ marginTop: "var(--space-4)" }}>
              Governing law
            </p>
            <p>{site.legal.jurisdiction}</p>
          </div>
          <LegalNav current="terms" />
        </>
      }
    >
      <LaunchNotice />

      <h2>The short version</h2>
      <ul>
        <li>This site is general information and a planning tool — not energy, financial or legal advice.</li>
        <li>Estimates are indicative models, not quotes or guarantees of savings.</li>
        <li>Incentive programs change; the official sources always take precedence over anything written here.</li>
      </ul>

      <h2>Information, not advice</h2>
      <p>
        The content on this website — including the knowledge hub, FAQs and incentive
        summaries — is general information about solar, batteries and energy, prepared in good
        faith. It does not take into account your individual objectives, financial situation or
        needs, and it is not a substitute for advice from a qualified professional where your
        circumstances require it.
      </p>

      <h2>Estimates and calculators</h2>
      <p>
        The savings estimator produces indicative figures from published modelling
        assumptions, which are shown alongside the results. Actual outcomes depend on matters
        outside any model's control — your actual consumption profile, tariff changes, export
        limits, weather and how you operate the system. An estimate on this site is not a
        quotation, an offer, or a prediction of your future bills.
      </p>

      <h2>Incentives and third-party information</h2>
      <p>
        Rebates, schemes and their rules are set by governments and scheme administrators, not
        by this website, and they can change with little notice — including rules that apply
        from a future installation date. Every program described here links to its official
        source and records the date it was checked. Before making a decision, confirm the
        current position with the official source or the program administrator. Nothing on
        this site promises that any particular person or property is eligible for any program.
      </p>

      <h2>Using this website</h2>
      <p>You are welcome to use this site for personal and internal business purposes. Please do not:</p>
      <ul>
        <li>attempt to disrupt, overload or gain unauthorised access to the site or its infrastructure;</li>
        <li>scrape or reproduce substantial parts of the site content in a way that misrepresents its source;</li>
        <li>use the site in breach of applicable law.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The text, design, code and branding of this site belong to the site operator unless
        otherwise noted. Photography is used under the free-use licences of the rights
        holders (primarily the Pexels licence), with credits documented in the project's{" "}
        <code>ASSET_SOURCES.md</code> file.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site links to websites we don't control — for example, government rebate pages
        and official guidance. We choose those links carefully, but we're not responsible for
        their content, availability or their privacy practices.
      </p>

      <h2>Liability</h2>
      <p>
        Nothing in these terms excludes or limits any guarantee, right or remedy you have under
        the Australian Consumer Law or any other law that cannot lawfully be excluded. To the
        extent the law allows, the site operator is not liable for loss arising from reliance
        on general information or modelled estimates taken from this website.
      </p>
      <p>
        Where a service is supplied to you (for example, a system design or installation), the
        terms, warranties and consumer guarantees for that service are set out in the written
        agreement for that job, not on this page.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of {site.legal.jurisdiction}, and disputes are
        subject to the courts of that jurisdiction.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms as the site evolves; the date at the top of this page will
        change when we do. Questions about these terms can be raised through the{" "}
        <Link to="/contact">contact page</Link>.
      </p>
    </DocLayout>
  );
}
