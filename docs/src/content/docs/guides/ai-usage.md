---
title: AI usage
description: How to use RNUI with AI coding agents — metadata, prompts, and examples.
---

# AI-native RNUI

RNUI includes **machine-readable metadata** and **agent instructions** so tools like Codex, Claude Code, Cursor, and Gemini CLI can generate React Native screens that use the design system correctly — not ad-hoc custom UI.

## What “AI-native” means here

- **Structured component catalog** — `.ai/component-registry.json`
- **Design rules** — `.ai/design-rules.md`
- **Screen workflows** — `.ai/screen-generation.md`
- **Copyable prompts** — `.ai/prompts/`
- **Reference screens** — `.ai/examples/`
- **Agent entrypoint** — `.ai/rnui.manifest.json`

Human docs (this site) and AI metadata (`.ai/`) work together: docs explain components; `.ai/` tells agents *which* components to pick and *how* to compose them.

## Start here (for agents)

1. Read [`.ai/rnui.manifest.json`](https://github.com/truongnat/rnui/blob/develop/.ai/rnui.manifest.json)
2. Pick components from [`.ai/component-registry.json`](https://github.com/truongnat/rnui/blob/develop/.ai/component-registry.json)
3. Follow [`.ai/design-rules.md`](https://github.com/truongnat/rnui/blob/develop/.ai/design-rules.md)
4. Use a prompt from [`.ai/prompts/`](https://github.com/truongnat/rnui/tree/develop/.ai/prompts)

Repository-wide instructions also live in [`AGENTS.md`](https://github.com/truongnat/rnui/blob/develop/AGENTS.md).

## Component registry

`.ai/component-registry.json` lists exported `@truongdq01/ui` components with:

| Field | Purpose |
| ----- | ------- |
| `name` | Export name |
| `category` | forms, layout, navigation, feedback, … |
| `status` | `stable`, `beta`, or `experimental` |
| `commonProps` | Frequently used props (detailed entries) |
| `usageHints` / `avoid` | Do's and don'ts for agents |

Prefer **stable** components for production-like generation. Check [Component status](/components/status/) for human-readable maturity notes.

## Design rules

`.ai/design-rules.md` covers:

- Layout-first composition (`Stack`, `Box`, `Grid`)
- Surface components (`Card`, `GlassCard`, `Paper`)
- Forms (`Input`, `FormField`, `Select`)
- Feedback (`Alert`, `Toast`, `EmptyState`)
- Token usage — no random hex colors
- Anti-patterns agents must avoid

## Prompt templates

| Template | Use for |
| -------- | ------- |
| `build-screen.md` | Single screen |
| `build-app-flow.md` | Multi-screen flow |
| `add-component-doc.md` | Document an existing component |
| `review-rnui-usage.md` | Audit RNUI usage |
| `refactor-to-rnui.md` | Migrate custom UI to RNUI |

Copy the prompt body from [`.ai/prompts/`](https://github.com/truongnat/rnui/tree/develop/.ai/prompts) into your agent.

## Example prompt

```text
Build a clean mobile settings screen using only RNUI components.
Read .ai/rnui.manifest.json first, follow .ai/design-rules.md, and pick
components from .ai/component-registry.json. Do not create custom Button,
Card, Input, Typography, or layout primitives.
```

## Reference examples

TypeScript reference screens in [`.ai/examples/`](https://github.com/truongnat/rnui/tree/develop/.ai/examples):

- Login, settings, profile, dashboard
- List/detail, form

These are learning references for agents — not published app routes.

## Validation

Maintainers can verify AI files exist:

```bash
bun run ai:check
```

## Rules agents must follow

- Import from `@truongdq01/ui` (and hooks from `@truongdq01/headless` when needed).
- Use `ThemeProvider` once at app root.
- Respect package boundaries — see `.ai/package-map.json`.
- Do not add new UI libraries or duplicate RNUI primitives.
- Generated code should be TypeScript-safe for React Native ≥ 0.83.
