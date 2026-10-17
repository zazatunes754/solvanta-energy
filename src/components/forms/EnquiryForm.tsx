import { useMemo, useState, type FormEvent } from "react";
import { CircleCheck, Copy, Mail, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { hasContactEmail, hasDeliveryEndpoint, site } from "../../config/site";
import { Button } from "../ui/Button";
import { ChipGroup, Field, TextArea, TextInput } from "../ui/Field";

export type EnquiryValues = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  propertyType: string;
  existingSolar: string;
  interest: string;
  bill: string;
  message: string;
  context: string;
};

const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  phone: "",
  postcode: "",
  propertyType: "residential",
  existingSolar: "no",
  interest: "solar-and-battery",
  bill: "",
  message: "",
  context: "",
};

type Errors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: EnquiryValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name so we know who to reply to.";
  }

  if (!values.email.trim()) {
    errors.email = "We need an email address to send the written proposal to.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look complete — check for a typo.";
  }

  if (values.phone.trim()) {
    const digits = values.phone.replace(/[^0-9]/g, "");
    if (digits.length < 8 || digits.length > 12) {
      errors.phone = "Please enter a contactable phone number, or leave the field empty.";
    }
  }

  if (!/^\d{4}$/.test(values.postcode.trim())) {
    errors.postcode = "Please enter a four-digit Australian postcode.";
  }

  if (values.bill.trim()) {
    const bill = Number(values.bill);
    if (Number.isNaN(bill) || bill < 0 || bill > 20000) {
      errors.bill = "Enter your quarterly bill in dollars, for example 650. Leave empty if unsure.";
    }
  }

  return errors;
}

function buildSummary(values: EnquiryValues) {
  const interestLabels: Record<string, string> = {
    solar: "Solar panels",
    battery: "Home battery",
    "solar-and-battery": "Solar and battery",
    "existing-system": "Review of an existing system",
  };
  const propertyLabels: Record<string, string> = {
    residential: "Home (residential)",
    commercial: "Small business",
  };
  const solarLabels: Record<string, string> = {
    no: "No solar installed yet",
    yes: "Solar already installed",
    unsure: "Not sure",
  };

  return [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "Not provided"],
    ["Postcode", values.postcode],
    ["Property", propertyLabels[values.propertyType] ?? values.propertyType],
    ["Existing solar", solarLabels[values.existingSolar] ?? values.existingSolar],
    ["Interested in", interestLabels[values.interest] ?? values.interest],
    ["Quarterly bill", values.bill ? `$${values.bill}` : "Not provided"],
    ["Notes", values.message || "None"],
    ["From estimator", values.context || "No"],
  ].filter(([, value]) => value !== "");
}

function buildEmailBody(values: EnquiryValues) {
  return [
    "New enquiry from the Solvanta Energy website",
    "",
    ...buildSummary(values).map(([label, value]) => `${label}: ${value}`),
    "",
    "Sent from the website enquiry form.",
  ].join("\n");
}

