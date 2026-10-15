# Research notes and sources

This document records what was researched for the site's factual content, where
it came from, and what must be re-checked before launch. **All incentive
information was verified against the official sources below on 15 October
2026.** Estimates built on those rules are labelled indicative everywhere they
appear in the interface.

## Method

- Official program pages (Clean Energy Regulator, Solar Victoria, state energy
  departments) were fetched directly and read — not summarised from memory or
  from third-party solar blogs.
- Some government sites block automated requests; where a page could not be
  fetched directly, it was linked as the official entry point and its specific
  claims were left out of the content rather than guessed.
- No statistics, ratings, review counts or customer numbers were invented
  anywhere on the site. If a fact could not be verified, it does not appear.

## Key findings baked into the site

### Federal — Cheaper Home Batteries Program

- The program continues to support eligible home batteries by issuing
  small-scale technology certificates (STCs) which the installer applies as a
  discount at the point of sale.
- **From 1 May 2026, the STC factor tapers by installed battery capacity**
  (roughly: first 0–14 kWh at 100%, 14–28 kWh at 60%, 28–50 kWh at 15% — see
  the tier model below). Rules for any installation are determined by the
  **installation date**, not the date a contract is signed.
- Source (used in `src/data/incentives.ts` and `src/data/estimatorAssumptions.ts`):
  - Clean Energy Regulator — "Battery rebates are changing 1 May 2026":
    https://cer.gov.au/news-and-media/media/2026/march/battery-rebates-are-changing-1-may-2026
  - Small-scale Renewable Energy Scheme:
    https://cer.gov.au/schemes/renewable-energy-target/small-scale-renewable-energy-scheme

### Victoria — Solar Victoria

- The Solar Homes solar panel rebate was open at the review date. Amounts and
  eligibility conditions come from Solar Victoria directly; the site links to
  them rather than restating them in detail.
- The **interest-free battery loan was closed to new applications** at the
  review date. The site represents this honestly as *closed* rather than
  deleting it — people searching for it need to find that out.
- Sources:
  - Solar Victoria programs: https://www.solar.vic.gov.au/programs
  - Solar panel rebate: https://www.solar.vic.gov.au/solar-panel-rebate
  - Solar battery loan: https://www.solar.vic.gov.au/solar-battery-loan

### Other states and territories

Programs for NSW, QLD, SA, WA, TAS, ACT and NT change constantly and differ by
scheme type. The rebates page links each jurisdiction's official energy
department entry point (NSW, QLD, SA, WA, TAS, ACT, NT — see
`src/data/incentives.ts` for the exact URLs) and deliberately does **not**
restate unverified amounts or eligibility claims for them. Update this file
with dated notes whenever you verify a specific program.

### Revenue and retailer context

- The gap between retail rates and feed-in tariffs is why self-consumption is
  worth more than export; this is explained in the knowledge hub articles with
  sources linked per article (see `src/data/articles.ts`, each article's
  "sources" block).

### Content expansion — October 2026

The site was expanded from a small brochure build to a full reference site:
twenty knowledge hub articles, nine service guides with their own FAQs, a
44-question FAQ, richer rebate guidance, a three-scenario estimator, and
supporting sections on the home, about, contact and gallery pages. Sources added
for that work:

- **Clean Energy Council — For consumers** (`cleanenergycouncil.org.au/for-consumers`):
  general consumer guidance, approved product lists and the "find an installer"
  direction used in the warranties and buying articles.
- **Energy Made Easy** (`energymadeeasy.gov.au`, Australian Energy Regulator):
  plan comparison, usage rates and feed-in tariff checks — linked from the
  electricity-bill, feed-in tariff and outages articles and the rebates page.
- **Solar Victoria — battery buyers guide** (`solar.vic.gov.au/solar-battery-buyers-guide`):
  used as an independent specification reference for battery capacity versus
  power, sizing and warranties.
- **Solar Accreditation Australia** (`saaustralia.com.au/accreditation-status-check`)
  and **New Energy Tech Consumer Code** (`newenergytech.org.au`): the two
  verification routes recommended for checking installer credentials, used on
  the rebates page and in the comparing-quotes article.
- **ACCC — consumers index** (`accc.gov.au/consumers`): linked in the warranties
  article as the national consumer-law entry point. This is a stable root URL
  rather than a deep link; re-check it points where intended at launch.

Nothing in the expansion introduces rebate amounts, eligibility decisions,
certifications, statistics, testimonials or project counts — those remain
either sourced from an administrator or absent.

## Estimator assumptions

All assumptions live in `src/data/estimatorAssumptions.ts`, are shown to
visitors in an expandable "assumptions" panel, and are individually editable.
Highlights:

| Assumption | Value used | Basis |
| --- | --- | --- |
| Retail usage rates | $0.30–$0.44/kWh by state | Conservative mid-range planning figures; visitors can override |
| Feed-in tariffs | $0.05–$0.09/kWh by state | Deliberately conservative floor |
| Generation yield | 1,200–1,650 kWh per kW per year by state | Conservative planning yields for reasonably oriented arrays |
| Battery round-trip efficiency | 90% | Typical published figure for modern lithium systems |
| Usable share of battery capacity | 90% | Depth-of-discharge planning figure |
| Installed panel cost | $1,000/kW before incentives | Planning figure; visitors can override |
| Installed battery cost | $1,100/kWh before incentives | Planning figure; visitors can override |
| Battery incentive tiers | 0–14 / 14–28 / 28–50 kWh at 100% / 60% / 15% | Clean Energy Regulator taper (1 May 2026) |
| Discount per eligible kWh | **$250 — a modelling assumption** | Clearly labelled in the file and UI as indicative; depends on STC market price and installation date |

The `$250` per-eligible-kWh figure is the one number in the estimator that is a
modelling placeholder rather than a published rate. It is labelled as such in
`src/data/estimatorAssumptions.ts`, shown with a caveat in the estimator UI, and
should be reviewed against the official calculator before quoting customers.

## How the content policy is enforced in code

- `src/data/incentives.ts` header documents the editing rules: never state an
  unverified amount, never claim eligibility, record a `lastVerified` date,
  mark closed programs as *closed*.
- Empty fields in `src/config/site.ts` (phone, email, address, company numbers,
  social profiles) are hidden by the interface instead of being filled with
  placeholders — the header comment states this explicitly.
- `src/components/layout/DocLayout.tsx` shows a "note for the site owner" on
  the legal pages whenever `site.legal.entityName` still contains the phrase
  "update before launch", so placeholder legal details cannot ship silently.

## Re-verification checklist before launch

1. Re-check the Clean Energy Regulator pages above; update `lastVerified`
   dates in `src/data/incentives.ts` and `ESTIMATOR_REVIEWED` in
   `src/data/estimatorAssumptions.ts`.
2. Re-check which state programs are open, closed or changed; update
   `src/data/incentives.ts` entries and status labels.
3. Review the `indicativeDiscountPerEligibleKwh` value and the cost
   assumptions against current market pricing.
4. Replace placeholder business details (email, phone, address, ABN, licence
   numbers, social URLs) in `src/config/site.ts`.
5. Have the privacy, terms and accessibility pages reviewed against your
   actual business and jurisdiction (they currently describe this project's
   real behaviour accurately, but they are not legal advice).
