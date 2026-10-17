import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Callout, SectionHeading } from "../ui/primitives";
import { ServiceIcon } from "../ui/ServiceIcon";

/**
 * Additional home-page sections that turn the front page into a full
 * introduction to residential solar: how it works, the components, costs,
 * trade-offs and the decision paths into the rest of the site.
 *
 * (Sections on grid-versus-battery, performance factors and sizing that used
 * to live here were consolidated into the knowledge hub articles they
 * duplicate — see /knowledge-hub/solar-panels-or-battery-first,
 * /knowledge-hub/orientation-and-shading and /knowledge-hub/choosing-system-size.)
 */

/* ---------------------------------------------------------------------------
 * How solar works — from sunlight to the switchboard
 * ------------------------------------------------------------------------- */

const flowSteps = [
  {
    title: "Sunlight",
    text: "Light reaches the panels — direct sun, or diffuse light through cloud. Panels convert light, not heat.",
  },
  {
    title: "DC electricity",
    text: "The photovoltaic cells produce direct current (DC), flowing through the panels into the wiring.",
  },
  {
    title: "Inversion",
    text: "The inverter converts DC into the alternating current (AC) your home and the grid use, tracking the array's best operating point.",
  },
  {
    title: "Distribution",
    text: "Each kilowatt hour goes to the house first, then to a battery if fitted, then out to the grid as an export.",
  },
  {
    title: "Your meter",
    text: "The meter records what came in and what went out. Those two flows — imports and exports — are what your bill and feed-in credit are built from.",
  },
];

const destinations = [
  {
    title: "Used at home",
    body: "Displaces grid power at the full retail rate — the most valuable kilowatt hour of the three.",
  },
  {
    title: "Stored in a battery",
    body: "Moves generation into the evening, when imports would otherwise be at their most expensive.",
  },
  {
    title: "Exported to the grid",
    body: "Credited at your plan's feed-in rate — usually a fraction of what you pay to import.",
  },
];

/**
 * How solar works, end to end — with the component guide folded in as a
 * tabbed panel, so the front page explains both the system and its parts in
 * one place.
 */
