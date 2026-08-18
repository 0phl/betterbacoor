# BetterBacoor brand guide

## Brand boundary

BetterBacoor is an independent, community-run civic-information project. It is not operated by or endorsed by the City Government of Bacoor.

BetterGov describes itself as a community-led initiative and publishes its repository under CC0.[1] The CC0 legal text leaves trademark rights unaffected, so BetterGov artwork remains a family reference rather than a BetterBacoor source asset.[2]

The BetterLGU guide describes independently maintained local portals and recommends the `better[lguname]` repository and `better[lguname].org` domain patterns.[3] The directory displays varied local identities rather than one mandatory portal mark.[4][5]

The directory's CC BY 4.0 license does not authorize implied endorsement or grant trademark rights.[6]

## Identity direction

The approved identity uses the blue, yellow, and white visual grammar common across BetterGov and BetterLGU projects while remaining an original BetterBacoor composition. It intentionally includes documented Bacoor symbols rather than the rejected route-and-waypoint `B`.

Bacoor's seal ordinance documents the sun, Zapote Bridge, bamboo, mussel shells, water, and marching-band imagery among the city's symbols.[7]

The official city portal describes Bacoor's history.[8]

Separate official pages cover the Zapote Bridge and Bacoor's marching-band tradition.[9][10]

The emblem does not reproduce the City Government of Bacoor seal. It rearranges individual local symbols into a distinct community-project mark and must always appear with the site's unofficial-status disclosure.

## Primary mark

The primary BetterBacoor emblem combines:

- a proper Philippine flag-style yellow sun;
- a circular frame of jointed bamboo and leaves;
- a marching-band drum with **two drumsticks**;
- a trumpet;
- a two-arch interpretation of Zapote Bridge;
- a mussel or bivalve shell; and
- water lines.

The arrangement follows Ronan's approved Round 2, Concept 2 composition. The bridge creates the civic foundation, the marching-band instruments occupy the center, the bamboo forms the frame, and the mussel and water anchor the mark to Bacoor's coastal identity.

## Colors

| Role                  | Value     |
| --------------------- | --------- |
| Philippine royal blue | `#0038A8` |
| Golden yellow         | `#FCD116` |
| Supporting white      | `#FFFFFF` |

The primary artwork uses flat fills only. Do not add gradients, shadows, extra colors, photographic textures, or unofficial text inside the emblem.

## Navbar lockup

In the application navbar, pair the primary mark with the plain-text name `BetterBacoor.org` and the existing `Civic guide` descriptor. Do not typeset the domain inside the emblem.

## Favicon

`public/favicon.svg` contains the exact approved emblem from `public/logo-mark.svg` on a white rounded-square background. Its 94 logo paths are copied unchanged; only the background and square padding are added so the mark remains visible against light and dark browser chrome.

The favicon is generated and validated by `scripts/validate-brand-assets.mjs`. Run `npm run generate:favicon` after an approved primary-logo change; do not redraw or simplify the favicon independently.

## Usage

- Use `public/logo-mark.svg` for the navbar, footer, 404 page, directory listing, and other standalone brand applications.
- Use `public/favicon.svg` for browser icon discovery. It may add its white background plate but must preserve the primary emblem geometry exactly.
- Keep the mark's aspect ratio; do not stretch, rotate, recolor, outline, or rearrange it.
- Preserve clear space around the full emblem.
- On controlled application surfaces, prefer the mark at 36 CSS pixels or larger. Browser chrome may rasterize the same SVG at smaller favicon sizes.
- Keep the community-run and non-endorsement disclosure visible wherever the identity could imply government ownership.
- Do not combine the emblem with the BetterGov emblem, another BetterLGU logo, or the City Government of Bacoor seal.

## Production provenance

Image generation was used only to explore and approve the composition. The selected concept was reduced to exact blue and yellow masks and reconstructed as deterministic spline-based SVG paths. The shipped primary mark and generated favicon contain no raster data, embedded image, gradient, filter, or third-party logo artwork.

## Sources

[1] https://raw.githubusercontent.com/bettergovph/bettergov/main/README.md
[2] https://raw.githubusercontent.com/bettergovph/bettergov/main/LICENSE
[3] https://raw.githubusercontent.com/jmacj/better-lgu-directory/main/GUIDE.md
[4] https://raw.githubusercontent.com/jmacj/better-lgu-directory/main/CONTEXT.md
[5] https://lgu.bettergov.ph
[6] https://raw.githubusercontent.com/jmacj/better-lgu-directory/main/LICENSE
[7] https://bacoor.gov.ph/downloads/city-ordinances/2012/ORD-29A-2012%20(%20BACOOR%20SEAL%20).pdf
[8] https://bacoor.gov.ph/historical-background-of-bacoor
[9] https://bacoor.gov.ph/tourism/tulay-ng-zapote
[10] https://bacoor.gov.ph/the-grandest-marching-band-festival-in-the-philippines
