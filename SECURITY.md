# Security Policy

## Scope

BetterBacoor is designed as a static civic-information site. It must not collect resident accounts, payments, identity documents, application records, or private complaints.

## Reporting a vulnerability

Do not open a public issue for a vulnerability that could expose data, credentials, deployment access, or users. Report it privately through the repository’s [GitHub security advisory form](https://github.com/0phl/betterbacoor/security/advisories/new).

Include:

- affected URL, file, or dependency;
- reproduction steps;
- likely impact; and
- a safe remediation suggestion, if known.

Use fictional data in reproductions. Do not send real resident records, active credentials, or another person's private information. If the private advisory form is unavailable, do not put vulnerability details in a public issue; ask the maintainers to enable private reporting without disclosing the exploit. No guaranteed response time is promised.

## Supported version

Security maintenance targets the current `main` branch. Older snapshots are not separately maintained release lines. If reporting a deployed issue, include the deployment URL and commit or approximate date if known.

## Browser data and offline content

The application stores language choice, a barangay selection, checklist ticks, and service-finder choices in browser storage. A resident may explicitly save emergency essentials using the browser's cache and service worker. This is local preference/preparation data, not a submitted government application. Do not add personal records to these storage structures.

External links and remotely loaded source images are requests to their respective providers. Static hosting may also have access logs governed by the hosting provider; the absence of an application database is not a claim that no network metadata exists.

## Secrets

No API key, password, token, certificate, private key, or connection string belongs in this repository. If a secret is committed, treat it as compromised, rotate it first, and then remove it from history.

## Dependencies

CI audits production dependencies at high severity. Dependency alerts still require engineering review; an automatic upgrade must not be merged solely because a bot opened it.
