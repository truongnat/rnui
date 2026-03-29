---
name: Refresh Index
command: /refresh
description: Update GitNexus index after code changes
---

# Refresh Index Skill

Update the GitNexus index after making code changes.

## Usage

```
/refresh [--embeddings]
```

## What It Does

1. Runs `npx gitnexus analyze`
2. Rebuilds the code graph
3. Updates symbol relationships
4. Refreshes execution flows
5. Optionally regenerates embeddings

## When to Use

- After committing code changes
- When index is stale
- After major refactoring
- Before starting new work session

## With Embeddings

If your project uses embeddings (check `.gitnexus/meta.json`):

```
/refresh --embeddings
```

⚠️ Running without `--embeddings` will delete existing embeddings!

## Auto-Refresh

Consider setting up a post-commit hook to auto-refresh:

```json
{
  "name": "Refresh GitNexus",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "runCommand",
    "command": "npx gitnexus analyze"
  }
}
```
