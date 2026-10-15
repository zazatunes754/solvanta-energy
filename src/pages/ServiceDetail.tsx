import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getService, services } from "../data/services";
import { getArticle } from "../data/articles";
import { site } from "../config/site";
import { Button } from "../components/ui/Button";
import { Media } from "../components/ui/Media";
import { Callout, SectionHeading, TickList } from "../components/ui/primitives";
import { ContentBlockView } from "../components/ui/ContentBlocks";
import { Accordion } from "../components/ui/Accordion";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";

/** Long-form service guide rendered at /services/:slug. */
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  useSeo({
    title: service ? `${service.title} — how it works` : "Service not found",
    description:
      service?.short ??
      "The requested service page could not be found. Browse the full list of services instead.",
    path: `/services/${slug ?? ""}`,
    noIndex: !service,
    structuredData: service
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.short,
          areaServed: "Australia",
          provider: { "@type": "Organization", name: site.brand.name, url: site.url },
          mainEntityOfPage: `${site.url}/services/${service.slug}`,
        }
      : null,
  });

  if (!service) {
    return (
      <section className="notfound">
        <div className="container container--narrow stack">
          <p className="eyebrow">Not found</p>
          <h1>That service page does not exist.</h1>
          <p className="lede">
            The link may be out of date. The services page lists everything we offer, and each
            service has its own guide.
          </p>
          <div className="btn-row">
            <Button to="/services" variant="primary" withIcon>
              Browse all services
            </Button>
            <Button to="/contact" variant="ghost">
              Ask a question instead
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const relatedArticles = service.relatedArticles
    .map((articleSlug) => getArticle(articleSlug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  const faqItems = service.faqs.map((faq, index) => ({
    id: `${service.slug}-faq-${index}`,
    heading: faq.question,
    content: faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
  }));

  return (
    <>
      <article>
        <header className="page-hero">
          <div className="container page-hero__inner">
            <p className="eyebrow">Service guide</p>
            <h1>{service.title}</h1>
            <p className="lede">{service.tagline}</p>
            <div className="btn-row">
              <Button to="/contact" variant="primary" withIcon>
                Request an assessment
              </Button>
              <Button to="/services" variant="ghost-deep">
                All services
              </Button>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="article-hero">
            <Media src={service.image} alt={service.imageAlt} priority focus="50% 45%" />
          </div>

          <div className="article-body">
            <div className="prose">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {service.guide.map((block, index) => (
                <ContentBlockView block={block} key={`${block.type}-${index}`} />
              ))}
            </div>

            <aside className="article-aside">
              {service.note && (
                <Callout title="Worth knowing" tone="warn">
                  <p>{service.note}</p>
                </Callout>
              )}

              <div className="panel">
                <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                  What's included
                </p>
                <TickList items={service.includes} />
              </div>

              <div className="panel panel--flat">
                <p className="mono" style={{ marginBottom: "var(--space-3)" }}>
                  Well suited to
                </p>
                <TickList items={service.goodFor} variant="cross" />
              </div>

              {relatedArticles.length > 0 && (
                <div className="sources">
                  <h2>Related reading</h2>
                  <ul>
                    {relatedArticles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          to={`/knowledge-hub/${article.slug}`}
                          style={{ color: "var(--forest-600)" }}
                        >
                          {article.title}
                        </Link>
                        <span>{article.dek}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="panel panel--flat">
                <h3 style={{ fontSize: "var(--step-1)" }}>Other services</h3>
                <ul className="footer__links" style={{ marginTop: "var(--space-3)" }}>
                  {otherServices.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/services/${item.slug}`} style={{ color: "var(--forest-600)" }}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <section className="section section--tight" aria-labelledby="service-faq-title">
          <div className="container container--narrow">
            <SectionHeading
              eyebrow="Common questions"
              title={<span id="service-faq-title">Questions we are asked about this service</span>}
              lede="Short, direct answers. If your question is not here, ask it directly."
            />
            <div style={{ marginTop: "var(--space-6)" }}>
              <Accordion items={faqItems} allowMultiple ariaLabel="Service questions" />
            </div>
          </div>
        </section>
      </article>

      <section className="section section--tight">
        <div className="container">
          <div className="hairline" style={{ paddingTop: "var(--space-6)" }}>
            <p className="note-inline">
              This page is general information about how the service works, not a quotation or a
              guarantee of savings, performance or incentive eligibility. Every installation is
              assessed on its own property, roof and requirements.
            </p>
            <p style={{ marginTop: "var(--space-4)" }}>
              <Link className="arrow-link" to="/services">
                Back to all services
                <ArrowRight className="btn__icon" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a question this guide did not answer?"
        body="Send through what you know about your property and usage, and we will tell you what is worth investigating — including if the answer is 'not yet'."
      />
    </>
  );
}
