# Write documentation for an RNUI component

Copy this prompt when adding or improving docs for an **existing** RNUI component.

---

## Prompt

Write documentation for an **existing** RNUI component. Do **not** create a new component.

### Component

**[COMPONENT NAME — e.g. Select]**

### Sources to read first

1. `registry/shared/ui/<kebab>.tsx` — implementation and types (source of truth)
2. `.ai/component-registry.json` — current metadata entry
3. `registry/registry.json` — catalog item (title, description, files, peers)
4. `apps/example` — usage demo if present (may have API drift)
5. `registry/README.md` — registry conventions and variant notes

### Output: registry metadata + usage doc

Update the component's `registry/registry.json` item description and, when a docs surface exists, its page, with:

1. **Frontmatter** — `title`, `description`
2. **Overview** — one paragraph on purpose
3. **Install + import**

   ```bash
   npx @rnui/cli add <kebab-name>
   ```

   ```tsx
   import { ComponentName } from '@/components/ui/<kebab-name>';
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
- `registry/registry.json` item description if the summary changed

### Rules

- Document what **exists** — do not invent props
- No "coming soon" without noting gaps
- Match docs site tone: concise, mobile-focused
- Do not modify component public API unless explicitly requested
