import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { faqCategories, faqs, type Faq } from "../data/faqs";
import { Accordion, type AccordionItem } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { KnowledgeNudge } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";

type Filter = "all" | Faq["category"];

/** FAQPage structured data, generated from the same source as the page. */
const faqStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.join(" "),
    },
  })),
});

export default function Faq() {
  useSeo({
    title: "Frequently asked questions",
    description:
      "Straight answers to common questions about solar panels, home batteries, savings, incentives and installation — written to inform, not to sell.",
    path: "/faq",
    structuredData: faqStructuredData(),
  });

  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? faqs : faqs.filter((faq) => faq.category === filter)),
    [filter],
  );

  const items: AccordionItem[] = visible.map((faq) => ({
    id: faq.id,
    heading: faq.question,
    content: (
      <>
        {faq.answer.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {faq.link && (
          <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
            {faq.link.external ? (
              <a href={faq.link.to} target="_blank" rel="noopener noreferrer">
                {faq.link.label} <ExternalLink size={14} aria-hidden="true" />
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
            ) : (
              <Link to={faq.link.to} style={{ textDecoration: "underline" }}>
                {faq.link.label}
              </Link>
            )}
          </p>
        )}
      </>
    ),
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">FAQ</p>
          <h1>Good questions, answered without the sales script.</h1>
          <p className="lede">
            These are the questions we are asked most often — about how the technology
            works, what it costs, what the incentives really cover and how to judge a quote.
            Where the honest answer is "it depends", we say so, and explain what it depends
            on.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-list-title">
        <div className="container">
          <h2 id="faq-list-title" className="visually-hidden">
            Questions by topic
          </h2>

          <div className="filter-bar" role="group" aria-label="Filter questions by topic">
            <button
              type="button"
              className="filter-btn"
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All topics <span className="filter-btn__count">{faqs.length}</span>
            </button>
            {faqCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="filter-btn"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}{" "}
                <span className="filter-btn__count">
                  {faqs.filter((faq) => faq.category === category).length}
                </span>
              </button>
            ))}
          </div>

          <p className="filter-note" aria-live="polite">
            Showing {visible.length} of {faqs.length} questions
            {filter !== "all" ? ` in ${filter}` : ""}.
          </p>

          {items.length > 0 ? (
            <Accordion key={filter} items={items} allowMultiple ariaLabel="Questions and answers" />
          ) : (
            <p>No questions in this topic yet.</p>
          )}

          <div className="faq-footnote">
            <p>
              Still unsure about something? A short, specific question is genuinely welcome
              — even if the answer turns out to be "solar is not worth it for your
              situation".
            </p>
            <div className="btn-row">
              <Button to="/contact" variant="dark" withIcon>
                Ask us directly
              </Button>
              <Button to="/knowledge-hub" variant="ghost">
                Browse the knowledge hub
              </Button>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeNudge />
    </>
  );
}
