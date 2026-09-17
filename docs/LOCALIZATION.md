# English and Filipino

Residents can choose English or Filipino from the navigation. The switch updates
the current page without navigating, scrolling, clearing search filters, or
resetting checklist progress. English is the default. The preference is stored
locally as `betterbacoor:language` and synchronized between tabs. If browser
storage is unavailable, the choice still works for the current visit.

## Translation coverage

`src/i18n/fil.json` holds the Filipino translations, keyed by English text.
`src/i18n/index.ts` provides the shared language store, `useLanguage()`, `t()`,
`translate()`, and `phrase()` helpers. Components that render translated copy
subscribe with `useLanguage()`; page titles, descriptions, and the document's
`lang` attribute also follow the selection.

Coverage includes navigation, service guides and checklists, directories,
resource descriptions, search, emergency guidance, printable pages, contact-card
downloads, and the offline emergency guide. Official organization names, source
titles, addresses, numbers, email addresses, and URLs retain their original
forms. The Citizen's Charter PDF and extracted document text remain in their
original language; only the reader controls are translated.

Translations preserve conditional requirements, qualifications, fees, and
source references. They are community guidance, not official translations. No
independent human translation review is claimed. Review both language versions
against the original source whenever service or safety content changes.

## Search

`src/data/search.ts` normalizes common Filipino search terms to English and
supports phrases such as `sentro ng kalusugan`. Guides and resource descriptions
are searched in both languages regardless of the selected interface language.
Examples include `ospital`, `sertipiko kapanganakan`, `permit negosyo`, and
`panahon`. Directory matching retains the existing Roman/Arabic barangay-number
normalization.

Global discovery also includes school, health, barangay-profile, waste, and assistance records through `src/data/local-discovery.ts`. Aliases include `paaralan`, `basura`, and `populasyon`. A new searchable collection must update both its on-site browsing view and the global discovery index.

## Offline and printing

The build generates self-contained English and Filipino emergency HTML files.
Saving stores one guide in the selected language. The emergency page displays
the saved language and offers a refresh when it differs from the current
selection. Changing the interface language does not silently replace a saved
copy. Refreshing replaces it only after the new copy has been downloaded and
validated successfully; older saved English copies remain supported.

The offline guide, its metadata, and the downloaded contact card identify their
information snapshot. Translation does not advance the source-review date.
Printing uses the selected interface language and existing print styles.

## Maintaining translations

1. Keep stable guide IDs and checklist item IDs unchanged when editing wording.
2. Add or update the matching entry in `src/i18n/fil.json` when English copy changes.
3. Keep official source documents unchanged and preserve all phone destinations,
   amounts, and conditions in the translation.
4. Run `npm run check`. The build includes `validate:translations`, which checks
   literal translation calls and the supported editorial content fields.
5. Review dynamic phrases and browser layouts manually; catalog coverage cannot
   establish translation quality or detect every missing dynamic string.

Language tests cover state preservation, bilingual search, unchanged fees and
hotline destinations, printable content, storage restrictions, cross-tab changes,
and accessibility. Offline tests cover saving the selected-language HTML and its
metadata. Browser checks verified Filipino persistence after reload, desktop and
390px mobile layouts, checklist preservation, and loading the saved Filipino
guide with the preview server stopped.
