# AI & copilot UI patterns (deep dive)

Detail patterns for **assistant surfaces** embedded in products (side panel, inline, full-page chat) — common in 2024–2026 “AI-native” apps. Pair with **`security-pro`** for prompt injection and data-handling copy.

## 1. Layout archetypes

| Pattern | Best for | Watchouts |
|---------|----------|-----------|
| **Side dock** | IDE, admin, email | Width persistence; **resize**; don’t shrink main content below usable min |
| **Inline** | Forms, docs | **Layout shift** when streaming; reserve min-height |
| **Modal chat** | Short tasks | Focus trap; **Esc** to close; return focus to trigger |
| **Full-page** | Primary mode | **Navigation** back to non-AI views; session history |

## 2. Message structure

- **Roles** — Visually distinct **user** vs **assistant** vs **system** (e.g. policy notice); never rely on color alone — **alignment**, **label**, or **icon**.
- **Streaming text** — **Stable container**; avoid pushing buttons while tokens arrive; **auto-scroll** with “scroll to latest” override if user scrolls up.
- **Long answers** — **Collapse** / “Show more”, **anchor** links to sections inside a single reply (large responses).

## 3. Citations, sources, and trust

- **Inline citations** — Superscript or chip linking to **source panel**; distinguish **web** vs **internal doc** vs **user upload**.
- **“No source”** — When model generalizes, label **uncertainty** vs retrieved context.
- **Last updated** — For RAG over docs, show **retrieval time** or **doc version** when it affects trust.

## 4. Tool use & actions (function calling)

States users must see:

- **Pending** — Spinner + “Calling …” with **cancel** where safe.
- **Success** — Compact result (table, diff) with **expand**.
- **Error** — **Actionable** message (retry, fix input); no raw stack traces.

**Destructive** tool actions — Confirm in **modal** with explicit consequence (delete, send email).

## 5. Input area

- **Multiline** — `Enter` to send vs newline: **Shift+Enter** for newline (document in placeholder).
- **Attachments** — Drag-drop, size limit, **type** allowlist; **progress** for upload.
- **Context chips** — “Using: Page X, File Y” — **removable** and **visible** so users know what the model sees.

## 6. Suggested prompts & empty state

- **3–6** starter prompts — Concrete, **safe** (no prompt injection bait in copy).
- **Empty** — Explain **what** the assistant can do **in this product** (bounded capability).

## 7. Controls (toolbar)

Common actions: **Stop**, **Regenerate**, **Copy**, **Good/Bad feedback** (optional), **New chat**.

- **Stop** — Must halt client streaming and server job if applicable; **partial** answer remains with label.
- **Feedback** — Don’t block flow; explain **how** feedback is used (privacy).

## 8. Accessibility

- **Live region** — Polite updates for streaming completion; avoid **spamming** announcements per token.
- **Focus** — New message focus management for screen readers (decide: focus stays in input vs move to new content).
- **Keyboard** — Full thread navigable; shortcuts documented (**?** help sheet).

## 9. Loading & skeletons

- **First token delay** — Show **skeleton** or **thinking** state; avoid blank bubble.
- **Multi-step** — “Step 2 of 3” for visible pipelines (research → draft → cite).

## 10. Brand and tone

- **Assistant avatar** — Consistent with product; **subordinate** to user content (don’t dominate the canvas).
- **Microcopy** — Avoid **anthropomorphic** overclaim (“I know everything”); align with **legal** / trust team on disclaimers.

## 11. Anti-patterns

- Hiding **limitations** until error.
- **Fake** typing delays that feel manipulative.
- Identical styling for **user** and **assistant** text — hurts scan speed.
- No **escape hatch** when model is wrong — always allow **edit**, **retry**, or **human** path.
