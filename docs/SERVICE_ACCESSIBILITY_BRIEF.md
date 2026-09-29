# Citywide service access: implementation brief

## Goal

Help residents across Bacoor find the correct service, understand how to prepare, and reach the responsible official channel. Extend the existing guide and finder patterns; do not create a parallel application system.

## Why this work

BetterBacoor already provides a searchable resource catalog, English and Filipino support, a guided finder, printable locally saved checklists, barangay and health/school information, garbage schedules, emergency guidance, and the 2026 Citizen’s Charter reader. The finder currently routes to business permits, local civil-record copies, working permits, and four Senior Citizen ID cases.

The city publishes more services and application routes than those four guides cover. The Citizen Portal advertises e-SBR and PWD ID applications, while city announcements document scholarship opportunities and outreach services. The 2026 Citizen’s Charter is the starting source for stable steps and requirements. Time-sensitive opportunities must remain linked to current official notices rather than being presented as evergreen eligibility or application instructions.

## Resident needs in scope

Add guided preparation for services across these groups, subject to an inspected current Bacoor source:

- Seniors, PWDs, and solo parents: ID applications, renewals, replacement, and verified benefits or support routes.
- Families and people seeking assistance: medical, burial, financial, and disaster-related assistance, with clear eligibility caveats and referral contacts.
- Students and job seekers: scholarships, ALS and education support, PESO services, job fairs, and employment programs.
- Workers and employers: health certificates and working permits, including current online-only requirements.
- Business owners and property applicants: business permits plus building/zoning, local tax, and property-related routes.
- Everyday community needs: health services, civil records, waste schedules, barangay and office contacts, and emergency help.

This is a coverage goal, not a commitment to publish a guide for every item at once. Add only routes supported by an authoritative, inspectable source and maintainable review schedule.

## Initial increment

1. Review the current 2026 Citizen’s Charter and current official transaction pages for the candidate services below. Record exact URLs, document edition/date, printed page and PDF page (or exact page section), and review date.
2. Add three guide families using the existing `ServiceGuide`/`GuideVariant` and `seniorGuide` patterns:
   - PWD ID and Solo Parent ID: first application, renewal/transfer/replacement only when the current official source distinguishes them.
   - Social assistance: medical and burial assistance, preserving eligibility and referral conditions; do not imply guaranteed approval or a continuously open program.
   - Scholarship/jobseeker opportunities: begin with durable PESO and education-office contacts; keep specific openings and deadlines as dated official links.
3. Add finder options for those guides only where the choice materially changes the result. Keep the interaction short and route unsupported or ambiguous needs to the relevant official directory/contact.
4. Translate all resident-facing additions into Filipino alongside English.

Before starting implementation, confirm that these are current gaps by inspecting the latest `main` branch. Do not duplicate a guide or route already added after this brief was written.

## Resident journey and acceptance criteria

- A resident can discover the new routes from the service finder, service directory/search, and relevant home or My Barangay entry points without needing a BetterBacoor account.
- For every published guide, a resident can find: who may apply (when the source states it), what to prepare, where/how to apply, the next step, a responsible office contact, and a direct official application or information link when available.
- Fees and processing times are included only when explicitly supported by the current source, with caveats where the source describes dependencies or estimated processing.
- Each civic fact has an expandable, page-specific source reference and a visible verification date. Missing or conflicting details remain unspecified or are plainly described; contributors do not infer requirements.
- The checklist stores completion ticks locally only. No names, ID numbers, case details, health information, documents, or application submissions are collected by BetterBacoor.
- Official forms, payments, eligibility decisions, and applications remain on government systems. Clearly label BetterBacoor as unofficial and community-run.
- The English and Filipino pages expose equivalent steps, source notes, warnings, and external actions.
- The finder uses stable answer IDs, validates reachable paths, preserves valid progress and guide checklist state, and handles storage failures as described in `docs/SERVICE_FINDER.md`.
- Keyboard users can complete the journey, focus remains visible, controls have clear accessible names, and a narrow mobile layout works in both languages.

## Content and privacy requirements

Follow `docs/CONTENT_POLICY.md` and `CONTRIBUTING.md`. Inspect authoritative current Bacoor sources directly; search snippets and social posts are leads, not verification sources for the government-resource catalog. Preserve exact source locations and dates. High-impact eligibility, fees, deadlines, and phone details need a second proofreading pass. Review service requirements and transaction destinations at least every 90 days; record a new review date only after a real source check. Do not collect or test with real resident documents or personal cases.

Specific programs can open, close, or change. Show their announcement date and send residents to the issuing office or official application. Do not encode a temporary scholarship intake, benefit schedule, or assistance payout as a permanent city service without a durable official source.

## Likely files

- `src/data/guides.ts` and new focused guide data modules under `src/data/`
- `src/data/service-finder.ts`
- `src/pages/ServiceFinder.tsx`, `src/pages/ServiceGuide.tsx`, and service discovery entry points only as needed
- `src/i18n/fil.json`
- `src/data/guides.test.ts`, `src/pages/ServiceGuide.test.tsx`, and `src/pages/ServiceFinder.test.tsx`
- `docs/SERVICE_FINDER.md` and the relevant dated source-research note

Prefer the existing guide components and data model. Do not add an API, database, account system, new dependency, or an in-app application form for this work.

## Verification

- Add one focused regression test for every new guide result and finder path, including source links, Filipino rendering, printable output, and checklist key stability.
- Run `npm run check` and `npm audit --omit=dev --audit-level=high`.
- Manually verify English and Filipino on a narrow mobile viewport, keyboard-only navigation, external government handoffs, and the official source references.
- Capture dated source locations in the docs so a future contributor can recheck changes without redoing the research from scratch.

## Completion measure

For each selected service, a resident can answer these questions without guessing: “Is this the service I need?”, “What should I prepare?”, “Where do I go or apply?”, and “What do I do next?” Track guide coverage and source freshness; do not claim that BetterBacoor processing, eligibility, or service outcomes are guaranteed.

## Implemented first increment — 2026-09-29

Six preparation guides extend the existing finder, search, printing, and saved checklists: PWD ID, Solo Parent ID, medical assistance, burial assistance, education support, and PESO employment. PWD and category-dependent Solo Parent content clearly limits checklist completeness. Dated opportunities remain on official publishers. No new resident data is collected. See [source review](research/SERVICE_ACCESS_RESEARCH.md).
