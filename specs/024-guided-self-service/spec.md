# Feature 024: Guided Self-Service Licence Plan

**Status:** Draft story map; research complete, implementation not started

**Created:** 2026-09-26

**Backlog:** B15, building on B07/B08/B09

**Evidence:** [Video/product research](../../docs/research/2026-09-26-first-five-minutes.md),
[2026-10-02 technology audit](../../docs/research/2026-10-02-technology-audit.md)

## Outcome

Within five minutes, a supported applicant can explain their next action, what
to bring, where to verify it, the known costs and the remaining uncertainties.
They can save a useful plan and deal directly with the relevant organisations.
Five minutes is a hypothesis to validate, not a current performance claim.

The first release covers one sourced journey in one region. A first car licence
in Pattaya without owning a car is the proposed discovery candidate, not an
already validated audience or an eligibility promise.

## Story map

### US1 / First slice: Find my route

As an applicant, I choose my location, licence goal and relevant current
documents so I can see a short plan without understanding DLT terminology.

- Show a few plain choices and examples; no registration or document upload.
- Explain which answers affect the route and let the user correct them.
- Start with an editorially reviewed route template. Unsupported situations
  receive a clear boundary and a useful confirmation step, not a guessed plan.

### US2 / First slice: Know what is missing

As an applicant, I see what I have, what I lack and what must happen first so I
can avoid an unnecessary trip.

- Distinguish accommodation notification/TM30 from residence/address evidence.
- Show document validity and dependency rules only when the exact route's
  sources support them. Do not universalize one branch's practice.
- Every material requirement links to its source, date, scope and evidence kind.

### US3 / First slice: Know where I can actually do it

As an applicant without a car, I can distinguish a direct DLT route from a
school-assisted route and identify what each place provides.

- Separate training location, test location and licence-issuance location.
- Distinguish training vehicle, exam vehicle, transmission and additional fees.
- Unknown is not “unavailable”; provider marketing is not verified accreditation.
- Give a direct contact and a short question to resolve missing evidence.
  No paid ranking or provider recommendation unsupported by checked facts.

### US4 / First slice: Understand the budget and timing

As an applicant, I see the components of cost and the known sequence before
choosing a route.

- Separate official fees, optional school/provider packages and incidental costs.
- Show inclusions/exclusions, source dates and unknown amounts; avoid double
  counting fees included in a package. An incomplete subtotal is not a total.
- Keep service duration, appointment lead time and uncertainty distinct.
  No guaranteed appointment, pass, eligibility or completion date.

### US5 / First slice: Take the plan with me

As an applicant, I can copy or print the plan and return to a local checklist
without an account.

- Retain source dates and unresolved questions in the saved result.
- Start with browser print/copy; no dedicated PDF service or cross-device sync.
- A later share link contains only an impersonal route template, never the raw
  prompt, visa/passport details or a user's checklist state without consent.

### US6 / Conditional: Describe my situation naturally

As an applicant, I can type a short description instead of navigating unfamiliar
categories, then confirm the extracted answers and receive the same sourced plan.

- AI interprets input; it does not invent offices, facts, prices or legal rules.
- Validate fields and references in code; do not trust schema-valid output as
  evidence of factual correctness. Ambiguity remains explicit.
- Use one bounded model call initially; timeout, invalid output or exhausted
  quota returns to the ordinary controls. No-model use stays fully supported.
- Ask the user about missing or contradictory answers. Only a demonstrated,
  recoverable interpretation error may justify one stronger retry after an
  explicit budget decision. Model confidence alone is not an escalation trigger;
  missing policy evidence requires source review, not more model reasoning.
- Tell the user what goes to the model service. Do not solicit identity scans,
  retain raw prompts in analytics, or put private input in URLs/shared caches.

### US7 / Conditional: Learn from a recent visit

As an applicant, I can read a dated account from someone who used the same
office and route, and submit a correction after my visit.

- Prefer structured facts: branch, visit date, route, requested documents,
  itemized cost, vehicle arrangement and outcome. No identity-document uploads.
- Initial reports can be manually curated with consent; public submission is
  deferred until moderation, redaction, abuse handling and removal are specified.
- A report is not official policy. Conflicts remain visible. No fabricated
  reviews, copied third-party review corpus or unsubstantiated “verified” badge.

### US8 / Conditional: Use the facts from my AI assistant

As a connected assistant's user, I can request the same route and office
information through read-only MCP tools with sources and uncertainties intact.

- Reuse the website's data/contract; no separate agent knowledge base.
- Proposed capabilities are route lookup, office facts and checklist retrieval,
  not existing endpoints or committed tool names.
- Launch only for an identified client/use case, with bounded requests, source
  attribution and failure behavior. No booking, payment or official submission.
- The connected client may run the inference itself; serving public MCP facts
  does not inherently require our own model call. Check client support and setup
  friction; do not promise automatic discovery or free anonymous website chat.

### US9 / Maintenance: Keep the plan trustworthy

As the guide's editor, I can identify which reviewed facts may have changed and
publish a source-linked correction once, so every applicant receives the update.

- Start with the existing source-review workflow and manual diffs. An optional
  model may draft a correction, never approve or publish policy by itself.
- Retain source scope, read date, evidence kind and the responsible reviewer.
  Failed fetches and unchanged page text are not proof of current practice.
- A changed office-list snapshot does not renew procedural/provider facts.
- No new scraper, cron, public writes or editorial framework is required by this
  story. Measure actual review effort before automating recurring work.

## Trust and success criteria

Keep the existing `official`, `reported`, `proven` and `official-only` boundaries.
Do not refresh a claim's date because a scraper, office refresh or model ran.
Stale, contradictory or missing evidence must remain visible in the result.

For the first five observed applicants, target at least four correctly explaining
their next step and unresolved questions within five minutes without coaching.
This is a small discovery gate, not statistical validation. Any fabricated or
materially mis-scoped requirement blocks expansion until corrected. Then finish
B07's ten real journeys, including later self-reported progress where available.
Track useful next steps and avoidable confusion, not chat length or daily usage.

## Non-goals and launch boundaries

No nationwide eligibility engine, guarantees, automated official transactions,
paid intermediaries marketplace, auth, payments, alerts or passport processing.
No Astro migration, vector store, agent framework or new datastore in this story
map. The current public product remains unchanged by these documents.

US1-US5 form one narrow vertical slice, not five broad platform projects.
US6-US8 are conditional options; US9 is a maintenance responsibility, not another
platform launch. The plan must pass the current constitution
check before implementation; this draft does not override it.
