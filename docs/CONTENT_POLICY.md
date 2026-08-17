# Content Policy

## Trust rule

A civic record is publishable only when a resident can see where it came from, when it was checked, who reviewed it, and how to request a correction.

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

The foundation does not yet publish emergency records. They require a second manual verification before release.

## Corrections

Each record links to a public correction form. A correction should include:

- the affected record;
- what appears wrong or stale;
- the supporting government source; and
- the date the source was checked.

High-impact corrections receive priority. Preserve the reason for the change in Git history.

The current prelaunch form is hosted on GitHub and requires an account. Resource links prefill the record title and ID. [A practical non-GitHub correction route](https://github.com/0phl/betterbacoor/issues/2) is required before removing `noindex` or launching publicly; until then, the account requirement must be disclosed wherever the form is linked.

## Privacy and safety

Do not collect or publish private resident data. Do not accept IDs, permits, health documents, application numbers, payment details, or private complaints. Public office contact information may be included only from a government source and with a verification date.

## Editorial voice

- Use plain language.
- Separate BetterBacoor explanations from government quotations.
- Do not imply endorsement.
- Do not use the city seal without written authorization.
- Link residents to the government transaction rather than recreating it.
