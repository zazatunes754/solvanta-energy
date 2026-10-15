import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Calculator, ChevronRight, RotateCcw, Send } from "lucide-react";
import {
  batteryBounds,
  billBounds,
  estimate,
  existingSolarBounds,
  type EstimatorResult,
} from "../lib/estimator";
import {
  daytimeProfiles,
  estimatorAssumptions,
  ESTIMATOR_REVIEWED,
  estimatorDisclaimers,
  propertyTypes,
  roofFactors,
  stateAssumptions,
  stateOptions,
  type StateCode,
} from "../data/estimatorAssumptions";
import { cents, currency, number } from "../lib/format";
import { Button } from "../components/ui/Button";
import { Callout, SectionHeading } from "../components/ui/primitives";
import { ChipGroup, Field, RangeField, SelectInput, TextInput } from "../components/ui/Field";
import { useSeo } from "../hooks/useSeo";
import { CtaBand } from "../components/sections/HomeHero";

type FormState = {
  state: StateCode;
  propertyType: string;
  quarterlyBill: number;
  hasSolar: boolean;
  existingSolarKw: number;
  wantsBattery: boolean;
  batteryKwh: number;
  daytimeProfile: string;
  roofFactor: string;
  retailOverride: string;
  feedInOverride: string;
  panelCostOverride: string;
  batteryCostOverride: string;
};

const defaults: FormState = {
  state: "VIC",
  propertyType: "residential",
  quarterlyBill: 650,
  hasSolar: false,
  existingSolarKw: 6.6,
  wantsBattery: true,
  batteryKwh: 13.5,
  daytimeProfile: "mixed",
  roofFactor: "good",
  retailOverride: "",
  feedInOverride: "",
  panelCostOverride: "",
  batteryCostOverride: "",
};

const isStateCode = (value: string | null): value is StateCode =>
  value !== null && Object.prototype.hasOwnProperty.call(stateAssumptions, value);

