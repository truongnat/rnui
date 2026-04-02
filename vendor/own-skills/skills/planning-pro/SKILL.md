---
name: planning-pro
description: |
  Professional planning guidance for turning goals into executable plans: scope framing, task decomposition, dependency mapping, sequencing, estimation ranges, risk controls, and delivery checkpoints.

  Use this skill when the user asks to create an implementation plan, break a complex project into phases, define milestones, estimate effort, or review whether a plan is realistic and safe to execute.

  Use **with** **`business-analysis-pro`** to refine requirements before planning, **`deployment-pro`** for release sequencing, and domain `*-pro` skills for implementation details in each phase.

  Triggers: "planning", "plan", "roadmap", "milestone", "phase breakdown", "execution plan", "timeline", "dependency", "effort estimate", "delivery plan", "implementation plan".

metadata:
  short-description: Planning - scope, decomposition, sequencing, delivery risk
---

# Planning and execution (professional)

Use professional planning references such as [PMI PMBOK](https://www.pmi.org/pmbok-guide-standards/foundational/pmbok) and [Atlassian project planning guides](https://www.atlassian.com/agile/project-management/project-planning) for terminology and process framing; this skill encodes **goal-backward planning**, **dependency-aware sequencing**, and **risk-first execution control**. Confirm **goal**, **deadline constraints**, **team capacity**, and **definition of done** from the project before proposing a plan.

## Related skills (this repo)

| Skill | When to combine with `planning-pro` |
|-------|-------------------------------------|
| **`business-analysis-pro`** | Clarify requirements and acceptance criteria before task breakdown |
| **`strategic-consulting-pro`** | Decide strategic direction before execution planning |
| **`deployment-pro`** | Plan release windows, canary, and rollback checkpoints |
| **Domain `*-pro` skills** | Fill technical detail for each phase (backend, frontend, infra, data, security) |

**Boundary:** **`planning-pro`** defines executable sequencing and control points; other skills define domain-specific implementation decisions.

## When to use

- Breaking large goals into phases, milestones, and deliverables.
- Building realistic execution plans with dependencies and constraints.
- Prioritizing tasks for MVP vs later phases.
- Estimating effort ranges and identifying critical path risks.
- Reviewing an existing plan for gaps, sequencing errors, or hidden risks.
- Trigger keywords: `planning`, `roadmap`, `milestone`, `phase`, `timeline`, `dependency`, `estimate`

## Workflow

1. Confirm objective, scope boundaries, constraints, and success criteria (deadline, team, quality bar, risk tolerance).
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep dependencies, assumptions, and checkpoints explicit.
3. Respond using **Suggested response format**; note the main execution risks, uncertainty points, and fallback options.

### Operating principles

1. **Plan backward from outcomes** - define done state first, then derive tasks.
2. **Decompose to verifiable units** - each task has clear output and acceptance signal.
3. **Model dependencies explicitly** - hidden dependencies are common schedule killers.
4. **Use ranges, not fake precision** - estimates include assumptions and uncertainty.
5. **Prioritize risk burn-down early** - address high-impact unknowns in earlier phases.
6. **Add control checkpoints** - review gates prevent compounding downstream errors.

### Scope and decomposition (summary)

- Convert objectives into work packages, milestones, and acceptance criteria at a consistent granularity.

Details: [references/scope-and-decomposition.md](references/scope-and-decomposition.md)

### Sequencing and dependency management (summary)

- Build phase order by dependency graph, critical path, and parallelization opportunities.

Details: [references/sequencing-and-dependencies.md](references/sequencing-and-dependencies.md)

### Estimation and risk controls (summary)

- Estimate by ranges with assumptions; define risk register, mitigations, and decision gates.

Details: [references/estimation-and-risk-controls.md](references/estimation-and-risk-controls.md)

### Tips and tricks (summary)

- Use practical templates for milestones, assumptions, and progress signals.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle shifting scope, cross-team blockers, and high-uncertainty discovery work.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Target outcome, constraints, and planning horizon.
2. **Recommendation** - Proposed phases, priorities, and sequencing rationale.
3. **Code** - Plan table, dependency map, milestone checklist, or estimation matrix - still labeled **Code**.
4. **Residual risks** - Uncertain assumptions, critical path fragility, and fallback triggers.

## Resources in this skill

- `references/` - deeper planning material for decomposition, sequencing, estimation, and edge cases.

| Topic | File |
|-------|------|
| Scope and decomposition | [references/scope-and-decomposition.md](references/scope-and-decomposition.md) |
| Sequencing and dependencies | [references/sequencing-and-dependencies.md](references/sequencing-and-dependencies.md) |
| Estimation and risk controls | [references/estimation-and-risk-controls.md](references/estimation-and-risk-controls.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Plan delivery for migrating monolith auth to a separate service in 8 weeks."  
**Expected output:** Phase plan with dependency-aware sequencing, milestone gates, estimate ranges, risk controls, and rollback checkpoints.

## Checklist before calling the skill done

- [ ] Objective, scope, and success criteria are explicit.
- [ ] Dependencies and critical path are visible.
- [ ] Estimates include assumptions and uncertainty ranges.
- [ ] Milestones have verifiable outputs and review gates.
- [ ] Main risks and fallback triggers are documented.
