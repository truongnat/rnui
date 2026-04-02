# RNUI — UI Audit & Improvement Report

> Generated: 2026-04-02
> Branch: `develop`
> Scope: Full component audit, bug analysis, and UI/UX improvement plan

---

## 1. Project Overview

**RNUI** is a production-grade React Native UI component library built as a monorepo (Bun + Turbo). It targets iOS and Android with full dark/light mode support, a 3-tier design token system, and 62 components.

| Package | Purpose |
|---|---|
| `@truongdq01/tokens` | Primitive + semantic + component tokens |
| `@truongdq01/headless` | Theme context, hooks, behavior primitives |
| `@truongdq01/ui` | 62 styled components |
| `apps/example` | Kitchen-sink showcase app |

---

## 2. Component Inventory (62 total)

### Forms & Inputs (10)
| Component | Status | Notes |
|---|---|---|
| Button | Good | 5 variants, 3 sizes, loading/disabled states |
| Input | Good | Leading/trailing elements |
| PasswordInput | Good | Toggle visibility |
| TextArea | Good | minLines, maxLength, char counter |
| Select | Good | Searchable, BottomSheet modal |
| Checkbox | Good | Animated, indeterminate state |
| Switch | Good | 3 sizes, animated track |
| RadioGroup | Good | With label + description |
| Slider | Good | Marks, range display, animated thumb |
| OTPInput | Good | 6-digit, focus management |

### Layout & Structure (6)
| Component | Status |
|---|---|
| Box | Good |
| Stack | Good |
| Grid | Good |
| Paper | Good |
| FormField | Good |
| FormGroup | Good |

### Data Display (14)
| Component | Status | Notes |
|---|---|---|
| Avatar | Good | 6 sizes, 4 status indicators |
| AvatarGroup | Good | Overlap stack with max overflow |
| Badge | Good | 6 color variants, icon support |
| Card | Good | |
| List / ListItem | Good | Dense mode, dividers |
| AnimatedList | Good | FlashList-backed |
| Typography | Good | h1–h6, body, caption |
| Skeleton / SkeletonCard | Good | Shimmer animation |
| EmptyState | Good | Title, desc, action |
| Table | Good | |
| Timeline | Good | |
| Chip | Good | |
| Rating | Good | |
| LinearProgress / CircularProgress | Good | |

### Navigation (8)
| Component | Status |
|---|---|
| Tabs | Good |
| SegmentedControl | Good |
| BottomNavigation | Good |
| Breadcrumbs | Good |
| Pagination | Good |
| AppBar | Good |
| Menu | Good |
| ToggleButton | Good |

### Feedback & Overlays (11)
| Component | Status |
|---|---|
| Toast / ToastContainer | Good |
| Snackbar | Good |
| Alert | Good |
| Dialog | Good |
| Modal | Good |
| BottomSheet | Good |
| Drawer | Good |
| Popover | Good |
| Popper | Good |
| Tooltip | Good |
| Fab / SpeedDial | Good |

### Specialized (8)
| Component | Status |
|---|---|
| Carousel | Good |
| DatePicker | Good |
| Autocomplete | Good |
| Image (RnImage) | Good |
| ImageList | Good |
| Link | Good |
| Pressable | Good |
| ButtonGroup | Good |

---

## 3. Design Token System

### Architecture (3-tier)

```
Primitive Tokens  →  Semantic Tokens  →  Component Tokens
  (raw values)        (design intent)     (per-component)
```

### Color Palette

| Role | Light | Dark |
|---|---|---|
| Background default | `#FFFFFF` | `#0D0D14` |
| Background subtle | `#F8FAFC` | `#0F172A` |
| Surface default | `#FFFFFF` | `#0F172A` |
| Surface raised | `#FFFFFF` | `#1E293B` |
| Text primary | `#020617` | `#F8FAFC` |
| Text secondary | `#334155` | `#94A3B8` |
| Text tertiary | `#64748B` | `#64748B` |
| Brand default | `#7C3AED` (violet-600) | `#A78BFA` (violet-400) |
| Brand subtle | `#EDE9FE` | `#2E1065` |
| Accent default | `#F59E0B` (amber-500) | `#FBBF24` (amber-400) |
| Border default | `#CBD5E1` | `#334155` |
| Border subtle | `#E2E8F0` | `#1E293B` |
| Focus ring | `#7C3AED` | `#A78BFA` |

