import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { site } from "../config/site";
import { Button } from "../components/ui/Button";
import { Callout, Reveal, SectionHeading, TickList } from "../components/ui/primitives";
import { Media } from "../components/ui/Media";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";

const values = [
  {
    title: "Accuracy over enthusiasm",
    body: "If a household's usage does not justify storage, we say so. A smaller, right-sized system that performs is a better outcome than an oversized one that does not.",
  },
  {
    title: "Assumptions in writing",
    body: "Every estimate we produce states its inputs: the usage rate, the generation yield, the self-consumption assumption and the incentive treatment. Numbers without assumptions are marketing.",
  },
  {
    title: "Compliance as standard practice",
    body: "Safety documentation, network approvals and product eligibility are part of the job, not optional extras. They also protect your ability to claim support you are entitled to.",
  },
  {
    title: "Respect for the building",
    body: "Cable routes thought through, roof penetrations sealed properly, equipment placed where it can be serviced. Installation quality is mostly invisible until it fails — so it gets designed in.",
  },
];

const philosophy = [
  "Roof, switchboard and shading are checked before a system size is recommended.",
  "Generation, self-consumption and export are estimated separately, not bundled into one number.",
  "Battery sizing is driven by evening load and surplus, with the capacity taper explained.",
  "Backup capability is discussed before installation, because retrofitting it is harder.",
  "Monitoring is configured so the system's performance can be checked against the model.",
  "Documentation and warranty paths are handed over in writing at completion.",
];

const notDoing = [
  "Quote a savings figure that depends on assumptions we will not disclose.",
  "Promise that you will qualify for a government program or a specific rebate value.",
  "Present stock photography as a portfolio of our own completed installations.",
  "Publish invented statistics, reviews, accreditations or awards.",
  "Rush a signature with scarcity tactics or same-day discounts.",
];

