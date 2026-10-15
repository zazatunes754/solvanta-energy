import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to an element the first time it scrolls into view, so the
 * reveal styles in base.css can fade content in. Content is never hidden when
 * JavaScript is unavailable (the reveal styles only apply under `html.js`),
 * and animation is skipped entirely for visitors who prefer reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Fraction of the element that must be visible (default 0.15). */
  threshold?: number;
  /** Extra delay in ms before the element becomes visible. */
  delay?: number;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    if (options?.delay) {
      element.style.setProperty("--reveal-delay", `${options.delay}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.delay]);

  return ref;
}

/** Tracks whether the page has scrolled past a threshold (for sticky UI). */
export function useScrolledPast(offset = 24) {
  const ref = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const passed = window.scrollY > offset;
      if (passed !== ref.current) {
        ref.current = passed;
        elementRef.current?.classList.toggle("is-stuck", passed);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return elementRef;
}

/** Locks body scroll while a drawer or modal is open. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}
