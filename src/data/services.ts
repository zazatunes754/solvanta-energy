/**
 * Service catalogue. Edit titles, copy, imagery and calls to action here and
 * the services page, home page preview, navigation and service detail guides
 * all follow.
 *
 * Each service carries a long-form `guide` (rendered at /services/:slug) and a
 * short set of service-specific FAQs. Keep every claim hedgeable and honest:
 * no guaranteed savings, no invented certifications or warranty terms — point
 * readers at the actual product documents instead.
 */

import type { ContentBlock } from "./contentTypes";
import { asset } from "../lib/asset";

export type ServiceFaq = {
  question: string;
  answer: string[];
};

export type Service = {
  slug: string;
  title: string;
  /** One-line summary used in index rows and cards. */
  short: string;
  /** Editorial headline used on the services page. */
  tagline: string;
  body: string[];
  includes: string[];
  goodFor: string[];
  image: string;
  imageAlt: string;
  /** Key into the icon map in `src/components/ui/ServiceIcon.tsx`. */
  icon: string;
  /** Optional honesty note shown with the service. */
  note?: string;
  /** Long-form guide shown on the service detail page. */
  guide: ContentBlock[];
  /** Common questions about this service, answered in plain language. */
  faqs: ServiceFaq[];
  /** Slugs of related knowledge hub articles. */
  relatedArticles: string[];
};

