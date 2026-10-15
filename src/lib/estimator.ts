/**
 * ---------------------------------------------------------------------------
 * SAVINGS ESTIMATOR — PURE CALCULATION
 * ---------------------------------------------------------------------------
 * Kept separate from presentation so the maths can be read, tested and
 * adjusted in one place. Every figure returned here is derived from the
 * documented assumptions in `src/data/estimatorAssumptions.ts`.
 * ---------------------------------------------------------------------------
 */

import {
  daytimeProfiles,
  estimatorAssumptions,
  propertyTypes,
  roofFactors,
  stateAssumptions,
  type DaytimeProfileValue,
  type PropertyTypeValue,
  type RoofFactorValue,
  type StateCode,
} from "../data/estimatorAssumptions";

export type EstimatorInputs = {
  state: StateCode;
  propertyType: PropertyTypeValue;
  /** Quarterly electricity bill in dollars (AUD). */
  quarterlyBill: number;
  hasSolar: boolean;
  /** Existing system size in kW, when hasSolar is true. */
  existingSolarKw: number;
  wantsBattery: boolean;
  /** Considered battery size in kWh. */
  batteryKwh: number;
  daytimeProfile: DaytimeProfileValue;
  roofFactor: RoofFactorValue;
  /** Optional visitor overrides so the assumptions can be tested transparently. */
  retailRateOverride?: number;
  feedInTariffOverride?: number;
  panelCostPerKwOverride?: number;
  batteryCostPerKwhOverride?: number;
};

export type BatteryTierBreakdown = {
  label: string;
  note: string;
  eligibleKwh: number;
  factor: number;
};

