| Field | Value |
|-------|-------|
| title | Skills bundling and repository documentation |
| summary | Rules for adding bundled skills and keeping README, AGENTS, and KB in sync in this repo |
| tags | policy, skills, repo, contribution |
| updated | 2026-03-31 |
| status | active |

# Policy: skills bundling and repository documentation

**Applies to:** this repository (`skills` template: skills, workflows, knowledge base, scripts).  
**Authority:** aligns with [`skills/SKILL_AUTHORING_RULES.md`](../../../skills/SKILL_AUTHORING_RULES.md); this policy summarizes obligations for contributors and reviewers.

## 1. Purpose

- Keep **bundled skills** discoverable and non-duplicative.
- Ensure **documentation** (`README`, `AGENTS`, KB) stays **consistent** with the real tree so agents and humans do not follow stale instructions.

## 2. Bundled skills

1. A **bundled skill** is a directory `skills/<name>/` with a required **`SKILL.md`**, shipped in this repo for others to copy or symlink into their IDE.
2. **New bundled skills** MUST satisfy every mandatory rule in **`SKILL_AUTHORING_RULES.md`** (structure, frontmatter, workflow, suggested response format, references strategy).
3. **Do not** add a new skill folder if the topic is already covered by an existing bundled skill unless the scope is clearly distinct and documented (see §1 of the authoring rules).

## 3. Mandatory documentation updates (same change)

Any PR or commit that **adds**, **removes**, or **renames** a bundled skill MUST also update, in the **same change**:

- [`skills/README.md`](../../../skills/README.md) (bundled table)
- Root [`README.md`](../../../README.md) (Skills bundled examples)
- [`AGENTS.md`](../../../AGENTS.md) (bundled examples line)
- [`skills/SKILL_AUTHORING_RULES.md`](../../../skills/SKILL_AUTHORING_RULES.md) §1 (parenthesized skill list)
- [`knowledge-base/documents/repo/skills-layout.md`](../repo/skills-layout.md) (folder tree or list)

Failure to update these files is a **blocking** review finding.

## 4. Workflows and knowledge base

- Adding a workflow file under [`workflows/`](../../../workflows/) (including `workflows/<domain>/`) requires updating the **Workflows** list in the root **`README.md`** and any domain **`README.md`** (e.g. [`workflows/dev/README.md`](../../../workflows/dev/README.md)). Runnable workflow Markdown files use the **`w-<slug>.md`** prefix — see [`workflows/README.md`](../../../workflows/README.md#naming).
- Adding a new document under **`knowledge-base/documents/`** requires a new row in [`knowledge-base/INDEX.md`](../../INDEX.md).

## 5. Configuration and secrets

- **`config.md`** may contain local paths; prefer adding it to **`.gitignore`** if it includes secrets. Use [`config.example.md`](../../../config.example.md) as the public template.
- Do not commit API keys, tokens, or private corpus paths into tracked Markdown.

## 6. Exceptions

- **Private or experimental skills** may live in a **fork** or local-only path not committed here.
- **Emergency** doc-only fixes (typos) that do not change the skill set may omit unrelated files only if no bundled list is affected.

## 7. Review checklist (reviewers)

- [ ] Skill structure matches **`SKILL_AUTHORING_RULES.md`** §2–§5.
- [ ] §3 of this policy (doc updates) is satisfied for the change.
- [ ] No duplicate scope without a **Related skills** boundary in `SKILL.md`.