export function EnquiryForm({
  prefill,
  compact = false,
}: {
  prefill?: Partial<EnquiryValues>;
  compact?: boolean;
}) {
  const initial = useMemo(() => ({ ...emptyEnquiry, ...prefill }), [prefill]);

  const [values, setValues] = useState<EnquiryValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (key: keyof EnquiryValues) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const summary = buildSummary(values);
  const mailtoHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
    `Assessment request — ${values.name || "website enquiry"}${
      values.postcode ? ` (${values.postcode})` : ""
    }`,
  )}&body=${encodeURIComponent(buildEmailBody(values))}`;

  const copySummary = async () => {
    const text = buildSummary(values)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      setCopied(false);
      setStatusMessage(
        "Your browser blocked clipboard access. You can select the details above and copy them manually.",
      );
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.focus();
      setStatus("idle");
      return;
    }

    if (hasDeliveryEndpoint()) {
      setStatus("sending");
      try {
        const response = await fetch(site.contact.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...site.contact.endpointHeaders },
          body: JSON.stringify({
            ...values,
            submittedAt: new Date().toISOString(),
            source: "website-enquiry-form",
          }),
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        setStatus("sent");
        setValues({ ...emptyEnquiry });
      } catch {
        setStatus("error");
        setStatusMessage(
          "The enquiry could not be delivered through the configured service. Please use the email option below, or try again shortly.",
        );
      }
      return;
    }

    // No delivery endpoint configured — fall back to an honest email draft.
    setStatus("mailto");
  };

  const finished = status === "sent" || status === "mailto" || status === "error";

  return (
    <div className="stack">
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form-grid">
          <Field id="name" label="Your name" required error={errors.name}>
            <TextInput
              id="name"
              value={values.name}
              onChange={set("name")}
              autoComplete="name"
              error={errors.name}
              placeholder="e.g. Alex Nguyen"
            />
          </Field>

          <Field id="email" label="Email" required error={errors.email}>
            <TextInput
              id="email"
              type="email"
              value={values.email}
              onChange={set("email")}
              autoComplete="email"
              inputMode="email"
              error={errors.email}
              placeholder="you@example.com"
            />
          </Field>

          <Field
            id="phone"
            label="Phone"
            error={errors.phone}
            hint="Optional — helpful if a quick question would save a back-and-forth."
          >
            <TextInput
              id="phone"
              type="tel"
              value={values.phone}
              onChange={set("phone")}
              autoComplete="tel"
              inputMode="tel"
              error={errors.phone}
              placeholder="04xx xxx xxx"
            />
          </Field>

          <Field id="postcode" label="Postcode" required error={errors.postcode}>
            <TextInput
              id="postcode"
              value={values.postcode}
              onChange={set("postcode")}
              autoComplete="postal-code"
              inputMode="numeric"
              error={errors.postcode}
              placeholder="3000"
            />
          </Field>
        </div>

        <ChipGroup
          name="propertyType"
          legend="Property type"
          value={values.propertyType}
          onChange={set("propertyType")}
          options={[
            { value: "residential", label: "Home" },
            { value: "commercial", label: "Small business" },
          ]}
        />

        <ChipGroup
          name="existingSolar"
          legend="Do you already have solar panels?"
          value={values.existingSolar}
          onChange={set("existingSolar")}
          options={[
            { value: "no", label: "No solar yet" },
            { value: "yes", label: "Yes, solar installed" },
            { value: "unsure", label: "Not sure" },
          ]}
        />

        <ChipGroup
          name="interest"
          legend="What are you interested in?"
          value={values.interest}
          onChange={set("interest")}
          options={[
            { value: "solar", label: "Solar panels" },
            { value: "battery", label: "Home battery" },
            { value: "solar-and-battery", label: "Both" },
            { value: "existing-system", label: "Review existing system" },
          ]}
          tone="lime"
        />

        <div className="form-grid">
          <Field
            id="bill"
            label="Average quarterly bill"
            error={errors.bill}
            hint="Australian dollars. An approximate figure is fine, and you can leave it blank."
          >
            <div className="field__prefix">
              <span aria-hidden="true">$</span>
              <TextInput
                id="bill"
                value={values.bill}
                onChange={set("bill")}
                inputMode="decimal"
                error={errors.bill}
                placeholder="650"
              />
            </div>
          </Field>

          <Field
            id="message"
            label="Anything else we should know?"
            hint="Roof type, shading, planned electric vehicle or heat pump, strata or heritage constraints."
          >
            <TextArea
              id="message"
              value={values.message}
              onChange={set("message")}
              rows={compact ? 3 : 4}
              placeholder="Tell us about your property and what you are trying to achieve."
            />
          </Field>
        </div>

        <div className="btn-row">
          <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send my enquiry"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setValues(emptyEnquiry);
              setErrors({});
              setStatus("idle");
            }}
          >
            Clear form
          </Button>
        </div>

        <p className="note-inline">
          We use your details only to respond to this enquiry. Read the{" "}
          <Link to="/privacy" style={{ textDecoration: "underline" }}>
            privacy page
          </Link>{" "}
          for exactly what is collected and where it goes.
        </p>
      </form>

      {finished && (
        <div
          className={`form-status ${status === "error" ? "form-status--error" : "form-status--success"}`}
          role="status"
          aria-live="polite"
        >
          <div className="form-status__head">
            {status === "error" ? (
              <TriangleAlert className="form-status__icon" aria-hidden="true" />
            ) : (
              <CircleCheck className="form-status__icon" aria-hidden="true" />
            )}
            <div>
              <h3>
                {status === "sent"
                  ? "Enquiry delivered"
                  : status === "mailto"
                    ? hasContactEmail()
                      ? "One step left: send the email draft"
                      : "Nothing has been sent yet"
                    : "We could not deliver the enquiry"}
              </h3>

              {status === "sent" && (
                <p>
                  Thank you — your enquiry has been delivered to the configured enquiry service.
                  We will be in touch to arrange an assessment.
                </p>
              )}

              {status === "mailto" && (
                <p>
                  {hasContactEmail()
                    ? "This website is not connected to an automated enquiry inbox, so nothing has been sent yet. Choose the button below to open a pre-filled email draft in your mail app, then press send. Your details stay in your own email client."
                    : "This website does not yet have a delivery endpoint or a public email address configured, so nothing has been sent. You can copy your details below and send them to the business directly once contact details are available."}
                </p>
              )}

              {status === "error" && <p>{statusMessage}</p>}

              <div className="btn-row" style={{ marginTop: "var(--space-4)" }}>
                {status !== "sent" && hasContactEmail() && (
                  <Button href={mailtoHref} variant="dark">
                    Open email draft
                  </Button>
                )}
                <Button variant="ghost" onClick={copySummary}>
                  <Copy size={16} aria-hidden="true" style={{ marginRight: "0.5rem" }} />
                  {copied ? "Details copied" : "Copy my details"}
                </Button>
              </div>

              {!hasDeliveryEndpoint() && !hasContactEmail() && (
                <p className="note-inline" style={{ marginTop: "var(--space-3)" }}>
                  <Mail size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Site
                  owner: add a delivery endpoint or email address in{" "}
                  <code>src/config/site.ts</code> to enable enquiry delivery.
                </p>
              )}
            </div>
          </div>

          <div className="enquiry-summary">
            <dl>
              {summary.map(([label, value]) => (
                <div key={label} style={{ display: "contents" }}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
