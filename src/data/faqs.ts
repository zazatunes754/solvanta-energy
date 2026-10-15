/**
 * Frequently asked questions. Grouped so the FAQ page can be filtered and the
 * home page can feature a short selection.
 *
 * HONESTY RULES FOR THIS FILE:
 *  - Never state a rebate amount, eligibility rule or deadline that is not on
 *    an official program page (link to the official source instead).
 *  - Never promise savings, payback periods or that a customer "qualifies".
 *  - Answers should stand alone; internal links point to guides with more depth.
 */

export type Faq = {
  id: string;
  category:
    | "Solar basics"
    | "System sizing"
    | "Installation"
    | "Batteries"
    | "Costs & savings"
    | "Australian incentives"
    | "Maintenance & warranties"
    | "Electricity bills & exports"
    | "Grid outages"
    | "Quotes & enquiries";
  question: string;
  answer: string[];
  /** Optional link to an official or internal reference. */
  link?: { label: string; to: string; external?: boolean };
};

export const faqCategories = [
  "Solar basics",
  "System sizing",
  "Installation",
  "Batteries",
  "Costs & savings",
  "Australian incentives",
  "Maintenance & warranties",
  "Electricity bills & exports",
  "Grid outages",
  "Quotes & enquiries",
] as const;

export const faqs: Faq[] = [
  /* --- Solar basics ------------------------------------------------------ */
  {
    id: "how-panels-work",
    category: "Solar basics",
    question: "How do solar panels actually work?",
    answer: [
      "Solar panels are made of photovoltaic cells, usually silicon. When daylight hits the cell, it knocks electrons loose and creates a direct current (DC) — the photovoltaic effect. This happens in daylight, not just in blazing sun, so the system still generates on overcast days at a reduced output.",
      "An inverter converts that DC electricity into the alternating current (AC) your home uses. Anything your home does not consume at that moment either charges a battery, flows to the grid as an export, or is curtailed if the network or your inverter limits it.",
    ],
    link: { label: "Read: how solar panels work", to: "/knowledge-hub/how-solar-panels-work" },
  },
  {
    id: "kw-vs-kwh",
    category: "Solar basics",
    question: "What is the difference between a kilowatt and a kilowatt hour?",
    answer: [
      "A kilowatt (kW) is a rate — how fast power flows at a given moment, like the width of a pipe. A kilowatt hour (kWh) is a quantity — how much energy moved, like the water that actually passed through the pipe. Your bill is charged in kWh; a system's size and a battery's output rating are in kW.",
      "The distinction explains most of the numbers in a solar quote. A 6.6 kW array generating for four effective full-sun hours produces roughly 26 kWh that day; a 10 kWh battery stores that much energy for later.",
    ],
  },
  {
    id: "cloudy-and-night",
    category: "Solar basics",
    question: "What happens at night or on cloudy days?",
    answer: [
      "At night, generation stops. Your home then runs from the grid, or from a battery if you have one.",
      "Cloud reduces output rather than stopping it. Heavy cloud can cut generation substantially, while thin or broken cloud still allows meaningful production. Heat is also a factor: panels lose a small amount of efficiency as cell temperature rises well above 25°C.",
    ],
    link: { label: "Read: weather and the seasons", to: "/knowledge-hub/weather-and-seasons" },
  },
  {
    id: "surplus-solar",
    category: "Solar basics",
    question: "What happens to solar power I don't use or store?",
    answer: [
      "It is exported to the grid through your meter, and your retailer credits it at the feed-in rate on your plan — usually a fraction of the rate you pay to import power.",
      "Two things can interrupt that flow. Some networks impose export limits, so the inverter reduces or stops exports during congested periods. And if no one is buying — during a blackout, for instance — the inverter must shut down entirely for safety.",
    ],
  },
  {
    id: "solar-winter",
    category: "Solar basics",
    question: "Does solar still work in winter?",
    answer: [
      "Yes, but less. Shorter days and a lower sun angle reduce daily generation in the southern states, while heating loads push consumption up. Cooler temperatures partially offset the loss — clear winter middays can produce strongly, because panels prefer cold sunshine to a heatwave.",
      "The first winter surprises almost every new solar owner. Annual figures, not a June month, are what the system was sized for.",
    ],
    link: { label: "Read: weather and the seasons", to: "/knowledge-hub/weather-and-seasons" },
  },

  /* --- System sizing ----------------------------------------------------- */
  {
    id: "sizing-how",
    category: "System sizing",
    question: "How do I work out what size system I need?",
    answer: [
      "Start with annual consumption in kilowatt hours — summed from your bills, or better, downloaded as interval data. Then estimate what each kilowatt produces on your roof: across Australia, broadly 1,200–1,650 kWh per kW per year depending on region and roof, adjusted down for shade.",
      "Divide consumption by yield and you have a starting size. Then refine it for when you use power, whether a battery or electric vehicle is coming, and whether your network limits exports. If possible, size from interval data rather than a bill total — it shows the timing, and timing is where the value is.",
    ],
    link: { label: "Read: choosing the right system size", to: "/knowledge-hub/choosing-system-size" },
  },
  {
    id: "sizing-roof",
    category: "System sizing",
    question: "My roof is shaded, or doesn't face north. What now?",
    answer: [
      "Neither is disqualifying. East and west roofs generate slightly less per year but shift generation to morning or fixed afternoon patterns — which sometimes suits a household's usage better than a north plane. Split east–west arrays extend the productive window of the day.",
      "Shade is more serious: on a string inverter, shading one panel can reduce a whole string's output. Designs respond by splitting strings around the shade, using per-panel electronics (optimisers or microinverters), repositioning panels, or pruning the offending tree. The first step is an honest shade assessment across the seasons, not a quick look at noon.",
    ],
    link: { label: "Read: orientation and shading", to: "/knowledge-hub/orientation-and-shading" },
  },
  {
    id: "sizing-future",
    category: "System sizing",
    question: "Should I size for an electric car or appliances I don't own yet?",
    answer: [
      "Plan for them; don't necessarily build for them. An electric car can add a third or more to household consumption, and heat pumps and hot water systems move significant load too. Designing with those in mind — inverter headroom, switchboard capacity, cable routes — costs little at installation and saves rework later.",
      "But sizing the array today for loads that arrive in three years spreads the return thinly on capacity that sits idle. Size for today plus a documented plan, and add generation when the load actually appears.",
    ],
    link: { label: "Read: solar for EV owners", to: "/knowledge-hub/solar-for-ev-owners" },
  },
  {
    id: "sizing-oversize",
    category: "System sizing",
    question: "Is a bigger system always better?",
    answer: [
      "No. Generation your household cannot use or store is exported at the feed-in rate — often a small fraction of the retail rate it would have displaced. Past a certain point, each additional kilowatt earns less than the ones before it.",
      "The exception is a planned battery or imminent electrification, which creates uses for extra generation. Without those, sizing close to annual consumption, with a little headroom, usually performs better than the largest array the roof can hold.",
    ],
  },

  /* --- Installation ------------------------------------------------------ */
  {
    id: "installation-day",
    category: "Installation",
    question: "What happens on installation day?",
    answer: [
      "The crew arrives with the pre-approved design, protects access routes and working areas, and installs the mounting system, panels, wiring, isolators and inverter or battery. Switchboard work is completed by a licensed electrician.",
      "Power to the site is isolated for part of the day, so plan around it if someone depends on powered equipment. Most residential installations are completed within a day, with larger or hybrid systems taking longer.",
    ],
  },
  {
    id: "install-time",
    category: "Installation",
    question: "How long does the whole process take, from enquiry to switch-on?",
    answer: [
      "Typically a few days to two weeks from enquiry to a proposal, then a few weeks to installation depending on scheduling, equipment availability and network requirements. Some networks require pre-approval or impose export limits, which adds administrative time before work can be booked.",
      "Weather moves installation dates, and so do inspection queues in busy periods. A reputable installer will tell you which approvals apply at your address and build realistic buffers into the schedule rather than promising a date the network has not agreed to.",
    ],
  },
  {
    id: "install-switchboard",
    category: "Installation",
    question: "Will my switchboard need work?",
    answer: [
      "Often yes, especially on homes older than a decade or two. Solar and batteries add circuits, protection devices and isolation requirements, and the switchboard is where they all connect. Missing or obsolete components are replaced to bring the connection up to current requirements.",
      "This work is quoted before installation, not improvised on the day. If a quote does not mention switchboard assessment at all, ask about it — the cost range is wide and worth knowing in advance.",
    ],
  },
  {
    id: "strata-rental",
    category: "Installation",
    question: "I rent, or live in a strata property. Can I still get solar?",
    answer: [
      "It is possible but more involved. For rentals, the decision usually requires the owner's agreement, and several jurisdictions run specific programs or rebate categories for rental properties. For strata, you generally need approval from the owners corporation or body corporate for work affecting common property.",
      "Start with the property owner or strata committee and the relevant state program rules, then bring in a written design — approvals usually move faster with a specific proposal than with a general enquiry.",
    ],
  },
  {
    id: "install-monitoring",
    category: "Installation",
    question: "What monitoring comes with a system, and who sets it up?",
    answer: [
      "Almost all modern inverters and batteries include an app or web portal showing generation, consumption and battery flows to varying degrees of detail. Some setups need additional metering hardware for whole-home consumption data; battery systems usually include it.",
      "Setup — accounts, Wi-Fi configuration and a walkthrough of the useful views — should be part of commissioning, and it is worth confirming that before installation rather than discovering it afterwards. Keep access credentials for yourself, not just the installer.",
    ],
  },

  /* --- Batteries --------------------------------------------------------- */
  {
    id: "battery-why",
    category: "Batteries",
    question: "Why would I add a battery to solar panels?",
    answer: [
      "Solar panels generate in the middle of the day, but many households use most of their power in the evening and overnight. Without storage, that daytime surplus is exported — usually for a feed-in tariff that is well below the rate you pay to buy power back.",
      "A battery shifts generation from the middle of the day to the times you would otherwise be importing. Whether that is worthwhile depends on how much surplus you have, your evening usage, your tariff, and the installed cost after any incentives.",
    ],
  },
  {
    id: "battery-retrofit",
    category: "Batteries",
    question: "Can a battery be added to an existing solar system?",
    answer: [
      "Usually yes, and it is one of the most common upgrades we scope. There are two main approaches: an AC-coupled battery with its own inverter, which works alongside almost any existing solar inverter, or a DC-coupled battery connected to a hybrid inverter, which is common on newer systems.",
      "The assessment covers inverter age and compatibility, available wall or outdoor space, clearance requirements, switchboard capacity, backup circuit wiring and whether the existing monitoring can report the battery.",
    ],
  },
  {
    id: "battery-size",
    category: "Batteries",
    question: "How big should a home battery be?",
    answer: [
      "Big enough to absorb most of the surplus you generate and cover most of your evening usage, and not much bigger. Common residential sizes in Australia sit in the 5 to 20 kWh usable range, but the right number comes from your own data.",
      "Two figures matter more than nameplate capacity: usable capacity (after depth-of-discharge limits) and continuous power output, which determines how many appliances the battery can run at once.",
    ],
  },
  {
    id: "battery-usable",
    category: "Batteries",
    question: "What is the difference between nameplate and usable battery capacity?",
    answer: [
      "Nameplate capacity is how much energy the battery holds when new under laboratory conditions. Usable capacity is what the battery management system lets you draw in practice — after depth-of-discharge limits, reserve floors and temperature effects. Delivered energy is smaller again after round-trip conversion losses, commonly 85–95% on modern systems.",
      "A battery advertised as 10 kWh may deliver roughly 8 kWh of household supply. None of that is dishonest — it is engineering — but comparisons should be made on usable figures, which is what the warranty and datasheet documents.",
    ],
    link: { label: "Read: battery capacity versus power", to: "/knowledge-hub/battery-capacity-vs-power" },
  },
  {
    id: "battery-value",
    category: "Batteries",
    question: "Is a battery worth it financially?",
    answer: [
      "It depends on a specific set of conditions, and no honest answer can skip them: how much surplus you export and at what rate, how much evening energy you import and at what price, the battery's installed cost after incentives, and how the equipment is used. Where those line up — heavy cheap exports and heavy expensive imports — a battery can make solid sense.",
      "Where they do not — a household already self-consuming most of its generation, or one with a generous feed-in tariff — the case is much weaker, and storage may be better justified by outage protection than by bill savings. Model it with your numbers rather than a rule of thumb.",
    ],
    link: { label: "Run the solar estimator", to: "/solar-estimator" },
  },

  /* --- Costs & savings --------------------------------------------------- */
  {
    id: "cost-what",
    category: "Costs & savings",
    question: "What does a solar system cost?",
    answer: [
      "Price depends on system size, equipment tier, roof complexity, switchboard work, whether storage is included, and your region — which is why a single national figure is meaningless and any quote built from one should be treated with suspicion. Real comparisons come from itemised quotes for your property.",
      "The modelling assumptions behind our estimator, including an indicative installed cost per kilowatt, are published in full beside every result. Treat any single figure — ours included — as a planning placeholder, not a price. The estimator exists to show which assumptions move the outcome, not to quote you.",
    ],
    link: { label: "See the estimator's assumptions", to: "/solar-estimator" },
  },
  {
    id: "savings-factors",
    category: "Costs & savings",
    question: "What actually determines my savings?",
    answer: [
      "Four things: how much you pay per kWh, how much of your generation you use on site, what you are paid for exports, and how much of your usage remains after solar and storage. System size, orientation, shading and metering arrangements all feed into those four.",
      "The largest single lever is often shifting flexible loads — hot water, pool pumps, EV charging, heating and cooling — into the hours when your system is generating or your battery is full.",
    ],
  },
  {
    id: "savings-vary",
    category: "Costs & savings",
    question: "Why did my neighbour get bigger savings than me?",
    answer: [
      "Roof orientation, shade, system size, tariffs, household behaviour and the year of installation all differ between two houses. A household that uses power in the day, runs flexible loads on timers and sits on a time-of-use tariff captures far more value from identical hardware than one that does not.",
      "The weather matters too: two identical systems installed a suburb apart can post different annual totals through shade patterns and microclimate. Compare your system against its own history, not against a neighbour's bill.",
    ],
  },
  {
    id: "payback-realistic",
    category: "Costs & savings",
    question: "What payback period is realistic?",
    answer: [
      "Simple payback is net cost divided by annual savings, and both numbers are household-specific — so any advertised single figure for \"Australia\" is a red flag. A well-matched solar system typically returns its net cost years faster than a battery does, because storage adds cost and earns from a narrower price gap.",
      "The honest process is to model with stated assumptions, stress-test with pessimistic inputs, and recalibrate after twelve months of real bills. Payback is a range shaped by behaviour and policy, not a promise.",
    ],
    link: { label: "Read: solar payback explained", to: "/knowledge-hub/solar-payback-explained" },
  },
  {
    id: "estimator-accuracy",
    category: "Costs & savings",
    question: "How accurate is the savings estimate on this website?",
    answer: [
      "It is an indicative planning estimate built from assumptions that are shown to you in full — average usage rates, regional generation yields, battery efficiency and a documented incentive model. It is not a quotation and not a prediction of your actual bill.",
      "The purpose is to help you understand which factors move the outcome, and to give us a sensible starting point. A real figure needs your interval data, your tariff, your roof and a site assessment.",
    ],
  },

  /* --- Australian incentives --------------------------------------------- */
  {
    id: "incentives-overview",
    category: "Australian incentives",
    question: "What government incentives exist for solar and batteries?",
    answer: [
      "At the federal level, the Small-scale Renewable Energy Scheme issues small-scale technology certificates (STCs) for eligible solar panel systems, and the Cheaper Home Batteries Program extends similar support to eligible battery installations. Support is applied by the installer as a discount at the point of sale rather than a cash payment to you.",
      "Several states and territories also run their own programs, with different eligibility rules, income tests and property requirements. Programs open, close and change — always confirm the current position with the official source before you sign anything.",
    ],
    link: { label: "See current federal and state information", to: "/solar-rebates" },
  },
  {
    id: "incentives-eligibility",
    category: "Australian incentives",
    question: "How is eligibility determined, and who decides?",
    answer: [
      "Eligibility is determined by the program rules and the scheme administrator — not by an installer and not by this website. Typical factors include the property type and ownership, whether the address has previously received a rebate for the same technology, product eligibility lists, the accreditation of the installer, and the compliance documentation submitted at installation.",
      "We can explain the rules and prepare documentation, but no honest provider can promise that a specific customer will qualify. Confirm your own position with the official program before committing.",
    ],
  },
  {
    id: "incentives-changed",
    category: "Australian incentives",
    question: "What changed for batteries on 1 May 2026?",
    answer: [
      "From that date, support under the federal Cheaper Home Batteries Program is calculated with a certificate factor that tapers by installed capacity: the first 0–14 kWh of capacity counts in full, the portion above 14 up to 28 kWh at 60%, and the portion above 28 up to 50 kWh at 15%. Earlier installations were assessed under the previous arrangements.",
      "Two consequences worth understanding: capacity beyond the first band earns diminishing support, and eligibility depends on the installation date — not the date a contract is signed. The regulator has warned against promises built on beating deadlines. Verify current rules on the official page before relying on any figure.",
    ],
    link: { label: "Official source and current rules", to: "/solar-rebates" },
  },
  {
    id: "incentives-combine",
    category: "Australian incentives",
    question: "Can I combine federal and state incentives?",
    answer: [
      "Often yes, where both apply and their conditions permit it — many state programs are designed to stack on top of federal certificate support, and quotes typically show a single discounted price with the stacking already inside it. But each program writes its own rules: some exclude households that have received other support, some cap combined benefits, and some apply only to specific products or installers.",
      "The practical approach is procedural: check the official page for your state or territory, confirm every product and installer in the quote appears on the relevant lists, and ask the quoting company to itemise how each discount is calculated and what happens if one falls through.",
    ],
    link: { label: "State-by-state program directory", to: "/solar-rebates" },
  },
  {
    id: "incentives-quotes",
    category: "Australian incentives",
    question: "Why do two quotes show different rebate amounts for the same system?",
    answer: [
      "Three common reasons. First, certificate market values move and different companies assume different prices when quoting discounts. Second, eligibility details differ — a quote that assumes your address qualifies for a program that your address may not pass can show a larger discount. Third, batteries make it complex: the discount depends on eligible (post-taper) capacity, and two quotes can disagree about which capacity band applies or whether the product is eligible at all.",
      "Ask each company to state, in writing, the certificate volume assumed, the price per certificate, and which programs are included with their eligibility conditions. If a company cannot itemise its discount, the discount is doing marketing work, not accounting work.",
    ],
  },

  /* --- Maintenance & warranties ------------------------------------------ */
  {
    id: "panel-life",
    category: "Maintenance & warranties",
    question: "How long do panels and inverters last, and what do warranties cover?",
    answer: [
      "Panels commonly carry a product warranty in the range of 10 to 25 years and a separate performance warranty covering output over 25 years, with an expected degradation of roughly 0.4%–0.6% per year in many manufacturer documents. Actual terms vary by brand and model — read the specific warranty for the product quoted to you.",
      "Inverters are usually the shorter-lived component, often with a 5 to 10 year warranty and a realistic working life in that range. Confirm who handles a warranty claim, how long a replacement takes, and whether labour is included.",
    ],
    link: { label: "Read: understanding solar warranties", to: "/knowledge-hub/warranties-explained" },
  },
  {
    id: "warranty-labour",
    category: "Maintenance & warranties",
    question: "Who handles a warranty claim, and is labour covered?",
    answer: [
      "The installer is the conventional first point of contact, even when the claim is against a manufacturer — they know the system and its history. Beyond that, four separate warranties can be relevant: the installer's workmanship warranty, product warranties, panel performance warranties, and battery throughput guarantees. Each has its own process.",
      "Labour coverage is where policies differ most. Some product warranties replace the part and leave you to pay for installation; others include labour through the manufacturer or the original installer. This is worth clarifying before you buy, not when something fails in year four.",
    ],
  },
  {
    id: "maintenance-cleaning",
    category: "Maintenance & warranties",
    question: "Do solar panels need cleaning?",
    answer: [
      "Usually less than cleaning services suggest. In most of Australia, rain handles it. Dusty inland areas, coastal salt environments and roofs under shedding trees are the exceptions where cleaning genuinely pays.",
      "The honest test is monitoring: if output on clear days declines through a dry spell and recovers after rain, soiling cost you money. And however the cleaning happens, safety comes first — no walking on panels, no high-pressure jets near edges, and no DIY near wiring or isolators.",
    ],
    link: { label: "Read: cleaning, maintenance and lifespan", to: "/knowledge-hub/cleaning-maintenance-lifespan" },
  },
  {
    id: "maintenance-inspection",
    category: "Maintenance & warranties",
    question: "How often should a system be professionally inspected?",
    answer: [
      "Every two to five years is a sensible rhythm for most homes — with the shorter interval for older systems, coastal properties and high-dust locations. The components that benefit most are the inexpensive ones: isolators, connectors, mounting hardware and cable condition.",
      "Between inspections, monitoring is the early-warning system. Watch for step changes in output on clear days, fault codes, or a battery that behaves differently — these are worth a service call even when nothing looks obviously wrong.",
    ],
    link: { label: "See the maintenance service", to: "/services/maintenance-support" },
  },

  /* --- Electricity bills & exports ---------------------------------------- */
  {
    id: "feed-in",
    category: "Electricity bills & exports",
    question: "Why is the feed-in tariff so much lower than what I pay?",
    answer: [
      "Feed-in tariffs pay you something close to the wholesale value of the energy at the time, minus retail costs, while your usage rate includes network charges, environmental programs, metering and retail margin. The gap between the two is precisely why self-consumption is worth more than exporting.",
      "Feed-in rates are set by retailers and regulators and change over time and by state. Check your own plan's current rate before comparing quotes that assume a particular figure.",
    ],
    link: { label: "Read: feed-in tariffs explained", to: "/knowledge-hub/feed-in-tariffs-explained" },
  },
  {
    id: "bill-anatomy",
    category: "Electricity bills & exports",
    question: "Why didn't my bill drop as much as I expected?",
    answer: [
      "Three usual suspects. The supply charge — the fixed daily cost of being connected — is untouched by solar and sets a floor under every bill. Seasonality cuts both ways: winter generation falls exactly when heating raises usage. And timing: if most of your usage is in the evening, generation during the day cannot help directly without a battery or load shifting.",
      "Reading a full year of bills per quarter, rather than one season against an expectation, shows the true pattern. If the numbers still look wrong after that, the monitoring data and tariff settings are the first things a review should check.",
    ],
    link: { label: "Read: understanding your bill", to: "/knowledge-hub/understanding-your-electricity-bill" },
  },
  {
    id: "export-limits",
    category: "Electricity bills & exports",
    question: "Can my network limit what I export to the grid?",
    answer: [
      "Yes. Many distribution networks impose export limits — a cap on instantaneous export power, or restrictions during congested periods — to protect local voltage and network stability. When a limit applies, the inverter is configured to comply, and generation above what the household uses (or stores) is curtailed rather than sold.",
      "This matters for design: an oversized array on a constrained connection wastes potential, and a battery becomes more valuable because storage keeps surplus usable on site. Your installer should confirm your network's rules during the design stage.",
    ],
  },
  {
    id: "tariff-choice",
    category: "Electricity bills & exports",
    question: "Should I change electricity plans after installing solar?",
    answer: [
      "Often yes — and it is free to check. Solar changes the shape of your usage: imports concentrate into evenings and overnight, exports into the day. Plans differ meaningfully in how they price those patterns, and the plan that was optimal before solar is frequently not optimal after.",
      "Use the Australian Energy Regulator's free comparison service, Energy Made Easy, with your actual usage data — and when you have solar, its export volumes too. Reviewing once a year, or after any major change such as a battery or an EV, keeps the plan aligned with reality.",
    ],
    link: { label: "Energy Made Easy (official comparison service)", to: "https://www.energymadeeasy.gov.au", external: true },
  },

  /* --- Grid outages ------------------------------------------------------- */
  {
    id: "outage-solar-only",
    category: "Grid outages",
    question: "I have solar but no battery — why did it stop in a blackout?",
    answer: [
      "Because it must. Grid-connected inverters have anti-islanding protection that shuts them down within seconds of an outage, so a blacked-out street cannot be energised by a household system while linesworkers repair the network. The shutdown is automatic, mandatory and required.",
      "Keeping power on during an outage requires a battery system with backup wiring, or dedicated standby equipment. If outage resilience matters, it needs to be part of the design conversation — retrofitting backup circuits later is more expensive than planning them upfront.",
    ],
    link: { label: "Read: what happens to solar during an outage", to: "/knowledge-hub/solar-during-outages" },
  },
  {
    id: "battery-outage",
    category: "Grid outages",
    question: "What can I actually run on battery power during an outage?",
    answer: [
      "Whatever the backup circuits include and the battery's power ratings can carry. The standard arrangement connects a selected set of circuits — typically lights, refrigerator, internet and some power points — to the backup path. Larger equipment works when the battery's continuous and peak power ratings cover its draw, including motor starting surges.",
      "Run time comes from usable capacity divided by the loads actually running — and during a long outage, replenishment depends on solar and weather. Treat outage power as a managed reserve, not an unlimited supply, and test the arrangement as part of commissioning.",
    ],
  },

  /* --- Quotes & enquiries ------------------------------------------------- */
  {
    id: "installer-checklist",
    category: "Quotes & enquiries",
    question: "What should I prepare before requesting a quote?",
    answer: [
      "A recent electricity bill (or access to interval data), your address and roof type, photos of the switchboard and the roof if possible, whether you are planning an electric vehicle or hot water change, and any strata or heritage constraints.",
      "It also helps to know your goals: lowest upfront cost, shortest payback, maximum independence, or outage protection. Those goals lead to different recommendations, and saying them upfront saves everyone time.",
    ],
  },
  {
    id: "comparing-quotes",
    category: "Quotes & enquiries",
    question: "How do I compare quotes honestly?",
    answer: [
      "Compare the specification (panel, inverter and battery models, mounting and monitoring), the generation estimate and its assumptions, the expected self-consumption, the incentive treatment, the warranty terms including labour, and what happens if something fails.",
      "Be sceptical of savings figures presented without assumptions, and of any provider who guarantees a rebate amount, promises an outcome that depends on your behaviour, or pressures you to sign during the visit.",
    ],
    link: { label: "Read: how to compare solar quotes", to: "/knowledge-hub/comparing-quotes" },
  },
  {
    id: "quote-red-flags",
    category: "Quotes & enquiries",
    question: "What should make me walk away from a solar quote?",
    answer: [
      "A guaranteed savings or payback figure with no stated assumptions. A promise of rebate eligibility made on the administrator's behalf. Pressure to sign immediately to \"lock in\" a price or program. No written specification. Refusal to answer questions about models, warranties or labour in writing. And a price dramatically below every other like-for-like quote — the difference is usually being paid for later, one way or another.",
      "None of these individually proves bad faith, but two or three together describe a sales process rather than a design process. The market has better options in every state.",
    ],
    link: { label: "Read: common purchasing mistakes", to: "/knowledge-hub/common-purchasing-mistakes" },
  },
  {
    id: "enquiry-next",
    category: "Quotes & enquiries",
    question: "What happens after I send an enquiry?",
    answer: [
      "We read it properly. If the information is sufficient, you get an initial response with clarifying questions and a view of what is likely to be worth investigating. If a site visit or data review is needed, that is proposed with a clear purpose — including the situations where the honest answer is that solar or storage is not yet the right move.",
      "Nothing is sent in bulk, added to a marketing list, or passed to third parties. See the contact page for how enquiries are handled and what to prepare.",
    ],
    link: { label: "Go to the contact page", to: "/contact" },
  },
];

/** A short, high-value subset for the home page. */
export const featuredFaqIds = [
  "how-panels-work",
  "battery-why",
  "battery-outage",
  "savings-factors",
  "incentives-overview",
  "comparing-quotes",
];
