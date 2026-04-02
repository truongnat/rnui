# /route — Analyze, optimize, and match prompt to skills

You are the **prompt routing pipeline**. The user has provided a prompt that needs to be analyzed, optimized for cost, and matched to the best skill(s) in this repository.

## User prompt

$ARGUMENTS

## Instructions

Execute these three stages sequentially and present the results in the output format below.

### Stage 1: Analyze

1. **Intent** — Classify the prompt intent as one of: `implement`, `debug`, `review`, `explain`, `optimize`, `research`, `design`, `test`, or `general`.
2. **Keywords** — Extract the meaningful domain keywords from the prompt (ignore filler words like "please", "help", "want", "need", "could you").
3. **Complexity** — Rate as `low` (single skill likely), `medium` (2-3 skills), or `high` (cross-domain, multi-skill).

### Stage 2: Optimize

Rewrite the prompt to reduce tokens while preserving full semantic meaning:

1. Remove filler phrases: "I want you to", "Can you please", "I need help with", "Could you help me", "Please help me", "I would like you to".
2. Remove redundant/repeated information.
3. Shorten verbose patterns: "in order to" -> "to", "due to the fact that" -> "because", "as well as" -> "and".
4. Keep all technical terms, constraints, and requirements intact.
5. Report the estimated token reduction (use chars/4 as token estimate).

### Stage 3: Match skills

1. Read the skill index at `knowledge-base/embeddings/skill_index.json`.
2. For each skill in the index, compare the prompt keywords against the skill's `triggers` array.
3. Score each skill: count keyword matches (case-insensitive). Multi-word trigger matches (e.g., "rest api") count as 2x.
4. Also consider the `when_to_use` descriptions for semantic relevance beyond exact keyword matches.
5. Return the top matches (score > 0), ranked by relevance.
6. If the prompt spans multiple domains, suggest skill **combinations**.

### Stage 4: Workflow check

1. List workflow files under `workflows/` (include subfolders such as **`workflows/dev/*.md`**; skip `README.md` index files).
2. If any workflow name or description closely matches the prompt's intent and domain, recommend it.
3. Show which skills the workflow uses at each step.

## Output format

Present results in this exact structure:

```
## Analysis
- **Intent:** <intent>
- **Keywords:** <keyword1>, <keyword2>, ...
- **Complexity:** <low|medium|high>

## Optimized prompt
> <rewritten prompt>

**Reduction:** <original chars> -> <optimized chars> (~<percent>% saved, ~<tokens saved> tokens)

## Matched skills

| Rank | Skill | Confidence | Trigger hits | Why |
|------|-------|-----------|-------------|-----|
| 1 | skill-name | high/medium/low | trigger1, trigger2 | reason |

## Suggested workflow
<workflow name and steps, or "No matching workflow found">

## Recommendation
<1-2 sentences: which skill(s) to read first and in what order>
```

## Rules

- Always read `knowledge-base/embeddings/skill_index.json` — do not guess skill triggers from memory.
- If the index file is missing, tell the user to run: `python scripts/build_skill_index.py`
- Be precise about which trigger keywords actually matched vs. semantic inference.
- If no skills match with high confidence, say so and suggest the user refine their prompt.
