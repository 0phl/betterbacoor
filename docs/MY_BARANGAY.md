# My Barangay

`/my-barangay` brings a selected barangay's city-published listing, citywide emergency contacts, and saved preparation checklists together. Entry points are the home quick panel, Directories page, and footer. English and Filipino are supported.

## Research-backed expansion — September 17, 2026

The page now includes population profiles and a local-information section with health, schools, garbage collection and assistance-center views. Search and filters run locally. Changing the barangay resets its garbage search and original-table viewer; citywide health and school results do not imply residency eligibility or an assigned provider.

- `content/barangay-profiles.json`: all 47 current barangays, matched to directory IDs by current headings only. PSA's 2024 POPCEN total is 661,381. The reference year and source remain visible; no boundaries or current population estimate are inferred.
- `content/barangay-health.json`: 13 YAKAP, four animal-bite and two dental listings from PhilHealth's July 31, 2026 lists. Source page, row, review date and accreditation expiry are retained. An expired record displays a review message rather than a current-accreditation claim. Green Valley's conflicting address is excluded. IVAX Molino's incomplete phone, Metro South's malformed email and Basa-Gaspar's transposed contact fields are omitted. Animal-bite pages 25–27 and dental pages 14–15 were visually reviewed during implementation. These listings are separate from the city directory because the sources and program-specific contacts differ; existing city contacts have not been silently overwritten.
- `content/barangay-schools.json`: 29 elementary, ten junior-high and five senior-high directory listings, including DepEd-linked Facebook pages. This is 44 level-specific entries, not a claim of 44 distinct campuses. The elementary table's empty thirtieth row is excluded. The malformed Bacoor Elementary SHS email is omitted. No campus address, admission requirement or catchment area is inferred from a school name.
- `content/barangay-waste.json`: 28 original city table URLs indexed to 33 barangays, plus five previously checked route summaries for Queens Row West, Molino VI and Niog. The remaining tables are readable in an expandable in-page viewer; they are not fully transcribed or searchable. Remote images load only when the viewer opens and need connectivity. Failed images retain an original-table link. Fourteen barangays explicitly show missing coverage; Queens Row East and Mambog III show the known route ambiguities. Tables reflect the January 5, 2026 master schedule, not live collection status.
- Assistance centers: six locations and one sub-office from the 2025 amendment are displayed without inferred program routing. Bayanan's duplicate assignment to centers 4 and 5 remains explicit. The older ordinance annex is not used.

Original source URLs and unresolved findings are in [the deep research report](MY_BARANGAY_DEEP_RESEARCH.md). Unverified barangay Facebook pages, disputed phone replacements, live announcements and evacuation occupancy remain excluded. The city Facebook channel is linked as a source for current announcements; no social feed is embedded.

`scripts/validate-barangay-information.mjs` is part of content/build validation. It checks profile coverage, population totals, provenance, phone normalization, school email domains, garbage-source associations and route time formats. Component tests cover selection changes, filtering, omitted contacts, expired accreditation, image failures and Filipino accessibility. The complete project check also covers the existing selection and checklist behavior.

## Information review — September 17, 2026

Compared all 47 barangay rows, their parenthetical groupings, and published phone numbers against <https://bacoor.gov.ph/barangay-hall-directory/>. The existing local dataset matches. Only this source's verification date was advanced. The source contains no barangay hall addresses or office hours. Missing phone numbers stay missing; seven-digit numbers without an area code remain text, not guessed callable numbers.

Groupings are displayed in the selector and the chosen listing. Some labels overlap across current headings and parenthetical names (for example, Ligas II and P.F. Espiritu III). No automatic alias-to-barangay assignment is performed; residents see the full grouping before selecting. These listings are a directory reference, not a boundary or jurisdiction determination.

Rechecked Bacoor 161, BDRRMO (046) 417-0727, BFP (046) 417-6060, and PNP (046) 417-6366 against <https://bacoor.gov.ph/announcement/in-case-of-emergencies-dial-161/> and its emergency footer. Rechecked 911 at <https://ehotlines.e.gov.ph/>. The page reuses these existing contact records. The emergency dataset's global verification date is unchanged because other contacts and safety articles were not re-reviewed in this change.

Emergency contacts are explicitly citywide/national, not selected-barangay responders. Links to hospitals and health centers show the city directory, not proximity estimates. No unverified address, office hours, evacuation location, shelter availability, live hazard condition, or neighborhood-specific emergency number is added. Residents are directed to BDRRMO/their barangay for a current evacuation destination and safe route.

## Citywide discovery

The same researched datasets are available independently at `/local-services?section=schools`, `health`, `barangays`, `garbage` and `assistance`. Directories links to schools, healthcare and profiles; Services links to collection schedules and assistance centers. My Barangay continues to provide the personalized view.

The main `/search` uses `src/data/local-discovery.ts` alongside the existing official resources. Its count, category filters, pagination and empty state include school records, health services, barangay profiles, available garbage tables, transcribed routes, action-center locations, on-site guides, directory contacts and emergency help. English and Filipino terms are supported. Original garbage images are not full-text indexed; only reviewed headings and transcribed rows are searchable.

Search links carry a section plus a school query, health service, or barangay/route selection. Citywide browsing never writes the saved My Barangay selection. Unknown URL values fall back safely. The custom search clear button remains keyboard accessible and restores input focus; its input suppresses the browser's duplicate native cancel icon.

## Storage and checklists

Only a validated directory entry ID is saved at `betterbacoor:my-barangay:v1`. No account, geolocation, or server submission is involved. Changing or clearing this selection does not clear checklists. Blocked storage has explicit feedback. Unknown IDs are ignored.

`src/data/checklists.ts` shares checklist keys and validation with service guides. Only current guide versions are shown. Corrupt values, duplicate ticks, and out-of-range indices cannot inflate progress. Resume links include a validated `variant` query parameter; invalid variants fall back to the guide's first option. Saved checklists represent preparation, not submitted applications or eligibility decisions.

The page refreshes saved state on return focus and relevant cross-tab storage events. Run `npm run check` for format, lint, tests, source validation, translation coverage, and production build.
