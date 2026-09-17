# Content Policy

## Trust rule

A civic record is publishable only when its authoritative source has been inspected and its source URL, title, location, and review date are recorded in the relevant dataset or research notes. Each collection has its own permitted publishers and structure. Residents can follow the source; the government-resource cards use an expandable Source section. Reviewer attribution belongs in Git history rather than the public interface.

Do not add personal reviewer names or GitHub correction prompts beside civic records. The footer links to the project repository and contributor guide. Keep verification metadata and supported freshness checks in the content pipeline. Census reference years, publication dates, and offline information-snapshot dates remain visible where they help residents interpret the information.

The government-resource catalog uses [`schemas/resource.schema.json`](../schemas/resource.schema.json). Other collections use the content validators and rules below; do not assume that every dataset uses this schema.

## Source priority

For `content/resources.json`, published destination and source URLs must use an HTTPS Philippine government domain (`gov.ph` or a subdomain). Use the strongest available source:

1. current City of Bacoor publication or transaction system;
2. current national government publication that governs the service;
3. a signed or formally published document hosted on a government domain.

Official social posts and secondary sources may be research leads, but the resource-catalog schema does not accept them as its verification source. Collection-specific exceptions below must preserve publisher identity and provenance. Do not generalize one permitted domain to every dataset. A search-engine snippet is never a source.

### Local-information collections

- Population profiles use PSA publications and their census reference year. They are not current population estimates or inferred barangay boundaries.
- Health listings use PhilHealth's published program-specific lists, with source pages/rows and accreditation expiry. A listing does not guarantee an appointment, available treatment, or eligibility.
- School listings use the Bacoor Schools Division's published directories at `www.depedbacoorcity.ph`. Facebook links are included only when linked by those directories; they are not independently verified live feeds. Do not infer a catchment area or campus address from the school name.
- Garbage tables use City of Bacoor publications. Keep original table URLs, dates, and coverage associations. Only transcribed, proofread rows may be represented as searchable schedules; loading an image does not make all its text searchable.
- Assistance centers use the cited Bacoor Sangguniang Panlungsod ordinance at `bacoorcitysp.com`. Preserve amendment dates and conflicting assignments. A published location does not establish which center can handle a resident's case today.

See [My Barangay](MY_BARANGAY.md) and its research reports for exact evidence, omitted contacts, missing coverage, and known conflicts. `scripts/validate-barangay-information.mjs` validates supported structure and provenance fields; it does not automatically enforce all freshness intervals below or inspect live publishers.

## Conflicts and missing links

Never silently select between conflicting government sources. Record the disagreement and avoid definitive instructions until it is resolved. The resource-catalog schema has no conflict-note field, so unresolved catalog records must not be published as verified. Local-information views can show explicitly labeled conflicts, such as disputed assistance-center coverage, without choosing a side or routing residents automatically.

When a page does not link the expected information, write:

> Not linked on the government page when checked.

Do not write “not published” unless the responsible authority confirms that fact.

## Review classes

| Class     | Examples                                                           | Maximum interval |
| --------- | ------------------------------------------------------------------ | ---------------- |
| Ordinary  | portal, office directory landing page, disclosure index            | 180 days         |
| High      | service requirements, transaction destinations, health directories | 90 days          |
| Emergency | hotlines, evacuation instructions, urgent response guidance        | 30 days          |

These are maintenance targets. Automated age checks cover the supported resource, contact, and emergency collections; service guides also show overdue notices. Barangay census, health, school, waste, and assistance records still need manual review of edition, coverage, and conflicts. Never treat a passing build as proof that every dataset was reviewed within these intervals.

Emergency records live in `content/emergency.json`, separately from the government-only resource catalog. The validator enforces a 30-day review interval, HTTPS source types, unique references, and agreement between displayed phone digits and callable destinations. They require a second source proofreading pass before release; retain evidence and conflict decisions in `docs/EMERGENCY_HUB.md`.

For this collection, explicitly labeled humanitarian sources from the Philippine Red Cross and American Red Cross may support emergency assistance and general safety guidance. They are not government offices. Do not reuse foreign response numbers as Philippine contacts. Guidance is a concise editorial summary; sources are linked in context. Never promise a connected line, available ambulance, open shelter, safe road, or live hazard status without a current authoritative feed. Source review does not mean a test call was made.

## Content maintenance

The onsite local-place collection lives in `content/local-directory.json`. It uses government-only sources, per-source table locations and review dates, and a maximum 90-day review interval. Its validator checks unique IDs, source references, and phone display/dial agreement. Missing area codes remain unspecified and are not turned into call links. See [offline and directory notes](OFFLINE_AND_DIRECTORY.md) for transcription evidence and limitations.

Offline emergency copies retain the original source snapshot date even when saved again. A saved date is a device-storage timestamp, not evidence of a newer source review. Both dates are shown where they help residents assess an offline copy; reviewer attribution remains absent.

A content change should record:

- the affected record;
- what appears wrong or stale;
- the supporting government source; and
- the date the source was checked.

High-impact corrections receive priority. Preserve the reason for the change in Git history.

There is no in-app correction or case-submission form. Contributors can use the repository's public correction, bug, and idea forms, but residents must not be required to use GitHub to read civic information. Service or application questions belong with the responsible government office. The prelaunch indexing setting remains a separate deployment decision.

## Community tools

BetterGov projects may be linked in a clearly labeled community-tools section. They are independent tools, not government sources, and must not be inserted into the government-only resource collection. Do not infer a working API, supported filter, reuse license, live dataset, or Bacoor coverage from a project name alone. Verify those before integrating data or code. Outbound links are the initial integration.

## Privacy and safety

Do not collect or publish private resident data. Do not accept IDs, permits, health documents, application numbers, payment details, or private complaints. Public office contact information may be included only from a government source and with a verification date.

## Editorial voice

On-site service guides are editorial summaries with page-specific government sources, internal review dates, and explicit limits for conditional requirements, fees, and timelines. Checklists store only completion ticks locally, never personal details or application documents. The Charter reader serves a byte-for-byte public document copy with its original government URL and a recorded SHA-256 digest; it is not a mirrored government transaction portal. See `content/documents.json` and `docs/COMMUNITY_PORTAL.md`.

- Use plain language.
- Separate BetterBacoor explanations from government quotations.
- Do not imply endorsement.
- Do not use the city seal without written authorization.
- Link residents to the government transaction rather than recreating it.
