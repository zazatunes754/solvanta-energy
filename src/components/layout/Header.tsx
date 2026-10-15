import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Info, Mail, Menu, Phone, X } from "lucide-react";
import { hasContactEmail, site } from "../../config/site";
import { useBodyScrollLock, useScrolledPast } from "../../hooks/useReveal";
import { Wordmark } from "../ui/Logo";

function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("solvanta-announcement-dismissed");
    setDismissed(stored === "1");
  }, []);

  if (!site.features.announcement || dismissed) return null;

  return (
    <div className="announce">
      <div className="container announce__inner">
        <span className="announce__label">
          <Info size={13} aria-hidden="true" />
          {site.announcement.label}
        </span>
        <span className="announce__text">{site.announcement.text}</span>
        <Link className="announce__link" to={site.announcement.to}>
          {site.announcement.linkLabel}
        </Link>
        <button
          type="button"
          className="announce__close"
          onClick={() => {
            window.sessionStorage.setItem("solvanta-announcement-dismissed", "1");
            setDismissed(true);
          }}
        >
          <X size={16} aria-hidden="true" />
          <span className="visually-hidden">Dismiss announcement</span>
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useScrolledPast(12);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(menuOpen);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Escape closes the drawer, and focus returns to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar />
      <header className="site-header" ref={headerRef as React.RefObject<HTMLElement>}>
        <div className="container site-header__inner">
          <Link to="/" aria-label={`${site.brand.name} home`}>
            <Wordmark />
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className="site-nav__link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            {site.contact.phoneDisplay && (
              <a className="header-phone" href={`tel:${site.contact.phoneDisplay.replace(/\s+/g, "")}`}>
                <Phone aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
            )}
            <Link to="/contact" className="btn btn--primary btn--sm">
              Request an assessment
              <ArrowRight className="btn__icon" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            ref={toggleRef}
          >
            <Menu aria-hidden="true" />
            Menu
          </button>
        </div>
      </header>

      <div
        className={`drawer on-deep ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        ref={drawerRef}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="drawer__top">
          <Link to="/" aria-label={`${site.brand.name} home`}>
            <Wordmark className="brand--deep" />
          </Link>
          <button
            type="button"
            className="drawer__close"
            onClick={() => {
              setMenuOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <X aria-hidden="true" />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>

        <div className="drawer__body">
          <nav className="drawer__nav" aria-label="Mobile">
            {site.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className="drawer__link">
                {item.label}
                <ArrowRight aria-hidden="true" />
              </NavLink>
            ))}
            <NavLink to="/faq" className="drawer__link">
              FAQs
              <ArrowRight aria-hidden="true" />
            </NavLink>
            <NavLink to="/contact" className="drawer__link">
              Contact
              <ArrowRight aria-hidden="true" />
            </NavLink>
          </nav>

          <Link to="/contact" className="btn btn--primary btn--lg btn--block">
            Request an assessment
            <ArrowRight className="btn__icon" aria-hidden="true" />
          </Link>

          <div className="drawer__meta">
            {site.contact.phoneDisplay && (
              <a href={`tel:${site.contact.phoneDisplay.replace(/\s+/g, "")}`}>
                <Phone size={15} aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 8 }} />
                {site.contact.phoneDisplay}
              </a>
            )}
            {hasContactEmail() && (
              <a href={`mailto:${site.contact.email}`}>
                <Mail size={15} aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 8 }} />
                {site.contact.email}
              </a>
            )}
            <p>{site.coverage.note}</p>
          </div>
        </div>
      </div>
    </>
  );
}