### Spacing Scale (4px base unit)

`0 / 2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 80 / 96px`

### Typography

| Scale | Size | Weight |
|---|---|---|
| xs | 12px | 400 |
| sm | 14px | 400 |
| md | 16px | 400 |
| lg | 18px | 400 |
| xl | 20px | 500 |
| 2xl | 24px | 500 |
| 3xl | 30px | 600 |

### Border Radius

`xs / sm / md / lg / xl / full (999px)`

### Shadows (cross-platform)

| Level | Opacity Light | Opacity Dark | Elevation |
|---|---|---|---|
| none | 0 | 0 | 0 |
| sm | 0.08 | 0.25 | 2 |
| md | 0.12 | 0.35 | 4 |
| lg | 0.16 | 0.45 | 8 |
| xl | 0.20 | 0.55 | 16 |

---

## 4. Bugs Found & Fixed

### Bug 1: Dark/Light Mode Not Working (CRITICAL)

**Location:** `apps/example/app/index.tsx` — lines 356–361

**Root Cause:** Theme toggle buttons had empty `onPress` handlers.

```tsx
// BEFORE (broken)
<Button label="Light" variant="outline" size="sm" onPress={() => {}} />
<Button label="Dark" variant="outline" size="sm" onPress={() => {}} />
<Button label="System" variant="ghost" size="sm" onPress={() => {}} />
```

```tsx
// AFTER (fixed)
const { setColorScheme, colorScheme } = useTheme();

<Button label="Light" variant={colorScheme === "light" ? "solid" : "outline"}
  leadingIcon={<Sun size={14} />}
  onPress={() => setColorScheme("light")} />
<Button label="Dark" variant={colorScheme === "dark" ? "solid" : "outline"}
  leadingIcon={<Moon size={14} />}
  onPress={() => setColorScheme("dark")} />
<Button label="System" variant="ghost"
  leadingIcon={<Monitor size={14} />}
  onPress={() => setColorScheme("system")} />
```

**Impact:** Theme infrastructure was fully working (ThemeProvider, state, token resolution) — only the example UI was never calling `setColorScheme()`.

---

### Bug 2: "Dark mode" Switch Not Wired (MEDIUM)

**Location:** `apps/example/app/index.tsx` — line 198

```tsx
// BEFORE (broken)
<Switch label="Dark mode" on={false} onChange={() => {}} />

// AFTER (fixed)
<Switch label="Dark mode" on={colorScheme === "dark"}
  onChange={(v) => setColorScheme(v ? "dark" : "light")} />
```

---

### Bug 3: SegmentedControl State Not Tracked (LOW)

```tsx
// BEFORE (hardcoded)
<SegmentedControl options={["Daily","Weekly","Monthly"]} selectedIndex={0} onChange={() => {}} />

// AFTER (stateful)
const [segIndex, setSegIndex] = useState(0);
<SegmentedControl options={["Daily","Weekly","Monthly"]} selectedIndex={segIndex} onChange={setSegIndex} />
```

---

### Bug 4: Section Labels Using Hardcoded Color (LOW)

```tsx
// BEFORE
const section = { color: "#64748B", ... };

// AFTER — uses token so it adapts to dark mode
color: t.color.text.tertiary
```

---

### Bug 5: SafeAreaView Background Not Themed (LOW)

```tsx
// BEFORE — white in dark mode
<SafeAreaView style={{ flex: 1 }}>

// AFTER — follows theme
<SafeAreaView style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
```

---

## 5. UI/UX Improvement Plan

### Current State Assessment

| Dimension | Score | Notes |
|---|---|---|
| Visual hierarchy | 5/10 | Flat list of sections, no grouping |
| Color consistency | 6/10 | Hardcoded colors mixed with tokens |
| Dark mode | 3/10 | Non-functional (bug) |
| Component density | 6/10 | Cards too sparse |
| Typography | 6/10 | Raw `<Text>` instead of `<Typography>` |
| Interactive feedback | 7/10 | Animations good, some dead buttons |
| Navigation | 4/10 | No header, no tab structure |

---

### Improvements Implemented (Session 2026-04-02)

#### Header Bar
- Added sticky top bar with app name + subtitle
- 3 icon buttons (Sun / Moon / Monitor) with active highlight in `brand.subtle`
- Active icon tints in `brand.default`
- Separated from scroll content with hairline border

