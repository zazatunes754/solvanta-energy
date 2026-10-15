import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { Button } from "../components/ui/Button";
import { Media } from "../components/ui/Media";
import { Badge, Callout, Reveal, SectionHeading, TickList } from "../components/ui/primitives";
import { ServiceIcon } from "../components/ui/ServiceIcon";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";

export default function Services() {
  useSeo({
    title: "Solar, battery and monitoring services",
    description:
      "Residential solar installation, home batteries, inverter replacement, hybrid systems, battery upgrades, existing system assessments, monitoring, commercial solar and maintenance — how each engagement works, plus a full guide for every service.",
    path: "/services",
  });

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Services</p>
          <h1>Everything from a first array to a system review.</h1>
          <p className="lede">
            Each service below describes what is actually included, who it suits, and where the
            limits are. Nothing here is deliberately vague — if a service depends on an assessment,
            we say so.
          </p>
          <div className="btn-row">
            <Button to="/contact" variant="primary" withIcon>
              Request an assessment
            </Button>
            <Button to="/solar-estimator" variant="ghost-deep">
              Estimate the numbers first
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-label="Service index">
        <div className="container">
          <ul className="svc-index" style={{ marginTop: 0, listStyle: "none", padding: 0 }}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link className="svc-row" to={`/services/${service.slug}`}>
                  <span className="svc-row__icon">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="svc-row__body">
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                  </span>
                  <span className="svc-row__meta">Full guide</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {services.map((service, index) => {
        const mediaFirst = index % 2 === 1;
        return (
          <section
            className={`section ${index % 2 === 1 ? "on-deep" : ""}`}
            id={service.slug}
            key={service.slug}
            aria-labelledby={`${service.slug}-title`}
          >
            <div className="container">
              <div className="split">
                <div className={`split__body ${mediaFirst ? "split__body--order-2" : ""}`}>
                  <Badge tone={index % 2 === 1 ? "deep" : "lime"}>
                    Service {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <h2 id={`${service.slug}-title`}>{service.title}</h2>
                  <p className="lede" style={index % 2 === 1 ? { color: "var(--text-on-deep-muted)" } : undefined}>
                    {service.tagline}
                  </p>
                  {service.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  <div className="grid-2" style={{ gap: "var(--space-5)", marginTop: "var(--space-4)" }}>
                    <div>
                      <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                        What's included
                      </p>
                      <TickList items={service.includes} />
                    </div>
                    <div>
                      <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                        Well suited to
                      </p>
                      <TickList items={service.goodFor} variant="cross" />
                    </div>
                  </div>

                  {service.note && (
                    <Callout title="Worth knowing" tone={index % 2 === 1 ? "info" : "warn"}>
                      <p>{service.note}</p>
                    </Callout>
                  )}

                  <div className="btn-row">
                    <Button to="/contact" variant={index % 2 === 1 ? "primary" : "dark"} withIcon>
                      Enquire about {service.title.toLowerCase()}
                    </Button>
                    <Link className="arrow-link" to={`/services/${service.slug}`}>
                      Read the full guide
                      <ArrowRight className="btn__icon" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="split__media split__media--tall">
                  <Media src={service.image} alt={service.imageAlt} focus="50% 42%" />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section on-deep" aria-labelledby="services-what-next">
        <div className="container">
          <SectionHeading
            eyebrow="Choosing between services"
            title={<span id="services-what-next">Not sure which one you need?</span>}
            lede="Most enquiries end up in one of four places. This is how we decide together."
          />
          <div className="grid-4" style={{ marginTop: "var(--space-6)" }}>
            {[
              {
                title: "No solar yet",
                body: "Start with residential solar, and decide on storage now or plan the design so it can be added later without rework.",
              },
              {
                title: "Solar, no battery",
                body: "Model the surplus you export against your evening usage. If it stacks up, a battery or a combined upgrade is the next step.",
              },
              {
                title: "Battery, ageing system",
                body: "An assessment first: inverter condition, monitoring and safety come before adding more storage to a system that is struggling.",
              },
              {
                title: "Unclear what you have",
                body: "A system assessment gives you a written picture of the installation, its performance and its priorities.",
              },
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="value-block">
                  <h3 style={{ color: "var(--text-on-deep)" }}>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what you have, and what you want it to do."
        body="Send through your bill, your postcode and a photo of the switchboard if you have one. We will tell you what is worth investigating — including if the answer is 'nothing yet'."
      />
    </>
  );
}
