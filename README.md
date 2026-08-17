# BetterBacoor

BetterBacoor is an **unofficial, community-run civic-information project** for Bacoor, Cavite. It helps residents find the right government source, service, office, directory, or public record without pretending to replace the City of Bacoor's systems.

> BetterBacoor is not operated by or endorsed by the City Government of Bacoor. Applications, payments, and authoritative records remain on the linked government systems.

## Product promise

> Find the right Bacoor service, requirements, office, government link, and contact in under one minute.

The foundation currently provides a small set of checked links. Plain-language service guides will be added only after page-level review of authoritative material.

## Foundation architecture

- React and TypeScript
- Vite static build
- Tailwind CSS with selected BetterLocalGov/Kapwa lineage
- Source-controlled JSON civic records
- JSON Schema validation with Ajv
- Client-side search; no search server
- No resident accounts, payments, uploads, or private complaint intake
- No application database or CMS

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/CONTENT_POLICY.md`](docs/CONTENT_POLICY.md).

## Run locally

Requirements:

- Node.js 22
- npm 10 or newer

```bash
npm ci
npm run dev
```

The development server prints its local address.

## Quality checks

```bash
npm run check
npm audit --omit=dev --audit-level=high
```

`npm run check` verifies formatting, lint, content schemas, banned starter language, tests, accessibility rules available in jsdom, TypeScript, and the production build.

## Civic records

Records live in [`content/resources.json`](content/resources.json) and must validate against [`schemas/resource.schema.json`](schemas/resource.schema.json). Every record includes:

- direct government destination;
- source title and URL;
- source page or edition;
- verification date;
- reviewer;
- risk-based review interval; and
- public correction route.

Do not silently choose between conflicting government sources. Document the conflict and seek confirmation before publishing a definitive statement.

## Solo-maintainer Git workflow

Small, reversible documentation fixes may be committed directly after checks pass. Foundation changes, dependencies, schemas, deployment configuration, and high-risk civic information use a short-lived branch and pull request.

Pull requests are **squash merged**. Working commits can stay useful while developing, but `main` receives one coherent commit named after the completed change. No self-approval ritual is required.

## Corrections and contributions

Use the [correction form](https://github.com/0phl/betterbacoor/issues/new?template=correction.yml) for inaccurate or outdated information. Contributions must include an authoritative source and verification date. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting content.

## Status

Foundation work is in progress. The inherited starter is not deployed, the public domain is not connected, and builds default to `noindex` until launch review.

## License and provenance

The repository remains under the CC0 1.0 dedication in [`LICENSE`](LICENSE). The transferred repository history is preserved. See [`ACKNOWLEDGMENTS.md`](ACKNOWLEDGMENTS.md) for upstream lineage.
