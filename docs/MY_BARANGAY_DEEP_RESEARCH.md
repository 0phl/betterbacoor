# My Barangay: deeper source review

Reviewed September 17, 2026. Research only; these findings have not been imported into the application. This follow-up expands [the initial review](MY_BARANGAY_RESEARCH.md). Official publication establishes what a source reports, not that a phone is answered, a clinic has supplies, or a collection route is operating today. No offices were contacted.

Implementation follow-up, September 17: the verified subset is now integrated. See [My Barangay implementation notes](MY_BARANGAY.md#research-backed-expansion--september-17-2026) for exact coverage and exclusions. The research observations below retain their original scope. Animal-bite and dental PDF rows were subsequently visually inspected; malformed or transposed contact fields remain omitted.

## What we can build from this

| Resident need                       | Evidence found                                                    | Publication decision                                                                            |
| ----------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Understand my barangay              | PSA geographic codes and 2024 population for all 47               | Ready as dated census information                                                               |
| Find local health services          | 14 YAKAP, four animal-bite and two dental accreditation entries   | Source-listed facilities; resolve address conflicts before maps or barangay matching            |
| Find a school and its announcements | 29 elementary, 10 junior-high and five senior-high directory rows | Use official directory links; these are 44 level-specific listings, not necessarily 44 campuses |
| Know my garbage schedule            | 28 city images, covering 33 distinct barangay headings            | Transcribe by subdivision/street; missing and ambiguous routes stay unavailable                 |
| Find an assistance center           | 2025 ordinance with six centers and a sub-office                  | Locations documented; Bayanan coverage conflicts and program routing need clarification         |
| Read barangay announcements         | Original Facebook pages inspected, with varying identity evidence | Curate individually; no verified directory of all 47 barangay pages yet                         |

## 1. Population and identity

The [PSA Bacoor listing](https://psa.gov.ph/classification/psgc/barangays/0402103000) provides 47 barangays, ten-digit PSGCs and **2024 POPCEN** counts. The geographic listing is dated July 31, 2025. The barangay counts sum to **661,381**, matching its city total.

Saved in [bacoor-psa-2024.json](research/bacoor-psa-2024.json). Preserve the reference year in the UI; do not call it today's population. Use PSGCs to join records, with an explicit former-name crosswalk. A name or code does not establish a boundary polygon.

## 2. Health services

PhilHealth's [accreditation index](https://www.philhealth.gov.ph/partners/providers/facilities/accredited/) links lists updated **July 31, 2026**. Search snippets sometimes describe older versions; the downloaded document's heading is the reference date used here.

The [YAKAP list](https://www.philhealth.gov.ph/partners/providers/facilities/accredited/YAKAP.pdf), pages 60, 62–63, contains 14 Bacoor entries: eight government and six private. The relevant pages were visually inspected. They include Alima, Floraville, Salinas, Queens Row, Bayanan, Molino III and Green Valley health units, Southern Tagalog Regional Hospital, Cavite East Asia, Metro South, mWell, Purehealth, South City and St. Dominic. Their listed expiry is December 31, 2026. Accreditation and available GAMOT prescription do not establish opening hours, medication stock, emergency capability or an entirely free visit.

**Address conflict:** this list places Green Valley in Molino II, while the older [DOH regional directory](https://ro4a.doh.gov.ph/rural-health-units/) places it in San Nicolas III. Hold the barangay assignment and map pin until resolved. Do not merge similarly named Bayanan specialist and general-health facilities without identity evidence.

The [animal-bite list](https://www.philhealth.gov.ph/partners/providers/facilities/accredited/ABPP_073126.pdf), pages 25–27, identifies four Bacoor providers: the city treatment center at Sagip Buhay and Recovery Center in Bayanan, STRH in Habay II, and IVAX branches in Molino III and Revilla Business Park, Habay II. The city center's listed phone is **(046) 435-3420**. These are accreditation records, not confirmation of vaccine availability or operating hours. One IVAX number has only ten digits in the source; hold it rather than silently adding a digit.

The [dental list](https://www.philhealth.gov.ph/partners/providers/facilities/accredited/DENTAL_073126.pdf), pages 14–15, identifies Basa-Gaspar Dental Clinic in Panapaan 1 and STRH. The former's phone and email appear under the opposite column headings in extracted text. Animal-bite and dental entries were reviewed as searchable PDF text; visually check their rows before production import.

Suggested feature: filter facilities by service and show source-listed addresses, sector, accreditation date and program. Avoid assigning a resident a clinic merely because its address shares their barangay.

## 3. Schools and trustworthy Facebook links

DepEd Bacoor publishes [elementary](https://www.depedbacoorcity.ph/elementary-schools/), [junior-high](https://www.depedbacoorcity.ph/junior-high-schools/) and [senior-high](https://www.depedbacoorcity.ph/senior-high-schools/) directories. They contain school emails, Facebook links and linked profiles. Most directory rows do not themselves establish a complete street address; use the school profile or another first-party source before mapping.

Five Facebook destinations linked directly by the senior-high directory:

| School                                | Directory-linked Facebook page                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Within Progressive Elementary School  | [DepEd Tayo 342599](https://www.facebook.com/DepEdTayo342599)                     |
| San Nicolas III                       | [DepEd Tayo SHS SN](https://www.facebook.com/DepEdTayoSHSSN342600)                |
| Dulong Bayan                          | [DepEd SHS Dulong Bayan](https://www.facebook.com/cbshsdubay)                     |
| Within Bacoor Elementary School       | [DepEd Tayo SHS within BES](https://www.facebook.com/DepEdTayoSHSwithinBES342602) |
| Within Sineguelasan Elementary School | [DepEd Tayo SHSWSES](https://www.facebook.com/DepEdTayoSHSWSES342601)             |

The Dulong Bayan destination was opened and its public introduction confirms Capt. Sarino Street, Dulong Bayan. The other four were verified as directory-linked destinations, not individually audited pages. The directory prints the Bacoor Elementary SHS email as `342602@deped.gov.h`; exclude that malformed email pending confirmation instead of guessing a correction. Current enrollment, strands and admission deadlines require dated school announcements.

## 4. Original Facebook pages: identity and conflicts

| Page                                                                 | Evidence inspected                                                                                                   | Treatment                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [City Government of Bacoor](https://www.facebook.com/CityGovtBacoor) | Official city-site Facebook link redirects here; page links back to bacoor.gov.ph and displays a verification badge  | Strong first-party identity chain; suitable source for dated city notices |
| [Barangay Molino 1](https://www.facebook.com/BarangayMolino1)        | Public introduction claims the barangay council; transparency shows page ID 102213274994183, created October 5, 2020 | Candidate; no independent city endorsement established in this pass       |
| [Barangay Molino 4](https://www.facebook.com/barangaymolino4/)       | Public introduction claims the barangay council and lists 09691619999                                                | Candidate; cross-check contacts before call buttons                       |
| Molino V candidate, ID 626356780761006                               | Third-party directory pointed to a Facebook page that returned unavailable                                           | Unverified; do not publish the mirror as an official source               |

The city also explicitly identifies its Facebook channel in this [April 8, 2026 announcement](https://bacoor.gov.ph/latest-news/bayanan-pistang-nayon-2026-espesyal-na-misa-isinagawa/).

Two contact issues need office confirmation:

- Molino 1's [recent post](https://www.facebook.com/BarangayMolino1/posts/pfbid02eh2EJpdxxsMq9KbPCbCGar8k6ctYiPSYDCEHuEHzKbECcMsgJnvqB7TYsxGfUQhsl) has image accessibility text reading **424-2259**, while the city directory/current app uses **424-2559**. This is an OCR-level discrepancy, not a visually confirmed replacement number.
- Molino 4's page lists **09691619999**, while the independent [Citihomes community site](https://citihomesmolino4.com/) reposts **09691611999**. An HOA repost does not establish the correct barangay hotline. The page-linked `barangay-molino4.com` did not resolve during this check.

“Always open” on Facebook does not prove 24-hour document services. Followers, seals, page names and third-party copies alone are insufficient ownership evidence. Record original post URLs and announcement dates; do not promote old evacuation posts to live shelter status.

## 5. Garbage collection: routes, not one day per barangay

The city's [District 1 gallery](https://bacoor.gov.ph/announcement/garbage-collection-master-schedule-district-1/) and [District 2 gallery](https://bacoor.gov.ph/announcement/garbage-collection-master-schedule-district-2/) announce a January 5, 2026 start. All **28 original images** were visually inspected for headings and selected route rows. The [image catalog](research/garbage-schedule-sources.json) preserves exact URLs and coverage.

The headings cover **33 barangays**. Fourteen have no matching heading: Aniban 1–2, Bayanan, Dulong Bayan, Habay I–II, Ligas 1–2, Molino I–V and Real. This is a gallery gap, not evidence that those barangays lack collection.

Examples demonstrate why a subdivision/street selector matters:

- Queens Row West: Astroville HOA, Thursday/Sunday, 8 AM–noon; United Magdiwang Village Homes, the same days, 1–4 PM.
- Molino VI: Soldiers Hills 4 Phase 2, Monday/Thursday, 8 AM–noon; Phase 1, Tuesday/Friday, 8 AM–noon.
- Niog: Rosewood Village, Monday/Thursday, noon–4 PM. Other rows specify roadside pickup points; these must not become door-to-door promises.

Hold ambiguous rows: Queens Row East lists two day-pairs without clear route assignments; Queens Row Central repeats an HOA row; Citta Italia tables repeat phase 14 and do not establish phase 15. Preserve subdivision, phase, days, time and pickup-point notes separately. The gallery title is not a reliable barangay district classification. Full row transcription and confirmation of subsequent changes remain outstanding.

## 6. Assistance-center coverage

[Ordinance 459-2025](https://bacoorcitysp.com/wp-content/PDF/ORD/2025/459-2025.pdf?_t=1759195581), pages 2–3, lists six R.E.V.I.L.L.A. Action Centers and a sub-office:

| Center     | Listed location                    |
| ---------- | ---------------------------------- |
| 1          | Women's Center, Alima              |
| 2          | Old Panapaan 2 Barangay Hall       |
| 3          | Old Zapote 1 Barangay Hall         |
| 4          | Mambog 3 Barangay Hall             |
| 5          | Molino 1 Multi-Purpose Hall        |
| 6          | Molino 4 Barangay Hall             |
| Sub-office | Old Queen's Row West Barangay Hall |

**Bayanan appears under both centers 4 and 5.** Do not automatically route Bayanan residents. The document appends the older 2024 ordinance, whose center locations differ; use the 2025 amendment, not the annex. Enactment is September 22, 2025 and mayoral approval September 23; the precise posting/publication effectivity date was not established. Ordinance locations do not prove that every Charter assistance program uses the same routing, hours or intake arrangements.

## Implementation order and maintenance

1. Add dated population and PSGC-backed identity to all 47 profiles.
2. Add school and health cards using confirmed addresses and official source links; omit disputed contacts and locations.
3. Transcribe unambiguous garbage routes into a subdivision/street lookup, explicitly showing unavailable areas.
4. Add program-specific assistance routing after resolving duplicated coverage.
5. Add curated announcements only from pages with documented identity evidence and dates. Avoid an indiscriminate social feed.

Each imported claim should retain publisher, original URL, source page/row, source date, review date, geographic scope, expiry when applicable, and any unresolved issue. Keep raw source values alongside normalized names. User-facing wording should distinguish a dated official listing from current operational confirmation. Recheck expiring accreditation, old notices and changing contacts before each release.

This review does not establish a complete current list of barangay officials, hall hours, requirements, fees, all 47 Facebook pages, evacuation sites, live flood conditions or shelter occupancy. Missing information should remain missing rather than inferred from neighboring barangays or historical posts.
