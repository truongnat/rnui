# RNUI design rules for AI agents

How to design mobile screens with RNUI. Read alongside `.ai/component-registry.json` and `.ai/rnui.manifest.json`.

## Layout first

1. Define screen regions: header, body, footer/actions.
2. Use layout primitives before decorative components.
3. Prefer vertical `Stack` for forms and settings; use `direction="row"` for toolbars and chip rows.
4. Use `Box` with `flex` for flexible regions; use `Grid` for responsive tile layouts.

## Component mapping

| Need | RNUI component |
| ---- | -------------- |
| Page structure | `Stack`, `Box`, `Grid` |
| Surfaces | `Card`, `GlassCard`, `Paper` |
| Text | `Typography` (never raw `Text` for body copy unless inside a custom leaf) |
| Primary actions | `Button` |
| Secondary actions | `Button` (`variant="outline"` / `ghost`) or `Link` |
| Text input | `Input`, `TextField`, `TextArea` |
| Form structure | `FormField`, `FormControl`, `Form`, `Label` |
| Navigation chrome | `AppBar`, `Tabs`, `TabBar`, `BottomNavigation` |
| Lists | `List` (+ compound items) |
| Feedback | `Alert`, `Snackbar`, `Toast` |
| Overlays | `Modal`, `BottomSheet`, `Dialog`, `Drawer` |
| Empty / error | `EmptyState` |
| Loading | `Skeleton`, `CircularProgress`, `LinearProgress` |
| Media | `Avatar`, `Image`, `Icon` |

## Tokens and theme

- Read spacing, colors, and radii via `useTokens()` or `useTheme()` from `@truongdq01/headless`.
- Prefer semantic colors: `Typography color="secondary"`, `Button color="primary"`, Alert `severity`.
- Use component token-driven props (`Stack spacing="md"`, `Card padding="lg"`) over raw numbers when available.
- Avoid `StyleSheet` with hardcoded values unless no token exists — then use token values from `useTokens()`.

## Visual style

- Prefer **simple, clean UI** over heavy decoration.
- Limit font size variety — use `Typography` variants and color for hierarchy.
- Use `Card` or `GlassCard` to group related content.
- Optional: `Gradient` background only when it serves the design (requires `expo-linear-gradient` in app).

## Mobile UX

- Minimum touch target **44×44 pt** for tappable areas.
- Adequate vertical spacing between form fields (`Stack spacing="md"` or larger).
- Scroll long content — wrap body in `ScrollView` when needed (RN primitive), keep header/footer fixed.
- Support **dark mode** through theme — no light-only hex colors.

## Accessibility

- `accessibilityLabel` on icon-only `Button` and controls.
- Use `Typography as="h1"` etc. for heading semantics where appropriate.
- Don't rely on color alone for errors — use `Input error`, `Alert severity="error"`, helper text.

## Dark mode and brands

- Wrap app in `ThemeProvider`; optional brand from `@truongdq01/themes`.
- Do not hardcode platform-specific visual hacks (iOS-only shadows, etc.) unless using theme tokens.

---

## Anti-patterns (do not generate)

| Anti-pattern | Why |
| ------------ | --- |
| One giant screen file with 200+ lines of inline styles | Unmaintainable; split sections and use RNUI props |
| Random hex colors (`#1a1a1a`, `#6366f1`) | Breaks theming and dark mode |
| Custom `PrimaryButton` / `CustomCard` | Duplicates `@truongdq01/ui` |
| Adding UI libraries (Tamagui, NativeBase, RN Paper) | Conflicts with RNUI tokens and boundaries |
| Importing `@truongdq01/ui` inside `packages/tokens` | Violates package boundary |
| Styling with fixed pixel widths for all text | Breaks accessibility and font scaling |
| FlashList/FlatList with heavy hooks inside every row | Performance — keep list items light |
| `{count && <Text>}` when count can be 0 | RN crash — use ternary or `count > 0` |

## State patterns

Every data-driven screen should consider:

- **Loading** — `Skeleton` or progress indicator
- **Empty** — `EmptyState` with action
- **Error** — `Alert severity="error"` or `EmptyState variant="error"`
- **Success** — main content with optional `Toast` / `Snackbar`

## Optional native peers

Document in registry when using:

- `expo-blur` → `GlassCard`
- `expo-linear-gradient` → `Gradient`
- `@shopify/flash-list` → `Select` (performance)
- `react-native-svg` + `lucide-react-native` → `Icon`

Install peers in the **app** package, not only in a shared library.
