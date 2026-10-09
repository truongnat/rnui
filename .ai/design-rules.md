# RNUI design rules for AI agents

How to design mobile screens with RNUI. Read alongside `.ai/component-registry.json` and `.ai/rnui.manifest.json`.

> RNUI is a **shadcn-style registry**: component source files are copied into the consumer app under `components/ui/` and imported via the `@/` alias. Styling is Tailwind classes (`className` + `cn()`), themed by CSS variables — there is no runtime `ThemeProvider` or token package.

## Layout first

1. Define screen regions: header, body, footer/actions.
2. Use layout primitives before decorative components.
3. Prefer vertical `Stack` for forms and settings; use `direction="row"` for toolbars and chip rows.
4. Use a plain `View` with `className="flex-1"` for flexible regions; use `Grid`/`GridItem` for responsive tile layouts.

## Component mapping

| Need | RNUI component |
| ---- | -------------- |
| Page structure | `Stack`, `View` (`flex-1`), `Grid`, `ScrollArea` |
| Surfaces | `Card`, `GlassCard`, `Paper` |
| Text | `Text` variants (never raw RN `Text` for body copy unless inside a custom leaf) |
| Primary actions | `Button` (`variant="default"`) |
| Secondary actions | `Button` (`variant="outline"` / `secondary` / `ghost`) or `Link` |
| Text input | `TextField` (label + input + error), `Input`, `Textarea` |
| Form structure | `FormField` + `FormLabel` + `FormDescription` + `FormMessage`, `Label` |
| Navigation chrome | `AppBar`, `Tabs`, `TabBar`, `BottomNavigation` |
| Lists | `List`, `ListItem`, `ListSectionTitle`, `ListSeparator` |
| Feedback | `Alert`, `Snackbar`, `Toast` (`ToastProvider` + `useToast`) |
| Overlays | `Modal`, `Sheet`, `Dialog`, `Drawer`, `Popover` |
| Empty / error | `EmptyState` |
| Loading | `Skeleton`, `CircularProgress`, `Progress` |
| Media | `Avatar`, `Image`, `Icon` |

## Tokens and theme

- Colors are **semantic CSS-var Tailwind classes**: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-destructive`, `border-border`, `bg-card`, etc.
- Prefer variant-driven props (`Text variant="muted"`, `Button variant="outline"`, `Alert variant="destructive"`) over manual color classes.
- When a dynamic color is needed at runtime (charts, state-driven), read resolved values with `useThemeColor()` from `@/lib/utils` and pass them through `style` — **never toggle var-referencing classes at runtime** (Hermes OOM).
- Use component props like `Stack spacing="md"` or `Grid gap="md"` over raw pixel gaps; reach for `className` padding utilities (`p-4`, `px-6`) elsewhere.

### Surface hierarchy

- Layer surfaces in order: `bg-background` (canvas) → card/popover surfaces. `Card` already renders the card surface and `text-card-foreground`.

### Radius

- Components ship with consistent rounded corners (`rounded-md` / `rounded-lg`, `borderCurve: 'continuous'`). Keep custom surfaces on the same scale.

### Typography scale

- `Text` variants: `default`, `h1`–`h4`, `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`.
- Use `accessibilityRole="header"` on heading-level `Text` — there is no `as` prop.

### Motion

- Use Reanimated/worklets already installed for the styling variant. Honor reduced motion for non-essential animations.

## Visual style

- Prefer **simple, clean UI** over heavy decoration.
- Limit font size variety — use `Text` variants for hierarchy.
- Use `Card`/`CardContent` or `GlassCard` to group related content.
- Optional: `Gradient` background only when it serves the design (requires `expo-linear-gradient` in the app).

## Mobile UX

- Minimum touch target **44×44 pt** for tappable areas.
- Adequate vertical spacing between form fields (`Stack spacing="md"` or larger).
- Scroll long content — wrap body in `ScrollView` when needed (RN primitive), keep header/footer fixed.
- Support **dark mode** — rely on semantic classes, never light-only hex colors.

## Accessibility

- `accessibilityLabel` on icon-only `IconButton`/`Button size="icon"` and controls.
- Use `Text` heading variants with `accessibilityRole="header"` for heading semantics.
- Don't rely on color alone for errors — use `TextField error`, `Alert variant="destructive"`, `FormMessage` text.

## Dark mode and brands

- Brand presets are `registry/themes/<brand>.json` added via the CLI (`npx @rnui/cli add theme-<brand>`) — they swap CSS variable values, not a provider.
- Do not hardcode platform-specific visual hacks (iOS-only shadows, etc.).

---

## Anti-patterns (do not generate)

| Anti-pattern | Why |
| ------------ | --- |
| One giant screen file with 200+ lines of inline styles | Unmaintainable; split sections and use registry props/classes |
| Random hex colors (`#1a1a1a`, `#6366f1`) | Breaks theming and dark mode |
| Custom `PrimaryButton` / `CustomCard` | Duplicates registry components |
| Adding UI libraries (Tamagui, NativeBase, RN Paper) | Conflicts with RNUI tokens and boundaries |
| Toggling var-referencing classes at runtime (e.g. `dark:` swaps on state) | Hermes OOM — use `style` + `useThemeColor()` |
| Styling with fixed pixel widths for all text | Breaks accessibility and font scaling |
| FlashList/FlatList with heavy hooks inside every row | Performance — keep list items light |
| `{count && <Text>}` when count can be 0 | RN crash — use ternary or `count > 0` |

## State patterns

Every data-driven screen should consider:

- **Loading** — `Skeleton` or `Progress`/`CircularProgress`
- **Empty** — `EmptyState` with `EmptyStateAction`
- **Error** — `Alert variant="destructive"` or `EmptyState`
- **Success** — main content with optional `Toast` / `Snackbar`

## Optional native peers

Document in registry when using:

- `expo-blur` → `GlassCard`
- `expo-linear-gradient` → `Gradient`
- `react-native-svg` + `lucide-react-native` → `Icon`, `CircularProgress`
- `react-native-safe-area-context` → `Sheet`, `Modal`, `TabBar`
- `@shopify/flash-list` → `AnimatedList`, large lists

Install peers in the **app** package, not only in a shared library.
