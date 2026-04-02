---
name: feedback-pro
description: |
  Professional deep-feedback guidance for engineering and product work: evidence-based review framing, issue severity calibration, actionable recommendations, communication tone control, and closure tracking.

  Use this skill when the user asks to give detailed feedback on code/docs/design/process decisions, review quality gaps, prioritize improvements, or convert raw comments into structured, high-impact feedback plans.

  Use **with** **`testing-pro`** for test-quality feedback, **`security-pro`** for risk-sensitive findings, and domain `*-pro` skills to validate technical correctness in specialized areas.

  Triggers: "feedback", "review comments", "code feedback", "deep review", "improvement feedback", "critique", "quality review", "severity", "action items", "follow-up plan".

metadata:
  short-description: Feedback - deep review, severity, actionable closure
---

# Feedback and review quality (professional)

Use professional review communication references such as [Google Engineering Practices: Code Review](https://google.github.io/eng-practices/review/) and [Atlassian feedback guide](https://www.atlassian.com/blog/add-ons/how-to-give-effective-feedback) for baseline principles; this skill encodes **evidence-first feedback**, **severity-aware prioritization**, and **actionable closure discipline**. Confirm **review scope**, **audience**, **decision context**, and **quality bar** before producing feedback.

## Related skills (this repo)

| Skill | When to combine with `feedback-pro` |
|-------|-------------------------------------|
| **`testing-pro`** | Evaluate missing coverage, flaky tests, and verification gaps |
| **`security-pro`** | Classify security findings and mitigation urgency |
| **Domain `*-pro` skills** | Validate correctness and architecture details for specialized stacks |
| **`business-analysis-pro`** | Align feedback with requirement intent and stakeholder priorities |

**Boundary:** **`feedback-pro`** owns how to structure, prioritize, and communicate feedback deeply; other skills provide domain-specific truth for each finding.

## When to use

- Turning vague comments into specific, prioritized, and actionable feedback.
- Reviewing code/docs/design with clear evidence and impact statements.
- Calibrating severity (critical/high/medium/low) and rollout risk.
- Producing executive-friendly review summaries plus implementer-level detail.
- Tracking follow-up actions until closure criteria are met.
- Trigger keywords: `feedback`, `review`, `critique`, `severity`, `action items`, `quality gaps`, `follow-up`

## Workflow

1. Confirm review objective, artifacts in scope, target audience, and acceptance threshold for quality.
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep evidence, impact, and actionability explicit.
3. Respond using **Suggested response format**; note residual risks, ambiguity, and closure dependencies.

### Operating principles

1. **Evidence before opinion** - every finding maps to observable behavior or requirement mismatch.
2. **Severity reflects impact** - prioritize by user/system risk, not reviewer preference.
3. **Actionability is mandatory** - each issue includes concrete next step and owner hint.
4. **Separate must-fix vs nice-to-have** - avoid mixed signals during execution.
5. **Tone stays constructive** - feedback critiques artifacts, not people.
6. **Close the loop** - define verification criteria for done/not-done.

### Finding structure and evidence quality (summary)

- Write findings with context, observed issue, impact, and reproducible evidence.

Details: [references/finding-structure-and-evidence.md](references/finding-structure-and-evidence.md)

### Severity and prioritization framework (summary)

- Classify severity consistently with risk matrix and remediation urgency.

Details: [references/severity-and-prioritization.md](references/severity-and-prioritization.md)

### Action planning and closure tracking (summary)

- Convert findings into owner-ready action items, checkpoints, and verification steps.

Details: [references/action-planning-and-closure.md](references/action-planning-and-closure.md)

### Tips and tricks (summary)

- Use concise templates, language patterns, and conflict-reduction phrasing.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle partial evidence, conflicting reviewers, and deadline-pressure triage.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Review intent, scope, and quality target.
2. **Recommendation** - Prioritized findings with rationale and severity calibration.
3. **Code** - Finding table, action checklist, or remediation plan - still labeled **Code**.
4. **Residual risks** - Ambiguities, blocked fixes, regressions, and unresolved dependencies.

## Resources in this skill

- `references/` - deeper material for evidence quality, severity, and feedback closure.

| Topic | File |
|-------|------|
| Finding structure and evidence | [references/finding-structure-and-evidence.md](references/finding-structure-and-evidence.md) |
| Severity and prioritization | [references/severity-and-prioritization.md](references/severity-and-prioritization.md) |
| Action planning and closure | [references/action-planning-and-closure.md](references/action-planning-and-closure.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Review this PR and give deep feedback, not just style comments."  
**Expected output:** Evidence-backed findings with severity labels, must-fix vs should-improve split, concrete remediation steps, and closure checklist.

## Checklist before calling the skill done

- [ ] Findings include evidence and impact, not opinion-only statements.
- [ ] Severity and priority are explicit and consistent.
- [ ] Recommendations are actionable with verification criteria.
- [ ] Must-fix vs optional items are clearly separated.
- [ ] Residual risks and follow-up dependencies are documented.
