import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useSeo } from "../hooks/useSeo";

const suggestions = [
  { to: "/services", label: "Solar & storage services" },
  { to: "/solar-estimator", label: "Savings estimator" },
  { to: "/solar-rebates", label: "Rebates & incentives" },
  { to: "/knowledge-hub", label: "Knowledge hub" },
  { to: "/faq", label: "Frequently asked questions" },
  { to: "/contact", label: "Contact" },
];

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description:
      "The page you were looking for does not exist on this site. Here are the most useful places to continue.",
    path: "/404",
    noIndex: true,
  });

  return (
    <section className="section notfound" aria-labelledby="nf-title">
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <div className="notfound__copy">
          <p className="eyebrow">Page not found</p>
          <h1 id="nf-title">That page has gone off-grid.</h1>
          <p className="lede">
            The link may be out of date, or the page may have moved. Nothing is broken on
            your end — here is where most people are heading.
          </p>
          <div className="btn-row">
            <Button to="/" variant="primary" size="lg" withIcon>
              Back to the home page
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              Tell us about the broken link
            </Button>
          </div>
        </div>

        <div className="panel nf__links">
          <div className="pill-row">
            <Compass size={18} aria-hidden="true" />
            <h2 style={{ fontSize: "var(--step-2)" }}>Popular destinations</h2>
          </div>
          <ul>
            {suggestions.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
