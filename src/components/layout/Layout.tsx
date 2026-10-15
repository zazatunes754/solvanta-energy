import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { site } from "../../config/site";

/** Scrolls to the top on route change (unless the URL targets an anchor). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!site.features.backToTop) return null;

  return (
    <button
      type="button"
      className={`to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp aria-hidden="true" />
      Back to top
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
