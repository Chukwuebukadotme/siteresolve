# SiteResolve website

The public marketing website for SiteResolve, built in the **Record** layout chosen from the design
exploration in [`design/`](design/). It uses the SiteResolve design system's colours, type and spacing.

Plain HTML, CSS and JavaScript. No framework and no runtime dependencies. A small Node script
assembles the pages from shared partials.

## Quick start

Requires Node 18 or later. There is nothing to install.

```sh
npm run dev      # build to dist/ and serve it at http://localhost:4173
npm run build    # build only
npm run check    # build, then check content rules, links, anchors, labels and alt text
```

Deploy the `dist/` folder to any static host. `vercel.json` is included for Vercel
(build command `npm run build`, output `dist`, clean URLs).

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `product.html` | Product |
| `solutions.html` | Solutions (sections: `#construction`, `#property-management`, `#facilities-management`, `#maintenance`, `#inspections`) |
| `pricing.html` | Pricing |
| `about.html` | About |
| `contact.html` | Contact (`?reason=pricing` preselects the reason) |
| `careers.html` | Careers |
| `privacy.html`, `cookies.html`, `terms.html` | Legal drafts |
| `waitlist-confirmation.html` | Shown after a successful waitlist sign-up (not indexed) |
| `404.html` | Not found page, works at any path (not indexed) |

## Project layout

```
src/
  pages/            one file per page, starting with an @meta comment (title, description, nav)
  partials/         layout, header, footer, overlays and shared mock-ups
  assets/css/       styles.css (design tokens at the top)
  assets/js/        config.js (edit before launch) and main.js (behaviour)
  assets/fonts/     self-hosted Inter (SIL Open Font License)
  assets/img/       logo and icons
  site.config.json  site URL and draft-notice switch
scripts/
  build.mjs         builds src/ into dist/; --check runs the content and link checks
  icons.mjs         icon paths used by {{icon:name}}
  serve.mjs         local preview server
emails/             waitlist confirmation email (HTML and plain text)
design/             the three-layout design exploration
```

Template syntax in pages and partials: `{{> partial}}`, `{{icon:name}}`, `{{base}}` and `{{year}}`.
Text in square brackets such as `[LEGAL ENTITY NAME]` is highlighted automatically so unfinished values
stay visible.

## Forms

The waitlist (panel on every page, and the form at the foot of the home page), contact and careers forms
validate in the browser with the messages from the content brief, then POST JSON to the endpoints set in
`src/assets/js/config.js`.

- A form whose endpoint is empty runs in **preview mode**. It simulates success after a short delay,
  sends nothing and logs a notice in the browser console. Waitlist duplicates are detected in the
  browser so the duplicate message can be reviewed.
- Endpoints should return a 2xx status on success and `409` when a waitlist email already exists.
- Each payload includes the consent wording shown to the person, the page and a timestamp, to support
  consent records.
- Each form has a hidden honeypot field (`website`). Submissions that fill it are dropped quietly.

## Cookies and analytics

No analytics or other optional technology is included. Consent choices are stored in `localStorage`
under `sr-consent`, which is strictly necessary for remembering the choice. To add analytics, set
`loadAnalytics` in `config.js` to a function that loads the script. It runs only after the visitor has
accepted analytics, and a `sr:consent` event fires on the document whenever consent is applied.
Complete the cookie table in `src/pages/cookies.html` from a scan of the finished site.

## Before launch

1. Replace every bracketed placeholder in `src/` (search for `[`). They cover the legal entity, addresses,
   contact emails, processors, retention periods, lawful bases, effective date and final domain.
2. Have the Privacy Policy, Cookie Policy and Terms of Use reviewed.
3. Confirm the supported export formats on the Product page.
4. Set the form endpoints and `contactEmail` in `src/assets/js/config.js`.
5. Set `siteUrl` in `src/site.config.json` to add canonical URLs and generate `sitemap.xml`.
6. Set `showDraftNotices` to `false` to remove the draft banners and `[CONFIRM ...]` notes.
7. Run `npm run check`.
