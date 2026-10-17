/**
 * Server-only prerender entry.
 * ---------------------------------------------------------------------------
 * Loaded by `scripts/prerender.mjs` through Vite's SSR module runner after the
 * client build finishes. It renders every route of the app to static HTML with
 * React's `renderToStaticMarkup`, so the deployed site serves real markup for
 * each URL (HTTP 200, correct head tags, no JS required to see content).
 *
 * NOT imported by the client bundle — never reference this from `src/main.tsx`.
 */
import { StaticRouter } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentType } from "react";

import { Layout } from "./components/layout/Layout";
import { RouteTable, routeDefs } from "./routes";
import { services } from "./data/services";
import { articles } from "./data/articles";
import { beginHeadCollection, endHeadCollection, type HeadTag } from "./hooks/useSeo";

/** Router base, mirroring App's derivation from the Vite base. */
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

let resolvedRoutes: Record<string, ComponentType> | undefined;

/** Import every page module once so no route renders a lazy fallback. */
async function ensureResolvedRoutes(): Promise<Record<string, ComponentType>> {
  if (resolvedRoutes) return resolvedRoutes;
  const resolved: Record<string, ComponentType> = {};
  for (const def of routeDefs) {
    const mod = await def.load();
    resolved[def.path] = mod.default;
  }
  resolvedRoutes = resolved;
  return resolved;
}

/** Render one route to static markup, collecting its head tags as well. */
export function renderRoute(path: string): { html: string; head: HeadTag[] } {
  if (!resolvedRoutes) {
    throw new Error("Call prerenderPaths() (which resolves all pages) before renderRoute().");
  }
  beginHeadCollection();
  const html = renderToStaticMarkup(
    <StaticRouter location={`${basename}${path === "/" ? "/" : path}`} basename={basename}>
      <Layout>
        <RouteTable resolved={resolvedRoutes} />
      </Layout>
    </StaticRouter>,
  );
  return { html, head: endHeadCollection() };
}

/**
 * Every URL that should exist as a real HTML file: all static routes plus one
 * page per concrete service and knowledge-hub article slug.
 */
export async function prerenderPaths(): Promise<string[]> {
  await ensureResolvedRoutes();
  const paths = routeDefs
    .filter((def) => !def.path.includes(":") && def.path !== "*")
    .map((def) => def.path);
  for (const service of services) {
    paths.push(`/services/${service.slug}`);
  }
  for (const article of articles) {
    paths.push(`/knowledge-hub/${article.slug}`);
  }
  return paths;
}

/** Location that matches no route — used to prerender the 404 page. */
export const notFoundLocation = "/__no_such_page__";
