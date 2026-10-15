import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { federalPrograms } from "../../data/incentives";
import { estimatorAssumptions } from "../../data/estimatorAssumptions";
import { Badge, SectionHeading } from "../ui/primitives";
import { Media } from "../ui/Media";
import { ServiceIcon } from "../ui/ServiceIcon";
import { Button } from "../ui/Button";

/** Featured service plus an index of the rest, so cards are never repetitive. */
export function ServicesPreview() {
  const [feature, ...rest] = services;

  return (
    <section className="section" aria-labelledby="services-preview-title">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="services-preview-title">Nine services, one design methodology.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                From a first rooftop array to upgrading storage on a system that is already earning,
                each engagement starts in the same place: your consumption data and your roof.
              </p>
              <Link className="arrow-link" to="/services">
                See all services in detail
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="svc-feature" style={{ marginTop: "var(--space-7)" }}>
          <div className="svc-feature__media">
            <Media
              src={feature.image}
              alt={feature.imageAlt}
              focus="50% 40%"
            />
          </div>
          <div className="stack">
            <Badge tone="lime">Most requested</Badge>
            <h3 style={{ fontSize: "var(--step-3)" }}>{feature.title}</h3>
            <p className="lede">{feature.tagline}</p>
            <p>{feature.body[0]}</p>
            <div className="btn-row">
              <Button to="/services" variant="dark" withIcon>
                Explore this service
              </Button>
              <Button to="/solar-estimator" variant="ghost">
                Model the numbers
              </Button>
            </div>
          </div>
        </div>

        <div className="svc-index">
          {rest.map((service) => (
            <Link className="svc-row" to="/services" key={service.slug}>
              <span className="svc-row__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <span className="svc-row__body">
                <h3>{service.title}</h3>
                <p>{service.short}</p>
              </span>
              <span className="svc-row__meta">Service</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Battery deep-dive with the verified federal capacity taper. */
export function BatterySection() {
  const tiers = estimatorAssumptions.batteryTiers;

  return (
    <section className="section on-deep" aria-labelledby="battery-title">
      <div className="container">
        <div className="split">
          <div className="split__body">
            <p className="eyebrow">Home batteries</p>
            <h2 id="battery-title">Storage is a sizing problem before it is a shopping problem.</h2>
            <p className="lede" style={{ color: "var(--text-on-deep-muted)" }}>
              A battery earns its place by covering the hours when your household imports expensive
              power. That depends on your surplus, your evening load and your tariff — not on the
              largest capacity available.
            </p>

            <div className="tier-cards">
              {tiers.map((tier) => (
                <div className="tier" key={tier.label}>
                  <div>
                    <p className="tier__label">{tier.label}</p>
                    <p className="tier__range">{tier.note}</p>
                  </div>
                  <p className="tier__pct">{Math.round(tier.factor * 100)}%</p>
                </div>
              ))}
            </div>

            <p className="note-inline" style={{ color: "var(--text-on-deep-muted)" }}>
              Federal battery support now tapers by installed capacity. Support applies from the
              first 0–14 kWh at the full STC factor, then reduces. Verified against the Clean Energy
              Regulator on 15 October 2026 —{" "}
              <a
                href={estimatorAssumptions.tierSource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--lime-400)", textDecoration: "underline" }}
              >
                read the official change notice
              </a>
              .
            </p>

            <div className="btn-row">
              <Button to="/solar-rebates" variant="primary" withIcon>
                Understand the incentives
              </Button>
              <Button to="/services" variant="ghost-deep">
                Battery installation service
              </Button>
            </div>
          </div>

          <div className="split__media split__media--tall">
            <Media
              src="/images/home-battery-wall.webp"
              alt="Modular home battery units mounted on a wall beneath an inverter in a garage"
              focus="50% 35%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Incentive overview — factual, dated and clearly linked to sources. */
export function IncentivesSection() {
  return (
    <section className="section" aria-labelledby="incentives-title">
      <div className="container">
        <SectionHeading
          eyebrow="Rebates & incentives"
          title={<span id="incentives-title">Government support, described without the sales gloss.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Solar and battery incentives in Australia are delivered through certificate schemes
                and state programs. They change — so every figure here is dated, sourced and
                linked.
              </p>
              <Link className="arrow-link" to="/solar-rebates">
                Full rebates and eligibility guide
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="grid-3" style={{ marginTop: "var(--space-7)" }}>
          {federalPrograms.map((program) => (
            <article className="value-block" key={program.id}>
              <div className="pill-row">
                <Badge tone={program.status === "open" ? "lime" : "gold"}>
                  {program.status === "open" ? "Open" : "Check status"}
                </Badge>
                <Badge>{program.appliesTo}</Badge>
              </div>
              <h3>{program.name}</h3>
              <p>{program.summary}</p>
              <p className="note-inline">
                <span className="status-dot" aria-hidden="true" />
                Verified {program.lastVerified} · {program.administrator}
              </p>
              <a
                className="arrow-link"
                href={program.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official source
                <ExternalLink className="btn__icon" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <p className="note-inline" style={{ marginTop: "var(--space-6)" }}>
          Solvanta Energy is not affiliated with any government program. Eligibility is determined
          by the program administrator, and support values depend on the certificate market and
          your installation date.
        </p>
      </div>
    </section>
  );
}
