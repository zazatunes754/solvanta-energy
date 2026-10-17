import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { RouteTable } from "./routes";

/**
 * Routes are code-split: the home page ships with the first bundle, and every
 * other page loads on demand. This keeps the initial download small while all
 * pages keep the same layout, header and footer. The route table itself lives
 * in `src/routes.tsx` so the prerender build step can render the identical
 * table with eagerly-loaded pages.
 */

function RouteLoading() {
  return (
    <div className="route-loading" role="status">
      <span className="route-loading__dot" aria-hidden="true" />
      <p>Loading page…</p>
    </div>
  );
}

export default function App() {
  // The router base is derived from the Vite base ("/solvanta-energy/" on
  // GitHub Pages, "/" locally) so navigation stays correct in every
  // environment without a second hardcoded value.
  const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return (
    <BrowserRouter basename={basename === "/" ? "" : basename}>
      <Layout>
        <Suspense fallback={<RouteLoading />}>
          <RouteTable />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
