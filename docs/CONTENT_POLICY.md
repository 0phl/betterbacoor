# Content Policy

## Trust rule

A civic record is publishable only when a resident can see where it came from, when it was checked, who reviewed it, and how to request a correction.

Required fields are enforced by [`schemas/resource.schema.json`](../schemas/resource.schema.json).

## Source priority

Use the strongest available source:

1. current City of Bacoor publication or transaction system;
2. current national government publication that governs the service;
3. signed or formally published document;
4. an official government social post only when no durable page exists; or
5. a secondary source clearly labeled as secondary.

A search-engine snippet is not a source.

## Conflicts and missing links

Never silently select between conflicting government sources. Record the conflict and seek confirmation before publishing a definitive instruction.

When a page does not link the expected information, write:

> Not linked on the government page when checked.

Do not write “not published” unless the responsible authority confirms that fact.

## Review classes

| Class     | Examples                                                           | Maximum interval |
| --------- | ------------------------------------------------------------------ | ---------------- |
| Ordinary  | portal, office directory landing page, disclosure index            | 180 days         |
| High      | service requirements, transaction destinations, health directories | 90 days          |
| Emergency | hotlines, evacuation instructions, urgent response guidance        | 30 days          |

The foundation does not yet publish emergency records. They require a second manual verification before release.

## Corrections

Each record links to a public correction form. A correction should include:

- the affected record;
- what appears wrong or stale;
- the supporting government source; and
- the date the source was checked.

High-impact corrections receive priority. Preserve the reason for the change in Git history.

## Privacy and safety

Do not collect or publish private resident data. Do not accept IDs, permits, health documents, application numbers, payment details, or private complaints. Public office contact information may be included only from a government source and with a verification date.

## Editorial voice

- Use plain language.
- Separate BetterBacoor explanations from government quotations.
- Do not imply endorsement.
- Do not use the city seal without written authorization.
- Link residents to the government transaction rather than recreating it.
