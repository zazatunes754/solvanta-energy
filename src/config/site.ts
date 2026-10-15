/**
 * ---------------------------------------------------------------------------
 * SOLVANTA ENERGY — CENTRAL BUSINESS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Everything a business owner is likely to change lives here. Edit this file
 * (and the data files in `src/data/`) and the whole site updates.
 *
 * IMPORTANT — TRUTHFUL CONTENT POLICY
 * Nothing in this configuration should be invented. Fields left empty are
 * hidden gracefully in the interface (no fake phone numbers, addresses,
 * ratings, certifications or statistics anywhere on the site).
 * ---------------------------------------------------------------------------
 */

export const site = {
  /** Brand ---------------------------------------------------------------- */
  brand: {
    name: "Solvanta Energy",
    shortName: "Solvanta",
    wordmarkPrimary: "SOLVANTA",
    wordmarkSecondary: "ENERGY",
    tagline: "Smarter Solar. Greater Independence.",
    /** Short line used in the footer and social previews. */
    positioning:
      "Solar, battery and hybrid energy systems for Australian homes and businesses — designed around how you actually use power.",
  },

  /** Canonical public URL of the deployed site (no trailing slash).         */
  url: "https://www.solvanta.example",

  /** Locale / region ------------------------------------------------------ */
  locale: "en-AU",
  country: "Australia",

  /** Contact --------------------------------------------------------------
   * Leave a field as an empty string ("") until the real detail exists.
   * The interface hides anything that is empty.
   */
  contact: {
    email: "",
    phone: "",
    /** Display version of the phone number, e.g. "1300 000 000". */
    phoneDisplay: "",
    /** Business hours line, optional. */
    hours: "",
    /** Structured address parts — leave empty if there is no public address. */
    address: {
      street: "",
      suburb: "",
      state: "",
      postcode: "",
    },
    /** Optional map link (Google Maps or similar) — only if a real location exists. */
    mapUrl: "",
    /**
     * Enquiry delivery.
     * -----------------------------------------------------------------------
     * `endpoint` — a form-handling URL (e.g. Formspree, Basin, Netlify Forms,
     * your own API). When set, the enquiry form POSTs JSON to it.
     * `email`    — used for the mailto fallback when no endpoint is set.
     * Never put API keys or secrets in this file: anything here ships to the
     * browser.
     */
    endpoint: "",
    /** Optional extra headers for the POST (never secrets). */
    endpointHeaders: {} as Record<string, string>,
  },

  /** Service coverage -----------------------------------------------------
   * `regions` powers the coverage list, `note` sets expectations honestly.
   */
  coverage: {
    regions: ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"],
    note: "Coverage depends on our accredited installer network and local requirements. Send your postcode and we will confirm availability before anything is booked.",
    /** Optional list of specific metro/regional hubs, e.g. ["Melbourne", "Geelong"]. */
    hubs: [] as string[],
  },

  /** Social profiles — only add real, owned profiles. Empty = hidden. ----- */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },

  /** Legal / compliance --------------------------------------------------- */
  legal: {
    /** Shown on privacy, terms and accessibility pages. */
    entityName: "Solvanta Energy (trading name — update before launch)",
    jurisdiction: "Victoria, Australia",
    /** Format the date the legal copy was written. */
    lastUpdated: "2026-10",
  },

  /** Company details ------------------------------------------------------
   * Leave any field empty and it is hidden in the interface. These are the
   * details that must never be invented — add them once verified.
   */
  company: {
    foundedYear: "",
    abn: "",
    /** Electrical contractor licences, accreditation numbers, memberships. */
    licenceNumbers: [] as string[],
    /** Optional short line about the team; hidden while empty. */
    teamIntro: "",
  },

  /** Feature flags -------------------------------------------------------- */
  features: {
    /** Announcement strip above the header. */
    announcement: true,
    /** Back-to-top button after scrolling. */
    backToTop: true,
    /** Gallery lightbox viewer. */
    lightbox: true,
  },

  /** Navigation ----------------------------------------------------------- */
  nav: [
    { label: "Solar & storage", to: "/services" },
    { label: "Rebates & incentives", to: "/solar-rebates" },
    { label: "Savings estimator", to: "/solar-estimator" },
    { label: "Solutions gallery", to: "/solutions" },
    { label: "Knowledge hub", to: "/knowledge-hub" },
    { label: "About", to: "/about" },
  ],

  /** Footer link groups --------------------------------------------------- */
  footerGroups: [
    {
      title: "Explore",
      links: [
        { label: "Solar & storage services", to: "/services" },
        { label: "Rebates & incentives", to: "/solar-rebates" },
        { label: "Savings estimator", to: "/solar-estimator" },
        { label: "Solutions gallery", to: "/solutions" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Knowledge hub", to: "/knowledge-hub" },
        { label: "Frequently asked questions", to: "/faq" },
        { label: "How solar batteries work", to: "/knowledge-hub/how-solar-batteries-work" },
        { label: "Choosing an installer", to: "/knowledge-hub/questions-to-ask-an-installer" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Solvanta", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Accessibility", to: "/accessibility" },
      ],
    },
  ] as { title: string; links: { label: string; to: string }[] }[],

  /** Announcement strip content ------------------------------------------- */
  announcement: {
    label: "Incentives",
    text: "Federal battery incentives changed on 1 May 2026 — STC discounts now taper by battery size.",
    linkLabel: "See what changed",
    to: "/solar-rebates",
  },
};

export type SiteConfig = typeof site;

/** Convenience: true when the business has a public email address configured. */
export const hasContactEmail = () => site.contact.email.trim().length > 0;
/** True when a real enquiry delivery endpoint is configured. */
export const hasDeliveryEndpoint = () => site.contact.endpoint.trim().length > 0;
