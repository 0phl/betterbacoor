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

## Secrets

No API key, password, token, certificate, private key, or connection string belongs in this repository. If a secret is committed, treat it as compromised, rotate it first, and then remove it from history.

## Dependencies

CI audits production dependencies at high severity. Dependency alerts still require engineering review; an automatic upgrade must not be merged solely because a bot opened it.
