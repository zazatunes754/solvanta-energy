import { ExternalLink, Info, ShieldCheck } from "lucide-react";
import {
  applicationSteps,
  eligibilityFactors,
  federalPrograms,
  incentiveDisclaimers,
  jurisdictionPrograms,
} from "../data/incentives";
import { Button } from "../components/ui/Button";
import { Badge, Callout, Reveal, SectionHeading, TickList } from "../components/ui/primitives";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";
import { Figure } from "../components/ui/Media";
import { asset } from "../lib/asset";

const LAST_REVIEWED = "15 October 2026";

export default function Rebates() {
  useSeo({
    title: "Solar and battery rebates, incentives and eligibility",
    description:
      "How Australian solar and battery incentives work: small-scale technology certificates, the Cheaper Home Batteries Program capacity taper from 1 May 2026, state and territory programs, eligibility factors and the application process.",
    path: "/solar-rebates",
  });

  const batteryProgram = federalPrograms[0];

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Rebates &amp; incentives</p>
          <h1>What support actually exists — and what it depends on.</h1>
          <p className="lede">
            Australian solar and battery incentives are delivered through certificate schemes and
            state programs with their own rules. This page explains how they work, what decides
            eligibility, and where to verify the current position yourself.
          </p>
          <div className="page-hero__meta">
            <span>Last reviewed: {LAST_REVIEWED}</span>
            <span>Sources: official government and regulator pages</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-it-works">
        <div className="container">
          <SectionHeading
            eyebrow="The mechanism"
            title={<span id="how-it-works">Incentives are certificates, applied as a discount.</span>}
            aside={
              <p className="lede">
                Nothing is paid to you directly. An eligible installation creates certificates;
                their value is deducted from your invoice by the installer, who handles the
                paperwork. That is why the installer's documentation matters as much as the product.
              </p>
            }
          />

          <div className="grid-3" style={{ marginTop: "var(--space-7)" }}>
            {federalPrograms.map((program) => (
              <article className="value-block" key={program.id}>
                <div className="pill-row">
                  <Badge tone={program.status === "open" ? "lime" : "gold"}>{program.statusLabel}</Badge>
                  <Badge>{program.appliesTo}</Badge>
                </div>
                <h3>{program.name}</h3>
                <p>{program.summary}</p>
                <ul className="tick-list" style={{ marginTop: "var(--space-3)" }}>
                  {program.keyPoints.map((point) => (
                    <li key={point}>
                      <ShieldCheck aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="note-inline">
                  <span className="status-dot" aria-hidden="true" />
                  Last verified {program.lastVerified} · {program.administrator}
                </p>
                <a className="arrow-link" href={program.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {program.sourceLabel}
                  <ExternalLink className="btn__icon" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="discount-types-title">
        <div className="container">
          <SectionHeading
            eyebrow="Reading a quote"
            title={
              <span id="discount-types-title">
                Three things called discounts — only one is a government incentive.
              </span>
            }
            aside={
              <p className="lede">
                Quotes happily blur them together. Each comes from a different place, carries
                different conditions, and deserves a different level of trust.
              </p>
            }
          />
          <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-block">
              <h3>Government incentives</h3>
              <p>
                Certificate-based support under federal schemes — small-scale technology
                certificates for panels and batteries — plus any state or territory rebate that
                applies to your address. Rules, eligibility and values are set by the program
                administrators, applied as a point-of-sale discount by the installer, and limited by
                funding and dates.
              </p>
            </div>
            <div className="value-block">
              <h3>Retailer discounts and offers</h3>
              <p>
                Price cuts, package deals, plan credits and "special offers" decided by the seller.
                They can be genuine value — but they are marketing, not entitlements. Check what the
                discount is subtracted from, whether conditions or expiry dates apply, and whether a
                cheaper headline price corresponds to a cheaper specification.
              </p>
            </div>
            <div className="value-block">
              <h3>Financing arrangements</h3>
              <p>
                Loans, interest-free periods and payment plans offered by retailers, banks or state
                programs. Financing changes <em>when</em> you pay, not what you pay — interest,
                fees and the total cost belong in your comparison. It is not a rebate and should
                never be presented as one.
              </p>
            </div>
          </div>
          <Callout title="Ask for the arithmetic, in dollars" tone="info">
            <p>
              A trustworthy quote labels each element separately: system price, federal certificate
              discount with its current estimate, state support with its eligibility conditions, and
              the balance being financed. If a discount cannot be broken down, treat it as a
              marketing number until it can be.
            </p>
          </Callout>
        </div>
      </section>

      <section className="section on-deep" aria-labelledby="taper-title">
        <div className="container">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">Changed 1 May 2026</p>
              <h2 id="taper-title">The federal battery support now tapers by capacity.</h2>
              <p className="lede" style={{ color: "var(--text-on-deep-muted)" }}>
                {batteryProgram.detail?.intro}
              </p>

              <ul className="assumption-list" style={{ marginTop: "var(--space-4)" }}>
                {batteryProgram.detail?.rows.map((row) => (
                  <li key={row.label}>
                    <span>
                      <strong style={{ color: "var(--text-on-deep)" }}>{row.label}</strong>
                      {row.note && (
                        <>
                          <br />
                          <span style={{ color: "var(--text-on-deep-muted)", fontSize: "0.84rem" }}>
                            {row.note}
                          </span>
                        </>
                      )}
                    </span>
                    <span style={{ color: "var(--lime-500)" }}>{row.value}</span>
                  </li>
                ))}
              </ul>

              <Callout title="What this means for larger batteries" tone="warn">
                <p>{batteryProgram.detail?.outro}</p>
                <p>
                  The regulator has also warned that rebates are determined by the installation date,
                  not the contract date — and that retailers should not promise installations before
                  a rule change unless the work can genuinely be completed in time.
                </p>
              </Callout>

              <div className="btn-row">
                <Button href={batteryProgram.sourceUrl} variant="primary">
                  Clean Energy Regulator notice
                </Button>
                <Button href="https://cer.gov.au" variant="ghost-deep">
                  cer.gov.au
                </Button>
              </div>
            </div>

            <div className="split__media split__media--tall">
              <Figure
                src={asset("/images/ev-charging-home.webp")}
                alt="Charging cable plugged into the charge port of an electric vehicle"
                caption="Electrification changes the calculation: an electric vehicle typically increases household consumption and the value of daytime generation."
                aspect="4 / 5"
                className="figure--tone"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="states-title">
        <div className="container">
          <SectionHeading
            eyebrow="State and territory programs"
            title={<span id="states-title">Support varies by jurisdiction — verify each one.</span>}
            aside={
              <p className="lede">
                Programs open, close and change their values. Some were closed at the time of
                writing: Victoria's interest-free battery loan, for example, no longer accepts new
                applications, while the state's solar panel rebate remains available to eligible
                households. Links below were checked reachable on {LAST_REVIEWED}.
              </p>
            }
          />

          <div className="table-wrap" tabIndex={0} style={{ marginTop: "var(--space-6)" }}>
            <table className="data">
              <caption>Jurisdiction directory — starting points for current program rules</caption>
              <thead>
                <tr>
                  <th scope="col">State / territory</th>
                  <th scope="col">What to expect</th>
                  <th scope="col">Official starting point</th>
                </tr>
              </thead>
              <tbody>
                {jurisdictionPrograms.map((program) => (
                  <tr key={program.state}>
                    <th scope="row" style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>
                      {program.label}
                    </th>
                    <td>{program.note}</td>
                    <td>
                      <a href={program.url} target="_blank" rel="noopener noreferrer">
                        Visit site
                        <ExternalLink size={13} aria-hidden="true" style={{ marginLeft: 6, verticalAlign: "-2px" }} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="note-inline" style={{ marginTop: "var(--space-4)" }}>
            This directory is a starting point only. Program names, eligibility criteria and funding
            availability are set by each jurisdiction and change without notice.
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="eligibility-title">
        <div className="container">
          <SectionHeading
            eyebrow="Eligibility"
            title={<span id="eligibility-title">Six factors that decide most outcomes.</span>}
            lede="We can explain the rules and prepare documentation. We cannot decide your eligibility — that is the program administrator's role."
          />
          <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
            {eligibilityFactors.map((factor, index) => (
              <Reveal key={factor.title} delay={index * 50}>
                <div className="value-block">
                  <h3>{factor.title}</h3>
                  <p>{factor.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Callout title="Where our estimate differs from an official figure" tone="info">
            <p>
              Numbers produced by this website — including battery support shown in the savings
              estimator — are indicative models with stated assumptions. They are not official
              calculations, and they are not a promise of value. The authority's own calculator and
              your installer's current quote are the references that matter.
            </p>
          </Callout>
        </div>
      </section>

      <section className="section" aria-labelledby="verify-title">
        <div className="container">
          <SectionHeading
            eyebrow="Verify it yourself"
            title={<span id="verify-title">Five checks, a few minutes, official sources only.</span>}
            lede="You do not have to take any provider's word for what is available — including ours. These are the sources we check, in the order we check them."
          />
          <div className="grid-2" style={{ marginTop: "var(--space-6)", gap: "var(--space-6)" }}>
            <ol className="num-list">
              <li>
                <h3>Start federal</h3>
                <p>
                  Check the Clean Energy Regulator's{" "}
                  <a
                    href="https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)", textDecoration: "underline" }}
                  >
                    Small-scale Renewable Energy Scheme
                  </a>{" "}
                  page and, for batteries, the notice on the 1 May 2026 changes. Those pages define
                  how certificates are calculated and which date decides eligibility.
                </p>
              </li>
              <li>
                <h3>Then your state or territory</h3>
                <p>
                  Open the official page for your jurisdiction from the directory table above. Look
                  for whether the program is accepting applications, what income or property tests
                  apply, and whether funding is released in rounds.
                </p>
              </li>
              <li>
                <h3>Check the products</h3>
                <p>
                  Confirm every quoted panel, inverter and battery appears on the eligible product
                  lists for the programs involved — the industry's{" "}
                  <a
                    href="https://cleanenergycouncil.org.au/industry-programs/products-program/modules"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)", textDecoration: "underline" }}
                  >
                    approved products program
                  </a>{" "}
                  is the usual starting point.
                </p>
              </li>
              <li>
                <h3>Check the installer</h3>
                <p>
                  Verify accreditation status directly with{" "}
                  <a
                    href="https://saaustralia.com.au/accreditation-status-check"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)", textDecoration: "underline" }}
                  >
                    Solar Accreditation Australia
                  </a>
                  , and check whether the company operates under the{" "}
                  <a
                    href="https://newenergytech.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)", textDecoration: "underline" }}
                  >
                    New Energy Tech Consumer Code
                  </a>
                  .
                </p>
              </li>
              <li>
                <h3>Check the price side</h3>
                <p>
                  Use{" "}
                  <a
                    href="https://www.energymadeeasy.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)", textDecoration: "underline" }}
                  >
                    Energy Made Easy
                  </a>{" "}
                  to confirm your plan's usage rates and feed-in tariff, so savings claims can be
                  judged against your real prices rather than averages.
                </p>
              </li>
            </ol>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="panel">
                <p className="eyebrow">What could change next</p>
                <h3 style={{ fontSize: "var(--step-1)", marginBlock: "var(--space-3)" }}>
                  Incentives are designed to decline over time.
                </h3>
                <ul className="tick-list">
                  <li>
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      The federal deeming period shortens each year until the scheme's scheduled
                      end in 2030 — the same system earns fewer certificates the longer you wait.
                    </span>
                  </li>
                  <li>
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      Battery capacity factors are set by regulation and were adjusted once already
                      (1 May 2026); they can be varied again.
                    </span>
                  </li>
                  <li>
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      State programs exhaust their funding rounds and close without much notice —
                      Victoria's battery loan is a live example of a program that stopped
                      accepting applications.
                    </span>
                  </li>
                  <li>
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      Certificate market prices float, so identical certificate volumes convert to
                      different dollar discounts between two quotes on the same day.
                    </span>
                  </li>
                  <li>
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      Network export limits and connection rules change independently of any rebate
                      — they decide what a system is allowed to do, not just what it earns.
                    </span>
                  </li>
                </ul>
              </div>

              <Callout title="So what should you do about it?" tone="default">
                <p>
                  Get the incentive treatment written into the contract with an explicit "what
                  happens if it changes" clause. Never sign specifically to beat a deadline you
                  have not verified at the official source. And keep perspective: the discount is
                  the smallest part of the decision — the specification and the installation
                  quality outlive every rebate.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">Application process</p>
              <h2 id="process-title">From research to invoice, in six steps.</h2>
              <ol className="steps-vertical" style={{ marginTop: "var(--space-5)" }}>
                {applicationSteps.map((step) => (
                  <li key={step.title}>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="panel">
                <p className="eyebrow">Before you sign</p>
                <h3 style={{ fontSize: "var(--step-1)", marginBlock: "var(--space-3)" }}>
                  A short verification checklist
                </h3>
                <TickList
                  items={[
                    "Confirm the program is currently accepting applications.",
                    "Check the products quoted appear on the eligible product list.",
                    "Confirm who holds the accreditation and licence for the work.",
                    "Ask what happens if the incentive value changes before installation.",
                    "Keep copies of every document submitted on your behalf.",
                  ]}
                />
              </div>

              <Callout title="How we handle incentives in a proposal" tone="default">
                <p>
                  A Solvanta proposal separates the system price from the incentive treatment, states
                  the assumptions used to value certificates, and documents what happens if the
                  available support changes between quoting and installation.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="disclaimer-title">
        <div className="container">
          <div className="panel panel--flat">
            <div className="pill-row" style={{ marginBottom: "var(--space-4)" }}>
              <Info size={18} aria-hidden="true" />
              <h2 id="disclaimer-title" style={{ fontSize: "var(--step-2)" }}>
                Important disclaimers
              </h2>
            </div>
            <ul className="tick-list">
              {incentiveDisclaimers.map((disclaimer) => (
                <li key={disclaimer}>
                  <ShieldCheck aria-hidden="true" />
                  <span>{disclaimer}</span>
                </li>
              ))}
            </ul>
            <p className="note-inline" style={{ marginTop: "var(--space-4)" }}>
              Information on this page was reviewed on {LAST_REVIEWED} against the sources linked
              above. Program conditions may have changed since. Always confirm with the official
              source before relying on any figure.
            </p>

            <div style={{ marginTop: "var(--space-5)" }}>
              <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                Official sources consulted for this page
              </p>
              <ul className="footer__links">
                <li>
                  <a
                    href="https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Clean Energy Regulator — Small-scale Renewable Energy Scheme
                  </a>
                </li>
                <li>
                  <a
                    href="https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Clean Energy Regulator — Battery rebates are changing 1 May 2026
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.solar.vic.gov.au/programs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Solar Victoria — current program list (example jurisdiction)
                  </a>
                </li>
                <li>
                  <a
                    href="https://cleanenergycouncil.org.au/for-consumers"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Clean Energy Council — consumer guidance and product lists
                  </a>
                </li>
                <li>
                  <a
                    href="https://saaustralia.com.au/accreditation-status-check"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Solar Accreditation Australia — accreditation status check
                  </a>
                </li>
                <li>
                  <a
                    href="https://newenergytech.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    New Energy Tech Consumer Code (NETCC)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.energymadeeasy.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--forest-600)" }}
                  >
                    Energy Made Easy (Australian Energy Regulator) — plan and feed-in comparison
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want help working out what applies to you?"
        body="Tell us your postcode and situation. We will point you to the programs that are worth investigating — and be honest when the answer is that none of them apply."
      />
    </>
  );
}
