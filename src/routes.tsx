import { lazy, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";

/**
 * Single source of truth for the route table.
 * ---------------------------------------------------------------------------
 * `App` renders these lazily (code-split chunks per page); the prerender build
 * step (`scripts/prerender.mjs` + `src/entry-prerender.tsx`) renders the same
 * table eagerly with `renderToStaticMarkup` to bake real HTML into `dist` for
 * every route. Keep both behaviours pointed at this one table so they cannot
 * drift apart.
 */

export type RouteDef = {
  path: string;
  load: () => Promise<{ default: ComponentType }>;
};

export const routeDefs: RouteDef[] = [
  { path: "/", load: () => import("./pages/Home") },
  { path: "/services", load: () => import("./pages/Services") },
  { path: "/services/:slug", load: () => import("./pages/ServiceDetail") },
  { path: "/solar-rebates", load: () => import("./pages/Rebates") },
  { path: "/solar-estimator", load: () => import("./pages/Estimator") },
  { path: "/solutions", load: () => import("./pages/Solutions") },
  { path: "/knowledge-hub", load: () => import("./pages/KnowledgeHub") },
  { path: "/knowledge-hub/:slug", load: () => import("./pages/ArticlePage") },
  { path: "/about", load: () => import("./pages/About") },
  { path: "/contact", load: () => import("./pages/Contact") },
  { path: "/faq", load: () => import("./pages/Faq") },
  { path: "/privacy", load: () => import("./pages/Privacy") },
  { path: "/terms", load: () => import("./pages/Terms") },
  { path: "/accessibility", load: () => import("./pages/Accessibility") },
  { path: "*", load: () => import("./pages/NotFound") },
];

/** Lazily-loaded components, one per route definition (client side). */
const lazyComponents = routeDefs.map((def) => lazy(def.load));

/**
 * The route table. In the browser `resolved` is omitted and every page is a
 * lazy chunk inside a Suspense boundary. During prerendering the caller
 * resolves the modules first and passes them in, so `renderToStaticMarkup`
 * gets real components instead of the loading fallback.
 */
export function RouteTable({ resolved }: { resolved?: Record<string, ComponentType> }) {
  return (
    <Routes>
      {routeDefs.map((def, index) => {
        const Resolved = resolved?.[def.path];
        const LazyPage = lazyComponents[index];
        return (
          <Route key={def.path} path={def.path} element={Resolved ? <Resolved /> : <LazyPage />} />
        );
      })}
    </Routes>
  );
}
