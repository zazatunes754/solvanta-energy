import { chromium } from "playwright";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";

const SHOT_DIR = `${process.env.TEMP}\\opencode\\qa`;
fs.mkdirSync(SHOT_DIR, { recursive: true });
const BASE = "https://zazatunes754.github.io/solvanta-energy";

const browser = await chromium.launch({ channel: "chrome" });
const errors = [];
const failed = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.url()} HTTP ${r.status()}`); });

await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.waitForTimeout(2500);
const homeTitle = await page.title();
await page.screenshot({ path: path.join(SHOT_DIR, "LIVE-hero.png") });

const direct = await page.goto(`${BASE}/contact`, { waitUntil: "load" });
await page.waitForTimeout(2000);
const contactTitle = await page.title();
const heading = await page.locator("h1, h2").first().textContent();
await page.screenshot({ path: path.join(SHOT_DIR, "LIVE-contact.png") });

const refreshed = await page.goto(`${BASE}/solar-estimator`, { waitUntil: "load" });
await page.waitForTimeout(2000);
const estimatorTitle = await page.title();
const hasFigures = /\$\d/.test(await page.textContent("body"));
await page.screenshot({ path: path.join(SHOT_DIR, "LIVE-estimator.png") });

const imagesOk = await page.evaluate(() =>
  [...document.querySelectorAll("img")].every((img) => !img.complete || img.naturalWidth > 0),
);

console.log(JSON.stringify({ homeTitle, contactTitle, contactHeading: heading, estimatorTitle, estimatorShowsFigures: hasFigures, consoleErrors: errors, failedRequests: failed, imagesOk }, null, 2));
await browser.close();
