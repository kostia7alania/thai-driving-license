# Technology audit: useful plans, small runtime

**Checked:** 2026-10-02. **Status:** Research and proposed architecture, not a
new deployment or an amendment to the constitution. Builds on the
[video/product research](2026-09-26-first-five-minutes.md) and
[Feature 024](../../specs/024-guided-self-service/spec.md).

## Recommendation

Keep the existing Next static export, TypeScript, Workers Static Assets and KV
office snapshot. Do not migrate frameworks to start the guided plan. Propose a
bounded TypeScript template assembler for new self-service plans; retain the
existing Go/PostgreSQL slot/history implementation without making its deployment
a prerequisite. That ownership change needs explicit acceptance and a scoped
constitution amendment before implementation. No such amendment is made here.

If starting this content-led product from zero, prefer Astro static pages with
small interactive islands, typed reviewed data and a Worker only where a server
is needed. This is a design judgement, not a measured speed comparison. The
existing Next implementation is already static; removing an SSR server that does
not exist cannot save hosting cost.

GPT makes implementation cheaper, but does not remove dependency updates, runtime
limits, privacy obligations, incident recovery or the need for correct evidence.
Choose technology for those jobs, not for the amount of code an agent can write.

## What each component earns

| Component | Actual job / decision | Trigger for something more |
| --- | --- | --- |
| Next static export + React | Existing routes, metadata, generated pages and interactive map; keep | Consider Astro only after measured loading/interaction pain or recurring content-authoring cost outweighs migration |
| TypeScript | Explicit data/input/result contracts; keep | No generic provider framework before a second real implementation |
| Tailwind, Base UI/shadcn, Biome | Existing styling, components and one formatter/linter; keep | Remove a dependency only after checking its actual imports and replacement cost |
| FSD | Keep existing downward imports; use a small feature, not empty layers | Extract only real duplication; no architecture-wide rewrite |
| Worker + Static Assets | Static delivery and bounded same-origin refresh; keep | Request-time computation only when it cannot be done once at build time or safely in the browser |
| KV | One public, replaceable office snapshot; keep | Not a moderation queue, transaction log or strict deduplication store |
| Repository data | Reviewed procedure/provider facts with source, scope and date | Keep structured records; a small finite dataset does not need semantic search |
| Go + PostgreSQL | Implemented slot/history API and persistence; preserve | Run it when a validated slot/history requirement earns the operational cost |
| D1 | Do not add now; it would also change the Postgres-only rule | Reassess only for accepted public reports/moderation with write/query/audit needs |
| LLM | Optional language-to-fields interpreter, not a policy authority | Add only if it improves observed input friction over visible controls |
| MCP | Conditional read-only distribution adapter | One identified assistant/client that benefits from the same public facts |
| Agent SDK, LangGraph, vectors, queues | No current requirement; do not add | Resumable stateful work, difficult corpus retrieval or durable jobs actually demonstrated |

