# Component Port Contract — ui (styled) → registry/shared (shadcn)

Goal: single source of truth = `registry/shared/ui`. All components use
NativeWind/Uniwind classes via `cn()` + `tv()` slots. No dependency on
`@truongdq01/*` packages.

## File rules (match existing `registry/shared/ui/*.tsx`)

- One file per component family, kebab-case name (shadcn names).
- Imports from `@/components/ui/*` and `@/lib/utils` only; RN core +
  reanimated/gesture-handler/lucide allowed.
- Props interface exported (`XxxProps`), extend RN prop types where sensible.
- Variants via `tv({ slots, variants })`; dynamic state colors via `style` +
  `useThemeColor()` — NEVER toggle var-referencing classes at runtime
  (Hermes OOM, see utils.ts note).
- Labels inherit via `TextClassContext`; form wiring via `FormFieldContext`.
- `cn(className, ...)` on every host node so consumers can override.
- Export compound parts like shadcn (e.g. `Sheet`, `SheetContent`, `SheetTrigger`).

## Helpers available in registry/shared/lib/utils.ts

`cn`, `FormFieldContext`, `TextClassContext`, `useIconColor`, `composeRefs`,
`useThemeColor` (Record<ThemeColorToken,string>). Add new helpers HERE if a
port needs shared logic — don't duplicate.

## Port mapping (ui/ name → registry file)

Dedupe — SKIP, source already exists or fold behavior into existing file:
typography→text, text-area→textarea, o-t-p-input→input-otp,
bottom-sheet→sheet (add `snapPoints`-like prop if needed), menu→dropdown-menu,
breadcrumbs→breadcrumb, radio→radio-group, toggle-button→toggle,
linear-progress→progress, divider→separator, breadcrumbs→breadcrumb.

PORT as new files (shadcn-convention names):
- icon.tsx (lucide-react-native wrapper, tone colors via useIconColor)
- image.tsx (RN Image + aspect/radius/fallback)
- image-list.tsx
- link.tsx
- pressable.tsx (only if it adds value beyond RN Pressable — else skip)
- box.tsx, stack.tsx, grid.tsx (layout helpers; keep minimal — maybe skip box if redundant with View)
- paper.tsx (elevated surface)
- blockquote.tsx
- code-block.tsx
- button-group.tsx
- text-field.tsx (if distinct from input — else enrich input.tsx)
- form-control.tsx / form-field.tsx (FormFieldContext providers)
- modal.tsx (generic Modal wrapper beyond sheet)
- popper.tsx, popup.tsx (positioning primitives)
- tab-bar.tsx, bottom-sheet extra, animated-list.tsx, animated-overlay.tsx
- glass-card.tsx, gradient.tsx (optional peer deps: expo-blur, expo-linear-gradient — must have fallback)
- list.tsx, list-item merge
- app-bar exists; check gaps.

## registry.json

For each new component add an item entry mirroring existing items:
name, type "registry:component", files[].src → shared/ui/<name>.tsx,
registryDependencies where it uses other items (e.g. text, utils).
