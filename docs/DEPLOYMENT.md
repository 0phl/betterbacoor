# Deployment and release checks

BetterBacoor builds to a static `dist/` directory. It has no application server, database, or private API configuration. This guide prepares a release; running local checks does not deploy the site or authorize a public launch.

## Build and preview

Use Node.js 22.13+ on the Node 22 line, or Node 24, with npm 10+.

```bash
npm ci
npm run check
npm audit --omit=dev --audit-level=high
npm run preview
```

The build validates content, generates both standalone emergency guides, and copies static files into `dist/`. Deploy that directory. Never publish the project root, local environment files, or development tooling as the website.

## Hosting routes and assets

`vercel.json` configures Vercel's install, build, output, and page rewrites. `public/_redirects` supplies equivalent page rewrites for hosts that support that format. Other hosts need equivalent rules. Vite preview does not prove that a host's rewrite configuration works.

Serve real static assets as files. Page routes need an `index.html` fallback while preserving the query string. Check direct navigation and refresh for:

- `/services`, `/services/find`, and all four guides: `/services/business-permit`, `/services/civil-registry`, `/services/working-permit`, `/services/senior-citizen-id`;
- `/my-barangay` and `/local-services?section=schools`;
- `/charter?page=657`, `/emergency`, and `/search?q=school`;
- `/directories`, `/transparency`, and `/about`.

Unknown routes should return a usable 404. `public/404.html` is available for hosts that support custom static error pages; verify the host's behavior rather than assuming it uses that file.

Confirm that `/documents/bacoor-citizens-charter-2026.pdf`, the emitted PDF worker, `/emergency-sw.js`, and both generated `/offline/emergency*.html` files return their actual contents, not the app's HTML fallback. PDF byte-range support improves loading. Host over HTTPS for service-worker support; localhost is suitable for local testing.

## Search indexing and domain

`index.html` currently includes `<meta name="robots" content="noindex, nofollow" />`. `public/robots.txt` allows crawling so a crawler can see that directive. Neither setting is authentication or privacy protection.

For an approved public launch, confirm the production domain and HTTPS, deliberately update the robots meta directive, publish a sitemap using the actual production URLs, and review canonical/social metadata. Keep preview environments non-indexable using the hosting platform's settings. Do not infer that a domain is configured because it appears in the branding.

## Release review

- Run the full checks and production-dependency audit against the exact release commit; confirm hosted CI succeeds.
- Recheck high-impact service and emergency information against current sources. Validators cannot prove a hotline connects or a facility is available.
- Review homepage, navigation, citywide search, saved checklists, language switching, and PDF Next/Previous on desktop and mobile.
- Save an emergency guide, test it without network access, and verify refresh/removal. Only saved emergency essentials are intended to work offline.
- Test the direct routes and assets above on the hosting preview, including unknown URLs.
- Verify public repository links, issue forms, contribution/license links, and Facebook. Confirm GitHub private vulnerability reporting is enabled before advertising that channel at launch.
- Keep the unofficial/community-run disclosure and source limitations visible. Do not add live-alert or submission claims without a working, reviewed integration.

Keep the previous successful deployment available for rollback. Content maintenance continues after launch; the scheduled freshness workflow is a maintenance signal, not live monitoring of government sources.
