# Solvanta Energy

A production-quality marketing and planning website for a solar and battery
business in Australia: solar, battery and hybrid system information, a fully
transparent savings estimator, verified incentive information, a knowledge hub,
and an honest enquiry flow.

Built with **React 19 + TypeScript + Vite + React Router**, styled with a custom
CSS design system (no framework), icons from Lucide. No backend required.

> **Fictional brand notice:** "Solvanta Energy" is a placeholder brand created
> for this project. Business details (phone, email, address, ABN, licences) are
> deliberately empty or marked for update — the interface hides anything that
> has not been verified rather than inventing it. See
> [RESEARCH_NOTES.md](RESEARCH_NOTES.md) for the content policy.

---

## Quick start

Requirements: **Node.js 20.19+ or 22.12+** (developed on Node 24) and npm.

```powershell
npm install
npm run dev        # start the dev server (prints a local URL, usually http://localhost:5173)
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-checks (`tsc --noEmit`), builds to `dist/`, then prerenders every route to real HTML (`node scripts/prerender.mjs`) |
| `npm run preview` | Serves the production build locally (http://localhost:4173) |
| `npm run typecheck` | Type-check only |
| `node scripts/qa.mjs [--smoke]` | Real-browser QA sweep (Playwright + system Chrome): overflow, broken images, console/network errors and interaction tests against `npm run preview`. Screenshots are written to `qa/` as JPEGs (override with `QA_SHOT_DIR`); the sweep emulates reduced motion so scroll-reveal content can never be captured mid-fade |
| `node scripts/live-check.mjs` | The same checks against the deployed site (`https://zazatunes754.github.io/solvanta-energy`) |
| `node scripts/process-images.mjs <source> <name> [width]` | Re-encode a downloaded photo into `public/images/` as a high-quality progressive JPEG (needs the `sharp` dev dependency) |

## Pages and routes

| Route | Contents |
| --- | --- |
| `/` | Long-form home page: value proposition, nine services, a working estimator teaser, Australian editorial photography, how solar works (with the component guide), storage and independence, process, incentives, the honest numbers (costs, savings and limits), gallery preview, knowledge hub and featured FAQs, decision paths and a closing CTA |
| `/services` | All nine service lines with inclusions and suitability notes |
| `/services/:slug` | Full per-service guide: planning, sizing, installation stages, warranties, honest limitations and service-specific FAQs |
| `/solar-rebates` | Federal and state incentive programs, each dated, status-labelled and linked to its official source — plus how to verify eligibility yourself and what could change next |
| `/solar-estimator` | Interactive savings estimator: bill size, state, battery size, roof factor, existing solar — with every assumption disclosed and overridable, a three-scenario comparison and "how the model thinks" explainers |
| `/solutions` | Reference gallery (explicitly labelled as reference imagery, not a portfolio): a featured tier of location-verified Australian photographs with visible credits, a filterable technical reference tier, a keyboard-accessible lightbox and a component glossary |
| `/knowledge-hub` | Article index; twenty full articles with per-article takeaways, related links and source lists |
| `/knowledge-hub/:slug` | Article pages |
| `/about` | How the business works, how it estimates and prices, its commitments and its honesty policy |
| `/faq` | 44 questions across ten topic categories, with FAQ structured data |
| `/contact` | Enquiry form with validation, guidance on preparing a quote request, honest delivery handling, and what-happens-next |
| `/privacy`, `/terms`, `/accessibility` | Plain-English legal and accessibility pages describing what the site actually does |
| anything else | Branded 404 with helpful links |

All routes are code-split: the home page ships in the first bundle, every other
page loads on demand.

## Where to edit content

Everything a business owner needs to change lives in two places:

**`src/config/site.ts`** — brand name and tagline, public URL, contact details
(email, phone, address, hours), service coverage, social profiles, legal entity
details, company facts (founded year, ABN, licence numbers), feature flags,
navigation, footer groups and the announcement strip.

Fields left empty are **hidden automatically** across the header, footer,
contact page and structured data. There are no placeholder phone numbers or
fake reviews anywhere.

**`src/data/`** — the content itself:

| File | Contents |
| --- | --- |
| `estimatorAssumptions.ts` | All estimator assumptions: state rates, yields, costs, battery tiers, disclaimers |
| `services.ts` | The nine service lines, each with a full guide (content blocks) and its own FAQs |
| `incentives.ts` | Rebate programs with `lastVerified` dates and official source links |
| `articles.ts` | Twenty knowledge hub articles: blocks, takeaways, related articles/services and sources |
| `contentTypes.ts` | Shared block types for articles and service guides |
| `gallery.ts` | Reference gallery entries (alt text, captions, categories) |
| `faqs.ts` | FAQ questions, categories and featured selections |

## The savings estimator

- Pure calculation in `src/lib/estimator.ts`; every assumption is visible on the
  page and can be overridden by the visitor (retail rate, feed-in tariff, panel
  and battery costs).
- Battery storage uses the federal Cheaper Home Batteries taper (0–14 kWh at
  100%, 14–28 at 60%, 28–50 at 15%), with the source linked in the UI.
- Results are always presented as a range and labelled **indicative** — never as
  a quote or a guarantee.
- Three scenarios are modelled on the same inputs: solar only, solar + battery
  at the chosen size, and a conservative case (storage included, export income
  counted as zero, low end of the range) — the comparison never implies that a
  battery or a larger system is automatically better.
- A "how the model thinks" section walks through each step of the calculation
  (bill → consumption → array size → split of generation → money), and a callout
  separates a modelled estimate from what a proposal can actually promise.
- Deep links work: `/solar-estimator?state=VIC&bill=650&battery=13.5`
  (`battery=0` models solar-only).
- The "continue to enquiry" button carries the estimate to the contact form via
  session storage; a pre-filled summary is included in the enquiry notes.

## Enquiry form delivery

The form validates inputs client-side and then:

1. **If `site.contact.endpoint` is set** (Formspree, Basin, Netlify Forms, your
   own API…), it POSTs the enquiry as JSON to that endpoint. Optional extra
   headers via `site.contact.endpointHeaders` (never put secrets there — this
   file ships to the browser).
2. **If only `site.contact.email` is set**, it opens a pre-filled email draft
   via `mailto:` — nothing is transmitted by the site itself.
3. **If neither is set** (the current state), it offers the enquiry details to
   copy, and says plainly that no submission service is connected yet.

This behaviour is described honestly on the contact page and privacy page and
adapts automatically as soon as you configure an endpoint or email.

## Honesty and truthfulness policy

- No invented testimonials, statistics, certifications, ratings, customer
  counts, or contact details. Anywhere.
- Gains from incentives are described per program rules and always linked to
  the official administrator; nobody is told they "qualify".
- Estimates are labelled indicative everywhere and their assumptions are
  published; the one modelling placeholder in the estimator
  (`indicativeDiscountPerEligibleKwh`) is explicitly flagged in
  `estimatorAssumptions.ts` and in the UI.
- Legal pages carry an automatic "note for the site owner" while
  `site.legal.entityName` still contains the words *update before launch* —
  the note removes itself once real details are entered.
- No analytics, no tracking pixels, no cookies. The privacy page documents
  exactly what *does* happen (session-storage prefill, Google Fonts request,
  hosting logs).

## Accessibility

Targets WCAG 2.2 AA: semantic landmarks, skip link, visible focus styles,
keyboard-operable menu / accordion / lightbox (Escape closes, focus returns),
reduced-motion support, labelled form fields with associated errors, alt text
reviewed against each photo, reflow down to 320px. The accessibility page
documents this in plain English, including honest limitations. It has not yet
been independently audited — see the checklist at the bottom of this file.

## SEO and metadata

- Per-route titles, descriptions, canonical URLs and Open Graph tags via
  `src/hooks/useSeo.ts` — and, since the prerender step, baked into the
  static HTML of every route at build time (crawlers and social scrapers read
  them without executing JavaScript).
- Organisation structured data (minimal and truthful); FAQ page emits FAQPage
  structured data.
- `public/robots.txt` and `public/sitemap.xml` are included. Both now point at
  the deployed GitHub Pages URL (`https://zazatunes754.github.io/solvanta-energy/`),
  matching `site.url` in `src/config/site.ts`. If the site moves to its own
  domain, update both files together with `site.url`.

## QA evidence

The `qa/` folder holds the current screenshot set for the latest production
build (JPEG, not PNG, to keep the repository reviewable) plus `qa-results.json`
from the sweep — the JSON result log is ignored by Git, the screenshots are
committed. Regenerate everything after content changes:

```powershell
npm run build
npm run preview            # keep it running
node scripts/qa.mjs --smoke
```

