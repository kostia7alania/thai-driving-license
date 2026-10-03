# Feature 025: Astro static migration

**Status:** Implemented; release verification in progress. **Authorized:** 2026-10-02, following the owner's
approval of Astro, shared TypeScript logic and a strictly free Cloudflare runtime.
Publication and deployment to the existing free Worker were authorized on 2026-10-03.

## Outcome

Preserve the current licence guide and office discovery while removing Next's
client runtime from ordinary content pages. This is a framework migration, not
implementation of Feature 024's personal plan or a redesign.

## Acceptance

- Preserve existing public routes, content, canonical URLs, metadata, structured
  data, verification token, sitemap and index/noindex capability boundaries.
- Ordinary content pages ship no executable framework JavaScript. Interactive
  map, office refresh and full-BFF tools use narrowly scoped React islands.
- Preserve URL state, native links, browser history, office fallback and truthful
  freshness. No browser-to-DLT calls or secrets in browser bundles.
- Keep the same `out` build directory, Worker API contract, KV and free host.
- Keep existing Go/PostgreSQL code and optional tools without deploying them.
- No paid services, new datastore, model call, auth, booking or monitoring.

## Architecture decision

Astro replaces Next as the static page compiler. Existing React views can render
to HTML at build time without client hydration; rewrite them only where a real
interactive boundary requires it. Keep existing FSD `views` and lower layers;
`src/pages` holds Astro entry points and `src/app` global layout/styles.

Public deterministic rules may be written once in TypeScript and shared between
the browser and Worker when both actually consume them. Server-only I/O, secrets,
validation at write boundaries and model calls remain on the server. Do not
create an unused shared-domain package or port Go slot/history rules in this
migration. New eligibility claims still require sourced product specification.

## Risks and proof

The main risks are lost indexed URLs/metadata, accidental hydration of content,
broken query navigation, and an inert refresh control. Compare the previous
static export with Astro output and exercise the real browser flow. Keep current
checks; add only focused migration proof for these stable contracts.
