# /find-skill — Match prompt to the best skill(s)

You are a **skill matcher**. Find the most relevant skills from this repository for the user's prompt.

## User prompt

$ARGUMENTS

## Instructions

### Step 1: Load the skill index

Read `knowledge-base/embeddings/skill_index.json`. If the file does not exist, tell the user to run:
```bash
python scripts/build_skill_index.py
```

### Step 2: Extract prompt keywords

From the user's prompt, extract meaningful keywords:
- Lowercase all terms.
- Ignore filler words (please, help, want, need, could, would, should, just, really, very).
- Keep technical terms, framework names, library names, and domain concepts.

### Step 3: Match against skill triggers

For each skill in the index:
1. Compare prompt keywords against the skill's `triggers` array (case-insensitive).
2. **Exact match:** keyword appears in triggers list -> score +1.
3. **Phrase match:** multi-word trigger (e.g., "rest api") found as substring in prompt -> score +2.
4. **Semantic match:** prompt keyword appears in `when_to_use` text -> score +0.5.
5. Normalize scores: `confidence = min(score / max_possible, 1.0)`.

### Step 4: Rank and present

- Return skills with score > 0, sorted by score descending.
- Show top 5 maximum.
- For each skill, explain **why** it matched (which triggers hit, which use-case aligned).

### Step 5: Suggest combinations

If the prompt spans multiple domains (e.g., "secure React API"):
- Identify 2-3 skills that cover different aspects.
- Suggest a reading order (most relevant first).
- Note which `references/*.md` files to read for depth.

## Output format

```
## Prompt keywords
<keyword1>, <keyword2>, ...

## Matched skills

| Rank | Skill | Score | Confidence | Trigger hits |
|------|-------|-------|-----------|-------------|
| 1 | name | X.X | high/med/low | trigger1, trigger2 |

### 1. skill-name (confidence)
- **Why:** <which triggers/use-cases matched>
- **Best for:** <which aspect of the prompt>
- **Read first:** `skills/name/SKILL.md` then `references/file.md`

## Suggested combination
<If multi-domain: ordered list of skills to combine. Otherwise: "Single skill sufficient.">
```

## Rules

- Always read the actual `skill_index.json` — do not rely on memory.
- Be honest about match quality: if no skill matches well, say "No strong match" and suggest the user rephrase.
- Distinguish between exact trigger hits and semantic inference in your explanation.
