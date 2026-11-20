# Axonrift website

A Next.js App Router and TypeScript marketing homepage with the original Axonrift wordmark, locally bundled Inter Tight font, and a graphite/cyan palette.

## Local development

Open the `axonrift` folder containing `package.json`. Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If PowerShell blocks `npm.ps1`, use `npm.cmd` or a Command Prompt terminal.

## Content and design

The homepage flows through the interactive hero, point of view, recent projects, services, testimonials, process, FAQs, contact, and footer.

- Edit `src/content/home.ts` for the headline, point-of-view copy, project cards, testimonials, services, FAQs, and inquiry topics.
- Projects and testimonials are explicitly labeled placeholders. Replace the sample content and adjust its placeholder flags when approved real content is available.
- `src/app/globals.css` holds shared tokens and base styling. `src/app/home-enhancements.css` holds the expanded homepage layouts, interactive field, project artwork, footer, and responsive hover states.
- `src/app/themes.css` defines the dark and light palettes. The header theme switch is available on desktop and mobile, saves the choice locally, and syncs it between tabs. Dark is the first-visit default; a saved preference is applied in the head before the first paint. The switch still works when browser storage is unavailable.
- Hero shapes and project thumbnails are native SVG/CSS artwork. The hand coordinates in `public/graphics/reaching-hands.json` were derived from the supplied point-of-view image; `reaching-hands.svg` provides a static fallback. Neither asset depends on a file outside the project at runtime.

## Motion and interaction

GSAP, ScrollTrigger, and `@gsap/react` handle entrances, object rotation and pointer response, hand assembly, process progress, and FAQ transitions. `PageMotion` owns page-level entrances; interactive components own their local effects.

The hero and hand animations pause outside the viewport and while the document is hidden. Media-query cleanup handles viewport and motion-preference changes. Reduced motion shows a static assembled composition. Server-rendered content, hand artwork, navigation, and native FAQ disclosures remain available without JavaScript.

The header compacts on desktop scroll and expands on hover or keyboard focus. Project and footer service links select the matching inquiry service without clearing other selections. The contact section presents a project brief with numbered sections, selectable service tiles, and rounded fields with smooth focus feedback. Direct email and copying sit beside the form. It supports multiple services and an optional company and budget.

## EmailJS contact form setup

The contact form uses the [official EmailJS REST API](https://www.emailjs.com/docs/rest-api/send/) directly from the browser, so no extra npm package is needed. It sends the name, reply address, company, budget/currency, selected services, and message. While sending, the form prevents duplicate submissions and locks its fields. A successful request clears the form; a failed request keeps the visitor’s details so they can retry.

For the **EmailJS + Gmail + Zoho Mail** setup, connect Gmail as the EmailJS sending service and set the template’s fixed **To Email** to `contact@axonrift.com`. Gmail sends the notification to that Zoho inbox. Keep the template’s **From Email** as the connected Gmail address and its **Reply To** as `{{email}}`, so replying addresses the visitor.

1. Create an account at [EmailJS](https://dashboard.emailjs.com/sign-up). In **Email Services**, connect your email provider, test the connection, and copy its **Service ID**. This is the service that sends the notification; the recipient is set separately in the template.
2. In **Email Templates**, create a template with these settings:

   | Setting | Value |
   | --- | --- |
   | To Email | `contact@axonrift.com` (fixed recipient) |
   | From Name | `{{name}} via Axonrift` |
   | From Email | Keep the connected service’s default address |
   | Reply To | `{{email}}` |
   | Subject | `New Axonrift inquiry from {{name}}` |

   Use this message body, then save the template and copy its **Template ID**:

   ```text
   NEW PROJECT INQUIRY — AXONRIFT

   A potential client has submitted an inquiry through the Axonrift website.

   CONTACT DETAILS
   Name: {{name}}
   Email: {{email}}
   Company: {{company}}

   PROJECT DETAILS
   Services Interested In: {{services}}
   Estimated Budget: {{currency}} {{budget}}

   PROJECT MESSAGE
   {{message}}

   ---
   Submitted through the Axonrift website contact form.
   Reply to this email to contact the potential client.
   ```

   The form sends `name`, `email`, `company`, `services`, `currency`, `budget`, and `message`. Currency and budget are separate values; if no amount is supplied, the budget is `Not specified` and currency is empty. The `from_name` and `reply_to` aliases remain available for existing template header settings.

3. Copy your **Public Key** from the EmailJS account settings. The browser integration uses this public key, not a private key or email password.
4. From the `axonrift` project folder, create your local configuration:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   Fill in `.env.local`:

   ```dotenv
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_your_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_your_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. Restart `npm run dev` after changing these values. For production, set the same three environment variables in your hosting provider and rebuild/redeploy, because Next.js embeds `NEXT_PUBLIC_` values during the build. If you restrict origins in [EmailJS Domains](https://www.emailjs.com/docs/faq/can-i-add-my-domain-to-allowlist/), include your actual local development origin (for example `http://localhost:3000`) and deployed website origin.
6. Submit a test inquiry and confirm it arrives at `contact@axonrift.com`. Replying to that notification should address the visitor. Live delivery cannot be verified until your EmailJS service and template are configured.

`.env.local` stays ignored by Git. Without all three configuration values, the form directs visitors to the contact email instead of claiming the message was sent. The direct email link and mail-app fallback without JavaScript remain available.

## Checks

```sh
npm run typecheck
npm run build
```

After building, use `npm start` to preview the production build.

## Current content limits

The contact form needs your EmailJS configuration to send notifications to `contact@axonrift.com`. EmailJS processes the submitted details through the connected email service; the website does not store submissions in a database.

The own-product SaaS section is inactive, with its demo source retained for future use. It is absent from the rendered homepage, navigation, inquiry options, and metadata. Custom SaaS development remains a client service.
