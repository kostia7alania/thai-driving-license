# Feature 025 delivery plan

1. Preserve the dirty research work and baseline export; confirm fetched main.
2. Amend architecture instructions for the owner's accepted static-first stack.
3. Add Astro/React integration and Astro checking; remove Next dependency and
   route wiring only after replacement. Preserve existing public env names.
4. Reuse content views without hydration, isolate interactive features, replace
   Next links/router APIs with native browser behavior.
5. Preserve SEO/asset paths and Cloudflare static-first serving. Keep images as
   unchanged static brand assets instead of requiring an image-rendering runtime.
6. Run lint, typecheck, existing tests/data checks, configured free/full-BFF build,
   export parity and local Worker/browser verification. Report exact limitations.

No paid resource creation or new deployment is implied by a local check. A live
deployment remains a separately recorded delivery gate. No Go data migration.
