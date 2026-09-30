# Service access expansion — source review, 2026-09-29

## Inspected sources

- [City Citizen's Charter 2026](https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf): downloaded on the review date, 13,048,888 bytes. SHA-256 `32d040e308ad0b4988c28ba5e351cd4076bd7d17d6bc9fd0b1e2cff33e5070ed` matches the repository-preserved PDF. Page numbers below are one-based. Original PDF text was extracted and checked; no resident application was submitted.
- [Bacoor Citizen Portal](https://portal.bacoor.gov.ph/): live page inspected, specifically PWD ID, Get Verified, and How it works. Advertises application/renewal and account verification through valid ID and live selfie. A full PWD-specific document checklist and service turnaround are not linked on the public page when checked. No account was created or authenticated flow inspected.
- [City departments and unit heads](https://bacoor.gov.ph/city-and-units-heads/): live table inspected; CSWD email `cswd@bacoor.gov.ph`, PESO email `peso@bacoor.gov.ph`. No PDAO email was inferred. The PWD guide uses the official portal as its destination without an email action.

| Guide              | Printed pages | PDF pages | Coverage                                                                                                        |
| ------------------ | ------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| Medical assistance | 36.3–36.8     | 1056–1061 | Medical requirements on 1057; intake, assessment, and conditional release on 1060–1061                          |
| Burial assistance  | 36.3–36.8     | 1056–1061 | Burial requirements on 1056; common process on 1060–1061                                                        |
| Solo Parent ID     | 36.24–36.31   | 1077–1084 | Category-specific evidence; original/certified copies and application on 1083; orientation/release on 1083–1084 |
| Education support  | 36.57–36.58   | 1110–1111 | CSWD Scholarship Unit; enrollment certificate, school ID, residency; annual multi-stage release                 |
| PESO employment    | 33.14–33.17   | 987–990   | Job referral and placement; two resumes, NSRP form, matching and interview referral                             |

## Editorial decisions and limits

- PWD is an account/application preparation guide. Do not present it as a verified complete document checklist or claim a supported offline route.
- Solo Parent is a category-neutral preparation guide. It directs residents to the correct Charter category and CSWD before obtaining affidavits; it does not collect sensitive circumstances or interpret statutory eligibility. Renewals/replacements are not invented as separate universal checklists.
- Medical/burial source lists Bacoor voter registration. Preserve this as the Charter's statement and refer questions to CSWD; do not invent a required voter document or decide eligibility. Keep conditional promissory notes, signatures, dates, and identification alternatives intact.
- The final proofreading pass explicitly retains valid IDs and the Charter's direct email delivery of guarantee letters/burial assistance to providers. Assistance release headings have their own Filipino wording so they do not inherit the business guide's reference to collecting a permit.
- Confirm the handling Action Center with CSWD; existing barangay-source conflicts prevent automatic case routing. Intake or referral does not establish approval or a benefit amount.
- Education guide covers the durable CSWD scholarship procedure, not every scholarship. The Charter does not establish an open intake, current stipend, or deadline. The city announcement index is an outbound link only; temporary offers are not copied into guide requirements.
- PESO's stated 58 minutes describes its listed office steps, not the time to obtain employment. The guide retains a verified contact instead of linking the previously problematic city vacancy page.
- Guides use English and Filipino original summaries. No independent human translation review is claimed. Official source names and contact strings retain their published forms.
- Research was extracted by one agent and core requirements/source references proofread by the implementing agent. Current PDF hash equivalence was independently checked. Phone lines were not test-called.

## Maintenance

Recheck these six guides and official destinations by **2026-12-28**, within 90 days of this review, under the content policy. Update source dates only after inspection. Existing checklist keys are unchanged; new guides use distinct slugs and the `prepare` variant. No new backend or resident data collection is introduced.

## Implementation verification — 2026-09-29

- Node 24.19.0: `npm run check` passes formatting, lint, all 118 tests, content/brand/language/translation validation, TypeScript, and the production build. CI remains on Node 22. The clone uses local `core.autocrlf=false`; normalizing checked-out text to LF did not introduce unrelated content changes.
- Search now returns 46 combined school results, including the education guide once; the Directory filter still returns 45. Pagination focus, direct guide links, finder choices, bilingual discovery, reload, checklist reset, corrupt storage, and blocked writes have regression coverage.
- Reproduced the intermittent failure: My Barangay's English accessibility test combined two full axe scans and exceeded its unchanged 5,000 ms timeout under the full suite. Empty and selected views now have separate cases in each language, preserving both scans without retries or a timeout increase.
- A separate confirmation run by a lower-reasoning testing worker passed all 118 tests; the four My Barangay accessibility cases took 1,061–3,312 ms each. `npm audit --omit=dev --audit-level=high` found zero vulnerabilities, and `git diff --check` passed.
- Chromium production preview at `http://127.0.0.1:4173`: all six guides checked in English and Filipino at 375 px and 1440 px. Automated browser accessibility scans include contrast and found no violations; main-content bounds showed no horizontal clipping. Keyboard checks covered finder selection, result focus, checklist toggling, and saved state after reload. The official PWD portal handoff opened the expected government URL.
- Twelve A4 PDFs were generated from the production pages. Every checklist requirement, source URL, and review date was retained. Print review corrected a detached next-steps heading; English and Filipino assistance wording was proofread against the Charter and rendered pages.
- Official portal, contact directory, announcement index, and original Charter PDF were reachable on the review date. CSWD and PESO email addresses match the live city directory. No account, application, payment, or resident document was submitted.
- Browser screenshots and generated PDFs are local review artifacts outside the repository. Browser plugin was unavailable, so the available Playwright MCP browser was used. Cross-browser and physical-printer output were not checked; phone lines were not called. Vite's non-fatal main-chunk size warning remains.
