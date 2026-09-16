# BetterBacoor community portal changes

Implemented locally on September 16, 2026. No deployment or government-system integration was performed.

## Design and resident experience

- Wider 84rem page shell, a wider task panel, shorter hero copy, more breathing room, and no location-pin icon in the hero eyebrow.
- Grouped navigation with a visible active state and the existing approved logo.
- Charcoal footer, enlarged emblem and name, and borderless creator GitHub and owner-supplied Facebook links. The community story and BetterGov tools share one visual section.
- Emergency hub with sourced contacts, situation guidance, and an offline contact-card download. Source decisions and verification limits are recorded in [Emergency hub](EMERGENCY_HUB.md).
- Quick shortcuts open actual on-site guides for business permits, civil records, and working permits. Search also finds these guides.
- City office contacts now precede external directory links.
- A conceptual Filipino community illustration accompanies the community story.

## Functional content

Three on-site guides provide editable preparation checklists with local persistence, reset, and printing. Business permits offer independent new/renewal lists. Completing a checklist is not an application submission or approval. No personal information is collected, and no application-status service is simulated.

Sources inspected:

| Guide               | Primary source and exact location                                                                                            | Publication limits                                                                                                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Business permits    | [City Charter 2026](https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf), printed pages 6.2–6.15, PDF pages 162–175 | General new/renewal requirements and procedure summaries. Sector-specific requirements remain conditional; no fixed total fee is calculated.                                                                                                                                  |
| Civil record copies | Same Charter, printed pages 9.26–9.27, PDF pages 318–319                                                                     | Local registry copies/transcriptions, not PSA-issued certificates. The source separately lists PHP110 certified copy, PHP300 transcription, and PHP55 seal; no unsupported combined fee is claimed. The published 45 minutes is identified as the Charter’s processing total. |
| Working permit      | [Bacoor eGov](https://strikeas1.bacoor.gov.ph/), registration and application information                                    | Preparation guidance only. No claim to reproduce the full case-specific application checklist, fixed charge, or processing duration.                                                                                                                                          |

Office email addresses were cross-referenced with the city directory already recorded in `content/office-contacts.json`; eGov support email is from the working-permit portal.

## Charter reader

The city PDF response has `X-Frame-Options: DENY` and `frame-ancestors 'self'`. The city site is not framed or proxied. Instead, the public service manual was downloaded and preserved byte-for-byte as `public/documents/bacoor-citizens-charter-2026.pdf`, with the original source linked. Its 1,202 pages and approximately 13MB size were measured locally. `content/documents.json` records its SHA-256 digest and provenance, and build validation checks that the copy has not changed.

PDF.js renders the document directly inside the app, with previous/next, arbitrary page navigation, chapter shortcuts, loading/error handling, and an expandable extracted-text view. The engine and document are requested only after Load is selected. Extracted table text may have imperfect reading order, so the curated guides remain the clearer route for the covered procedures.

## Artwork provenance

Asset: `public/images/community-life.png`. Tool: Codex built-in image generation. The approved emblem was not changed. The image is illustrative, not a claim about real Bacoor geography.

Creation prompt:

> Use case: illustration-story. Asset type: wide editorial illustration for a Philippine community civic website, BetterBacoor. Create a beautiful minimalist editorial illustration of everyday Filipino community life: a sari-sari shop with striped awning, a blue jeepney, a few residents walking including an older resident and a parent, tropical trees and modest neighborhood houses. It is a conceptual community scene, not an accurate depiction of a specific street or landmark. Sophisticated clean flat shapes with subtle paper texture, warm and welcoming, generous negative space, harmonious composition. Palette: royal blue #00329e, sunshine yellow #fcd116, pale blue, warm off-white, small natural skin-tone accents. Landscape composition 3:2, no text, no words, no logos, no government seals, no photographic realism. All elements balanced across frame, do not crop people. Intended to sit beside community-focused website copy.

## Maintenance

When guide requirements change, update the internal verification date to invalidate older saved checklist ticks. Never reuse a checklist item index for a different requirement without a version change. After replacing the Charter with a newer government edition, recheck all printed/PDF page mappings and regenerate document provenance. Recheck service content within 90 days; the interface warns when a guide is overdue.

The initial portal does not submit government applications, collect resident documents, synchronize checklists across devices, or provide live status tracking. Those would require a supported integration and an explicit privacy/data-handling design.

## Verification

The checks cover checklist persistence, separation between new and renewal data, reset, denied/corrupt storage, printing, direct shortcuts, search, source-page navigation, and accessibility rules available in jsdom. Document hashes are validated in the build. Browser checks cover eight routes at 320, 768, and 1440 pixels with one main heading and no horizontal overflow. The actual PDF pages 162, 318, and 319 were rendered in the app, including arbitrary-page and next-page navigation. The production dependency audit reported no vulnerabilities.
