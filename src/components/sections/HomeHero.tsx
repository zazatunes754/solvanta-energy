import { ArrowRight, BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Media } from "../ui/Media";
import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/primitives";
import { asset } from "../../lib/asset";

const marqueeItems = [
  "Rooftop solar design",
  "Hybrid inverter systems",
  "Home battery storage",
  "Existing system reviews",
  "Energy monitoring",
  "Load shifting",
  "Commercial rooftops",
  "Incentive paperwork",
];

export function HomeHero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container container--wide">
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">Solar · Storage · Independence</p>
              <h1 className="hero__title" id="hero-title">
                Make every ray of sunshine <em>work harder</em>.
              </h1>
              <p className="hero__lede">
                Solvanta Energy designs solar and battery systems for Australian homes and
                businesses — sized from your real consumption, explained in plain English, and
                modelled with assumptions you can actually read.
              </p>
              <div className="btn-row">
                <Button to="/solar-estimator" variant="primary" size="lg" withIcon>
                  Estimate your savings
                </Button>
                <Button to="/contact" variant="ghost-deep" size="lg">
                  Request an assessment
                </Button>
              </div>
              <p className="note-inline" style={{ color: "var(--text-on-deep-muted)" }}>
                No obligation. The estimator runs entirely in your browser — nothing is sent
                anywhere until you choose to send it.
              </p>
            </div>

            <div className="hero__media">
              <Media
                src={asset("/images/kawana-buddina-solar.jpg")}
                alt="Modern two-storey Australian home at Kawana Waters, Queensland, with a large rooftop solar array under a blue sky"
                priority
                focus="52% 38%"
              />
              <p className="hero__credit">
                Kawana Waters, QLD · Photo: -wuppertaler, Wikimedia Commons, CC BY 4.0
              </p>
              <dl className="hero__readout">
                <div>
                  <dt>Rebates</dt>
                  <dd>Checked against official sources</dd>
                </div>
                <div>
                  <dt>Estimates</dt>
                  <dd>Assumptions shown in full</dd>
                </div>
                <div>
                  <dt>Coverage</dt>
                  <dd>Australian enquiries welcome</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="hero__strip">
          <div className="container container--wide">
            <div className="hero__strip-inner">
              <Reveal>
                <div className="hero__fact">
                  <BadgeCheck aria-hidden="true" />
                  <p>
                    <strong>An assessment before a proposal</strong>
                    We look at consumption, roof and switchboard before recommending a system size.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="hero__fact">
                  <FileText aria-hidden="true" />
                  <p>
                    <strong>Numbers you can interrogate</strong>
                    Usage rates, generation yield and incentive treatment are stated, not implied.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="hero__fact">
                  <ShieldCheck aria-hidden="true" />
                  <p>
                    <strong>Compliance taken seriously</strong>
                    Installation and documentation follow the applicable standards and network
                    rules.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="band">
        <Marquee items={marqueeItems} />
      </div>
    </>
  );
}

/** Closing call to action used at the end of most pages. */
export function CtaBand({
  title = "Start with an assessment, not a sales pitch.",
  body = "Tell us about your property and your bill. We will come back with a proposed design, the reasoning behind it, and the assumptions we used — so you can judge it properly.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner">
        <div className="stack">
          <p className="eyebrow">Next step</p>
          <h2 id="cta-band-title">{title}</h2>
          <p className="lede" style={{ color: "var(--text-on-deep-muted)" }}>
            {body}
          </p>
        </div>
        <div className="btn-row">
          <Button to="/contact" variant="primary" size="lg" withIcon>
            Request an assessment
          </Button>
          <Button to="/solar-estimator" variant="ghost-deep" size="lg">
            Run the estimator
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Compact band linking to the knowledge hub — used between heavy sections. */
export function KnowledgeNudge() {
  return (
    <section className="section section--tight" aria-labelledby="knowledge-nudge-title">
      <div className="container">
        <div
          className="panel"
          style={{
            display: "grid",
            gap: "var(--space-5)",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            alignItems: "center",
          }}
        >
          <div className="stack">
            <h2 id="knowledge-nudge-title" style={{ fontSize: "var(--step-2)" }}>
              Not ready to talk numbers yet?
            </h2>
            <p className="muted" style={{ maxWidth: "60ch" }}>
              The knowledge hub explains how batteries work, how the federal capacity taper affects
              larger systems, and the questions worth asking any installer before you sign.
            </p>
          </div>
          <Link className="arrow-link" to="/knowledge-hub">
            Visit the knowledge hub
            <ArrowRight className="btn__icon" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
