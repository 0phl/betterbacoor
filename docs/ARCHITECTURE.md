# Architecture

## Decision

BetterBacoor is a static-first React application built by Vite. Civic records are reviewed in source control and loaded into the client build. There is no application server, CMS, resident database, or server-backed search service in the foundation.

## Why

The MVP publishes public navigation and explanation, not transactions. A static design provides:

- a small attack surface;
- inexpensive hosting;
- cacheable low-bandwidth delivery;
- reviewable content diffs;
- easy rollback; and
- no store of resident data to protect.

## Upstream lineage

The canonical repository was transferred with a BetterLocalGov starter snapshot. Its history and CC0 dedication remain intact. The foundation selectively retains React, Vite, Tailwind, and Kapwa styling conventions while replacing inherited city content, routes, metadata, information architecture, and validation.

The unrelated admin/API branch is not part of the application architecture.

## Content path

```text
content/resources.json
  -> scripts/validate-content.mjs
  -> src/data/resources.ts
  -> client-side search and resource cards
```

The schema is [`schemas/resource.schema.json`](../schemas/resource.schema.json). CI rejects malformed, duplicate, future-dated, or stale records.

## Boundaries

BetterBacoor may explain and link to a transaction. It must not:

- accept a transaction itself;
- ask for credentials used by a government system;
- proxy payments or uploads;
- present copied records as authoritative; or
- introduce accounts or a database without a separate threat model and explicit decision.

## Routing and deployment

The application uses browser routing. Static hosts must send unknown paths to `index.html`; `_redirects` and `vercel.json` provide the current host-neutral and Vercel fallbacks. The domain remains disconnected until preview review is complete. Builds include a `noindex` directive during this phase; launch requires deliberately removing it and publishing a sitemap.
