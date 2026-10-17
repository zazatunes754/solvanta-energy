/**
 * Browser QA sweep for the built site.
 * Requires: npm run preview running on http://localhost:4173 (serves dist/ with
 * the /solvanta-energy/ base), and Playwright with the system Chrome channel.
 *
 * Usage: node scripts/qa.mjs [--smoke] (smoke = fewer viewports)
 *
 * Screenshots are written to qa/ in the repository (override the destination
 * with QA_SHOT_DIR) as JPEGs so the evidence set stays reviewable without
 * shipping tens of megabytes of PNG per run. The screenshot contexts emulate
 * `prefers-reduced-motion` so scroll-reveal content is never captured mid-
 * fade as a blank block — a screenshot artefact, not a page defect.
 */
import { chromium } from "playwright";
import process from "node:process";
import path from "node:path";
import fs from "node:fs";

const BASE = "http://localhost:4173/solvanta-energy";
const SHOT_DIR = process.env.QA_SHOT_DIR ?? path.resolve("qa");
const smoke = process.argv.includes("--smoke");

const ROUTES = [
  "/",
  "/services",
  "/services/residential-solar",
  "/solar-rebates",
  "/solar-estimator",
  "/solutions",
  "/knowledge-hub",
  "/knowledge-hub/choosing-system-size",
  "/about",
  "/faq",
  "/contact",
  "/privacy",
];

const VIEWPORTS = smoke
  ? [
      { name: "mobile-sm", width: 320, height: 800 },
      { name: "mobile", width: 390, height: 844 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1440, height: 900 },
    ]
  : [
      { name: "mobile-sm", width: 320, height: 800 },
      { name: "mobile-md", width: 375, height: 800 },
      { name: "mobile-lg", width: 390, height: 844 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "laptop", width: 1024, height: 800 },
      { name: "desktop", width: 1440, height: 900 },
      { name: "desktop-lg", width: 1920, height: 1080 },
    ];

const results = [];

