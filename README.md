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

The header compacts on desktop scroll and expands on hover or keyboard focus. Project and footer service links preselect the matching inquiry topic.

## Checks

```sh
npm run typecheck
npm run build
```

After building, use `npm start` to preview the production build.

## Current content limits

The inquiry form previews and copies a draft in the browser; it needs an inbox or endpoint to collect submissions. No backend or hosting integration was added.

The own-product SaaS section is inactive, with its demo source retained for future use. It is absent from the rendered homepage, navigation, inquiry options, and metadata. Custom SaaS development remains a client service.
