# RNUI screen generation guide

Workflow for AI agents building React Native screens with RNUI.

## Recommended workflow

### 1. Understand screen purpose

- What is the user trying to do?
- What data does the screen need?
- Is it read-only, form, or navigational?

### 2. Select layout primitives

- Vertical flow → `Stack` (default `direction="column"`)
- Horizontal actions → `Stack direction="row"`
- Flexible areas → `View` with `className="flex-1"` (or a `Stack` that fills)
- Grid of tiles → `Grid` + `GridItem`

### 3. Select RNUI components

Look up each component in `.ai/component-registry.json`.

### 4. Define data states

| State | UI pattern |
| ----- | ---------- |
| Loading | `Skeleton`, `Progress`, or disabled inputs |
| Empty | `EmptyState` + optional `Button` action |
| Error | `Alert variant="destructive"`, `TextField error`, or `EmptyState` |
| Success | Primary content; confirm with `Toast` if needed |

### 5. Compose the screen

- Header: `AppBar` (with `AppBarTitle`) or top `Text variant="h4"`
- Body: `Stack` + `Card` sections
- Footer: sticky `Button` row for primary actions

### 6. Add accessibility

- Labels on icon-only buttons (`IconButton`, `Button size="icon"`)
- Heading hierarchy via `Text` variants + `accessibilityRole="header"`
- Error text associated with inputs

### 7. Add responsive spacing

- Use `Stack spacing="md"` / `"lg"` between sections
- Use `Card`/`CardContent` (`p-4`/`p-6`) for inner grouping
- Semantic class utilities (`p-4`, `gap-2`) or `cn()` composition; resolved colors via `useThemeColor()` only when needed

### 8. Add example data

- Mock arrays/objects at top of file or in a `mock/` module
- Keep business logic in hooks separate from JSX when non-trivial

### 9. Keep business logic separate

```tsx
// useSettingsScreen.ts — data + handlers
// SettingsScreen.tsx — RNUI composition only
```

---

## Screen templates

### Login screen

**Purpose:** Authenticate with email/password or social.

**Recommended components:** `Stack`, `Text`, `TextField`, `Button`, `Link`, `Alert`

**Layout structure:**

```
Stack (spacing lg, flex-1, centered)
  Text h3 — app name
  Text muted — subtitle
  TextField label Email
  TextField label Password (secureTextEntry)
  Button className="w-full" — Sign in
  Link — Forgot password
  Alert variant="destructive" — when auth fails
```

**Notes:** Disable `Button` while submitting (`disabled={loading}`). Show `Alert` for auth errors. No custom text inputs.

---

### Settings screen

**Purpose:** Toggle preferences and navigate to sub-settings.

**Recommended components:** `AppBar`, `Stack`, `List`, `ListItem`, `ListSectionTitle`, `Switch`, `Separator`

**Layout structure:**

```
AppBar with AppBarTitle Settings
ScrollView
  ListSectionTitle Account
  List — ListItem rows with Switch trailing / chevron
  ListSectionTitle Preferences
  List — Switch rows for notifications, dark mode
  ListSectionTitle About
  List — navigation rows
```

**Notes:** Group with `ListSectionTitle` + `List`. Use `Switch` (`checked`/`onCheckedChange`) for booleans. Navigate with router, not custom modals unless needed.

---

### Profile screen

**Purpose:** Show user identity and key stats/actions.

**Recommended components:** `Stack`, `Avatar` + `AvatarFallback`, `Text`, `Button`, `Card`, `Separator`

**Layout structure:**

```
Stack spacing md
  Stack row — Avatar + name + subtitle
  Card — bio / stats
  Button variant="outline" — Edit profile
  Card — recent activity list (Text rows)
```

**Notes:** Center avatar row. Use `Text variant="large"` for name. Secondary actions as `Button variant="outline"`.

---

### Dashboard screen

**Purpose:** Summary metrics and quick actions.

**Recommended components:** `AppBar`, `Grid` + `GridItem`, `Card`, `Text`, `Button`, `Badge`

**Layout structure:**

```
AppBar with AppBarTitle Dashboard
Stack spacing md
  Text h4 — greeting
  Grid columns={2} — metric Cards
  Card — chart placeholder / recent list
  Stack row — quick action Buttons
```

**Notes:** Keep metric cards scannable. Use `Badge` for counts. Loading: `Skeleton` in card slots.

---

### List / detail screen

**Purpose:** Browse items and drill into one.

**Recommended components:** `AppBar`, `List`, `ListItem`, `Text`, `Avatar`, `Card`, `EmptyState`

**List layout:**

```
AppBar with AppBarTitle + trailing search action
List
  ListItem rows (leading Avatar, title/subtitle)
EmptyState when data.length === 0
```

**Detail layout:**

```
AppBar onBack + AppBarTitle
Stack spacing md
  Card — hero content
  Text sections
  Button primary action
```

**Notes:** Empty list → `EmptyState` (+ `EmptyStateTitle`/`EmptyStateDescription`/`EmptyStateAction`). Prefer compound `List` API. Separate list and detail into two screen files for navigation.

---

### Form screen

**Purpose:** Collect and submit structured input.

**Recommended components:** `Stack`, `TextField`, `FormField` + `FormLabel`, `Textarea`, `Select`, `Checkbox`, `Button`, `Alert`

**Layout structure:**

```
Text h4 — form title
Stack spacing md
  TextField (label + error) / FormField + Input pairs
  Select for enums
  Checkbox + label row for consent
  Alert variant="destructive" summary (optional)
  Button className="w-full" — Submit
```

**Notes:** Validate before submit. Show field-level `TextField error` (auto-invalid via `FormField`). Disable submit while loading.

---

### Empty state screen

**Purpose:** Explain why content is missing and what to do next.

**Recommended components:** `EmptyState` (+ `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateAction`), `Button`, `Stack`

**Layout structure:**

```
View flex-1 centered
  EmptyState
    EmptyStateTitle, EmptyStateDescription
    EmptyStateAction — Button
```

**Notes:** Always offer a primary action when the user can fix the state.

---

## Reference implementations

See `.ai/examples/` for copy-paste starting points:

- `login-screen.tsx`
- `settings-screen.tsx`
- `profile-screen.tsx`
- `dashboard-screen.tsx`
- `list-detail-screen.tsx`
- `form-screen.tsx`

## After generation

1. Run through `.ai/prompts/review-rnui-usage.md` mentally or with an agent.
2. Confirm imports are per-file from `@/components/ui/<kebab>` (never a single package barrel).
3. Confirm no forbidden patterns from `.ai/design-rules.md`.
