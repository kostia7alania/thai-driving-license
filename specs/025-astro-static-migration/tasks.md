# Feature 025 tasks

- [x] T2501 Inspect source, fetch base and preserve prior local research/export.
- [x] T2502 Record authorization, scope and static-first architecture amendment.
- [x] T2503 Replace Next toolchain and routes with Astro static generation.
- [x] T2504 Preserve interactive islands, refresh and browser URL/history behavior.
- [x] T2505 Verify route/SEO/content parity and executable-JS reduction.
- [x] T2506 Run affected checks and local desktop/mobile browser journeys.
- [x] T2507 Reconcile current docs and record delivery/remaining limitations.
- [x] T2508 Publish the reviewed source and verify CI on that exact commit.
- [x] T2509 Deploy the configured free export to the existing Cloudflare Worker.
- [x] T2510 Verify the public HTML, browser journeys and office refresh after deployment.

Baseline: `main` = fetched `origin/main` = `647e428`. Existing uncommitted
Feature 024 research and Next maintenance were preserved. Previous configured
Next export retained at `/tmp/thai-license-astro.8RoVao/next-export` for local
comparison only. The owner authorized commit, publication and the existing free
Cloudflare deployment on 2026-10-03. Release gates below were verified separately.

## Released: 2026-10-03

- Application commit `3b979e74bbc7a87f0ebaf7b588fff19d3bd8f0f4` is published on
  `main`. The authenticated GitHub integration published an exact staged-tree
  match (`be62cefb92fee672334d2629f008c9656e7c2bc0`), then a fetch verified it
  locally. The CLI credential is expired; no token or SSH trust settings changed.
