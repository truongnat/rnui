---
name: strategic-consulting-pro
description: |
  Professional strategic consulting: problem framing, strategic options, scenario planning, portfolio and capability fit, prioritization, and decision-ready recommendations for leadership.

  Use this skill when the user needs board/executive-level strategy support: growth choices, market-entry sequencing, build/partner/buy decisions, operating model trade-offs, strategic risks, or a concise strategy memo with assumptions and confidence levels.

  Use **with** **`market-research-pro`** for market and competitor evidence, **`business-analysis-pro`** for requirements and execution planning, and **`web-research-pro`** for external source validation. This skill (`strategic-consulting-pro`) owns **strategy framing and option evaluation**; other skills own deep domain analysis and implementation detail.

  Triggers: "strategy", "strategic consulting", "go-to-market strategy", "market entry", "prioritization", "portfolio strategy", "build vs buy", "partner strategy", "operating model", "scenario planning", "decision memo", "north star".

metadata:
  short-description: Strategic consulting - options, prioritization, scenarios, decision memos
---

# Strategic consulting (professional)

Use reputable strategic frameworks and current business evidence as references; this skill encodes **decision-driven strategy synthesis**, **trade-off clarity**, and **assumption transparency**. Confirm **decision owner**, **time horizon**, **constraints** (capital, people, regulation), and **success metrics**.

## Related skills (this repo)

| Skill | When to combine with `strategic-consulting-pro` |
|-------|--------------------------------------------------|
| **`market-research-pro`** | Market sizing, competitor structure, segment attractiveness |
| **`business-analysis-pro`** | Turn strategic choices into initiative scope and requirements |
| **`web-research-pro`** | Verify external claims, recency, and source quality |
| **`data-analysis-pro`** | Quantitative support (scenario models, KPI baselines) |

**Boundary:** **`strategic-consulting-pro`** = strategic choices and trade-offs; **`business-analysis-pro`** = delivery requirements and execution artifacts.

## When to use

- Clarifying strategic problem statements before jumping to solutions.
- Evaluating options with explicit criteria and trade-offs.
- Prioritizing initiatives under limited resources.
- Building leadership-facing strategy memos and recommendations.
- Scenario planning under uncertainty and risk.
- Trigger keywords: `strategy`, `portfolio`, `scenario`, `prioritization`, `build vs buy`, ...

## Workflow

1. Confirm decision context (owner, horizon, constraints, target outcomes) and define the strategic question.
2. Apply the principles and topic summaries below; open `references/` when you need depth; gather market evidence via **`market-research-pro`** / **`web-research-pro`** where needed.
3. Respond using **Suggested response format**; note assumption sensitivity, execution risks, and data freshness limits.

### Operating principles

1. **Decision first** - start from the choice to be made, not framework theater.
2. **Options with criteria** - compare alternatives on shared criteria, not narrative bias.
3. **Transparent assumptions** - each recommendation must show key assumptions and confidence.
4. **Feasibility with ambition** - include capability, timing, and execution realities.
5. **Risk-aware** - identify downside, mitigation, and early warning indicators.
6. **Actionable synthesis** - strategy output must translate into concrete next actions.

### Problem framing and strategic options (summary)

- Strategic question tree, hypothesis framing, option set quality, and anti-patterns.

Details: [references/problem-framing-and-options.md](references/problem-framing-and-options.md)

### Prioritization and resource allocation (summary)

- Initiative scoring, sequencing logic, portfolio balance, and dependency risks.

Details: [references/prioritization-and-resource-allocation.md](references/prioritization-and-resource-allocation.md)

### Scenario planning and risk (summary)

- Best/base/worst scenarios, trigger signals, contingency plans, and resilience checks.

Details: [references/scenario-planning-and-risk.md](references/scenario-planning-and-risk.md)

### Reporting and executive communication (summary)

- One-page recommendation memo, decision log, assumptions appendix, and confidence tags.

Details: [references/reporting-and-executive-communication.md](references/reporting-and-executive-communication.md)

### Tips and tricks (summary)

- Keep it concise, decision-linked, and measurable.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Political constraints, conflicting stakeholders, and low-data environments.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Strategic decision and constraints.
2. **Recommendation** - Preferred option, trade-offs, and confidence.
3. **Code** - Decision matrix, scenario table, or prioritization rubric - still labeled **Code**.
4. **Residual risks** - Assumption fragility, execution risk, and monitoring needs.

## Resources in this skill

- `references/` - framing, prioritization, scenario planning, executive reporting, tips, edge cases.

| Topic | File |
|-------|------|
| Problem framing and options | [references/problem-framing-and-options.md](references/problem-framing-and-options.md) |
| Prioritization and allocation | [references/prioritization-and-resource-allocation.md](references/prioritization-and-resource-allocation.md) |
| Scenario planning and risk | [references/scenario-planning-and-risk.md](references/scenario-planning-and-risk.md) |
| Executive communication | [references/reporting-and-executive-communication.md](references/reporting-and-executive-communication.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Should we prioritize enterprise upsell or SME expansion next two quarters?"  
**Expected output:** Present option criteria, scenario outcomes, capability constraints, and a sequenced recommendation with confidence and risks.

## Checklist before calling the skill done

- [ ] Strategic question and decision owner are explicit.
- [ ] Option comparison uses consistent criteria.
- [ ] Assumptions and confidence are visible.
- [ ] Recommendation links to measurable outcomes and next steps.
- [ ] Handoffs to `market-research-pro` / `business-analysis-pro` are clear where needed.