export default function Estimator() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useSeo({
    title: "Solar & battery savings estimator",
    description:
      "An indicative solar and battery savings estimator for Australian homes. Adjust your bill, system size and battery capacity, and see every assumption behind the numbers.",
    path: "/solar-estimator",
  });

  const [form, setForm] = useState<FormState>(() => {
    const billParam = Number(params.get("bill"));
    const batteryParam = Number(params.get("battery"));
    const stateParam = params.get("state");
    return {
      ...defaults,
      state: isStateCode(stateParam) ? stateParam : defaults.state,
      quarterlyBill: Number.isFinite(billParam) && billParam >= billBounds.min ? billParam : defaults.quarterlyBill,
      batteryKwh: Number.isFinite(batteryParam) && batteryParam >= batteryBounds.min ? batteryParam : defaults.batteryKwh,
      wantsBattery: params.get("battery") === "0" ? false : defaults.wantsBattery,
    };
  });

  const [showAssumptions, setShowAssumptions] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const result = useMemo<EstimatorResult>(
    () =>
      estimate({
        state: form.state,
        propertyType: form.propertyType === "commercial" ? "commercial" : "residential",
        quarterlyBill: form.quarterlyBill,
        hasSolar: form.hasSolar,
        existingSolarKw: form.hasSolar ? form.existingSolarKw : 0,
        wantsBattery: form.wantsBattery,
        batteryKwh: form.wantsBattery ? form.batteryKwh : 0,
        daytimeProfile: form.daytimeProfile as never,
        roofFactor: form.roofFactor as never,
        retailRateOverride: form.retailOverride ? Number(form.retailOverride) / 100 : undefined,
        feedInTariffOverride: form.feedInOverride ? Number(form.feedInOverride) / 100 : undefined,
        panelCostPerKwOverride: form.panelCostOverride ? Number(form.panelCostOverride) : undefined,
        batteryCostPerKwhOverride: form.batteryCostOverride ? Number(form.batteryCostOverride) : undefined,
      }),
    [form],
  );

  /**
   * Three parallel scenarios on the same inputs, so the effect of storage is
   * visible without ever implying that "more battery" is automatically better:
   *  A — solar only, no storage modelled
   *  B — the visitor's battery size, full modelled export credit
   *  C — conservative: battery included but export income counted as zero and
   *      the low end of the modelled range applied
   */
  const scenarios = useMemo(() => {
    const base = {
      state: form.state,
      propertyType: (form.propertyType === "commercial" ? "commercial" : "residential") as
        | "residential"
        | "commercial",
      quarterlyBill: form.quarterlyBill,
      hasSolar: form.hasSolar,
      existingSolarKw: form.hasSolar ? form.existingSolarKw : 0,
      daytimeProfile: form.daytimeProfile as never,
      roofFactor: form.roofFactor as never,
      retailRateOverride: form.retailOverride ? Number(form.retailOverride) / 100 : undefined,
      feedInTariffOverride: form.feedInOverride ? Number(form.feedInOverride) / 100 : undefined,
      panelCostPerKwOverride: form.panelCostOverride ? Number(form.panelCostOverride) : undefined,
      batteryCostPerKwhOverride: form.batteryCostOverride ? Number(form.batteryCostOverride) : undefined,
    };

    const solarOnly = estimate({ ...base, wantsBattery: false, batteryKwh: 0 });
    const withBattery = estimate({ ...base, wantsBattery: true, batteryKwh: form.batteryKwh });
    const conservativeSavings =
      (withBattery.annualSavings - withBattery.exportCredit) *
      (1 - estimatorAssumptions.savingsRangeSpread);
    const conservativePayback =
      conservativeSavings > 0 && withBattery.investmentMid > 0
        ? withBattery.investmentMid / conservativeSavings
        : null;

    return { solarOnly, withBattery, conservativeSavings, conservativePayback };
  }, [form]);

  /** Payback is only meaningful when there is an investment to pay back. */
  const paybackLabel = (years: number | null, investment: number) =>
    investment <= 0 ? "— (nothing to pay back)" : years === null ? "n/a" : `${number(years, 1)} years`;

  const stateAssumption = stateAssumptions[form.state];

  const sendToEnquiry = () => {
    const summary = [
      `${stateAssumptions[form.state].label}, ${form.propertyType === "commercial" ? "small business" : "residential"}`,
      `quarterly bill about ${currency(form.quarterlyBill)}`,
      form.hasSolar ? `existing solar ${number(form.existingSolarKw, 1)} kW` : "no existing solar",
      form.wantsBattery ? `considering a ${number(form.batteryKwh, 1)} kWh battery` : "not considering a battery",
      `modelled saving ${currency(result.savingsLow)}–${currency(result.savingsHigh)} per year (indicative, assumptions disclosed)`,
    ].join("; ");

    window.sessionStorage.setItem(
      "solvanta-estimate-prefill",
      JSON.stringify({
        postcode: "",
        bill: String(Math.round(form.quarterlyBill)),
        propertyType: form.propertyType,
        existingSolar: form.hasSolar ? "yes" : "no",
        interest: form.wantsBattery ? "solar-and-battery" : "solar",
        context: `Estimator run: ${summary}`,
      }),
    );
    navigate("/contact");
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Savings estimator</p>
          <h1>Model it before anyone quotes it.</h1>
          <p className="lede">
            This calculator estimates consumption from your bill, sizes an array, models how much
            generation is self-consumed, and shows its arithmetic. Every assumption is published
            below and can be overridden.
          </p>
          <div className="page-hero__meta">
            <span>Assumptions reviewed {ESTIMATOR_REVIEWED}</span>
            <span>Runs in your browser — no data is transmitted</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="estimator-form-title">
        <div className="container">
          <div className="est-layout">
            {/* ---------------------------------------------------- inputs */}
            <form
              className="est-form"
              onSubmit={(event) => event.preventDefault()}
              aria-labelledby="estimator-form-title"
            >
              <h2 id="estimator-form-title" style={{ fontSize: "var(--step-2)" }}>
                Your property and usage
              </h2>

              <div className="form-grid">
                <Field id="state" label="State or territory" required hint="Sets the generation yield and tariff assumptions.">
                  <SelectInput
                    id="state"
                    value={form.state}
                    onChange={(value) => set("state", value as StateCode)}
                    options={stateOptions}
                  />
                </Field>

                <Field id="property" label="Property type" required hint="Small business premises use a mild scale factor for consumption.">
                  <SelectInput
                    id="property"
                    value={form.propertyType}
                    onChange={(value) => set("propertyType", value)}
                    options={propertyTypes.map((type) => ({ value: type.value, label: type.label }))}
                  />
                </Field>

                <Field
                  id="bill"
                  label="Average quarterly electricity bill"
                  required
                  full
                  hint={`Enter the total of one quarter's bill in dollars (${currency(billBounds.min)}–${currency(billBounds.max)}). Supply charges are included in your bill but are not reduced by solar, so savings are modelled on usage only.`}
                >
                  <div className="field__prefix">
                    <span aria-hidden="true">$</span>
                    <TextInput
                      id="bill"
                      value={String(form.quarterlyBill)}
                      onChange={(value) => {
                        const parsed = Number(value.replace(/[^0-9.]/g, ""));
                        set("quarterlyBill", Number.isFinite(parsed) ? parsed : 0);
                      }}
                      inputMode="decimal"
                    />
                  </div>
                </Field>
              </div>

              {form.quarterlyBill < billBounds.min && (
                <Callout title="Bill looks low" tone="warn">
                  <p>
                    A quarterly bill below {currency(billBounds.min)} makes the model unreliable —
                    the estimate works best with a typical usage figure.
                  </p>
                </Callout>
              )}

              <fieldset className="est-fieldset">
                <legend>Existing solar</legend>
                <ChipGroup
                  name="has-solar"
                  legend="Have solar panels already been installed?"
                  value={form.hasSolar ? "yes" : "no"}
                  onChange={(value) => set("hasSolar", value === "yes")}
                  options={[
                    { value: "no", label: "No panels yet" },
                    { value: "yes", label: "Yes, panels installed" },
                  ]}
                />
                {form.hasSolar && (
                  <RangeField
                    id="existing-kw"
                    label="Existing system size"
                    value={form.existingSolarKw}
                    onChange={(value) => set("existingSolarKw", value)}
                    min={existingSolarBounds.min}
                    max={existingSolarBounds.max}
                    step={0.5}
                    hint="Panel capacity in kW. Check your inverter app, paperwork, or estimate around 5–7 kW for a typical single-phase home."
                    format={(value) => `${number(value, 1)} kW`}
                  />
                )}
              </fieldset>

              <fieldset className="est-fieldset">
                <legend>Battery storage</legend>
                <ChipGroup
                  name="wants-battery"
                  legend="Are you considering a home battery?"
                  value={form.wantsBattery ? "yes" : "no"}
                  onChange={(value) => set("wantsBattery", value === "yes")}
                  options={[
                    { value: "no", label: "Solar only" },
                    { value: "yes", label: "Include storage" },
                  ]}
                  tone="lime"
                />
                {form.wantsBattery && (
                  <RangeField
                    id="battery-size"
                    label="Battery size to model"
                    value={form.batteryKwh}
                    onChange={(value) => set("batteryKwh", value)}
                    min={batteryBounds.min}
                    max={batteryBounds.max}
                    step={0.5}
                    hint="Nameplate capacity in kWh. Federal support tapers above 14 kWh, so larger batteries are worth modelling carefully."
                    format={(value) => `${number(value, 1)} kWh`}
                  />
                )}
              </fieldset>

              <fieldset className="est-fieldset">
                <legend>Usage and roof</legend>
                <Field
                  id="daytime"
                  label="When is power used at home?"
                  required
                  hint="Daytime usage determines how much generation is consumed on site instead of exported."
                >
                  <SelectInput
                    id="daytime"
                    value={form.daytimeProfile}
                    onChange={(value) => set("daytimeProfile", value)}
                    options={daytimeProfiles.map((profile) => ({
                      value: profile.value,
                      label: `${profile.label} — ${Math.round(profile.selfConsumptionShare * 100)}% assumed self-use`,
                    }))}
                  />
                </Field>

                <Field id="roof" label="Roof suitability and shading" required>
                  <SelectInput
                    id="roof"
                    value={form.roofFactor}
                    onChange={(value) => set("roofFactor", value)}
                    options={roofFactors.map((factor) => ({
                      value: factor.value,
                      label: `${factor.label} — ${Math.round(factor.factor * 100)}% of ideal yield`,
                    }))}
                  />
                </Field>
              </fieldset>

              <details
                className="est-breakdown"
                open={showAssumptions}
                onToggle={(event) => setShowAssumptions((event.target as HTMLDetailsElement).open)}
              >
                <summary>
                  <ChevronRight aria-hidden="true" />
                  Override the assumptions
                </summary>
                <div className="est-breakdown__body">
                  <p className="note-inline">
                    Defaults come from the published assumption table below. If you know your own
                    numbers — the rate you actually pay, your solar buy-back rate, or a price you
                    have been quoted — enter them here to see the effect on the estimate.
                  </p>
                  <div className="form-grid">
                    <Field id="retail-override" label="Usage rate (cents per kWh)" hint={`Assumed default: ${cents(stateAssumption.retailRate)}`}>
                      <TextInput
                        id="retail-override"
                        value={form.retailOverride}
                        onChange={(value) => set("retailOverride", value.replace(/[^0-9.]/g, ""))}
                        inputMode="decimal"
                        placeholder={String(Math.round(stateAssumption.retailRate * 100))}
                      />
                    </Field>
                    <Field id="feedin-override" label="Feed-in tariff (cents per kWh)" hint={`Assumed default: ${cents(stateAssumption.feedInTariff)}`}>
                      <TextInput
                        id="feedin-override"
                        value={form.feedInOverride}
                        onChange={(value) => set("feedInOverride", value.replace(/[^0-9.]/g, ""))}
                        inputMode="decimal"
                        placeholder={String(Math.round(stateAssumption.feedInTariff * 100))}
                      />
                    </Field>
                    <Field id="panel-cost-override" label="Installed panel cost ($ per kW)" hint={`Assumed default: ${currency(estimatorAssumptions.panelCostPerKw)}`}>
                      <TextInput
                        id="panel-cost-override"
                        value={form.panelCostOverride}
                        onChange={(value) => set("panelCostOverride", value.replace(/[^0-9.]/g, ""))}
                        inputMode="decimal"
                        placeholder={String(estimatorAssumptions.panelCostPerKw)}
                      />
                    </Field>
                    <Field id="battery-cost-override" label="Installed battery cost ($ per kWh)" hint={`Assumed default: ${currency(estimatorAssumptions.batteryCostPerKwh)}`}>
                      <TextInput
                        id="battery-cost-override"
                        value={form.batteryCostOverride}
                        onChange={(value) => set("batteryCostOverride", value.replace(/[^0-9.]/g, ""))}
                        inputMode="decimal"
                        placeholder={String(estimatorAssumptions.batteryCostPerKwh)}
                      />
                    </Field>
                  </div>
                </div>
              </details>

              <div className="btn-row">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setForm(defaults);
                    setShowAssumptions(false);
                  }}
                >
                  <RotateCcw size={16} aria-hidden="true" style={{ marginRight: "0.5rem" }} />
                  Reset to defaults
                </Button>
                <Button type="button" variant="dark" onClick={sendToEnquiry}>
                  <Send size={16} aria-hidden="true" style={{ marginRight: "0.5rem" }} />
                  Send this estimate with an enquiry
                </Button>
              </div>
            </form>

            {/* --------------------------------------------------- results */}
            <div className="est-result" aria-live="polite">
              <div className="est-card">
                <h2 style={{ fontSize: "var(--step-1)" }}>Indicative result</h2>
                <div className="est-hero-metric" style={{ marginTop: "var(--space-4)" }}>
                  <span className="est-hero-metric__value">
                    {currency(result.savingsLow)} – {currency(result.savingsHigh)}
                  </span>
                  <span className="est-hero-metric__label">
                    estimated annual saving (±{Math.round(estimatorAssumptions.savingsRangeSpread * 100)}%)
                  </span>
                </div>

                <dl className="est-metrics">
                  <div className="est-metric">
                    <dt>Suggested array</dt>
                    <dd>
                      {number(result.systemKw, 1)} kW
                      <small>
                        {form.hasSolar ? "your existing array size" : "sized to your modelled use"}
                      </small>
                    </dd>
                  </div>
                  <div className="est-metric">
                    <dt>Annual generation</dt>
                    <dd>
                      {number(result.annualGenerationKwh)} kWh
                      <small>{number(stateAssumption.yieldPerKw)} kWh per kW benchmark</small>
                    </dd>
                  </div>
                  <div className="est-metric">
                    <dt>Self-consumption</dt>
                    <dd>
                      {number(result.selfConsumptionPct)}%
                      <small>
                        {number(result.directSelfUseKwh)} kWh direct
                        {result.batteryDeliveredKwh > 0
                          ? ` + ${number(result.batteryDeliveredKwh)} kWh from storage`
                          : ""}
                      </small>
                    </dd>
                  </div>
                  <div className="est-metric">
                    <dt>Annual usage</dt>
                    <dd>
                      {number(result.annualUsageKwh)} kWh
                      <small>estimated from your bill</small>
                    </dd>
                  </div>
                  <div className="est-metric">
                    <dt>Bill reduction</dt>
                    <dd>
                      {number(result.billReductionPct)}%
                      <small>usage charges only, before supply charges</small>
                    </dd>
                  </div>
                  <div className="est-metric">
                    <dt>CO₂e avoided</dt>
                    <dd>
                      {number(result.co2AvoidedTonnes, 2)} t
                      <small>per year at {number(stateAssumption.gridFactor, 2)} kg/kWh</small>
                    </dd>
                  </div>
                </dl>

                {result.notes.map((note) => (
                  <p className="note-inline" style={{ color: "var(--text-on-deep-muted)", marginTop: "var(--space-4)" }} key={note}>
                    {note}
                  </p>
                ))}
              </div>

              <details className="est-breakdown" open>
                <summary>
                  <Calculator aria-hidden="true" />
                  How this estimate is built
                </summary>
                <div className="est-breakdown__body">
                  <div className="calc-lines">
                    <div className="calc-line">
                      <span>Estimated annual consumption</span>
                      <span className="calc-line__value">{number(result.annualUsageKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Modelled generation</span>
                      <span className="calc-line__value">{number(result.annualGenerationKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Used directly on site</span>
                      <span className="calc-line__value">{number(result.directSelfUseKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Stored and returned from battery</span>
                      <span className="calc-line__value">{number(result.batteryDeliveredKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Exported to the grid</span>
                      <span className="calc-line__value">{number(result.exportedKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Still imported</span>
                      <span className="calc-line__value">{number(result.importedKwh)} kWh</span>
                    </div>
                    <div className="calc-line">
                      <span>Usage cost without solar</span>
                      <span className="calc-line__value">{currency(result.baselineCost)}</span>
                    </div>
                    <div className="calc-line">
                      <span>Usage cost with the modelled system</span>
                      <span className="calc-line__value">{currency(result.newUsageCost)}</span>
                    </div>
                    <div className="calc-line">
                      <span>Export credit at {cents(result.feedInTariff)}</span>
                      <span className="calc-line__value">{currency(result.exportCredit)}</span>
                    </div>
                    <div className="calc-line">
                      <span>Estimated annual saving</span>
                      <span className="calc-line__value">{currency(result.annualSavings)}</span>
                    </div>
                  </div>

                  {result.batteryTierBreakdown.length > 0 && (
                    <div>
                      <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                        Federal battery support — capacity taper model
                      </p>
                      <div className="table-wrap" tabIndex={0}>
                        <table className="data">
                          <caption>
                            Eligible capacity is calculated in bands. The dollar value depends on the
                            certificate price at installation.
                          </caption>
                          <thead>
                            <tr>
                              <th scope="col">Capacity band</th>
                              <th scope="col" className="num">
                                Eligible kWh
                              </th>
                              <th scope="col" className="num">
                                Factor
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.batteryTierBreakdown.map((tier) => (
                              <tr key={tier.label}>
                                <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                                  {tier.label}
                                </th>
                                <td className="num">{number(tier.eligibleKwh, 2)}</td>
                                <td className="num">{Math.round(tier.factor * 100)}%</td>
                              </tr>
                            ))}
                            <tr>
                              <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                                Total eligible capacity
                              </th>
                              <td className="num">{number(result.eligibleBatteryKwh, 2)}</td>
                              <td className="num">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="note-inline">
                        Indicative federal discount modelled at{" "}
                        {currency(estimatorAssumptions.indicativeDiscountPerEligibleKwh)} per eligible
                        kWh: {currency(result.indicativeBatteryDiscount)}. This is a modelling
                        assumption, not an official figure.{" "}
                        <a href={estimatorAssumptions.tierSource.url} target="_blank" rel="noopener noreferrer">
                          Verify with the Clean Energy Regulator
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="calc-lines">
                    <div className="calc-line">
                      <span>Indicative installed investment (before support)</span>
                      <span className="calc-line__value">{currency(result.investmentLow)}</span>
                    </div>
                    <div className="calc-line">
                      <span>After the modelled federal battery discount</span>
                      <span className="calc-line__value">{currency(result.investmentMid)}</span>
                    </div>
                    <div className="calc-line">
                      <span>Simple payback on the modelled investment</span>
                      <span className="calc-line__value">
                        {result.basicPaybackYears ? `${number(result.basicPaybackYears, 1)} years` : "n/a"}
                      </span>
                    </div>
                  </div>

                  <p className="note-inline">
                    Payback is a simple division of net investment by modelled annual saving. It
                    ignores electricity price movement, battery degradation, finance costs and
                    maintenance, and it is not a financial forecast.
                  </p>
                </div>
              </details>

              <div className="est-card">
                <h2 style={{ fontSize: "var(--step-1)" }}>Compare scenarios</h2>
                <p className="note-inline" style={{ marginTop: "var(--space-2)" }}>
                  The same inputs modelled three ways, so you can see what storage actually changes
                  before anyone quotes it. Ranges, not promises.
                </p>
                <div className="table-wrap" tabIndex={0} style={{ marginTop: "var(--space-4)" }}>
                  <table className="data">
                    <caption>
                      Indicative planning estimates using the assumptions listed below — not
                      quotations or guarantees.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Scenario</th>
                        <th scope="col" className="num">
                          Est. annual saving
                        </th>
                        <th scope="col" className="num">
                          Net investment
                        </th>
                        <th scope="col" className="num">
                          Simple payback
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                          Solar only
                          <small
                            style={{
                              display: "block",
                              fontWeight: 400,
                              color: "var(--text-muted)",
                              marginTop: 2,
                            }}
                          >
                            {form.hasSolar
                              ? `Your existing ${number(scenarios.solarOnly.systemKw, 1)} kW array`
                              : `A ${number(scenarios.solarOnly.systemKw, 1)} kW array`}
                            , no battery
                          </small>
                        </th>
                        <td className="num">
                          {currency(scenarios.solarOnly.savingsLow)}–{currency(scenarios.solarOnly.savingsHigh)}
                        </td>
                        <td className="num">
                          {scenarios.solarOnly.investmentMid > 0
                            ? currency(scenarios.solarOnly.investmentMid)
                            : "—"}
                        </td>
                        <td className="num">
                          {paybackLabel(
                            scenarios.solarOnly.basicPaybackYears,
                            scenarios.solarOnly.investmentMid,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                          Solar + battery
                          <small
                            style={{
                              display: "block",
                              fontWeight: 400,
                              color: "var(--text-muted)",
                              marginTop: 2,
                            }}
                          >
                            {number(scenarios.withBattery.systemKw, 1)} kW array with{" "}
                            {number(form.batteryKwh, 1)} kWh storage
                          </small>
                        </th>
                        <td className="num">
                          {currency(scenarios.withBattery.savingsLow)}–{currency(scenarios.withBattery.savingsHigh)}
                        </td>
                        <td className="num">{currency(scenarios.withBattery.investmentMid)}</td>
                        <td className="num">
                          {paybackLabel(
                            scenarios.withBattery.basicPaybackYears,
                            scenarios.withBattery.investmentMid,
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{ fontFamily: "var(--font-sans)" }}>
                          Conservative
                          <small
                            style={{
                              display: "block",
                              fontWeight: 400,
                              color: "var(--text-muted)",
                              marginTop: 2,
                            }}
                          >
                            Storage included, export income counted as zero, low end of the range
                          </small>
                        </th>
                        <td className="num">{currency(scenarios.conservativeSavings)}</td>
                        <td className="num">{currency(scenarios.withBattery.investmentMid)}</td>
                        <td className="num">
                          {scenarios.withBattery.investmentMid <= 0
                            ? "—"
                            : scenarios.conservativePayback
                              ? `${number(scenarios.conservativePayback, 1)} years`
                              : "n/a"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
                  This comparison does not assume a battery is better. Storage improves the modelled
                  result when you export a lot at a low rate and import a lot at a high rate; it is
                  close to neutral when you already use most of your generation on site. The
                  conservative column strips out export income entirely — if the case only works in
                  the middle column, it depends on assumptions worth checking.
                </p>
              </div>

              <div className="est-breakdown">
                <details open>
                  <summary>
                    <ChevronRight aria-hidden="true" />
                    Assumptions used (reviewed {ESTIMATOR_REVIEWED})
                  </summary>
                  <div className="est-breakdown__body">
                    <ul className="assumption-list">
                      <li>
                        <span>Usage rate — {stateAssumption.label}</span>
                        <span>{cents(result.retailRate)}</span>
                      </li>
                      <li>
                        <span>Feed-in tariff — {stateAssumption.label}</span>
                        <span>{cents(result.feedInTariff)}</span>
                      </li>
                      <li>
                        <span>Generation yield — {stateAssumption.label}</span>
                        <span>{number(stateAssumption.yieldPerKw)} kWh/kW/yr</span>
                      </li>
                      <li>
                        <span>Battery round-trip efficiency</span>
                        <span>{Math.round(estimatorAssumptions.batteryRoundTripEfficiency * 100)}%</span>
                      </li>
                      <li>
                        <span>Usable depth of discharge</span>
                        <span>{Math.round(estimatorAssumptions.batteryDepthOfDischarge * 100)}%</span>
                      </li>
                      <li>
                        <span>Average battery cycling</span>
                        <span>{Math.round(estimatorAssumptions.batteryCycleFactor * 100)}% of days</span>
                      </li>
                      <li>
                        <span>Installed panel cost assumption</span>
                        <span>{currency(estimatorAssumptions.panelCostPerKw)}/kW</span>
                      </li>
                      <li>
                        <span>Installed battery cost assumption</span>
                        <span>{currency(estimatorAssumptions.batteryCostPerKwh)}/kWh</span>
                      </li>
                      <li>
                        <span>Grid emissions intensity — {stateAssumption.label}</span>
                        <span>{number(stateAssumption.gridFactor, 2)} kg/kWh</span>
                      </li>
                    </ul>
                    <p className="note-inline">
                      Tariff and yield figures are planning assumptions compiled from public
                      information, not live market data. Cost assumptions are indicative installed
                      price ranges and will differ between products, properties and regions.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="estimator-disclaimers">
        <div className="container">
          <div className="panel panel--flat">
            <h2 id="estimator-disclaimers" style={{ fontSize: "var(--step-2)", marginBottom: "var(--space-4)" }}>
              What this tool is — and is not
            </h2>
            <ul className="tick-list">
              {estimatorDisclaimers.map((item) => (
                <li key={item}>
                  <Calculator aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading
            eyebrow="How the model thinks"
            title="Six things worth understanding about your own numbers"
            lede="The model is deliberately simple so the reasoning stays visible. These are the steps it takes — and the assumptions that limit it."
          />
          <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-block">
              <h3>Your bill becomes consumption</h3>
              <p>
                The model divides your quarterly bill by an assumed usage rate to estimate annual
                kWh. Supply charges are excluded, because solar cannot reduce them. If you know the
                rate you actually pay, use the override — it sharpens every figure downstream.
              </p>
            </div>
            <div className="value-block">
              <h3>Consumption becomes an array size</h3>
              <p>
                Generation target = consumption (&times; 1.0, or &times; 1.1 when a battery can absorb
                the surplus), divided by your region's yield and adjusted by the roof factor. Shade
                and orientation are represented by that factor — a blunt instrument standing in for a
                roof assessment.
              </p>
            </div>
            <div className="value-block">
              <h3>Generation splits three ways</h3>
              <p>
                Direct self-use first, set by the daytime profile; surplus to the battery, limited by
                usable capacity, efficiency and realistic cycling; everything left is exported at
                the feed-in rate. Self-consumed kilowatt hours avoid the retail price — far more
                valuable than exports.
              </p>
            </div>
            <div className="value-block">
              <h3>Battery value comes from your evening peak</h3>
              <p>
                A battery is worth the electricity it displaces. If your household imports little in
                the evening, storage has less to save — no matter how large the capacity. The
                comparison table above shows both sides of that question rather than asserting an
                answer.
              </p>
            </div>
            <div className="value-block">
              <h3>It models a year, not a season</h3>
              <p>
                The maths uses annual averages, so it cannot show a cloudy June or a scorching
                January. Seasonal swings are real and expected; a single bad month is weather, not a
                failed model. Annual figures are what a system is sized against.
              </p>
            </div>
            <div className="value-block">
              <h3>Uncertainty lives in the range</h3>
              <p>
                The &plusmn;{Math.round(estimatorAssumptions.savingsRangeSpread * 100)}% band reflects
                weather, prices and behaviour — three things no model can predict for you. Treat the
                numbers as planning tools with visible assumptions, not as commitments.
              </p>
            </div>
          </div>

          <Callout title="An estimate is a model. A proposal is an assessment." tone="warn">
            <p>
              No honest provider can guarantee savings, payback or incentive eligibility, because
              all three depend on weather, market prices, program rules and how the household uses
              power. What a provider can commit to is the specification, the compliance work and the
              price. Treat every savings figure on this site — and in any quote — as an assumption
              audit: check what went in, and what could change.
            </p>
          </Callout>
        </div>
      </section>

      <CtaBand
        title="Turn the estimate into an actual design."
        body="The estimate uses averages. A proposal uses your interval data, your roof and your tariff — and states the assumptions it relies on."
      />
    </>
  );
}
