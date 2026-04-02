---
name: market-research-pro
description: |
  Professional market research: market sizing (TAM/SAM/SOM), competitor benchmarking, customer segmentation, pricing and positioning hypotheses, trend scanning, evidence quality scoring, and decision-ready synthesis.

  Use this skill when the user asks to validate market opportunity, compare competitors, estimate market size with assumptions, identify ICP segments, prioritize country/vertical expansion, or produce an executive-style market brief with citations and explicit confidence levels.

  Use **with** **`web-research-pro`** for official and current external sources, **`business-analysis-pro`** to convert findings into requirements/roadmaps, and **`data-analysis-pro`** when survey or tabular datasets need numeric analysis. This skill (`market-research-pro`) owns **research framing and synthesis quality**; other skills own deep implementation or analytics details.

  Triggers: "market research", "TAM", "SAM", "SOM", "competitor analysis", "ICP", "go-to-market", "positioning", "pricing", "market size", "industry trends", "benchmark", "category landscape", "entry strategy".

metadata:
  short-description: Market research - sizing, competitors, ICP, positioning, evidence synthesis
---

# Market research (professional)

Use official company sources, regulatory filings, and high-quality industry reports as preferred evidence; this skill encodes **assumption-driven sizing**, **source reliability ranking**, and **decision-ready** synthesis. Confirm **market definition**, **geography**, **time horizon**, and **decision context** (invest, build, expand, price).

## Related skills (this repo)

| Skill | When to combine with `market-research-pro` |
|-------|--------------------------------------------|
| **`web-research-pro`** | Collect and verify external sources, changelogs, and citation quality |
| **`business-analysis-pro`** | Convert findings into initiative scope, requirements, and priority |
| **`data-analysis-pro`** | Analyze survey/usage/exported datasets numerically |
| **`seo-pro`** | Search-demand and organic visibility angle for web-first products |

**Boundary:** **`market-research-pro`** = what market signals mean for decisions; **`web-research-pro`** = how to gather/verify sources.

## When to use

- Market sizing with transparent assumptions (TAM/SAM/SOM).
- Competitor landscape and differentiated positioning.
- ICP/segment prioritization and expansion hypotheses.
- Pricing and packaging hypothesis framing (not final finance model).
- Trend scan for strategic direction with citation discipline.
- Trigger keywords: `market research`, `TAM`, `competitor`, `ICP`, `positioning`, `pricing`, ...

## Workflow

1. Confirm decision to support (go/no-go, segment priority, pricing hypothesis), market boundaries, and timeframe.
2. Apply the principles and topic summaries below; open `references/` when you need depth; gather external evidence via **`web-research-pro`** and cite source quality.
3. Respond using **Suggested response format**; note uncertainty, assumption sensitivity, and data freshness risk.

### Operating principles

1. **Define market before sizing** - avoid mixing categories and geographies.
2. **Assumptions are first-class** - every number has a method and confidence.
3. **Evidence quality matters** - official and recent sources outweigh generic blogs.
4. **Compare like-for-like** - competitors by segment, price tier, and use case.
5. **Decision orientation** - outputs must support a concrete choice, not only description.
6. **Freshness and reproducibility** - keep source dates and calculation steps visible.

### Market sizing and assumptions (summary)

- TAM/SAM/SOM methods (top-down, bottom-up, value-theory), sensitivity checks, confidence bands.

Details: [references/market-sizing-and-assumptions.md](references/market-sizing-and-assumptions.md)

### Competitor and positioning analysis (summary)

- Competitor map, feature/price matrix, differentiation wedges, moat and switching-cost notes.

Details: [references/competitor-and-positioning.md](references/competitor-and-positioning.md)

### Segment prioritization and GTM hypotheses (summary)

- ICP scoring, segment attractiveness vs accessibility, entry sequencing and risks.

Details: [references/segment-prioritization-and-gtm.md](references/segment-prioritization-and-gtm.md)

### Reporting and evidence quality (summary)

- Source scorecard, confidence levels, assumptions appendix, contradiction handling.

Details: [references/reporting-and-evidence-quality.md](references/reporting-and-evidence-quality.md)

### Tips and tricks (summary)

- Fast framing questions, anti-bias checks, and concise executive storytelling.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Emerging markets with sparse data, conflicting reports, and hype-cycle noise.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Business decision and market scope.
2. **Recommendation** - Segment/positioning/sizing conclusion with rationale and confidence.
3. **Code** - Tables (assumptions, competitor matrix, scorecards), formulas, or checklist - still labeled **Code**.
4. **Residual risks** - Data gaps, assumption sensitivity, timing and execution risk.

## Resources in this skill

- `references/` - sizing, competitors, segmentation/GTM, evidence quality, tips, edge cases.

| Topic | File |
|-------|------|
| Market sizing | [references/market-sizing-and-assumptions.md](references/market-sizing-and-assumptions.md) |
| Competitor and positioning | [references/competitor-and-positioning.md](references/competitor-and-positioning.md) |
| Segment and GTM | [references/segment-prioritization-and-gtm.md](references/segment-prioritization-and-gtm.md) |
| Reporting quality | [references/reporting-and-evidence-quality.md](references/reporting-and-evidence-quality.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Should we launch B2B payroll SaaS in Vietnam first, then Thailand?"  
**Expected output:** Define TAM/SAM assumptions per country, compare competitor intensity and ICP fit, propose entry sequence with confidence and key unknowns.

## Checklist before calling the skill done

- [ ] Market boundaries (category, geo, timeframe) are explicit.
- [ ] Sizing assumptions and confidence are visible.
- [ ] Source quality and recency are stated.
- [ ] Recommendation is tied to a specific business decision.
- [ ] Follow-up handoff to `business-analysis-pro` / `data-analysis-pro` when needed.