#### Section Cards
- Replaced flat sections with `<Section>` wrapper component:
  - `surface.default` background
  - `radius.xl` corners (16px)
  - Hairline border (`border.subtle`)
  - `spacing[4]` padding
- Section headers now include a hairline extending rule for visual rhythm

#### Background Layering
- Page background: `bg.subtle` (off-white / dark gray)
- Card background: `surface.default` (pure white / gray-900)
- Creates visual depth like Telegram / Facebook Messenger chat screens

#### Typography
- Section headers: `fontWeight: 700`, `letterSpacing: 1.2`, uppercase, `text.tertiary`
- List item names: `fontWeight: "600"` (string literal for TS)
- Used `<Typography>` for header title

#### Interactive States
- Theme buttons show active variant (`solid` when current scheme matches)
- All previously dead buttons now functional

#### Carousel Colors
- Changed from flat `#f87171/#34d399/#60a5fa` to `brand/sky/emerald` theme-aligned palette

#### List Card
- Added `surface.raised` background so list items feel elevated
- Hairline border with `border.subtle`

---

## 6. Recommended Next Steps

### High Priority

| Item | Effort | Impact |
|---|---|---|
| Persist `colorScheme` to AsyncStorage | Small | Users keep their preference across launches |
| Add `ThemeProvider` `colorScheme` persistence hook in headless | Medium | Reusable across all apps |
| Fix `fontWeight` TS types (number `600` vs string `"600"`) | Small | Build warnings |

### Medium Priority

| Item | Effort | Impact |
|---|---|---|
| Replace example app with tab navigation (Buttons / Forms / Data / Feedback) | Medium | Easier showcase navigation |
| Add proper app icon + splash screen | Small | Professionalism |
| Add Storybook stories for each component | Large | Developer DX |
| Add `react-native-haptics` feedback on interactive components | Small | iOS native feel |

### Low Priority

| Item | Effort | Impact |
|---|---|---|
| Add RTL support | Medium | Global market |
| Custom font support (Inter / SF Pro) | Small | Premium polish |
| Animation speed tokens (respect `prefers-reduced-motion`) | Medium | Accessibility |
| Add `accent` Button variant to kitchen sink | Trivial | Completeness |

---

## 7. Architecture Health

### Strengths
- Clean 3-tier token separation (primitive → semantic → component)
- Correct WCAG AA contrast ratios documented in token comments
- Warm dark mode (`#0D0D14`) instead of cold black — reduces eye strain
- Cross-platform shadow system (iOS props + Android elevation)
- Reanimated-based animations (UI thread, 60fps)
- Gesture Handler for all touchables

### Risks
- No token persistence layer — color scheme resets on app restart
- `packages/tokens/src/component.ts` — component tokens are recomputed on every render unless memoized at the ThemeProvider level (needs audit)
- `AnimatedList` uses `FlashList` — requires correct `estimatedItemSize` or perf degrades silently
- No snapshot or visual regression tests — UI changes can break silently

---

## 8. Token Quick Reference

```tsx
import { useTokens, useTheme } from "@truongdq01/headless";

const t = useTokens();
const { setColorScheme, colorScheme } = useTheme();

// Colors
t.color.bg.default          // page background
t.color.bg.subtle           // slightly off-white / dark gray
t.color.surface.default     // card background
t.color.surface.raised      // elevated card
t.color.text.primary        // headings
t.color.text.secondary      // body
t.color.text.tertiary       // captions, labels
t.color.brand.default       // primary violet
t.color.brand.subtle        // light violet tint (bg)
t.color.border.subtle       // hairline borders
t.color.border.input        // form field borders

// Spacing (multiples of 4px)
t.spacing[1]  // 4px
t.spacing[2]  // 8px
t.spacing[3]  // 12px
t.spacing[4]  // 16px
t.spacing[6]  // 24px

// Radius
t.radius.sm   // small (4px)
t.radius.md   // medium (8px)
t.radius.lg   // large (12px)
t.radius.xl   // extra-large (16px)
t.radius.full // pill (999px)

// Shadows
t.shadow.sm   // subtle card shadow
t.shadow.md   // dialog / sheet shadow
t.shadow.lg   // FAB / elevated modal
```

---

*End of report — RNUI v0.x, branch `develop`, 2026-04-02*
