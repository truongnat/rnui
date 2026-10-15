# Registry component authoring contract

`registry/shared/ui` is the source of truth for components copied into
consumer apps. It uses NativeWind/Uniwind classes through `cn()` and `tv()`,
with no dependency on `@truongdq01/*` packages.

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

## Component workflow

1. Check `.ai/component-registry.json` and `registry/registry.json` before
   adding a component. Extend an existing component when it already covers the
   behavior.
2. Implement the source in `registry/shared/ui/<name>.tsx`. Keep registry code
   self-contained; use only declared registry and npm dependencies.
3. Add a variant override only when NativeWind and Uniwind need different code.
4. Add the catalog entry, dependencies, and any component-schema metadata.
5. Keep the example app's vendored component in sync with the registry source.
6. Run `bun run registry:build` and commit the generated `registry/dist/` files.