export function HowSolarWorks() {
  const [active, setActive] = useState(components[0].id);
  const current = components.find((item) => item.id === active) ?? components[0];

  return (
    <section className="section on-deep" aria-labelledby="how-solar-works-title">
      <div className="container">
        <SectionHeading
          eyebrow="From sunlight to socket"
          title={
            <span id="how-solar-works-title">
              How a home solar system actually works, end to end.
            </span>
          }
          aside={
            <div className="stack">
              <p className="lede">
                Five steps take daylight from your roof to your switchboard. Understanding
                them makes every quote, app screen and bill easier to read.
              </p>
              <Link className="arrow-link" to="/knowledge-hub/how-solar-panels-work">
                The full explanation
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <ol className="flow" style={{ marginTop: "var(--space-6)" }}>
          {flowSteps.map((step, index) => (
            <li className="flow__step" key={step.title}>
              <span className="flow__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="grid-3" style={{ marginTop: "var(--space-7)" }}>
          {destinations.map((item) => (
            <div className="value-block" key={item.title}>
              <h3 style={{ color: "var(--text-on-deep)" }}>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <div
          className="panel"
          style={{
            marginTop: "var(--space-8)",
            display: "grid",
            gap: "var(--space-3)",
            maxWidth: "84ch",
          }}
        >
          <p className="eyebrow">What you're actually buying</p>
          <h3 style={{ fontSize: "var(--step-2)" }}>Four components, four sets of decisions.</h3>
          <p className="lede">
            A solar system is panels, an inverter, optional storage and a monitoring layer —
            and each one changes the outcome differently. Pick a component to see what
            matters and where the guides go deeper.
          </p>
          <div className="tabs" role="group" aria-label="System components" style={{ marginTop: "var(--space-2)" }}>
            {components.map((item) => (
              <button
                key={item.id}
                type="button"
                className="tab"
                aria-pressed={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gap: "var(--space-3)",
              marginTop: "var(--space-3)",
            }}
          >
            <p className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <ServiceIcon name={current.icon} size={16} />
              {current.label}
            </p>
            <h3>{current.title}</h3>
            <p className="lede">{current.body}</p>
            <ul className="tick-list">
              {current.points.map((point) => (
                <li key={point}>
                  <ArrowRight aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link className="arrow-link" to={current.to}>
              {current.linkLabel}
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Component guide — panels, inverters, batteries, monitoring
 * ------------------------------------------------------------------------- */

const components = [
  {
    id: "panels",
    label: "Panels",
    icon: "sun",
    title: "Solar panels turn light into direct current",
    body: "The panel is the part people picture, but its headline numbers matter less than how the array is laid out around your roof's shade, orientation and condition. Panel efficiency buys roof area; it does not change what the roof faces.",
    points: [
      "Compare watts per square metre and the performance warranty, not just wattage.",
      "Degradation is normal, gradual, and defined in the warranty — usually a fraction of a percent per year.",
      "Shade on one panel can pull down a whole string; layout is the remedy.",
    ],
    to: "/services/residential-solar",
    linkLabel: "Residential solar installation",
  },
  {
    id: "inverters",
    label: "Inverters",
    icon: "zap",
    title: "The inverter is the system's conversion hub",
    body: "It turns DC into household AC, tracks the array's operating point, enforces safety functions like anti-islanding protection, and reports the data your monitoring app shows. It is usually the first major component a system needs help with.",
    points: [
      "String, optimised, micro and hybrid inverters suit different roofs and plans.",
      "Hybrid models prepare the system for a battery later — worth it only if storage is genuinely likely.",
      "Most modern inverters include monitoring; check what the app will actually show.",
    ],
    to: "/services/inverter-upgrades",
    linkLabel: "Inverter replacement and upgrades",
  },
  {
    id: "batteries",
    label: "Batteries",
    icon: "battery",
    title: "Storage moves generation into the evening",
    body: "A battery absorbs daytime surplus that would otherwise be exported cheaply, and returns it when the house would otherwise import at full retail rates. Its usefulness comes from two different ratings: how much energy it stores (kWh) and how fast it can deliver it (kW).",
    points: [
      "Usable capacity and round-trip efficiency decide the energy actually delivered.",
      "Continuous and peak power ratings decide which appliances it can run, including motor surges.",
      "Value depends on the gap between your import and export prices — not on the brochure.",
    ],
    to: "/services/home-batteries",
    linkLabel: "Home battery installation",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: "activity",
    title: "Monitoring is how the system stays honest",
    body: "Generation, consumption, imports, exports and battery flows — good monitoring turns the system from a black box into something you can verify and adjust. It is also the early-warning system that catches faults while they are still cheap.",
    points: [
      "Whole-home consumption views need metering hardware; confirm what is included.",
      "Alerts for underperformance are worth more than pretty dashboards.",
      "Monitoring finds the savings: load shifting, tariff changes and schedule fixes.",
    ],
    to: "/services/monitoring-optimisation",
    linkLabel: "Monitoring and optimisation",
  },
];

/* ---------------------------------------------------------------------------
 * Costs and savings — what moves the price, what moves the savings
 * ------------------------------------------------------------------------- */

export function CostAndSavings() {
  return (
    <section className="section" aria-labelledby="cost-savings-title">
      <div className="container">
        <SectionHeading
          eyebrow="Costs, savings and trade-offs"
          title={<span id="cost-savings-title">The honest numbers — price, savings and limits.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Two different questions get blurred together in solar marketing. The price of
                installing is one calculation; the savings afterwards are another, shaped by
                tariffs, behaviour and weather. Both deserve honest numbers — as do the limits.
              </p>
              <Link className="arrow-link" to="/knowledge-hub/solar-payback-explained">
                How payback really works
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="grid-2" style={{ marginTop: "var(--space-6)", gap: "var(--space-6)" }}>
          <div className="panel">
            <h3>What moves the installation price</h3>
            <ul className="tick-list" style={{ marginTop: "var(--space-4)" }}>
              {[
                "System size — more panels, more mounting, more labour.",
                "Equipment tier — panels, inverter and battery models with genuinely different specifications.",
                "Roof complexity — pitch, access, tile versus metal, number of planes.",
                "Electrical scope — switchboard capacity, protection, cable runs, metering changes.",
                "Storage — a battery roughly doubles the hardware scope of a typical residential job.",
                "Region and scheduling — labour markets and travel differ across the country.",
                "Incentives — federal certificates and any state support reduce the net price; their conditions belong in writing.",
              ].map((item) => (
                <li key={item}>
                  <ArrowRight aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel panel--flat">
            <h3>What moves the savings afterwards</h3>
            <ul className="tick-list" style={{ marginTop: "var(--space-4)" }}>
              {[
                "Your import rates — a higher price per kWh makes every self-consumed kilowatt hour more valuable.",
                "Self-consumption — the share of generation used on site rather than exported.",
                "The feed-in rate — what your plan pays for exports, always below your import price.",
                "Load shifting — timers and habits (pool, hot water, laundry, EV) move flexible use into daylight.",
                "Weather and season — year-to-year variation is why estimates are ranges.",
                "Tariff choice — the right plan multiplies the value of the same hardware.",
                "Storage — a battery changes the split between used, stored and exported, for better or worse.",
              ].map((item) => (
                <li key={item}>
                  <ArrowRight aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Callout title="Estimates are models — quotes are commitments" tone="info">
          <p>
            Any savings figure depends on assumptions about rates, weather and behaviour, and no
            honest provider guarantees an outcome. What a provider can commit to is the
            specification, the standard of work and the price. Demand those in writing, and treat
            the savings projection as the planning tool it is — with its assumptions shown.
          </p>
        </Callout>

        <div className="grid-2" style={{ marginTop: "var(--space-8)", gap: "var(--space-6)" }}>
          <div>
            <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
              Where solar excels
            </p>
            <ul className="tick-list">
              {[
                "Reduces daytime grid imports for decades with almost no moving parts.",
                "Predictable output across a year: regional yields change little from one decade to the next.",
                "Hedges against future electricity price rises for every kilowatt hour self-consumed.",
                "Lowers exposure to summer peak pricing, especially with west-facing panels.",
                "With storage, provides measured protection from outages and lets flexible loads run on your own generation.",
                "Shields the roof beneath the panels and adds a documented asset to the property.",
              ].map((item) => (
                <li key={item}>
                  <ArrowRight aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
              Where its limits are
            </p>
            <ul className="tick-list cross-list">
              {[
                "Generates nothing at night and less in winter, cloud and smoke — the grid or a battery covers those hours.",
                "Exports are paid well below retail rates, so generation without a use earns little.",
                "The daily supply charge survives every installation; no system makes a bill disappear.",
                "Not every roof suits: heavy shade, poor orientation and ageing coverings change the maths.",
                "A battery is not guaranteed to improve financial returns — it depends on your prices and habits.",
                "Twenty years of performance depends on installation quality, not just product brands.",
              ].map((item) => (
                <li key={item}>
                  <ArrowRight aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Decision paths into the rest of the site
 * ------------------------------------------------------------------------- */

const paths = [
  {
    title: "I don't have solar yet",
    body: "Start with your consumption and roof. The estimator gives you working numbers in minutes, and the sizing guide shows the method behind them.",
    links: [
      { label: "Estimate your savings range", to: "/solar-estimator" },
      { label: "How to choose a system size", to: "/knowledge-hub/choosing-system-size" },
      { label: "What residential installation involves", to: "/services/residential-solar" },
    ],
  },
  {
    title: "I have solar and I'm considering a battery",
    body: "The question is what happens to your surplus and what you pay in the evening. Model both, read the storage explainer, then decide.",
    links: [
      { label: "Run the solar vs solar-plus-battery comparison", to: "/solar-estimator" },
      { label: "How a home battery actually works", to: "/knowledge-hub/how-solar-batteries-work" },
      { label: "The battery installation service", to: "/services/home-batteries" },
    ],
  },
  {
    title: "I'm not sure what my system is doing",
    body: "A written assessment replaces guesswork: generation data reviewed, hardware inspected, findings ranked by risk and value.",
    links: [
      { label: "Existing system assessments", to: "/services/system-assessments" },
      { label: "Maintenance, cleaning and lifespan", to: "/knowledge-hub/cleaning-maintenance-lifespan" },
      { label: "Send us what you know", to: "/contact" },
    ],
  },
];

export function DecisionPaths() {
  return (
    <section className="section" aria-labelledby="decision-paths-title">
      <div className="container">
        <SectionHeading
          eyebrow="Where to go next"
          title={<span id="decision-paths-title">Three paths, depending on where you are.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Most visitors arrive at one of three starting points. Each has a natural next
                step — free, in writing, and without a sales visit.
              </p>
            </div>
          }
        />

        <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
          {paths.map((path) => (
            <div className="panel" key={path.title}>
              <h3 style={{ fontSize: "var(--step-2)" }}>{path.title}</h3>
              <p style={{ marginTop: "var(--space-3)" }}>{path.body}</p>
              <ul className="footer__links" style={{ marginTop: "var(--space-4)" }}>
                {path.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to} style={{ color: "var(--forest-600)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "var(--space-5)" }}>
          <span className="note-inline">
            <Calculator size={14} aria-hidden="true" style={{ marginRight: 6, verticalAlign: "-2px" }} />
            The estimator uses the same published assumptions as every number quoted on this
            site — open the assumptions panel and check them.
          </span>
        </p>
      </div>
    </section>
  );
}
