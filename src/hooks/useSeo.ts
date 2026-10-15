import { useEffect } from "react";
import { site } from "../config/site";

type SeoOptions = {
  /** Page title; the brand is appended automatically. */
  title: string;
  description: string;
  /** Route path beginning with "/" — used for the canonical URL. */
  path: string;
  /** Optional social sharing image path (relative to the site root). */
  image?: string;
  /** Set true on pages that should not be indexed. */
  noIndex?: boolean;
  /** Optional JSON-LD structured data for this page. */
  structuredData?: Record<string, unknown> | null;
};

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Lightweight per-route document head management for this single-page app.
 * Keeps titles, descriptions, canonicals and Open Graph tags accurate as the
 * visitor moves between routes (important because crawlers and social
 * scrapers read the rendered document head).
 */
export function useSeo({ title, description, path, image, noIndex, structuredData }: SeoOptions) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${site.brand.name}`;
    const canonical = `${site.url}${path === "/" ? "" : path}`;
    const socialImage = `${site.url}${image ?? "/images/social-card.jpg"}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, follow" : "index, follow");
    setLink("canonical", canonical);

    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    setMeta('meta[property="og:type"]', "property", "og:type", path === "/" ? "website" : "article");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);

    const scriptId = "route-structured-data";
    document.getElementById(scriptId)?.remove();
    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, noIndex, structuredData]);
}

/**
 * Organisation-level structured data.
 * Deliberately minimal: only information that is genuinely true of this site.
 * Add address, telephone, ratings or certifications ONLY when they are real.
 */
export const organisationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brand.name,
  url: site.url,
  description: site.brand.positioning,
  logo: `${site.url}/favicon.svg`,
  areaServed: site.country,
});