The set covers four viewports (320 / 390 / 768 / 1440) across twelve
representative routes. Screenshots show the current build — if the hero photo
or layout changes, re-run the sweep so the evidence matches the site.

## Deployment

The build output is a static site with **prerendered HTML for every route**
plus a SPA fallback for anything unexpected. (`dist/` is generated by
`npm run build` and is not tracked in Git — GitHub Actions rebuilds it from
source on every deployment.)

- **Every known route ships as a real `index.html`** (e.g.
  `dist/services/residential-solar/index.html`). The host serves it with HTTP
  200, and the page's own title, description, canonical URL and Open Graph
  tags are in the initial markup — deep links work for users, crawlers and
  social scrapers without executing JavaScript. Hosts typically serve
  `…/solvanta-energy/contact` via a redirect to `…/solvanta-energy/contact/`
  (GitHub Pages does this), which then answers 200.
- **GitHub Pages fallback**: `dist/404.html` is a prerendered not-found page
  that still boots the SPA. GitHub Pages serves it for any unmatched path, so
  React Router renders the branded 404 — and routes added later without a
  rebuild still work client-side.
- **Netlify**: `public/_redirects` is already included and copied to `dist/`.
- **Vercel**: static routes resolve directly; add a rewrite of `/(.*)` to
  `/index.html` as a last-resort fallback.
- **Apache/Nginx/other**: serve the prerendered files; route unknown paths to
  `/index.html` (200).

The prerenderer (`scripts/prerender.mjs`) renders through
`src/entry-prerender.tsx` with `renderToStaticMarkup`; the route table in
`src/routes.tsx` is shared with the live app so the two cannot drift apart.
One honest limitation: pages are prerendered in their default interactive
state (estimator defaults, accordions collapsed) — exactly what the live app
shows on first paint; the client then takes over as normal.

Suggested flow:

```powershell
npm run build
npm run preview   # verify the production build locally first
```

## Before launch — required configuration

Owner-facing checklists: see [HANDOFF.md](HANDOFF.md) for the full
owner-decision list, and
[docs/CONTACT-DELIVERY-SETUP.md](docs/CONTACT-DELIVERY-SETUP.md) for
connecting real enquiry delivery (the one critical launch blocker).

1. `src/config/site.ts`: replace the brand details if you keep the template;
   add `contact.email`, `contact.phone`, `contact.address`; set
   `contact.endpoint` if you want automated enquiry delivery; add `company.abn`,
   licence numbers and `legal.entityName`; add real social URLs.
2. Set `site.url` to the real domain, and update `public/robots.txt` and
   `public/sitemap.xml` to match.
3. Replace `public/images/social-card.jpg` if you want a different sharing
   image (1.91:1 ratio).
4. Re-verify incentives and estimator assumptions — follow the checklist in
   [RESEARCH_NOTES.md](RESEARCH_NOTES.md).
5. Have privacy, terms and accessibility pages reviewed for your business and
   jurisdiction.
6. Consider self-hosting the fonts (see [ASSET_SOURCES.md](ASSET_SOURCES.md))
   if you want zero third-party runtime requests.
7. Run the accessibility checks with real assistive technology and, ideally,
   commission an independent audit.

## Project structure

```
public/            static assets (images, favicon, robots, sitemap, _redirects)
src/
  components/
    forms/         enquiry form
    layout/        Header, Footer, Layout, DocLayout (legal page shell)
    sections/      home page sections + shared CTA bands
    ui/            Button, Accordion, Field, Lightbox, Media, Logo, icons…
  config/site.ts   central business configuration
  data/            content: services, incentives, articles, gallery, FAQs, assumptions
  hooks/           useSeo, useReveal
  lib/             estimator engine, formatting helpers
  pages/           one file per route
  styles/          tokens → base → components → pages (cascade order)
```

## Credits

- Photography: verified Australian solar photography from Wikimedia Commons
  (CC BY / CC BY-SA, credited in-captions), plus Pexels (free licence) for
  equipment and process shots — full credits in
  [ASSET_SOURCES.md](ASSET_SOURCES.md).
- Icons: [Lucide](https://lucide.dev) (ISC licence) plus Simple Icons (CC0)
  for social glyphs.
- Fonts: Fraunces, Manrope, JetBrains Mono (Google Fonts, OFL).
- Incentive research and sources: [RESEARCH_NOTES.md](RESEARCH_NOTES.md).
