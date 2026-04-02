---
name: self-improve-agent-pro
description: |
  Professional guidance for self-improving agent workflows: performance diagnosis, feedback-loop design, iteration planning, failure pattern analysis, and continuous quality uplift with measurable outcomes.

  Use this skill when the user asks to make an agent improve itself, analyze repeated mistakes, design reflection loops, define learning checkpoints, or establish a structured process to raise reliability over time.

  Use **with** **`feedback-pro`** for high-quality review signals, **`planning-pro`** for iteration roadmaps, and **`testing-pro`** to validate that improvements actually reduce failures.

  Triggers: "self improve agent", "agent improvement", "reflection loop", "learning loop", "improve accuracy", "reduce failures", "retrospective", "continuous improvement", "quality iteration".

metadata:
  short-description: Self-improve agent - reflection loops, diagnosis, measurable uplift
---

# Self-improving agent workflow (professional)

Use quality-improvement references such as [Deming cycle (PDCA)](https://en.wikipedia.org/wiki/PDCA) and [Retrospective practices](https://www.atlassian.com/team-playbook/plays/retrospective) for process framing; this skill encodes **evidence-driven diagnosis**, **closed-loop iteration**, and **metric-based verification**. Confirm **agent goals**, **failure surface**, **constraints**, and **success metrics** before proposing improvements.

## Related skills (this repo)

| Skill | When to combine with `self-improve-agent-pro` |
|-------|-----------------------------------------------|
| **`feedback-pro`** | Generate deep, prioritized, evidence-based findings |
| **`planning-pro`** | Convert findings into phased improvement plan |
| **`testing-pro`** | Validate improvements via regression and scenario tests |
| **`repo-tooling-pro`** | Use repo scripts to track and audit quality trends |

**Boundary:** **`self-improve-agent-pro`** defines the improvement loop and control framework; paired skills provide domain-specific review, planning, and verification depth.

## When to use

- Building a repeatable self-improvement cycle for an agent.
- Diagnosing recurring failures or quality drift.
- Designing reflection and correction loops after each run.
- Prioritizing improvement actions under limited time.
- Proving improvement with before/after metrics.
- Trigger keywords: `self improve`, `reflection`, `iteration`, `quality drift`, `retrospective`, `improvement loop`

## Workflow

1. Confirm goal metrics, baseline performance, constraints, and failure categories.
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep hypotheses, interventions, and validation criteria explicit.
3. Respond using **Suggested response format**; note residual risks around overfitting, measurement bias, and incomplete feedback coverage.

### Operating principles

1. **Measure before changing** - baseline metrics prevent placebo improvements.
2. **Fix root causes, not symptoms** - pattern analysis over isolated anecdotes.
3. **One controlled change at a time** - improves attribution of outcomes.
4. **Close every loop** - diagnosis -> intervention -> verification -> decision.
5. **Prioritize by impact and recurrence** - solve frequent/high-cost failures first.
6. **Guard against regressions** - every gain needs preservation checks.

### Failure diagnosis and pattern mining (summary)

- Classify errors by type, impact, and recurrence; identify root-cause clusters.

Details: [references/failure-diagnosis-and-patterns.md](references/failure-diagnosis-and-patterns.md)

### Improvement loop design (summary)

- Define hypothesis, intervention, expected signal, checkpoint cadence, and rollback rule.

Details: [references/improvement-loop-design.md](references/improvement-loop-design.md)

### Metrics and verification strategy (summary)

- Track outcome, process, and guardrail metrics with pre/post comparison.

Details: [references/metrics-and-verification.md](references/metrics-and-verification.md)

### Tips and tricks (summary)

- Use lightweight templates to keep reflection consistent and fast.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle sparse feedback, conflicting signals, and short-term metric illusions.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Current quality gap and target improvement.
2. **Recommendation** - Prioritized interventions and rationale.
3. **Code** - Loop checklist, experiment table, or verification plan - still labeled **Code**.
4. **Residual risks** - Bias, blind spots, regression risk, and unresolved dependencies.

## Resources in this skill

- `references/` - deeper playbooks for diagnosis, iteration design, and measurable verification.

| Topic | File |
|-------|------|
| Failure diagnosis and patterns | [references/failure-diagnosis-and-patterns.md](references/failure-diagnosis-and-patterns.md) |
| Improvement loop design | [references/improvement-loop-design.md](references/improvement-loop-design.md) |
| Metrics and verification | [references/metrics-and-verification.md](references/metrics-and-verification.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Our coding agent keeps missing edge cases and repeats the same mistakes. Build a self-improvement routine."  
**Expected output:** Baseline metrics, failure taxonomy, iterative intervention plan, verification checkpoints, and stop/rollback criteria.

## Checklist before calling the skill done

- [ ] Baseline and target metrics are explicit.
- [ ] Failure patterns are grouped by root cause, not only symptoms.
- [ ] Interventions have measurable success/fail criteria.
- [ ] Verification includes regression protection.
- [ ] Residual risks and monitoring cadence are documented.
