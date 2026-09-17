# Contributing to BetterBacoor

Help make everyday information easier to use for the Bacoor community. Contributions are welcome in source research, writing, Filipino translation, design, accessibility, testing, and code.

## Choose a starting point

- **Incorrect information:** use the correction form and include the authoritative source and date checked.
- **A bug:** describe what you expected, what happened, and how to reproduce it. Include the browser, device size, and language if relevant.
- **An idea:** explain the resident's need and any data sources or maintenance it would require. Discuss large changes before implementing them.
- **A small improvement:** a focused pull request is welcome for a clear fix, translation, or documentation correction.

[Open an issue](https://github.com/0phl/betterbacoor/issues/new/choose). These public forms require GitHub. Never include IDs, application numbers, medical records, credentials, payment information, or private resident details. For sensitive vulnerabilities, use the [security policy](SECURITY.md).

Treat other contributors respectfully. Review the work and its evidence, give specific feedback, and avoid personal attacks. This repository is not a government complaint or emergency intake channel.

## Set up your fork

1. Fork [0phl/betterbacoor](https://github.com/0phl/betterbacoor) on GitHub.
2. Clone your fork and enter the project directory.
3. Use Node.js 22.13+ on the Node 22 line, or Node 24, with npm 10+.

```bash
git switch -c feat/short-description
npm ci
npm run dev
```

No API keys, database, or environment file are required. The development server prints its local URL. The [README](README.md) describes the main features and [documentation index](docs/README.md) points to implementation notes.

## Before changing civic information

1. Read the [content policy](docs/CONTENT_POLICY.md) and identify the collection you are updating. Collections have different source rules; the government-resource schema is not the schema for every dataset.
2. Inspect the original publication. Record its exact URL, title, date or edition, PDF page or table row, and the date you checked it. Search snippets and copied contact lists are not enough.
3. Keep missing values missing. Do not invent an area code, opening time, fee, address, service coverage, or Facebook page association.
4. Preserve conflicting evidence. Add a clearly scoped limitation where the collection supports it; do not turn uncertainty into a definitive instruction.
5. Proofread numbers, callable destinations, requirements, fees, and timing against the source. Emergency changes need a separate source-proofreading pass. Say whether a number was publication-checked or actually test-called.
6. Update English and Filipino together. Keep source names, official documents, contact details, and conditions intact.
7. Advance a review date only after a real source review. Passing a validator is not a source review.

Authorship belongs in Git history. Do not add personal reviewer names or GitHub correction prompts beside civic records. The footer's contribution links are separate from the resident's service journey.

## Find the right files

| Change                                   | Start here                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| Government resources                     | `content/resources.json`, `schemas/resource.schema.json`                                      |
| Service procedures or finder paths       | `src/data/guides.ts`, `src/data/senior-guide.ts`, `src/data/service-finder.ts`                |
| Emergency contacts and guidance          | `content/emergency.json`, [emergency notes](docs/EMERGENCY_HUB.md)                            |
| Barangay and health/school/waste records | `content/barangay-*.json`, `content/local-directory.json`, [My Barangay](docs/MY_BARANGAY.md) |
| Office contacts                          | `content/office-contacts.json`                                                                |
| Search discovery                         | `src/data/local-discovery.ts`, `src/data/search.ts`                                           |
| Translation                              | `src/i18n/fil.json`, [localization](docs/LOCALIZATION.md)                                     |
| Charter copy or reader                   | `content/documents.json`, `src/components/PDFDocument.tsx`                                    |
| Layout or branding                       | [design](docs/DESIGN.md), [brand guide](docs/BRAND.md)                                        |

For checklist changes, review content-version keys: reusing a requirement index for a different requirement must not make an old saved tick apply to the new item. Never submit resident documents to test a workflow. Use fictional, non-sensitive examples.

## Check your change

```bash
npm run format
npm run check
npm audit --omit=dev --audit-level=high
```

Formatting hooks run on staged files. The full check covers formatting, lint, tests, content and translation validation, TypeScript, and the production build. The audit matches CI's production-dependency threshold. Do not bypass a failure by weakening validation or changing a source-review date without checking the source.

For interface changes, also check a narrow mobile viewport, keyboard navigation, focus, and both languages. Automated accessibility checks do not establish full accessibility conformance. For route or hosting changes, refresh the route directly in a production preview or hosting preview; Vite's development fallback can hide missing hosting rules.

Add or update regression tests when behavior changes. Pure wording and documentation edits generally need proofreading, working links, and the applicable validators rather than new tests.

## Open a pull request

Keep the title and commit messages short. Explain the user-visible problem, the change, relevant sources, and the checks you ran. Attach screenshots for layout changes when useful. If a check could not run, explain why.

External contributors should target `main` with a focused pull request. CI must pass before merging. Maintainers use short-lived branches for meaningful work; the project owner can authorize a reviewed fast-forward merge without a separate pull request. Do not push directly to the canonical repository unless you have maintainer authorization.

## Contribution licenses

New original software contributions are accepted under [MIT](LICENSE). Original non-software civic guides and dataset contributions continue under [CC0](LICENSE-CC0), where the contributor holds the relevant rights. Existing CC0 releases keep their permissions. Preserve third-party terms and source notices; contribute only material you have the right to offer under the applicable terms. See [licensing scope](docs/LICENSING.md).
