# Reporting and deliverables

Produce **readable** outputs for both **executives** and **delivery** teams — not only narrative reasoning, but **structured** sections people can skim, quote, and track.

## Report layers (recommended)

| Layer | Audience | Content |
|-------|----------|---------|
| **Executive summary** | Sponsors | Problem, recommendation, **key risks**, ask (decision / budget / timeline) |
| **Analysis body** | Product, BA, SA | Scope, stakeholders, requirements, options, **decision log** |
| **Appendix** | Engineering, QA | Detailed tables, glossary, full traceability, raw workshop notes (optional) |

## Artifacts (pick what fits)

- **BRD** — Business requirements document (why + what).
- **FRD / SRS** — Functional / software requirements (often more technical); keep **consistent IDs** with BRD.
- **User stories + acceptance criteria** — For agile backlogs; link to FR IDs if hybrid.
- **RACI** — Who is **R**esponsible, **A**ccountable, **C**onsulted, **I**nformed for major decisions.
- **Process / data** — As-is / to-be flow (Mermaid or table); **data dictionary** light if needed.

## “Better than SA-only notes”

- **Tables over walls of text** — Requirements matrix: ID | statement | priority | source | status.
- **Visual hierarchy** — Numbered sections; **TL;DR** per major section.
- **Decisions** — One place for **approved** vs **deferred** vs **rejected** with **date** and **decider**.
- **Risks and dependencies** — Explicit; **probability/impact** if useful.

## Formats

- **Markdown** in repo — versioned, diff-friendly; export to PDF for formal sign-off if required.

## Handoff to delivery

- **Acceptance criteria** align with **`testing-pro`** (testable, not vague).
- **Security / compliance** flags align with **`security-pro`** when requirements touch data or auth.
