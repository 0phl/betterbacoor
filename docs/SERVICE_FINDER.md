# Guided service finder

`/services/find` asks one question at a time and reuses the published service
guides for results. Entry links appear in the home page quick panel and the
Services page. Both English and Filipino are supported.

The eight result paths are new and renewal business permits, a local civil-record
copy, working-permit preparation, and four Senior Citizen ID cases: first ID,
transfer with a cancellation certificate, transfer without one, and lost ID.
Civil-record guidance explicitly distinguishes the local copy from a PSA-issued
certificate. Working-permit requirements remain a preparation list, not a claim
to reproduce the official application's complete checklist.

## State and privacy

`src/data/service-finder.ts` defines the questions and validates reachable answer
paths. Only option IDs are stored in `betterbacoor:service-finder:v1`. No names,
birthdates, documents, or application details are requested. Invalid stored
answers are discarded after the last valid choice. Storage failures leave the
current visit usable and show a message.

Residents can change the last answer or start again. Changing languages preserves
answers. Results use the existing checklist keys, so progress carries between
the finder and standalone guide. Starting again clears the finder choices only.
Printing includes the selected application type, checklist, steps, fees, office,
and source references. It does not submit an application or determine eligibility.

## Senior Citizen ID source review — 2026-09-17

- Official Charter: <https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf>
- Printed pages 28.2–28.5, PDF pages 657–660; all four pages extracted and visually reviewed.
- A fresh download matched the preserved PDF SHA-256:
  `32d040e308ad0b4988c28ba5e351cd4076bd7d17d6bc9fd0b1e2cff33e5070ed`.
- Contact source: <https://bacoor.gov.ph/city-and-units-heads/> lists
  `osca@bacoor.gov.ph` for OSCA.

The guide preserves the 60+ age and six-month residence description, accepted
identity-document alternatives, dual-citizenship and representative conditions,
and separate lost-ID requirements. Transfer routes are separate so residents are
not asked to complete both alternatives. No unsupported benefit or discount
claims were added.

The Charter lists no fee for the service steps and 35 minutes for the timed steps.
ID capture explicitly depends on MIS processing time. The guide therefore does
not promise a 35-minute visit and distinguishes possible supporting-document,
notarization, and postage costs from the ID service itself.

## Maintenance and verification

Update the source citations and both languages when requirements change. Update
the guide verification date only after checking the source; it versions checklist
progress. Keep option IDs stable unless the corresponding meaning changes.

Tests exercise every reachable result, invalid persisted choices, storage failures,
renewal selection, mutually exclusive transfer lists, lost-ID printing in Filipino,
checklist persistence, source references, and accessibility. Run `npm run check`.
