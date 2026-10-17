# Contact form delivery — client setup guide

The enquiry form on `/contact` validates every field in the browser and then
delivers the enquiry **only through whatever you configure below**. Right now
no delivery destination is configured, so the form honestly tells visitors that
nothing has been sent and offers a copy-and-send fallback. **This is the one
remaining launch blocker for the website** — a real business must be able to
receive enquiries.

Nothing on this page requires a code change elsewhere: everything is
configured in one file, `src/config/site.ts`.

---

## Step 1 — Set the public contact email (minimum)

In `src/config/site.ts`, find the `contact` block and set:

```ts
contact: {
  email: "hello@yourdomain.com.au",
  phone: "+61312345678",        // E.164 format, no spaces
  phoneDisplay: "(03) 1234 5678", // how it appears on screen
  ...
}
```

What this changes immediately:

- The header, footer and contact page display the phone/email (empty fields are
  hidden automatically, so nothing fake ever shows).
- The form's fallback switches from "copy your details" to a pre-filled
  `mailto:` email draft. The visitor still presses send in their own mail app —
  no data is transmitted by the website itself.

Limitation of email-only delivery: the enquiry opens in the visitor's mail app,
so some visitors on shared or webmail-only devices will not complete the step.

## Step 2 — Connect automated delivery (recommended)

To receive enquiries directly, point `contact.endpoint` at a form-handling
service. Options that work well on a static GitHub Pages site:

| Service | Notes |
| --- | --- |
| Formspree | Free tier, spam filtering and email delivery included |
| Basin | Simple, paid, reliable |
| Netlify Forms | Only if the site later moves to Netlify hosting |
| Your own API | Any endpoint that accepts a JSON `POST` |

```ts
contact: {
  ...
  endpoint: "https://formspree.io/f/yourFormId",
}
```

Rules that already apply in the code:

- The endpoint receives a JSON `POST` with the form fields plus `submittedAt`
  and `source: "website-enquiry-form"`.
- `contact.endpointHeaders` can carry extra headers — **never put API keys or
  secrets there**; this file ships to the visitor's browser.
- The form disables double submission while sending, and on failure it says so
  plainly and falls back to the email draft — it never fakes a success.
- Keep the provider's spam protection (Formspree's is on by default; add a
  honeypot/reCAPTCHA in the provider dashboard if volumes justify it).

After deploying, update the privacy page sentence that describes how enquiries
are delivered (`src/pages/Privacy.tsx`) if the wording no longer matches the
configured provider — the page currently describes the no-endpoint behaviour
accurately, and it must keep doing so.

## Step 3 — Verify before launch

1. **Success path:** submit a real test enquiry through the live site and
   confirm it arrives in the business inbox (or provider dashboard).
2. **Failure path:** temporarily set the endpoint to an invalid URL, deploy,
   submit, and confirm the site shows the honest "could not be delivered"
   message with the fallback options.
3. **Duplicate check:** press the submit button rapidly — the form must not
   send twice (the button is disabled while sending).
4. **Privacy wording:** confirm the privacy page and the small print under the
   form describe the actual delivery path.
5. Re-check spam filtering after the first week of real traffic.

## What not to do

- Do not paste a provider API key or secret into `site.ts` — it is public
  front-end code.
- Do not point the form at a personal inbox scraper or an unencrypted
  endpoint; use HTTPS form handlers only.
- Do not leave the "no endpoint" state live for a real launch: visitors cannot
  complete an enquiry without either an endpoint or a public email.
