# Thai Driving License Web

Astro static UI with selective React islands for licence journeys, office discovery and DLT
appointment evidence. Read [the project README](../../README.md),
[status](../../docs/PROJECT_STATUS.md) and [backlog](../../docs/BACKLOG.md) first.

## Development

Use the Node version from `.nvmrc` (26.x). From the repository root:

```bash
make web-install
make web-dev
```

The browser calls the Go API directly. `NEXT_PUBLIC_API_URL` defaults to
`http://localhost:8080`; start the API and PostgreSQL using the root README.
Static guides and office content do not need an API at build time.

## Structure

Thin Astro routes live in `src/pages`; layouts and global styles live in
`src/app`. Existing React views render build-time HTML unless a route explicitly
uses a client directive. Imports follow FSD layers:
app/pages -> views -> widgets -> features -> entities -> shared. UI primitives live
in `src/shared/ui`. Tailwind classes use the `tw` prefix; semantic hooks use BEM.
Follow [AGENTS.md](AGENTS.md) and the repository conventions before editing.

## Checks and Build

From `apps/web`:

```bash
npm run lint
npm test
npm run typecheck
npm run data:check
npm run build
```

The build exports `out/` for a static host; it does not run an Astro server or
BFF. Set `NEXT_PUBLIC_SITE_URL` for production canonicals and indexing, and
`NEXT_PUBLIC_SITE_NAME` for the public brand, before building. An unset site URL
keeps indexing disabled. Deployment and failure-mode requirements are in
[DEPLOYMENT.md](../../docs/DEPLOYMENT.md).

The four existing `NEXT_PUBLIC_*` names remain a compatibility contract in
`astro.config.mjs`, not a Next dependency. Only those explicitly allowed public
values are injected; never expose the environment wholesale. Static metadata
images in `public/` preserve their existing URLs and brand artwork. Updating
`NEXT_PUBLIC_SITE_NAME` changes text, not that artwork; replace the three PNG
assets too when changing the brand. `_headers` declares their image content type.

Content pages must not hydrate React. The map and full-BFF tools hydrate their
interactive views; `/offices` hydrates only its refresh/status widget. Browser
navigation uses native links and a URL hook rather than a site-wide client router.
Biome checks Astro frontmatter; unused imports/variables are handled by Astro
checking because Biome's non-experimental mode cannot see template references.

For an equivalent configured pre-migration export, check URL, SEO, structured
data, local asset/link and static-JS parity with:

```bash
node ../../tools/check-static-export.mjs /path/to/previous-export out
```

`npm run content:review` lists dated claims due for rereading. `data:check`
checks committed dataset reproducibility, not current upstream freshness.
