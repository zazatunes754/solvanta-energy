/**
 * ---------------------------------------------------------------------------
 * KNOWLEDGE HUB CONTENT
 * ---------------------------------------------------------------------------
 * Articles are structured as typed blocks so the renderer stays simple and the
 * content stays editable. Written by the Solvanta Energy editorial team — no
 * invented authors, credentials, statistics or endorsements.
 *
 * Every factual claim about government programs or industry schemes should
 * carry a source in the article's `sources` list. Illustrative figures must be
 * labelled as illustrations of the maths, not product or price claims.
 * ---------------------------------------------------------------------------
 */

import type { ContentBlock, ContentSource } from "./contentTypes";
import { asset } from "../lib/asset";

export type ArticleBlock = ContentBlock;
export type ArticleSource = ContentSource;

export type ArticleCategory =
  | "Solar basics"
  | "System design"
  | "Batteries"
  | "Performance"
  | "Costs & payback"
  | "Buying well"
  | "Incentives"
  | "Maintenance & safety";

export type Article = {
  slug: string;
  title: string;
  /** Short summary used on cards and in meta descriptions. */
  dek: string;
  category: ArticleCategory;
  readingMinutes: number;
  published: string;
  updated: string;
  heroImage: string;
  heroAlt: string;
  blocks: ArticleBlock[];
  sources: ArticleSource[];
  /** Slugs of related articles, shown in the sidebar. */
  related?: string[];
  /** Slugs of related services, shown in the sidebar. */
  relatedServices?: string[];
};

