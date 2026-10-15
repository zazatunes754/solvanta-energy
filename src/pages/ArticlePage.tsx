import { useParams, Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { articles, getArticle } from "../data/articles";
import { getService } from "../data/services";
import { site } from "../config/site";
import { formatDate } from "../lib/format";
import { Media } from "../components/ui/Media";
import { Button } from "../components/ui/Button";
import { ContentBlockView } from "../components/ui/ContentBlocks";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";
import { absoluteAsset } from "../lib/asset";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  useSeo({
    title: article ? article.title : "Article not found",
    description: article?.dek ?? "The requested article could not be found.",
    path: `/knowledge-hub/${slug ?? ""}`,
    image: article?.heroImage,
    noIndex: !article,
    structuredData: article
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.dek,
          datePublished: article.published,
          dateModified: article.updated,
          image: absoluteAsset(article.heroImage),
          publisher: { "@type": "Organization", name: site.brand.name, url: site.url },
          mainEntityOfPage: `${site.url}/knowledge-hub/${article.slug}`,
        }
      : null,
  });

  if (!article) {
    return (
      <section className="notfound">
        <div className="container container--narrow stack">
          <p className="eyebrow">Not found</p>
          <h1>That article does not exist.</h1>
          <p className="lede">
            The link may be out of date. The knowledge hub lists every article we have published.
          </p>
          <div className="btn-row">
            <Button to="/knowledge-hub" variant="primary" withIcon>
              Browse the knowledge hub
            </Button>
            <Button to="/faq" variant="ghost">
              Read the FAQs
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const related = article.related?.length
    ? article.related
        .map((relatedSlug) => getArticle(relatedSlug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    : articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  const relatedServiceLinks = (article.relatedServices ?? [])
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      <article>
        <header className="page-hero">
          <div className="container page-hero__inner">
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="lede">{article.dek}</p>
            <div className="page-hero__meta">
              <span>Published {formatDate(article.published)}</span>
              <span>Updated {formatDate(article.updated)}</span>
              <span>{article.readingMinutes} min read</span>
              <span>{site.brand.name} editorial</span>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="article-hero">
            <Media src={article.heroImage} alt={article.heroAlt} priority />
          </div>

          <div className="article-body">
            <div className="prose">
              {article.blocks.map((block, index) => (
                <ContentBlockView block={block} key={`${block.type}-${index}`} />
              ))}
            </div>

            <aside className="article-aside">
              <div className="sources">
                <h2>Sources &amp; references</h2>
                <ul>
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                      {source.note && <span>{source.note}</span>}
                    </li>
                  ))}
                </ul>
                <p className="note-inline" style={{ marginTop: "var(--space-4)" }}>
                  External links open in a new tab. We link to official sources so you can verify
                  the current position yourself.
                </p>
              </div>

              <div className="panel">
                <h3 style={{ fontSize: "var(--step-1)" }}>Run the numbers</h3>
                <p style={{ marginBlock: "var(--space-3)" }}>
                  The savings estimator applies these ideas to your own bill, with every assumption
                  published and editable.
                </p>
                <Button to="/solar-estimator" variant="dark" block withIcon>
                  Open the estimator
                </Button>
              </div>

              <div className="panel panel--flat">
                <h3 style={{ fontSize: "var(--step-1)" }}>Related reading</h3>
                <ul className="footer__links" style={{ marginTop: "var(--space-3)" }}>
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/knowledge-hub/${item.slug}`} style={{ color: "var(--forest-600)" }}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/solar-rebates" style={{ color: "var(--forest-600)" }}>
                      Rebates and incentives guide
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" style={{ color: "var(--forest-600)" }}>
                      Frequently asked questions
                    </Link>
                  </li>
                </ul>
              </div>

              {relatedServiceLinks.length > 0 && (
                <div className="panel panel--flat">
                  <h3 style={{ fontSize: "var(--step-1)" }}>Related services</h3>
                  <ul className="footer__links" style={{ marginTop: "var(--space-3)" }}>
                    {relatedServiceLinks.map((service) => (
                      <li key={service.slug}>
                        <Link
                          to={`/services/${service.slug}`}
                          style={{ color: "var(--forest-600)" }}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <section className="section section--tight">
        <div className="container">
          <div className="hairline" style={{ paddingTop: "var(--space-6)" }}>
            <p className="note-inline">
              This article is general information, not advice about your specific property. System
              sizing, savings and eligibility depend on your own circumstances.{" "}
              <a href="https://www.cleanenergycouncil.org.au/consumers" target="_blank" rel="noopener noreferrer">
                Consumer guidance from the Clean Energy Council
                <ExternalLink size={13} aria-hidden="true" style={{ marginLeft: 6, verticalAlign: "-2px" }} />
              </a>
            </p>
            <p style={{ marginTop: "var(--space-4)" }}>
              <Link className="arrow-link" to="/knowledge-hub">
                Back to the knowledge hub
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a question this article raised?"
        body="Ask it directly. We answer straightforward questions without requiring an appointment or a sales visit."
      />
    </>
  );
}
