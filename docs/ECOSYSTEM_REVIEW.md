# BetterBacoor: ecosystem review and community redesign

Research date: September 16, 2026. This is a homepage/UI review and integration assessment, not a claim that every service transaction or repository has been audited.

## Coverage

- Inventoried **108 registered LGU projects**, including **51 listed public URLs** and 57 entries without a listed website. Every listed URL received an HTTP check and browser inspection; two returned hosting 404 pages and one stopped at a browser-check interstitial. Launching-soon and work-in-progress pages are identified individually.
- Reviewed rendered homepage structure and navigation across available sites, with screenshot comparisons of BetterGov, Calauan, Los Baños, General Santos, and Mapandan. Nearby Cavite portals were also inspected for task navigation and information hierarchy.
- Reviewed the **17-project BetterGov catalog**, inventoried **36 public repositories** in its GitHub organization, and read documentation for the most relevant implementation candidates.
- The deployed directory and its repository snapshot differ. Counts above come from the repository snapshot; the directory homepage's “active” count was not used as a completeness measure.

The [complete LGU inventory](research/LGU_INVENTORY.md) provides a row for every registered project, with its URL, repository, and an original assessment. [Repository metadata](research/bettergov-repositories.json) records the observed license and branch information. Sources: [Better LGU](https://lgu.bettergov.ph/), [directory repository](https://github.com/jmacj/better-lgu-directory), [BetterGov projects](https://about.bettergov.ph/projects/), and [BetterGov GitHub organization](https://github.com/bettergovph).

## What makes the strongest interfaces useful

| Reference                                                                                          | Useful observation                                                      | BetterBacoor application                                                                      |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [BetterGov](https://bettergov.ph/)                                                                 | Recognizable blue identity, service search, citizen-oriented categories | Keep the family palette and prioritize search                                                 |
| [Calauan](https://bettercalauan.org/) and [Solano](https://bettersolano.org/)                      | A separate search surface and clear service categories                  | Pair the introduction with an actionable task panel                                           |
| [Los Baños](https://betterlb.org/)                                                                 | Services and accountability tools have distinct entry points            | Separate government resources from community research tools                                   |
| [General Santos](https://bettergensan.org/)                                                        | Everyday needs, jobs, and locally relevant tools                        | Add employment resources and useful city contacts                                             |
| [Cabanatuan](https://bettercabanatuan.org/) and [Baguio](https://betterbaguio.org/)                | Plain-language task discovery                                           | Use familiar labels and short descriptions                                                    |
| [Kabugao](https://betterkabugao.org/)                                                              | Restrained hierarchy and direct task entry                              | Reduce competing badges and maintenance metadata                                              |
| [Mapandan](https://www.bettermapandan.org/) and [Trece Martires](https://bettertrecemartires.org/) | Spending and infrastructure receive substantial attention               | Keep transparency prominent; link real records before attempting local dashboards             |
| [Cavite City](https://bettercavitecity.org/)                                                       | App-style mobile navigation and everyday tools                          | Make mobile tasks easy; do not add accounts or live-value widgets without an operational need |

The opportunity is a clearer, more dependable Bacoor experience: a recognizable identity, quick routes to useful information, source transparency, and no unfinished controls. A longer homepage or a larger collection of widgets does not establish quality. Future quality comparisons should measure task completion, mobile usability, accessibility, source accuracy, and resident feedback.

## Implemented in this redesign

- Original logo retained at **64px mobile / 80px desktop**, compared with the previous 36px navbar mark. No emblem paths or colors changed.
- Royal-blue hero, yellow accent, white task panel, six resident-oriented topics, and a clear Citizen's Charter entry point.
- Simpler resource cards, visible destination domains, and expandable original-source information.
- Search with resource-type filtering, useful empty states, and URL-backed search terms.
- GitHub correction calls to action, personal reviewer names, and public “last checked” dates removed from home, cards, about, and footer. Internal freshness validation remains; reviewer identity and correction URLs are removed from bundled records.
- **16 government resource links**, up from eight, plus **five published city-office contacts**.
- Three working BetterGov destinations: transparency, its procurement archive, and the open-data portal. They are labeled as independent community tools, rather than government services or locally hosted integrations.
- Community-oriented About copy, mobile overflow fixes, and route-focus handling that respects the initial page load.

## BetterGov project catalog: fit for Bacoor

This table is our prioritization, not a claim that each project exposes a reusable API.

| Project                   | Decision                                       |
| ------------------------- | ---------------------------------------------- |
| Transparency Portal       | Link now; local filtering later                |
| Data Research             | Link selected, source-explained analyses later |
| 2026 Budget Analysis      | Future national-context links                  |
| Open Data Portal          | Link now; evaluate API datasets                |
| Flood Control Browser     | Candidate for Bacoor infrastructure research   |
| The Cadena Act            | Monitor; no immediate integration              |
| PhilGEPS Browser          | Use working transparency procurement route     |
| Political Dynasty Tracker | Defer; requires careful local sourcing         |
| Congress API              | Future legislative discovery                   |
| Hotlines                  | Defer copied numbers pending reconciliation    |
| Bisto.ph                  | Future outbound project reporting              |
| Tax Calculators           | Defer pending current-rule verification        |
| SALN Tracker              | Future source-linked transparency research     |
| Price Guides              | Defer until local coverage is verified         |
| OpenGovChain              | No present infrastructure need                 |
| Petitions                 | Defer until moderation capacity exists         |
| Philippines Quiz          | Low-priority educational addition              |

Catalog source: [BetterGov's project listing](https://about.bettergov.ph/projects/).

## Reuse assessment from repository documentation

| Repository                                                                          | Observed license                | Practical assessment                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [kapwa](https://github.com/bettergovph/kapwa)                                       | CC0-1.0                         | Already installed. Retained the shared styling foundation and customized the page composition.                                                                                                                                                      |
| [transparency-dashboard](https://github.com/bettergovph/transparency-dashboard)     | MIT                             | React/TypeScript and search/filter patterns fit this stack. Its documented MeiliSearch service is an operational dependency; do not copy its sample privileged-key configuration into a public client. Initially integrated through outbound links. |
| [open-data-portal](https://github.com/bettergovph/open-data-portal)                 | CC0-1.0                         | Documents dataset, publisher, category, and statistics endpoints. Best candidate for a later curated Bacoor dataset index, with source dates and graceful failure handling.                                                                         |
| [hotlines](https://github.com/bettergovph/hotlines)                                 | Not detected in GitHub metadata | Structured location/category JSON and offline patterns are useful references. Confirm the license and reconcile every number before code/data reuse.                                                                                                |
| [healthcare-providers-api](https://github.com/bettergovph/healthcare-providers-api) | CC0-1.0                         | README still lists features as TBD. No production endpoint or Bacoor coverage was established; not integrated.                                                                                                                                      |
| [flood-watch](https://github.com/bettergovph/flood-watch)                           | MIT                             | README describes a scaffold, scenario controls, map tooling, and a large NOAH dataset. Reuse requires geographic validation and map/data infrastructure; it must not be presented as live Bacoor flood guidance.                                    |
| [open-congress-api](https://github.com/bettergovph/open-congress-api)               | CC0-1.0                         | Documented legislative endpoints; useful later if representative/district relationships and current terms are verified.                                                                                                                             |
| [ph-tax-directory](https://github.com/bettergovph/ph-tax-directory)                 | CC0-1.0 in GitHub metadata      | Potential calculator reference. Needs independent checking against current BIR rules before calculations are published locally.                                                                                                                     |
| [open-philgeps-data](https://github.com/bettergovph/open-philgeps-data)             | Not detected in GitHub metadata | README URL returned 404. Do not infer a documented integration contract or reuse permission.                                                                                                                                                        |

License labels are a discovery snapshot, not a substitute for reviewing the exact files and dataset terms when importing them. No third-party application code was copied in this redesign.

## Verified Bacoor additions and exclusions

Source details and constraints are documented in [Bacoor source notes](research/BACOOR_SOURCES.md). Added working-permit and Solidarity Pass destinations, city department and national-office directories, the 2026–2031 development-plan publication, official announcements, DOLE PhilJobNet, and PAGASA.

The legacy `philgeps.bettergov.ph` address returned Cloudflare Error 1016 during browser verification. The site uses the working [procurement route](https://transparency.bettergov.ph/procurement) instead. Its disclosed archive coverage is **2000–2025**; it is not presented as today's procurement feed.

The city jobs landing page displayed a certificate-issuer error in its embedded content. It was not added as a working vacancy service. PhilJobNet and the published PESO contact provide useful alternatives.

Bacoor's department directory and site footer list different disaster-management numbers. The initial redesign withheld a hotline panel. The subsequent emergency-hub review found corroboration for the emergency-specific number in the Cavite provincial directory and a current city advisory for 161. See [the recorded source decision](EMERGENCY_HUB.md). No local budgets, population totals, live weather values, evacuation locations, or current job vacancies were invented.

## Recommended next work

1. Extract the most requested services from the 2026 charter into page-cited, plain-language guides. Confirm exact requirements, fees, and exceptions before publication.
2. Build a Bacoor procurement/infrastructure view from a documented endpoint or vetted export, with dates, duplicate handling, and source links. Keep national records and city-issued spending clearly distinguished.
3. Expand the office directory and validate barangay coverage against current PSA/PSGC and city publications.
4. Add a sourced city-data page only after reconciling census edition, administrative boundaries, and budget periods.
5. Consider Filipino content with actual translation review, then offline access to low-risk resources with explicit stale-data handling.

## Implementation verification

The complete `npm run check` passed: formatting, ESLint, 19 tests, content validation for 16 resources and five office contacts, brand validation, language checks, TypeScript, and the production build. The approved logo's 94 paths are unchanged.

Browser checks covered seven routes at 320, 768, and 1280 pixels, including search results, empty results, and the missing-page state. All 21 route/viewport combinations had one main heading and no horizontal overflow. Search, category filters, and mobile navigation were exercised. Public pages no longer display GitHub correction prompts, reviewer handles, or last-checked labels; official-source disclosures remain available.

Deployment has not been changed. The implementation remains on the local feature branch with the existing prelaunch indexing configuration.
