# SiteResolve website

The public marketing website for SiteResolve, in the **Record** layout chosen from the design exploration
in [`design/`](design/). Built with Next.js (App Router), React, TypeScript and Tailwind CSS, using the
SiteResolve design system's colours, type and spacing.

## Quick start

Requires Node 20.9 or later.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run check      # content rules (no em dashes or banned phrases) and TypeScript
```

Copy `.env.example` to `.env.local` to set local values.

## Deploying on Vercel

Import the repository in Vercel. It detects Next.js, so no build settings are needed. Set these
environment variables in the project:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final domain without a trailing slash. Enables canonical links, `sitemap.xml` and absolute links to the social sharing image. |
| `NEXT_PUBLIC_SHOW_DRAFT_NOTICES` | Set to `false` to hide the draft banners and `[CONFIRM ...]` notes once content is final. |
| `WAITLIST_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL` | Where each form's submissions are sent. |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/product` | Product |
| `/solutions` | Solutions (sections: `#construction`, `#property-management`, `#facilities-management`, `#maintenance`, `#inspections`) |
| `/pricing` | Pricing |
| `/about` | About |
| `/contact` | Contact (`?reason=pricing` preselects the reason) |
| `/careers` | Careers |
| `/privacy`, `/cookies`, `/terms` | Legal drafts |
| `/waitlist-confirmation` | Shown after a successful waitlist sign-up (not indexed) |
| any other path | 404 page (not indexed) |

## Project layout

```
assets/photos/        worksite photographs: PNG masters, graded web versions and USAGE.md
app/                  routes, root layout, globals.css (design tokens), sitemap, robots, icons
app/api/forms/[kind]  form endpoint for waitlist, contact and careers
components/           server components: sections, mock-ups, legal renderer, UI primitives
components/client/    interactive parts: header, waitlist panel, forms, cookie consent, toast
content/              copy shared across pages: solutions, plans, FAQs, workflow steps
lib/                  form rules, submission handling, site settings, icons, metadata
emails/               waitlist confirmation email (HTML and plain text)
scripts/              content check
design/               the three-layout design exploration
```

Design tokens live in `app/globals.css` under `@theme`. The `dk` class re-themes any block with the
system's dark tokens, which is how the product frames and closing bands are drawn.

Text in square brackets such as `[LEGAL ENTITY NAME]` is shown highlighted (the `Ph` component) so
unfinished values stay visible.

## Photographs

Seven worksite photographs live in `assets/photos`. The PNG files in `masters/` are the originals.
`npm run photos` (`scripts/grade-photos.mjs`) applies the colour treatment from `assets/photos/USAGE.md`
(a slightly cooler white balance and about 12 per cent less high-visibility yellow) and writes the `.jpg`
web versions beside them. `content/photos.ts` lists each photograph with its alt text, and the `Photo` and
`PhotoPair` components in `components/photo.tsx` crop and place them. Next.js serves AVIF or WebP at
responsive widths; the home page hero is preloaded and the rest load lazily.

| Page | Photographs |
| --- | --- |
| Home | Hero (01), the four workflow steps (02 to 05), site work (07) |
| Product | Assign (03), work from the site or the office (07) |
| Solutions | Construction (04), facilities management (06), inspections (05) |
| About | Why SiteResolve exists (05) |

## Logo and sharing image

The logo symbol is `LogoMark` in `components/logo.tsx`: viewfinder corners in the text colour around a
blue verification tick. The browser tab icon (`app/icon.png`), home screen icon (`app/apple-icon.png`)
and email logo (`public/email/logo.png`) show it on a navy tile. `public/og-image.jpg` is the 1200 by 630
image shown when any page is shared; `lib/metadata.ts` attaches it to every page.

## Pricing

SiteResolve is presented as one annual subscription per organisation. To publish a figure or range, set
`price` on the plan in `content/plans.ts` and it appears under the plan name.

## Forms

The waitlist (panel on every page and the form at the foot of the home page), contact and careers forms
share one set of rules in `lib/forms.ts`. The browser uses them for instant messages and the API route
checks them again on the server.

- With no webhook set, a form runs in **preview mode**: the server validates the submission, logs a notice
  and returns success without storing or sending anything. Waitlist duplicates are remembered in memory
  per server instance, so the duplicate message can be reviewed.
- With a webhook set, the server posts the submission as JSON. The payload includes the consent wording
  shown to the person, the page and a timestamp. A `409` from the webhook shows the duplicate message.
- A hidden honeypot field (`website`) quietly drops automated submissions.

## Cookies and analytics

No analytics or other optional technology is included. Consent is stored in `localStorage` under
`sr-consent`. To add analytics, put the loading code in `lib/analytics.ts`. It runs only after the visitor
accepts analytics, and a `sr:consent` event fires on the document whenever consent is applied. Complete the
cookie table in `app/cookies/page.tsx` from a scan of the finished site.

## Before launch

1. Replace every bracketed placeholder (search the code for `[`), including the legal entity, addresses,
   contact emails, processors, retention periods, lawful bases, effective date and final domain.
2. Have the Privacy Policy, Cookie Policy and Terms of Use reviewed.
3. Add annual prices or ranges to `content/plans.ts` when they are set.
4. Set the environment variables above, including the form webhooks.
5. Set `NEXT_PUBLIC_SHOW_DRAFT_NOTICES=false`.
6. Run `npm run check` and `npm run build`.