- [GitHub CI 37111532154](https://github.com/kostia7alania/thai-driving-license/actions/runs/37111532154)
  succeeded on that SHA: frontend checks/build, Worker typecheck/dry-run,
  Go tests with PostgreSQL 18 and lint, and the API container build.
- The configured free export deployed to the existing
  [public origin](https://thai-driving-license.kostia7alania.workers.dev).
  Cloudflare version `80f23deb-128a-4f25-bc82-4cada7d10707`, tag `astro-3b979e7`,
  deployment `d43f9c0d-d31f-4f9a-92c3-67faabf0aef0`, was read back at 100%.
  The existing KV binding and `17 */6 * * *` cron remain unchanged; no paid
  resources, new datastore or full BFF were deployed.
- All 248 public HTML responses (247 routes plus a nonexistent-route 404)
  byte-match the local artifact. Robots, the 243-URL sitemap, health and snapshot
  return 200; legacy guide redirect is 301 and all three metadata PNG endpoints
  return `image/png`. API responses retain `X-Robots-Tag: noindex`.
- Public browser: home has its self-canonical, `index, follow`, zero executable
  scripts and zero script requests. At 390px, home, offices and map have no
  horizontal overflow. The map hydrates, loads tiles, resolves a Phuket deep
  link and its text alternative; Reset filters restores 210 markers while
  preserving unrelated query/hash. Only the office-list API is requested, not
  unsupported slot endpoints. No console warnings/errors were observed.
- Clicking Refresh on mobile makes one same-origin POST, captures 218 offices
  (114 marked open) from DLT at `2026-10-03T09:03:13.734Z`, and displays the
  successful unchanged result. The second click returns `cooldown` with the
  same capture and next check at `2026-10-03T09:33:13.649Z`.
- The old Calendar URL truthfully remains unavailable, `noindex, follow`, and
  zero-JS. These synthetic checks do not establish real-applicant outcomes,
  current procedural eligibility or a live Go/PostgreSQL service. Feature 024's
  personal planner remains the next unimplemented product slice.

## Release preflight: 2026-10-03

- Fresh fetch confirms the unchanged `647e428` base. A clean `npm ci`, Biome,
  Astro/TypeScript checks, all 60 existing tests, data reproducibility, configured
  free build, export parity and `make worker-check` pass again. The export still
  contains 247 public routes, 243 sitemap URLs and 241 zero-JS content pages.
- Independent read-only review found no confirmed release blocker in routes,
  metadata, environment exposure, capability gates, query state or refresh wiring.
- Cloudflare authorization, current deployment and public health/snapshot were
  read back. The previous version is `15fb0b66-9b31-4925-a1dd-3565eb89530c`;
  its upstream snapshot contains 218 offices. No new resources are required.
- Today's audit reports eight high-severity package entries from two root
  advisories, superseding yesterday's zero result: [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
  through the shadcn generator and [http-cache-semantics](https://github.com/advisories/GHSA-ch52-4w7c-c8xp)
  through Astro. Neither currently has a patched version. They are build/CLI
  dependencies, not imports of the deployed Worker or browser application;
  this static release has no Astro server or authenticated response cache.
  Their module/function markers are absent from the dry-run Worker and browser
  assets. This is a scoped reachability assessment, not a clean security audit.
  Do not expose the dev server to untrusted input. Recheck advisories before the
  next dependency update; do not apply the audit's major-version downgrade fixes.

## Validation: 2026-10-02

- Node 26.2.0 / npm 11.13.0; Astro 7.3.5, React integration 7.0.0, Vite 8.3.2.
  Removed Next. Kept existing React/UI dependencies; targeted compatible
  transitive updates resolve the existing CLI/build advisories. `npm audit` and
  `npm audit --omit=dev` both report zero vulnerabilities, not a security guarantee.
- Biome, Astro check (127 files, zero diagnostics), TypeScript, all 60 existing
  tests and committed-data reproducibility (218 offices) pass. Two existing route
  contract tests now reference Astro paths instead of deleted Next paths.
- Configured free build: 248 HTML documents including 404. The independent
  export gate preserves all 247 public routes, 243 sitemap URLs, title/description,
  canonical, effective robots, verification token and parsed JSON-LD. It validates
  5,071 local links/assets and 241 ordinary pages with zero executable JS/preloads.
  Separate social-meta comparison keeps every existing OG/Twitter value after
  equivalent URL/entity normalization; the shared layout also supplies previously
  absent default social-image/site metadata. Extensionless artwork stays unchanged.
- Home and first-licence page previously referenced seven modern JS files whose
  individual gzip sizes sum to 141,435 bytes, plus 44,327 / 49,695 inline bytes.
  Both now have zero executable script tags and home makes zero script requests
  in the browser. This is not a network waterfall or field performance claim.
- Separate full-BFF build: 246 sitemap URLs; Calendar/Compare/History/Map islands
  index/follow, playground island noindex/nofollow, only six interactive routes.
  Separate unconfigured build: all 248 HTML documents noindex/nofollow and
  robots Disallow:/; sitemap uses the existing localhost fallback, no public host.
- `make worker-check` passes generated bindings, Worker typecheck and dry-run
  bundle: 45.67 KiB raw / 6.68 KiB gzip, 282 static files, no changed bindings.
- Local Wrangler on port 8876: home/guide, map, office snapshot and health serve;
  unknown URL returns 404, existing guide redirect returns 301, all three preserved
  metadata images return image/png despite extensionless URLs.
- Actual browser desktop/mobile: home/first-licence text and layout render without
  JS; mobile 390px has no horizontal overflow. Map hydrates, loads 210 office
  paths and external map tiles, opens a Phuket deep link, changes/resets filters
  while retaining unrelated query parameters and hash; no hydration errors.
- `/offices` hydrates only freshness/status. A clicked refresh makes one POST,
  fetches 218 offices from DLT, then reads back a local KV snapshot. A second
  refresh within 30 minutes returns cooldown with the same capture timestamp.
  Production KV is untouched. The empty local KV initially used committed fallback.
- Local mobile Lighthouse: `/offices` and `/licence/new-thai-driving-license`
  each score 100 for accessibility, SEO and best practices. Performance was not
  measured; these scores do not establish ranking or a real-applicant outcome.

## Implementation notes and delivery boundary

- Query readiness distinguishes a build-time unknown URL from a real empty
  query, preventing Compare from consuming its autostart before hydration and
  Calendar/History from requesting the default office before reading the URL.
  Browser proof: Compare requested exactly site IDs 67,68 / RENEW once;
  Calendar/History initial requests used site 67, never default 47. History
  50 -> 100 -> Back 50 -> Forward 100 preserved unrelated query/hash. The local
  API was deliberately absent, so this proves request construction, not results.
- A reproduced dynamic map-import failure no longer unmounts the whole page:
  a page-local error boundary keeps heading, search and result count, offers reload
  and `/offices`. Browser verification preserved filters and reset on that failure.
- Astro 7 uses a separate Vite prerender environment. Its `cookie` dependency
  is bundled there to avoid resolving the older version required by the existing
  shadcn CLI. Tailwind uses its explicit CSS export because Vite's bare-import
  resolver failed during prerendering. No runtime SSR adapter was added.
- Preserved brand PNGs are static assets. A later brand-name change must update
  that artwork too; the public name environment variable only updates text.
- At the October 2 checkpoint, source/spec/docs were local and uncommitted. No deploy, paid plan, D1,
  AI call, auth, booking, source re-review, real-user study or Go data migration.
  Full-BFF request-boundary checks do not prove a running Go/Postgres workflow.

## Changed source groups

- `apps/web/package.json`, lockfile, Astro/TypeScript/Biome/component config and
  frontend instructions; old Next config and route modules removed.
- `apps/web/src/pages/**`, `src/app/layouts/**`, global CSS, static metadata assets
  and headers; existing views/widgets replace Next links and routing APIs.
- `src/shared/lib/browser-navigation.ts`, query-driven views, map error handling,
  two existing source-route tests and `tools/check-static-export.mjs`.
- Root/web README, architecture instructions/constitution, product/status/backlog/
  roadmap/index/deployment documents, Feature 024 follow-up and Feature 025 specs.
  Existing research was preserved, with superseded decisions labelled explicitly.
- `apps/api`, Worker logic/bindings, datasets, provider resources and CI remain
  unchanged. All temporary generated comparison exports are outside Git.
