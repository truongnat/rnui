# Review RNUI usage in a screen

Copy this prompt to audit whether code uses RNUI correctly.

---

## Prompt

Review the following React Native screen(s) for **correct RNUI usage**.

### Files to review

**[PASTE FILE PATHS OR CODE HERE]**

### Reference documents

- `.ai/rnui.manifest.json`
- `.ai/component-registry.json`
- `.ai/design-rules.md`
- `.ai/package-map.json`

### Review checklist

#### Component selection

- [ ] Uses `@truongdq01/ui` components instead of custom Button/Card/Input/Typography/Stack
- [ ] Components exist in `.ai/component-registry.json`
- [ ] Beta/experimental components used only where justified

#### Theming and tokens

- [ ] No hardcoded hex colors for semantic UI
- [ ] Spacing/radius via RNUI props or `useTokens()` — not random numbers
- [ ] Dark mode compatible (no light-only assumptions)

#### Layout

- [ ] Layout uses Stack/Box/Grid — not nested Views with manual margins everywhere
- [ ] Mobile-readable spacing and touch targets ≥ 44pt

#### States

- [ ] Loading, empty, error handled where data-driven
- [ ] Uses EmptyState, Alert, Skeleton appropriately

#### Accessibility

- [ ] Icon-only actions have `accessibilityLabel`
- [ ] Typography heading hierarchy where needed

#### Architecture

- [ ] No new unnecessary dependencies
- [ ] Business logic separated from presentational JSX where complex
- [ ] Package boundaries respected

#### TypeScript

- [ ] No `any`, `@ts-ignore`, or eslint-disable

### Output format

1. **Summary** — pass / needs work
2. **Violations** — file:line, issue, fix (reference RNUI component or rule)
3. **Suggested refactor** — minimal diff description
4. **Registry components** to use instead of custom UI

Be strict. Prefer RNUI components over custom styling.
