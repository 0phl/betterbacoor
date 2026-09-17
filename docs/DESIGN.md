# BetterBacoor visual system

BetterBacoor is a resident-facing civic-information product. It should feel native to the BetterGov and BetterLGU community while remaining distinctly Bacoor and visibly unofficial.

## Product surface

The primary surface is practical resident help: search, read service guides, prepare checklists, consult emergency guidance, and reach the right office. Government systems remain the destination for transactions. The homepage prioritizes tasks over project explanation.

## Visual direction

- **Identity:** an original blue-and-yellow community emblem combining the Philippine sun, bamboo, a marching-band drum with two drumsticks, a trumpet, Zapote Bridge, a mussel shell, and water.
- **Navbar lockup:** the primary emblem is paired with `BetterBacoor.org` and the compact `Civic guide` descriptor.
- **Palette:** Philippine royal blue and golden yellow establish the BetterLGU-family identity. Deep civic navy, slate text, white surfaces, and restrained sky accents remain available to the interface. Status green is reserved for checked-source signals.
- **Typography:** Inter with compact, heavy editorial headings and restrained supporting text.
- **Motif:** illustrated local symbols communicate Bacoor's place, history, music, and coastal character. The emblem remains decorative when its adjacent text already supplies the project name.
- **Composition:** asymmetric editorial layouts, structured lists, and information bands take priority over interchangeable icon-card grids.
- **Motion:** limited to purposeful hover and focus feedback, with reduced-motion support.

The former cobalt route-and-waypoint `B` is rejected and must not be restored.

## Homepage hierarchy

1. Compact unofficial-status strip and the original emblem at 64px on mobile and 80px on desktop.
2. Royal-blue split hero: plain-language introduction and global search alongside four everyday tasks. Emergency calling sits in the existing neutral utility header above navigation, with no separate homepage banner or hero card. The emergency hub remains in navigation and the everyday topic grid.
3. On-site guide cards with saved preparation checklists and compact topic links; the service catalog includes four guides and a guided finder.
4. Citizen's Charter callout, followed by selected government resource cards.
5. A community illustration and purpose statement leading into BetterGov tools on one shared background.
6. A charcoal footer with a larger emblem, a subtle contribution button, Facebook and contributor links, and a consistent copyright/credit row showing MIT and CC0 with links to their scopes.

Search results combine a text query and resource-type filters. Cards prioritize title, description, and the official destination. A native disclosure keeps detailed provenance accessible without dominating the card. Avoid unverified live dashboards, fabricated activity counts, unsupported statistics, or placeholder controls.

## Trust requirements

Visual polish must not hide civic provenance. Resource cards continue to display:

- government destination domain and official link;
- authoritative source and source location inside an expandable Source disclosure; and
- a plain-language caution if a record is overdue.

Avoid reviewer names, routine “last checked by” badges, and GitHub correction links on civic records. Verification dates remain maintenance metadata. Display publication dates, census reference years, and offline snapshot dates when needed to explain age or coverage. No personal reviewer identity is bundled in resource records.

The community-run and non-endorsement disclosure remains visible before the main navigation. The footer invites contributions to the project repository. Applications, submissions, payments, and authoritative records remain on government-owned systems. Readable service guides, preparation checklists, and an unchanged public Charter copy are available inside BetterBacoor.

## Reference boundary

The September emergency-placement refinement uses [BetterCalauan](https://bettercalauan.org/) as a reference for contacts above navigation, with a neutral treatment suited to BetterBacoor instead of its bright alert strip. [GOV.UK notification guidance](https://design-system.service.gov.uk/components/notification-banner/) recommends sparing use of banners, and [Bristol’s alert pattern](https://design.bristol.gov.uk/docs/components/alert-banners/) is intended for temporary information. This supports treating a permanent hotline as a header utility rather than a large attention banner. The rendered [NYC homepage](https://www.nyc.gov/main) was also reviewed for service hierarchy and neutral navigation. This is a design inference, not a claim that these sites prescribe BetterBacoor’s exact layout.

BetterSolano is a benchmark for service-first hierarchy and perceived completeness. BetterBacoor does not copy its municipal content, branding, logo, imagery, “Official Portal” wording, or application architecture. BetterBacoor's source lineage remains BetterLocalGov, with Kapwa and BetterGov ecosystem attribution preserved.

The BetterGov and BetterLGU marks establish family resemblance, not authorization to copy their artwork or imply endorsement. BetterBacoor's emblem is an original community composition based on documented local symbolism.

## Accessibility baseline

- WCAG-oriented color contrast and visible keyboard focus.
- Semantic landmarks and heading order.
- Minimum 44-pixel interactive targets.
- Search labels and live result counts.
- Keyboard-operable responsive navigation.
- Route changes move focus to the main landmark.
- Decorative brand artwork is ignored by assistive technology when adjacent text supplies the same identity.
- `prefers-reduced-motion` disables nonessential transition duration.
