# Emergency help and September UI refinements

Research and source proofreading: September 16, 2026. This is a source-backed community reference, not a dispatch service or a live disaster dashboard. No emergency test calls were placed. The work remains local until deployment is requested.

## Contact evidence

| Published contact                 | Number         | Evidence                                                                                                                                                            |
| --------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bacoor priority emergency hotline | 161            | [City advisory, April 20, 2026](https://bacoor.gov.ph/announcement/in-case-of-emergencies-dial-161/), explicit article text                                         |
| National emergency hotline        | 911            | [Philippine government emergency directory](https://ehotlines.e.gov.ph/)                                                                                            |
| BDRRMO                            | (046) 417-0727 | City advisory’s emergency footer, corroborated under Bacoor hotlines in the [Cavite provincial directory](https://cavite.gov.ph/directory/)                         |
| Bacoor BFP                        | (046) 417-6060 | City advisory’s explicitly labeled emergency footer                                                                                                                 |
| Bacoor PNP                        | (046) 417-6366 | City advisory’s explicitly labeled emergency footer                                                                                                                 |
| Cavite PDRRMO                     | (046) 840-0774 | Provincial directory’s emergency header/footer                                                                                                                      |
| Philippine Red Cross              | 143            | [PRC ambulance information, June 29, 2025](https://redcross.org.ph/2025/06/29/ph-red-cross-ambulance-the-peoples-lifeline/), corroborated by the national directory |

The city department directory also contains 417-1100 for BDRRMO. This is not treated as invalid: it is omitted because the specific emergency footer and provincial emergency directory corroborate 417-0727 for this purpose. The priority short code comes from the city’s explicit 2026 advisory, not the provincial directory’s ambiguous “(046) 161” formatting. No inferred SMS channels, extensions, mobile numbers, response times, or free ambulance guarantees are published.

Review pass one inspected primary-source text and separated office contacts from emergency contacts. Pass two re-read the city advisory and emergency footer in the browser, checked the national directory’s rendered 911/143 links and province’s PDRRMO label, and compared the final displayed numbers with their normalized telephone destinations. Fire/police numbers are published by one authority; this is not represented as independent multi-agency confirmation. The automated validator additionally rejects display/dial mismatches and stale reviews.

## Guidance evidence and limits

- Flooding and preparation: [PAGASA flood guidance](https://www.pagasa.dost.gov.ph/learning-tools/floods). The second browser pass expanded “Flood Safety Rules” and checked evacuation, water-covered roads, food/water contamination, electrical inspection, and supplies against the final summaries.
- Typhoons and coastal surge: [PAGASA storm surge guidance](https://www.pagasa.dost.gov.ph/information/storm-surge). The second browser pass expanded “What should I do if I am in a storm-surge prone area?” to confirm early planning, higher ground, local evacuation advice, and emergency supplies.
- Fire: [American Red Cross guidance](https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire/if-a-fire-starts.html). Source text was re-read for the final escape, smoke, blocked exit, and trapped-person summaries. The browser did not expose this page’s article, so the second reading used the web text extraction. Only general guidance is adapted; local call destinations come from Philippine sources. No first-aid treatment instructions are reproduced.
- Earthquake and tsunami: [Disaster Preparedness & First Aid Handbook](https://www.climate.gov.ph/files/Disaster_Preparedness_First_Aid_Handbook.pdf), printed pages 18–20 and 22–23 (PDF pages 16–18 and 20–21). The relevant extracted passages were read and rechecked for the final summaries; PDF screenshot retrieval failed. This 2011 handbook is used only for basic protective actions, not dated contact lists or medical procedures. The [Philippine Red Cross earthquake guidance](https://redcross.org.ph/tag/first-aid/) independently corroborates covering under a desk/table, staying clear of glass, waiting until shaking stops, and using stairs.
- Medical and police panels are contact-routing summaries. They do not diagnose, triage, prescribe treatment, or accept incident reports. General prompts to explain location and follow the responding service are editorial interface guidance.
- [HazardHunterPH](https://hazardhunter.georisk.gov.ph/) is labeled a planning tool, not current flood conditions. No evacuation center is represented as open or safe without a current authoritative update.

These are two source-review passes by the implementing assistant, not two independent human reviewers. Numbers are checked against publications, not tested for connection. Humanitarian publishers are explicitly typed separately from government publishers in `content/emergency.json`.

The existing freshness workflow now validates this collection as well. Reviews expire after 30 days; the rendered hub then shows a review notice but preserves emergency call access. The downloadable text card carries its snapshot date, recheck instruction, all seven contacts, and source URLs. The site does not claim that its entire application works offline.

## UI decisions

The rendered footers at [BetterSolano](https://bettersolano.org/) and [BetterCalauan](https://bettercalauan.org/) informed a neutral charcoal footer, gray secondary copy, simple social links, and a subtle horizontal separator. BetterBacoor retains its own logo and blue/yellow identity. The Facebook URL is exactly the owner-supplied URL; no social embed or tracking widget was added.

The community story and BetterGov tools now share one background and container. The story leads into a lighter row of related tools. Decorative vertical callout borders and the yellow footer top border are removed, including in the printable guide.

Navigation previously combined browser focus scrolling with global smooth scrolling. Route changes now focus the main landmark with `preventScroll`, then reset instantly in a layout effect. Explicit hash links still target their section. The desktop navigation switches to a menu below 1280px to accommodate the new emergency destination without wrapping.

## Verification

`npm run check` passes: formatting, lint, 38 tests, content freshness, telephone normalization, brand integrity, language guard, TypeScript, and production build. Emergency tests cover source-backed phone destinations, situation changes, card contents, stale-review notices, search discovery, print invocation, and accessibility structure.

The production preview was inspected at widths 320, 768, 1024, and 1440 on the homepage, emergency hub, and civil-registry guide: 12 checks with no horizontal overflow. The seven primary navigation destinations each ended at scroll position zero with focus on the main landmark; mobile navigation closed after selecting a destination. The footer computes to neutral RGB 25/25/25 with zero social-link borders and zero top border. The civil-guide callout has zero left border. Actual call connections were not tested. The browser download-event check timed out; the card’s downloadable URI, complete decoded text, filename, and source links pass automated verification.
