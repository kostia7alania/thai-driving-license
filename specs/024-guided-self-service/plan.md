# Feature 024: Discovery and Delivery Plan

## Baseline

Research began with clean `main` matching fetched `origin/main` at `647e428`.
The current Next.js export, Worker/KV office directory and sourced guides are
reusable. A personal plan, provider comparison, AI input, public reviews and MCP
are not implemented. Full-BFF deployment is not a prerequisite for discovery.

## Sequence

1. Select one route/region from real applicant or query evidence and source
   coverage. Audit its document dependencies and a small number of relevant
   offices/providers. No outreach is performed without the owner's direction.
2. Produce one representative plan using existing source records, with explicit
   gaps. Resolve business-logic ownership before implementing selection logic.
3. Build the smallest US1-US5 slice: existing stack, reviewed templates, visible
   answers, itemized costs and browser print/copy. Reuse existing evidence UI.
4. Observe five real people without coaching, record misunderstandings and
   correct the plan. Continue to the existing B07 ten-journey review.
5. If natural-language entry helps, benchmark one currently free-eligible model
   on representative inputs. Add a bounded interpreter only if it improves the
   result without inventing material facts. Otherwise keep the plain controls.
6. Consider moderated reports or read-only MCP only when an actual contribution
   flow or external client justifies the ongoing maintenance.

## Ownership decision

The [2026-10-02 technology audit](../../docs/research/2026-10-02-technology-audit.md)
initially recommended retaining Next static export and proposed a bounded
TypeScript template assembler for new plans. The owner subsequently approved
Astro static and shared public TypeScript rules, recorded in Feature 025 and
constitution 1.2.0. Go/PostgreSQL slot/history code stays intact; D1 is not approved.

The exception allows one pure deterministic public implementation where both
browser and Worker actually consume it. Server secrets, I/O, AI calls and write
validation stay server-side. Do not create an unused shared package or duplicate
eligibility rules in Go and TypeScript. The actual planner still needs one sourced
route and its acceptance criteria before implementation.
Do not start a Go deployment simply to satisfy a speculative AI architecture.

Proposed logical boundary, independent of runtime:

```text
Plain controls or optional text interpretation
  -> user-confirmed, validated route inputs
  -> reviewed route + scoped source records
  -> deterministic plan and references
  -> website; later the same data through read-only MCP
```

No model is needed to choose a known template or add known fee components.
If introduced, the interpreter only normalizes language. Unknown values and
unsupported cases remain explicit; reviewed data owns the factual output.
Preserve a typed HTTP boundary if server execution is selected, so a later BFF
can replace it without rewriting the UI. Do not create unused abstraction layers.

## Operating limits

- Static guidance and plain controls must work when inference fails or is disabled.
- No paid-plan activation; finite quota, bounded input/output, timeout and abuse
  handling must be verified before a public model endpoint is enabled.
- Source updates are reviewed editorial changes, not runtime writes to Git.
- Public feedback needs a moderation owner and storage/privacy decision before
  enabling writes. Do not turn KV into an unplanned durable review database.
- No new direct dependencies or external services are installed by this plan.
  The separate Next maintenance update and checks are recorded in `tasks.md`.

## Validation proportional to risk

For this documentation change, check relative links, story/task consistency and
`git diff --check`; application tests cannot validate these product hypotheses.
For implementation, run the existing affected checks and one real browser flow.
Add focused automated proof only for stable expensive failures: invented or
mis-scoped requirements, incomplete totals labelled complete, identity leakage,
 and model-failure fallback. No coverage target or combinatorial test matrix.

For AI evaluation, use the few representative inputs actually encountered in
discovery, including an ambiguous and unsupported case. Record errors, latency
and quota use. Do not claim a statistically significant comparison from five
participants or count synthetic browser runs as B07 user evidence.
