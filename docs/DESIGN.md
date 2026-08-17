# BetterBacoor visual system

BetterBacoor is a resident-facing civic wayfinding product. It should feel related to the BetterGov community without looking like a municipality-swapped starter template.

## Product surface

The primary surface is **Explore**: residents search, scan, compare, and leave for the correct government source. The homepage therefore prioritizes task discovery over project explanation.

## Visual direction

- **Identity:** a custom cobalt `B` wayfinding tile. A navy route connects two aqua destination nodes inside the letter, representing a resident's starting point and the verified official destination. It is not the Bacoor city seal and does not imply government ownership.
- **Palette:** deep civic navy, clear service blue, slate text, white surfaces, and sky accents. Status green is reserved for checked-source signals.
- **Typography:** Inter with compact, heavy editorial headings and restrained supporting text.
- **Motif:** orthogonal route lines and waypoints communicate finding a path through civic information. They are decorative and hidden from assistive technology.
- **Composition:** asymmetric editorial layouts, structured lists, and information bands take priority over interchangeable icon-card grids.
- **Motion:** limited to purposeful hover and focus feedback, with reduced-motion support.

## Homepage hierarchy

1. Unofficial status and links to the official portal and corrections.
2. Resident-facing promise and global search across every verified resource.
3. Compact explanation of source, verification, and correction controls.
4. Task-based pathways for services, directories, and transparency records.
5. Recently checked starting points with visible provenance.
6. Correction call to action and project attribution.

## Trust requirements

Visual polish must not hide civic provenance. Resource cards continue to display:

- authoritative source and source location;
- last verification date;
- reviewer/content owner;
- official destination;
- correction route.

The community-run and non-endorsement disclosure remains visible before the main navigation. Applications, submissions, payments, and records remain on government-owned systems.

## Reference boundary

BetterSolano is a benchmark for service-first hierarchy and perceived completeness. BetterBacoor does not copy its municipal content, branding, logo, imagery, “Official Portal” wording, or application architecture. BetterBacoor’s source lineage remains BetterLocalGov, with Kapwa and BetterGov ecosystem attribution preserved.

## Accessibility baseline

- WCAG-oriented color contrast and visible keyboard focus.
- Semantic landmarks and heading order.
- Minimum 44-pixel interactive targets.
- Search labels and live result counts.
- Keyboard-operable responsive navigation.
- Route changes move focus to the main landmark.
- Decorative route graphics are ignored by assistive technology.
- `prefers-reduced-motion` disables nonessential transition duration.