export type EstimatorResult = {
  usable: boolean;
  /** Annual consumption implied by the bill and assumed usage rate. */
  annualUsageKwh: number;
  retailRate: number;
  feedInTariff: number;
  systemKw: number;
  annualGenerationKwh: number;
  directSelfUseKwh: number;
  batteryAbsorbedKwh: number;
  batteryDeliveredKwh: number;
  exportedKwh: number;
  importedKwh: number;
  selfConsumptionPct: number;
  baselineCost: number;
  newUsageCost: number;
  exportCredit: number;
  annualSavings: number;
  savingsLow: number;
  savingsHigh: number;
  billReductionPct: number;
  co2AvoidedTonnes: number;
  batteryTierBreakdown: BatteryTierBreakdown[];
  eligibleBatteryKwh: number;
  indicativeBatteryDiscount: number;
  investmentLow: number;
  investmentMid: number;
  basicPaybackYears: number | null;
  notes: string[];
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round = (value: number, digits = 0) => {
  const p = 10 ** digits;
  return Math.round(value * p) / p;
};

/**
 * Cheaper Home Batteries Program capacity taper (from 1 May 2026).
 * Returns how much capacity counts at 100%, 60% and 15% of the STC factor.
 */
export function batteryTierBreakdown(batteryKwh: number): BatteryTierBreakdown[] {
  return estimatorAssumptions.batteryTiers.map((tier) => {
    const inTier = clamp(batteryKwh - tier.fromKwh, 0, tier.toKwh - tier.fromKwh);
    return {
      label: tier.label,
      note: tier.note,
      factor: tier.factor,
      eligibleKwh: round(inTier * tier.factor, 2),
    };
  });
}

export function estimate(inputs: EstimatorInputs): EstimatorResult {
  const state = stateAssumptions[inputs.state];
  const property = propertyTypes.find((p) => p.value === inputs.propertyType) ?? propertyTypes[0];
  const daytime =
    daytimeProfiles.find((d) => d.value === inputs.daytimeProfile) ?? daytimeProfiles[1];
  const roof = roofFactors.find((r) => r.value === inputs.roofFactor) ?? roofFactors[1];

  const A = estimatorAssumptions;
  const notes: string[] = [];

  const retailRate = inputs.retailRateOverride && inputs.retailRateOverride > 0
    ? inputs.retailRateOverride
    : state.retailRate;
  const feedInTariff = inputs.feedInTariffOverride && inputs.feedInTariffOverride >= 0
    ? inputs.feedInTariffOverride
    : state.feedInTariff;
  const annualUsageKwh = round((inputs.quarterlyBill * 4 * property.scale) / retailRate);

  const usable = inputs.quarterlyBill > 0 && annualUsageKwh > 0;

  // --- Sizing -------------------------------------------------------------
  const sizingFactor = inputs.wantsBattery
    ? A.arraySizingFactorWithBattery
    : A.arraySizingFactorWithoutBattery;

  let systemKw: number;
  if (inputs.hasSolar && inputs.existingSolarKw > 0) {
    systemKw = inputs.existingSolarKw;
    notes.push(
      "You told us you already have solar, so the estimate keeps your existing array size and models what storage would add.",
    );
  } else {
    const idealKw = (annualUsageKwh * sizingFactor) / (state.yieldPerKw * roof.factor);
    systemKw = round(clamp(idealKw, A.minArrayKw, A.maxArrayKw), 1);
  }

  const annualGenerationKwh = round(systemKw * state.yieldPerKw * roof.factor);

  // --- Where the generation goes -----------------------------------------
  const directSelfUseKwh = round(Math.min(annualGenerationKwh * daytime.selfConsumptionShare, annualUsageKwh));
  const surplusKwh = Math.max(annualGenerationKwh - directSelfUseKwh, 0);

  let batteryAbsorbedKwh = 0;
  let batteryDeliveredKwh = 0;
  if (inputs.wantsBattery && inputs.batteryKwh > 0) {
    const usableKwh = inputs.batteryKwh * A.batteryDepthOfDischarge;
    const throughputCeiling = usableKwh * 365 * A.batteryCycleFactor;
    // Only energy that would otherwise be exported can be stored and reused.
    batteryAbsorbedKwh = round(Math.min(throughputCeiling, surplusKwh));
    batteryDeliveredKwh = round(batteryAbsorbedKwh * A.batteryRoundTripEfficiency);
  }

  const exportedKwh = round(Math.max(surplusKwh - batteryAbsorbedKwh, 0));
  const importedKwh = round(
    Math.max(annualUsageKwh - directSelfUseKwh - batteryDeliveredKwh, 0),
  );

  const selfConsumptionPct = annualGenerationKwh
    ? round(((annualGenerationKwh - exportedKwh) / annualGenerationKwh) * 100)
    : 0;

  // --- Money --------------------------------------------------------------
  const baselineCost = round(annualUsageKwh * retailRate);
  const newUsageCost = round(importedKwh * retailRate);
  const exportCredit = round(exportedKwh * feedInTariff);
  const annualSavings = round(baselineCost - newUsageCost + exportCredit);
  const spread = A.savingsRangeSpread;

  // --- Incentive ballpark (federal battery program) ----------------------
  const tiers = inputs.wantsBattery ? batteryTierBreakdown(inputs.batteryKwh) : [];
  const eligibleBatteryKwh = round(
    tiers.reduce((total, tier) => total + tier.eligibleKwh, 0),
    2,
  );
  const indicativeBatteryDiscount = round(
    eligibleBatteryKwh * A.indicativeDiscountPerEligibleKwh,
  );

  // --- Investment and payback -------------------------------------------
  const panelCostPerKw = inputs.panelCostPerKwOverride ?? A.panelCostPerKw;
  const batteryCostPerKwh = inputs.batteryCostPerKwhOverride ?? A.batteryCostPerKwh;
  const panelCost = inputs.hasSolar ? 0 : systemKw * panelCostPerKw;
  const batteryCost = inputs.wantsBattery ? inputs.batteryKwh * batteryCostPerKwh : 0;
  const grossInvestment = panelCost + batteryCost;
  const netInvestment = Math.max(grossInvestment - indicativeBatteryDiscount, 0);
  const basicPaybackYears = annualSavings > 0 ? round(netInvestment / annualSavings, 1) : null;

  if (inputs.hasSolar && !inputs.wantsBattery) {
    notes.push(
      "With existing solar and no battery selected, there is little to model — add a battery size to see the storage scenario.",
    );
  }

  return {
    usable,
    annualUsageKwh,
    retailRate,
    feedInTariff,
    systemKw,
    annualGenerationKwh,
    directSelfUseKwh,
    batteryAbsorbedKwh,
    batteryDeliveredKwh,
    exportedKwh,
    importedKwh,
    selfConsumptionPct,
    baselineCost,
    newUsageCost,
    exportCredit,
    annualSavings,
    savingsLow: round(annualSavings * (1 - spread)),
    savingsHigh: round(annualSavings * (1 + spread)),
    billReductionPct: baselineCost > 0 ? round(((baselineCost - newUsageCost) / baselineCost) * 100) : 0,
    co2AvoidedTonnes: round((annualGenerationKwh * state.gridFactor) / 1000, 2),
    batteryTierBreakdown: tiers,
    eligibleBatteryKwh,
    indicativeBatteryDiscount,
    investmentLow: round(grossInvestment),
    investmentMid: round(netInvestment),
    basicPaybackYears,
    notes,
  };
}

/** Validation used by the form so numbers stay in a sensible range. */
export const billBounds = { min: 50, max: 5000 };
export const batteryBounds = { min: 5, max: 50 };
export const existingSolarBounds = { min: 1, max: 30 };
