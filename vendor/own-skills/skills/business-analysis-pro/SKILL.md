---
name: business-analysis-pro
description: |
  Professional business analysis: requirements elicitation, structured reasoning (systems-analyst style), prioritization, traceability, NFRs, and clear deliverables — BRD-style narratives, decision logs, and executive-ready reports.

  Use this skill when the user clarifies business or product requirements, writes a BRD/FRD, analyzes gaps (as-is vs to-be), defines acceptance criteria, prioritizes with MoSCoW, maps stakeholders, or needs **detailed, report-quality** output with explicit assumptions and decisions — beyond informal SA notes.

  Use **with** **`content-analysis-pro`** when **source documents or media** must be read in depth before structuring requirements; **`testing-pro`** (acceptance criteria and testability), **`security-pro`** (compliance and data sensitivity), **`design-system-pro`** / **`mobile-design-pro`** (UX requirements), stack skills when requirements imply technical constraints. This skill (`business-analysis-pro`) owns **analysis, reasoning trace, and communication artifacts**; implementation skills own **build details**.

  Triggers: "business analysis", "BA", "BRD", "FRD", "SRS", "requirements", "stakeholder", "MoSCoW", "acceptance criteria", "user story", "as-is", "to-be", "gap analysis", "RACI", "traceability", "NFR", "functional requirement", "systems analyst", "SA", "elicitation", "scope", "prioritization", "decision log".

metadata:
  short-description: Business analysis — requirements, SA-style reasoning, reporting, deliverables
---

# Business analysis (professional)

Use the [IIBA BABOK Guide](https://www.iiba.org/business-analysis-babok-guide/) as a **professional reference** for practices (overview); this skill encodes **structured requirements thinking**, **explicit reasoning** (options, criteria, decisions), and **report-ready** outputs — stronger than loose SA notes without replacing your org’s templates. Confirm **stakeholders**, **decision authority**, and **delivery model** (project vs product, regulatory or not).

## Related skills (this repo)

| Skill | When to combine with `business-analysis-pro` |
|-------|-----------------------------------------------|
| **`testing-pro`** | Acceptance criteria, testability, Definition of Done |
| **`security-pro`** | Data classification, compliance, abuse cases in requirements |
| **`design-system-pro`** / **`mobile-design-pro`** | UX and platform requirements |
| **`deployment-pro`** | Release / environment constraints in NFRs |
| **`postgresql-pro`** | Data and migration implications when requirements imply schema |
| **`content-analysis-pro`** | Deep read of attached **PDFs, images, video** to extract facts before BRD/user stories |
| **`data-analysis-pro`** | **Metrics**, EDA, or spreadsheet evidence that informs **requirements** or KPIs |

**Boundary:** **`business-analysis-pro`** = **what** and **why** (and documented trade-offs); stack **`*-pro`** skills = **how** to implement.

## When to use

- **Eliciting** and **structuring** requirements from vague asks.
- **Prioritizing** and documenting **scope** (MVP vs phase 2).
- **As-is / to-be** and **gap** analysis.
- Writing or reviewing **BRD/FRD**, **user stories**, **RACI**, **decision logs**.
- Producing **reports** for sponsors (executive summary + detail + appendix).
- Trigger keywords: `BRD`, `requirements`, `MoSCoW`, `acceptance criteria`, `stakeholder`, `traceability`, …

## Workflow

1. Confirm **problem domain**, **stakeholders**, **decision makers**, and **constraints** (time, compliance, tech).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **test design** to **`testing-pro`** and **threats** to **`security-pro`** when those dominate.
3. Respond using **Suggested response format**; note residual risks (open questions, approval gaps, scope creep, feasibility unknowns).

### Operating principles

1. **Problem before solution** — Anchor on outcomes and constraints; separate **need** from preferred **implementation** unless constrained.
2. **Traceability** — Requirements link to **source** and **tests** where possible.
3. **Decisions are explicit** — Options, criteria, chosen path, **rejected** alternatives — not buried narrative.
4. **Assumptions visible** — List and validate; bad assumptions drive wrong builds.
5. **Readable by two audiences** — Executive summary + detail engineers can implement.
6. **Change is managed** — Scope changes get **impact** (time, risk), not silent edits.

### Requirements and reasoning (summary)

- Elicitation, **as-is / to-be**, **MoSCoW**, FR/NFR, **IDs**, **decision records**, contradiction handling.

Details: [references/requirements-and-reasoning.md](references/requirements-and-reasoning.md)

### Reporting and deliverables (summary)

- **Executive summary** + body + appendix; tables and matrices; **RACI**; handoff to **`testing-pro`**.

Details: [references/reporting-and-deliverables.md](references/reporting-and-deliverables.md)

### Tips and tricks (summary)

- Workshops, glossary, metrics baseline/target, versioning, lightweight traceability.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Scope creep, conflicting stakeholders, spikes, compliance wording, AI-assisted drafts.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Business problem, audience, and decision needed.
2. **Recommendation** — Scope, priorities, key requirements, and **trade-offs**; which **Related skill** owns follow-up.
3. **Code** — Outline, table (e.g. requirements matrix), decision log template, or RACI — still labeled **Code** for consistency; not production code.
4. **Residual risks** — Open questions, approval gaps, feasibility unknowns, documentation drift.

## Resources in this skill

- `references/` — requirements reasoning, reporting, tips, edge cases.

| Topic | File |
|-------|------|
| Requirements & reasoning | [references/requirements-and-reasoning.md](references/requirements-and-reasoning.md) |
| Reporting & deliverables | [references/reporting-and-deliverables.md](references/reporting-and-deliverables.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “We need the app to be fast and secure.”  
**Expected output:** Decompose into **measurable** NFRs (latency targets, authn/z); list **assumptions**; propose FR/NFR IDs; executive one-liner + table; flag **`security-pro`** for threat-aligned requirements.

## Checklist before calling the skill done

- [ ] **Problem** and **scope** stated; **stakeholders** / deciders identified.
- [ ] Requirements **testable** or explicitly **spiked**; **traceability** to source where feasible.
- [ ] **Decisions** and **rejected options** documented for auditability.
- [ ] **Report structure** fits audience (summary + detail + appendix as needed).
- [ ] Technical or security depth **delegated** to the right **`testing-pro`** / **`security-pro`** / stack skill when needed.
