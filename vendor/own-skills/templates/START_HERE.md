# Getting started — AI toolkit

Welcome. This folder and the repo root contain docs and templates for **AI skills**, a **knowledge base**, and **prompt** workflows.

## What you have

### Main docs

1. **[README.md](../README.md)** (repo root) — layout, quick start, skills & RAG
2. **SKILL_SYSTEM_GUIDE.md** — deeper skill-system notes (see also root README)
3. **GITHUB_DEPLOYMENT_GUIDE.md** — CI/CD and GitHub layout ideas
4. **COOL_TECHNOLOGIES.md** — ecosystem pointers (informational)

### Templates & config

1. **skills/examples/skill-template/SKILL.md** — copy to create a new skill
2. **PROMPT_TEMPLATES.md** — prompt template examples (Markdown)
3. **config.example.md** (repo root) — KB/RAG config sample
4. **config.template.md** — same idea, kept under `templates/`
5. **requirements.txt** (repo root) — Python dependencies

---

## Quick start (3 steps)

### Option A: script (if you have `quick-start.sh`)

```bash
mkdir my-ai-toolkit && cd my-ai-toolkit
# copy this repo’s files here, then:
chmod +x quick-start.sh
./quick-start.sh
nano .env   # ANTHROPIC_API_KEY or OPENAI_API_KEY if needed
source venv/bin/activate
python scripts/build_kb.py --dry-run
```

### Option B: manual

```bash
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp config.example.md config.md
nano config.md             # edit kb-config block if needed
mkdir -p skills/examples knowledge-base/documents prompts/templates
```

---

## Using each part

### 1. First skill

```bash
cp -r skills/examples/skill-template skills/my-first-skill
cd skills/my-first-skill
nano SKILL.md   # set name, description (when to trigger), workflow
```

### 2. Knowledge base

Add `.md` files under `knowledge-base/documents/`, update `knowledge-base/INDEX.md`, then:

```bash
python scripts/build_kb.py
```

### 3. Prompt templates

See **PROMPT_TEMPLATES.md** and store real templates under `prompts/templates/` as Markdown.

### MCP, workflows, monitoring

- Document MCP endpoints in Markdown (tables: URL, auth, env vars). The root repo does not require YAML for MCP.
- **Dev workflows:** `workflows/dev/` — **`/w-ticket`**, **`/w-release`**, **`/w-hotfix`** (see `.claude/commands/` or `.cursor/commands/`).
- Note monitoring (Helicone, etc.) in Markdown or in `config.md` — no required YAML format.

---

## Troubleshooting

- **Slow embeddings:** in `config.md` `kb-config`, use a smaller/faster `embedding_model` (e.g. `sentence-transformers/all-MiniLM-L6-v2`).
- **Large chunks:** lower `chunk_size` in the same block.

## Next steps

1. Read root [README.md](../README.md)
2. Create your first skill from the template
3. Try prompt templates and `build_kb.py`

---

## Help

- **Docs:** `.md` files in this repo
- **Examples:** `skills/` (bundled `*-pro` skills), `workflows/dev/` (ticket + hotfix workflows)

### Before you start

- [ ] Python 3.10+ and `pip install -r requirements.txt`
- [ ] Optional: API key for your LLM provider
- [ ] ~30 minutes for first setup

### After setup

- [ ] `config.md` (or `config.example.md`) has the kb-config you want
- [ ] `python scripts/build_kb.py --dry-run` succeeds (or real build)

---

**Principles:** start simple, document as you go, test early, share what helps your team.
