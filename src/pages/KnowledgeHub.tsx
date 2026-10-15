import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "../data/articles";
import { Media } from "../components/ui/Media";
import { SectionHeading } from "../components/ui/primitives";
import { Button } from "../components/ui/Button";
import { CtaBand } from "../components/sections/HomeHero";
import { formatDate } from "../lib/format";
import { useSeo } from "../hooks/useSeo";

export default function KnowledgeHub() {
  useSeo({
    title: "Knowledge hub — solar, batteries and incentives explained",
    description:
      "Plain-English guides on how home batteries work, whether to invest in panels or storage first, how Australian solar and battery incentives actually function, and what to ask an installer.",
    path: "/knowledge-hub",
  });

  const [lead, ...rest] = articles;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Knowledge hub</p>
          <h1>Understand the system before you buy the system.</h1>
          <p className="lede">
            These articles are written to be useful whether or not you ever speak to us: how storage
            works, how incentives function, what decides your savings, and which questions expose a
            weak proposal.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="articles-title">
        <div className="container">
          <SectionHeading
            eyebrow="Featured"
            title={<span id="articles-title">{lead.title}</span>}
            aside={
              <div className="stack">
                <p className="lede">{lead.dek}</p>
                <Link className="arrow-link" to={`/knowledge-hub/${lead.slug}`}>
                  Read the article
                  <ArrowRight className="btn__icon" aria-hidden="true" />
                </Link>
              </div>
            }
          />

          <Link
            to={`/knowledge-hub/${lead.slug}`}
            style={{
              display: "block",
              marginTop: "var(--space-6)",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
            }}
          >
            <div className="article-hero" style={{ marginTop: 0 }}>
              <Media src={lead.heroImage} alt={lead.heroAlt} />
            </div>
          </Link>

          <div className="article-grid" style={{ marginTop: "var(--space-8)" }}>
            {rest.map((article) => (
              <article className="article-card" key={article.slug}>
                <Link to={`/knowledge-hub/${article.slug}`} className="article-card__media">
                  <Media src={article.heroImage} alt={article.heroAlt} />
                </Link>
                <p className="article-card__meta">
                  <span>{article.category}</span>
                  <span>{article.readingMinutes} min read</span>
                  <span>{formatDate(article.updated)}</span>
                </p>
                <h3>
                  <Link to={`/knowledge-hub/${article.slug}`}>{article.title}</Link>
                </h3>
                <p>{article.dek}</p>
                <Link className="arrow-link" to={`/knowledge-hub/${article.slug}`}>
                  Read the article
                  <ArrowRight className="btn__icon" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="sources-title">
        <div className="container">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">Sourcing</p>
              <h2 id="sources-title" style={{ fontSize: "var(--step-3)" }}>
                Where our information comes from.
              </h2>
              <p>
                Technical explanations draw on general engineering practice and the published
                documentation of Australian regulators and state programs. Each article lists its
                sources, and the{" "}
                <Link to="/solar-rebates">rebates page</Link> records the date each program was last
                verified against its official page.
              </p>
              <p>
                We do not publish statistics we cannot attribute, and we do not describe a
                government program as active without checking it. When a program closes — as
                Victoria's interest-free battery loan has — we say so rather than quietly removing
                it.
              </p>
            </div>
            <div className="panel">
              <h3 style={{ fontSize: "var(--step-1)" }}>Still have a question?</h3>
              <p style={{ marginBlock: "var(--space-3)" }}>
                The FAQ page covers the questions people ask most often, grouped by topic. If yours
                is not there, ask us directly.
              </p>
              <div className="btn-row">
                <Button to="/faq" variant="dark" withIcon>
                  Read the FAQs
                </Button>
                <Button to="/contact" variant="ghost">
                  Ask a question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to apply this to your own property?"
        body="The savings estimator models your bill against solar and storage — with every assumption published."
      />
    </>
  );
}
