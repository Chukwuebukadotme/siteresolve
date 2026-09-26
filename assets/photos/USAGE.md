# SiteResolve worksite photography guide

This folder contains seven photorealistic website assets created for SiteResolve. Each photograph contains one person and uses a natural, premium editorial style.

`masters/` holds the PNG master files. The `.jpg` files beside this guide are the colour-treated web versions, produced by `npm run photos`. Next.js serves them as AVIF or WebP at responsive widths.

## Approved asset list

| No. | File | Primary use | Source ratio |
|---|---|---|---|
| 1 | `01-hero-report-defect.png` | Home page hero | 16:9 |
| 2 | `02-report-wall-defect.png` | Report workflow | 4:5 |
| 3 | `03-assign-site-office.png` | Assign workflow | 3:2 |
| 4 | `04-resolve-fire-door.png` | Resolve workflow | 3:2 |
| 5 | `05-verify-fire-door.png` | Verify workflow | 3:2 |
| 6 | `06-facilities-plant-room-v2.png` | Facilities management | 4:5 |
| 7 | `07-offline-site-update.png` | Mobile and offline working | 16:9 |

Do not use `06-facilities-plant-room.png`. Its tablet is physically incorrect because a screen appears on the back of the device. The corrected `-v2` file shows a plain rear casing while the screen faces the facilities manager.

## Relationship to the SiteResolve colour system

The website uses white and light-grey surfaces, near-black and navy sections, restrained borders and the primary blue `#236cff`. The photography supports this system through neutral site materials, graphite workwear and occasional blue equipment or interface details.

The photographs should not be heavily tinted to match the brand. SiteResolve blue should remain strongest in website controls, links, buttons and product interfaces. The images provide realistic context while the surrounding interface provides brand consistency.

High-visibility yellow is a functional worksite colour. It creates useful contrast against SiteResolve blue and navy, but it must not become the dominant colour of the page.

## Final colour treatment

Apply the following treatment consistently when preparing production derivatives:

- Use a slightly cool, neutral white balance.
- Keep skin tones natural and properly exposed.
- Preserve clean grey, charcoal and graphite shadows.
- Reduce excessive yellow or green saturation in high-visibility clothing by approximately 10 to 15 per cent when required.
- Preserve realistic timber, concrete, plaster and steel textures.
- Retain restrained blue details where they occur naturally.
- Avoid applying an overall blue filter.
- Avoid orange-and-teal cinematic grading.
- Avoid heavy contrast, crushed shadows and artificial HDR effects.
- Keep the photographs credible rather than glossy or dramatically staged.

## Contrast and accessibility precautions

- Prefer placing headings and body copy outside the photographs.
- Use split layouts for feature sections whenever possible.
- Do not place text over faces, hands, defects, tools or device interactions.
- If text must sit over a photograph, add a controlled light or dark scrim and verify contrast in the final rendered layout.
- Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- Test contrast independently at desktop and mobile crops because the background behind the text may change.
- Keep important visual information inside the central crop-safe area.
- Do not use colour alone to communicate Report, Assign, Resolve or Verify states.

## 1. Hero: report a fire-door defect

- File: `01-hero-report-defect.png`
- Placement: Home page hero, below the opening copy or in the image side of a split hero.
- Desktop: Use the full 16:9 frame. Keep the professional and fire door on the right. The left side can support a separate copy panel.
- Mobile: Use a 4:5 crop that retains the professional, phone and door closer. Keep the heading outside the image.
- Suggested `object-position`: `center right`.
- Alt text: `Site manager photographing a fire-door defect on a construction site.`

## 2. Report: capture a wall defect

- File: `02-report-wall-defect.png`
- Placement: Home page How it works section for Report, or the Product page Report section.
- Desktop: Use as a 4:5 portrait card beside the reporting copy.
- Mobile: Use full width above the copy.
- Suggested `object-position`: `center`.
- Alt text: `Building inspector photographing a crack beside a window.`

## 3. Assign: give the issue an owner

- File: `03-assign-site-office.png`
- Placement: Product page Assign section, or beside content about responsibility, assignees and deadlines.
- Desktop: Use the 3:2 frame in a two-column section.
- Mobile: Use a 4:3 crop that retains the project manager and laptop interface.
- Suggested `object-position`: `center`.
- Alt text: `Project manager assigning a construction defect from a site-office laptop.`

## 4. Resolve: complete the corrective work

- File: `04-resolve-fire-door.png`
- Placement: Product page Resolve section, or the middle of the fire-door case study.
- Desktop: Keep the technician and door hardware together within the 3:2 frame.
- Mobile: Use a 4:5 crop centred on the technician's hands and the door closer.
- Suggested `object-position`: `center`.
- Alt text: `Door technician adjusting a fire-door closer during corrective work.`

## 5. Verify: inspect before closure

- File: `05-verify-fire-door.png`
- Placement: Product page Verify section, or the final step of the fire-door case study.
- Desktop: Use the full 3:2 frame in a split-content section.
- Mobile: Use a 4:5 crop that retains the inspector, latch and tablet.
- Suggested `object-position`: `center`.
- Alt text: `Quality inspector checking a repaired fire door before approval.`

## 6. Facilities: investigate a building fault

- File: `06-facilities-plant-room-v2.png`
- Placement: Solutions page Facilities management section, or a dedicated property and facilities solution page.
- Desktop: Use as a 4:5 portrait card beside the solution copy.
- Mobile: Use full width and retain the pipe joint, water leak, manager and tablet.
- Suggested `object-position`: `center`.
- Alt text: `Facilities manager inspecting a leaking pipe joint in a plant room.`
- Device note: The camera sees the tablet's plain rear casing. The screen faces the facilities manager and is intentionally not visible.

## 7. Mobile and offline working

- File: `07-offline-site-update.png`
- Placement: Home page Designed for site work section, or the Product page mobile and low-connectivity section.
- Desktop: Use the full 16:9 frame. Place copy in a separate area on the right or outside the photograph.
- Mobile: Use a 4:5 crop centred on the engineer and phone.
- Suggested `object-position`: `left center`.
- Alt text: `Site engineer saving a defect update on a wet outdoor construction site.`

## Recommended distribution

Use images 1, 2, 4, 5 and 7 on the home page. Use image 3 on the Product page and image 6 on the Solutions page. This gives the landing page a complete Report, Resolve and Verify story without repeating every photograph across the site.

## Production delivery

- Retain the PNG files as master assets.
- Export production derivatives as AVIF or WebP.
- Provide responsive widths around 640, 960, 1280 and 1600 pixels where appropriate.
- Use `srcset` and `sizes` so mobile devices do not download desktop-sized images.
- Set explicit image dimensions to prevent layout shift.
- Use lazy loading below the initial viewport. Do not lazy-load the hero image.
- Preserve the one-person composition and workflow action when cropping.
- Recheck hands, devices, tools and safety equipment before publishing any future generated variation.
