import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "../ui/Button";
import { Callout, SectionHeading } from "../ui/primitives";
import { ServiceIcon } from "../ui/ServiceIcon";

/**
 * Additional home-page sections that turn the front page into a full
 * introduction to residential solar: how it works, the components, grid
 * versus battery, performance factors, sizing, costs, trade-offs and the
 * decision paths into the rest of the site.
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

export function HowSolarWorks() {
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

export function ComponentGuide() {
  const [active, setActive] = useState(components[0].id);
  const current = components.find((item) => item.id === active) ?? components[0];

  return (
    <section className="section" aria-labelledby="component-guide-title">
      <div className="container">
        <SectionHeading
          eyebrow="What you're actually buying"
          title={
            <span id="component-guide-title">Four components, four sets of decisions.</span>
          }
          aside={
            <div className="stack">
              <p className="lede">
                A solar system is panels, an inverter, optional storage and a monitoring layer —
                and each one changes the outcome differently. Pick a component to see what
                matters and where the guides go deeper.
              </p>
            </div>
          }
        />

        <div className="tabs" role="group" aria-label="System components" style={{ marginTop: "var(--space-5)" }}>
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
          className="panel"
          style={{
            marginTop: "var(--space-5)",
            display: "grid",
            gap: "var(--space-3)",
            maxWidth: "84ch",
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
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Grid-connected vs battery-backed
 * ------------------------------------------------------------------------- */

const gridVsBattery = [
  {
    aspect: "Where daytime generation goes",
    grid: "Straight into the house, then exported to the grid once the house is served.",
    battery: "Into the house first, then stored for the evening, then exported only if surplus remains.",
  },
  {
    aspect: "Evening supply",
    grid: "From the grid, at whatever your plan charges in those hours.",
    battery: "From stored daytime generation, displacing the most expensive imports of the day.",
  },
  {
    aspect: "Power during an outage",
    grid: "None — anti-islanding protection shuts the system down for safety.",
    battery: "Possible, when backup circuits are wired deliberately at installation.",
  },
  {
    aspect: "Upfront cost",
    grid: "Lower — generation hardware only.",
    battery: "Higher — storage roughly doubles the hardware scope for a typical home.",
  },
  {
    aspect: "Best suited to",
    grid: "High daytime usage, limited evening load, limited budget or an uncertain long-term plan.",
    battery: "Large cheap exports, heavy evening use, outage priorities, or electrification plans.",
  },
];

