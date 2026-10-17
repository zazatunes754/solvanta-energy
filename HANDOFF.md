# Solvanta Energy — client handoff notes

Read this together with [README.md](README.md) (technical overview) and
[docs/CONTACT-DELIVERY-SETUP.md](docs/CONTACT-DELIVERY-SETUP.md) (enquiry
delivery). This file is about **what you, the site owner, must decide,
provide and verify** — the technical build works as delivered.

---

## 1. What this website is

A marketing and planning website for an Australian solar and battery
business: nine service guides, twenty knowledge-hub articles, a transparent
savings estimator, verified federal/Victorian incentive information, a
reference gallery, FAQ and an enquiry form. It is a static React site hosted
on GitHub Pages, rebuilt automatically from the `main` branch on every push.

**Important:** the current public content is built around a placeholder brand
("Solvanta Energy"). Every business-specific detail is intentionally left
empty until the owner supplies the real information — the interface hides
empty fields rather than inventing them. Nothing on the site claims
installations, customers, licences or ratings, so there is nothing to walk
back — but the brand, contact details and credentials are yours to supply.

## 2. How to work on it

```powershell
npm install
npm run dev        # edit at http://localhost:5173
npm run build      # type-check, build, prerender every route
npm run preview    # check the production build locally
```

Deploying is automatic: `git push` to `main` and GitHub Actions rebuilds and
publishes the site (see `.github/workflows/deploy.yml`). Never force-push.

## 3. Where everything lives

| What | Where |
| --- | --- |
| Brand, contacts, coverage, nav, footer, announcement | `src/config/site.ts` |
| Estimator assumptions and disclaimers | `src/data/estimatorAssumptions.ts` |
| Service guides and their FAQs | `src/data/services.ts` |
| Incentive programs (with verification dates) | `src/data/incentives.ts` |
| Knowledge-hub articles | `src/data/articles.ts` |
| Gallery images, captions, alt text | `src/data/gallery.ts` |
| FAQ questions | `src/data/faqs.ts` |
| Photographs and licensing records | `public/images/`, `ASSET_SOURCES.md` |
| Research sources and re-check policy | `RESEARCH_NOTES.md` |

## 4. Replacing reference photography with your own work

The gallery and editorial sections currently use **licensed reference
photography** (Wikimedia Commons CC BY / CC BY-SA and Pexels), clearly
labelled as reference imagery — no photo is presented as a completed Solvanta
installation. When you have genuine project photos:

1. Put the originals somewhere safe (they are your business records).
2. Re-encode each photo into the site:
   `node scripts/process-images.mjs <source-file> <descriptive-name> 2400`
   — this writes `public/images/<name>.jpg` at high quality.
3. Generate the responsive WebP/JPEG variants:
   `node scripts/build-image-variants.mjs`.
4. Add or update the entry in `src/data/gallery.ts` (alt text, caption,
   category) or the page component that references it.
5. Update `ASSET_SOURCES.md`: move the retired reference file to the "Retired"
   table, and record your own photo as "© <your business> — original work".
   Your own installation photos need no third-party credit.
6. Re-run the QA sweep (`npm run build && npm run preview`, then
   `node scripts/qa.mjs --smoke`) so the committed screenshots match the site.

Keep every photographer credit that applies to any reference photo still in
use — CC BY-SA 4.0 requires attribution and ShareAlike compliance for the
photograph itself.

## 5. Owner decisions outstanding before launch

These are **not done** and cannot be done by the developer — they need the
business owner's real information and sign-off:

- [ ] **Real brand decision** — keep "Solvanta Energy" or substitute the real
      trading name (affects logo wordmark, titles, structured data).
- [ ] **Legal entity name and ABN** — `site.legal.entityName`,
      `site.company.abn` in `src/config/site.ts`. The legal pages currently
      carry an automatic "update before launch" note until this is done.
- [ ] **Public contact details** — email, phone, hours, address (see
      [docs/CONTACT-DELIVERY-SETUP.md](docs/CONTACT-DELIVERY-SETUP.md)).
- [ ] **Enquiry delivery** — connect a form endpoint and test it (same doc).
      **This is the critical launch blocker:** without it, visitors cannot
      complete an enquiry.
- [ ] **Licences and accreditations** — electrical contractor licence,
      Solar Accreditation Australia installer accreditation, Clean Energy
      Council status, etc. Add numbers to `site.company.licenceNumbers` only
      once verified. The site deliberately makes no accreditation claims now.
- [ ] **Service coverage** — confirm which states/territories you actually
      serve in `site.coverage` (all eight are listed as "enquiries welcome"
      with an honest availability note).
- [ ] **Privacy, terms and accessibility pages** — reviewed for your business
      and jurisdiction by someone qualified. The pages honestly describe
      current behaviour (no analytics, no cookies), but they are not legal
      advice.
- [ ] **Incentive re-verification** — amounts and program statuses were
      verified 15–17 October 2026. Re-check quarterly using
      [RESEARCH_NOTES.md](RESEARCH_NOTES.md). The estimator's
      `indicativeDiscountPerEligibleKwh` (250) is a flagged modelling
      placeholder — replace it with a value you are willing to stand behind.
- [ ] **Social profiles** — add real, owned URLs to `site.social` (empty =
      hidden).
- [ ] **Domain** — the site lives at
      `https://zazatunes754.github.io/solvanta-energy/`. If you move to your
      own domain, update `site.url`, `public/robots.txt` and
      `public/sitemap.xml` together.
- [ ] **Final approval** — a full review by you before announcing the site.

## 6. Backup and rollback

- Every change to the site is a commit in this Git repository — the history
  is the backup. To roll back: `git log --oneline` to find the good state,
  then `git revert <commit>` (safe, keeps history) and push.
- Keep the extracted handoff ZIP somewhere durable (cloud drive). If the
  GitHub repository is ever lost, re-create it from that ZIP and push.
- The deployed site is rebuilt from `main` on every push; a bad push can be
  undone by reverting and pushing again (a few minutes to propagate).

## 7. QA evidence

`qa/` contains a committed screenshot set (four viewports × twelve routes)
plus `qa-results.json` (not tracked; regenerated per run) from the last QA
sweep of the production build. If you change the hero photo or any layout,
re-run the sweep so the evidence keeps matching the live site.