export default function About() {
  useSeo({
    title: "About Solvanta Energy",
    description:
      "How Solvanta Energy approaches solar and battery design: assessment before recommendation, documented assumptions, compliance as standard, and honest limits on what we claim.",
    path: "/about",
  });

  const details = [
    { label: "Legal entity", value: site.legal.entityName },
    { label: "Registered year", value: site.company.foundedYear },
    { label: "ABN", value: site.company.abn },
    { label: "Licence numbers", value: site.company.licenceNumbers.join(", ") },
  ].filter((item) => item.value.trim().length > 0);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">About</p>
          <h1>We would rather explain a system than sell one.</h1>
          <p className="lede">
            Solvanta Energy works with homeowners and businesses on solar, storage and the
            electrification decisions that follow. Our approach is simple: understand the situation
            first, design to the data, and write down the assumptions.
          </p>
          <div className="btn-row">
            <Button to="/contact" variant="primary" withIcon>
              Talk to us about your property
            </Button>
            <Button to="/knowledge-hub" variant="ghost-deep">
              Read our guides
            </Button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-title">
        <div className="container">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">Mission</p>
              <h2 id="mission-title">
                Make energy decisions that still look sensible in fifteen years.
              </h2>
              <p className="lede">
                Australia has some of the best rooftop solar conditions in the world and a
                fast-moving incentive landscape. Both of those facts make good advice more valuable
                — and bad advice more expensive.
              </p>
              <p>
                Our mission is to make the decision legible. That means modelling generation and
                consumption honestly, explaining where value actually comes from (self-consumption,
                not feed-in rates), and preparing for changes — an electric vehicle, a heat pump, a
                battery added in three years.
              </p>
              <p className="pull-quote">
                A system that is designed around your data will outperform a larger system designed
                around someone else's marketing.
              </p>
              <p>
                We also believe the customer should be able to audit our work. That is why the
                estimator on this site shows its assumptions, why our articles link to official
                sources, and why our incentive information is dated rather than presented as
                permanent.
              </p>
            </div>
            <div className="split__media split__media--tall">
              <Media
                src="/images/modern-home-1.webp"
                alt="Angled view of the exterior of a contemporary home with deep eaves and large glazing"
                focus="50% 40%"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section on-deep" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title={<span id="values-title">Four commitments we can be held to.</span>}
            lede="These are not values statements on a wall. Each one shows up in how a proposal is written and how a job is finished."
          />
          <div className="grid-4" style={{ marginTop: "var(--space-6)" }}>
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className="value-block">
                  <h3 style={{ color: "var(--text-on-deep)" }}>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="philosophy-title">
        <div className="container">
          <div className="prop">
            <div className="prop__aside">
              <p className="eyebrow">Installation philosophy</p>
              <h2 id="philosophy-title" style={{ fontSize: "var(--step-3)" }}>
                Good installations are decisions made early.
              </h2>
              <p className="lede" style={{ fontSize: "var(--step-0)" }}>
                Almost everything that goes wrong with a solar or battery installation was decided
                weeks before anyone climbed on the roof.
              </p>
              <p className="note-inline">
                Specification and sizing detail in any proposal we issue is tied to an assessment of
                the specific property — not a standard package.
              </p>
            </div>
            <div>
              <TickList items={philosophy} />

              <h2 style={{ fontSize: "var(--step-2)", marginTop: "var(--space-8)" }}>
                What we will not do
              </h2>
              <p className="muted" style={{ marginBottom: "var(--space-4)" }}>
                A short list, because it is easier to trust a business that draws its own lines.
              </p>
              <TickList items={notDoing} variant="cross" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="who-title">
        <div className="container">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">Accountability</p>
              <h2 id="who-title" style={{ fontSize: "var(--step-3)" }}>
                Who you are dealing with.
              </h2>
              <p>
                A system is designed by someone who has reviewed your consumption data and roof,
                installed by licensed trades working to the applicable standards, and supported
                afterwards through the monitoring platform and the warranty paths documented at
                handover.
              </p>
              <p>
                Where a proposal includes work by a partner installer, we tell you who is completing
                it and who holds the responsibility for the workmanship. You should never have to
                guess who to call.
              </p>
              {details.length > 0 ? (
                <ul className="assumption-list" style={{ marginTop: "var(--space-5)" }}>
                  {details.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Callout title="Company details" tone="info">
                  <p>
                    Registration, licence and entity details are configured in one place
                    (<code>src/config/site.ts</code>) and will display here once they are added —
                    nothing is invented to fill the space in the meantime.
                  </p>
                </Callout>
              )}
            </div>
            <div className="split__media">
              <Media
                src="/images/electrician-work.webp"
                alt="Technician working on wiring inside an open electrical control cabinet"
                focus="50% 45%"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="estimates-title">
        <div className="container">
          <SectionHeading
            eyebrow="Estimates, pricing and suitability"
            title={
              <span id="estimates-title">How we estimate, and when we advise against buying.</span>
            }
            lede="Every number we publish has a listed input, and every recommendation has a reason — including the recommendations not to spend money."
          />
          <div className="grid-2" style={{ marginTop: "var(--space-6)", gap: "var(--space-6)" }}>
            <div className="panel">
              <p className="eyebrow">Estimating</p>
              <h3 style={{ fontSize: "var(--step-1)", marginBlock: "var(--space-3)" }}>
                Estimates show their inputs, not just their conclusions.
              </h3>
              <ul className="tick-list">
                <li>
                  Consumption, roof factor, orientation and shading are stated openly rather than
                  buried inside one optimistic headline number.
                </li>
                <li>
                  Results are given as ranges — weather, prices and household behaviour move, and a
                  single precise figure would be false precision.
                </li>
                <li>
                  Incentive treatment is dated and conditional, because programs change; the
                  treatment applied to any quote is written on the quote.
                </li>
                <li>
                  The online estimator is a model with published assumptions. A proposal replaces it
                  with an assessment of your actual property.
                </li>
              </ul>
            </div>
            <div className="panel">
              <p className="eyebrow">Pricing and suitability</p>
              <h3 style={{ fontSize: "var(--step-1)", marginBlock: "var(--space-3)" }}>
                Prices map to the work, not to a package.
              </h3>
              <ul className="tick-list">
                <li>
                  Hardware, mounting, electrical work, cable runs and monitoring are itemised against
                  what the site actually needs.
                </li>
                <li>
                  Compliance work — network approvals, safety documentation and program paperwork —
                  is priced as part of the job, not an optional extra.
                </li>
                <li>
                  Where site conditions could change the scope, that is flagged before you sign
                  rather than billed as a surprise.
                </li>
                <li>
                  Financing is labelled as financing; it is never folded into a headline discount.
                </li>
              </ul>
            </div>
          </div>
          <Callout title="The situations where the honest answer is smaller" tone="warn">
            <p>
              Storage when there is no evening load to shift. An array sized for exports rather than
              self-use. Replacing a working inverter on age alone, with no fault and no
              compatibility reason. If the data does not support the upgrade, we say so — and where
              it does support it, we show which numbers carry the case.
            </p>
          </Callout>
          <div className="btn-row" style={{ marginTop: "var(--space-6)" }}>
            <Link className="arrow-link" to="/services">
              See what we do — nine services explained
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
            <Link className="arrow-link" to="/solar-estimator">
              Put your own numbers through the estimator
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
            <Link className="arrow-link" to="/contact">
              What happens after an enquiry
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="panel" style={{ display: "grid", gap: "var(--space-4)" }}>
            <div className="pill-row">
              <Info size={18} aria-hidden="true" />
              <h2 style={{ fontSize: "var(--step-2)" }}>
                Independent, and clear about what that means
              </h2>
            </div>
            <p style={{ maxWidth: "72ch" }}>
              We are an independent business. We are not a government agency, we do not administer
              any rebate program, and we cannot determine your eligibility for one. Where we link to
              official information, we link to the source so you can verify it yourself — including
              when the news is that a program has closed.
            </p>
            <div className="btn-row">
              <Link className="arrow-link" to="/solar-rebates">
                How incentives actually work
                <ExternalLink className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ask us the awkward questions first."
        body="Whether a battery is worth it, whether your roof is suitable, whether the incentives apply to your situation — start there, and the design gets easier."
      />
    </>
  );
}
