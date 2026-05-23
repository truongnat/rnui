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
- Flexible areas → `Box flex={1}`
- Grid of tiles → `Grid`

### 3. Select RNUI components

Look up each component in `.ai/component-registry.json`. Prefer **stable** status.

### 4. Define data states

| State | UI pattern |
| ----- | ---------- |
| Loading | `Skeleton`, spinner, or disabled inputs |
| Empty | `EmptyState` + optional `Button` action |
| Error | `Alert`, `Input error`, or `EmptyState variant="error"` |
| Success | Primary content; confirm with `Toast` if needed |

### 5. Compose the screen

- Header: `AppBar` or top `Typography variant="h5"`
- Body: `Stack` + `Card` sections
- Footer: sticky `Button` row for primary actions

### 6. Add accessibility

- Labels on icon buttons
- Heading hierarchy via `Typography`
- Error text associated with inputs

### 7. Add responsive spacing

- Use `Stack spacing="md"` / `"lg"` between sections
- Use `Card padding="md"` for inner grouping
- Token spacing via `useTokens().spacing[n]` only when needed

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

**Recommended components:** `Stack`, `Typography`, `Input`, `Button`, `Link`, `Alert`

**Layout structure:**

```
Stack (spacing lg, flex 1, centered)
  Typography h4 — app name
  Typography body2 secondary — subtitle
  Input label email
  Input label password (secureTextEntry)
  Button fullWidth — Sign in
  Link — Forgot password
  Alert (error) — when auth fails
```

**Notes:** Handle loading on submit (`Button loading`). Show `Alert` for auth errors. No custom text inputs.

---

### Settings screen

**Purpose:** Toggle preferences and navigate to sub-settings.

**Recommended components:** `AppBar`, `Stack`, `List`, `Switch`, `Typography`, `Divider`

**Layout structure:**

```
AppBar title Settings
ScrollView
  List subheader Account
    ListItem + Switch / chevron rows
  List subheader Preferences
    Switch rows for notifications, dark mode (via theme)
  List subheader About
    navigation rows
```

**Notes:** Group with `List subheader`. Use `Switch` for booleans. Navigate with router, not custom modals unless needed.

---

### Profile screen

**Purpose:** Show user identity and key stats/actions.

**Recommended components:** `Stack`, `Avatar`, `Typography`, `Button`, `Card`, `Divider`

**Layout structure:**

```
Stack spacing md
  Stack row — Avatar + name + subtitle
  Card — bio / stats
  Button outline — Edit profile
  Card — recent activity list (Typography rows)
```

**Notes:** Center avatar row. Use `Typography variant="h6"` for name. Secondary actions as `Button variant="outline"`.

---

### Dashboard screen

**Purpose:** Summary metrics and quick actions.

**Recommended components:** `AppBar`, `Grid`, `Card`, `Typography`, `Button`, `Badge`

**Layout structure:**

```
AppBar title Dashboard
Stack spacing md
  Typography h5 — greeting
  Grid — metric Cards (2 columns)
  Card — chart placeholder / recent list
  Stack row — quick action Buttons
```

**Notes:** Keep metric cards scannable. Use `Badge` for counts. Loading: `Skeleton` in card slots.

---

### List / detail screen

**Purpose:** Browse items and drill into one.

**Recommended components:** `AppBar`, `List`, `Typography`, `Avatar`, `Card`, `EmptyState`

**List layout:**

```
AppBar title + search action
List
  ListItem rows (leading Avatar, primary/secondary text)
EmptyState when data.length === 0
```

**Detail layout:**

```
AppBar back + title
Stack spacing md
  Card — hero content
  Typography sections
  Button primary action
```

**Notes:** Empty list → `EmptyState`. Prefer compound `List` API. Separate list and detail into two screen files for navigation.

---

### Form screen

**Purpose:** Collect and submit structured input.

**Recommended components:** `Stack`, `FormField`, `Input`, `TextArea`, `Select`, `Checkbox`, `Button`, `Alert`

**Layout structure:**

```
Typography h5 — form title
Stack spacing md
  FormField / Input pairs
  Select for enums
  Checkbox for consent
  Alert error summary (optional)
  Button fullWidth — Submit
```

**Notes:** Validate before submit. Show field-level `Input error`. Disable submit while loading.

---

### Empty state screen

**Purpose:** Explain why content is missing and what to do next.

**Recommended components:** `EmptyState`, `Button`, `Stack`

**Layout structure:**

```
Box flex 1 centered
  EmptyState
    title, description, variant
    action — Button
```

**Notes:** Use `variant="search" | "error" | "offline"` when appropriate. Always offer a primary action when user can fix the state.

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
2. Confirm imports are from `@truongdq01/ui`.
3. Confirm no forbidden patterns from `.ai/design-rules.md`.
