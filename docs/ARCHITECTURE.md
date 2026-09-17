# Architecture

## Application model

BetterBacoor is a static React/TypeScript application built by Vite, with Tailwind CSS and Kapwa. Civic records are reviewed in source control and bundled into the client. It has no application server, resident database, CMS, or server-backed search.

Residents can read guidance, prepare checklists, search local information, and follow official transaction links. BetterBacoor does not accept government applications, payments, uploaded documents, or incident reports.

## Routes

| Route                         | Purpose                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `/`                           | Homepage and quick tasks                                                                |
| `/services`, `/services/find` | Service catalog and guided finder                                                       |
| `/services/:slug`             | Business permit, civil registry, working permit, or Senior Citizen ID guide             |
| `/my-barangay`                | Saved barangay choice, local information, emergency contacts, and checklist progress    |
| `/local-services?section=…`   | Citywide schools, health, barangay profiles, garbage collection, and assistance centers |
| `/directories`                | Citywide discovery, local places, and office contacts                                   |
| `/search?q=…`                 | Combined search of official resources and on-site information                           |
| `/charter?page=…`             | On-demand reader for the preserved official PDF                                         |
| `/emergency`                  | Contacts, safety guidance, and offline-save controls                                    |
| `/transparency`, `/about`     | Public-record links and project explanation                                             |

`src/App.tsx` defines routes. `RouteChangeManager` focuses the main landmark and resets scrolling on pathname changes; query-only changes preserve the user's position. Hash links target their section. Unknown routes or guide slugs show a missing-page view.

## Content and validation

| Content                                   | Runtime location                                               | Validation / maintenance                                                            |
| ----------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Government-resource catalog               | `content/resources.json` → `src/data/resources.ts`             | JSON Schema and `scripts/validate-content.mjs`                                      |
| Local places and offices                  | `content/local-directory.json`, `content/office-contacts.json` | Source references, review dates, and contact checks                                 |
| Emergency information                     | `content/emergency.json`                                       | Dedicated source rules, phone normalization, and 30-day freshness                   |
| Barangay profiles, health, schools, waste | `content/barangay-*.json` → `src/data/barangay-information.ts` | `scripts/validate-barangay-information.mjs`; manual source review remains necessary |
| Assistance centers                        | `src/data/barangay-information.ts`                             | Ordinance citation and explicit conflict notes                                      |
| Service guides and finder                 | `src/data/guides.ts`, `senior-guide.ts`, `service-finder.ts`   | Typed editorial data, source citations, behavior tests, and review notices          |
| Charter provenance                        | `content/documents.json`                                       | Original URL, edition, page count, and SHA-256 check                                |

The barangay validator is called by the main content validator. It checks coverage, population totals, selected publisher hosts, contact formats, school emails, and garbage-source associations. It does not apply the resource catalog's age thresholds to every barangay dataset. A passing check is not evidence of a fresh source inspection.

The weekly freshness workflow reruns content validation and opens or updates an issue for failures. It does not crawl publishers, test telephone connections, or update data automatically.

## Search and browsing

`src/data/local-discovery.ts` derives local results from the same datasets used by the feature pages. Global search combines those records with the official resource catalog, including result counts, categories, pagination, and empty states. Links carry the selected section, query, service, or barangay into the corresponding on-site view.

Original garbage-table images are not full-text indexed. Only reviewed headings and transcribed routes are searchable. Browsing citywide information never changes the saved My Barangay choice.

## Local state and offline access

Browser localStorage holds language preference, a validated barangay ID, service-finder choices, and checklist ticks. Checklist keys include the guide, variant, and content version. Only validated item indexes are counted; updates to requirement meanings need a version change. Storage failures must not prevent reading guidance. Nothing is synchronized to a BetterBacoor server.

The emergency service worker caches a standalone guide only after an explicit save. The guide includes its language and source-snapshot date. Failed refreshes preserve the previous saved copy; removing it clears only the dedicated cache. This does not make the full app, remote images, or source websites available offline. See [offline notes](OFFLINE_AND_DIRECTORY.md).

## PDF reader

The reader lazy-loads PDF.js and its worker after the resident chooses to load the document. It renders the unmodified local Charter PDF, using range requests where supported, and offers extracted text without claiming correct table reading order.

During navigation, the current canvas and text stay mounted until the next canvas and text are ready. Cancelled or outdated renders cannot replace the latest requested page. The text disclosure names its displayed PDF page. A render failure preserves the previous readable page while showing an error. This avoids the temporary height collapse that previously exposed the footer.

## Hosting

Browser routes need explicit host rewrites to `index.html`. `vercel.json` and `public/_redirects` cover the supported page routes while leaving assets as real files. The build also includes a static `404.html`; host-specific behavior must be verified. The public application permits search indexing, while offline snapshots and the 404 page remain non-indexable. See [deployment notes](DEPLOYMENT.md) for direct-route and release checks.

## Upstream lineage

The transferred repository started from [BetterLocalGov commit b807a8b](https://github.com/iyanski/betterlocalgov/commit/b807a8bee0a005049e3d3492413d1ab03be7cfa1), imported as a new root commit rather than a GitHub fork. Parts of the tooling setup remain from that starter. Its CC0 dedication is preserved; new original software contributions follow the [MIT policy](LICENSING.md). See [credits](../ACKNOWLEDGMENTS.md).
