import { useEffect } from "react";
import { site } from "../config/site";
import { absoluteAsset } from "../lib/asset";

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
 *
 * The same hook also feeds the build-time prerenderer: when rendering happens
 * on the server (`scripts/prerender.mjs` → `src/entry-prerender.tsx`) there is
 * no `document`, so the tags are collected into a module-level buffer that the
 * prerenderer serialises into each generated HTML file. That means every
 * shipped route carries its own real title, description, canonical URL and
 * Open Graph tags in the initial HTML.
 */

export type HeadTag =
  | { tag: "title"; text: string }
  | { tag: "meta"; attrs: Record<string, string> }
  | { tag: "link"; attrs: Record<string, string> }
  | { tag: "script"; text: string };

let headCollector: HeadTag[] | null = null;

/** Start collecting head tags instead of writing to `document` (server only). */
export function beginHeadCollection(): void {
  headCollector = [];
}

/** Stop collecting and return what was gathered since the last begin call. */
export function endHeadCollection(): HeadTag[] {
  const tags = headCollector ?? [];
  headCollector = null;
  return tags;
}

export function useSeo({ title, description, path, image, noIndex, structuredData }: SeoOptions) {
  const fullTitle = path === "/" ? title : `${title} | ${site.brand.name}`;
  const canonical = `${site.url}${path === "/" ? "" : path}`;
  const socialImage = absoluteAsset(image ?? "/images/social-card.jpg");

  // Server render (prerendering): buffer the head instead of touching DOM.
  if (headCollector) {
    headCollector.push({ tag: "title", text: fullTitle });
    headCollector.push({ tag: "meta", attrs: { name: "description", content: description } });
    headCollector.push({
      tag: "meta",
      attrs: { name: "robots", content: noIndex ? "noindex, follow" : "index, follow" },
    });
    headCollector.push({ tag: "link", attrs: { rel: "canonical", href: canonical } });
    headCollector.push({ tag: "meta", attrs: { property: "og:title", content: fullTitle } });
    headCollector.push({ tag: "meta", attrs: { property: "og:description", content: description } });
    headCollector.push({ tag: "meta", attrs: { property: "og:url", content: canonical } });
    headCollector.push({ tag: "meta", attrs: { property: "og:image", content: socialImage } });
    headCollector.push({
      tag: "meta",
      attrs: { property: "og:type", content: path === "/" ? "website" : "article" },
    });
    headCollector.push({ tag: "meta", attrs: { name: "twitter:title", content: fullTitle } });
    headCollector.push({ tag: "meta", attrs: { name: "twitter:description", content: description } });
    headCollector.push({ tag: "meta", attrs: { name: "twitter:image", content: socialImage } });
    if (structuredData) {
      headCollector.push({ tag: "script", text: JSON.stringify(structuredData) });
    }
  }

  useEffect(() => {
    if (typeof document === "undefined") return;

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
