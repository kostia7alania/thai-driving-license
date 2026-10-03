# Feature 024 Tasks

## Research delivered

- [x] T2401 Inspect the repository, current constraints and fetched base.
- [x] T2402 Read the supplied video's complete available transcript and check
  transferable ideas against primary sources.
- [x] T2403 Record local-data gaps, free-runtime limits and framework tradeoffs.
- [x] T2404 Draft outcome-oriented stories and connect them to the backlog.
- [x] T2413 Check documentation links, whitespace and proposal/delivery boundaries.
- [x] T2414 Recheck the actual stack, current platform/model documentation and
  escalation tradeoffs; extend the stories with client-inference MCP and editing.
- [x] T2415 Update the existing Next dependency for the September 30 security
  release; run affected checks to protect static-export compatibility.
- [x] T2416 Validate the expanded research links and current-rule/proposal boundary.

## First vertical slice, not yet started

- [ ] T2405 Choose one applicant route/region and verify its source coverage.
- [ ] T2406 Review one complete example plan and resolve the constitution/runtime
  decision before implementing executable route logic.
- [ ] T2407 Implement the bounded US1-US5 plan, including unknowns and print/copy.
- [ ] T2408 Run affected checks and a real browser flow, including missing data.
- [ ] T2409 Observe five real applicants; document next-step comprehension,
  material errors and follow-up progress, then continue B07's ten-journey review.

## Conditional, not launch requirements

- [ ] T2410 Evaluate US6 only if natural-language entry addresses observed friction;
  verify finite cost, privacy and no-model fallback before enabling it.
- [ ] T2411 Specify US7 contribution/moderation only when real reports warrant it.
- [ ] T2412 Specify US8 read-only MCP only for an identified external client.

## Dependency maintenance follow-up

- [x] T2417 Resolve the remaining build/CLI dependency advisories with targeted
  compatible updates and affected checks. Risk: vulnerable developer/build tools;
  do not mistake this for a confirmed reachable production Worker vulnerability.

Research completion does not close B07, verify a school/provider, or mean that
any of these capabilities has been deployed.

Feature 025 follow-up on 2026-10-02: Astro replaces Next, the ownership decision
is accepted in constitution 1.2.0, and compatible updates of the remaining
transitive build/CLI dependencies produce zero `npm audit` findings (including
the dev tree). Lint, Astro/TypeScript checks, all 60 tests, data reproducibility
and configured builds pass. Earlier audit results below remain historical.

October 3 release follow-up: Feature 025 is deployed and publicly verified.
Today's audit has two new root build/CLI advisories without patched versions;
see Feature 025 for the scoped reachability assessment. The October 2 zero-audit
result is historical. None of this implements the personal planner above.

## Validation: 2026-09-26

- All 33 relative file links across the eight changed/new documents resolve.
- `git diff --check` passed; story priorities and unchecked delivery tasks were
  reviewed against the current constitution and existing B07/B08/B09 scope.
- No application code, dependencies, public infrastructure or production content
  changed. Application tests and deployment were not run for this documentation
  change. The new five-minute experience remains unimplemented and unmeasured.

## Validation: 2026-10-02

- Fetched `origin`; local `main` and `origin/main` both remained at `647e428`.
  Preserved the existing uncommitted research/story-map changes.
- Updated only the existing direct Next dependency to `^16.3.8`; the lockfile
  resolves 16.3.8 and refreshes its required/optional transitive packages.
  No new direct dependency, model integration or public service was added.
- On Node 26.2.0 / npm 11.13.0: `npm run lint`, `npm run typecheck`, all 60
  existing `npm run test` tests, and `npm run data:check` passed (218 offices).
- The configured free `npm run build` passed: 255 generated static pages,
  `NEXT_PUBLIC_SITE_URL=https://thai-driving-license.kostia7alania.workers.dev`,
  empty `NEXT_PUBLIC_API_URL`, and `NEXT_PUBLIC_SLOT_TOOLS_ENABLED=false`.
- `npm audit --omit=dev --json` still exited 1: 10 package entries, 6 high and
  4 moderate, no critical (initially 14: 1 critical, 9 high, 4 moderate).
  Next no longer appears in that audit. Remaining entries are
  `@hono/node-server`, `baseline-browser-mapping`, `brace-expansion`,
  `browserslist`, `fast-uri`, `hono`, `ip-address`, `js-yaml`, `qs`, `undici`.
  This is an advisory report, not proof of exploitation or a complete threat audit.
- All 43 relative file links across the nine research/product/spec documents
  resolve; `git diff --check` passed. A separate read-only source review found
  no material mismatch in the current-rule/proposed-exception boundary.
- No manual browser QA, Go/PostgreSQL integration suite, public deployment,
  paid inference or model-quality benchmark was run in this audit. The new
  planner remains a proposal; the constitution remains unchanged. Changes are
  local and uncommitted, not a production release or a completed B07 study.
