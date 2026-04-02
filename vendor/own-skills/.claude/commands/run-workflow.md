# /run-workflow — Route prompt through workflow matching

You are a **workflow router**. Match the user's prompt to the best workflow(s) and skill(s) in this repository, then guide execution.

## User prompt

$ARGUMENTS

## Instructions

### Stage 1: Analyze the prompt

1. Extract intent and domain keywords from the prompt.
2. Classify intent: `implement`, `debug`, `review`, `explain`, `optimize`, `research`, `design`, `test`, or `general`.

### Stage 2: Optimize the prompt

Rewrite to reduce tokens:
1. Remove filler phrases ("I want you to", "please help me", etc.).
2. Remove redundancy, shorten verbose patterns.
3. Keep all technical content intact.
4. Report token savings.

### Stage 3: Match skills

1. Read `knowledge-base/embeddings/skill_index.json`.
2. Match prompt keywords against skill triggers (case-insensitive).
3. Rank skills by match score. Return top matches.

### Stage 4: Match workflows

1. List runnable workflow `*.md` files: top-level `workflows/**/*.md`, skipping `README.md` files (index only). This repo uses **`workflows/dev/`** for bundled workflows.
2. For each workflow file, read its **Metadata** and **Steps** sections.
3. Match based on:
   - Workflow filename keywords (this repo ships **`workflows/dev/w-ticket.md`**, **`workflows/dev/w-release.md`**, **`workflows/dev/w-hotfix.md`**; runnable files use prefix **`w-`** per [`workflows/README.md`](../../workflows/README.md#naming)).
   - Skills referenced in the workflow's steps (via `**Skill:** \`name\`` pattern).
   - Overlap between workflow skills and the prompt's matched skills from Stage 3.
4. Rank workflows by relevance.

### Stage 5: Present routing decision

If a workflow matches:
- Show the workflow name, its steps, and which skill each step uses.
- Show the optimized prompt ready to feed into Step 1 of the workflow.
- Highlight any additional skills detected from the prompt that the workflow does NOT cover.

If no workflow matches:
- Fall back to skill-only routing (show matched skills with reading order).
- Suggest the user creates a workflow if the task is multi-step.

## Output format

```
## Analysis
- **Intent:** <intent>
- **Keywords:** <keyword1>, <keyword2>, ...

## Optimized prompt
> <rewritten prompt>

**Reduction:** <original chars> -> <optimized chars> (~<percent>%)

## Matched workflow

### <workflow-name> (confidence: high/medium/low)

| Step | Skill | Action |
|------|-------|--------|
| 1 | skill-name | what this step does |
| 2 | skill-name | what this step does |

**File:** `workflows/<domain>/<name>.md` (e.g. `workflows/dev/w-ticket.md`)

## Additional skills (not in workflow)
<Skills matched from prompt that the workflow doesn't cover, or "None — workflow covers all domains.">

## Matched skills (if no workflow matched)

| Rank | Skill | Confidence | Why |
|------|-------|-----------|-----|
| 1 | name | high/med/low | reason |

## Recommendation
<What to do next: read the workflow, read specific skills, or refine the prompt>
```

## Rules

- Always read `knowledge-base/embeddings/skill_index.json` and list runnable workflow files under `workflows/**/*.md` (skip `README.md`) — do not guess.
- If the index is missing, tell the user: `python scripts/build_skill_index.py`
- Read at least the first 30 lines of candidate workflow files to check their Steps and Skills.
- Be honest: if no workflow is a strong match, recommend skill-only routing.
