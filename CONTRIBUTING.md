# Contributing to BetterBacoor

BetterBacoor welcomes corrections, source improvements, accessibility fixes, and maintainable civic-information features.

## Before changing civic information

1. Prefer a City of Bacoor page, published charter, ordinance, memorandum, or government transaction system.
2. Record the exact source URL, title, page or edition, date checked, and reviewer.
3. If two government sources conflict, describe the conflict. Do not silently choose one.
4. Use “Not linked on the government page when checked” rather than claiming that information was never published.
5. Do not submit private resident information, credentials, application records, IDs, or uploaded documents.
6. Do not copy emergency contact details without a fresh, stricter review.

Read [`docs/CONTENT_POLICY.md`](docs/CONTENT_POLICY.md) for the full policy.

## Development workflow

For meaningful work:

```bash
git switch -c feat/short-description
npm ci
npm run check
```

Open a pull request with a focused scope and complete the source checklist. Maintainer-authored pull requests are normally rebased and merged, preserving their reviewed commits on a linear `main` history. Pull requests from other contributors may be squash merged when one coherent commit keeps the project history clearer.

The maintainer may commit tiny, reversible documentation fixes directly after running the relevant checks. Pull requests are a risk-control tool, not a requirement for every typo.

## Pull-request expectations

- Keep the change focused.
- Explain why the change is needed.
- Include source evidence for civic claims.
- Add or update tests when behavior changes.
- Confirm mobile and keyboard behavior for interface changes.
- Never commit secrets or private data.

## Local checks

```bash
npm run check
npm audit --omit=dev --audit-level=high
```

CI must pass before a meaningful change is merged.
