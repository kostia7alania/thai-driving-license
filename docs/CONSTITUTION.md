<!--
Sync Impact Report
Version change: 1.1.0 -> 1.2.0
Modified principles: II adopts Astro static delivery and bounded shared TypeScript logic
Added constraints: explicit browser/server boundaries and Free-plan-only operation
Removed constraints: none
Templates requiring updates: Feature 025 plan records the accepted migration
Follow-up TODOs: validate Feature 024 data before implementing personal plans
-->

# Thai Driving License Constitution

## Core Principles

### I. MVP Simplicity and Explicit Non-Goals
The project MUST stay minimal until a working DLT slot discovery MVP exists.
Authentication, billing, Redis, Kafka, NATS, background queues, websockets, and
booking automation MUST NOT be added unless the user explicitly requests them.
Complex abstractions MUST be rejected when direct, production-readable code is enough.

### II. Static-First UI and Explicit Server Boundaries
Astro MUST compile public content to static HTML; hydrate only interactive UI.
Cloudflare Workers and the existing KV snapshot serve the free public runtime.
Public deterministic rules MAY be implemented once in TypeScript and reused by
browser and Worker when both need them. Secrets, upstream I/O, model calls and
authoritative validation of writes MUST stay server-side. The existing Go API
and PostgreSQL slot/history contracts remain intact and optional for deployment.
PostgreSQL remains the only durable product datastore until a separate storage
decision; KV is a replaceable public cache, not durable history or reviews.
Do not add booking logic or identity processing. No ORM without explicit approval.

### III. OpenAPI-First JSON API
The backend MUST expose JSON endpoints under `/v1`, a health endpoint at `/healthz`,
and local OpenAPI documentation. Request and response models MUST be explicit and
stable enough for the frontend and future agents to consume without reading handler
internals.

### IV. Preserve External DLT Contract Exactly
Strings and field names observed from the DLT Smart Queue API MUST be treated as an
external contract. Known oddities such as `Car and Motocycle`, `car`,
`New thai driving license.`, `Renew thai driving license.`, `เต็ม`, and `[empty]`
MUST NOT be silently corrected in parsers, fixtures, or documentation.

### V. Repo-Owned AI Context
Important product, architecture, and implementation context MUST live in repository
Markdown files, not only in chat history. New work SHOULD start from
`docs/TASK_INDEX.md`, the active `specs/*/spec.md`, `plan.md`, and `tasks.md`.
Agents MUST update task checkboxes and relevant docs as work completes.

### VI. Verifiable Incremental Delivery
Each implementation slice MUST be independently testable. Before marking a task
complete, the agent SHOULD run the smallest relevant validation command. Contract,
parsing, and API behavior changes SHOULD include tests or documented manual checks.

## Technology Constraints

- Go version: 1.26+, linted/formatted by golangci-lint v2 with gofumpt.
- Node.js: Current release line (26.x), pinned via `.nvmrc` and `engines`.
- Frontend lint/format: Biome (single tool); no ESLint or Prettier.
- Backend router: chi or Huma with chi adapter.
- Frontend: Astro static output with TypeScript and selective React islands.
- Local services: Docker Compose for PostgreSQL only (PostgreSQL 18).
- API responses: JSON only.
- Handlers: context-aware.
- MVP notifications are documentation-only unless explicitly promoted to scope.
- Feature 021 may use one Cloudflare Worker, Workers Static Assets, Cron Triggers
  and one Workers KV office snapshot on the Free plan. D1, R2, Durable Objects,
  runtime Git writes and slot monitoring remain out of scope.
- Do not activate paid plans or paid model fallback. Quota exhaustion must retain
  usable static guidance and clearly disable unavailable dynamic capabilities.

## Development Workflow

1. Read `AGENTS.md`, `docs/TASK_INDEX.md`, and the active feature under `specs/`.
2. If the request is larger than a small fix, update or create spec artifacts first.
3. Implement tasks in `tasks.md` order, preferring the MVP user story first.
4. Keep external DLT observations traceable to `docs/idea.md` and `docs/assets/`.
5. Do not introduce auth, queues, Redis, or booking automation without explicit scope change.
6. Finish by updating task checkboxes and summarizing validation performed.

## Governance

This constitution supersedes ad-hoc agent behavior and generated boilerplate. Changes
to these principles require an explicit documentation update, a version bump, and a
short rationale in the relevant spec or decision document. Feature plans and tasks
MUST pass the constitution check before implementation.

**Version**: 1.2.0 | **Ratified**: 2026-05-16 | **Last Amended**: 2026-10-02

Amendment 1.0.1 (2026-07-07): technology constraint versions refreshed to current
upstream releases (Go 1.26+, Node 24 LTS, PostgreSQL 18) as part of the feature 004
stack refresh. No principle changes.

Amendment 1.0.2 (2026-07-07): Node moves to the Current line (26.x) at the user's
explicit request (accepting non-LTS until October 2026), and the toolchain is
standardized on Biome (web) and golangci-lint v2 + gofumpt (Go) per the feature 005
research. No principle changes.

Amendment 1.1.0 (2026-09-21): the owner explicitly authorized a zero-cost
Cloudflare first release. Feature 021 may cache only the public office list in KV
and expose it behind the existing `/v1` contract; the Go/PostgreSQL core retains
all slot, history, eligibility and booking semantics.

Amendment 1.2.0 (2026-10-02): the owner accepted Astro and a shared TypeScript
browser/Worker boundary for a free-first product. Feature 025 migrates existing
pages without adding a database, model endpoint or personal-plan implementation.
Existing Go/PostgreSQL capabilities are preserved rather than ported or deployed.
