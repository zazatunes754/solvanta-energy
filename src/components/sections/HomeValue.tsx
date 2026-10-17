import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLink } from "../ui/Button";
import { Figure, Media } from "../ui/Media";
import { SectionHeading } from "../ui/primitives";
import { asset } from "../../lib/asset";

/** Editorial value proposition: sticky editorial column plus numbered list. */
export function Proposition() {
  const points = [
    {
      title: "Start from the bill, not the brochure",
      body: "We estimate annual consumption from your actual bills, then size generation and storage against it. A system that is too small wastes potential; one that is too large wastes money.",
    },
    {
      title: "Explain the trade-offs honestly",
      body: "Feed-in rates are lower than usage rates, batteries taper by capacity under federal rules, and blackout protection depends on wiring. We would rather you understood the trade-off than be surprised later.",
    },
    {
      title: "Leave you able to check our work",
      body: "Every estimate on this site shows the rates, yields and assumptions behind it — including an editable panel in the estimator itself. If a figure looks wrong, you can change it and see the effect.",
    },
  ];

  return (
    <section className="section" aria-labelledby="proposition-title">
      <div className="container">
        <div className="prop">
          <div className="prop__aside">
            <p className="eyebrow">Why Solvanta</p>
            <h2 className="prop__statement" id="proposition-title">
              Energy decisions age better when the reasoning is written down.
            </h2>
            <p className="lede" style={{ fontSize: "var(--step-0)" }}>
              A solar and battery system is a fifteen to twenty year asset. The design conversation
              that precedes it should be just as durable.
            </p>
            <p>
              <ArrowLink to="/about">How we work</ArrowLink>
            </p>
          </div>

          <ol className="num-list">
            {points.map((point) => (
              <li key={point.title}>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Explains what "energy independence" actually means, hour by hour. */
export function Independence() {
  const steps = [
    {
      time: "06:00 – 09:00",
      title: "Morning shoulder",
      body: "Low generation, high household demand. Import is normal here — this is when time-of-use tariffs bite hardest.",
    },
    {
      time: "09:00 – 15:00",
      title: "The earning window",
      body: "Generation peaks. The array covers the house first, then charges storage, then exports whatever is left.",
    },
    {
      time: "15:00 – 21:00",
      title: "The evening peak",
      body: "Generation falls away as demand rises. This is the block a well-sized battery is designed to cover.",
    },
    {
      time: "21:00 – 06:00",
      title: "Overnight",
      body: "Storage carries what is left of the evening, or the grid supplies it — and you decide which, by choosing the size.",
    },
  ];

  return (
    <section className="section on-deep" aria-labelledby="independence-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="stack">
            <p className="eyebrow">Independence, defined</p>
            <h2 className="section-head__title" id="independence-title">
              Independence is not going off-grid. It is deciding when you buy power.
            </h2>
          </div>
          <p className="lede" style={{ color: "var(--text-on-deep-muted)" }}>
            A grid connection keeps your home reliable. Solar and storage change the arithmetic of
            every hour in the day — if they are sized for the hours that actually cost you money.
          </p>
        </div>

        <div className="arc">
          <svg
            className="arc__svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M20 108 C 260 8, 940 8, 1180 108"
              fill="none"
              stroke="rgba(244,241,232,0.24)"
              strokeWidth="2"
            />
            <circle cx="600" cy="21" r="7" fill="var(--gold-400)" />
          </svg>

          <div className="arc__steps">
            {steps.map((step) => (
              <div className="arc__step" key={step.time}>
                <p className="arc__time">{step.time}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: "var(--space-7)" }}>
          <Link to="/solar-estimator" className="arrow-link">
            Model your own day in the estimator
            <ArrowRight className="btn__icon" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Installation process, written as an editorial numbered sequence. */
export function ProcessSection() {
  const steps = [
    {
      title: "Assess",
      body: "We start with consumption data, roof and switchboard photos, shading and your goals. No size is recommended before this step.",
      list: ["Usage and interval data review", "Roof, shading and switchboard check"],
    },
    {
      title: "Design",
      body: "You receive a written design: array layout, equipment specification, expected generation, and the assumptions behind every number.",
      list: ["Specification in writing", "Generation estimate with assumptions"],
    },
    {
      title: "Install",
      body: "Accredited installers complete the work to the applicable standards, with the compliance documentation and grid approvals handled as required.",
      list: ["Accredited installation", "Safety and compliance documentation"],
    },
    {
      title: "Optimise",
      body: "After handover we set up monitoring and review how the system behaves, then look at load shifting and tariff fit.",
      list: ["Monitoring setup and walkthrough", "Load shifting recommendations"],
    },
  ];

  return (
    <section className="section on-deep" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading
          eyebrow="The process"
          title={<span id="process-title">Four stages, in this order, every time.</span>}
          lede="The sequence matters more than the speed. Skipping the assessment is how households end up with a system that never matched their usage."
        />

        <div className="process" style={{ marginTop: "var(--space-7)" }}>
          {steps.map((step) => (
            <div className="process__step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <ul>
                {step.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small helper section that links into the gallery from the home page.
 * Deliberately uses photographs that do not appear in the AustralianHomes
 * editorial section above, so the two photography moments stay distinct. */
export function GalleryPreview() {
  const images = [
    {
      src: asset("/images/sydney-commercial-rooftop-solar.jpg"),
      alt: "Commercial rooftop solar array beside a heritage building in the Sydney CBD",
      caption: "Commercial rooftop",
    },
    {
      src: asset("/images/australian-commercial-solar-car-park-aerial.jpg"),
      alt: "Aerial view of a solar shade structure over a commercial car park in Australia",
      caption: "Car-park shade",
    },
    {
      src: asset("/images/solar-panels-roof-rows.webp"),
      alt: "Solar panels across neighbouring terracotta-tiled residential roofs",
      caption: "Tiled roofs",
    },
    {
      src: asset("/images/solar-panel-macro.webp"),
      alt: "Macro detail of the cell grid on a solar panel surface",
      caption: "Equipment",
    },
  ];

  return (
    <section className="section section--tight" aria-labelledby="gallery-preview-title">
      <div className="container">
        <SectionHeading
          eyebrow="Solutions gallery"
          title={<span id="gallery-preview-title">What these systems look like in practice.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                A reference gallery of technologies and installation styles — clearly labelled as
                inspiration, not as a portfolio of completed customer projects.
              </p>
              <Link className="arrow-link" to="/solutions">
                Open the gallery
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-4)",
            marginTop: "var(--space-6)",
          }}
        >
          {images.map((image) => (
            <figure className="figure figure--zoom" key={image.src} style={{ aspectRatio: "4 / 3" }}>
              <Media src={image.src} alt={image.alt} />
              <figcaption className="figure__overlay">
                <span className="gallery__cat">{image.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Full-width editorial photography section. All three photographs depict real
 * Australian solar installations with documented locations (Canberra ACT,
 * Corinda QLD and Kawana Waters QLD). See ASSET_SOURCES.md.
 */
export function AustralianHomes() {
  return (
    <section className="section on-deep" aria-labelledby="au-homes-title">
      <div className="container">
        <SectionHeading
          eyebrow="Australian homes"
          title={
            <span id="au-homes-title">Solar designed around Australian homes.</span>
          }
          aside={
            <div className="stack">
              <p className="lede" style={{ color: "var(--text-on-deep-muted)" }}>
                Terracotta tiles, corrugated metal, tropical garden canopies, pool fences and
                long shifting roof planes — every Australian roof set is different, and the
                array design starts from what is actually up there.
              </p>
              <Link className="arrow-link" to="/solutions">
                Browse more reference photos
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="stack" style={{ marginTop: "var(--space-6)", gap: "var(--space-4)" }}>
          <Figure
            src={asset("/images/canberra-solar-homes-aerial.jpg")}
            alt="Straight-down aerial view of a Canberra street where most roofs carry solar panel arrays"
            caption="Suburban Canberra — a city with some of the highest rooftop solar penetration in the world. Photograph: Benlisquare, Wikimedia Commons, CC BY-SA 4.0."
            aspect="21 / 10"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            <Figure
              src={asset("/images/brisbane-corinda-queenslander-solar.jpg")}
              alt="Classic Queenslander home in Corinda, Brisbane with solar panels on its corrugated iron roof"
              caption="A corrugated roof on a classic Queenslander, Corinda QLD. Photograph: Kgbo, Wikimedia Commons, CC BY-SA 4.0."
              aspect="4 / 3"
            />
            <Figure
              src={asset("/images/kawana-residential-solar.jpg")}
              alt="Two-storey Australian home at Kawana Waters on the Sunshine Coast with solar panels across its roof"
              caption="Kawana Waters, Sunshine Coast QLD. Photograph: -wuppertaler, Wikimedia Commons, CC BY 4.0."
              aspect="4 / 3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
