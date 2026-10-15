/**
 * ---------------------------------------------------------------------------
 * SAVINGS ESTIMATOR — ASSUMPTIONS
 * ---------------------------------------------------------------------------
 * These are PLANNING ASSUMPTIONS, not live electricity-market data and not a
 * quotation. They are deliberately conservative and every one of them is shown
 * to the visitor in the interface. Edit the values here to match your own
 * pricing, your region and your design practice — nothing else needs changing.
 *
 * The battery incentive tier structure below reflects the Clean Energy
 * Regulator's published changes to the Cheaper Home Batteries Program that
 * commenced on 1 May 2026 (STC factor tapering by installed capacity).
 * Source: cer.gov.au — "Battery rebates are changing 1 May 2026".
 * ---------------------------------------------------------------------------
 */

export const ESTIMATOR_REVIEWED = "15 October 2026";

export type StateCode = "VIC" | "NSW" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

export type StateAssumption = {
  code: StateCode;
  label: string;
  /** Assumed average usage (import) rate in $/kWh. */
  retailRate: number;
  /** Assumed feed-in tariff for exported energy in $/kWh. */
  feedInTariff: number;
  /** Assumed delivered generation in kWh per kW of panels per year. */
  yieldPerKw: number;
  /** Indicative grid emissions intensity in kg CO2-e per kWh. */
  gridFactor: number;
};

export const stateAssumptions: Record<StateCode, StateAssumption> = {
  VIC: { code: "VIC", label: "Victoria", retailRate: 0.33, feedInTariff: 0.05, yieldPerKw: 1350, gridFactor: 0.79 },
  NSW: { code: "NSW", label: "New South Wales", retailRate: 0.34, feedInTariff: 0.06, yieldPerKw: 1450, gridFactor: 0.66 },
  QLD: { code: "QLD", label: "Queensland", retailRate: 0.32, feedInTariff: 0.07, yieldPerKw: 1550, gridFactor: 0.72 },
  SA: { code: "SA", label: "South Australia", retailRate: 0.44, feedInTariff: 0.05, yieldPerKw: 1550, gridFactor: 0.33 },
  WA: { code: "WA", label: "Western Australia", retailRate: 0.32, feedInTariff: 0.05, yieldPerKw: 1600, gridFactor: 0.51 },
  TAS: { code: "TAS", label: "Tasmania", retailRate: 0.3, feedInTariff: 0.09, yieldPerKw: 1200, gridFactor: 0.13 },
  ACT: { code: "ACT", label: "Australian Capital Territory", retailRate: 0.34, feedInTariff: 0.08, yieldPerKw: 1500, gridFactor: 0.31 },
  NT: { code: "NT", label: "Northern Territory", retailRate: 0.31, feedInTariff: 0.06, yieldPerKw: 1650, gridFactor: 0.55 },
};

export const stateOptions = Object.values(stateAssumptions).map((s) => ({
  value: s.code,
  label: s.label,
}));

/** Property types, with a mild scale factor for commercial premises. */
export const propertyTypes = [
  { value: "residential", label: "Home (residential)", scale: 1 },
  { value: "commercial", label: "Small business", scale: 1.15 },
] as const;

export type PropertyTypeValue = (typeof propertyTypes)[number]["value"];

/** How much electricity is used while the sun is up. */
export const daytimeProfiles = [
  {
    value: "away",
    label: "Usually out during the day",
    selfConsumptionShare: 0.28,
    description: "Typical for full-time workers without daytime appliances running.",
  },
  {
    value: "mixed",
    label: "A mix of both",
    selfConsumptionShare: 0.36,
    description: "Some daytime use — fridge, standby loads, occasional appliances.",
  },
  {
    value: "home",
    label: "Home most of the day",
    selfConsumptionShare: 0.5,
    description: "Working from home, heat pumps, pool or daytime air conditioning.",
  },
] as const;

export type DaytimeProfileValue = (typeof daytimeProfiles)[number]["value"];

/** Roof suitability / shading factor applied to generation. */
export const roofFactors = [
  { value: "excellent", label: "Excellent — north-facing, little shading", factor: 1 },
  { value: "good", label: "Good — some shading or east/west split", factor: 0.9 },
  { value: "limited", label: "Limited — significant shade or unsuitable plane", factor: 0.78 },
] as const;

export type RoofFactorValue = (typeof roofFactors)[number]["value"];

export const estimatorAssumptions = {
  /** Round-trip efficiency assumed for a modern lithium battery. */
  batteryRoundTripEfficiency: 0.9,
  /** Usable share of nameplate battery capacity (depth of discharge). */
  batteryDepthOfDischarge: 0.9,
  /** Fraction of days a battery completes a full cycle, on average. */
  batteryCycleFactor: 0.85,
  /** Array sizing target relative to estimated annual consumption. */
  arraySizingFactorWithoutBattery: 1.0,
  /** Slightly larger array when a battery can absorb the surplus. */
  arraySizingFactorWithBattery: 1.1,
  /** Minimum and maximum array considered for a residential estimate. */
  minArrayKw: 3,
  maxArrayKw: 30,
  /** Indicative installed cost assumptions ($/kW and $/kWh, before incentives). */
  panelCostPerKw: 1000,
  batteryCostPerKwh: 1100,
  /** Spread applied either side of the central estimate, shown as a range. */
  savingsRangeSpread: 0.2,
  /**
   * Indicative federal battery discount per eligible kWh used for the
   * ballpark only. Reported industry figures during 2026 have been in the
   * low-hundreds of dollars per eligible kWh; the exact value depends on the
   * STC market price and the installation date. Verify with the official
   * calculator and the installer's quote before quoting a customer.
   */
  indicativeDiscountPerEligibleKwh: 250,
  /** Cheaper Home Batteries Program capacity tiers (from 1 May 2026). */
  batteryTiers: [
    { fromKwh: 0, toKwh: 14, factor: 1, label: "First 0–14 kWh", note: "STC factor applied at 100%" },
    { fromKwh: 14, toKwh: 28, factor: 0.6, label: "Next 14–28 kWh", note: "STC factor applied at 60%" },
    { fromKwh: 28, toKwh: 50, factor: 0.15, label: "Next 28–50 kWh", note: "STC factor applied at 15%" },
  ],
  tierSource: {
    label: "Clean Energy Regulator — Battery rebates are changing 1 May 2026",
    url: "https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026",
  },
} as const;

export const estimatorDisclaimers = [
  "This tool produces an indicative planning estimate only — it is not a quotation, a guarantee of savings, or an assessment of your eligibility for any government program.",
  "Every number below is a modelled assumption shown to you in full. Your actual outcome depends on your retailer and tariff, your metering and export limits, the size and orientation of the installed system, how you use power, and the weather.",
  "Government incentive programs, their eligibility rules and their value change over time. Always confirm current program conditions with the official source and with your installer before making a decision.",
];