async function main() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: "reduce",
      fontFamilies: undefined,
    });
    const page = await context.newPage();

    /** @type {string[]} */
    const consoleErrors = [];
    /** @type {string[]} */
    const failedRequests = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("requestfailed", (req) => failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`));
    page.on("response", (res) => {
      if (res.status() >= 400) failedRequests.push(`${res.url()} — HTTP ${res.status()}`);
    });

    for (const route of ROUTES) {
      const url = `${BASE}${route === "/" ? "/" : route}`;
      console.log(`  … ${vp.name} ${route}`);
      await page.goto(url, { waitUntil: "load" });
      await page.waitForTimeout(250);

      // horizontal overflow check
      const overflow = await page.evaluate(() => {
        const el = document.documentElement;
        return { scrollW: el.scrollWidth, clientW: el.clientWidth, url: location.href };
      });
      console.log(`    overflow-check done`);
      const hasOverflow = overflow.scrollW > overflow.clientW + 1;

      // lazy images: scroll through the page at a speed Chromium actually
      // triggers lazy loads at, then force-load any stragglers so the check
      // only reports genuinely broken images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            y += 500;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 90);
            else resolve(null);
          };
          step();
        });
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(50);
      await page.evaluate(() =>
        [...document.querySelectorAll("img")].forEach((img) => {
          if (!img.complete) img.loading = "eager";
        }),
      );
      await page
        .waitForFunction(() => [...document.querySelectorAll("img")].every((img) => img.complete), null, {
          timeout: 10000,
        })
        .catch(() => {});
      await page.waitForTimeout(150);

      const brokenImages = await page.evaluate(() =>
        [...document.querySelectorAll("img")]
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute("src")),
      );

      const shot = `${SHOT_DIR}\\${vp.name}${route.replace(/\//g, "_")}.jpg`;
      try {
        await page.screenshot({ path: shot, fullPage: true, type: "jpeg", quality: 88 });
      } catch (err) {
        issues.push(`Screenshot failed for ${vp.name} ${route}: ${err?.message ?? err}`);
      }
      // Never report evidence as captured when the file is missing or empty.
      if (!fs.existsSync(shot) || fs.statSync(shot).size < 1024) {
        issues.push(`Screenshot missing or suspiciously small: ${shot}`);
      }

      results.push({
        viewport: vp.name,
        route,
        url: overflow.url,
        overflow: hasOverflow ? `scrollW ${overflow.scrollW} > clientW ${overflow.clientW}` : "",
        brokenImages,
        consoleErrors: [...consoleErrors],
        failedRequests: [...failedRequests],
        shot,
      });
      consoleErrors.length = 0;
      failedRequests.length = 0;
    }

    await context.close();
  }

  // --- interaction tests at desktop + mobile on representative pages ----
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const issues = [];

  // FAQ accordion
  await page.goto(`${BASE}/faq`, { waitUntil: "networkidle" });
  const accordionBtn = page.locator("button", { hasText: /^.*/ }).filter({ has: page.locator("[aria-expanded]") }).first();
  const accordions = page.getByRole("button", { expanded: false });
  if (await accordions.count()) {
    const first = accordions.first();
    await first.click();
    await page.waitForTimeout(200);
    const expandedNow = await page.getByRole("button", { expanded: true }).count();
    if (!expandedNow) issues.push("FAQ accordion did not expand");
  } else {
    issues.push("No accordions found on /faq");
  }

  // Gallery lightbox
  await page.goto(`${BASE}/solutions`, { waitUntil: "networkidle" });
  const galleryItem = page.locator("button.gallery__item").first();
  if (await galleryItem.count()) {
    await galleryItem.click();
    await page.waitForTimeout(300);
    const dialogVisible = await page.locator("[role='dialog'], .lightbox").count();
    if (!dialogVisible) issues.push("Gallery lightbox did not open");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const dialogGone = !(await page.locator("[role='dialog']:visible, .lightbox:visible").count());
    if (!dialogGone) issues.push("Gallery lightbox did not close on Escape");
  } else {
    issues.push("No lightbox trigger found on /solutions");
  }

  // Estimator renders numbers
  await page.goto(`${BASE}/solar-estimator`, { waitUntil: "networkidle" });
  const estText = await page.textContent("body");
  if (!/\$\d/.test(estText)) issues.push("Estimator page shows no dollar figures");

  // Estimator deep link
  await page.goto(`${BASE}/solar-estimator?state=VIC&bill=650&battery=13.5`, { waitUntil: "networkidle" });
  const vicSelected = await page.locator("select").first().inputValue();
  if (vicSelected !== "VIC") issues.push(`Estimator deep link state not applied (got ${vicSelected})`);

  // Contact form: invalid submit shows errors, no fake success
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /send/i }).click();
  await page.waitForTimeout(200);
  const errVisible = await page.locator(".field__error, [id*='error']", { hasText: /./ }).count();
  if (!errVisible) issues.push("Contact form invalid submit showed no validation errors");

  // Mobile menu
  const mob = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const mpage = await mob.newPage();
  await mpage.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const menuBtn = mpage.getByRole("button", { name: /menu/i }).first();
  if (await menuBtn.count()) {
    await menuBtn.click();
    await mpage.waitForTimeout(300);
    const drawerVisible = await mpage.locator("nav:visible, [class*='drawer']:visible").count();
    if (!drawerVisible) issues.push("Mobile menu did not open");
  } else {
    issues.push("Mobile menu button not found at 375px");
  }
  await mob.close();

  await context.close();
  await browser.close();

  // ---- report ----
  // Cross-check the manifest against the files actually on disk: every
  // referenced screenshot must exist, and no stale entries are tolerated.
  const expectedShots = results.map((r) => path.basename(r.shot));
  const onDisk = fs.existsSync(SHOT_DIR)
    ? fs.readdirSync(SHOT_DIR).filter((f) => f.endsWith(".jpg"))
    : [];
  const missingOnDisk = expectedShots.filter((f) => !onDisk.includes(f));
  const unreferenced = onDisk.filter((f) => !expectedShots.includes(f));
  if (missingOnDisk.length) {
    for (const f of missingOnDisk) issues.push(`Manifest references missing screenshot: ${f}`);
  }
  if (unreferenced.length) {
    for (const f of unreferenced) issues.push(`Screenshot on disk is not referenced by the manifest: ${f}`);
  }
  const problems = results.filter(
    (r) => r.overflow || r.brokenImages.length || r.consoleErrors.length || r.failedRequests.length,
  );
  console.log(
    `\n=== screenshot sweeps: ${results.length}, screenshots on disk: ${onDisk.length}, manifest/file mismatches: ${missingOnDisk.length + unreferenced.length}, problem entries: ${problems.length} ===`,
  );
  for (const r of problems) {
    console.log(`\n[${r.viewport}] ${r.route} — ${r.shot}`);
    if (r.overflow) console.log(`  OVERFLOW: ${r.overflow}`);
    if (r.brokenImages.length) console.log(`  BROKEN IMAGES: ${JSON.stringify(r.brokenImages)}`);
    if (r.consoleErrors.length) console.log(`  CONSOLE: ${JSON.stringify(r.consoleErrors)}`);
    if (r.failedRequests.length) console.log(`  NETWORK: ${JSON.stringify(r.failedRequests)}`);
  }
  console.log(`\n=== interaction issues: ${issues.length} ===`);
  for (const i of issues) console.log(`  - ${i}`);
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  fs.writeFileSync(path.join(SHOT_DIR, "qa-results.json"), JSON.stringify({ results, issues }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Watchdog: never let the QA sweep hang silently.
setTimeout(() => {
  console.error("QA sweep exceeded 8 minutes — aborting.");
  process.exit(2);
}, 8 * 60 * 1000).unref();
