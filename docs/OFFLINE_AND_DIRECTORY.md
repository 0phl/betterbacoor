# Offline essentials and local directory

Implemented locally on September 16, 2026. No deployment or indexing change is part of this work.

Verification counts below describe that implementation date. See the [documentation index](README.md) for later My Barangay, citywide search, and translation work.

## Local places

`content/local-directory.json` contains 64 entries transcribed from three City of Bacoor publications:

| Collection                | Entries | Source and location                                                                                                            |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Barangays                 | 47      | [Barangay Hall Directory](https://bacoor.gov.ph/barangay-hall-directory/), Barangay / Contact Number table                     |
| Hospitals                 | 10      | [Hospital Directory](https://bacoor.gov.ph/bacoor-hospital-directory/), Hospital / Address / Landline table                    |
| Health centers and clinic | 7       | [Local government directory](https://bacoor.gov.ph/local-directory-of-bacoor-government-center/), Other Offices health entries |

All three source pages were opened and read on September 16, 2026. A second transcription check fetched their HTML and compared every entry's name, available number, and hospital address with the source table: 64 entries matched without discrepancies. This verifies transcription against published information, not that a line currently connects or that a facility is accepting patients. No test calls were placed.

The source's parenthetical barangay groupings are preserved as `includes`. These are searchable alongside the displayed names. Roman and Arabic numerals are normalized in search; ambiguous names such as Ligas II can match more than one source grouping. The UI explains this. The collection is described as 47 published listings, not an independently established legal boundary dataset. Officials' names and personal details are not copied.

The barangay and health-center tables omit area codes. Their seven-digit numbers are displayed as published without clickable telephone destinations. No area code, address, office hours, bed availability, service coverage, or precise map coordinate is inferred. Hospital numbers include area codes and are normalized to `+63` destinations, including the eight-digit Metro Manila subscriber number in the South City entry. Maps links are explicitly searches using the published name/address, not verified pins.

The directory supports category filters, live search, 12-entry pagination, and URL parameters (`q`, `type`, `page`) for sharing. Global search offers a link to matching local places. The home health topic opens the onsite hospital collection. The existing five office contacts remain available below the new collection and through the existing office anchor.

Each source has its title, URL, table location, review date, and a 90-day maximum review interval. Build validation rejects overdue sources, duplicate IDs, missing references, and phone display/dial mismatches. The live UI also shows a review notice if a source becomes overdue after a build.

## Offline emergency essentials

The emergency hub offers explicit Save, Refresh, Open, and Remove controls. Only public emergency information is stored; no resident information is collected.

`scripts/build-offline.mjs` generates `public/offline/emergency.html` before development and production builds. It uses the same `content/emergency.json` as the main emergency page. The generated file is ignored by Git and contains all seven contacts and seven guidance sections, embedded styles, the approved logo, and source links. It needs no external font, script, stylesheet, or image to display.

`public/emergency-sw.js` is registered only when a resident requests an offline action. Its root scope lets `/emergency` fall back to the saved guide on connection failure or server errors; the only other intercepted navigation is `/offline/emergency.html`. Other pages, APIs, PDFs, and images are not intercepted or cached. Opening the saved-guide URL deliberately returns the saved snapshot, even online, until the user refreshes it.

The cache contains a single complete HTML response with saved time, source snapshot date, and content digest in its headers. Refresh fetches and validates the full new document before replacing that response. A failed refresh preserves the previous copy. Remove deletes this named cache only. A four-second network timeout makes the emergency route fall back during a stalled connection; the saved-guide URL opens directly from storage.

The standalone guide displays its saved date and information snapshot, plus a review warning after the emergency content's 30-day interval. Expiry never hides the phone numbers. Re-saving old information does not reset its source review date. External source links still require internet; calls require phone service. Browser storage eviction, clearing site data, or private browsing can remove the saved guide. The downloadable text contact card remains a separate fallback. This is offline reference access, not a live alert service or a fully offline app.

Keep the current noindex settings. A future public launch remains a separate decision.

## Verification

- Full `npm run check`: 51 tests, formatting, lint, content/brand/language validation, TypeScript, and production build passed.
- Tests cover old-name and number search, ambiguous groupings, shareable filters, paging, empty results, missing area codes, exact hospital call destinations, source expiry, and accessibility.
- Offline lifecycle tests cover explicit saving, complete content, network fallback, successful replacement, failed refresh preservation, removal, and interception boundaries.
- Production-preview browser check: saved the guide, stopped the preview server, opened the saved URL, and navigated directly to `/emergency`; both displayed the complete saved guide. Restored the server and verified removal through the UI.
- Checked 390px mobile layouts for the standalone guide and directory, with no horizontal overflow. No physical-device calling test was performed.
