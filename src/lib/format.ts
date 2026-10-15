/** Small formatting helpers shared across the site. */

export const currency = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const number = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const compactNumber = (value: number) =>
  new Intl.NumberFormat("en-AU", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const cents = (dollarsPerKwh: number) => `${number(dollarsPerKwh * 100, 0)}c/kWh`;

/** Turns a title into a URL-safe slug. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Formats an ISO-ish date string for display in Australian English. */
export const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
};

/**
 * Formats a year-month string like "2026-10" as "October 2026".
 * Falls back to the original value when the input is not in that shape.
 */
export const formatMonth = (value: string) => {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  return date.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
};
