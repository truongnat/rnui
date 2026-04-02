# GitNexus graph workflow (deep repo analysis)

Use this when **GitNexus** is available: indexed repo + **MCP server `user-gitnexus`**. The graph answers **who calls what** and **blast radius** — complementary to text search.

## Preconditions

1. **Index the repo** — Use the **GitNexus CLI** skill (`gitnexus-cli`: analyze/index) or your org’s indexing pipeline so the knowledge graph is fresh for the branch you care about.
2. **Confirm repo** — If multiple repos are indexed, pass `repo` where tools support it.

## MCP tools (typical order for bug hunting)

| Tool | Use for bug discovery |
|------|------------------------|
| **`query`** | Natural-language or keyword search for **execution flows** related to a symptom, feature, or error string — surfaces processes and symbols. |
| **`context`** | **360°** view of a symbol after `query`: callers, callees, disambiguation via `file_path` or `uid`. |
| **`impact`** | **Blast radius** upstream/downstream of a symbol — find **related** breakage when one bug hints at shared code. |
| **`api_impact`** | Before or after suspecting an **API route** bug — consumers, middleware, response-shape risk. |
| **`shape_check`** | **Response shape vs consumer** key access — mismatch can be a latent bug. |
| **`detect_changes`** | Map **git diff** to affected processes — good before commit to see what might break. |

Optional: **`cypher`**, **`route_map`**, **`rename`**, **`tool_map`** — follow GitNexus docs for advanced graph queries.

## Loop

1. **Reproduce** or **hypothesize** (error message, stack, flaky test).
2. **`query`** with `task_context` + `goal` to land in relevant processes.
3. **`context`** on hot symbols; read files at cited paths.
4. **`impact`** to list **related** code paths that might share the defect or need regression tests.
5. For HTTP handlers — **`api_impact`** / **`shape_check`** on the route.
6. **Triage** — Separate **confirmed** bugs from **candidates** (needs test or human proof).

## Limits

- Graph reflects **last index** — not live if code changed after indexing.
- **Confidence** on edges can be under 1.0 — verify in source.
- GitNexus does not replace **runtime** debugging or **SAST** — combine with **`testing-pro`** and **`security-pro`**.
