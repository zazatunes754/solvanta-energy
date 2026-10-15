import { site } from "../config/site";

/**
 * Public-directory asset paths.
 * ---------------------------------------------------------------------------
 * Images live in `public/images/…` and are referenced with plain strings like
 * "/images/x.webp". Vite rebases the URLs it can see at build time (JS/CSS
 * imports, `index.html` attributes), but string paths inside data files and
 * JSX are shipped verbatim. On GitHub Pages the site is built with
 * `base: "/solvanta-energy/"`, so verbatim paths would resolve against the
 * domain root and 404.
 *
 * `asset()` prefixes public paths with the deployment base ("/" in local
 * development, "/solvanta-energy/" on GitHub Pages) so a single string works
 * everywhere. It is idempotent: wrapping an already-prefixed path is a no-op.
 */
export function asset(path: string): string {
  // Absolute URLs (https://, //cdn…) and data URIs are not public-dir paths.
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  if (base !== "/" && path.startsWith(base)) return path;
  return `${base}${path.replace(/^\/+/, "")}`;
}

/** `asset()` resolved to a full URL on the canonical public site (meta tags, JSON-LD). */
export function absoluteAsset(path: string): string {
  return new URL(asset(path), site.url).href;
}
