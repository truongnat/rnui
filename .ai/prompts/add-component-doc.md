# Write documentation for an RNUI component

Copy this prompt when adding or improving docs for an **existing** RNUI component.

---

## Prompt

Write documentation for an **existing** RNUI component. Do **not** create a new component.

### Component

**[COMPONENT NAME — e.g. Select]**

### Sources to read first

1. `packages/ui/src/components/[Component]/` — implementation and types
2. `.ai/component-registry.json` — current metadata entry
3. `docs/src/content/docs/components/` — existing doc if any
4. `apps/example/app/components/[Component].tsx` — usage demo (may have API drift)
5. `docs/src/content/docs/components/status.md` — maturity status

### Output: Starlight doc page

Create or update `docs/src/content/docs/components/[slug].mdx` with:

1. **Frontmatter** — `title`, `description`
2. **Overview** — one paragraph on purpose
3. **Import**

   ```tsx
   import { ComponentName } from '@truongdq01/ui';
   ```

4. **Basic usage** — minimal working example
5. **Props table** — name, type, default, description (from TypeScript types)
6. **Variants / states** — if applicable
7. **Accessibility** — labels, roles, touch targets
8. **Peer / optional dependencies** — e.g. FlashList, expo-blur
9. **Related components** — from registry `relatedComponents`
10. **Status** — stable / beta / experimental

### Also update

- `.ai/component-registry.json` entry if props or hints changed
- `docs/src/content/docs/components/status.md` if maturity changed

### Rules

- Document what **exists** — do not invent props
- No "coming soon" without noting gaps
- Match docs site tone: concise, mobile-focused
- Do not modify component public API unless explicitly requested