export const articles: Article[] = [
  {
    slug: "how-solar-batteries-work",
    title: "How a home solar battery actually works",
    dek: "Chemistry, inverters, usable capacity and the difference between power and energy — explained without the sales language.",
    category: "Batteries",
    readingMinutes: 8,
    published: "2026-08-12",
    updated: "2026-10-15",
    heroImage: asset("/images/home-battery-wall.webp"),
    heroAlt: "Home battery modules and an inverter mounted on a wall beside a switchboard",
    blocks: [
      {
        type: "p",
        text: "A home battery does one simple job: it moves electricity from the time it was generated to the time you want to use it. Everything else — the chemistry, the inverter, the app — exists to make that move safe, efficient and measurable.",
      },
      { type: "h2", text: "The five parts of the system" },
      {
        type: "ul",
        items: [
          "Battery modules: the cells that store energy, usually lithium iron phosphate (LiFePO4) for stationary home storage, or nickel manganese cobalt (NMC) in some products.",
          "Battery management system (BMS): monitors cell voltage, temperature and current, and protects the pack from conditions that shorten its life.",
          "Inverter or hybrid inverter: converts direct current (DC) from the panels and battery into alternating current (AC) for your home, and back again for storage.",
          "Metering and monitoring: measures what is generated, imported, exported and stored — the data that makes optimisation possible.",
          "Protection and isolation: circuit protection, isolation points and ventilation or clearance arrangements required by the relevant Australian installation standards.",
        ],
      },
      {
        type: "callout",
        title: "Standards and installation matter as much as the product",
        tone: "info",
        text: "Battery installation in Australia is governed by installation standards and state electrical safety requirements that set out clearances, ventilation, signage, protection and documentation. The current edition of the applicable standards and your installer's accreditation are the authority here — not a product brochure.",
      },
      { type: "h2", text: "Energy versus power — the two numbers that get confused" },
      {
        type: "p",
        text: "Capacity is measured in kilowatt hours (kWh) and describes how much energy the battery can store. Power output is measured in kilowatts (kW) and describes how much can flow at any instant. A battery with plenty of kWh but modest kW may be unable to start a large load, while a high-power battery with small capacity will empty quickly.",
      },
      {
        type: "p",
        text: "Two further figures change the usefulness of the headline number. Usable capacity is what remains after the depth-of-discharge limit, which many manufacturers set between 90% and 100% for LiFePO4 products but which can be lower. Round-trip efficiency is how much energy you get back out compared with what you put in — typically in the order of 85% to 95% for modern systems once conversion losses are counted.",
      },
      {
        type: "table",
        caption: "Example: a battery with 10 kWh of nameplate capacity",
        head: ["Figure", "Illustrative value", "What it means for you"],
        rows: [
          ["Nameplate capacity", "10 kWh", "The marketing number on the specification sheet"],
          ["Usable capacity at 90% DoD", "9 kWh", "What you can actually draw before the BMS limits output"],
          ["Round-trip efficiency at 90%", "8.1 kWh", "Energy delivered to the house after losses"],
        ],
      },
      {
        type: "p",
        text: "That example is an illustration of the maths, not a product claim. Every product has its own datasheet — the point is to compare products on usable energy delivered, not on the largest number in the brochure.",
      },
      { type: "h2", text: "AC-coupled or DC-coupled?" },
      {
        type: "p",
        text: "A DC-coupled battery connects to a hybrid inverter, sharing the conversion equipment with the solar array. This is common on new installations and can be slightly more efficient because there are fewer conversions.",
      },
      {
        type: "p",
        text: "An AC-coupled battery has its own inverter and sits alongside whatever solar inverter you already own. It is the usual choice when retrofitting storage to an existing system, particularly where the original inverter is in good condition but is not hybrid-capable.",
      },
      { type: "h2", text: "What backup power really involves" },
      {
        type: "p",
        text: "During a blackout, a grid-connected solar system must shut down unless it has specific anti-islanding protection and backup capability. This is a safety requirement: the network must not be energised by your system while crews are working on it.",
      },
      {
        type: "p",
        text: "A battery with backup capability can supply a dedicated backup circuit — or, with suitable equipment and capacity, the whole house. What you can run depends on continuous and peak power ratings and on which circuits were wired into the backup path. If outage protection matters, decide that before installation, because it changes the wiring design.",
      },
      { type: "h2", text: "What shortens a battery's life" },
      {
        type: "ul",
        items: [
          "Frequent deep cycling, especially in hot conditions.",
          "High ambient temperatures — placement in a hot garage or in direct western sun is a design decision, not a detail.",
          "Extended time spent at very high or very low state of charge.",
          "Poor ventilation or crowded mounting that traps heat.",
        ],
      },
      {
        type: "p",
        text: "This is why reputable manufacturers publish warranted throughput limits and cycle counts, and why placement and ventilation are part of the design conversation rather than the installation morning.",
      },
      { type: "h2", text: "How to judge whether storage is worth it for you" },
      {
        type: "ol",
        items: [
          "Look at how much energy you export and what you are paid for it.",
          "Look at how much you import in the evening and overnight, and what you pay for it.",
          "Estimate what share of that evening import a battery of a given size could realistically cover.",
          "Compare the installed cost after any incentives against that annual value.",
        ],
      },
      {
        type: "p",
        text: "Our savings estimator does exactly this arithmetic and shows every assumption it uses, so you can see which input changes the outcome most for your household.",
      },
      {
        type: "takeaways",
        items: [
          "Capacity (kWh) is how much energy a battery stores; power (kW) is how quickly it can deliver it. Both decide what jobs it can do.",
          "Usable capacity and round-trip efficiency mean delivered energy is always less than the nameplate figure.",
          "DC-coupled suits new builds; AC-coupled suits most retrofits onto existing solar.",
          "Backup power depends on wiring and peak ratings, and is planned before installation — not after.",
          "Heat, deep cycling and placement influence lifespan as much as the brand on the box.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Regulator — Cheaper Home Batteries Program",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "Federal program rules and battery STC calculator",
      },
      {
        label: "Solar Victoria — Solar Battery Buyers Guide",
        url: "https://www.solar.vic.gov.au/solar-battery-buyers-guide",
        note: "Independent buyer guidance on storage",
      },
      {
        label: "Solar Victoria — What you need to know about backup power",
        url: "https://www.solar.vic.gov.au/what-you-need-know-about-backup-power",
        note: "Explanation of battery backup design",
      },
    ],
    related: ["battery-capacity-vs-power", "solar-during-outages", "solar-panels-or-battery-first"],
    relatedServices: ["home-batteries"],
  },
  {
    slug: "solar-panels-or-battery-first",
    title: "Solar panels first, or battery first?",
    dek: "The order of investment changes the economics. Here is how to reason about it using your own bill.",
    category: "System design",
    readingMinutes: 7,
    published: "2026-09-02",
    updated: "2026-10-15",
    heroImage: asset("/images/solar-panels-roof-rows.webp"),
    heroAlt: "Solar panels covering the pitched, tiled roofs of nearby houses",
    blocks: [
      {
        type: "p",
        text: "A battery without solar has nothing to store. But a battery added years after solar is a perfectly normal upgrade, and for many households it is the better sequence — provided the original system was designed with that in mind.",
      },
      { type: "h2", text: "The one number that decides it: your export profile" },
      {
        type: "p",
        text: "If you already have solar, look at how much you export during the day and what your feed-in tariff pays. When a household exports a large share of generation at a few cents per kWh while paying many times that for evening power, storage has an obvious job to do. When a household already self-consumes most of its generation because someone is home all day, the value of storage is much smaller.",
      },
      {
        type: "p",
        text: "If you do not have solar yet, the same logic applies in advance: estimate how much of your usage happens in daylight, and how much will be left in the evening.",
      },
      { type: "h2", text: "When panels first is the better call" },
      {
        type: "ul",
        items: [
          "Your daytime usage is high — heating and cooling, pool pumps, working from home.",
          "Your roof is suitable and your bill is large enough that generation has somewhere to go.",
          "You want the fastest improvement in your bill for the smallest upfront commitment.",
          "You are not yet sure whether you will stay in the property long enough to justify storage.",
        ],
      },
      { type: "h2", text: "When storage first makes sense" },
      {
        type: "ul",
        items: [
          "You already export heavily at a low feed-in rate.",
          "You have significant evening and overnight usage, often with time-of-use pricing.",
          "Outage protection is a priority — a battery is the only way to keep power on.",
          "You are electrifying heating, hot water or a vehicle and want to shift that load into your own generation.",
        ],
      },
      {
        type: "callout",
        title: "Design for the battery you may add later",
        tone: "info",
        text: "If a battery is likely within a few years, tell the designer now. Switchboard space, inverter choice, cable routes and the location of the battery all cost far less to plan upfront than to retrofit. You do not have to buy storage today to be ready for it.",
      },
      { type: "h2", text: "Sizing: the mistake in both directions" },
      {
        type: "p",
        text: "Undersized storage leaves cheap self-consumption on the table. Oversized storage is capital sitting idle, particularly now that federal support tapers by capacity — the first 14 kWh of a battery attract the strongest support, and the marginal benefit falls away above 28 kWh.",
      },
      {
        type: "p",
        text: "A defensible starting point is to size the array to your annual consumption and the battery to your evening and overnight usage, then check the result against a year of actual data before committing.",
      },
      { type: "h2", text: "Sequencing and incentives" },
      {
        type: "p",
        text: "Federal battery support is tied to the installation date and the program's current rules, and it is designed to work alongside solar — new or existing. State programs change more often than federal ones. If your decision is marginal, the honest advice is to model both scenarios with current prices rather than assume that waiting will produce a better outcome; support rates for both panels and batteries are generally declining over time.",
      },
      {
        type: "takeaways",
        items: [
          "Storage value comes from the gap between a low feed-in rate and a high evening import rate.",
          "Panels first suits high daytime usage; storage first suits export-heavy households with big evening loads.",
          "Installing \"battery-ready\" costs little at the time and a lot to retrofit.",
          "Federal battery support tapers by capacity, so the first kilowatt hours of storage carry the strongest support.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Regulator — Battery rebates are changing 1 May 2026",
        url: "https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026",
        note: "Capacity tiers and installation-date rules",
      },
      {
        label: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "How STCs work for solar panels",
      },
    ],
    related: ["how-solar-batteries-work", "solar-payback-explained", "battery-capacity-vs-power"],
    relatedServices: ["solar-and-battery", "home-batteries"],
  },
  {
    slug: "understanding-solar-and-battery-incentives",
    title: "Understanding solar and battery incentives in Australia",
    dek: "What small-scale technology certificates are, how the federal battery program changed in May 2026, and the traps to avoid when comparing quotes.",
    category: "Incentives",
    readingMinutes: 9,
    published: "2026-09-20",
    updated: "2026-10-15",
    heroImage: asset("/images/electricity-meter.webp"),
    heroAlt: "A row of electricity meters mounted on a wall",
    blocks: [
      {
        type: "p",
        text: "Australian solar incentives are not a government cheque that arrives in the post. They are certificates, created when an eligible system is installed and then traded. In practice, the installer calculates the certificates your system earns, subtracts their value from your invoice, and handles the paperwork. That single mechanism explains most of what follows.",
      },
      { type: "h2", text: "Step one: small-scale technology certificates" },
      {
        type: "p",
        text: "The Small-scale Renewable Energy Scheme issues small-scale technology certificates (STCs) for eligible installations. For solar panels, the number of certificates depends on the system's capacity, its zone rating (which reflects how much sun your region receives) and the remaining deeming period — the number of years left until the scheme's scheduled end in 2030.",
      },
      {
        type: "p",
        text: "Because the deeming period shortens every year, the same size system earns fewer certificates over time. That is a structural reason why waiting is rarely rewarded.",
      },
      { type: "h2", text: "Step two: support for home batteries" },
      {
        type: "p",
        text: "The Cheaper Home Batteries Program extends certificate-based support to eligible battery installations. From 1 May 2026, the certificate factor tapers according to how much capacity is installed:",
      },
      {
        type: "table",
        caption: "Cheaper Home Batteries Program — capacity taper from 1 May 2026",
        head: ["Installed capacity band", "STC factor applied"],
        rows: [
          ["0 to 14 kWh (inclusive)", "100%"],
          ["Above 14 to 28 kWh (inclusive)", "60%"],
          ["Above 28 to 50 kWh (inclusive)", "15%"],
        ],
      },
      {
        type: "callout",
        title: "Installation date, not contract date",
        tone: "warn",
        text: "The regulator has stated that rebates are determined by the installation date, not when a contract is signed — and has warned retailers against promising installations before a rule change unless they are certain the work can be completed in time. If a quote depends on beating a deadline, get that in writing with the consequences spelled out.",
      },
      { type: "h2", text: "Step three: what your state or territory adds" },
      {
        type: "p",
        text: "State and territory programs are where most of the variation lives. Some are rebates with income and property tests, some are interest-free loans, and some are targeted at specific groups. Programs close, reopen and change their values, and a program that was available last year may not accept applications now — Victoria's interest-free battery loan, for example, is closed to new applications, even though the state's solar panel rebate remains available to eligible households.",
      },
      {
        type: "p",
        text: "This is why we link to the official page for each jurisdiction rather than a summary: a summary is out of date the moment the rules change.",
      },
      { type: "h2", text: "The eligibility factors that actually matter" },
      {
        type: "ol",
        items: [
          "Ownership and occupancy — many programs are limited to owner-occupiers, with separate categories for rentals or apartments.",
          "Household income and property value thresholds, where the program applies them.",
          "Whether the address has previously received support for the same technology.",
          "Whether the products are on the program's eligible product list.",
          "Whether the installer is accredited and engaged through an approved retailer.",
          "Whether the required documentation and photographs are submitted correctly.",
        ],
      },
      { type: "h2", text: "Five traps when comparing quotes" },
      {
        type: "ol",
        items: [
          "A quoted discount that assumes a certificate price the retailer has not locked in.",
          "A total price that only holds if you complete a portal application by a deadline nobody has explained.",
          "Battery capacity quoted as nameplate kWh while the support calculation uses eligible capacity after the taper.",
          "Savings figures presented without stating the assumed usage rate, feed-in tariff or self-consumption.",
          "Claims that you 'definitely qualify' — no installer can make that determination; the program administrator does.",
        ],
      },
      {
        type: "p",
        text: "None of this means incentives are not worth pursuing. It means the quote you compare should show the specification, the assumptions, the incentive treatment and the conditions in writing — and it should tell you what happens if the incentive value changes before your installation is completed.",
      },
      {
        type: "takeaways",
        items: [
          "STCs are certificates created at installation and discounted from the invoice — not cash payments to you.",
          "The deeming period shortens each year, so the same panels earn fewer certificates the longer you wait.",
          "From 1 May 2026, battery support tapers by capacity and depends on the installation date, not the contract date.",
          "State and territory programs vary widely and can close — verify against the official page, never a summary.",
          "No installer can promise eligibility; the program administrator decides.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Regulator — Battery rebates are changing 1 May 2026",
        url: "https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026",
        note: "Capacity taper, installation-date rule and regulator warnings",
      },
      {
        label: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "Certificate eligibility and deeming",
      },
      {
        label: "Solar Victoria — Solar panel (PV) rebate",
        url: "https://www.solar.vic.gov.au/solar-panel-rebate",
        note: "Example of state eligibility criteria and process",
      },
      {
        label: "Solar Victoria — Solar battery loans (closed)",
        url: "https://www.solar.vic.gov.au/solar-battery-loan",
        note: "Example of a program that no longer accepts applications",
      },
    ],
    related: ["comparing-quotes", "solar-payback-explained", "solar-panels-or-battery-first"],
    relatedServices: ["home-batteries", "residential-solar"],
  },
  {
    slug: "questions-to-ask-an-installer",
    title: "Twelve questions to ask before you choose an installer",
    dek: "The questions that separate a considered proposal from a sales pitch — and the answers that should make you pause.",
    category: "Buying well",
    readingMinutes: 7,
    published: "2026-09-28",
    updated: "2026-10-15",
    heroImage: asset("/images/install-crew-panels.webp"),
    heroAlt: "Installer working on a solar panel array on a metal roof, tools and cable beside them",
    blocks: [
      {
        type: "p",
        text: "Most disputes in residential solar come down to expectations that were never written down: what the system would generate, what the savings would be, who handles a warranty claim, and what happens if something fails. These questions are designed to surface those expectations before you sign.",
      },
      { type: "h2", text: "On the design" },
      {
        type: "ol",
        items: [
          "What are you basing the system size on — my actual usage data, or an assumption? A serious proposal references your consumption, not a standard package.",
          "What generation do you expect, and what assumptions produced that figure? Ask for the specific yield assumption.",
          "How will the system be laid out, and what happens with shading? Ask what time of day shading affects each plane.",
          "What happens to my daytime surplus — self-consumed, stored, or exported at what rate?",
        ],
      },
      { type: "h2", text: "On the equipment" },
      {
        type: "ol",
        items: [
          "Exactly which panel, inverter and battery models are quoted, and why those? Model numbers, not brand names.",
          "What are the warranty terms, including whether labour is covered and who you contact first? Manufacturer warranties and installer workmanship warranties are different things.",
          "Is the inverter hybrid-capable, or would a battery later require additional equipment?",
        ],
      },
      { type: "h2", text: "On the paperwork and compliance" },
      {
        type: "ol",
        items: [
          "What documentation will I receive at handover? Expect certificates of electrical safety where required, compliance paperwork, monitoring access and product documentation.",
          "How are incentives handled in the price, and what happens if the value changes before installation?",
          "What grid approvals are needed in my area, who lodges them, and how long do they take?",
        ],
      },
      { type: "h2", text: "On the after-sales reality" },
      {
        type: "ol",
        items: [
          "What does monitoring show me, and who reviews it if output drops?",
          "If a component fails in year four, what is the process and the typical timeframe?",
        ],
      },
      {
        type: "callout",
        title: "Answers that should give you pause",
        tone: "warn",
        text: "A guaranteed savings figure with no assumptions. A promise that you will definitely receive a rebate. Pressure to sign today to lock in a price or a program. No written specification. Refusal to put generation assumptions in writing. A quote that is dramatically cheaper than every other quote for an identical specification.",
      },
      { type: "h2", text: "A practical comparison method" },
      {
        type: "p",
        text: "Put each quote into the same four-column table: specification (panel, inverter, battery, mounting, monitoring), expected generation with its assumption, installed price and incentive treatment, and warranty and service terms. Compare the tables, not the brochures. Where a quote cannot fill in a column, that is itself information.",
      },
      {
        type: "p",
        text: "Finally, check accreditation directly with the relevant industry body or program list rather than relying on a logo in a proposal, and confirm that any product quoted appears on the eligible product list for the program whose support is included in the price.",
      },
      {
        type: "takeaways",
        items: [
          "Demand consumption-based reasoning, model numbers and written assumptions.",
          "Warranties come in layers — workmanship, product, performance — and the quote should name who covers what.",
          "Incentive treatment and its conditions belong in writing, including what happens if values change.",
          "Guaranteed savings figures and signing pressure are warnings, not features.",
          "Compare specification tables, not brochures — and verify accreditation independently.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — Find an accredited installer",
        url: "https://www.cleanenergycouncil.org.au/consumers/find-an-installer",
        note: "Accreditation checks and consumer guidance",
      },
      {
        label: "Solar Victoria — Top 5 questions to ask a solar retailer",
        url: "https://www.solar.vic.gov.au/questions-retailer",
        note: "Government-published retailer questions",
      },
      {
        label: "Solar Victoria — How to choose a good solar or hot water retailer",
        url: "https://www.solar.vic.gov.au/choose-a-good-retailer",
        note: "Consumer protection guidance",
      },
    ],
    related: ["comparing-quotes", "common-purchasing-mistakes", "warranties-explained"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "how-solar-panels-work",
    title: "How solar panels actually work",
    dek: "The photovoltaic effect, cells, strings, temperature and shade — the engineering behind the panels on your roof, explained for people who have to buy them.",
    category: "Solar basics",
    readingMinutes: 7,
    published: "2026-05-14",
    updated: "2026-10-15",
    heroImage: asset("/images/solar-panel-macro.webp"),
    heroAlt: "Close-up of the cell structure on the surface of a modern solar panel",
    blocks: [
      {
        type: "p",
        text: "Most solar quotes describe panels with three numbers — brand, wattage and warranty — and leave the rest to confidence. Understanding a little of what happens inside the glass makes those numbers far easier to judge, and makes it harder for a weak product to hide behind a good story.",
      },
      { type: "h2", text: "The photovoltaic effect, in plain words" },
      {
        type: "p",
        text: "A solar cell is a sandwich of silicon with carefully arranged electrical properties. When light strikes the cell, it frees electrons, and the cell's internal structure makes those electrons flow in one direction — creating a direct current (DC). No moving parts, no fuel: light in, electricity out.",
      },
      {
        type: "p",
        text: "Two practical consequences follow. First, panels work in daylight, not only in blazing sun — diffuse light through cloud still generates, just less. Second, output is proportional to the strength of the light reaching the cells, which is why every design decision about orientation, tilt and shade is really a decision about how much light lands where.",
      },
      { type: "h2", text: "From cell to array" },
      {
        type: "ul",
        items: [
          "Cells — the individual silicon wafers that do the conversion, wired together inside the panel.",
          "Panel (module) — cells laminated under glass with a frame, sealed against weather. Most residential panels contain around sixty to seventy cells; the exact configuration varies by product.",
          "String — panels wired in series, adding their voltages together. The inverter tracks each string's operating point to extract the most power available.",
          "Array — all the strings together. Shade or a fault in one panel of a string can drag down the whole string's output, which is why string layout around shade matters more than the number of panels quoted.",
        ],
      },
      { type: "h2", text: "What actually determines how much a panel makes" },
      {
        type: "ul",
        items: [
          "Irradiance — how intense the sunlight is at your location, which varies by region, season and time of day.",
          "Orientation and tilt — how squarely the panel faces the sun over the course of a day and a year.",
          "Temperature — panel ratings are measured at a cell temperature of 25°C. Real panels in real sun run hotter, and heat slightly reduces efficiency, which is part of why output does not scale linearly with how hot and sunny a day feels.",
          "Shade — even partial shading across a string can cut output disproportionately, depending on how the panels and electronics are arranged.",
          "Soiling — dust, pollen, salt and bird droppings all block light until wind and rain clear them.",
          "Age — output declines gradually over decades, and that decline is what the performance warranty is written around.",
        ],
      },
      { type: "h2", text: "The panel technologies you will see quoted" },
      {
        type: "p",
        text: "Nearly all residential panels are silicon. Marketing names — PERC, TOPCon, HJT and others — describe the cell architecture and manufacturing process, and their practical differences show up in three places: how much power a panel produces per square metre, how it behaves in heat, and the degradation rate written into its warranty.",
      },
      {
        type: "ul",
        items: [
          "Bifacial panels collect light on both faces and can yield more on reflective surfaces or elevated mounting — the gain depends on how they are installed, not on the label.",
          "Thin-film products exist but are uncommon in residential rooftop work in Australia.",
          "Two panels of the same wattage can differ in physical size; watts per square metre is the figure that matters when roof area is limited.",
        ],
      },
      {
        type: "callout",
        title: "Efficiency matters most when roof area is scarce",
        tone: "info",
        text: "If your roof has room for a comfortably oversized array, paying a premium for the highest-efficiency panels rarely pays back — the extra output available from simply adding one more mid-range panel can exceed the efficiency gain. Where roof area is tight, higher efficiency earns its keep because it is the only way to fit more watts into the available space.",
      },
      { type: "h2", text: "What this means when comparing quotes" },
      {
        type: "ol",
        items: [
          "Compare total array size and the physical area it occupies, not panel count alone.",
          "Read the performance warranty: guaranteed output after 25 years and maximum annual degradation are the numbers manufacturers actually stake money on.",
          "Check that the product appears on the eligible list for any incentive program included in the price.",
          "Ask how the panels will be laid out around shade — the string design matters as much as the panel model.",
        ],
      },
      { type: "h2", text: "What panels cannot do" },
      {
        type: "ul",
        items: [
          "They generate nothing at night, and little under heavy cloud — storage or the grid covers those hours.",
          "They cannot ignore shade; a panel in shadow pulls down more than its own share unless per-panel electronics are used.",
          "They do not keep the house powered during a blackout without a battery and backup wiring — anti-islanding protection requires a standard grid-connected system to shut down.",
          "They do not last forever at full output; degradation is normal, gradual and priced into the warranty.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Panels convert light to DC electricity — the inverter converts it to household AC.",
          "Daylight, not direct sun, is what generates; more light simply means more output.",
          "Heat, shade and soiling quietly reduce real-world output below nameplate ratings.",
          "Watts per square metre and degradation terms are the honest comparison points.",
          "String design around shade matters as much as which panels are chosen.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance including product programs",
      },
      {
        label: "Clean Energy Council — Approved solar modules",
        url: "https://cleanenergycouncil.org.au/industry-programs/products-program/modules",
        note: "The approved product list used by incentive programs",
      },
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent guide to comparing panel products",
      },
    ],
    related: ["orientation-and-shading", "choosing-system-size", "solar-myths-and-facts"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "choosing-system-size",
    title: "How to choose the right solar system size",
    dek: "Consumption first, roof second, equipment last — a repeatable method for sizing a solar system, with the arithmetic shown.",
    category: "System design",
    readingMinutes: 8,
    published: "2026-06-03",
    updated: "2026-10-15",
    heroImage: asset("/images/kawana-buddina-solar.jpg"),
    heroAlt: "Two-storey Australian home at Kawana Waters, Queensland, with a differently sized solar array on its roof",
    blocks: [
      {
        type: "p",
        text: "System size is the decision everything else hangs from: what it costs, what it generates, how much you still buy from the grid and how quickly the investment looks sensible. It is also the decision most often made by guesswork. This article sets out a method you can follow — and challenge — using your own numbers.",
      },
      { type: "h2", text: "Step one: establish your annual consumption" },
      {
        type: "p",
        text: "Everything begins with how many kilowatt hours your household uses in a year. There are three ways to find out, in increasing order of accuracy:",
      },
      {
        type: "table",
        caption: "Three ways to estimate annual consumption",
        head: ["Method", "How it works", "Confidence"],
        rows: [
          ["Annual bill total", "Add four quarterly bills (or one annual statement) in dollars and divide by your average usage rate", "Rough — throws away all timing information"],
          ["Bill plus rate check", "Total kWh shown on the bills, summed across the year", "Good — actual metered totals per quarter"],
          ["Interval data download", "Half-hourly usage from your retailer or network portal", "Best — shows exactly when you use power, which is what sizing actually depends on"],
        ],
      },
      {
        type: "p",
        text: "The third method is the one worth asking for. A household that uses 6,000 kWh per year with most of it in the evening needs a different design from one with the same total spread through the day — even though both would be sold 'a 6.6 kW system' by a template proposal.",
      },
      { type: "h2", text: "Step two: estimate what a kilowatt produces on your roof" },
      {
        type: "p",
        text: "Across Australia, a kilowatt of panels produces broadly between 1,200 and 1,650 kilowatt hours per year, depending on location — sunnier regions and better angles at the top of the range. Shade, roof pitch and direction adjust that upward or downward; as a working method, pick a regional figure, then apply a roof factor (say 0.8 for significant shade, 0.9 for a good but not perfect plane, 1.0 for an ideal one).",
      },
      {
        type: "p",
        text: "Then the arithmetic is simple division. If a household uses 4,800 kWh per year, and their roof is expected to yield 1,400 kWh per kilowatt after shade, the array that generates roughly their consumption is 4,800 ÷ 1,400 ≈ 3.4 kW. Those figures are an illustration of the method, not a prediction for any specific address — the point is to see where every number comes from.",
      },
      { type: "h2", text: "Step three: adjust for when you use power" },
      {
        type: "p",
        text: "Generating your annual consumption is a target, not an obligation. The real question is how much of the generation the house can use or store. Three levers move the answer:",
      },
      {
        type: "ul",
        items: [
          "Daytime presence — a household that is home during the day (working from home, heat pumps, pool, daytime air-conditioning) can self-consume a large share of midday generation.",
          "A battery — storage converts otherwise-exported surplus into evening supply, which raises the useful ceiling on array size.",
          "Export limits — some networks cap how much you may export, which is another reason generation without a use has a lower value.",
        ],
      },
      { type: "h2", text: "Step four: the two failure modes" },
      {
        type: "p",
        text: "Undersizing is the more common mistake in quotes: a small template system that produces far less than the household uses, leaving expensive evening imports untouched. It is popular because it prices well in an advertisement.",
      },
      {
        type: "p",
        text: "Oversizing is the more expensive mistake: an array so large that most generation is exported at a fraction of the retail rate. For households without storage and with modest daytime use, every kilowatt beyond what can be self-consumed or usefully stored earns less than the first ones did.",
      },
      {
        type: "callout",
        title: "A battery changes the optimal answer",
        tone: "info",
        text: "When storage is planned, a somewhat larger array can be justified, because surplus has somewhere to go besides a low feed-in tariff. When no battery is expected, sizing to — or slightly below — consumption usually produces the better return. The savings estimator models both cases side by side.",
      },
      { type: "h2", text: "Rules of thumb, used carefully" },
      {
        type: "p",
        text: "Industry shorthand like 'kilowatts equal to three times the daily average use' circulates widely. Such rules are fine as a sanity check on a proposal, and dangerous as the basis for a design: they assume average shade, average tariffs, average household behaviour — and your house is not average in all three. The method in this article takes minutes longer and lands somewhere defensible.",
      },
      {
        type: "takeaways",
        items: [
          "Annual consumption in kilowatt hours is the anchor number — get it from interval data if possible.",
          "Regional yield of roughly 1,200–1,650 kWh per kW, adjusted for shade, converts consumption into an array size.",
          "Timing of use decides how much generation is actually useful to you.",
          "Undersizing wastes potential; oversizing exports cheap and imports dear.",
          "Planned storage justifies a somewhat larger array; uncertain storage plans do not.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent sizing and buying guidance",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on systems and installers",
      },
      {
        label: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "Why system capacity also affects certificate entitlements",
      },
    ],
    related: ["solar-panels-or-battery-first", "orientation-and-shading", "solar-payback-explained"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "understanding-your-electricity-bill",
    title: "How to read your electricity bill before going solar",
    dek: "Usage rates, supply charges, tariffs and export credits — the five numbers on your bill that decide what solar can actually save you.",
    category: "Costs & payback",
    readingMinutes: 7,
    published: "2026-06-17",
    updated: "2026-10-15",
    heroImage: asset("/images/electricity-meter.webp"),
    heroAlt: "Electricity meters mounted in a row, the point where household usage is measured and billed",
    blocks: [
      {
        type: "p",
        text: "Almost every solar quote you will receive is built from your electricity bill. Yet most people know only one number on it — the total. Reading the bill properly takes ten minutes and changes the quality of every conversation that follows.",
      },
      { type: "h2", text: "The anatomy of a bill" },
      {
        type: "ul",
        items: [
          "Usage charges — the price per kilowatt hour for electricity you consume. On time-of-use tariffs there are several of these, priced differently by time of day.",
          "Supply charge — a fixed daily amount covering the connection and metering, paid regardless of how much or how little you use. Solar does not reduce this part.",
          "Discounts and adjustments — conditional discounts, concessions, or adjustments that change the amount owed but not the underlying price of energy.",
          "Solar or export credits — if you already have solar, what your exports earned, and at what rate per kilowatt hour.",
          "Other fees and charges — metering changes, late fees or one-off adjustments.",
        ],
      },
      { type: "h2", text: "The three tariff shapes" },
      {
        type: "table",
        caption: "How the main residential tariff types charge — and how solar interacts with each",
        head: ["Tariff type", "How you are charged", "What it means for solar"],
        rows: [
          [
            "Flat rate",
            "One price per kWh at any time of day, plus supply charge",
            "Every kilowatt hour of consumption avoided saves the same amount — solar and storage both simply reduce units",
          ],
          [
            "Time of use",
            "Different prices for peak, shoulder and off-peak windows",
            "Solar generates during the shoulder; storage discharges into the expensive peak — timing carries real value",
          ],
          [
            "Demand",
            "Usage charges plus a capacity charge based on your highest usage over a short interval in a billing period",
            "A single spike can set the charge; battery and load management can shave peaks in ways that solar alone cannot",
          ],
        ],
      },
      {
        type: "p",
        text: "Which shape you are on — and whether it suits a solar household — is one of the most under-discussed parts of going solar. It is also free to change: the Australian Energy Regulator's Energy Made Easy service compares plans using your actual usage data, and reviewing the plan after solar is installed is often worth more than any hardware upgrade.",
      },
      { type: "h2", text: "The supply charge, and why it never disappears" },
      {
        type: "p",
        text: "The daily supply charge covers the cost of being connected: network access, metering and administration. A solar system reduces the usage part of the bill, but the supply charge is paid whether the sun shines or not. A household with a large bill dominated by usage will see dramatic percentage reductions from solar; a household with a modest bill will see a smaller share of the total move. Both outcomes are normal — the arithmetic is just different.",
      },
      { type: "h2", text: "Reading your own bill like an analyst" },
      {
        type: "ol",
        items: [
          "Find the usage rate — or rates, if you are on time of use. These are the numbers solar will displace.",
          "Find the daily supply charge. This is the floor your bill can never fall below while connected.",
          "Sum the kilowatt hours across four quarters (or one year) — that total is your annual consumption.",
          "Note the export rate if you have solar, and how many kilowatt hours earned it.",
          "Check the seasonality: which quarter is biggest, and is it heating, cooling, or something year-round?",
        ],
      },
      {
        type: "callout",
        title: "Bill size is a proxy, not a measurement",
        tone: "info",
        text: "Two households can pay identical bills while using very different amounts of electricity, because rates differ. When comparing quotes or estimates, always compare kilowatt hours and rates, not dollars alone.",
      },
      { type: "h2", text: "What to bring to a solar enquiry" },
      {
        type: "ul",
        items: [
          "Annual consumption in kWh (summed from bills or downloaded as interval data).",
          "Your tariff type and rates, so savings can be valued at the right price.",
          "A rough sense of when you use power — mostly daytime, evening, or spread through the day.",
          "The supply charge and any export rate, if you already have solar.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "The bill's useful numbers are rates, supply charge, annual kWh and export credits — not just the total.",
          "Flat, time-of-use and demand tariffs reward solar and storage differently.",
          "Supply charges are fixed; solar reduces the usage half of the bill.",
          "Interval data turns 'about this much' into an actual hourly profile.",
          "Review your plan after installing solar — plan choice multiplies hardware savings.",
        ],
      },
    ],
    sources: [
      {
        label: "Energy Made Easy — free plan comparison (Australian Energy Regulator)",
        url: "https://www.energymadeeasy.gov.au",
        note: "Government service for comparing electricity offers using your usage data",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on solar and energy",
      },
    ],
    related: ["feed-in-tariffs-explained", "solar-payback-explained", "choosing-system-size"],
    relatedServices: ["monitoring-optimisation"],
  },
  {
    slug: "feed-in-tariffs-explained",
    title: "Solar feed-in tariffs explained",
    dek: "Why the rate you are paid for exports is so much lower than the rate you pay to import — and what that means for how you design and use a system.",
    category: "Costs & payback",
    readingMinutes: 6,
    published: "2026-07-01",
    updated: "2026-10-15",
    heroImage: asset("/images/canberra-solar-suburb-aerial.jpg"),
    heroAlt: "Aerial view of suburban Canberra rooftops where most roofs export some energy back to the grid",
    blocks: [
      {
        type: "p",
        text: "The feed-in tariff is the rate your electricity retailer pays you for each kilowatt hour your system exports to the grid. It is the second-most-quoted number in solar marketing (after the rebate) and the most misunderstood: it is not the price of your energy — it is the price of your surplus, and it is almost always well below what you pay to buy power back.",
      },
      { type: "h2", text: "Why the gap between import and export prices exists" },
      {
        type: "p",
        text: "The rate you pay for imported power includes the wholesale cost of energy, but also network charges, metering, environmental program costs and the retailer's margin. When you export, you are selling an energy product into the wholesale market, minus the retailer's costs of handling it. You are selling the energy; you are not selling the transport, the billing or the retail service. That structural difference is why feed-in rates sit well below retail rates in every Australian jurisdiction.",
      },
      {
        type: "p",
        text: "The gap is not a trick — it is the economic reason self-consumption is worth more than exporting, and the reason battery storage exists as a product at all.",
      },
      { type: "h2", text: "How feed-in rates vary" },
      {
        type: "ul",
        items: [
          "By state and regulator — each jurisdiction sets its own rules for what retailers must offer, with minimum or benchmark rates in some states and market-determined rates in others.",
          "By retailer and plan — some plans trade a higher feed-in rate for a higher usage rate. The best feed-in tariff is not always the best plan; the total matters.",
          "By time of day — some offers now pay more for exports during peak demand periods; these suit batteries that can shift exports to the right window.",
          "By network limits — many networks cap either the size of inverter allowed to export or the volume of export at certain times. Generation above the cap is curtailed, not sold.",
        ],
      },
      { type: "h2", text: "What a low feed-in tariff actually means for design" },
      {
        type: "ul",
        items: [
          "Self-consumption is the priority: a kilowatt hour used on site saves the full retail rate, while the same hour exported earns the feed-in rate — often a small fraction of it.",
          "Storage converts low-value exports into high-value evening supply, which is exactly the gap a battery is designed to arbitrage.",
          "Oversizing to 'make money from exports' is a weak strategy where feed-in rates are low; arrays sized near consumption perform better.",
          "Load-shifting is free feed-in optimisation: running the pool, hot water or EV charger in the middle of the day means fewer exports and more avoided imports.",
        ],
      },
      {
        type: "callout",
        title: "Do not buy a system for the feed-in tariff",
        tone: "warn",
        text: "Feed-in rates are set by retailers and regulators and can change with little notice. A system whose business case depends on a high export rate is a bet on policy and market conditions, not an investment in your own consumption. The durable value is in the kilowatt hours you use yourself.",
      },
      { type: "h2", text: "Checking the current rates" },
      {
        type: "p",
        text: "Feed-in rates are published in every plan's terms and in the government comparison service Energy Made Easy, which lets you compare offers using your actual usage data. If you already have solar, the service uses your export volumes too — which is the only honest way to compare plans with different feed-in rates.",
      },
      {
        type: "takeaways",
        items: [
          "Feed-in tariffs pay for exports; they are not what you pay for imports.",
          "The import–export gap is structural: retail rates include network and service costs that exports do not.",
          "Self-consumption saves the full retail rate; exports earn the tariff — the difference is the whole game.",
          "Check export limits on your network — some generation may never reach the grid.",
          "Compare plans on total value using your own data via Energy Made Easy, not on headline feed-in rates.",
        ],
      },
    ],
    sources: [
      {
        label: "Energy Made Easy — free plan comparison (Australian Energy Regulator)",
        url: "https://www.energymadeeasy.gov.au",
        note: "Compare plans and feed-in offers using your usage data",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on solar and tariffs",
      },
    ],
    related: ["understanding-your-electricity-bill", "solar-payback-explained", "battery-capacity-vs-power"],
    relatedServices: ["monitoring-optimisation", "home-batteries"],
  },
  {
    slug: "orientation-and-shading",
    title: "Solar panel orientation and shading, explained",
    dek: "North is not the only roof that works — and shade is rarely as harmless as it looks. How orientation, tilt and shadows shape what a system produces.",
    category: "Performance",
    readingMinutes: 7,
    published: "2026-07-15",
    updated: "2026-10-15",
    heroImage: asset("/images/canberra-solar-suburb-hero.jpg"),
    heroAlt: "Aerial view over a Canberra suburb showing solar arrays arranged at different orientations across roof planes",
    blocks: [
      {
        type: "p",
        text: "Two houses with identical bills, identical equipment and the same installer can end up with meaningfully different generation — because the roofs point different ways and cast different shadows. Orientation and shading are the two factors that most often decide whether a system over-delivers or quietly underperforms for twenty years.",
      },
      { type: "h2", text: "Orientation: what each direction actually means" },
      {
        type: "ul",
        items: [
          "North — the classic best case: the most total generation across a year, centred on midday.",
          "East — strong morning generation that decays through the afternoon. Suits households with morning-heavy use, and avoids afternoon summer heat peak dependence.",
          "West — the mirror image: slower start, strong afternoon generation into the evening ramp. In many Australian climates the west plane pairs well with afternoon air-conditioning and late household load.",
          "East–west split — arrays arranged across both planes flatten the generation curve and extend productive hours, often producing only slightly less than a single ideal north plane over the year.",
          "South — the lowest yield of the four. Usually a last resort, unless the roof offers so much area that covering a south plane still adds usable generation, or the household is large enough to use every kilowatt hour.",
        ],
      },
      {
        type: "p",
        text: "The key insight for buyers: orientation shifts when generation happens more than it destroys how much happens. A west-facing system that generates slightly less per year but overlaps with expensive evening hours can outperform a north system in bill terms. The right question is not 'which roof is best?' but 'which roof best matches when we use power?'",
      },
      { type: "h2", text: "Tilt: less dramatic than people expect" },
      {
        type: "p",
        text: "Output is fairly forgiving across a wide band of roof pitches — broadly speaking, anywhere between about 15° and 35°, the annual difference is modest. Steeper tilt favours winter sun angles; flatter tilt favours summer. Flat roofs need tilt frames to shed water, lift the modules and improve the angle — a small extra cost that earns its keep on the right roof.",
      },
      {
        type: "p",
        text: "For most residential projects, orientation and shade are worth agonising over; tilt is worth mentioning once and moving on with a standard mounting solution.",
      },
      { type: "h2", text: "Shading: the quiet performance killer" },
      {
        type: "p",
        text: "A shadow that covers one panel does not simply remove that panel's contribution. On a string inverter, panels are wired in series, and the weakest panel can limit the current through the whole string. The practical result: a shadow over a small fraction of the array can cost several times its physical share of output, depending on the layout and electronics.",
      },
      {
        type: "ul",
        items: [
          "Trees are the most common culprits — and their shadows move through the day and the year. A deciduous tree is nearly harmless in winter for a north array but will shade a western plane in summer afternoons.",
          "Chimneys, satellite dishes, vents and roof hardware cast small but disproportionately costly shadows on the panels adjacent to them.",
          "Neighbouring buildings and future construction are worth considering, especially for ground-floor roofs or where development is likely.",
          "Time matters: shade during the middle of the day, when irradiance peaks, costs more than the same shadow in the early morning or late afternoon.",
        ],
      },
      { type: "h2", text: "How a shade assessment should be done" },
      {
        type: "ol",
        items: [
          "Identify every object that can cast shade on each roof plane, and at what times of day.",
          "Consider the sun's path across seasons — not just the summer position at noon, and not just one site visit's snapshot, but how winter angles and summer afternoons differ.",
          "Measure or map the roof planes: area, pitch, direction, and the practical footprint after setbacks and access paths.",
          "Design the strings around the answers — splitting shaded and unshaded panels, choosing per-panel electronics where justified, or moving the array to a better plane.",
        ],
      },
      { type: "h2", text: "Design responses to unavoidable shade" },
      {
        type: "ul",
        items: [
          "Split the array across multiple inputs (MPPTs) so shaded and unshaded groups do not drag each other down.",
          "DC optimisers or microinverters isolate each panel's output — often the cleanest solution where shade is partial and unavoidable, at a higher component cost.",
          "Relocate part of the array to a better plane, accepting a smaller total size for a higher yield per panel.",
          "Prune or reposition the obstacle — with council or heritage rules in mind, and with the owner's consent when the tree is not yours.",
          "Accept a lower modelled yield and size accordingly; a shade-affected design done honestly still beats an optimistic design sold with an inflated generation estimate.",
        ],
      },
      {
        type: "callout",
        title: "The cheapest optimiser is a pruning saw",
        tone: "info",
        text: "Where a manageable tree causes significant, predictable shade, trimming or removing it can be more cost-effective than any electronics — subject to council rules and, if the tree is not yours, the neighbour's consent. Get the shade re-assessed after any major pruning; the design may be able to change with it.",
      },
      {
        type: "takeaways",
        items: [
          "Orientation shifts when generation occurs; east, west and split arrays are all viable.",
          "Roof tilt matters far less than orientation and shade across a broad 15–35° band.",
          "Shade on one panel can cost several panels' worth of output on a string system.",
          "Good designs split strings or use per-panel electronics around shade rather than pretending it is not there.",
          "Assess shade across seasons and times of day, not from a single snapshot.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent guidance including orientation and shade",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on system design and installers",
      },
    ],
    related: ["how-solar-panels-work", "weather-and-seasons", "choosing-system-size"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "weather-and-seasons",
    title: "How solar performs in clouds, winter and heat",
    dek: "Cloudy days, short winter days and hot summer afternoons each change what a system produces — and none of them mean solar is 'not working'.",
    category: "Performance",
    readingMinutes: 6,
    published: "2026-08-05",
    updated: "2026-10-15",
    heroImage: asset("/images/sunlight-window.webp"),
    heroAlt: "Soft daylight falling through a window onto an interior wall, the diffuse light solar panels also use",
    blocks: [
      {
        type: "p",
        text: "Every solar owner eventually has the same quiet worry: it clouded over for a week and the app's numbers fell. Or it was the middle of summer and mid-afternoon output looked unremarkable. Most of what looks like underperformance is simply weather and physics — but knowing the patterns is how you tell the difference between normal variation and a fault.",
      },
      { type: "h2", text: "Clouds: output falls, but rarely to zero" },
      {
        type: "p",
        text: "Solar panels convert diffuse light as well as direct sunlight, so an overcast day still generates — just at a fraction of a clear day's output. Broken cloud is a mix of both: some moments near clear-sky performance between the clouds, some moments heavily reduced. A week of solid overcast in winter can feel alarming in the monitoring app and be entirely normal.",
      },
      {
        type: "p",
        text: "What matters for judging performance is the shape of the curve, not a single day: generation that returns to normal on the next clear day is weather. Generation that stays depressed through clear-sky weeks is worth investigating.",
      },
      { type: "h2", text: "The temperature surprise" },
      {
        type: "p",
        text: "Panels are rated at a cell temperature of 25°C, and real-world cells run much hotter in full sun. The hotter they get, the slightly less efficient they become. This produces a counter-intuitive result: a crisp, clear autumn day at 20°C can deliver closer to rated output than a 40°C heatwave day, even though the summer sun is stronger. Heat also affects inverters, which derate their output when running hot — another reason ventilation around equipment is a design decision.",
      },
      { type: "h2", text: "Winter versus summer in Australia" },
      {
        type: "ul",
        items: [
          "Southern states: winter days are shorter and the sun sits lower, so total daily generation falls well below summer levels — while heating loads push consumption up. The combination is why winter is when the grid does most of the work and batteries cycle hardest.",
          "Cooler winter temperatures partially offset the shorter days; a clear winter midday can still produce strongly.",
          "Northern Australia: the pattern inverts — the wet season's cloud cover, not the temperature, drives the seasonal swing, while the dry season delivers steady clear-sky generation.",
          "Everywhere: the first winter after installation feels like a disappointment compared with the first summer. It is arithmetic, not failure — annual figures are what the system was sized for.",
        ],
      },
      { type: "h2", text: "Reading your own system through the seasons" },
      {
        type: "ol",
        items: [
          "Compare like with like: this March against last March, this bill against the same bill a year earlier.",
          "Judge clear days against clear days — pick a cloudless day in each season and compare curves.",
          "Expect the battery to fill less often in winter than in summer; state-of-charge graphs follow the seasons.",
          "Watch for step changes — a sudden, persistent drop on clear days is the signature of a fault, not weather.",
        ],
      },
      {
        type: "callout",
        title: "Why estimates come as ranges",
        tone: "info",
        text: "Weather is the largest single source of year-to-year variation in any solar estimate. That is why honest savings figures are presented as ranges with assumptions attached, and why a single poor week — or a single excellent one — should never be used to judge whether the system 'works'.",
      },
      { type: "h2", text: "Design and habits that smooth the seasonal dip" },
      {
        type: "ul",
        items: [
          "Size the array around annual consumption, not summer generation — the annual figure is what pays back.",
          "Shift winter-heavy loads (heating, hot water, laundry) into daylight where practical.",
          "Review the electricity plan before winter, when usage patterns and prices squeeze hardest.",
          "Keep December's numbers for comparison next December — a year of your own data beats any generic yield table.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Overcast days reduce output but rarely eliminate it — solar runs on light, not just sun.",
          "Hot days produce less per unit of sunlight than cool, clear ones; inverter heat matters too.",
          "Winter shortens generation while raising consumption — the hardest season is expected to be hard.",
          "Compare season to season, not week to week, and watch for step changes rather than dips.",
          "Year-to-year weather variability is why savings estimates are ranges.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on system performance",
      },
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent guidance including performance expectations",
      },
    ],
    related: ["orientation-and-shading", "choosing-system-size", "solar-payback-explained"],
    relatedServices: ["monitoring-optimisation"],
  },
  {
    slug: "cleaning-maintenance-lifespan",
    title: "Cleaning, maintenance and how long solar equipment lasts",
    dek: "What actually needs doing, what can safely be ignored, and the real-world factors that decide whether your hardware lasts fifteen years or thirty.",
    category: "Maintenance & safety",
    readingMinutes: 7,
    published: "2026-08-19",
    updated: "2026-10-15",
    heroImage: asset("/images/kawana-residential-solar.jpg"),
    heroAlt: "Solar panels mounted neatly on the upper roof of a modern two-storey home at Kawana Waters, Queensland",
    blocks: [
      {
        type: "p",
        text: "Solar hardware is sold on longevity — twenty-five-year panel warranties, decade-long inverter promises — and then mostly forgotten by its owners. That is close to the right approach, but not quite: a small amount of attention keeps a system safe, diagnosable and closer to its potential for its entire working life.",
      },
      { type: "h2", text: "What maintenance actually matters" },
      {
        type: "ul",
        items: [
          "Observation — glancing at monitoring monthly and noticing changes before they become expensive.",
          "Occasional physical inspection — looking at the array from the ground after storms, checking nothing has landed on it, and keeping gutters clear of leaf litter that can shade panels.",
          "Periodic professional inspection — a check of isolators, connections, mounting and equipment every few years, more often on older or coastal systems.",
          "Paperwork hygiene — keeping invoices, certificates and warranty registrations where you can find them.",
        ],
      },
      { type: "h2", text: "Cleaning: when rain is not enough" },
      {
        type: "p",
        text: "In most of Australia, wind and rain keep panels adequately clean, and cleaning services are sold more often than they are needed. Soiling matters most in specific situations: dusty rural and inland locations, properties under or near shedding trees, coastal sites where salt film builds up, and anywhere bird activity is concentrated.",
      },
      {
        type: "p",
        text: "The honest test is your own monitoring. If output on clear days declines through a dry, dusty stretch and recovers after good rain, soiling was the cause and cleaning is worth it. If the numbers stay steady through the same period, cleaning would be spending money to feel productive.",
      },
      { type: "h2", text: "How to clean safely — or why not to" },
      {
        type: "ul",
        items: [
          "Clean early in the morning when panels are cool; cold water on hot glass risks thermal stress, and the water evaporates before it works.",
          "Use a soft brush, plain water and mild detergent if needed. Never abrasives, and never a high-pressure jet near panel edges, seals or wiring.",
          "Never walk or stand on panels — the glass is not a surface, and falls from roofs are the most serious injury risk in all of this.",
          "Anything involving isolators, connectors, cabling or the equipment enclosures is licensed electrical work, without exception.",
          "Steep, high or awkward roofs: this is what professionals are for. No dusty panel is worth a fall.",
        ],
      },
      { type: "h2", text: "What shortens equipment lifespan" },
      {
        type: "ul",
        items: [
          "Heat — panels, inverters and batteries all age faster when hot. Ventilated inverter placement and shaded, clear battery positions are lifespan decisions.",
          "Workmanship — the components most likely to fail are not the famous ones. Isolators, connectors, cable routing and roof penetrations are where cheap installation shows up first.",
          "Corrosion — coastal salt air attacks mounting hardware, frames and connections; inspections matter more near the sea.",
          "Pests — birds nesting under panels and rodents chewing cable insulation are real, common failure sources; mesh guarding is cheap prevention.",
          "Storms and hail — physical damage that insurance and warranty processes handle very differently, so document everything.",
        ],
      },
      { type: "h2", text: "How long equipment really lasts" },
      {
        type: "ul",
        items: [
          "Panels: commonly warranted 10–25 years for product and 25 years for performance, with output declining gradually by design (often a fraction of a percent per year, defined in each product's warranty). Panels routinely keep generating well beyond their warranty period at reduced output.",
          "Inverters: usually the shortest-lived major component, with warranties commonly 5–10 years and working lives in the same territory. Heat and installation quality are the biggest variables.",
          "Batteries: commonly around a ten-year warranty period with a warranted total energy throughput; real life depends on cycles, temperature and placement.",
          "The metal and the wiring: mounting systems are designed for decades, but isolators, connectors and cable insulation are service items that should be inspected and can be renewed.",
        ],
      },
      {
        type: "callout",
        title: "Safety is the non-negotiable part",
        tone: "warn",
        text: "Everything on this page that concerns the roof, the wiring or the equipment enclosures belongs to qualified professionals. A solar system operates at hazardous DC voltages during daylight even when 'switched off' at the isolator. Observation from the ground is your job; everything above ground is theirs.",
      },
      { type: "h2", text: "A maintenance calendar you will actually follow" },
      {
        type: "ul",
        items: [
          "Monthly: glance at the monitoring app; note anything odd, especially on otherwise clear days.",
          "After storms: look at the array from ground level for damage or debris; photograph anything suspicious.",
          "Seasonally: compare the month against the same month last year and against your expectations.",
          "Every two to five years: book a professional inspection — sooner for older, coastal or high-dust systems.",
          "Always: keep the paperwork file current. It pays at warranty, insurance and sale time.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Most Australian systems need little cleaning; dust, salt and tree-fallout locations are the exceptions.",
          "Let monitoring, not sales pressure, decide when cleaning is worthwhile.",
          "Heat, workmanship, corrosion and pests shorten lives more than brands do.",
          "Panels outlast inverters; batteries live in between with throughput limits attached.",
          "Never DIY the roof or the electrics — observation yes, intervention no.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent guidance including maintenance expectations",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on products and after-sales support",
      },
    ],
    related: ["warranties-explained", "weather-and-seasons", "solar-myths-and-facts"],
    relatedServices: ["maintenance-support", "system-assessments"],
  },
  {
    slug: "warranties-explained",
    title: "Understanding solar warranties — all four layers of them",
    dek: "Workmanship, product, performance and battery throughput: what each promise actually covers, what can void it, and how a claim really runs.",
    category: "Buying well",
    readingMinutes: 8,
    published: "2026-09-09",
    updated: "2026-10-15",
    heroImage: asset("/images/canberra-solar-rooftops-aerial.jpg"),
    heroAlt: "Aerial view of neighbouring Canberra homes whose rooftop solar arrays were each laid out differently",
    blocks: [
      {
        type: "p",
        text: "\"Twenty-five-year warranty\" sounds like a single promise. In practice, a solar system carries at least three, and often four, entirely separate warranties — from different companies, covering different failures, for different periods. Understanding the layers before you sign is the difference between a warranty that helps and a brochure line that evaporates when tested.",
      },
      { type: "h2", text: "The four layers" },
      {
        type: "table",
        caption: "Warranty layers on a typical residential system — every proposal should state all of these for the exact models quoted",
        head: ["Layer", "Who stands behind it", "Typical shape", "The question that matters"],
        rows: [
          [
            "Workmanship",
            "The installer",
            "A set number of years (commonly 5–10) covering the quality of the installation itself",
            "If the roof leaks at a penetration or an isolator fails, who comes back — and how fast?",
          ],
          [
            "Product",
            "The equipment manufacturer",
            "Panels (commonly 10–25 years), inverters (commonly 5–10), batteries (commonly around 10)",
            "What counts as a covered defect, and who pays the labour to swap the part?",
          ],
          [
            "Performance",
            "The panel manufacturer",
            "A guaranteed output level at 25 years, plus a maximum annual degradation rate",
            "What output percentage is guaranteed in year 25, and how is a shortfall measured and remedied?",
          ],
          [
            "Battery throughput",
            "The battery manufacturer",
            "A total energy throughput (MWh) within a calendar period",
            "If the battery cycles hard, which limit is reached first — and what happens then?",
          ],
        ],
      },
      { type: "h2", text: "Performance warranties, decoded" },
      {
        type: "p",
        text: "A performance warranty for panels guarantees that output will remain above a set percentage in a set year — commonly something like 80–87% of nominal output at 25 years — and caps the annual degradation along the way, often around 0.4–0.6% per year. The shape matters as much as the endpoint: a warranty that allows a fast early decline is weaker than one with a flatter curve.",
      },
      {
        type: "p",
        text: "These are the numbers to compare between panel models — not the headline warranty length. A 25-year label on a product with generous degradation allowances is a weaker promise than it sounds, and vice versa.",
      },
      { type: "h2", text: "What can void a claim" },
      {
        type: "ul",
        items: [
          "Physical damage — cracked glass, impact marks, storm damage. These are usually insurance questions, not warranty ones, which is why documentation matters.",
          "Unqualified or unauthorised modifications — adding a device or moving equipment outside approved channels can void cover on connected components.",
          "Installation by non-approved installers on program-supported equipment, where enrolment conditions require accredited work.",
          "Missing or inaccurate registration — many product warranties require the installer to register the product at installation; if that never happened, chase it.",
          "Cosmetic changes that do not affect performance — slight discolouration or frame weathering is usually excluded by design; warranties cover function, not appearance.",
        ],
      },
      { type: "h2", text: "How a claim actually runs" },
      {
        type: "ol",
        items: [
          "Gather evidence: the monitoring data showing the fault or shortfall, dates, error codes and photographs.",
          "Contact the installer first — the workmanship holder and the conventional first point of contact, even when the claim is against a manufacturer.",
          "The installer or manufacturer performs diagnostics to determine whether the issue is a product defect, an installation fault or an external cause.",
          "Remedy follows the warranty's terms: repair, replacement, or (in some cases) a refund or credit for the shortfall. Labour coverage is where policies differ most — check it explicitly.",
          "If the response is unsatisfactory, escalate: manufacturer complaints processes, then the relevant consumer affairs body in your state or territory. Australian Consumer Law rights exist independently of any manufacturer warranty.",
        ],
      },
      {
        type: "callout",
        title: "Installer warranty versus manufacturer warranty — both matter, differently",
        tone: "info",
        text: "The manufacturer's product warranty generally survives the installer going out of business, because it is a promise from a different company. The workmanship warranty does not — which is one reason to check how long an installer has operated and how they handle service after the sale, not just the price on the first invoice.",
      },
      { type: "h2", text: "The ten-minute paperwork habit that saves years of pain" },
      {
        type: "ul",
        items: [
          "Keep the full proposal and invoice, with model numbers, in one place — digital is fine, findable is essential.",
          "Keep the compliance certificates and network paperwork: they describe what was installed, and are needed for many claims.",
          "Confirm warranty registrations actually happened after installation — ask for the confirmations.",
          "Screenshot monitoring when something goes wrong; a dated fault record is worth more than any later description.",
          "Log every service visit and repair in one line. It makes patterns visible and claims straightforward.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Four warranty layers exist: workmanship, product, performance and battery throughput.",
          "The performance curve — what output is guaranteed, and when — compares panel products better than warranty length.",
          "Damage, unapproved modifications and missing registrations are the common claim-killers.",
          "Labour coverage is where warranties differ most; ask who pays it before you need it.",
          "Keep the file: invoice, certificates, registrations, fault evidence — it decides the speed of every claim.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on products, warranties and installers",
      },
      {
        label: "ACCC — Consumer rights and guarantees",
        url: "https://www.accc.gov.au/consumers",
        note: "Your Australian Consumer Law rights, independent of manufacturer warranties",
      },
      {
        label: "Solar Victoria — How to choose a good solar or hot water retailer",
        url: "https://www.solar.vic.gov.au/choose-a-good-retailer",
        note: "Consumer protection guidance including warranties",
      },
    ],
    related: ["questions-to-ask-an-installer", "cleaning-maintenance-lifespan", "common-purchasing-mistakes"],
    relatedServices: ["maintenance-support", "inverter-upgrades"],
  },
  {
    slug: "solar-for-ev-owners",
    title: "Solar for electric vehicle owners",
    dek: "An EV can be a household's largest single new load — and solar's best customer. How to think about charging, sizing and tariffs together.",
    category: "System design",
    readingMinutes: 7,
    published: "2026-08-26",
    updated: "2026-10-15",
    heroImage: asset("/images/ev-charging-home.webp"),
    heroAlt: "An electric vehicle charging at a home wall unit beside a house",
    blocks: [
      {
        type: "p",
        text: "An electric vehicle typically becomes the largest electricity load a household adds — larger than heating, larger than a pool. It also has a superpower that no other major appliance shares: its charging can be scheduled almost anywhere in the day. For solar owners, that flexibility is worth real money.",
      },
      { type: "h2", text: "The load arithmetic, done honestly" },
      {
        type: "p",
        text: "EV consumption is best expressed per distance: as an illustration, a car using around 15 kWh per 100 km, driven 15,000 km a year, adds roughly 2,250 kWh to the household's annual consumption — about a third of the usage of a typical larger home. Your own numbers depend on the vehicle, the driving and the conditions, but the scale is the point: an EV meaningfully changes the consumption figure that solar should be sized against.",
      },
      {
        type: "p",
        text: "That is the first conversation with any designer: tell them an EV is coming — or already here — before sizing is finalised. An array sized to pre-EV consumption simply leaves more of the car's charging to the grid.",
      },
      { type: "h2", text: "Why solar and EVs fit together so well" },
      {
        type: "ul",
        items: [
          "Charging is flexible — inside the household's day, it can happen whenever it is cheapest or most convenient.",
          "Solar surplus exists in the middle of the day, exactly when many households can charge a car that is typically parked at work only on weekdays.",
          "A kilowatt hour that would have been exported for a few cents displaces grid charging at the full retail rate — a large gap that charging at home during the day captures directly.",
          "Where a battery exists, intra-day scheduling can charge the car from surplus and save stored energy for the evening.",
        ],
      },
      { type: "h2", text: "The three charging windows, ranked" },
      {
        type: "ol",
        items: [
          "Best: solar surplus windows — late morning to mid-afternoon, when generation exceeds household use and exports earn little. Weekend charging fits here naturally; weekday charging needs a car that is home.",
          "Second: off-peak windows — overnight rates, where available, are often the cheapest grid power of the day; they suit households that cannot charge in daylight.",
          "Avoid: the evening peak — the most expensive hours on time-of-use tariffs, and exactly when a battery or the grid is carrying the house. Schedule charging to finish before or start after these windows.",
        ],
      },
      { type: "h2", text: "Infrastructure: plan the wiring once" },
      {
        type: "ul",
        items: [
          "A dedicated EV charger circuit is required for anything beyond a standard socket; the charger's power rating and any future second vehicle determine the cable and switchboard work.",
          "Do the electrical planning alongside the solar design — opening the switchboard twice, or pulling cable twice, costs more than doing both at once.",
          "Some inverters and charging units can coordinate: charging only from excess solar, pausing during household peaks. This function is worth asking about explicitly and checking compatibility between brands.",
          "A second-hand cable run is worthwhile even if the charger itself comes later: pull the conduit while the solar team is on site.",
        ],
      },
      { type: "h2", text: "Tariffs and the EV" },
      {
        type: "p",
        text: "Time-of-use tariffs can reward overnight EV charging with cheap rates — but compare the whole plan, not one window. A plan with generous off-peak charging rates may charge more for the evening household load that solar does not cover. Demand tariffs deserve particular caution with EVs: an unscheduled charge during a high-usage interval can set the capacity charge for the entire month.",
      },
      {
        type: "callout",
        title: "Do not size the array for a car you do not own yet",
        tone: "info",
        text: "Planning for an EV is wise; building for one that is three years away is a bet. Size for today's consumption plus a documented plan, keep the design expandable, and add the load when it actually arrives — the design headroom costs far less than the idle capacity.",
      },
      {
        type: "takeaways",
        items: [
          "An EV adds meaningful consumption — roughly a third of a large household's annual use in our illustration.",
          "Daytime charging converts cheaply-exported surplus into full-value avoided imports.",
          "Schedule charging into surplus windows first, cheap overnight rates second, and never into the evening peak by default.",
          "Plan the charger circuit with the solar installation — one switchboard visit, one cable run.",
          "Check whether your inverter and charger can coordinate before buying either.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on electrification and solar",
      },
      {
        label: "Energy Made Easy — free plan comparison (Australian Energy Regulator)",
        url: "https://www.energymadeeasy.gov.au",
        note: "Compare tariffs, including time-of-use windows relevant to EV charging",
      },
    ],
    related: ["choosing-system-size", "feed-in-tariffs-explained", "battery-capacity-vs-power"],
    relatedServices: ["solar-and-battery", "monitoring-optimisation"],
  },
  {
    slug: "solar-during-outages",
    title: "What happens to solar during a grid outage?",
    dek: "The most common post-blackout surprise: the panels on the roof did nothing. Why that happens, and what it takes to keep the lights on.",
    category: "Solar basics",
    readingMinutes: 6,
    published: "2026-09-16",
    updated: "2026-10-15",
    heroImage: asset("/images/home-battery-wall.webp"),
    heroAlt: "Home battery and inverter equipment — the hardware that can supply a house during an outage",
    blocks: [
      {
        type: "p",
        text: "The first blackout after solar installation is when many owners learn something nobody explained clearly: a standard grid-connected system switches itself off within seconds of an outage, even in bright sunshine. It is not a fault. It is, in fact, one of the system's most important safety behaviours.",
      },
      { type: "h2", text: "Why solar alone goes dark" },
      {
        type: "p",
        text: "Every grid-connected inverter is required to have anti-islanding protection: if the grid voltage disappears, the inverter shuts down immediately so it cannot energise the network while linesworkers are repairing it. A solar system that kept producing into a blacked-out street would be a lethal hazard to exactly the people trying to restore your power. The shutdown is automatic, mandatory and correct.",
      },
      { type: "h2", text: "What it takes to keep power during an outage" },
      {
        type: "ul",
        items: [
          "A battery system with backup capability, wired to supply a designated set of circuits — the standard residential option.",
          "Backup circuits decided during design: usually lights, fridge, internet, a few power points, and any medically essential equipment.",
          "Whole-home backup: possible with larger-capacity equipment rated for the whole house's loads — including the starting surge of motors and compressors — but a significant step up in battery power and cost.",
          "Generators remain an option, but must be connected through a proper changeover arrangement by a licensed electrician — never improvised with extension cords and back-feeding."
        ],
      },
      { type: "h2", text: "How backup circuits are chosen" },
      {
        type: "ol",
        items: [
          "List what genuinely needs to run: fridge and freezer, internet and phone charging, lighting, a heating or cooling device for extreme weather, medical equipment if relevant.",
          "Note the starting surge of anything with a motor or compressor — it can be several times the running draw.",
          "Compare the list against the battery's continuous and peak power ratings, not just its stored energy.",
          "Decide the run time you want — a few hours of essentials or an overnight — and check it against usable capacity.",
        ],
      },
      { type: "h2", text: "What a home backup actually delivers" },
      {
        type: "p",
        text: "A typical well-designed essentials circuit can run lighting, refrigeration, communications and small appliances for many hours on a modest home battery. What it cannot do is treat the battery like a generator: during a long outage, recharge comes only from solar, and solar recharge depends on the weather. In a multi-day cloudy outage, a battery that started full will end empty unless loads are managed.",
      },
      {
        type: "callout",
        title: "A battery in an outage is a rationed resource, not a power station",
        tone: "warn",
        text: "Plan for the realistic case: several hours to a day of essentials, managed deliberately. If prolonged, whole-home outage coverage is a genuine requirement, the conversation belongs in design — with honest numbers for what it costs and what it can run.",
      },
      { type: "h2", text: "Testing and expectations" },
      {
        type: "ul",
        items: [
          "Ask for a backup test as part of commissioning: how the changeover behaves, which circuits stay live, and how to read the battery's remaining charge.",
          "Know the reserve setting: most systems hold a minimum state of charge for backup — confirm it is configured for your priorities.",
          "Check monitoring access during an outage: some systems report through the home network, which may itself be offline; know how to read the battery's local display as a fallback.",
          "Revisit the arrangement if circumstances change — medical equipment, remote work, or elderly household members can shift what 'essentials' must include.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Standard solar shuts down in a blackout by law, to keep the network safe for repairs.",
          "Outage power requires a battery with backup wiring — decided at design time, not after.",
          "Backup circuits are a chosen list of essentials, sized against the battery's kW and kWh ratings.",
          "Long outages drain the battery faster than the sun refills it in poor weather — manage loads deliberately.",
          "Commissioning should include a walkthrough of how the backup actually behaves.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — What you need to know about backup power",
        url: "https://www.solar.vic.gov.au/what-you-need-know-about-backup-power",
        note: "Government guidance on backup power arrangements",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on battery systems",
      },
    ],
    related: ["how-solar-batteries-work", "grid-connected-vs-off-grid", "battery-capacity-vs-power"],
    relatedServices: ["home-batteries", "solar-and-battery"],
  },
  {
    slug: "grid-connected-vs-off-grid",
    title: "Grid-connected solar versus off-grid systems",
    dek: "The grid is the cheapest battery most homes will ever have. What that means for the economics of staying connected — and when off-grid genuinely wins.",
    category: "Solar basics",
    readingMinutes: 7,
    published: "2026-09-30",
    updated: "2026-10-15",
    heroImage: asset("/images/sydney-commercial-rooftop-solar.jpg"),
    heroAlt: "Grid-connected commercial solar array on a rooftop in inner Sydney with the city skyline behind it",
    blocks: [
      {
        type: "p",
        text: "Every solar conversation eventually reaches the romantic question: could we cut the cord entirely? The honest answer starts with understanding what the grid actually provides — and what replacing it really costs.",
      },
      { type: "h2", text: "What the grid does for a solar household" },
      {
        type: "p",
        text: "A grid connection is an always-available, effectively infinite battery and generator combined. It absorbs everything you export, supplies everything you cannot generate, and never runs flat during a cloudy fortnight. That is why grid-connected solar is the standard design: the household buys capacity only for its average needs, because the grid handles the extremes — for a daily supply charge rather than a capital cost.",
      },
      { type: "h2", text: "The spectrum from grid-tied to self-sufficient" },
      {
        type: "table",
        caption: "Designs along the independence spectrum — rough shapes, not quotes",
        head: ["Configuration", "Overnight and cloudy days", "Cost and complexity"],
        rows: [
          [
            "Grid-connected solar only",
            "The grid supplies everything the sun does not",
            "Lowest cost; simplest; no outage protection",
          ],
          [
            "Solar + battery, grid backup",
            "Battery covers evenings; the grid covers winter and gloom",
            "Modest step up; storage sized for evening load; partial outage backup possible",
          ],
          [
            "Grid-optional hybrid",
            "Battery plus grid with engineered backup circuits; can ride through outages",
            "Higher equipment spec; backup wiring throughout; still grid-supported in deep winter",
          ],
          [
            "Off-grid",
            "Large battery plus oversized array or generator; weeks of autonomy must be designed in",
            "Highest cost by a wide margin; specialist design, maintenance and discipline required",
          ],
        ],
      },
      { type: "h2", text: "Why off-grid costs so much more: the winter fortnight" },
      {
        type: "p",
        text: "An off-grid system must be sized not for the average day, but for the worst realistic stretch — days of heavy cloud in the shortest, darkest weeks of the year, carrying the household's full load with no grid to lean on. That single design requirement multiplies both array size and battery capacity, and usually still demands a backup generator or a deeply conservative lifestyle. The sizing difference between an average day and the worst fortnight is where off-grid economics are made or broken.",
      },
      {
        type: "p",
        text: "Professional off-grid design also adds obligations that grid-connected owners never think about: battery maintenance and replacement budgets, inverter redundancy, generator servicing, and the discipline to run heavy loads when energy is available rather than when convenient.",
      },
      { type: "h2", text: "When off-grid genuinely makes sense" },
      {
        type: "ul",
        items: [
          "The property is remote enough that a grid connection quote is itself a large capital project — sometimes tens of thousands of dollars for poles, transformers and trenching.",
          "The site is temporary or the connection is genuinely impossible under current rules.",
          "The household genuinely accepts the discipline: appliance scheduling, winter conservatism, and maintenance as a way of life.",
          "There is a specialist designer involved — off-grid is a systems-engineering project, not a bigger version of a rooftop job.",
        ],
      },
      { type: "h2", text: "The honest middle ground" },
      {
        type: "p",
        text: "Most households drawn to 'independence' are actually looking for two things the grid-plus-battery middle provides at a fraction of the cost: protection from outages, and a smaller bill. A well-designed battery system with backup circuits delivers both, keeps the grid as the winter safety net, and avoids paying for the worst-case autonomy that off-grid demands. That is why the middle of the spectrum is where most genuinely happy households land.",
      },
      {
        type: "takeaways",
        items: [
          "The grid is a near-infinite battery at a daily supply charge — expensive to replace with hardware.",
          "Off-grid systems are sized for the worst fortnight, not the average day; that is the cost driver.",
          "Grid plus battery delivers the two things most households actually want: outage cover and bill reduction.",
          "Off-grid fits remote sites where connection cost is extreme — and households ready for its maintenance realities.",
          "Independence is a spectrum with sensible stops in the middle.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — What you need to know about backup power",
        url: "https://www.solar.vic.gov.au/what-you-need-know-about-backup-power",
        note: "Guidance on backup and islanding arrangements",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on system types",
      },
    ],
    related: ["solar-during-outages", "how-solar-batteries-work", "choosing-system-size"],
    relatedServices: ["solar-and-battery", "commercial-solar"],
  },
  {
    slug: "common-purchasing-mistakes",
    title: "Common solar purchasing mistakes — and how to avoid them",
    dek: "The decisions that look harmless at quote time and expensive three years later, collected in one checklist.",
    category: "Buying well",
    readingMinutes: 7,
    published: "2026-10-01",
    updated: "2026-10-15",
    heroImage: asset("/images/electrician-work.webp"),
    heroAlt: "Technician working inside electrical equipment — the after-sales reality behind every solar purchase",
    blocks: [
      {
        type: "p",
        text: "Most solar purchases end well. The ones that end badly tend to fail in predictable ways — not because buyers were careless, but because the industry sells on prices and pictures while the important decisions hide in the details. Here are the mistakes worth engineering out of your process.",
      },
      { type: "h2", text: "The ten that matter" },
      {
        type: "ol",
        items: [
          "Buying on price per kilowatt alone — the cheapest headline price wins attention for budgets built from weaker products, thinner warranties or rushed installation. Compare specification tables, not just dollars divided by kilowatts.",
          "Accepting a single quote — the market is competitive, and quotes genuinely vary in specification and service. One quote tells you a price; three tell you a market.",
          "Sizing before the roof is assessed — shade, orientation and roof condition are design inputs, not footnotes. A quote produced without them is a guess.",
          "Oversizing to 'profit from exports' — where feed-in rates are low and export limits exist, generation without a use earns little. Size to consumption, or to consumption plus storage.",
          "Skipping battery-readiness when storage is likely — headroom in inverter, switchboard and layout costs little at installation and a great deal to retrofit.",
          "Ignoring the electricity plan — the best system on the wrong tariff underperforms the same system on the right one. Review plans around installation, with Energy Made Easy.",
          "Treating an estimate as a guarantee — savings figures depend on weather, tariffs and behaviour. Demand assumptions and ranges, and distrust single-number promises.",
          "Signing before the paperwork is read — the contract should name models, warranties, incentive treatment, timelines and what happens if conditions change. If that is too much to read on the night, the deadline was invented.",
          "Not verifying accreditation and product lists — check the installer's accreditation and that quoted products appear on the eligible lists for any incentive included in the price. Logos in brochures prove nothing.",
          "Forgetting to ask about after-sales — who answers the phone in year four matters more than a busy month at installation. Ask how service requests are handled and who does the work.",
        ],
      },
      {
        type: "callout",
        title: "The cheapest quote is rarely the cheapest outcome",
        tone: "warn",
        text: "A system is a twenty-year appointment with whoever installed it. The difference between the lowest and the middle quote is usually small against the cost of a system that was sized wrong, installed hastily, or orphaned by a company that has moved on to the next suburb.",
      },
      { type: "h2", text: "The pre-signature checklist" },
      {
        type: "ul",
        items: [
          "Consumption-based sizing reasoning, in writing, referencing my actual data.",
          "Every model number quoted, with warranty terms for each layer.",
          "Generation estimate with its yield and shade assumptions stated.",
          "Incentive treatment explained, including what changes the price after signing.",
          "Installation scope stated: mounting, switchboard work, monitoring, access and clean-up.",
          "After-sales process described: who to contact, expected response, warranty labour position.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Compare specifications and service, not just price per kilowatt.",
          "Get multiple quotes; details differ where quality does.",
          "Size from consumption and roof reality — never from a template or export dreams.",
          "Plan storage headroom if a battery is likely within a few years.",
          "Read contracts before signing, and verify accreditation and product eligibility independently.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — How to choose a good solar or hot water retailer",
        url: "https://www.solar.vic.gov.au/choose-a-good-retailer",
        note: "Red flags and consumer protection guidance",
      },
      {
        label: "Solar Victoria — Top 5 questions to ask a solar retailer",
        url: "https://www.solar.vic.gov.au/questions-retailer",
        note: "Government-published questions for retailers",
      },
      {
        label: "Clean Energy Council — Find an accredited installer",
        url: "https://www.cleanenergycouncil.org.au/consumers/find-an-installer",
        note: "Accreditation verification starting point",
      },
    ],
    related: ["questions-to-ask-an-installer", "comparing-quotes", "warranties-explained"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "comparing-quotes",
    title: "How to compare solar quotes without being fooled",
    dek: "Quotes are not comparable by default — different specs, different warranties, different fine print. How to normalise them into a table that tells the truth.",
    category: "Buying well",
    readingMinutes: 7,
    published: "2026-06-10",
    updated: "2026-10-15",
    heroImage: asset("/images/hero-rooftop-install.webp"),
    heroAlt: "Installers working on a rooftop solar array — the labour behind every quote compared",
    blocks: [
      {
        type: "p",
        text: "Three solar quotes arrive: $6,200, $7,900 and $5,400. The instinct is to compare the numbers. The correct move is to compare what each number buys — because quote prices only look comparable when the specifications behind them are, and they almost never are on first read.",
      },
      { type: "h2", text: "Build one table, fill it three times" },
      {
        type: "p",
        text: "Take a sheet of paper or a spreadsheet and make these rows, one column per quote: system size and panel count; panel model and wattage; inverter model and type (plain string, optimised, hybrid); mounting system; isolation and protection components; monitoring hardware and platform; battery model if included, with usable kWh and kW; workmanship warranty length; product warranty lengths; expected annual generation and its stated assumption; installed price; incentive treatment and conditions; expected completion timing; payment schedule.",
      },
      {
        type: "p",
        text: "Where a quote cannot fill a row, leave it blank — the gaps are the comparison's most useful output. A quote that answers eight of fourteen rows is not a quote yet; it is a price.",
      },
      { type: "h2", text: "Where the real differences hide" },
      {
        type: "ul",
        items: [
          "Inverter type — a hybrid inverter costs more than a plain string inverter and changes what a future battery requires. Two quotes at similar prices can differ by an entire upgrade path.",
          "Panel performance curve — same warranty length, different guaranteed output and degradation allowances. The numbers in the performance warranty are where panel quality actually shows.",
          "Mounting and protection components — isolators, cable, protection devices and roof sealing are where cheap quotes economise invisibly. Ask for brands, not just 'compliant'.",
          "Monitoring — included or not, hardware or app-only, and who owns the data and the account.",
          "Labour scope — switchboard work, cable runs, access equipment, cleanup and removal of packaging are all quotable line items that some quotes omit and then recover later as variations.",
          "Battery specifics — usable capacity, continuous and peak power, and warranted throughput: the three numbers that decide what storage actually does.",
        ],
      },
      { type: "h2", text: "Price red flags, in context" },
      {
        type: "ul",
        items: [
          "A price dramatically below every other quote for a like-for-like specification — something is being economised, delayed or conditional.",
          "A discount that depends on beating a program deadline the seller cannot control.",
          "A savings figure quoted to the dollar without stated rates and usage assumptions.",
          "Pressure to decide on the first visit: genuine offers survive a night's sleep, and reputable sellers plan for one.",
        ],
      },
      { type: "h2", text: "A worked comparison shape" },
      {
        type: "p",
        text: "The pattern that usually emerges: the middle quote carries the hybrid inverter and the named monitor; the cheapest has neither and a shorter workmanship warranty; the most expensive adds marginal panel efficiency that a larger array would have delivered for less. The right answer is rarely the cheapest or the dearest — it is the quote whose specification fits the household's five-year plan, at a price whose components can all be named.",
      },
      {
        type: "callout",
        title: "Refusal to specify is information",
        tone: "info",
        text: "If a seller will not put model numbers, warranty layers and assumptions in writing before you commit, that reluctance is itself a data point — and it belongs in the comparison table alongside the prices.",
      },
      {
        type: "takeaways",
        items: [
          "Quotes are not comparable until normalised into the same specification rows.",
          "Inverter type, panel performance curves, protection components and labour scope are the usual hidden differences.",
          "Blank rows matter: a quote missing key specifications is a price, not an offer.",
          "The best quote fits your plan; it is rarely the lowest or the highest.",
          "Red flags cluster around urgency, unstated assumptions and vague discounts.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — How to choose a good solar or hot water retailer",
        url: "https://www.solar.vic.gov.au/choose-a-good-retailer",
        note: "Consumer protection guidance for quote comparison",
      },
      {
        label: "Solar Victoria — Top 5 questions to ask a solar retailer",
        url: "https://www.solar.vic.gov.au/questions-retailer",
        note: "Government-published retailer questions",
      },
      {
        label: "Clean Energy Council — Find an accredited installer",
        url: "https://www.cleanenergycouncil.org.au/consumers/find-an-installer",
        note: "Verify accreditation independently of the quote",
      },
    ],
    related: ["questions-to-ask-an-installer", "common-purchasing-mistakes", "warranties-explained"],
    relatedServices: ["residential-solar"],
  },
  {
    slug: "solar-payback-explained",
    title: "Solar payback periods, explained honestly",
    dek: "What payback really measures, which inputs move it most, and how to stress-test any payback figure before you trust it.",
    category: "Costs & payback",
    readingMinutes: 8,
    published: "2026-07-22",
    updated: "2026-10-15",
    heroImage: asset("/images/canberra-solar-homes-aerial.jpg"),
    heroAlt: "Aerial view of Australian homes with rooftop solar arrays — the assets whose payback the article models",
    blocks: [
      {
        type: "p",
        text: "\"Payback in four years\" is the most repeated sentence in solar sales, and the most abused. Payback is a legitimate measure — how long it takes for accumulated savings to equal the net cost of the system — but it is only as honest as the assumptions fed into it. This article shows how the arithmetic works so you can audit anyone's version of it, including ours.",
      },
      { type: "h2", text: "The basic arithmetic" },
      {
        type: "p",
        text: "Simple payback is net cost divided by annual savings. An illustration of the maths: a system costing $6,000 after incentives, saving $1,200 per year, pays back in about five years. Those figures demonstrate the calculation — they are not a price prediction for any household. The interesting part is never the division; it is what sits inside the two numbers.",
      },
      { type: "h2", text: "What actually moves the number" },
      {
        type: "ul",
        items: [
          "Net cost after incentives — the STC discount and any state support reduce the amount that needs paying back. Confirm how the incentive is treated in the price rather than taking a discounted total on faith.",
          "The price of the energy you displace — savings are mostly avoided imports, so they depend on your usage rate. A household paying a higher rate per kWh saves more from the same generation.",
          "Self-consumption share — a kilowatt hour used at home avoids the full retail rate; the same hour exported earns the feed-in tariff, usually a fraction of it. The more of the generation the house uses, the shorter the payback.",
          "Behaviour — schedulable loads (pool, hot water, EV, laundry) moved into daylight raise self-consumption without any hardware change.",
          "Time — tariffs change, feed-in rates move, equipment degrades slightly, and electricity prices have historically risen more often than fallen. Any single-year figure is a snapshot of a moving system.",
          "System size fit — generation far beyond consumption buys a longer payback, not a shorter one, because the surplus earns the low export rate.",
        ],
      },
      { type: "h2", text: "Why your payback is not your neighbour's" },
      {
        type: "p",
        text: "Identical houses on the same street can post quite different paybacks. Roof orientations differ; one household is home in the day and one is not; one runs a pool pump at midday and the other overnight; the tariffs differ; one car is electric and charged in the sun, the next is petrol. Payback is a property of a household's behaviour and tariff as much as of its hardware — which is why template quotes that promise a single figure to a whole suburb should be read with suspicion.",
      },
      { type: "h2", text: "Payback is not the whole story" },
      {
        type: "ul",
        items: [
          "Simple payback ignores everything after it. Panels keep generating for decades past the crossover point, and that back half of the life is where the returns become large.",
          "It ignores the time value of money — $1,200 saved in year eight is worth less than $1,200 today. Financed systems need the loan's interest inside the arithmetic.",
          "For batteries the shape differs: higher net cost, savings concentrated in the import–export price gap, and throughput limits that define the productive life. Battery payback deserves its own calculation, not a quiet assumption inside a panel quote.",
          "Non-financial returns are real: outage resilience, price insulation, and not caring quite so much what the market does next.",
        ],
      },
      { type: "h2", text: "How to stress-test any payback figure" },
      {
        type: "ol",
        items: [
          "Ask for the assumptions in writing: usage rate, feed-in rate, self-consumption percentage, generation per kW, and incentive treatment.",
          "Check that savings are valued at the retail rate for self-consumed energy and the feed-in rate for exports — not the retail rate for everything.",
          "Confirm costs are net of incentives, and that the incentive assumption matches current official rules.",
          "Apply the pessimism pass: what happens if electricity prices stay flat, generation runs 10% low, and nobody shifts a single load? If the business case collapses under those, it was fragile.",
          "Update it with reality: after twelve months, your own bills and monitoring data replace every assumption. That calibrated figure is the only one worth relying on.",
        ],
      },
      {
        type: "callout",
        title: "A payback figure is a model, not a promise",
        tone: "warn",
        text: "No honest estimate guarantees a payback period, because weather, prices and behaviour all influence the result. Demand ranges and assumptions; after the first year, insist on reality.",
      },
      {
        type: "takeaways",
        items: [
          "Payback = net cost ÷ annual savings; both numbers deserve interrogation.",
          "Self-consumption is the main lever — usage rate savings beat feed-in income many times over.",
          "Payback is household-specific: tariff, behaviour and roof shape all move it.",
          "Simple payback ignores the decades of generation after the crossover point.",
          "Stress-test with pessimistic inputs, then recalibrate with a year of real data.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on system value and performance",
      },
      {
        label: "Energy Made Easy — free plan comparison (Australian Energy Regulator)",
        url: "https://www.energymadeeasy.gov.au",
        note: "Actual rates and offers for building your own savings calculation",
      },
      {
        label: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "How STCs affect net cost",
      },
    ],
    related: ["understanding-your-electricity-bill", "feed-in-tariffs-explained", "choosing-system-size"],
    relatedServices: ["residential-solar", "home-batteries"],
  },
  {
    slug: "battery-capacity-vs-power",
    title: "Battery capacity versus power output — the tank and the tap",
    dek: "kWh and kW answer two different questions. Getting them confused is how households buy the wrong battery — in both directions.",
    category: "Batteries",
    readingMinutes: 6,
    published: "2026-08-08",
    updated: "2026-10-15",
    heroImage: asset("/images/home-battery-wall.webp"),
    heroAlt: "Wall-mounted battery modules and inverter — equipment rated for both energy capacity and output power",
    blocks: [
      {
        type: "p",
        text: "Ask a battery salesperson about a model and you will hear two units in the same breath: kilowatt hours and kilowatts. They answer completely different questions — how big the tank is, and how wide the tap — and a battery that is generous in one can still fail you in the other. Confusing the two is the single most common mistake in buying storage.",
      },
      { type: "h2", text: "The definitions, with the analogy that sticks" },
      {
        type: "p",
        text: "Capacity (kWh) is how much energy the battery stores — the size of the tank. Power (kW) is how fast it can deliver that energy — the width of the tap. A thousand-litre tank with a dripping tap can water a garden all day but cannot fill a bucket quickly; a firehose feeding a teacup runs strong for seconds. Home batteries sit somewhere between, and the honest question is whether their tank covers your evening and their tap covers your appliances.",
      },
      { type: "h2", text: "Why one evening tests both numbers" },
      {
        type: "ul",
        items: [
          "Total energy used from 5 pm to 11 pm — cooking, lighting, TV, heating — tests the tank: it needs enough usable kWh to get through without importing.",
          "The largest moment of simultaneous draw — oven and kettle and air-conditioner together — tests the tap: continuous kW must exceed the combined load or the grid quietly tops it up.",
          "Motor and compressor starts — the brief surge of a fridge, pump or air-conditioner starting — test the tap's peak rating, which is usually higher than continuous but time-limited.",
          "The reserve floor — if part of the capacity is held for backup, the usable tank for daily cycling is smaller again.",
        ],
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "A household's evening pattern averages about 6 kWh between 5 pm and 11 pm, with occasional peaks around 4 kW when several appliances coincide. Ignore brand names and imagine three specification sheets:",
      },
      {
        type: "table",
        caption: "Illustrative specifications against the household's evening need (6 kWh, 4 kW peak) — figures illustrate the comparison, not any product",
        head: ["Spec sheet", "Capacity / continuous power", "Verdict for this household"],
        rows: [
          ["Battery A", "5 kWh usable / 2.5 kW", "Too small and too weak: runs flat before 11 pm and the grid covers every appliance coincidence"],
          ["Battery B", "10 kWh usable / 5 kW", "Comfortable fit: covers the evening with margin, handles all coincident loads"],
          ["Battery C", "20 kWh usable / 8 kW", "Stronger than needed: the extra tank is capital that most evenings never touch"],
        ],
      },
      {
        type: "p",
        text: "Note the symmetry: Battery A fails on both numbers, Battery C overshoots both. The right specification is the one where the tank lasts the evening and the tap covers the worst moment — not the biggest numbers on either axis.",
      },
      { type: "h2", text: "What else limits the delivery" },
      {
        type: "ul",
        items: [
          "Round-trip efficiency — every kWh through the battery loses a slice in conversion; the tank delivers less than it stored.",
          "Depth of discharge — the management system holds a floor to protect the cells; usable capacity is what remains above it.",
          "Temperature — heat or cold can restrict both capacity and power at the margins.",
          "Backup reserve — a configured backup floor removes capacity from daily cycling, which is why outage protection and maximum bill savings sometimes trade against each other.",
        ],
      },
      { type: "h2", text: "The five questions for any battery spec sheet" },
      {
        type: "ol",
        items: [
          "What is the usable capacity in kWh (after depth-of-discharge limits)?",
          "What is the continuous power output in kW — and the peak rating, with its time limit?",
          "What round-trip efficiency is specified?",
          "What total energy throughput does the warranty cover, over what period?",
          "How much capacity does the backup configuration reserve, and can it be adjusted?",
        ],
      },
      {
        type: "callout",
        title: "More kWh is not more power — and neither is 'more battery'",
        tone: "info",
        text: "When a quote promises a larger battery, check which number it grew. Extra capacity that the evening never empties adds little; extra power that the appliances never challenge adds nothing. The estimator on this site models both effects against your own inputs.",
      },
      {
        type: "takeaways",
        items: [
          "kWh is the tank; kW is the tap. Both must fit the household's evening.",
          "Simultaneous appliance use and motor starts are what test a battery's kW.",
          "Usable capacity, efficiency and a configured backup reserve shrink the practical tank.",
          "Oversizing capacity wastes capital as surely as undersizing it wastes savings.",
          "Any serious spec sheet answers both axes — ask, and compare, in written figures.",
        ],
      },
    ],
    sources: [
      {
        label: "Solar Victoria — Solar Battery Buyers Guide",
        url: "https://www.solar.vic.gov.au/solar-battery-buyers-guide",
        note: "Independent guide to battery specifications and sizing",
      },
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on home batteries",
      },
    ],
    related: ["how-solar-batteries-work", "solar-during-outages", "feed-in-tariffs-explained"],
    relatedServices: ["home-batteries", "battery-upgrades"],
  },
  {
    slug: "solar-myths-and-facts",
    title: "Solar myths versus facts",
    dek: "Ten claims that circulate at barbecues and in sales pitches — sorted into what is true, what is half-true, and what is nonsense.",
    category: "Solar basics",
    readingMinutes: 7,
    published: "2026-10-08",
    updated: "2026-10-15",
    heroImage: asset("/images/sunlight-window.webp"),
    heroAlt: "Daylight filling a room through a large window — the same diffuse light a solar panel converts",
    blocks: [
      {
        type: "p",
        text: "Word travels fast about solar — usually via a neighbour explaining their bill, a salesperson explaining a rebate, or a social post explaining neither. Here are the claims that recur most, with the honest version of each.",
      },
      { type: "h3", text: "1. \"Solar only works in hot, sunny places\"" },
      {
        type: "p",
        text: "Panels run on light, not heat — they generate on cloudy days and in cool climates. In fact, they are slightly more efficient in the cool, clear conditions of a southern winter than in a heatwave, because high cell temperatures sap a little efficiency. Australia's solar map is generous almost everywhere the sun rises.",
      },
      { type: "h3", text: "2. \"Panels need constant cleaning to keep working\"" },
      {
        type: "p",
        text: "For most Australian homes, rain keeps output close to clean-panel levels. Cleaning earns its keep mainly in dusty inland areas, coastal salt environments and under shedding trees. Monitoring tells you when soiling is actually costing you — see the maintenance article for how to judge.",
      },
      { type: "h3", text: "3. \"Solar means no more power bills\"" },
      {
        type: "p",
        text: "Solar reduces the usage half of a bill dramatically in most cases, but the daily supply charge remains, night-time usage still draws on the grid (or a battery), and winter generates less while households consume more. The realistic claim is a much smaller bill, shaped by tariff and behaviour — not a zero one.",
      },
      { type: "h3", text: "4. \"A bigger system is always better\"" },
      {
        type: "p",
        text: "Generation beyond what the household can use or store is exported at the feed-in rate, which is well below the retail price displaced by self-consumption. Size to consumption first; grow the system for a battery, a vehicle or an electrification plan, not for its own sake.",
      },
      { type: "h3", text: "5. \"Batteries are set-and-forget forever\"" },
      {
        type: "p",
        text: "Batteries need sensible placement (heat is the enemy), have a warranted throughput limit that heavy cycling can approach, and a realistic service life defined in their warranty terms. They are low-maintenance, not maintenance-free or eternal.",
      },
      { type: "h3", text: "6. \"Solar keeps the house running during a blackout\"" },
      {
        type: "p",
        text: "Standard grid-connected systems must shut down within seconds of an outage — anti-islanding protection that keeps linesworkers safe. Keeping power on requires a battery with backup wiring, planned at design time. This surprise is common enough to have its own article.",
      },
      { type: "h3", text: "7. \"All quotes are basically the same — just compare the price\"" },
      {
        type: "p",
        text: "Quotes differ most where the eye cannot see: inverter type, panel performance curves, protection components, monitoring, labour scope and warranty labour coverage. Two similar prices can buy quite different twenty-year outcomes; the comparison table in our buying guide shows what to line up.",
      },
      { type: "h3", text: "8. \"The rebate is a cheque from the government\"" },
      {
        type: "p",
        text: "Federal support works through small-scale technology certificates: the certificates are created at installation and their value is discounted from your invoice by the installer, who handles the paperwork. From 1 May 2026, battery support also tapers by installed capacity. The rebates guide links to the official sources for the current rules.",
      },
      { type: "h3", text: "9. \"Solar will damage my roof\"" },
      {
        type: "p",
        text: "Properly installed mounting is engineered for the roof type, with sealed penetrations and load paths, and panels actually shield the roofing beneath them from direct sun and hail. What causes roof trouble is poor workmanship, aged roof coverings that should have been renewed first, and installation onto a roof that was already failing. Roof condition is a design conversation for exactly this reason.",
      },
      { type: "h3", text: "10. \"You have to be home to get the benefit of solar\"" },
      {
        type: "p",
        text: "Generation is automatic; presence only changes how much of it is self-consumed. Households that are out during the day export more and save less per kilowatt hour — which is precisely what timers, delayed starts, daytime charging and batteries are for. Behaviour shifts the split between cheap exports and full-price avoided imports.",
      },
      { type: "h2", text: "How to check the next bold claim you hear" },
      {
        type: "ul",
        items: [
          "Ask what assumptions sit under the number — rates, usage, self-consumption, generation per kilowatt.",
          "Ask whether the claim is general or specific to your property. Generic promises about specific houses are a contradiction.",
          "Check the official sources: the Clean Energy Regulator for federal schemes, your state's energy department for state programs, the AER's Energy Made Easy for tariffs.",
          "Treat urgency as a warning sign. Real programs have official deadlines you can verify; invented ones expire when you leave the room.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Panels run on light, prefer cool clear days, and keep working through cloud at reduced output.",
          "Cleaning is situational; big bills are dominated by usage rates, not dust.",
          "Bills get smaller, not zero — supply charges and night usage remain.",
          "Outage power needs a battery and backup wiring; standard solar legally shuts down.",
          "Where a claim meets a price, demand the assumptions — and check official sources.",
        ],
      },
    ],
    sources: [
      {
        label: "Clean Energy Council — For consumers",
        url: "https://cleanenergycouncil.org.au/for-consumers",
        note: "Consumer guidance on solar and storage claims",
      },
      {
        label: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
        url: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
        note: "How the federal certificate scheme actually works",
      },
      {
        label: "Solar Victoria — Solar panel buyers guide",
        url: "https://www.solar.vic.gov.au/solar-panel-buyers-guide",
        note: "Independent guidance for common buyer questions",
      },
    ],
    related: ["weather-and-seasons", "cleaning-maintenance-lifespan", "common-purchasing-mistakes"],
    relatedServices: ["residential-solar", "maintenance-support"],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);

const featuredSlugs = [
  "how-solar-batteries-work",
  "understanding-solar-and-battery-incentives",
  "choosing-system-size",
];

export const featuredArticles = featuredSlugs.flatMap((slug) => {
  const article = getArticle(slug);
  return article ? [article] : [];
});
