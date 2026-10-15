import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { hasContactEmail, site } from "../../config/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "../ui/SocialIcons";
import { Wordmark } from "../ui/Logo";

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
} as const;

export function Footer() {
  const social = Object.entries(site.social).filter(([, url]) => url.length > 0) as [
    keyof typeof socialIcons,
    string,
  ][];

  const addressLines = [
    site.contact.address.street,
    [site.contact.address.suburb, site.contact.address.state, site.contact.address.postcode]
      .filter(Boolean)
      .join(" "),
  ].filter(Boolean);

  return (
    <footer className="site-footer on-deep">
      <div className="container">
        <div className="footer__top">
          <div>
            <Wordmark className="brand--deep" />
            <p className="footer__blurb">
              {site.brand.positioning} {site.brand.tagline}
            </p>
          </div>

          <div className="footer__columns">
            {site.footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="footer__col-title">{group.title}</h2>
                <ul className="footer__links">
                  {group.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          <span>{site.brand.wordmarkPrimary}</span>
        </div>

        <div className="footer__bottom">
          <div className="stack" style={{ gap: "0.4rem" }}>
            <ul className="info-list" style={{ gap: "0.4rem" }}>
              {hasContactEmail() && (
                <li style={{ border: 0, padding: 0, gap: "0.6rem" }}>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
              )}
              {site.contact.phoneDisplay && (
                <li style={{ border: 0, padding: 0, gap: "0.6rem" }}>
                  <Phone aria-hidden="true" />
                  <a href={`tel:${site.contact.phoneDisplay.replace(/\s+/g, "")}`}>
                    {site.contact.phoneDisplay}
                  </a>
                </li>
              )}
              {addressLines.length > 0 && (
                <li style={{ border: 0, padding: 0, gap: "0.6rem" }}>
                  <MapPin aria-hidden="true" />
                  <span>{addressLines.join(", ")}</span>
                </li>
              )}
            </ul>
            <p style={{ fontSize: "0.84rem" }}>
              Coverage: {site.coverage.regions.join(", ")}. {site.coverage.note}
            </p>
          </div>

          {social.length > 0 && (
            <div className="footer__social">
              {social.map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                    <Icon size={17} aria-hidden="true" />
                    <span className="visually-hidden">
                      {site.brand.name} on {key}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <ul className="footer__legal">
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {site.brand.name}. Incentive information is verified
            against official sources and dated on the rebates page.
          </p>
        </div>

        <p className="note-inline" style={{ paddingBottom: "var(--space-6)" }}>
          {site.brand.name} is an independent energy advisory and installation business. We are not
          affiliated with, endorsed by or acting on behalf of any government agency, and we do not
          determine eligibility for any government program. Estimates on this site are indicative
          and based on the assumptions published with them.
        </p>
      </div>
    </footer>
  );
}
