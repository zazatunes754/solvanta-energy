import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { currency, number } from "../../lib/format";
import { estimate } from "../../lib/estimator";
import {
  batteryBounds,
  billBounds,
} from "../../lib/estimator";
import { stateOptions, type StateCode } from "../../data/estimatorAssumptions";
import { faqs, featuredFaqIds } from "../../data/faqs";
import { featuredArticles } from "../../data/articles";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { Field, SelectInput } from "../ui/Field";
import { Media } from "../ui/Media";
import { SectionHeading } from "../ui/primitives";

/**
 * Mini version of the savings estimator. It runs exactly the same calculation
 * as the full estimator page, so a visitor can see real numbers immediately
 * and then carry their inputs across for the detailed breakdown.
 */
export function EstimatorPreview() {
  const [state, setState] = useState<StateCode>("VIC");
  const [bill, setBill] = useState(650);
  const [wantsBattery, setWantsBattery] = useState(true);
  const [batteryKwh, setBatteryKwh] = useState(13.5);

  const result = useMemo(
    () =>
      estimate({
        state,
        propertyType: "residential",
        quarterlyBill: bill,
        hasSolar: false,
        existingSolarKw: 0,
        wantsBattery,
        batteryKwh: wantsBattery ? batteryKwh : 0,
        daytimeProfile: "mixed",
        roofFactor: "good",
      }),
    [state, bill, wantsBattery, batteryKwh],
  );

  const query = new URLSearchParams({
    state,
    bill: String(bill),
    battery: wantsBattery ? String(batteryKwh) : "0",
  }).toString();

  return (
    <section className="section section--tight" aria-labelledby="estimator-preview-title">
      <div className="container">
        <SectionHeading
          eyebrow="Savings estimator"
          title={<span id="estimator-preview-title">A first estimate, with the workings shown.</span>}
          aside={
            <p className="lede">
              Two inputs is enough for an indicative answer. The full estimator adds roof
              suitability, daytime usage, existing-system options and the complete assumption panel.
            </p>
          }
        />

        <div className="est-layout" style={{ marginTop: "var(--space-6)" }}>
          <div className="est-form">
            <Field
              id="preview-state"
              label="Where is the property?"
              hint="Used to select the regional generation yield, usage rate and feed-in assumption."
            >
              <SelectInput
                id="preview-state"
                value={state}
                onChange={(value) => setState(value as StateCode)}
                options={stateOptions}
              />
            </Field>

            <Field
              id="preview-bill"
              label="Average quarterly electricity bill"
              hint={`Between ${currency(billBounds.min)} and ${currency(billBounds.max)}. A rough figure is fine.`}
            >
              <div className="field__prefix">
                <span aria-hidden="true">$</span>
                <input
                  id="preview-bill"
                  className="field__control"
                  type="number"
                  inputMode="decimal"
                  min={billBounds.min}
                  max={billBounds.max}
                  step={10}
                  value={bill}
                  onChange={(event) =>
                    setBill(
                      Math.max(
                        billBounds.min,
                        Math.min(billBounds.max, Number(event.target.value) || 0),
                      ),
                    )
                  }
                />
              </div>
            </Field>

            <fieldset className="est-fieldset">
              <legend>Storage</legend>
              <div className="chips">
                <label className="chip">
                  <input
                    type="radio"
                    name="preview-battery"
                    checked={!wantsBattery}
                    onChange={() => setWantsBattery(false)}
                  />
                  <span>Solar only</span>
                </label>
                <label className="chip chip--lime">
                  <input
                    type="radio"
                    name="preview-battery"
                    checked={wantsBattery}
                    onChange={() => setWantsBattery(true)}
                  />
                  <span>Solar with battery</span>
                </label>
              </div>

              {wantsBattery && (
                <div className="range-row" style={{ marginTop: "var(--space-4)" }}>
                  <div className="range-row__top">
                    <label className="field__label" htmlFor="preview-battery-size">
                      Battery size considered
                    </label>
                    <output className="range-row__value" htmlFor="preview-battery-size">
                      {number(batteryKwh, 1)} kWh
                    </output>
                  </div>
                  <input
                    id="preview-battery-size"
                    type="range"
                    min={batteryBounds.min}
                    max={batteryBounds.max}
                    step={0.5}
                    value={batteryKwh}
                    onChange={(event) => setBatteryKwh(Number(event.target.value))}
                  />
                </div>
              )}
            </fieldset>

            <div className="btn-row">
              <Button to={`/solar-estimator?${query}`} variant="dark" withIcon>
                Open the full estimator
              </Button>
              <Link className="arrow-link" to="/solar-rebates">
                Incentive rules
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="est-result">
            <div className="est-card">
              <h3 style={{ fontSize: "var(--step-1)", marginBottom: "var(--space-4)" }}>
                Indicative annual saving
              </h3>
              <div className="est-hero-metric">
                <span className="est-hero-metric__value">
                  {currency(result.savingsLow)} – {currency(result.savingsHigh)}
                </span>
                <span className="est-hero-metric__label">per year, modelled range</span>
              </div>
              <dl className="est-metrics">
                <div className="est-metric">
                  <dt>Suggested array</dt>
                  <dd>
                    {number(result.systemKw, 1)} kW
                    <small>from your bill and roof factor</small>
                  </dd>
                </div>
                <div className="est-metric">
                  <dt>Self-consumption</dt>
                  <dd>
                    {number(result.selfConsumptionPct)}%
                    <small>generation used on site</small>
                  </dd>
                </div>
                <div className="est-metric">
                  <dt>Assumed usage rate</dt>
                  <dd>
                    {currency(result.retailRate, 2)}
                    <small>per kWh, editable later</small>
                  </dd>
                </div>
                <div className="est-metric">
                  <dt>CO₂e avoided</dt>
                  <dd>
                    {number(result.co2AvoidedTonnes, 2)} t
                    <small>per year, indicative</small>
                  </dd>
                </div>
              </dl>
              <p className="note-inline" style={{ color: "var(--text-on-deep-muted)", marginTop: "var(--space-4)" }}>
                Indicative modelling only, not a quotation. Assumptions are listed in full in the
                calculator and can be changed there.
              </p>
            </div>

            <div className="result-empty">
              <Calculator size={18} aria-hidden="true" style={{ marginBottom: "0.4rem" }} />
              <p>
                The full estimator breaks this into direct use, battery throughput, exports and
                imports — and shows the payback arithmetic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** FAQ items shared with the FAQ page, rendered in the merged section below. */
const faqItems = featuredFaqIds
  .map((id) => faqs.find((faq) => faq.id === id))
  .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq))
  .map((faq) => ({
    id: faq.id,
    heading: faq.question,
    content: (
      <>
        {faq.answer.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {faq.link && (
          <p>
            {faq.link.external ? (
              <a href={faq.link.to} target="_blank" rel="noopener noreferrer">
                {faq.link.label}
              </a>
            ) : (
              <Link to={faq.link.to}>{faq.link.label}</Link>
            )}
          </p>
        )}
      </>
    ),
  }));

/** Knowledge hub articles plus the most-asked questions, in one section. */
export function KnowledgePreview() {
  return (
    <section className="section" aria-labelledby="knowledge-title">
      <div className="container">
        <SectionHeading
          eyebrow="Knowledge hub"
          title={<span id="knowledge-title">Read the reasoning before the quote.</span>}
          aside={
            <Link className="arrow-link" to="/knowledge-hub">
              All articles
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
          }
        />

        <div className="article-grid" style={{ marginTop: "var(--space-6)" }}>
          {featuredArticles.map((article) => (
            <article className="article-card" key={article.slug}>
              <Link to={`/knowledge-hub/${article.slug}`} className="article-card__media">
                <Media src={article.heroImage} alt={article.heroAlt} />
              </Link>
              <p className="article-card__meta">
                <span>{article.category}</span>
                <span>{article.readingMinutes} min read</span>
              </p>
              <h3>
                <Link to={`/knowledge-hub/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.dek}</p>
              <Link className="arrow-link" to={`/knowledge-hub/${article.slug}`}>
                Read the article
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="prop" style={{ marginTop: "var(--space-8)" }}>
          <div className="prop__aside">
            <p className="eyebrow">Questions, answered</p>
            <h2 id="faq-preview-title" style={{ fontSize: "var(--step-3)" }}>
              What people ask before they commit.
            </h2>
            <p className="lede" style={{ fontSize: "var(--step-0)" }}>
              Short, direct answers — including the ones that make a purchase less attractive. Every
              question is available on the FAQ page, grouped by topic.
            </p>
            <p>
              <Link className="arrow-link" to="/faq">
                All frequently asked questions
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </p>
          </div>

          <Accordion items={faqItems} defaultOpenIds={[featuredFaqIds[0]]} ariaLabel="Frequently asked questions" />
        </div>
      </div>
    </section>
  );
}
