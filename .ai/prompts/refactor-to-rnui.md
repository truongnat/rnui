# Refactor custom UI to RNUI

Copy this prompt to migrate hand-rolled React Native UI to RNUI.

---

## Prompt

Refactor the following **custom React Native UI** to use **RNUI** components and tokens.

### Source code

**[PASTE CUSTOM COMPONENT OR SCREEN CODE HERE]**

### Required reading

1. `.ai/rnui.manifest.json`
2. `.ai/component-registry.json`
3. `.ai/design-rules.md`
4. Relevant `.ai/examples/*.tsx`

### Refactor rules

1. **Map primitives:**
   - Custom buttons → `Button` (`variant` + `children` label)
   - Custom text styles → `Text` variants
   - Custom cards/surfaces → `Card` (+ `CardContent`) or `Paper`
   - Custom inputs → `TextField` / `Input` / `FormField`
   - Custom stacks → `Stack` / `View` (`className="flex-1"`)
   - Custom modals → `Modal` / `Dialog` / `Sheet`

2. **Remove** inline color/spacing constants — use component props, semantic classes, and `useThemeColor()` from `@/lib/utils`.

3. **Preserve behavior** — same user flows, callbacks, and navigation.

4. **Preserve types** — TypeScript strict, no `any`.

5. **Do not** add new npm packages.

6. **Do not** change app business logic — UI layer only unless a bug is found.

7. **Shrink** StyleSheet usage — delete rules replaced by RNUI props.

### Output

1. Mapping table: old pattern → RNUI component
2. Refactored code (full file)
3. Removed dependencies/styles list
4. Optional native peers needed (svg, expo-blur, etc.)
5. Follow-up items if no 1:1 RNUI equivalent exists (name the closest registry entry)

If a custom component duplicates RNUI, delete the custom component and import from `@/components/ui/<kebab>` (add missing items with `npx @rnui/cli add`).
