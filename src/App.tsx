import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";

/**
 * Routes are code-split: the home page ships with the first bundle, and every
 * other page loads on demand. This keeps the initial download small while all
 * pages keep the same layout, header and footer.
 */
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Rebates = lazy(() => import("./pages/Rebates"));
const Estimator = lazy(() => import("./pages/Estimator"));
const Solutions = lazy(() => import("./pages/Solutions"));
const KnowledgeHub = lazy(() => import("./pages/KnowledgeHub"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoading() {
  return (
    <div className="route-loading" role="status">
      <span className="route-loading__dot" aria-hidden="true" />
      <p>Loading page…</p>
    </div>
  );
}

export default function App() {
  return (
   <BrowserRouter basename="/solvanta-energy">
      <Layout>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/solar-rebates" element={<Rebates />} />
            <Route path="/solar-estimator" element={<Estimator />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/knowledge-hub/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
