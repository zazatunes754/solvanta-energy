import { useState } from "react";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { hasContactEmail, hasDeliveryEndpoint, site } from "../config/site";
import { EnquiryForm, type EnquiryValues } from "../components/forms/EnquiryForm";
import { Callout, SectionHeading } from "../components/ui/primitives";
import { useSeo } from "../hooks/useSeo";

const PREFILL_KEY = "solvanta-estimate-prefill";

const readPrefill = (): Partial<EnquiryValues> | undefined => {
  try {
    const raw = window.sessionStorage.getItem(PREFILL_KEY);
    if (!raw) return undefined;
    window.sessionStorage.removeItem(PREFILL_KEY);
    return JSON.parse(raw) as Partial<EnquiryValues>;
  } catch {
    return undefined;
  }
};

export default function Contact() {
  useSeo({
    title: "Contact — request a solar or battery assessment",
    description:
      "Send an enquiry about solar, battery storage or an existing system review. What we ask for, what happens next, and how your details are handled.",
    path: "/contact",
  });

  const [prefill] = useState<Partial<EnquiryValues> | undefined>(readPrefill);

  const addressLines = [
    site.contact.address.street,
    [site.contact.address.suburb, site.contact.address.state, site.contact.address.postcode]
      .filter(Boolean)
      .join(" "),
  ].filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Contact</p>
          <h1>Start with what you know and what you want to change.</h1>
          <p className="lede">
            A short enquiry is enough to begin. If you have a recent bill and a photo of your
            switchboard, that speeds everything up — but neither is required for a first
            conversation.
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="prepare-title">
        <div className="container">
          <SectionHeading
            eyebrow="Preparing your enquiry"
            title={<span id="prepare-title">What makes a first response accurate.</span>}
            lede="You do not need any of this to get in touch — a rough description is enough to start. But the more of it you can share, the closer the first conversation gets to a real design."
          />
          <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-block">
              <h3>Your approximate consumption</h3>
              <p>
                A recent bill is ideal — the quarterly dollar figure is enough. If you know your
                annual kilowatt hours from a bill or an app, even better: sizing decisions are made
                in kilowatt hours, not dollars.
              </p>
            </div>
            <div className="value-block">
              <h3>Your roof, in plain words</h3>
              <p>
                Tiles or metal, roughly how much of it is in sun through the day, and anything that
                shades it — trees, neighbouring buildings, chimneys. A phone photo from ground level
                answers most of this at once.
              </p>
            </div>
            <div className="value-block">
              <h3>Existing equipment</h3>
              <p>
                An older solar array, the inverter's make and model, a battery, an EV charger, a
                heat pump. Photos of the switchboard and any existing inverter label are the single
                most useful attachments.
              </p>
            </div>
            <div className="value-block">
              <h3>What you want to change</h3>
              <p>
                Lower bills, protection from outages, readiness for an electric car, or simply
                knowing whether the roof is suitable. The goal shapes which design questions get
                asked first.
              </p>
            </div>
            <div className="value-block">
              <h3>Plans for the next few years</h3>
              <p>
                An EV, a pool, a heat pump, a renovation, a move. Systems sized around future loads
                are cheaper to extend later than systems that have to be replaced.
              </p>
            </div>
            <div className="value-block">
              <h3>Your location and network</h3>
              <p>
                A postcode or suburb is enough. It determines your weather zone, tariffs, network
                connection rules and which state or territory programs may apply.
              </p>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: "var(--space-6)", gap: "var(--space-6)" }}>
            <Callout title="Every field is optional. Nothing sensitive is needed." tone="info">
              <p>
                A first enquiry needs a name, a way to reach you and roughly where you are. Consumption
                figures, roof photos and equipment details simply sharpen the response — send them if
                and when you are comfortable. A quote request never requires electricity account
                numbers, passwords or payment details, and no legitimate business needs your banking
                credentials to prepare one.
              </p>
            </Callout>
            <Callout title="Coming from the estimator?" tone="default">
              <p>
                Your inputs and the modelled results are carried into the form automatically — adjust
                anything that looks off. It also helps to say what you thought of the numbers: too
                optimistic, too conservative, or matching your own experience of the bills.
              </p>
            </Callout>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-form-title">
        <div className="container">
          {prefill && (
            <div style={{ marginBottom: "var(--space-6)" }}>
              <Callout title="Your estimator details have been added" tone="info">
                <p>
                  We have pre-filled the form with the inputs from your estimate, including the
                  modelled saving in the notes. Adjust anything that has changed.
                </p>
              </Callout>
            </div>
          )}

          <div className="contact-layout">
            <div>
              <SectionHeading
                eyebrow="Enquiry"
                title={<span id="contact-form-title">Tell us about your property</span>}
                lede="Only the fields marked required are needed. Everything else simply helps us give you a more accurate first response."
              />
              <div style={{ marginTop: "var(--space-6)" }}>
                <EnquiryForm prefill={prefill} />
              </div>
            </div>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="panel">
                <h2 style={{ fontSize: "var(--step-2)" }}>Contact details</h2>
                {hasContactEmail() || site.contact.phoneDisplay || addressLines.length > 0 ? (
                  <ul className="info-list" style={{ marginTop: "var(--space-4)" }}>
                    {hasContactEmail() && (
                      <li>
                        <Mail aria-hidden="true" />
                        <div>
                          <h3>Email</h3>
                          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                        </div>
                      </li>
                    )}
                    {site.contact.phoneDisplay && (
                      <li>
                        <Phone aria-hidden="true" />
                        <div>
                          <h3>Phone</h3>
                          <a href={`tel:${site.contact.phoneDisplay.replace(/\s+/g, "")}`}>
                            {site.contact.phoneDisplay}
                          </a>
                          {site.contact.hours && <p className="note-inline">{site.contact.hours}</p>}
                        </div>
                      </li>
                    )}
                    {addressLines.length > 0 && (
                      <li>
                        <MapPin aria-hidden="true" />
                        <div>
                          <h3>Office</h3>
                          <p>{addressLines.join(", ")}</p>
                          {site.contact.mapUrl && (
                            <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer">
                              View on a map
                            </a>
                          )}
                        </div>
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
                    Public phone, email and office details have not been configured yet. They are set
                    in <code>src/config/site.ts</code> and will appear here automatically once added —
                    we do not publish placeholder contact details.
                  </p>
                )}
              </div>

              <div className="panel panel--flat">
                <h2 style={{ fontSize: "var(--step-2)" }}>Coverage</h2>
                <p style={{ marginTop: "var(--space-3)" }}>
                  Enquiries are welcome from {site.coverage.regions.join(", ")}.
                </p>
                {site.coverage.hubs.length > 0 && (
                  <p className="note-inline" style={{ marginTop: "var(--space-2)" }}>
                    Local hubs: {site.coverage.hubs.join(", ")}.
                  </p>
                )}
                <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
                  {site.coverage.note}
                </p>
              </div>

              <div className="panel panel--flat">
                <div className="pill-row" style={{ marginBottom: "var(--space-3)" }}>
                  <Clock size={18} aria-hidden="true" />
                  <h2 style={{ fontSize: "var(--step-2)" }}>What happens next</h2>
                </div>
                <ol className="steps-vertical">
                  <li>
                    <div>
                      <h3>We read it properly</h3>
                      <p>
                        Your enquiry is reviewed against your postcode, property type and stated
                        goal — not dropped into an automatic sequence.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>A first response with real questions</h3>
                      <p>
                        Expect a reply that either answers your question directly or asks for the one
                        or two details needed to answer it well.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>An assessment, then a design</h3>
                      <p>
                        If it looks like a fit, we arrange a proper assessment of consumption, roof
                        and switchboard before proposing a system.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="panel panel--flat">
                <div className="pill-row" style={{ marginBottom: "var(--space-3)" }}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <h2 style={{ fontSize: "var(--step-2)" }}>How your details are handled</h2>
                </div>
                <p className="note-inline">
                  {hasDeliveryEndpoint()
                    ? "Your enquiry is submitted to the enquiry service configured for this site."
                    : hasContactEmail()
                      ? "No automated enquiry inbox is connected to this site. Your details stay in your browser until you choose to send the pre-filled email draft."
                      : "No automated enquiry inbox or public email address is configured yet. Nothing is transmitted anywhere unless you choose to copy your details."}
                </p>
                <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
                  We do not use tracking pixels or third-party analytics scripts on this site. Read
                  the <a href="/privacy" style={{ textDecoration: "underline" }}>privacy page</a> for
                  the full description.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