export function GridOrBattery() {
  return (
    <section className="section" aria-labelledby="grid-vs-battery-title">
      <div className="container">
        <SectionHeading
          eyebrow="Panels alone, or panels plus storage"
          title={<span id="grid-vs-battery-title">Grid-connected solar, or solar with a battery.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Both are grid-connected systems — the question is what happens after the sun
                sets. The honest comparison comes down to five practical differences.
              </p>
              <Link className="arrow-link" to="/knowledge-hub/solar-panels-or-battery-first">
                Which order should you invest in?
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="table-wrap" tabIndex={0} style={{ marginTop: "var(--space-6)" }}>
          <table className="data">
            <caption>
              How the two configurations differ in practice — economics depend on your tariff,
              roof and usage
            </caption>
            <thead>
              <tr>
                <th scope="col">Consideration</th>
                <th scope="col">Solar connected to the grid</th>
                <th scope="col">Solar plus a home battery</th>
              </tr>
            </thead>
            <tbody>
              {gridVsBattery.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                    {row.aspect}
                  </th>
                  <td>{row.grid}</td>
                  <td>{row.battery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="note-inline" style={{ marginTop: "var(--space-4)" }}>
          A battery is not automatically better than exporting: it depends on the gap between
          what you are paid for exports and what you pay for imports.{" "}
          <Link to="/solar-estimator" style={{ color: "var(--forest-600)", textDecoration: "underline" }}>
            The estimator models both cases
          </Link>{" "}
          with your own inputs.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * What affects performance
 * ------------------------------------------------------------------------- */

const performanceFactors = [
  {
    title: "Orientation and tilt",
    body: "North is the classic best case, east and west shift generation to morning or afternoon, and a split array widens the day. Tilt matters less than most people expect between 15° and 35°.",
  },
  {
    title: "Shade",
    body: "The quiet underperformer. A small shadow can cost more than its physical share, because panels in a string work together. Season matters: trees and buildings move their shadows through the year.",
  },
  {
    title: "Weather and season",
    body: "Cloud reduces output rather than stopping it, and southern winters cut daily generation while raising consumption. Annual figures are what a system is sized for — not a single June.",
  },
  {
    title: "Temperature",
    body: "Panels are rated at 25°C cell temperature and lose a little efficiency as they heat. A cool, clear day can outperform a heatwave; inverter derating matters in hot weather too.",
  },
  {
    title: "Soiling",
    body: "Dust, pollen, bird droppings and coastal salt block light until wind and rain clear them. Most locations self-clean adequately; monitoring tells you when they do not.",
  },
  {
    title: "System design and monitoring",
    body: "String layout around shade, an inverter matched to the array, and monitoring that surfaces a fault early decide how much of the theoretical output you actually keep.",
  },
];

export function PerformanceFactors() {
  return (
    <section className="section" aria-labelledby="performance-factors-title">
      <div className="container">
        <SectionHeading
          eyebrow="Performance"
          title={<span id="performance-factors-title">What changes what your system generates.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Two identical systems can generate different amounts for twenty years. These six
                factors explain most of the difference — and five of them are decided before
                anything is installed.
              </p>
              <Link className="arrow-link" to="/knowledge-hub/orientation-and-shading">
                Orientation and shading, in depth
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </div>
          }
        />

        <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
          {performanceFactors.map((factor) => (
            <div className="value-block" key={factor.title}>
              <h3>{factor.title}</h3>
              <p>{factor.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Consumption and sizing
 * ------------------------------------------------------------------------- */

const sizingSteps = [
  {
    step: "Establish annual consumption",
    detail: "Sum four quarterly bills in kWh if that is what you have.",
    better: "Better: download interval (half-hourly) data from your retailer or network portal.",
  },
  {
    step: "Estimate the roof's yield",
    detail: "Broadly 1,200–1,650 kWh per kW per year across Australia, by region.",
    better: "Adjust down for shade and orientation with a roof factor (0.8–1.0).",
  },
  {
    step: "Match generation to consumption",
    detail: "Divide consumption by yield for a starting array size.",
    better: "Then refine for timing: how much you use while the sun is up.",
  },
  {
    step: "Adjust for the future",
    detail: "A planned battery or EV raises the useful array size.",
    better: "So does electrifying heating or hot water — tell the designer the plan.",
  },
];

export function SizingAndConsumption() {
  return (
    <section className="section section--tight" aria-labelledby="sizing-title">
      <div className="container">
        <SectionHeading
          eyebrow="Consumption and capacity"
          title={<span id="sizing-title">Choose the system size from your usage, not a catalogue.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                System size should fall out of four inputs: how much you use, what your roof
                yields, when you use power, and what is coming next. Here is the method in
                miniature.
              </p>
              <div className="btn-row">
                <Button to="/solar-estimator" variant="dark" withIcon>
                  Estimate your numbers
                </Button>
                <Button to="/knowledge-hub/choosing-system-size" variant="ghost">
                  The full sizing guide
                </Button>
              </div>
            </div>
          }
        />

        <div className="table-wrap" tabIndex={0} style={{ marginTop: "var(--space-5)" }}>
          <table className="data">
            <caption>
              The four sizing inputs — and how to improve each one before requesting quotes
            </caption>
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col">A usable starting point</th>
                <th scope="col">The better version</th>
              </tr>
            </thead>
            <tbody>
              {sizingSteps.map((row) => (
                <tr key={row.step}>
                  <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                    {row.step}
                  </th>
                  <td>{row.detail}</td>
                  <td>{row.better}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Costs and savings — what moves the price, what moves the savings
 * ------------------------------------------------------------------------- */

export function CostAndSavings() {
  return (
    <section className="section" aria-labelledby="cost-savings-title">
      <div className="container">
        <SectionHeading
          eyebrow="Costs and savings"
          title={<span id="cost-savings-title">What drives the price — and what drives the savings.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Two different questions get blurred together in solar marketing. The price of
                installing is one calculation; the savings afterwards are another, shaped by
                tariffs, behaviour and weather. Both deserve honest numbers.
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
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Advantages and limitations
 * ------------------------------------------------------------------------- */

export function ProsAndCons() {
  return (
    <section className="section on-deep" aria-labelledby="pros-cons-title">
      <div className="container">
        <SectionHeading
          eyebrow="A balanced view"
          title={<span id="pros-cons-title">Where solar excels, and where it has limits.</span>}
          aside={
            <div className="stack">
              <p className="lede">
                Solar is a strong investment in many households and a marginal one in some. Both
                halves of that sentence deserve equal billing — starting with the honest
                limitations.
              </p>
            </div>
          }
        />

        <div className="grid-2" style={{ marginTop: "var(--space-6)", gap: "var(--space-6)" }}>
          <div>
            <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
              Where it excels
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
