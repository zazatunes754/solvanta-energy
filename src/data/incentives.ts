/**
 * ---------------------------------------------------------------------------
 * INCENTIVES & REBATES — VERIFIED CONTENT
 * ---------------------------------------------------------------------------
 * IMPORTANT: incentive programs, eligibility rules and dollar values change
 * frequently. Everything below was checked against official sources on the
 * dates recorded with each item, and every program links back to its official
 * page so visitors can confirm the current position themselves.
 *
 * RULES FOR EDITING THIS FILE:
 *  1. Never state a rebate amount that is not published by the administrator.
 *  2. Never claim a customer "qualifies" — eligibility is decided by the
 *     program administrator, not by this website.
 *  3. Record a `lastVerified` date whenever you re-check a program.
 *  4. If a program stops accepting applications, mark it "closed" rather than
 *     deleting it — people still need to find that out.
 * ---------------------------------------------------------------------------
 */

export type ProgramStatus = "open" | "closed" | "check";

export type IncentiveProgram = {
  id: string;
  name: string;
  appliesTo: "Solar panels" | "Batteries" | "Both" | "Other";
  administrator: string;
  status: ProgramStatus;
  statusLabel: string;
  summary: string;
  keyPoints: string[];
  /** Extra detail rendered in an expandable panel. */
  detail?: {
    title: string;
    intro?: string;
    rows: { label: string; value: string; note?: string }[];
    outro?: string;
  };
  lastVerified: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const federalPrograms: IncentiveProgram[] = [
  {
    id: "cheaper-home-batteries",
    name: "Cheaper Home Batteries Program",
    appliesTo: "Batteries",
    administrator: "Clean Energy Regulator (Australian Government)",
    status: "open",
    statusLabel: "Open — rules changed 1 May 2026",
    summary:
      "A federal program that reduces the upfront cost of an eligible home battery by issuing small-scale technology certificates (STCs) which the installer applies as a discount at the point of sale.",
    keyPoints: [
      "Support is applied as a discount on the invoice — you do not receive a cash payment or claim it yourself.",
      "From 1 May 2026 the STC factor tapers by installed battery capacity, so a larger battery earns proportionally less support per kWh.",
      "Rebates are determined by the installation date, not the date you sign a contract.",
      "The battery must be installed with a solar PV system (new or existing) and product eligibility and installer requirements apply.",
      "Retailers are required to provide accurate, current quotes — the regulator has publicly warned against quoting outdated prices.",
    ],
    detail: {
      title: "How the capacity taper works from 1 May 2026",
      intro:
        "The Clean Energy Regulator publishes the taper as a set of capacity bands. Support per kWh is highest on the first band and reduces on larger systems:",
      rows: [
        { label: "First 0–14 kWh", value: "STC factor at 100%", note: "Full support on the first 14 kWh of capacity" },
        { label: "Above 14–28 kWh", value: "STC factor at 60%", note: "Support reduces on the next 14 kWh" },
        { label: "Above 28–50 kWh", value: "STC factor at 15%", note: "Support reduces further on the last band" },
      ],
      outro:
        "The authority publishes a solar battery STC calculator so you can estimate certificate numbers. The dollar value also depends on the market price of certificates at the time, which is why no responsible installer should quote a fixed discount without a current certificate estimate.",
    },
    lastVerified: "15 October 2026",
    sourceUrl: "https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026",
    sourceLabel: "Clean Energy Regulator — Battery rebates are changing 1 May 2026",
  },
  {
    id: "small-scale-renewable-energy-scheme",
    name: "Small-scale Renewable Energy Scheme (STCs for solar panels)",
    appliesTo: "Solar panels",
    administrator: "Clean Energy Regulator (Australian Government)",
    status: "open",
    statusLabel: "Open",
    summary:
      "The long-running federal scheme that issues small-scale technology certificates for eligible solar panel systems. As with batteries, the value is normally passed on to you as a discount by the installer.",
    keyPoints: [
      "Certificate numbers depend on the system's zone rating, its capacity, and the remaining deeming period — which reduces each year and ends in 2030.",
      "Because the deeming period shrinks annually, the support available for a given system size declines over time.",
      "Eligible products and accredited installation are required.",
      "The certificate market price varies, so two quotes for the same system size can include different discounts.",
    ],
    lastVerified: "15 October 2026",
    sourceUrl: "https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme",
    sourceLabel: "Clean Energy Regulator — Small-scale Renewable Energy Scheme",
  },
  {
    id: "state-territory-programs",
    name: "State and territory programs",
    appliesTo: "Both",
    administrator: "State and territory governments",
    status: "check",
    statusLabel: "Varies by state — verify each program",
    summary:
      "Most states and territories run their own programs alongside the federal schemes. Eligibility tests, income caps, property requirements and funding rounds differ, and programs open and close without much notice.",
    keyPoints: [
      "Some programs are limited to owner-occupiers and include household income and property value tests.",
      "Some are directed at specific groups such as rental properties, apartments, businesses or concession card holders.",
      "Funding is often released in rounds, so a program can be open in one month and closed the next.",
      "You may be able to combine state support with the federal schemes — but the program rules decide, not the installer.",
    ],
    lastVerified: "15 October 2026",
    sourceUrl: "https://www.solar.vic.gov.au/programs",
    sourceLabel: "Example: Solar Victoria program list (Victoria)",
  },
];

/** Jurisdiction directory. Links verified reachable on 15 October 2026. */
export const jurisdictionPrograms: { state: string; label: string; note: string; url: string }[] = [
  {
    state: "VIC",
    label: "Victoria — Solar Victoria",
    note: "A solar panel (PV) rebate of up to $1,400 with an optional matched interest-free loan is available to eligible households. The separate interest-free battery loan is closed to new applications.",
    url: "https://www.solar.vic.gov.au/programs",
  },
  {
    state: "NSW",
    label: "New South Wales — Energy NSW",
    note: "NSW runs household rebate, battery and demand-reduction programs with their own eligibility rules. Check the current list before relying on any single scheme.",
    url: "https://www.energy.nsw.gov.au/households/rebates-grants-and-schemes",
  },
  {
    state: "QLD",
    label: "Queensland — Department of Energy and Climate",
    note: "Queensland has offered solar and battery support through various programs; eligibility and availability have changed between rounds.",
    url: "https://www.epw.qld.gov.au/energy",
  },
  {
    state: "SA",
    label: "South Australia — Energy and Mining",
    note: "South Australian support has historically focused on batteries, hardship and low-income households. Confirm the current position.",
    url: "https://www.energymining.sa.gov.au",
  },
  {
    state: "WA",
    label: "Western Australia — WA Government",
    note: "WA operates state-specific schemes and buyback arrangements that differ from the east-coast market, including for rooftop solar and storage.",
    url: "https://www.wa.gov.au",
  },
  {
    state: "TAS",
    label: "Tasmania — Climate Change",
    note: "Tasmanian household support is typically delivered through energy efficiency and concession programs rather than a standing solar rebate.",
    url: "https://www.climatechange.tas.gov.au",
  },
  {
    state: "ACT",
    label: "ACT — Climate Choices",
    note: "The ACT has offered sustainable household finance and battery support schemes with specific eligibility criteria.",
    url: "https://www.climatechoices.act.gov.au",
  },
  {
    state: "NT",
    label: "Northern Territory — NT Government",
    note: "NT programs have focused on remote and grid-connected households with different technical requirements.",
    url: "https://nt.gov.au",
  },
];

/** Factors that commonly decide eligibility — explained without promising outcomes. */
export const eligibilityFactors: { title: string; description: string }[] = [
  {
    title: "Who owns and lives in the property",
    description:
      "Many programs are limited to owner-occupiers. Some include separate categories for rental properties, apartments or homes under construction, and several require the owner's consent in writing.",
  },
  {
    title: "Household income and property value tests",
    description:
      "Some state programs apply a combined household income cap and a property value threshold. These figures are set by the program and change periodically.",
  },
  {
    title: "Program history at the address",
    description:
      "An address that has already received support for the same technology is usually ineligible — which matters when you buy an existing home with a system already installed.",
  },
  {
    title: "Products on the eligible list",
    description:
      "Programs publish lists of approved panels, inverters and batteries. A product that is perfectly good but not on the list will not attract support.",
  },
  {
    title: "Who installs it",
    description:
      "Installation must generally be carried out by an accredited installer engaged through an approved or authorised retailer, with the correct documentation submitted afterwards.",
  },
  {
    title: "Timing and compliance paperwork",
    description:
      "Installation windows, proof of eligibility documents, photographic compliance requirements and grid pre-approvals all affect whether support is paid. Missing paperwork can mean losing it.",
  },
];

/** What the process looks like from the customer's side. */
export const applicationSteps: { title: string; description: string }[] = [
  {
    title: "Confirm the current program rules",
    description:
      "Start at the official source for your jurisdiction — not a sales page. Check the current funding round, the income and property tests, and the eligible product list.",
  },
  {
    title: "Get a written quote that treats incentives honestly",
    description:
      "A quote should show the system price, the incentive treatment, and what happens if the incentive value changes between quoting and installation.",
  },
  {
    title: "Complete the pre-installation steps",
    description:
      "Some programs require pre-approval to connect and export, a portal application, or proof of income before work begins. Installing before approval can void support.",
  },
  {
    title: "Install within the required window",
    description:
      "Programs impose installation deadlines — Solar Victoria, for example, uses deadlines that differ for existing homes and homes under construction.",
  },
  {
    title: "Submit the documentation",
    description:
      "Certificates of electrical safety, compliance paperwork, photographs and product documentation are submitted after installation. Keep your own copies.",
  },
  {
    title: "Verify what was applied to your invoice",
    description:
      "Your final invoice should show the discount that was actually applied. If the incentive value changed, it should be explained in writing.",
  },
];

export const incentiveDisclaimers = [
  "We are not affiliated with, endorsed by, or acting for any government agency or program administrator.",
  "Program rules, funding rounds and values change. The information here is a starting point verified on the date shown — confirm everything with the official source before making a decision.",
  "No provider can guarantee that you will qualify for a program, or that a discount amount will still be available when your installation is completed.",
  "Incentive support is usually applied by the installer as a discount on your invoice. Where support is reduced or unavailable for any reason, the difference is normally payable by the customer.",
];
