/**
 * ---------------------------------------------------------------------------
 * SHARED CONTENT BLOCKS
 * ---------------------------------------------------------------------------
 * Article bodies and service guides are written as typed blocks so the same
 * renderer can display either one, and so the content stays editable without
 * touching component code.
 *
 * HONESTY RULES FOR CONTENT USING THESE TYPES:
 *  - No invented statistics, testimonials, certifications or dollar figures.
 *  - Illustrative numbers must be labelled as illustrations of the maths.
 *  - External claims should carry a source in the parent data file.
 * ---------------------------------------------------------------------------
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "takeaways"; items: string[] }
  | { type: "callout"; title: string; text: string; tone?: "info" | "warn" }
  | { type: "quote"; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export type ContentSource = {
  label: string;
  url: string;
  note?: string;
};