export const services: Service[] = [
  {
    slug: "residential-solar",
    title: "Residential solar installation",
    short: "Rooftop solar sized around your real consumption, not a catalogue number.",
    tagline: "A roof survey, a consumption model, and a design you can read before you sign.",
    body: [
      "We start with your electricity usage, your roof and your daily routine — not a standard package. The result is a system size and layout that matches how much power your home actually uses, and when.",
      "Every proposal sets out the panel and inverter specification, the expected generation, the assumptions behind the numbers and the compliance steps required for your state, so you can compare it honestly against other quotes.",
    ],
    includes: [
      "Roof, shading and switchboard assessment before design",
      "A clear system size recommendation with the reasoning shown",
      "Panel, inverter and mounting specification in writing",
      "Grid connection and compliance paperwork guidance",
      "Commissioning, monitoring setup and a handover walkthrough",
    ],
    goodFor: [
      "First-time solar buyers who want a plain-English explanation",
      "Homes with a high bill and a suitable north, east or west roof",
      "Owners planning to add a battery in the next one to three years",
    ],
    image: asset("/images/solar-panels-roof-rows.webp"),
    imageAlt: "Rows of solar panels across the pitched, tiled roofs of neighbouring homes",
    icon: "sun",
    guide: [
      {
        type: "p",
        text: "This guide is the longer version of the conversation that happens before a quote is written: how a rooftop system is planned, what your roof has to offer, what installation day actually involves, and how the system is looked after over the twenty years that follow.",
      },
      { type: "h2", text: "From your bill to a system design" },
      {
        type: "p",
        text: "A solar system should be sized to your consumption, not chosen from a catalogue. The planning sequence we use runs in one direction: usage first, roof second, equipment last.",
      },
      {
        type: "ol",
        items: [
          "Usage review — your quarterly bills give a rough annual consumption figure; a year of half-hourly interval data, if you can download it, shows exactly when that energy is used.",
          "Roof and site assessment — which planes face which way, how much usable area they offer, what shade falls on them and when, and what the switchboard can support.",
          "Consumption and generation model — regional yield figures and a roof factor combine to estimate how many kilowatt hours each kilowatt of panels would produce on your roof.",
          "Size and layout — matching generation to consumption, deciding panel positions, and checking string layouts against shade.",
          "Equipment specification — panels, inverter, mounting, isolation and monitoring, specified by model rather than by brand name alone.",
          "Proposal — the design, the modelled generation and the assumptions behind it, in writing.",
        ],
      },
      { type: "h2", text: "What makes a roof suitable" },
      {
        type: "p",
        text: "Most Australian roofs can host solar. The differences show up in how much the installation earns, and what it costs to build. The factors, in the order they tend to matter:",
      },
      {
        type: "ul",
        items: [
          "Orientation — a north-facing plane is the classic best case. East and west are close behind and simply shift generation to the morning or afternoon; a west plane can pair unusually well with afternoon air-conditioning and evening loads. South-facing planes produce the least and are usually a last resort unless the array is large.",
          "Tilt — output is fairly forgiving between roughly 15° and 35° of pitch. Steeper or flatter roofs cost some generation, and the difference is usually smaller than people expect. Tilt matters less than orientation and shade.",
          "Shade — a tree, chimney or neighbouring building can cut output more than its physical size suggests, especially on a string inverter where shading one panel can drag down a whole string. Shade analysis should say when the shadow falls, not just where.",
          "Roof condition — if the roof covering is near the end of its life, re-roofing is cheaper to do once, before panels go on, than to move panels later. Where re-roofing is due soon, worth sequencing it first.",
          "Roof type and structure — tile, metal and flat roofs all have standard mounting systems, but they arrive at different costs and different cable routes. Structural soundness and wind loading are checked as part of design.",
          "Usable area — as a rough planning rule, allow around five square metres of clear panel area per kilowatt, plus access paths and edge clearances. A typical suburban roof has room for a system in the mid-single digits to low double digits of kilowatts.",
        ],
      },
      { type: "h2", text: "Choosing the right capacity" },
      {
        type: "p",
        text: "The starting target for most homes is an array that generates roughly what the household consumes across a year. That is not a rule — it is a starting point for a conversation — because two homes with identical bills can need different designs depending on when they use power.",
      },
      {
        type: "p",
        text: "The limiting factor is not how much the array can generate; it is how much of that generation the house can use or store. Exports are paid at a feed-in tariff that is usually a fraction of the price you pay for imports, so an oversized array mostly exports cheaply while a well-matched one displaces full-price evening and morning power.",
      },
      {
        type: "callout",
        title: "A battery changes the target",
        tone: "info",
        text: "If a battery is planned within the next few years, a somewhat larger array can make sense, because the battery gives the surplus somewhere to go. If no battery is likely, sizing to consumption — or slightly under it — usually produces the better return.",
      },
      { type: "h2", text: "What installation involves" },
      {
        type: "ol",
        items: [
          "Assessment and design — site visit or detailed remote review, including roof, switchboard and shade.",
          "Approvals — where your network requires pre-approval or an export limit, that application is prepared and lodged before work is scheduled.",
          "Scheduling and delivery — dates confirmed and equipment delivered; access and working areas planned.",
          "Installation day — mounting rails, panels, cabling, isolators, the inverter and switchboard connections. Power is isolated for part of the day while electrical work proceeds.",
          "Commissioning — testing, safety checks and any required inspection before energising.",
          "Paperwork — electrical safety certification where required, network notification, warranty registrations and monitoring setup.",
          "Handover — a walkthrough of the system, the isolation points, and what the monitoring should show on a normal day.",
        ],
      },
      { type: "h2", text: "Warranties, in one table" },
      {
        type: "table",
        caption: "Typical warranty layers on a residential system — confirm the exact terms for the models you are quoted",
        head: ["Layer", "Provided by", "What to check"],
        rows: [
          ["Workmanship", "The installer", "How long it runs, what it covers (roof penetrations, wiring, mounting), and who to call first"],
          ["Panel product", "Panel manufacturer", "Length (commonly 10–25 years), what counts as a defect, and who pays labour to swap a panel"],
          ["Panel performance", "Panel manufacturer", "The guaranteed output at 25 years and the maximum annual degradation (often around 0.4–0.6% per year)"],
          ["Inverter", "Inverter manufacturer", "Length (commonly 5–10 years), extension options, and whether replacement labour is included"],
          ["Battery (if fitted)", "Battery manufacturer", "Years, warranted throughput in megawatt hours, and what happens at the capacity guarantee"],
        ],
      },
      { type: "h2", text: "Keeping the system performing" },
      {
        type: "ul",
        items: [
          "Watch the monitoring for a few weeks after installation, then check it occasionally — a sudden drop in output on a clear day is usually a fault worth reporting.",
          "Look at the array from ground level after severe storms, and keep gutters clear of leaves that could shade panels.",
          "In most of Australia, rainfall does most of the cleaning; dusty or coastal locations may justify occasional professional cleaning.",
          "Consider a professional inspection after five to ten years — checks of isolators, connections and mounting are inexpensive compared with the faults they catch.",
          "Keep the paperwork: invoices, compliance certificates, warranty registrations and a record of faults. It makes any future claim, insurance or sale far easier.",
        ],
      },
      {
        type: "takeaways",
        items: [
          "Design starts from your consumption and roof, not from a package size.",
          "Orientation, shade and roof condition shape the design more than panel brand.",
          "Exports are paid less than imports — self-consumption is where the value is.",
          "Warranties have several layers; the quote should name every model and its terms.",
          "A modest maintenance habit keeps the system measurable and safe for decades.",
        ],
      },
    ],
    faqs: [
      {
        question: "My roof faces east–west, not north. Is solar still worthwhile?",
        answer: [
          "Yes, in most cases. East and west arrays produce only slightly less over a full year than north, and the generation arrives in the morning and afternoon instead of around midday — which can actually suit households that are home in the late afternoon.",
          "For east–west roofs, the design conversation shifts to splitting the array across both planes (often on separate inputs or with per-panel electronics) and sizing around your usage pattern rather than a single peak number.",
        ],
      },
      {
        question: "Can I add more panels or a battery later?",
        answer: [
          "Usually, but it depends on what was designed first. Switchboard capacity, inverter headroom, cable routes and the mounting layout all constrain later additions.",
          "If you expect to expand, say so at design time. Documenting the future plan costs nothing during the first installation and can save a great deal of rework later.",
        ],
      },
      {
        question: "How long does the whole process take, from enquiry to switch-on?",
        answer: [
          "The assessment and proposal stage typically takes days to a couple of weeks. Installation usually follows within a few weeks, but timing depends on your network's approval requirements, equipment availability and something universal: the weather.",
          "Some networks require pre-approval or impose export limits, which adds administrative time. Your installer should tell you which approvals apply to your address and who is lodging them.",
        ],
      },
      {
        question: "What documentation should I receive when the system is finished?",
        answer: [
          "At minimum: a certificate of electrical safety where your state requires one, network connection confirmation, product documentation and warranty registrations, monitoring account access, and a handover summary showing what was installed.",
          "Ask for these as a package at handover. Missing paperwork is far more annoying to chase a year later than it is to collect on the day.",
        ],
      },
      {
        question: "Will the panels work during a blackout?",
        answer: [
          "No — a standard grid-connected solar system must shut down within seconds of a blackout, by law, so it cannot backfeed a network that linesworkers may be repairing. This is called anti-islanding protection and it is a safety feature, not a fault.",
          "Keeping the lights on during an outage requires a battery system with backup wiring, or dedicated standby equipment. If outage protection matters to you, it needs to be part of the design conversation, not an afterthought.",
        ],
      },
    ],
    relatedArticles: ["how-solar-panels-work", "choosing-system-size", "orientation-and-shading"],
  },
  {
    slug: "home-batteries",
    title: "Home battery installation",
    short: "Store your daytime generation and use it after the sun goes down.",
    tagline: "Storage is a sizing decision, not a shopping decision.",
    body: [
      "A battery only earns its place when it is sized against your evening load, your solar surplus and your tariff. An oversized battery is an expensive unused asset; an undersized one leaves savings on the table.",
      "We model how much of your generation is currently exported at a low feed-in rate, how much of that could be shifted into your own evening consumption, and what a particular battery size is realistically worth for your household.",
    ],
    includes: [
      "Battery sizing based on your surplus and evening usage",
      "Placement assessment for safety, clearance and ventilation requirements",
      "Backup and blackout-protection capability explained honestly",
      "Documentation for the installer's compliance and incentive paperwork",
      "Monitoring setup so you can see charge, discharge and bill impact",
    ],
    goodFor: [
      "Homes exporting a large share of solar at a low feed-in tariff",
      "Households with meaningful evening and overnight usage",
      "Anyone wanting some protection from outages",
    ],
    note: "Blackout protection depends on the battery, inverter and the way the backup circuit is wired. Not every battery configuration can run your whole home during an outage — we will tell you exactly what yours will support.",
    image: asset("/images/home-battery-wall.webp"),
    imageAlt: "Wall-mounted home battery units and inverter installed neatly beside a switchboard",
    icon: "battery",
    guide: [
      {
        type: "p",
        text: "A home battery is a set of specifications wearing a marketing department. This guide walks through the numbers that actually determine what a battery can do for a household — capacity, power, efficiency, chemistry and lifespan — and the honest test of whether one is worth buying in your situation.",
      },
      { type: "h2", text: "Capacity is not power — the two numbers that get confused" },
      {
        type: "p",
        text: "Capacity, measured in kilowatt hours (kWh), is how much energy the battery can store. Power, measured in kilowatts (kW), is how much it can deliver at any instant. A battery is sized in kWh but limited by kW; both figures decide whether it can do a given job.",
      },
      {
        type: "p",
        text: "A battery with generous capacity but modest power output may cover a whole evening of gentle household loads but struggle to run an oven, hot water system and air-conditioner together. A high-power battery with small capacity will happily run those appliances — briefly, before it is flat.",
      },
      {
        type: "table",
        caption: "Illustration of the arithmetic on a battery rated at 10 kWh / 5 kW — figures illustrate the maths, not any specific product",
        head: ["Specification", "Illustrative value", "What it means in practice"],
        rows: [
          ["Nameplate capacity", "10 kWh", "The headline number on the brochure"],
          ["Usable capacity at 90% depth of discharge", "9 kWh", "What the battery management system will actually let you draw"],
          ["Continuous power", "5 kW", "The largest load it can run steadily — about one large appliance at a time"],
          ["Peak power (short bursts)", "7–8 kW, often time-limited", "Enough to start a motor or compressor briefly, such as a fridge or pump"],
          ["Round-trip efficiency (say 90%)", "≈ 8.1 kWh returned", "Energy delivered to the house for the 9 kWh discharged"],
        ],
      },
      { type: "h2", text: "Round-trip efficiency, and why it matters to your bill" },
      {
        type: "p",
        text: "Every time energy passes through a battery, some of it is lost — in conversion, in chemistry, in heat. Round-trip efficiency measures what comes back out compared with what went in; for modern home systems it is commonly in the order of 85–95% once conversion losses are counted.",
      },
      {
        type: "p",
        text: "That loss is why storage value depends on the gap between what you are paid for exports and what you pay for imports. Storing a kilowatt hour you could have sold for a few cents, in order to avoid buying one at many times that price, is the trade a battery is making. If the gap is small, so is the gain.",
      },
      { type: "h2", text: "Battery chemistry, at a high level" },
      {
        type: "p",
        text: "Most new stationary home batteries use lithium iron phosphate (LFP) cells, which are prized for long cycle life and good thermal stability. Some products use nickel manganese cobalt (NMC) chemistry, which stores more energy per kilogram and per litre — useful where space is tight. Both chemistries are proven in home storage; the difference shows up in cost, footprint, cycle life and how the manufacturer warranties throughput.",
      },
      {
        type: "p",
        text: "Whatever the chemistry, the visible behaviour is governed by the battery management system (BMS): the electronics that monitor cell voltage and temperature, balance the cells, enforce depth-of-discharge limits and protect the pack from conditions that shorten its life.",
      },
      { type: "h2", text: "A normal day in the life of a battery" },
      {
        type: "ol",
        items: [
          "Early morning: the house runs from the grid, or from leftover stored energy if the battery is programmed to support that.",
          "Morning to midday: solar generation first serves the house; surplus charges the battery.",
          "Afternoon: once the battery is full, further surplus is exported — or, under some tariffs, held back by export limits.",
          "Evening peak: the battery discharges to cover household loads, which is where most of the financial value is created.",
          "Overnight: the battery may continue to supply gentle loads, or hold capacity; the rest comes from the grid.",
        ],
      },
      {
        type: "p",
        text: "On some tariffs and in some jurisdictions, batteries can also be programmed to charge from the grid at cheap times — usually overnight — and discharge during expensive periods. Whether that is permitted and profitable depends on local rules and the price spread; it should be discussed honestly rather than assumed.",
      },
      { type: "h2", text: "Backup capability — what a battery can and cannot do" },
      {
        type: "p",
        text: "During a blackout, a grid-connected solar system must switch off unless it has battery storage and correct backup wiring. Anti-islanding protection exists to keep network lines safe for the people repairing them; a battery with backup capability sidesteps the problem by supplying your home from a stored reserve.",
      },
      {
        type: "ul",
        items: [
          "A dedicated backup circuit runs only selected circuits — usually lights, fridge, internet and a few power points. This is the most common and most affordable configuration.",
          "Whole-home backup needs equipment and battery power sized to your largest loads' starting surge, not just their running watts.",
          "Motors and compressors — air-conditioners, pumps, fridges — draw a brief surge well above their rated power when starting. A battery's peak rating is what handles that.",
        ],
      },
      {
        type: "callout",
        title: "Decide backup before installation, not after",
        tone: "info",
        text: "Which circuits are backed up is a wiring decision made on installation day. Changing your mind later means re-opening the switchboard. If outage protection matters — for medical equipment, working from home, or just peace of mind — say so at design time.",
      },
      { type: "h2", text: "What determines a battery's lifespan" },
      {
        type: "ul",
        items: [
          "Temperature — a battery in a hot garage or direct western sun ages faster than the same battery in a shaded, ventilated position. Placement is a design decision, not an installation detail.",
          "Cycles and depth — regular deep cycling wears cells more than shallow cycling; the BMS manages this, but usage patterns still matter.",
          "State of charge extremes — batteries last longer when they spend less time pinned at 0% or 100%.",
          "Throughput — manufacturers typically warrant a total energy throughput (measured in megawatt hours) as well as a calendar period. A heavily cycled battery can reach its throughput limit before its calendar warranty ends.",
        ],
      },
      { type: "h2", text: "When a battery is likely to pay off — and when it is not" },
      {
        type: "ul",
        items: [
          "Strong case: a large solar surplus exported at a low feed-in rate, high evening consumption, and a wide gap between import and export prices.",
          "Strong case: evening-dominated usage with time-of-use pricing, where stored energy displaces the most expensive hours.",
          "Weaker case: a household that already self-consumes most of its generation because someone is home all day, or one planning to electrify later and unsure of the load it will add.",
          "Weak case: storage bought mainly as a backup generator. You can value resilience, but it will not always show up as a financial return.",
        ],
      },
      {
        type: "p",
        text: "Our savings estimator models both the solar-only and solar-plus-battery cases with your inputs, under the published assumptions. It will not tell you a battery is always better — because it is not — but it shows which numbers decide the answer for your household.",
      },
      {
        type: "takeaways",
        items: [
          "kWh is storage capacity; kW is output power. A battery is fine at one and limited by the other.",
          "Usable capacity and round-trip efficiency mean the delivered energy is less than the nameplate figure.",
          "Value comes from the gap between what you pay for imports and what you are paid for exports.",
          "Backup power depends on wiring and peak ratings — plan it deliberately.",
          "Heat, cycling and placement shape lifespan as much as brand does.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I compare two batteries with different kWh and kW numbers?",
        answer: [
          "Compare both figures against what you need to run. Start by listing the evening loads you want covered and their combined power draw, then check the battery's continuous (kW) and usable (kWh) figures support them.",
          "Usable capacity after depth-of-discharge limits, round-trip efficiency and the warranted throughput are the honest comparison points; nameplate capacity appearing in a brochure is not.",
        ],
      },
      {
        question: "Can a battery be added to solar I already have?",
        answer: [
          "In most cases, yes. If your existing inverter is hybrid-capable, a DC-coupled battery may connect to it directly. Otherwise an AC-coupled battery with its own inverter runs alongside the existing system — the usual approach for retrofits.",
          "The check-up points are inverter age and compatibility, switchboard capacity, wall space and clearances, backup circuit wishes, and whether the existing monitoring can report the battery.",
        ],
      },
      {
        question: "How long should a home battery last?",
        answer: [
          "Product warranties commonly run around ten years, and warranted throughput limits define how much energy the battery can cycle in that time. Realistic service life depends on usage patterns, placement and temperature — a well-placed, gently cycled battery typically fares best.",
          "Ask for the warranty document, not just the warranty period: throughput limits, capacity guarantees and what happens at end of life are all defined there.",
        ],
      },
      {
        question: "Will the battery be full every day?",
        answer: [
          "No — and it should not be expected to. Through winter and on heavy-cloud days there may be little surplus to store, while in summer the battery may fill by mid-morning. A battery is a long-term averaging tool, not a daily guarantee.",
          "This is one reason savings estimates are presented as a range rather than a single figure. A battery that covers most of its modelled throughput across a year is performing as designed.",
        ],
      },
      {
        question: "Can a battery run my air-conditioner during a blackout?",
        answer: [
          "Sometimes. Air-conditioners draw a large starting surge, so both the battery's peak power rating and the inverter equipment determine whether it can start and run. A small split system on a dedicated backup circuit is often manageable; ducted systems across a whole house are a bigger ask.",
          "If running specific appliances during an outage matters, name them during design so the backup circuit and equipment can be sized for those loads.",
        ],
      },
    ],
    relatedArticles: ["how-solar-batteries-work", "battery-capacity-vs-power", "feed-in-tariffs-explained"],
  },
  {
    slug: "inverter-upgrades",
    title: "Inverter replacement and upgrades",
    short: "When the inverter that converts your solar reaches the end of its life — or the system outgrows it.",
    tagline: "The inverter works harder than any other component. Plan its replacement before it plan its own.",
    body: [
      "The inverter is the conversion hub of a solar system: it turns the direct current from your panels into the alternating current your home uses, and it either fails quietly into the monitoring data or stops abruptly one morning.",
      "We assess whether a replacement should match the original specification, move to a hybrid model in anticipation of storage, or change type entirely — and whether the rest of the system is worth keeping alongside it.",
    ],
    includes: [
      "Condition assessment of the existing inverter and array",
      "Replacement specification matched to panel layout and string design",
      "Hybrid-readiness advice if a battery is likely within a few years",
      "Network notification and compliance documentation for the change",
      "Monitoring setup, including a performance baseline after installation",
    ],
    goodFor: [
      "Systems whose inverter is past its warranty and starting to fault",
      "Owners of older solar contemplating battery storage",
      "Any system where output or monitoring has become unreliable",
    ],
    note: "Replacing an inverter resets the clock on the conversion equipment — but not on the panels, the mounting or the wiring. We will tell you plainly if a different kind of intervention is the better use of the money.",
    image: asset("/images/electrician-work.webp"),
    imageAlt: "Technician working on wiring and terminals inside an open electrical control panel",
    icon: "zap",
    guide: [
      {
        type: "p",
        text: "Panels are passive; the inverter is not. It tracks the array's operating point, converts direct current (DC) to alternating current (AC), synchronises with the grid, enforces safety functions and reports everything to your monitoring app. It is usually the first major component a solar system needs help with — which is why replacement decisions deserve more thought than a like-for-like swap.",
      },
      { type: "h2", text: "What the inverter actually does" },
      {
        type: "ul",
        items: [
          "Conversion — turning DC electricity from the panels into the AC your home and the grid use.",
          "Maximum power point tracking (MPPT) — continuously adjusting the electrical operating point of each array input to extract the most power available at that moment.",
          "Grid synchronisation — matching the frequency and voltage of the grid so your generation and the network can coexist safely.",
          "Safety functions — including anti-islanding protection, which shuts generation down during a blackout so linesworkers are never surprised by your system.",
          "Data — generation, fault logs and performance history, which is what makes a fault diagnosable rather than mysterious.",
        ],
      },
      { type: "h2", text: "String, optimised, micro, or hybrid?" },
      {
        type: "table",
        caption: "Inverter types at a glance — strengths and trade-offs rather than brand comparisons",
        head: ["Type", "How it works", "Strong at", "Trade-offs"],
        rows: [
          [
            "String inverter",
            "One unit converts DC from a group (string) of panels",
            "Simplicity, cost per kilowatt, easy servicing",
            "Shading one panel can pull down its string; single point of failure",
          ],
          [
            "String + DC optimisers",
            "Per-panel electronics condition each panel's output before the inverter",
            "Partial shade, mixed orientation, panel-level monitoring",
            "More electronics on the roof; higher cost than a plain string",
          ],
          [
            "Microinverters",
            "A small inverter behind each panel converts at the panel",
            "Panel-level output and monitoring; no single string failure",
            "Usually higher upfront cost; more components exposed to roof conditions",
          ],
          [
            "Hybrid inverter",
            "A string inverter with a battery-ready DC connection",
            "One box for solar and storage; clean upgrade path",
            "You pay for storage-readiness before using it; model choice is narrower",
          ],
        ],
      },
      { type: "h2", text: "Signs the inverter is reaching end of life" },
      {
        type: "ul",
        items: [
          "Frequent faults, restarts or error codes — particularly after hot weather.",
          "Production that has fallen below what previous years or neighbouring systems suggest.",
          "Monitoring that drops out regularly, or stops reporting entirely.",
          "Excessive fan noise or heat, which often signals the unit is working harder than it should.",
          "Age: inverters commonly carry warranties of five to ten years, with a working life often quoted around ten to fifteen. Past the warranty, faults become your cost, and a considered replacement beats an emergency one.",
        ],
      },
      { type: "h2", text: "Replacement considerations, in order" },
      {
        type: "ol",
        items: [
          "Match the replacement to the array — the new inverter must suit the panels' voltage and current characteristics and the existing string layout, or the wiring needs reconfiguring.",
          "Decide about the future now — if a battery is likely within a few years, a hybrid inverter may avoid buying conversion equipment twice. If storage is unlikely, a quality standard inverter is often the better spend.",
          "Check monitoring expectations — most replacements bring modern data logging; confirm who sets it up and what happens to historical data.",
          "Compliance and notification — some replacements require network notification or approval, and all require correct electrical documentation.",
          "Warranty and labour — a new inverter starts a new warranty term; ask whether replacement labour is covered by the original installation warranty or the new product's terms.",
          "Disposal — inverters are electronic waste and should be recycled through a proper channel, never placed in general rubbish.",
        ],
      },
      {
        type: "callout",
        title: "A replacement is a checkpoint, not just a swap",
        tone: "info",
        text: "While the inverter is down, it makes sense to inspect the DC isolators, mounting hardware and cabling as well. Those components age alongside the inverter, and checking them once is cheaper than discovering a problem separately later.",
      },
      {
        type: "p",
        text: "One honest caveat: upgrading an inverter does not increase what your panels can generate. The array's size and condition set that ceiling. A new inverter restores reliability, monitoring and conversion efficiency — it does not add generation that was never there.",
      },
      {
        type: "takeaways",
        items: [
          "The inverter is the hardest-working component and usually the first to need attention.",
          "Replacement choice runs the spectrum from like-for-like to a full hybrid restructure.",
          "Hybrid readiness only pays if a battery is genuinely likely.",
          "Compliance documentation and network notification apply to replacements too.",
          "A new inverter restores reliability — it does not enlarge the array's output.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if my inverter is failing or just an ordinary fault?",
        answer: [
          "Occasional grid-related warnings during storms or voltage events are normal. A pattern is not: repeated fault codes on clear days, output that no longer matches the weather, or monitoring that keeps going offline.",
          "The fault log in the monitoring platform, or on the inverter screen, is the starting point. A technician can usually confirm within a visit whether a repair is sensible or replacement is due.",
        ],
      },
      {
        question: "Can I upgrade to a hybrid inverter without replacing my panels?",
        answer: [
          "Usually yes, provided the existing array's voltage and current characteristics are compatible with the new inverter and the wiring is in serviceable condition. Ageing isolators and cabling are often upgraded at the same time.",
          "The decision is whether battery storage is genuinely likely within a few years. If it is, hybrid can be the cheaper path overall; if not, the battery-ready premium buys nothing today.",
        ],
      },
      {
        question: "Does replacing an inverter require network approval?",
        answer: [
          "It depends on your network and whether the like-for-like rating is preserved. Some areas require notification for any inverter replacement; changing to a different capacity or export limit is more likely to need approval.",
          "Your installer should confirm the local requirement and handle the paperwork — ask which applications apply to your address before scheduling the work.",
        ],
      },
      {
        question: "Will a new inverter work with my existing battery or monitoring?",
        answer: [
          "That depends on the models. Battery systems are generally tied to compatible inverter families, and monitoring platforms sometimes only support certain brands.",
          "Provide the exact model numbers of every existing component when requesting a quote — compatibility checks are done on specific models, not on brand reputations.",
        ],
      },
    ],
    relatedArticles: ["warranties-explained", "how-solar-batteries-work", "solar-panels-or-battery-first"],
  },
  {
    slug: "solar-and-battery",
    title: "Solar and battery combined",
    short: "Panels and storage designed together, so the two systems actually work as one.",
    tagline: "The most useful design conversation happens before anything is installed.",
    body: [
      "Designing panels and storage together avoids the compromises of retrofitting later: the inverter capacity, the wiring, the placement and the backup circuits are all planned as a single system.",
      "We set out how much of your generation will be used directly, how much will be stored, how much will be exported, and what that means for your bill under your current tariff.",
    ],
    includes: [
      "Single coordinated design for generation and storage",
      "Hybrid or AC-coupled architecture recommendation, explained in plain English",
      "Backup circuit planning for the loads that matter most",
      "One commissioning and handover process for the whole system",
      "A monitoring view that separates generation, storage and consumption",
    ],
    goodFor: [
      "New builds and major renovations",
      "Homes planning a battery within a year of installing solar",
      "Households electrifying heating, hot water or a vehicle",
    ],
    image: asset("/images/rooftop-solar-home.webp"),
    imageAlt: "Solar panels across the roofs of neighbouring suburban homes under a clear sky",
    icon: "layers",
    guide: [
      {
        type: "p",
        text: "Panels and batteries are usually sold as a bundle and designed as afterthoughts. Doing it properly means deciding, before anything is ordered, how generation, storage, backup and monitoring will work as one machine — because each of those decisions constrains the others.",
      },
      { type: "h2", text: "Two ways to join generation and storage" },
      {
        type: "p",
        text: "In a DC-coupled design, the battery connects to a hybrid inverter that also handles the panels. Electricity from the roof can move into storage with fewer conversions, which is why this architecture is common on new installations.",
      },
      {
        type: "p",
        text: "In an AC-coupled design, the battery has its own inverter and works alongside whatever solar inverter already exists. For retrofits — especially where an existing inverter is healthy but not hybrid-capable — this is usually the sensible pathway.",
      },
      { type: "h2", text: "What designing them together actually buys you" },
      {
        type: "ul",
        items: [
          "Sizing coherence — the array is sized with the battery's absorption in mind, so surplus has somewhere useful to go.",
          "Electrical headroom — switchboard capacity, circuit protection and cable routes are planned once, for the whole system.",
          "Backup by design — the circuits you want powered during an outage are chosen deliberately, not inherited from existing wiring.",
          "One paper trail — one set of compliance documents, one warranty schedule, one entity to call when something is unclear.",
          "One monitoring view — generation, storage and consumption visible in a single place, which is what makes performance verifiable.",
        ],
      },
      { type: "h2", text: "When retrofitting the battery later is the better sequence" },
      {
        type: "p",
        text: "Designing together does not mean buying together. For many households, solar first and battery later is the wiser plan — it spreads the cost, lets actual generation data answer the storage question, and keeps early savings intact. The key is to install with the sequel in mind: a hybrid-ready inverter, spare switchboard capacity, a planned battery position and a monitoring platform that can grow.",
      },
      { type: "h2", text: "What the pair looks like on a normal day" },
      {
        type: "ol",
        items: [
          "Morning: generation ramps up and serves household demand first.",
          "Midday: surplus charges the battery; once full, additional surplus exports or is limited by network rules.",
          "Afternoon: the battery typically completes charging; loads like pool pumps or pre-cooling can be scheduled into these hours.",
          "Evening peak: stored energy runs the house, displacing the most expensive grid imports of the day.",
          "Overnight: gentle loads may continue from the battery; the rest imports at off-peak rates.",
        ],
      },
      {
        type: "callout",
        title: "Honesty about returns",
        tone: "info",
        text: "A combined system is not automatically a better investment than solar alone. The battery portion only pays where surplus is large, evening usage is real, and the price gap between importing and exporting is wide. We model both configurations and show you the difference in writing.",
      },
      {
        type: "takeaways",
        items: [
          "DC-coupled (hybrid) suits new builds; AC-coupled suits most retrofits.",
          "Designing together plans sizing, wiring, backup and monitoring as one system.",
          "Buying in two stages is fine — installing with the sequel in mind is what matters.",
          "The battery's value depends on surplus, evening load and the import–export price gap, not on the bundle discount.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it cheaper to install solar and a battery at the same time?",
        answer: [
          "Usually somewhat cheaper, because scaffolding, switchboard work and site visits are shared — and the inverter can be correctly specified once rather than revisited. The saving is real but should not pressure the decision: if the battery's economics are marginal, buying it early does not fix them.",
          "The honest sequence is: design both, price both, and buy the battery when the numbers or circumstances justify it.",
        ],
      },
      {
        question: "How big should the array be if a battery is planned?",
        answer: [
          "Slightly larger than the no-battery target, because the battery creates useful demand for surplus generation that would otherwise be exported cheaply. The exact increment depends on battery capacity, your evening load and the tariff structure.",
          "The estimator on this site models array sizing with and without storage under its published assumptions, which makes the trade-off visible before any quote is involved.",
        ],
      },
      {
        question: "What happens to excess generation once the battery is full?",
        answer: [
          "It is exported to the grid, subject to your network's export rules and any limits programmed into the inverter. Some networks restrict exports during congested periods, and some tariffs pay less for daytime exports than afternoon exports.",
          "If export limits apply at your address, the design should account for them — an oversized array with a capped export path wastes potential, and the battery becomes more valuable.",
        ],
      },
      {
        question: "Can we add more panels to the system in future?",
        answer: [
          "Often yes, if the original design left headroom: spare inverter capacity, switchboard space and roof area. If those were not planned, adding panels can mean adding a second inverter or reconfiguring strings.",
          "Tell your designer what the next five years might bring — a battery, an electric vehicle, a heat pump. Planned headroom is cheap; retrofitted headroom is not.",
        ],
      },
    ],
    relatedArticles: ["solar-panels-or-battery-first", "grid-connected-vs-off-grid", "solar-during-outages"],
  },
  {
    slug: "battery-upgrades",
    title: "Battery upgrades and replacements",
    short: "Expand usable storage, or replace ageing equipment with a modern system.",
    tagline: "More capacity is only worthwhile if it is capacity you will use.",
    body: [
      "If your household has changed — an electric vehicle, a heat pump, a growing family — your storage needs have changed too. We assess whether adding capacity, replacing a unit or reconfiguring the system is the better path.",
      "Where an older battery is nearing the end of its warranty or its useful life, we review the whole system rather than swapping one box: inverter compatibility, monitoring, safety compliance and documentation all matter.",
    ],
    includes: [
      "Review of existing capacity, age and warranty position",
      "Load and surplus analysis to test whether more storage pays",
      "Compatibility check with your inverter and monitoring platform",
      "Safe decommissioning and disposal guidance for replaced equipment",
      "Updated compliance documentation after the change",
    ],
    goodFor: [
      "Existing battery owners who regularly drain their storage",
      "Homes that have added an EV, pool or heat pump since installing",
      "Systems with equipment nearing the end of warranty",
    ],
    image: asset("/images/electrician-work.webp"),
    imageAlt: "Technician working on wiring and terminals inside an open electrical control panel",
    icon: "refresh",
    guide: [
      {
        type: "p",
        text: "Storage upgrades are the most commonly oversold work in the solar industry: a battery that ran out every night last winter does not automatically need a second battery — it may need a different tariff, a schedule change, or simply the acknowledgement that winter is winter. This guide sets out when an upgrade genuinely pays and how the decision gets made.",
      },
      { type: "h2", text: "Signals that your storage no longer fits the household" },
      {
        type: "ul",
        items: [
          "The battery consistently empties before the evening's usage ends — a sign the modelled evening load has outgrown the installed capacity.",
          "A significant new load has arrived: an electric vehicle, heat pump, hot water system or pool.",
          "You are importing at expensive times despite a battery, because charging and discharging schedules were never tuned to the tariff.",
          "The equipment is nearing the end of its warranty period and you would rather plan a replacement than react to a failure.",
          "Your electricity plan has changed shape — new time-of-use windows or a changed feed-in rate can shift what storage should be doing.",
        ],
      },
      { type: "h2", text: "The three real options" },
      {
        type: "ol",
        items: [
          "Expand — where the platform supports adding modules, capacity can be increased on the same inverter and management system. This only works if the product family is still supported and the inverter was specified with headroom.",
          "Replace — where the platform is closed, obsolete, or the cells are ageing, a modern system may be substituted entirely. The old battery's inverter, monitoring and compliance may all be superseded at once.",
          "Reconfigure — the option nobody sells you: adjust schedules, change tariff, or shift loads (hot water, EV charging) to daylight hours. Occasionally this achieves more than extra capacity would.",
        ],
      },
      { type: "h2", text: "Compatibility — the constraint that decides everything" },
      {
        type: "p",
        text: "Home batteries are not modular commodity parts. Modules usually only stack within the same product family, on the same management system, under the manufacturer's approvals. Mixed-brand additions are generally unsupported, and an unsupported configuration puts both warranty cover and safety certification at risk.",
      },
      {
        type: "p",
        text: "The compatibility check therefore looks at: the existing battery model and its expansion rules, the inverter's DC or AC capacity, monitoring platform support for additional hardware, switchboard and protection capacity, and the documentation that must be updated when the configuration changes.",
      },
      { type: "h2", text: "Ageing equipment deserves a whole-system review" },
      {
        type: "p",
        text: "If the battery has reached replacement age, so has much of the surrounding system. The inverter (if separate) is of similar vintage, DC isolators and cabling have been in service the same number of years, and switchboard components may date from an even earlier era. A replacement is the natural moment to inspect and, where needed, renew those components together — once, rather than in a sequence of service calls.",
      },
      { type: "h2", text: "Decommissioning and disposal" },
      {
        type: "p",
        text: "Old batteries are electrical waste: they should be isolated safely by a qualified installer, removed without penetrating or damaging the pack, and routed to a proper recycling or take-back channel. Some manufacturers operate take-back schemes through their installation partners. What should never happen is a battery going out with general rubbish or being stored indefinitely in a garage — it remains an energy-storage device with real hazard potential in the wrong conditions.",
      },
      {
        type: "callout",
        title: "Model before you buy",
        tone: "warn",
        text: "More capacity does not automatically mean more savings. If the battery already covers most of your evening usage, adding modules adds cost without adding much discharged energy. The estimator models the marginal case for a larger battery under its published assumptions — start there, then verify with your own monitoring data.",
      },
      {
        type: "takeaways",
        items: [
          "Upgrades are justified by changed loads or ageing equipment, not by anxiety.",
          "Expansion usually requires same-family modules and inverter headroom.",
          "Replacing a battery is a natural moment to refresh the whole system's ageing parts.",
          "Old batteries need safe isolation and proper recycling — never general waste.",
          "Reconfiguring schedules and tariffs occasionally beats buying extra capacity.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I add a second battery of a different brand to my existing one?",
        answer: [
          "Generally no. Battery modules are managed as a coordinated Bank by the same management system, and manufacturers approve expansions only within their own product family. Adding unsupported hardware compromises both safety certification and warranty cover.",
          "Where expansion is not possible on the existing platform, the practical options are replacing the system or adding an entirely separate AC-coupled battery — a decision that needs a proper design review.",
        ],
      },
      {
        question: "My battery is out of warranty but still works. Should I replace it now?",
        answer: [
          "Not necessarily. A battery past its warranted throughput is not automatically unsafe or finished — capacity may have faded and its remaining life is uncertain. The sensible steps are a condition assessment and a realistic look at how much value it still delivers each year.",
          "Planning a replacement on a comfortable timeframe is usually better than waiting for a failure to choose the date for you.",
        ],
      },
      {
        question: "The battery empties every night in winter — does it just need to be bigger?",
        answer: [
          "Maybe, but check the cheaper explanations first: winter generation is lower, evening loads are higher, and the battery may be doing exactly what the season allows. Compare summer and winter behaviour in your monitoring data before concluding capacity is the problem.",
          "If the analysis shows genuine year-round unmet evening load, an expansion may be justified — and the load and surplus model should say by how much.",
        ],
      },
      {
        question: "Does a battery upgrade affect my grid connection or approvals?",
        answer: [
          "Often yes, depending on your network's rules: adding storage can change the site's approved generation and import profile, and some networks require notification for battery additions or replacements.",
          "Compliance documentation also needs updating — the electrical safety paperwork should describe the system as it now stands, not as it was originally approved.",
        ],
      },
    ],
    relatedArticles: ["how-solar-batteries-work", "solar-for-ev-owners", "battery-capacity-vs-power"],
  },
  {
    slug: "system-assessments",
    title: "Existing system assessments",
    short: "An honest review of the solar you already own — including the awkward findings.",
    tagline: "Before you spend more, find out what the current system is doing.",
    body: [
      "Many homes have a system that underperforms: a string fault, a shaded panel, an inverter past its best, a meter not configured for the tariff, or simply a design that never matched the household.",
      "We review generation data, inspect the array and inverter, check the isolation and switchboard arrangement, and report what is performing, what is not, and what is worth fixing in what order of priority.",
    ],
    includes: [
      "Generation and consumption data review",
      "Visual inspection of array, isolators and inverter",
      "Switchboard and safety check as far as is practicable without isolation",
      "Written findings with prioritised recommendations",
      "Clear separation of safety issues, performance issues and optional upgrades",
    ],
    goodFor: [
      "Homes that inherited a system when buying the property",
      "Systems installed ten or more years ago",
      "Anyone whose bill has risen without explanation",
    ],
    image: asset("/images/electricity-meter.webp"),
    imageAlt: "A row of electricity meters mounted on a wall, used for measuring household energy",
    icon: "search",
    guide: [
      {
        type: "p",
        text: "A solar system that switches on every morning is not necessarily a solar system that is working properly. Inverters keep producing from a degraded array, monitoring apps keep drawing their cheerful curves, and a system can run for years at well below its potential without anyone noticing. An assessment is how you find out what is actually happening before spending money on assumptions.",
      },
      { type: "h2", text: "What a review covers" },
      {
        type: "ul",
        items: [
          "Data review — generation history from the monitoring platform where available, compared against expectations for the array's size and your region, plus your consumption pattern if interval data is accessible.",
          "Array inspection — panel condition, visible soiling or damage, hot spots and shading that may have grown since installation (trees, new buildings, satellite dishes).",
          "Isolation and protection — the DC isolators, their condition, and whether they meet current expectations; these are among the most common safety findings on older systems.",
          "Inverter review — fault logs, operating temperatures, error histories and whether the unit is performing to its specification.",
          "Switchboard and metering — as far as is safe without isolation: protection arrangements, and whether the metering and tariff configuration match the system that was installed.",
          "Documentation — what compliance paperwork exists, and whether it matches the system as it physically stands.",
        ],
      },
      { type: "h2", text: "The findings we commonly expect to encounter" },
      {
        type: "p",
        text: "Every system is different, but these are the categories of issue that assessments typically surface — each one is a question to check, not a prediction about your specific property:",
      },
      {
        type: "ul",
        items: [
          "String underperformance — a failing panel, a loose connection or a diode fault dragging down a whole string's output.",
          "New shade — vegetation growth or construction that has quietly encroached on a roof plane that was clear at installation.",
          "Inverter derating — a unit running hot, or an older design that reduces output in high temperatures.",
          "Metering and tariff mismatches — a system behaving correctly while the billing arrangement fails to credit what it exports.",
          "Ageing hardware — isolators, cable insulation and mounting hardware that have spent a decade in sun, wind and salt air.",
        ],
      },
      { type: "h2", text: "How findings are reported" },
      {
        type: "p",
        text: "A useful assessment report separates three very different things, because conflating them is how diagnostics turn into sales pitches:",
      },
      {
        type: "ol",
        items: [
          "Safety items — anything that should be addressed regardless of performance, with a clear explanation of why it matters.",
          "Performance items — faults or losses that are costing generation now, with an indication of the likely cause and the fix.",
          "Optional improvements — battery readiness, monitoring upgrades, cleaning regimes and other choices that are worth considering but are not problems.",
        ],
      },
      { type: "h2", text: "When an assessment is worth commissioning" },
      {
        type: "ul",
        items: [
          "You have bought (or are buying) a property with an existing solar system and want its real condition documented.",
          "Your bill has crept upward with no change in habits.",
          "You are considering a battery, and need to know whether the existing array and inverter can support the upgrade.",
          "The system is ten or more years old and has never been professionally inspected.",
          "A storm, hail event or pest problem has affected the roof, and the array's condition is unknown.",
        ],
      },
      {
        type: "callout",
        title: "The data tells most of the story before anyone climbs on the roof",
        tone: "info",
        text: "Generation history answers the first question — is the system producing what its size and orientation should? — before any hardware is examined. If the data is healthy, the visit is a safety inspection; if it is not, the visit has a specific question to answer.",
      },
      {
        type: "takeaways",
        items: [
          "A running system is not the same as a performing system.",
          "Reviews should separate safety, performance and optional works in writing.",
          "Monitoring data answers the performance question before anyone gets on the roof.",
          "Common findings include string faults, new shading, derating and ageing isolators.",
        ],
      },
    ],
    faqs: [
      {
        question: "My system is producing less than a neighbour's. Is something wrong?",
        answer: [
          "Not necessarily — system size, orientation, tilt, shading, panel model, inverter type and the year of installation all differ between properties, and two houses on the same street can legitimately produce different amounts.",
          "The meaningful comparison is between your system's current output and its own history, adjusted for season and weather. A decline that cannot be explained by either is worth investigating.",
        ],
      },
      {
        question: "How do you check a system's performance before visiting?",
        answer: [
          "Where the monitoring platform provides historical generation, that data is compared against what a system of the stated size and orientation should produce in your region across the same period — with the caveat that yield figures are modelled, not measured.",
          "If interval or billing data is available, it sharpens the picture further: it shows not just what the system generated, but whether that energy was actually used and credited.",
        ],
      },
      {
        question: "Is an assessment a sales visit?",
        answer: [
          "It should not be. A genuine assessment documents what exists — problems and healthy components alike — and prices nothing. If you go on to request works, they should be quoted separately against the written findings, so you can take that report elsewhere for comparison.",
        ],
      },
      {
        question: "What does a system with 'string underperformance' actually mean?",
        answer: [
          "Most residential arrays are wired as one or more strings — panels connected in series. A problem in one panel, such as a bypass diode failure or a degraded cell, can reduce the current through the entire string, so output falls by more than the single panel's share.",
          "Diagnosis usually involves comparing string-level input data from the inverter, panel-level voltages where possible, and physical inspection of panels and connections.",
        ],
      },
    ],
    relatedArticles: ["warranties-explained", "cleaning-maintenance-lifespan", "solar-myths-and-facts"],
  },
  {
    slug: "monitoring-optimisation",
    title: "Monitoring and optimisation",
    short: "See where your energy actually goes, then shift the load behind it.",
    tagline: "Most households can improve their outcome without adding hardware.",
    body: [
      "Monitoring turns a system from a black box into something you can manage: when generation peaks, when the battery fills, what draws power overnight, and whether your tariff still suits the way you live.",
      "We help you set up meaningful dashboards and alerts, then look at practical load-shifting — hot water, pool pumps, EV charging, heating and cooling schedules — so more of your generation is used on site.",
    ],
    includes: [
      "Monitoring platform setup and a walkthrough of the useful views",
      "Tariff comparison guidance based on your actual usage pattern",
      "Load-shifting recommendations you can act on yourself",
      "Alerts for underperformance or equipment faults",
      "A periodic review cadence so the system keeps earning",
    ],
    goodFor: [
      "Owners who want more value from an existing system",
      "Households on time-of-use or demand tariffs",
      "Homes adding an EV or electrifying appliances",
    ],
    image: asset("/images/solar-panel-macro.webp"),
    imageAlt: "Close-up detail of the cell structure across a modern solar panel",
    icon: "activity",
    guide: [
      {
        type: "p",
        text: "A solar system's financial performance is decided by three things after installation: how much it generates, how much of that generation the house uses, and what the unused portion is worth. Monitoring makes all three visible — which is what turns 'I think it's working' into numbers you can act on.",
      },
      { type: "h2", text: "What good monitoring shows" },
      {
        type: "ul",
        items: [
          "Generation in real time and by day, month and year — the baseline for spotting declines.",
          "Consumption, where CT (current transformer) metering is installed — total household draw, separated from solar and grid flows.",
          "Imports and exports — what you buy and what you sell, the two sides of the bill equation.",
          "Battery flows in a storage system — charge, discharge, state of charge, and how many cycles it really completes.",
          "Circuit-level detail where current clamps are fitted to specific loads, which is how the 'what runs overnight?' mystery gets solved.",
        ],
      },
      { type: "h2", text: "Reading a normal day" },
      {
        type: "p",
        text: "On a sunny day most systems draw a distinctive shape: a ramp-up through the morning, a broad midday plateau when generation exceeds household demand, and an evening descent as output falls away while loads rise. The interesting parts of that curve are the gaps: the morning peak before generation starts, and the evening peak after it stops. Those gaps are where your imports — and your money — go, and they are what storage, scheduling or a tariff change can attack.",
      },
      { type: "h2", text: "The cheapest optimisation is behavioural" },
      {
        type: "ul",
        items: [
          "Hot water: many electric systems heat on a timer or on demand overnight. Shifting heating into the solar window converts exported kilowatt hours into avoided imports.",
          "Pool pumps: sand filters need hours of circulation, not specific hours. Midday operation runs them on sunlight.",
          "EV charging: charging in the middle of the day, or after the battery is full, uses generation that would otherwise be exported at a low rate. Some systems can coordinate this automatically.",
          "Laundry, dishwashers and dryers: delay-start functions move these into daylight at no cost.",
          "Heating and cooling: pre-cooling the house in the afternoon while generation is high reduces evening grid draw, and works well with a battery.",
        ],
      },
      { type: "h2", text: "Tariffs: the multiplier nobody changes" },
      {
        type: "p",
        text: "Two households with identical systems and identical habits can pay very different amounts for the same kilowatt hours, purely because of their electricity plan. Flat-rate plans reward any reduction in usage; time-of-use plans reward avoiding peak windows; demand tariffs add a capacity charge based on your highest usage interval, which changes the calculus entirely.",
      },
      {
        type: "p",
        text: "The Australian Energy Regulator's Energy Made Easy service lets consumers compare offers using their actual usage data, free of charge. Reviewing your plan once a year — or after any major change such as solar, a battery or an EV — is one of the highest-yield hours you can spend on your energy bill.",
      },
      { type: "h2", text: "Alerts and review habits that actually help" },
      {
        type: "ul",
        items: [
          "Set an underperformance alert (or calendar reminder) so a string fault is noticed in weeks, not billed away over a year.",
          "Inspect generation after significant weather events — storms and hail are the common causes of physical panel damage.",
          "Review one full month per season. Seasonal variation is normal; a sunny month missing its expected output is not.",
          "After any tariff or household change — a new EV, a heat pump, a new electricity plan — revisit the battery schedule and load timing.",
        ],
      },
      {
        type: "callout",
        title: "Monitoring does not create savings by itself",
        tone: "info",
        text: "It is a measurement tool. The savings appear when the data leads to a decision — shifting a load, changing a schedule or moving tariff. Our role is to set the system up so those decisions are obvious rather than buried.",
      },
      {
        type: "takeaways",
        items: [
          "Generation, self-consumption and export value are the three levers monitoring exposes.",
          "The morning and evening gaps in the curve are where imports are concentrated.",
          "Hot water, pool, EV and laundry timing are free optimisations.",
          "Tariff review is free via Energy Made Easy and can be worth more than hardware.",
          "Alerts convert silent underperformance into a fixable notification.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can my existing system be monitored if it has no app?",
        answer: [
          "In most cases yes — monitoring can be added with a compatible device connected to the inverter or switchboard, depending on the inverter's age and brand. Where the inverter cannot report data, circuit-level monitoring at the switchboard can still show household consumption, imports and exports.",
          "The trade-off is between how much detail the added hardware provides and what it costs; a household consumption view is often enough to act on.",
        ],
      },
      {
        question: "Is it worth changing electricity plans after installing solar?",
        answer: [
          "Often, yes — and it is free to check. Solar changes the shape of your usage: exports during generation hours, imports concentrated in the evening and overnight. Plans differ in how they reward and charge for exactly those patterns.",
          "The Australian Energy Regulator's Energy Made Easy comparison — available in most states and territories — uses your actual usage data, and takes only a few minutes.",
        ],
      },
      {
        question: "Why does my battery discharge into a low feed-in export at night instead of storing for morning?",
        answer: [
          "That is usually a programming choice rather than a fault — some systems discharge to their reserve level at night, then recharge from solar the next day. For most households this is designed to maximise cycle use, though it can waste stored energy if morning import rates are high.",
          "If your tariff has an expensive morning window, ask whether the discharge floor and start time can be adjusted to keep energy in reserve for it.",
        ],
      },
      {
        question: "How do I know if my system is underperforming?",
        answer: [
          "Compare like with like: the same month across two or three years, and clear days against clear days. Seasonal variation and weather explain most differences. A shortfall that persists across good weather weeks is the signal worth investigating.",
          "If the monitoring platform shows string-level data, a single unresponsive string is usually visible immediately as a step-change in output.",
        ],
      },
    ],
    relatedArticles: ["understanding-your-electricity-bill", "feed-in-tariffs-explained", "solar-for-ev-owners"],
  },
  {
    slug: "commercial-solar",
    title: "Commercial and business solar",
    short: "Larger rooftops, daytime load profiles and a business case that has to stack up.",
    tagline: "Commercial solar is a load-matching problem with a payback attached.",
    body: [
      "Businesses usually consume most of their power during the day, which is exactly when solar generates. That can make a well-sized commercial array unusually effective — and a poorly sized one unusually wasteful.",
      "We scope the array against your load profile, roof structure, metering arrangement and network constraints, and present the numbers so a decision-maker can assess the investment properly.",
    ],
    includes: [
      "Load profile analysis and system sizing",
      "Roof structure and access review",
      "Network connection and export limitation guidance",
      "Cost, generation and payback modelling with stated assumptions",
      "Staged rollout options if a single-stage build is not suitable",
    ],
    goodFor: [
      "Warehouses, manufacturing and cold storage with daytime demand",
      "Retail and hospitality sites with air-conditioning load",
      "Agricultural operations with pumping and processing loads",
    ],
    image: asset("/images/solar-farm-aerial.webp"),
    imageAlt: "Aerial view of long rows of solar panels arranged across open ground",
    icon: "building",
    guide: [
      {
        type: "p",
        text: "A commercial solar investment is assessed the way any capital purchase is assessed: against a written business case with stated assumptions. That is the standard this guide applies — first, how the array is matched to the business's load, then how the numbers are presented so a decision can be made properly.",
      },
      { type: "h2", text: "Why the load profile decides everything" },
      {
        type: "p",
        text: "Two businesses with identical power bills can justify completely different solar systems. A cold storage facility that runs compressors around the clock, a workshop that operates standard business hours, and a retail site whose demand is dominated by air-conditioning on summer afternoons all have different shapes of demand — and solar generation has a shape of its own. The design question is how closely the two can be matched.",
      },
      {
        type: "ul",
        items: [
          "Daytime-heavy operations (manufacturing, retail, warehousing) can self-consume a large share of generation, which is where commercial solar performs best.",
          "Extended-hours operations may have significant night load that solar alone cannot touch — storage or tariff strategy becomes a separate question.",
          "Demand charges (included in many business tariffs) are set by peak usage intervals, which solar may or may not influence; the metering data shows which.",
          "Weekend shutdowns change the weekend generation from self-consumed to exported, usually at a lower value.",
        ],
      },
      { type: "h2", text: "How a commercial array gets sized" },
      {
        type: "ol",
        items: [
          "Gather twelve months of interval data from the electricity meter — not a single bill, and not a guess.",
          "Identify the daytime baseline load: the demand that is reliably present whenever the business is operating.",
          "Size generation to serve that baseline first; it is generation consumed on site that carries the full retail value.",
          "Model exports, their volume, and their value under the site's tariff — then check whether the network will even accept them.",
          "Check the network's connection rules for the site: many commercial connections face export limits or approval requirements before any inverter is energised.",
          "Present cost, generation, savings and payback together, with each assumption visible so it can be tested.",
        ],
      },
      { type: "h2", text: "Roof structure, access and constraints" },
      {
        type: "ul",
        items: [
          "Roof type and covering — metal decking, tiles, membrane — each with different mounting systems, costs and warranty implications for the roof itself.",
          "Structural capacity — commercial roofs must be assessed for the additional dead and wind loads, by someone qualified to make that call.",
          "Access and safety — how installers access the roof in compliance with workplace safety rules, and what that adds in cost or scheduling.",
          "Services on the roof — evaporative coolers, vents, skylights and plant all occupy area and cast shade.",
          "Older buildings — some roofing materials (including certain legacy asbestos products) require specialist handling; a pre-scoping inspection establishes what is there.",
        ],
      },
      { type: "h2", text: "The business case, built honestly" },
      {
        type: "p",
        text: "The investment case combines capital cost, operating savings and the value of incentives. Small-scale technology certificates apply at the point of sale as a discount. Operating savings come from displaced imports (retail value) and exports (usually lower value). Any available grants, depreciation treatment or tax considerations should be checked with your accountant — this website deliberately gives no tax advice.",
      },
      {
        type: "p",
        text: "Payback should be presented as a range, because the two largest inputs — future electricity prices and system output — are both uncertain. A business case that quotes a single guaranteed payback figure has not been stress-tested. Our modelling shows the assumptions and lets the reader push back on each one.",
      },
      { type: "h2", text: "Staged rollouts" },
      {
        type: "p",
        text: "A single grand build is not the only structure available. Staging an array over two or three budget years spreads capital expenditure, lets actual generation data from stage one inform the sizing of stage two, and keeps the business case re-testable with real numbers instead of assumptions. It also fits the way many businesses actually approve capital: one tested stage at a time.",
      },
      { type: "h2", text: "What we need to scope a site properly" },
      {
        type: "ul",
        items: [
          "Twelve months of interval consumption data, or the meter's standing data access.",
          "The electricity tariff schedule, including demand or capacity charges if present.",
          "Details of the roof — covering type, age, and any structural documentation the site holds.",
          "A site contact who can confirm operating hours, shutdown periods and any planned changes to the business.",
        ],
      },
      {
        type: "callout",
        title: "No business case without data",
        tone: "warn",
        text: "A commercial quote produced from a bill alone is a guess with a price attached. If a proposal arrives without evidence that the site's interval data was analysed, treat the payback figure on it as marketing until proven otherwise.",
      },
      {
        type: "takeaways",
        items: [
          "Solar performs best where the business load is present while the sun is up.",
          "Interval data, not bills alone, is the foundation of a real business case.",
          "Network export limits can change the design before any equipment is chosen.",
          "Payback belongs in a range with visible assumptions — never as a single promise.",
          "Staged builds spread capital risk and replace assumptions with data.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if a commercial solar quote's payback figure is realistic?",
        answer: [
          "Check three things: whether the generation estimate states its yield assumption, whether the electricity price used to value savings is your actual contracted rate, and whether exports were valued at your real feed-in rate rather than retail. A payback that assumes every generated kilowatt hour displaces full-price power is usually overstated.",
          "A defensible business case shows the numbers so they can be audited — and is comfortable being asked to.",
        ],
      },
      {
        question: "What is an export limitation, and why does it matter commercially?",
        answer: [
          "Networks can restrict how much power a site may export to the grid, sometimes to zero at certain times, to protect local network stability. Where a limit applies, the inverter must be configured to comply, and any generation above what the site uses is curtailed rather than sold.",
          "This makes load matching — and sometimes storage — more important, because the cheapest kilowatt hour is still the one consumed on site.",
        ],
      },
      {
        question: "Can we start with a smaller array and expand later?",
        answer: [
          "In most cases yes, and staging is often the sensible structure. The design should plan for it: roof layout, inverter capacity, cable routes and switchboard space arranged so stage two is an extension rather than a rebuild.",
          "Staging also lets measured performance from stage one replace the assumptions used to plan stage two.",
        ],
      },
      {
        question: "Does commercial solar still attract government incentives?",
        answer: [
          "Eligible systems can generally access small-scale technology certificates in the same way residential systems do, applied as a point-of-sale discount by the installer. Eligibility depends on system size, installers' accreditation and the scheme's current rules.",
          "Battery incentives have their own conditions. Confirm the current position with the official sources — our rebates guide links to each program.",
        ],
      },
    ],
    relatedArticles: ["solar-payback-explained", "choosing-system-size", "grid-connected-vs-off-grid"],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance and support",
    short: "Keep the system safe, compliant and generating what it should.",
    tagline: "A solar system is a long-life asset — it deserves a maintenance habit.",
    body: [
      "Panels and inverters are reliable, but not maintenance-free: DC isolators, connections, mounting hardware, ventilation and firmware all affect safety and output over a fifteen to twenty year life.",
      "We offer scheduled inspection and performance checks, with a written report that separates genuine safety items from cosmetic ones, so you can plan rather than react.",
    ],
    includes: [
      "Scheduled performance and safety inspections",
      "Thermal and visual checks of connections where applicable",
      "Monitoring review and fault diagnosis support",
      "Assistance with warranty claims and documentation",
      "Recommendations ordered by risk and by value",
    ],
    goodFor: [
      "Any installed system, and especially those over five years old",
      "Properties in coastal or high-dust environments",
      "Owners who want a maintenance record for insurance or sale",
    ],
    image: asset("/images/install-crew-panels.webp"),
    imageAlt: "Technician kneeling on a metal roof, wiring a solar panel array with tools laid out nearby",
    icon: "wrench",
    guide: [
      {
        type: "p",
        text: "Solar hardware is rated for decades, but 'rated for decades' is not the same as 'needs nothing'. A modest maintenance habit — mostly observation, with occasional professional attention — is what keeps a system safe, diagnosable and producing close to its potential for its whole working life.",
      },
      { type: "h2", text: "What a scheduled visit checks" },
      {
        type: "ul",
        items: [
          "Panel condition — glass integrity, frame condition, visible hotspots, and soiling or debris that has accumulated.",
          "Connections and isolators — the industry's most common trouble spots: DC isolator condition, connector integrity, cable insulation and UV degradation.",
          "Mounting system — rails, fixings and roof penetrations for corrosion, movement or water ingress paths.",
          "Inverter health — fault logs, temperature behaviour and ventilation around the unit.",
          "Battery systems, where fitted — enclosure condition, ventilation, signage, and state-of-health reporting against the manufacturer's expectations.",
          "Monitoring calibration — confirming the data platform still reflects reality, since optimisation decisions depend on it.",
        ],
      },
      { type: "h2", text: "Cleaning: when it's needed, and how it's done safely" },
      {
        type: "p",
        text: "In most of Australia, rainfall and gravity handle panel cleaning. Dust, pollen, bird droppings and coastal salt accumulate differently: a country property in a dusty area may see meaningful soiling within months, while a suburban roof in a high-rainfall city may need almost nothing. Monitoring tells the story — if generation on clear days drifts down through a dry spell and recovers after rain, soiling was the cause.",
      },
      {
        type: "ul",
        items: [
          "Never walk or stand on panels — the glass and frames are not a working surface, and the fall risk is real.",
          "Clean early in the morning when panels are cool; water on hot glass risks thermal shock and quick evaporation leaves streaks.",
          "Use a soft brush, plain water or a mild detergent — no abrasive pads, no high-pressure blasts near panel edges or wiring.",
          "Keep away from electrical components entirely; anything involving connectors, isolators or cabling is licensed electrical work.",
          "Where the roof is steep, high or otherwise unsafe, it is a professional job — the cost of cleaning is trivial next to the cost of a fall.",
        ],
      },
      { type: "h2", text: "The safety items that matter most" },
      {
        type: "ul",
        items: [
          "DC isolators: a known weak point across the industry, subject to wear, heat and weather. Their condition is checked at every inspection, and replacement is straightforward and inexpensive compared with the faults they can cause.",
          "Connections: loose or corroded connections heat up — a fire risk that visual and thermal checks are designed to catch early.",
          "Mounting hardware: corrosion or movement affects both the panels' security and the roof's watertightness.",
          "Cable management: cables that have sagged onto hot roof surfaces or chafed against edges degrade faster than their ratings assume.",
          "Battery installations: ventilation, clearance and signage requirements are not optional decoration — they exist for safety in fault conditions.",
        ],
      },
      { type: "h2", text: "Warranty support and the paperwork that enables it" },
      {
        type: "p",
        text: "Most warranty disputes are won or lost on records. Keep the original invoice and specification, the compliance certificates, warranty registrations and any fault evidence — screenshots of error codes and monitoring gaps are worth more than remembered descriptions. When something fails, the first call is usually the installer, who coordinates with manufacturers; having the file ready shortens every step.",
      },
      { type: "h2", text: "A maintenance record pays quietly" },
      {
        type: "p",
        text: "Documented maintenance rarely makes headlines, but it does three useful things: it catches faults while they are cheap, it supports insurance claims when something goes wrong, and it answers questions during a property sale with paper instead of assurances. A one-page maintenance log — date, work done, findings — is enough.",
      },
      {
        type: "callout",
        title: "If in doubt, don't",
        tone: "warn",
        text: "Anything involving the roof, wiring, isolators or battery enclosure is not a do-it-yourself zone. Licensed electricians and accredited installers exist so that a maintenance task on a live system never becomes an emergency.",
      },
      {
        type: "takeaways",
        items: [
          "Most Australian systems need little cleaning — but dust, pollen and salt areas differ.",
          "Isolators, connections and mounting hardware are where inspections earn their keep.",
          "Warranty claims run on records: invoices, certificates, screenshots and dates.",
          "Roof and electrical work belong to professionals — always.",
          "A simple maintenance log adds value at insurance time and sale time.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a solar system be professionally inspected?",
        answer: [
          "A sensible rhythm for most homes is an inspection every two to five years, with the shorter end of that range for older systems, coastal properties and high-dust environments. Panels and inverters are durable; it is the connections and mounting that benefit most from a look.",
          "Between visits, monitoring is your early-warning system — a decline on clear days is worth acting on whenever it appears.",
        ],
      },
      {
        question: "Do panels really need cleaning?",
        answer: [
          "Usually less than cleaning companies suggest. Rain handles most of it in most locations. The cases where cleaning genuinely pays are dusty rural areas, properties near busy roads or under trees with fallout, and coastal sites where salt film accumulates.",
          "Use monitoring as the arbiter: if output on clear days drops over a dry period and recovers after rain, cleaning was the missing piece — not before.",
        ],
      },
      {
        question: "What should I do if my inverter shows a fault code?",
        answer: [
          "Note the code and the time it appeared — apps and displays usually keep a fault log. Many codes relate to grid events and clear themselves; some indicate a genuine equipment issue.",
          "If the fault repeats or output stays down on clear days, contact your installer with the code and dates. Turbulent weather can trigger grid-related faults on a healthy system, so a single event is not a diagnosis.",
        ],
      },
      {
        question: "Is it safe to hose down panels on a hot day?",
        answer: [
          "No — sudden cold water on hot glass risks thermal stress, and it is a poor way to clean in any case because the water evaporates before it lifts the dirt. Early-morning cleaning with a soft brush and plain water is the standard method.",
          "If panels are difficult or unsafe to reach, leave it to professionals. No panel soiling is worth a fall.",
        ],
      },
    ],
    relatedArticles: ["cleaning-maintenance-lifespan", "warranties-explained", "solar-myths-and-facts"],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
