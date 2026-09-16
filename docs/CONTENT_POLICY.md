# Content Policy

## Trust rule

A civic record is publishable only when its government source has been inspected and its source URL, title, location, and review date are recorded. Residents see the official destination and an expandable Source section. Review dates are maintenance metadata; reviewer attribution is recorded in Git history rather than displayed on the website.

The September 2026 community redesign removes reviewer attribution and GitHub correction prompts from civic content. The owner subsequently authorized a creator GitHub link in the footer only. Keep verification and freshness enforcement in the content pipeline.

Required fields are enforced by [`schemas/resource.schema.json`](../schemas/resource.schema.json).

## Source priority

Published destination and source URLs must use an HTTPS Philippine government domain (`gov.ph` or a subdomain). Use the strongest available source:

1. current City of Bacoor publication or transaction system;
2. current national government publication that governs the service;
3. a signed or formally published document hosted on a government domain.

Official social posts and secondary sources may be used as research leads, but the current resource schema does not represent them as verified publication sources. Do not label a record “Source checked” from one of those sources. Extending this policy requires an explicit source type, conflict notes, and corresponding schema and UI changes. A search-engine snippet is never a source.

## Conflicts and missing links

Never silently select between conflicting government sources. Open a correction or research issue and seek confirmation before publishing a definitive instruction. The current schema has no conflict-note field, so unresolved records must not be published as verified.

When a page does not link the expected information, write:

> Not linked on the government page when checked.

Do not write “not published” unless the responsible authority confirms that fact.

## Review classes

| Class     | Examples                                                           | Maximum interval |
| --------- | ------------------------------------------------------------------ | ---------------- |
| Ordinary  | portal, office directory landing page, disclosure index            | 180 days         |
| High      | service requirements, transaction destinations, health directories | 90 days          |
| Emergency | hotlines, evacuation instructions, urgent response guidance        | 30 days          |

Emergency records live in `content/emergency.json`, separately from the government-only resource catalog. The validator enforces a 30-day review interval, HTTPS source types, unique references, and agreement between displayed phone digits and callable destinations. They require a second source proofreading pass before release; retain evidence and conflict decisions in `docs/EMERGENCY_HUB.md`.

For this collection, explicitly labeled humanitarian sources from the Philippine Red Cross and American Red Cross may support emergency assistance and general safety guidance. They are not government offices. Do not reuse foreign response numbers as Philippine contacts. Guidance is a concise editorial summary; sources are linked in context. Never promise a connected line, available ambulance, open shelter, safe road, or live hazard status without a current authoritative feed. Source review does not mean a test call was made.

## Content maintenance

A content change should record:

- the affected record;
- what appears wrong or stale;
- the supporting government source; and
- the date the source was checked.

High-impact corrections receive priority. Preserve the reason for the change in Git history.

There is currently no public BetterBacoor correction form. Do not advertise an unavailable contact channel or require residents to use GitHub. Residents with service or application questions should be directed to the responsible government office. Maintainers can continue using repository issues internally. The prelaunch indexing setting remains a separate deployment decision.

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