[Next export](https://nextjs.org/docs/app/guides/static-exports) supports build-time
HTML and client interactivity without runtime Server Actions/ISR. Astro's
[islands](https://docs.astro.build/en/concepts/islands/) and
[React integration](https://docs.astro.build/en/guides/integrations-guide/react/)
fit the greenfield recommendation. A migration still touches routing, layouts,
metadata, canonical URLs, sitemap/robots, generated images and navigation.
[Vite alone](https://vite.dev/guide/ssr.html) is not a turnkey content SSG.

## Free hosting is a bounded operating mode

[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
serves static requests free and without a request quota. Dynamic Free-plan Workers
have [100,000 requests/day and 10 ms CPU per invocation](https://developers.cloudflare.com/workers/platform/limits/).
The current `run_worker_first` paths are `/healthz` and `/v1/*`; their quota failure
must not be confused with loss of all ordinary static pages. Keep the committed
fallback usable. AI endpoints would need their own measured CPU, rate and abuse
budgets before launch.

[KV](https://developers.cloudflare.com/kv/platform/limits/) currently includes
100,000 reads/day, 1,000 writes/day and 1 GB. Its
[eventual consistency](https://developers.cloudflare.com/kv/concepts/how-kv-works/)
can delay visibility for 60 seconds or longer. It is appropriate for a dated
snapshot, not strict concurrent moderation or idempotency.

Moving to Pages does not make inference/functions free of quotas:
[Pages Functions share Workers limits](https://developers.cloudflare.com/pages/platform/limits/).
Cloudflare's announced [full-stack direction is Workers](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/),
not evidence that Pages will stop working. We already use that direction.

If reports later justify a database, compare D1 with reusing PostgreSQL then.
[D1 Free pricing](https://developers.cloudflare.com/d1/platform/pricing/) includes
5 million rows read/day, 100,000 rows written/day and 5 GB total storage; its
[limits](https://developers.cloudflare.com/d1/platform/limits/) also cap a Free
database at 500 MB. Exhaustion can fail database operations. Static published
guidance should survive, whichever write store is selected.

The existing map uses OpenStreetMap's public tile service, which is
[best effort, not an unlimited hosted-map SLA](https://operations.osmfoundation.org/policies/tiles/).
Keep the text office list usable; do not introduce tile prefetch/offline downloads.
Free hosting does not remove editorial work, moderation or third-party policies.

## Product AI: escalation by failure type, not confidence theatre

The proposed flow is ordinary code first:

1. Known choices select a reviewed template; no model call.
2. Optional free text goes to one small model, returning editable fields and
   supporting spans from the user's input, not a generated legal answer.
3. Code checks types, allowed values, contradictory fields and supporting spans.
   The user confirms material answers. Schema-valid output alone is not truth.
4. Missing applicant information asks the user a focused question. Missing or
   conflicting policy evidence asks for source review, not a stronger model.
5. Only a recoverable interpretation failure demonstrated in evaluation may use
   one stronger retry, if the owner approved its budget. Otherwise use controls.
   Timeouts and quota exhaustion never activate a paid fallback silently.

No agent loop, web browsing, arbitrary tool execution or autonomous submission is
needed for this interpreter. Never log raw prompts in analytics or put private
input in URLs/shared caches. Treat retrieved text as data, not instructions.

Candidate costs below are current published Standard text rates, USD per million
uncached input/output tokens. They are not benchmark results or selected services.

| Candidate | Input / output | Proposed use |
| --- | --- | --- |
| [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna) | $0.10 / $0.50 | Cheap extraction candidate; start `none`/`low` and evaluate errors |
| [GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) | $2 / $10 | Optional single harder-case retry, not every request |
| [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) | $10 / $50 | No demonstrated need in the public planner |
| [Workers AI Gemma 4 26B A4B IT](https://developers.cloudflare.com/workers-ai/platform/pricing/) | $0.10 / $0.30 equivalent | Free-allowance evaluation candidate; do not assume OpenAI effort controls |

Illustrative arithmetic: 1,000 input + 300 **total billed output** tokens costs
$0.00025 on Luna, $0.005 on Sol and $0.025 on Astra. A thousand Luna requests plus
100 additional Sol retries would cost $0.75, excluding tools, hosting and other
fees. These token counts and the 10% retry rate are assumptions, not observations.
[Reasoning tokens are billed as output](https://developers.openai.com/api/docs/guides/reasoning);
a 300-token visible answer may cost more, and too-small output limits can prevent
completion.

Workers AI has 10,000 free Neurons/day, not 10,000 free chats. At the listed Gemma
rates, the same assumed token counts consume about 17.27 Neurons/request, or about
579 requests if nothing else consumes the allowance. Actual output and usage
change that number. Free calls fail at exhaustion; confirm model eligibility and
measured latency/accuracy before enabling it. No inference was benchmarked or
paid service enabled in this research.

## Two useful AI uses before an expensive chat product

**Editorial assistance:** compare a changed official/provider page with its prior
record once, draft a source-linked correction and let an editor approve it. Every
visitor then benefits from the same reviewed data. A successful fetch or model run
does not refresh the claim's verification date. Do this manually first; new cron
collection is not authorized by this proposal.

**Client-side inference through distribution:** a read-only MCP server can return
public route facts to a user's connected ChatGPT/Codex or other client. That client
can do the reasoning; our server need not run its own LLM for those tool calls.
There are still endpoint costs, quotas, client support and setup friction. This is
not equivalent to putting a free anonymous chatbot on the website, and not every
assistant automatically discovers MCP. Use the
[same public contracts](https://modelcontextprotocol.io/docs/learn/architecture),
not a second knowledge base. Normal website code calls the core directly.

A ChatGPT/Codex subscription does not automatically pay an arbitrary backend's
API bills. Current [Sign in with ChatGPT](https://developers.openai.com/siwc/quickstart)
offers eligible user-authorized integrations, subject to its eligibility and
OAuth scope. That is a separate authenticated product choice, not our no-auth
public MVP. No user tokens or private Life OS records belong in the public data.

## AI-first development without another platform

Keep repo Markdown, the existing `spec.md` / `plan.md` / `tasks.md` sequence,
small diffs and risk-based checks. No Spec Kit CLI installation, orchestrator,
new task database or skill framework is necessary. Specs state behavior and
boundaries; implementation remains inspectable code, not a permanent prompt.

Suggested coding escalation, informed by current
[model-selection guidance](https://developers.openai.com/api/docs/guides/model-selection):

| Work | Starting point | Escalate when |
| --- | --- | --- |
| Inventory, exact replacements, known commands | Deterministic tools; Luna low for bounded interpretation | A specific ambiguity remains after source inspection |
| Normal feature or reproduced multi-file bug | Sol low/medium | A check fails for a reason the current attempt cannot resolve |
| Conflicting architecture/evidence, costly security decision | Sol high; Astra medium/high only if still unresolved | Concrete evidence conflict/high failure cost, not merely task length |

Use independent subagents for bounded audits with no overlapping edits. In this
audit, Luna medium inventoried source while Sol high handled two research topics;
no comparative benchmark establishes those settings as optimal. Do not increase
all efforts globally or build an agent router just to document this policy.

## Maintenance discovered during the audit

The starting lockfile had Next 16.2.10. The official
[September 30 security release](https://nextjs.org/blog/september-2026-security-release)
fixes a local `next dev` MCP origin-check issue in 16.3.8, among other findings.
Production static assets do not expose that development endpoint. This is a
concrete reason for a narrow existing-dependency update, not for an Astro rewrite.
The update/check outcome belongs in [Feature 024 tasks](../../specs/024-guided-self-service/tasks.md).

Local update outcome: Next 16.3.8, existing web checks and configured static
export passed. Post-update audit still reports 10 entries (6 high, 4 moderate,
no critical), with Next absent. No production deployment or browser QA was done.

Read-only `npm audit --omit=dev --json` initially reported 14 package entries
(1 critical, 9 high, 4 moderate). Dependency classification is not reachability:
many paths are build/shadcn CLI dependencies, not Worker imports. The reported
critical Next OG issue needs attacker-controlled SVG; inspected generated images
use local constants. Remaining build/CLI advisories still deserve targeted
maintenance, not a claim that the exported site is either exploited or risk-free.

Registry checks also found newer React, TypeScript, Wrangler, Biome and Tailwind
versions. Do not bundle unrelated major upgrades into this product decision.
Latest version, fastest UI and best fit are three different claims.

## Follow-up decision

The owner subsequently approved Astro static with selective React islands and
one shared public TypeScript implementation where browser and Worker need the
same deterministic rules. Feature [025](../../specs/025-astro-static-migration/tasks.md)
records this implementation and constitution 1.2.0 supersedes the pending-choice
language in this historical audit. Existing Go/PostgreSQL remains unchanged;
no D1, paid models or new provider resources are enabled by that migration.

## Original next decision

Accept or reject the bounded TypeScript ownership exception, then amend the
constitution and matching agent instructions if accepted. Do not remove the Go
source or change existing slot/history contracts. Source one complete applicant
journey, ship US1-US5 and observe the first five people. Add US6/US7/US8 only for
observed friction, contributions or a named MCP client. US9 makes the ongoing
editorial responsibility explicit. No parallel nationwide platform build.

The likely durable direction is portable sourced data, static readable pages,
small explicit tools and replaceable model calls. That is our architectural bet,
not a prediction that a particular framework or model will win next year.
