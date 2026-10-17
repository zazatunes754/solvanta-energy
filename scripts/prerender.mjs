/**
 * Prerender every route of the site into real HTML files inside `dist`.
 * ---------------------------------------------------------------------------
 * Run after `vite build`:
 *
 *     node scripts/prerender.mjs
 *
 * How it works: a Vite dev server is created in middleware mode purely as a
 * module runner, `src/entry-prerender.tsx` is loaded through it, and every
 * route (static pages plus each service and article slug) is rendered with
 * `renderToStaticMarkup`. The resulting markup is injected into the built
 * `dist/index.html` template, one `route/index.html` per path, so deep links
 * answer with HTTP 200 and real content instead of relying only on the SPA
 * 404 fallback. `dist/404.html` gets a prerendered not-found page and keeps
 * its role as the GitHub Pages SPA fallback for genuinely unknown URLs.
 *
 * Client behaviour is unchanged: `main.tsx` hydrates from scratch with
 * `createRoot`, so the prerendered markup is replaced by the live app on load.
 */
import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";

const BASE = "/solvanta-energy/";
const outDir = path.resolve("dist");

/** Escape a string for use inside a double-quoted HTML attribute. */
const escAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Serialise collected head tags (see useSeo) into HTML. */
function serialiseHead(tags) {
  return tags
    .map((t) => {
      const attrs = (record) =>
        Object.entries(record)
          .map(([k, v]) => `${k}="${escAttr(v)}"`)
          .join(" ");
      if (t.tag === "title") return `<title>${escAttr(t.text)}</title>`;
      if (t.tag === "meta") return `<meta ${attrs(t.attrs)} />`;
      if (t.tag === "link") return `<link ${attrs(t.attrs)} />`;
      if (t.tag === "script")
        return `<script type="application/ld+json">${t.text.replace(/</g, "\\u003c")}</script>`;
      return "";
    })
    .join("\n    ");
}

/**
 * Remove the index.html template's default SEO tags — the prerendered pages
 * carry their own, route-accurate versions of all of them.
 */
function stripDefaultSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/<meta\s+name="robots"[\s\S]*?\/>/, "")
    .replace(/<meta\s+property="og:[\s\S]*?\/>/g, "")
    .replace(/<meta\s+name="twitter:(?:title|description|image)"[\s\S]*?\/>/g, "");
}

const vite = await createServer({
  base: BASE,
  server: { middlewareMode: true },
  appType: "custom",
  // This server only runs SSR modules; skip dependency prebundling chatter.
  optimizeDeps: { noDiscovery: true },
});

try {
  const entry = await vite.ssrLoadModule("/src/entry-prerender.tsx");
  const paths = await entry.prerenderPaths();

  const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  const cleaned = stripDefaultSeo(template);
  if (!cleaned.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html does not contain the expected empty <div id="root"></div>');
  }

  let written = 0;
  for (const routePath of paths) {
    const { html, head } = entry.renderRoute(routePath);
    if (html.includes("Loading page") || html.trim().length < 2000) {
      throw new Error(`Prerender output for ${routePath} looks wrong (fallback or too short)`);
    }
    const pageHtml = cleaned
      .replace(/<\/head>/, `    ${serialiseHead(head)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const outFile =
      routePath === "/" ? path.join(outDir, "index.html") : path.join(outDir, routePath, "index.html");
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, pageHtml);
    written += 1;
  }

  // 404.html: prerendered not-found page that still boots the SPA on GitHub
  // Pages (served with a 404 status for unmatched URLs).
  const notFound = entry.renderRoute(entry.notFoundLocation);
  const nfHtml = cleaned
    .replace(/<\/head>/, `    ${serialiseHead(notFound.head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${notFound.html}</div>`);
  fs.writeFileSync(path.join(outDir, "404.html"), nfHtml);

  console.log(`Prerendered ${written} routes + 404.html into dist/`);
} finally {
  await vite.close();
}
