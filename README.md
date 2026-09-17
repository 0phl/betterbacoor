# BetterBacoor

BetterBacoor is an **unofficial, community-run civic-information project** for Bacoor, Cavite. It helps residents find the right government source, service, office, directory, or public record without pretending to replace the City of Bacoor's systems.

> BetterBacoor is not operated by or endorsed by the City Government of Bacoor. Applications, payments, and authoritative records remain on the linked government systems.

## Product promise

> Find the right Bacoor service, requirements, office, government link, and contact in under one minute.

The portal provides three on-site service guides, personal preparation checklists, five office contacts, a native Citizen’s Charter reader, 16 sourced government links, and BetterGov community tools. Business permits include separate new and renewal checklists. See the [community portal implementation notes](docs/COMMUNITY_PORTAL.md) and [ecosystem research report](docs/ECOSYSTEM_REVIEW.md).

## Foundation architecture

- React and TypeScript
- Vite static build
- Tailwind CSS and Kapwa, based on the BetterLocalGov starter
- Source-controlled JSON civic records
- JSON Schema validation with Ajv
- Client-side search; no search server
- No resident accounts, payments, uploads, or private complaint intake
- No application database or CMS

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/CONTENT_POLICY.md`](docs/CONTENT_POLICY.md), [`docs/DESIGN.md`](docs/DESIGN.md), and [`docs/BRAND.md`](docs/BRAND.md).

## Run locally

Requirements:

- Node.js 22.13 or newer (or Node.js 24)
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
- internal verification date; and
- risk-based review interval.

The public interface shows source links and government destinations. Personal reviewer attribution, review dates, and GitHub correction prompts are intentionally absent from civic content. A creator GitHub link is available in the footer at the owner's request. Authorship remains traceable in Git history.

Do not silently choose between conflicting government sources. Document the conflict and seek confirmation before publishing a definitive statement.

## Git workflow

Small, reversible documentation fixes may be committed directly after checks pass. Meaningful maintainer work uses a short-lived feature branch. Pushes to every branch run CI; the maintainer reviews the branch locally and explicitly approves it before it is integrated into linear `main` and deleted.

A pull request is optional for solo maintainer work. It is normally reserved for external contributions or used when the maintainer specifically requests one. Contributor pull requests may be squash merged when one coherent commit keeps the project history clearer.

## Corrections and contributions

Contributions must include an authoritative source and verification date. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting content. Repository issues remain available for maintainer work; the resident-facing site does not direct people to GitHub or advertise a public correction form.

## Status

Foundation work is in progress. The inherited starter is not deployed, the public domain is not connected, and builds default to `noindex` until launch review.

## Credits

BetterBacoor started from the [BetterLocalGov](https://github.com/iyanski/betterlocalgov) starter and is inspired by the [BetterGov.ph](https://bettergov.ph/) BetterLGU community. See [`ACKNOWLEDGMENTS.md`](ACKNOWLEDGMENTS.md) for the source snapshot and full project lineage.

## License and provenance

New original software contributions use [MIT](LICENSE-MIT), starting with the commit that introduces this policy. Earlier CC0 releases and the inherited starter remain available under [CC0 1.0](LICENSE-CC0); those permissions are not withdrawn. Original non-software civic content continues under CC0 where we hold the relevant rights. Government documents and third-party material retain their own terms.

See [the licensing scope](docs/LICENSING.md), [license index](LICENSE), and [credits](ACKNOWLEDGMENTS.md). The transferred repository history and original CC0 text are preserved.
