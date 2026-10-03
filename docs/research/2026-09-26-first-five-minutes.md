# Research: a useful licence plan in the first five minutes

**Researched:** 2026-09-26

**Decision status:** Product hypotheses, not implemented capabilities.

**Next artifact:** [Feature 024 story map](../../specs/024-guided-self-service/spec.md).

**Follow-up:** [2026-10-02 technology audit](2026-10-02-technology-audit.md)
rechecks the runtime, current model costs, escalation and MCP client inference.
It does not revalidate the dated Thai provider sample below.

## Method and limits

Read the complete available automatic English transcript of the owner's
[18-minute video by ИИШНЫЙ](https://www.youtube.com/watch?v=7KDYQ3fC-v8), then
checked founder accounts, platform documentation and a small sample of Thai
government/provider sources. The transcript contains transcription errors;
financial figures and causal claims in the video are not independently audited.
This is not a full visual analysis, market-size study or completed local-provider
verification. No applicant interviews, bookings, messages or purchases were made.

## What transfers from the video

| Video section | Idea | Application to this product |
| --- | --- | --- |
| [01:23](https://www.youtube.com/watch?v=7KDYQ3fC-v8&t=83s) | Lovable makes software creation accessible to non-programmers | Describe the outcome as preparing to get a licence independently, not understanding a DLT API |
| [07:01](https://www.youtube.com/watch?v=7KDYQ3fC-v8&t=421s) | Early useful results support activation | Produce a usable plan before requiring an account, extensive reading or open-ended chat |
| [10:43](https://www.youtube.com/watch?v=7KDYQ3fC-v8&t=643s) | Gamma's output can distribute the product | Let people share an impersonal route template; never expose their documents or situation by default |
| [14:34](https://www.youtube.com/watch?v=7KDYQ3fC-v8&t=874s) | Base44's early feedback involved hands-on observation | Observe a small number of applicants attempting the real next step before scaling features |

These are hypotheses worth testing, not a recipe for reproducing the featured
companies' growth. Their fundraising, acquisition values, creator budgets and
daily usage do not establish the economics of a free, episodic public guide.

## Primary-source checks

- **Gamma:** [Grant Lee's founder account](https://www.linkedin.com/posts/grantslee_when-we-started-gamma-we-didnt-have-some-activity-7412885808048738304-DkfZ)
  describes a disappointing post-launch plateau, three months improving the
  first 30 seconds, and stronger organic adoption after relaunch. This supports
  testing time-to-value; it is self-reported, not a controlled causal study.
- **Lovable:** [Anton Osika's interview, hosted by Lovable](https://lovable.dev/video/building-lovable-10m-arr-in-60-days-with-15-people-anton-osika-ceo-and-co-founder)
  describes enabling non-programmers to create working products and emphasizes
  product quality and word of mouth. It does not establish that a rename alone
  caused success. For us, the comparable artifact is an actionable plan.
- **Base44:** [Wix's 2025-06-18 announcement](https://www.globenewswire.com/news-release/2025/06/18/3101508/0/en/wix-further-expands-into-vibe-coding-with-acquisition-of-base44.html)
  confirms approximately $80 million initial acquisition consideration plus
  contingent earn-outs. It does not verify every early-user story or explain
  causality. The small-user-observation tactic above remains video-attributed.
- **Public-service design:** [GOV.UK Service Standard point 2](https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem)
  connects services around the user's whole problem while recommending
  incremental scope. Its January 2026 update explicitly includes avoiding
  technology-first AI choices. This is a closer product analogy than a daily
  creative SaaS: the journey spans several organisations and offline visits.

## The proposed five-minute result

Example input, not verified applicant advice: “I am in Pattaya, need a first
car licence, have no car, and want to do this myself.”

The result should expose:

1. The selected route and the answers/assumptions it depends on.
2. The next action and dependencies between address evidence, medical paperwork,
   training/testing and the official application, where supported by sources.
3. What the person already has, what is missing and what must be confirmed.
4. Relevant offices/providers, with training vehicles and exam vehicles separated.
5. Itemized known costs, conditional costs and unknowns, not an invented total.
6. A dated checklist to save/print and a direct official/provider hand-off.

Use a few visible choices with an optional text input. Ask only questions that
change the next step; an uncertain answer must not silently select a legal route.
The full problem is the direction, not a promise to automate every institution.
The service can remove information brokerage without replacing medical assessment,
proper driving instruction, official eligibility decisions or DLT issuance.

## Local research: why the data is the hard part

| Source checked | Observation | Product consequence |
| --- | --- | --- |
| [Immigration TM30 documentation](https://tm30.immigration.go.th/TM30/Foreigner/TM30EN/index.html) | Search-index extraction describes accommodation notification by property operators; direct extraction failed | Keep TM30 notification distinct from an address/residence certificate; do not infer a universal document chain |
| [Existing official DLT review](2026-09-22-procedural-source-review.md) | The earlier review distinguishes first application, renewal and archival conversion guidance; the DLT first-licence URL timed out today | Reuse dated evidence with its scope; do not advance its read date or imply today's policy was revalidated |
| [Chang Pattaya Driver](https://changpattayadriver.com/) | Search-index extraction advertises training vehicles and testing at the school; direct extraction was empty | A candidate for follow-up, not verified accreditation, foreign-applicant acceptance, final price or exam-car inclusion |
| [IC Services' school offer](https://icservicespattaya.com/thai-car-motorbike-driving-school/) | The provider advertises vehicles and training/filing bundles, but the inspected page does not itemize a price or clearly establish exam-day vehicle inclusion | Separate provider claims from government facts; do not reproduce guarantees or treat a bundle as the independent route |
| [Vibhavadi Hospital's certificate package](https://www.vibhavadi.com/en/package/health-checkup/specialized-medical-certificates-driving-diving-racing) | The page lists a driving-certificate package at THB 1,400, including stated fees and excluding additional recommended examinations/medication | Prices need provider, package, scope, inclusions and date; this is not a recommended clinic or a nationwide medical-certificate tariff |

The sample establishes useful fields and gaps, not a launch-ready Pattaya
directory. No verified comparison of schools providing versus not providing an
exam car was obtained. Missing evidence must stay unknown, not become “no”.

Start with a small editorial dataset in the repository. Each material fact needs
an exact source, applicant/branch/package scope, read date and review owner.
Automated change detection can flag a page for review; it cannot certify that
unchanged wording still reflects practice. Office-list refreshes do not refresh
procedural guidance. Review workload is a real cost even if hosting is free.

## Architecture and framework decisions

**Current versus greenfield.** The checked
[`next.config.ts` at the audited revision](https://github.com/kostia7alania/thai-driving-license/blob/647e428/apps/web/next.config.ts)
already uses `output: "export"`. Feature 025 later replaces this historical
configuration with Astro; this section records the September research baseline.
[Next's static export](https://nextjs.org/docs/app/guides/static-exports) creates
build-time pages; there is no request-time Next SSR in this release.
[Astro islands](https://docs.astro.build/en/concepts/islands/) would be a sensible
greenfield choice for content plus a few interactive controls. Astro is a
framework; SSR is a rendering mode. They are not alternatives at the same level.
Keep Next now; consider migration only for measured maintenance/performance pain.

**AI runtime.** Start with curated route selection and a deterministic result.
If natural language materially helps, add one bounded server-side model call to
extract editable answers into a validated schema. Render facts from the selected
source records, not model memory. No autonomous web browsing, arbitrary tool
execution, vector database or multi-agent system is necessary for this scope.
[Anthropic's guidance](https://www.anthropic.com/engineering/building-effective-agents)
supports starting with direct calls and increasing orchestration only when the
task warrants it. Its tooling has evolved since publication; the cited principle
does not imply any particular SDK is required.

**Free operation.** [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)
currently provides 10,000 free Neurons daily; Free-plan calls fail on exhaustion.
This is not 10,000 user requests. [Some models require Paid](https://developers.cloudflare.com/changelog/post/2026-07-28-models-require-workers-paid/).
Benchmark a currently Free-eligible model on actual route inputs before choosing
it. Require bounded input/output, timeout, abuse protection, a disable switch,
and a usable no-model path. Do not silently upgrade or promise permanent quotas.
Inference runs on a model service, not a miniature LLM hosted inside a Worker.

**MCP.** The [protocol architecture](https://modelcontextprotocol.io/docs/learn/architecture)
supports exposing tools/data to connected AI clients. A later read-only adapter
could expose the same route/office facts and sources used by the website.
It is a distribution hypothesis, not a prerequisite for the site's prompt box,
automatic discovery by every assistant, or a search-ranking guarantee.

**AI-first development.** The repo already follows the useful
[Spec Kit sequence](https://github.com/github/spec-kit): purpose/constraints,
specification, plan and tasks. No `.specify` or `.agents` directory is present;
do not claim a CLI is installed. Keep the existing Markdown workflow and small
reviewable slices. Add workflow software only when it removes a recurring,
observed coordination problem. Development tooling and the product's AI runtime
are separate decisions.

These are proposals. The [constitution](../CONSTITUTION.md) still assigns business
logic to Go and narrowly permits the Worker/KV office snapshot. Extending the edge
to AI or executable route logic needs an explicit architecture decision and a
scoped constitution amendment before implementation, not an accidental rewrite.

## First experiment and decision

Recommended candidate: one first-car-licence journey in Pattaya for someone
without a car. It directly tests the owner's example, but region/applicant scope
must be selected from actual demand and adequate sources before implementation.

Observe five real applicants using a thin, non-AI plan, then complete the existing
B07 ten-journey review. Record time to correctly identifying the next step,
unresolved blockers, later reported progress and editorial effort. Clicking an
official link is not getting a licence. Five-minute comprehension is an initial
target, not a measured result or proof of product-market fit.

Add text-based AI only if input/explanation remains a real obstacle. If missing
local facts are the obstacle, improve the facts. Defer public reviews until there
is a moderation owner, and MCP until a real client needs the data. Prefer one
end-to-end successful route over superficial nationwide personalization.
