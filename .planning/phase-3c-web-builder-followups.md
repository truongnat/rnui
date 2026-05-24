# Phase 3C — Web Builder Follow-ups

## Next recommended phase

1. **Real AI provider** — implement `AIProvider` with OpenAI/Anthropic schema-only generation + `repairSchema` using validation errors as context.
2. **Streaming chat** — SSE or websocket for incremental assistant messages (still schema-only output).
3. **Persistence** — localStorage or backend project save/load.
4. **Lazy bundle splitting** — wire `loadComponentsForPlan` + dynamic imports in Next.js.
5. **Playwright E2E** — prompt → preview smoke tests.

## Out of scope until later

- SEO marketing landing content (placeholder `/` only for now)
- User accounts / auth / billing
- Drag-and-drop canvas editor
- Props inspector
- Template marketplace
- Executing generated TSX at runtime
- Native-only component polyfills

## Technical debt

- Builder uses direct relative imports to `packages/ui/src/components` for slim bundle — switch to documented preview entry when available.
- Next.js requires `--webpack` for RN aliases; revisit when Turbopack alias support stabilizes.
- No Monaco editor — textarea only for MVP.
