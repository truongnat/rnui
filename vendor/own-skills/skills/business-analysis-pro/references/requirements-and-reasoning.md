# Requirements and structured reasoning (SA-style)

This skill supports **business analysis** work: clarifying needs, exposing logic, and making trade-offs **explicit** — similar to a **systems analyst (SA)** mindset, with emphasis on **auditable** reasoning (why A, not only what A).

## Problem and scope

- **Problem statement** — What pain or opportunity (metric, compliance, user outcome)?
- **In / out of scope** — Boundaries; **phase** if MVP vs later.
- **Stakeholders** — Who decides, who is affected, who provides data?

## Elicitation and clarification

- **Open vs closed questions** — Start broad; narrow to testable statements.
- **Current state (as-is)** — How it works today (process, data, systems); **future state (to-be)** — target behavior.
- **Gap** — Delta between as-is and to-be; **dependencies** on other teams or systems.

## Prioritization

- **MoSCoW** — Must / Should / Could / Won’t (timebox Won’t).
- **Risk vs value** — Quick wins vs strategic bets; document **assumptions** behind priority.

## Functional requirements

- **User-centric** — “As a … I need … so that …” where helpful; **acceptance criteria** testable (Given/When/Then or checklist).
- **Traceability** — Link each requirement to **source** (workshop note, regulation, ticket id).
- **IDs** — Stable keys (`FR-12`, `NFR-3`) for cross-referencing in reports.

## Non-functional requirements (NFRs)

- Performance, availability, security, privacy, audit, localization — **measurable** where possible (e.g. “p95 under 300 ms” not “fast”).

## Reasoning quality (better than informal SA notes)

- **Decision record** — Option A vs B; **criteria** (cost, time, risk); **chosen** option and **rejected** alternatives with reason.
- **Assumptions and open questions** — Separate sections; **owner** and **due** for each open item.
- **Contradictions** — Surface conflicts early; do not bury in prose.

## References (industry)

- [IIBA BABOK Guide](https://www.iiba.org/business-analysis-babok-guide/) — business analysis practices (overview; use your org’s licensed copy for full text).
