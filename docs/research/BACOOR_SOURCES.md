# Bacoor source notes

Reviewed September 16, 2026. New records describe the destination's actual function; they do not imply that a successful HTTP response verifies every underlying service or individual claim. Existing records retain their earlier review dates.

| Addition              | Inspected primary source                                                                           | Scope                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| City departments      | [Department and unit heads](https://bacoor.gov.ph/city-and-units-heads/)                           | Published contact table; source for five office contacts below                                                                               |
| National offices      | [National government agencies/offices](https://bacoor.gov.ph/national-government-agenciesoffices/) | Directory landing page; no copied emergency numbers                                                                                          |
| Working permit        | [Bacoor City eGov](https://strikeas1.bacoor.gov.ph/)                                               | Public working-permit landing page; also linked by the city portal                                                                           |
| Solidarity Route Pass | [Bacoor SPass](https://solidarity.bacoor.gov.ph/)                                                  | Application, renewal and status entry points; no resident data submitted                                                                     |
| Development plan      | City Bulletin publication linked from the [city portal](https://bacoor.gov.ph/)                    | CDP 2026–2031 publication dated September 14, 2026. Exact destination is stored in `content/resources.json`; no plan figures were extracted. |
| City announcements    | [Announcement archive](https://bacoor.gov.ph/category/announcement/)                               | Date-stamped posts; users are directed to check coverage and publication date                                                                |
| Employment            | [PhilJobNet](https://philjobnet.gov.ph/)                                                           | DOLE/Bureau of Local Employment national job-matching portal; no claim of a specific currently open Bacoor job                               |
| Weather               | [PAGASA](https://www.pagasa.dost.gov.ph/)                                                          | Official portal link; no live forecast, current warning, or evacuation advice reproduced                                                     |

## Office contacts transcribed from the city directory

| Office                            | Published email    | Main line                         | Extension    |
| --------------------------------- | ------------------ | --------------------------------- | ------------ |
| Business permits and licensing    | bplo@bacoor.gov.ph | (046) 481-4100                    | 203          |
| City civil registry               | ccr@bacoor.gov.ph  | (046) 481-4100                    | 216          |
| Public Employment Service Office  | peso@bacoor.gov.ph | (046) 481-4100                    | 317          |
| Social welfare and development    | cswd@bacoor.gov.ph | (046) 481-4100                    | 221          |
| Office of Senior Citizens Affairs | osca@bacoor.gov.ph | Not provided in the inspected row | Not provided |

All five entries use the same [official department-directory source](https://bacoor.gov.ph/city-and-units-heads/). The call link dials the main line; the extension is displayed so the caller can request the office. Email links open the resident's email app and do not send anything automatically. The source record's freshness policy governs this contact collection.

## Not published as verified operational data

- [City job-vacancy page](https://bacoor.gov.ph/job-vacancy/): its page body displayed a certificate-issuer error. Use the linked national jobs portal or contact PESO.
- Disaster-management contacts: the [department table](https://bacoor.gov.ph/city-and-units-heads/) lists `(046) 417-1100`, while the [city portal footer](https://bacoor.gov.ph/) lists `(046) 417-0727`. These may serve different functions, but that distinction was not established. Reconcile with the office before creating emergency call buttons.
- PhilSys could not be verified through the web fetch used in this review, so it was not added.
- No service fees, turnaround times, population totals, or budget totals were inferred from search snippets or another LGU's portal.
