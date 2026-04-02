# RNUI — Improvement Plan

> Created: 2026-04-03 | Branch: `develop`
> Based on: User audit + code review of all 15 reported issues

---

## Summary

| # | Issue | Component | Severity | Effort |
|---|---|---|---|---|
| 1 | Input focus lag + padding + TextArea overlap | Input, TextArea | High | M |
| 2 | No consistent typography levels | Typography | High | S |
| 3 | Divider only horizontal in showcase | Divider | Low | XS |
| 4 | Select no large-data / load-more support | Select | High | L |
| 5 | Radio no horizontal / standalone | Radio | Medium | S |
| 6 | Slider no vertical / custom thumb / range | Slider | Medium | L |
| 7 | Checkbox indeterminate not shown | Checkbox | Low | XS |
| 8 | Skeleton not dynamic/customizable enough | Skeleton | Medium | M |
| 9 | EmptyState too simple | EmptyState | Medium | M |
| 10 | AnimatedList re-renders whole list | AnimatedList | High | S |
| 11 | SegmentedControl wrong style / broken layout | SegmentedControl | High | M |
| 12 | OTPInput can't delete / can't focus / ugly border | OTPInput | High | M |
| 13 | DatePicker should be BottomSheet + calendar grid | DatePicker | High | XL |
| 14 | Carousel invisible on light mode | Carousel | Medium | S |
| 15 | Toast animation jumpy | Toast | Medium | S |
| + | Glassmorphism / color system upgrade | tokens, components | High | L |
| + | Component tree missing | docs | Medium | M |

**Effort:** XS < 1h · S 1-3h · M 3-8h · L 8-16h · XL 16h+

---

## Issue Details & Plans

---

### Issue 1 — Input: Focus Lag, Semantic Padding, TextArea Overlap

**Root cause analysis:**
- Focus lag: `Input` uses `withTiming` for border-color transition on focus — can feel slow at 200ms on older devices. Also RN's native keyboard avoidance adds perceived delay.
- Padding: `FormField` uses `tokens.spacing[1]` (4px) gap between label and input — too tight vs standard 6-8px. Label font size same as helper text (both `fontSize.xs`) — no visual hierarchy.
- TextArea overlap: `helperText="Max 200 characters"` is passed to `FormField` which renders it below the box. But the `maxLength` counter is rendered inside `TextArea`'s own label row. When both exist, they stack oddly. The actual overlap seen in screenshot is the `helperText` text showing beneath the `TextArea` box too close to the `maxLength` counter — double information.

**Plan:**

```
packages/ui/src/components/Input/Input.tsx
  - Reduce focus border animation to 120ms (from 200ms)
  - Add transition: borderColor animated interpolation using withTiming(120)
  - standardize paddingVertical to spacing[3] (12px) — semantic form height 48px

packages/ui/src/components/FormField/FormField.tsx
  - Label: fontSize.sm (14px), fontWeight.semibold, color.text.primary — more prominent
  - Helper text: fontSize.xs (12px), color.text.tertiary — clearly subordinate
  - Gap between label → input: spacing[1.5] = 6px
  - Gap between input → helper: spacing[1] = 4px
  - Required asterisk: color.error.icon (red), not just text

packages/ui/src/components/TextArea/TextArea.tsx
  - When maxLength prop is passed to TextArea, do NOT pass helperText prop from FormField
  - OR: expose showCounter prop (default true) to suppress internal counter when FormField already shows it
  - Fix: move character counter OUT of label row → absolutely position bottom-right inside the box
    (like WhatsApp / Telegram message composer)
  - Add counterPosition?: "inside" | "above" | "below" prop
```

---

### Issue 2 — Typography System Incomplete

**Root cause analysis:**
- `Typography` component exists with `h1-h6`, `body1`, `body2`, `caption`
- BUT: raw `<Text>` is used throughout all components (Button, List, FormField, etc.) with inline style objects
- No `overline` variant (uppercase tracking labels used in section headers)
- No `code` / `mono` variant

**Plan:**

```
packages/tokens/src/semantic.ts
  - Add typography composite styles to shared tokens:
    display: { fontSize: 36, fontWeight: "800", lineHeight: 44, letterSpacing: -0.5 }
    h1: { fontSize: 30, fontWeight: "700", lineHeight: 38 }
    h2: { fontSize: 24, fontWeight: "700", lineHeight: 32 }
    h3: { fontSize: 20, fontWeight: "600", lineHeight: 28 }
    h4: { fontSize: 18, fontWeight: "600", lineHeight: 26 }
    h5: { fontSize: 16, fontWeight: "600", lineHeight: 24 }
    h6: { fontSize: 14, fontWeight: "600", lineHeight: 22 }
    body1: { fontSize: 16, fontWeight: "400", lineHeight: 24 }
    body2: { fontSize: 14, fontWeight: "400", lineHeight: 22 }
    caption: { fontSize: 12, fontWeight: "400", lineHeight: 18 }
    overline: { fontSize: 11, fontWeight: "700", lineHeight: 16, letterSpacing: 1.2, textTransform: "uppercase" }
    label: { fontSize: 14, fontWeight: "500", lineHeight: 20 }
    code: { fontSize: 13, fontFamily: "mono", lineHeight: 20 }

packages/ui/src/components/Typography/Typography.tsx
  - Extend variant prop to include all above variants
  - Add as prop: "h1" | "h2" | "p" | "span" etc. for semantic HTML-like usage
  - Memoize style computation

apps/example: replace all raw <Text style={{...}}> section labels with <Typography variant="overline">
```

---

### Issue 3 — Divider: Vertical Not Showcased

**Root cause analysis:**
- Divider component ALREADY supports `orientation="vertical"` — code is correct.
- Just not demonstrated in the example app.

**Plan:**

```
apps/example/app/index.tsx — Divider section:
  Add vertical divider demo:
  <View style={{ flexDirection: "row", alignItems: "center", height: 40, gap: 12 }}>
    <Text>Left</Text>
    <Divider orientation="vertical" />
    <Text>Middle</Text>
    <Divider orientation="vertical" emphasis />
    <Text>Right</Text>
  </View>
```

---

### Issue 4 — Select: No Large-Data / Loading / Load-More

**Root cause analysis:**
- Current: `filtered.map(...)` inside `<ScrollView>` — O(n) render, no virtualization.
- No `loading` prop, no `onLoadMore`, no pagination.
- With 500+ options, this will lag and freeze.

**Plan:**

```
packages/ui/src/components/Select/Select.tsx
  Props to add:
    loading?: boolean                           // show spinner in sheet
    onLoadMore?: () => void                     // called when list reaches end
    hasMore?: boolean                           // show "Load more" footer
    loadingMore?: boolean                       // spinner in footer
    renderOption?: (option, selected) => ReactNode  // custom option renderer

  Implementation:
    - Replace ScrollView + map → FlashList (already a dep via AnimatedList)
    - estimatedItemSize: 48
    - Add ListFooterComponent: loading spinner when loadingMore=true
    - onEndReached: call onLoadMore when hasMore=true
    - Add ListEmptyComponent: show loading skeleton (3x SkeletonListItem) when loading=true
    - Add section support: options can be { section: string, items: SelectOption[] }

  Example showcase in index.tsx:
    - Add LARGE_COUNTRIES array (50 items)
    - Demonstrate loading state and load-more pagination
```

---

### Issue 5 — Radio: No Horizontal / No Standalone RadioItem Export

**Root cause analysis:**
- `RadioGroup` already has `direction="horizontal" | "vertical"` prop — code is correct.
- `RadioItem` is defined but NOT exported from the component's `index.ts`.
- Example only shows vertical direction.

**Plan:**

```
packages/ui/src/components/Radio/index.ts
  - Add: export { RadioItem } from "./Radio"

packages/ui/src/index.ts
  - Add RadioItem to named exports

apps/example/app/index.tsx — Radio section:
  - Add horizontal RadioGroup demo:
    <RadioGroup direction="horizontal" options={[
      { value: "m", label: "Male" },
      { value: "f", label: "Female" },
      { value: "o", label: "Other" },
    ]} value={gender} onChange={setGender} />
  - Add standalone RadioItem demo (no group)
```

---

### Issue 6 — Slider: No Vertical / No Custom Thumb / No Range

**Root cause analysis:**
- Current Slider is hard-coded horizontal layout (uses `panGesture` horizontal pan).
- Thumb is always a white circle (`borderRadius: slider.thumb.borderRadius`).
- No dual-thumb range support.
- `useSlider` hook in headless only handles single value, horizontal.

**Plan:**

```
packages/headless/src/hooks/useSlider.ts
  - Add orientation?: "horizontal" | "vertical" (default "horizontal")
  - For vertical: swap pan gesture direction (y-axis), invert percentage calculation
  - Add range support: value can be [min, max] tuple, returns [thumbLeft, thumbRight] positions

packages/ui/src/components/Slider/Slider.tsx
  Props to add:
    orientation?: "horizontal" | "vertical"
    thumbRenderer?: () => ReactNode          // replace default circle
    range?: boolean                          // dual-thumb mode
    rangeValue?: [number, number]           // [low, high]
    onRangeChange?: (v: [number, number]) => void

  Implementation (vertical):
    - Rotate track 90deg, swap width/height
    - panGesture translationY instead of translationX
    - Height of container becomes configurable (sliderHeight prop)

  Implementation (custom thumb):
    - If thumbRenderer provided: render ReactNode instead of <Animated.View>
    - Wrap in same Animated.View for positioning, size from thumb token

  Implementation (range):
    - Two thumbs, each with own useSharedValue for position
    - Fill between left and right thumb
    - Prevent thumbs from crossing

apps/example — add:
  - Vertical slider demo (height: 150, orientation="vertical")
  - Custom thumb with icon (<Star size={20} />)
  - Range slider [20, 80]
```

---

### Issue 7 — Checkbox: Indeterminate Not Showcased

**Root cause analysis:**
- Checkbox code at line 88-90 already handles indeterminate with a horizontal dash.
- `useCheckbox` hook supports `indeterminate` prop.
- Just not shown in the example.

**Plan:**

```
apps/example/app/index.tsx — Checkbox section:
  const [partialCheck, setPartialCheck] = useState<boolean | "indeterminate">("indeterminate");

  <Checkbox
    label="Select all items"
    description="3 of 5 selected"
    checked={partialCheck === true}
    indeterminate={partialCheck === "indeterminate"}
    onChange={(v) => setPartialCheck(v)}
  />
```

---

### Issue 8 — Skeleton: Not Dynamic Enough

**Root cause analysis:**
- `Skeleton` base: configurable `width`, `height`, `borderRadius` ✓
- `SkeletonCard`, `SkeletonText`, `SkeletonListItem` are fixed presets
- No `SkeletonProfile`, `SkeletonMedia`, `SkeletonForm`, `SkeletonTable`
- No composable builder pattern

**Plan:**

```
packages/ui/src/components/Skeleton/Skeleton.tsx
  Add preset variants:
    SkeletonProfile — large avatar + 2 lines + bio block
    SkeletonMedia — image placeholder (16:9) + title + subtitle
    SkeletonForm — label + input field repeated N times
    SkeletonGrid — NxM grid of square cells
    SkeletonTable — header row + N data rows with columns

  Add SkeletonGroup — wrapper that delays animation per-child (stagger effect):
    <SkeletonGroup stagger={80}>
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
    </SkeletonGroup>

  Add shimmer direction prop: "left-to-right" | "right-to-left" | "pulse" (current)

apps/example: showcase multiple skeleton types in a tab/segmented layout
```

---

### Issue 9 — EmptyState: Too Simple

**Root cause analysis:**
- EmptyState is just title + description + icon + action — no visual weight.
- No illustration support, no size variants, no specific type presets.

**Plan:**

```
packages/ui/src/components/EmptyState/EmptyState.tsx
  Props to add:
    size?: "sm" | "md" | "lg"          // controls spacing and text size
    illustration?: ReactNode            // large SVG/image above title
    variant?: "default" | "search" | "error" | "offline" | "permission"
    // Each variant provides default icon, title, description

  Visual improvements:
    - Increase icon container: 64x64 circle with brand.subtle background
    - Icon size: 32px in 64px container
    - Title: h5 (16px semibold), primary text
    - Description: body2 (14px), tertiary text, centered
    - Add subtle dashed border or illustration area
    - Vertical padding: spacing[8] top+bottom for breathing room

  Built-in preset variants (use when no custom content):
    "search"     → SearchX icon + "No results found"
    "error"      → AlertCircle icon + "Something went wrong"
    "offline"    → WifiOff icon + "No internet connection"
    "permission" → ShieldOff icon + "Access required"
    "empty"      → Inbox icon + "Nothing here yet"

apps/example: show all 5 preset variants in a carousel or expand/collapse
```

---

### Issue 10 — AnimatedList Re-renders Whole List

**Root cause analysis:**
- In `apps/example/app/index.tsx`, `renderItem` is an inline anonymous arrow function.
- Every parent re-render creates a new `renderItem` reference → FlashList re-renders all visible cells.
- Fix is in the example (wrap with `useCallback`), not in the component itself.

**Plan:**

```
apps/example/app/index.tsx
  - Extract AnimatedList's renderItem to useCallback:
    const renderContact = useCallback(({ item, index }: any) => (
      <ListItem
        onPress={() => toast.info(`Opening ${item.name}`)}
        divider={index < CONTACTS.length - 1}
      >
        <Avatar initials={item.initials} size="sm" />
        <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
          <Text style={{ fontWeight: "600", color: t.color.text.primary }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: t.color.text.secondary }}>{item.role}</Text>
        </View>
      </ListItem>
    ), [t, toast]);

    <AnimatedList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      estimatedItemSize={60}
      renderItem={renderContact}
    />

packages/ui/src/components/AnimatedList/AnimatedList.tsx
  - Ensure keyExtractor defaults to item.id or item.key
  - Add overrideItemLayout prop forwarding to FlashList
  - Document: "Always pass useCallback renderItem and stable keyExtractor"
```

---

### Issue 11 — SegmentedControl: Wrong Style / Broken Layout

**Root cause analysis (code review):**
- Container renders options as flex row, indicator as `Animated.View` before the Pressables (in DOM order = behind them ✓)
- Bug 1: Indicator `translateX` starts from position `0` but container may have horizontal padding from `segmentedControl.container` styles → indicator is offset
- Bug 2: Indicator height = full container height (36px) but needs to be `height - 4px` with `top: 2` to respect container padding
- Bug 3: On first render `containerWidth = 0` so `segmentWidth = 0/N = 0` → indicator jumps on layout
- Bug 4: The component tokens `segmentedControl.container` likely includes `paddingHorizontal` that shifts option texts but not the absolutely-positioned indicator

**Plan:**

```
packages/ui/src/components/SegmentedControl/SegmentedControl.tsx

  Fix indicator positioning:
    const INDICATOR_INSET = 3; // px inset from container edge

    indicatorStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value + INDICATOR_INSET }],
      width: segmentWidth - INDICATOR_INSET * (index === 0 || index === last ? 1 : 0),
    }))

    <Animated.View
      style={[
        segmentedControl.item.active,
        {
          position: "absolute",
          top: INDICATOR_INSET,
          bottom: INDICATOR_INSET,
          left: 0,
          width: segmentWidth,
          borderRadius: (height - INDICATOR_INSET * 2) / 2,
        },
        indicatorStyle,
      ]}
    />

  Fix initial render flash:
    const [ready, setReady] = useState(false);
    onLayout: setReady(true) after first measurement
    Only render indicator when ready=true

  Add icon support:
    options: string[] | { label: string; icon?: ReactNode }[]

  Add size variants: "sm" (32px) | "md" (36px) | "lg" (44px)

  Add scrollable mode for many options (ScrollView container)
```

---

### Issue 12 — OTPInput: Can't Delete / Can't Focus Filled Cell / Ugly Border

**Root cause analysis (code review):**
- **Can't delete:** Example has `value="123"` hardcoded and `onChange={() => {}}` → value never changes. Fix: use useState in example.
- **Can't focus filled cell:** By design — single hidden TextInput receives all key events. Tapping any cell calls `handlePress` which focuses the hidden input. User cannot click cell index 1 to position cursor there. This is intentional for security (prevents partial code editing) but poor UX.
- **Border bug:** Line 104: `isFilled ? otpInput.cell.borderColor : otpInput.cell.borderColor` — BOTH branches use the SAME token. Filled cells have no different border color even though code tries to differentiate. This is a bug.
- **Visual:** `flex: 1, aspectRatio: 0.8` makes cells rectangular not square. Cells should be square (aspectRatio: 1) or use fixed width/height from tokens.

**Plan:**

```
apps/example/app/index.tsx
  Fix example:
    const [otpValue, setOtpValue] = useState("123");
    <OTPInput length={6} value={otpValue} onChange={setOtpValue}
      onComplete={(code) => toast.success(`OTP: ${code}`)} />

packages/headless/src/tokens/component.ts (otpInput tokens)
  Add:
    cell: {
      ...existing,
      filledBorderColor: color.brand.default,    // NEW — filled cell shows brand border
      filledBg: color.brand.subtle,              // optional tinted bg when filled
    }

packages/ui/src/components/OTPInput/OTPInput.tsx

  Fix border color bug (line 104):
    borderColor: isFocused
      ? otpInput.cell.focused.borderColor        // brand color, thicker
      : isFilled
        ? otpInput.cell.filledBorderColor        // brand color, normal
        : otpInput.cell.borderColor              // gray default

  Fix aspect ratio: change { flex: 1, aspectRatio: 0.8 } → { flex: 1, aspectRatio: 1 }

  Fix border width: focused cell: borderWidth: 2, default: borderWidth: 1

  Add cursor blink animation on focused empty cell:
    When isCurrentFocus && !char: show animated blinking | cursor

  Consider adding:
    mask?: boolean  // show • instead of digit (for PIN)
    variant?: "box" | "underline" | "circle"
    focusable cells: allow tapping specific cell to position (for edit use cases, not OTP)
```

---

### Issue 13 — DatePicker: Use BottomSheet + Custom Calendar Grid

**Root cause analysis:**
- iOS: uses `@react-native-community/datetimepicker` with `display="spinner"` in a Modal → shows native iOS drum-roll picker (seen in screenshot)
- User wants a custom calendar grid UI like the Vietnamese app screenshot: month grid, day cells, "Hủy" / "Chọn" buttons, Gregorian + Lunar calendar toggle
- This requires replacing the iOS Modal+spinner with a custom BottomSheet containing a calendar grid component

**Plan:**

```
New component: packages/ui/src/components/DatePicker/CalendarGrid.tsx
  - Props: month, year, selectedDate, onSelectDate, minDate, maxDate
  - Renders: 7-column grid (Mon-Sun headers, day cells)
  - Day cell states: default, selected (brand circle), today (brand outline), disabled (opacity)
  - Month navigation: < MONTH YEAR > header with prev/next arrows
  - Animated month transition: slide left/right when changing month

New component: packages/ui/src/components/DatePicker/CalendarBottomSheet.tsx
  - BottomSheet wrapper around CalendarGrid
  - snapPoints: ["60%"] for date, ["75%"] for datetime
  - Header: icon + "Chọn ngày" title + X close button
  - Footer: "Hủy" (outline) + "Chọn" (brand solid) buttons
  - Optional: Gregorian/Lunar toggle (SegmentedControl at top)

packages/ui/src/components/DatePicker/DatePicker.tsx
  - iOS: replace Modal+DateTimePicker with CalendarBottomSheet
  - Android: keep native dialog (already fine on Android)
  - New prop: pickerStyle?: "calendar" | "spinner" | "native"
    "calendar" = custom CalendarGrid (default, new)
    "spinner" = old iOS drum-roll behavior
    "native" = @react-native-community/datetimepicker (current)

  For time mode: keep spinner style (time is hard to do with grid)
  For datetime mode: show date picker first → then time picker

Dependencies: no new deps needed (uses existing BottomSheet)
```

---

### Issue 14 — Carousel: White Text Invisible on Light Mode

**Root cause analysis:**
- Example uses colored background boxes with `color: "white"` text
- On light mode, the carousel area renders fine but the white text is very visible against solid colors — BUT the issue might be the Carousel component itself not rendering (empty white box seen in screenshot)
- The carousel box shows empty in light mode screenshot → suggests Carousel might need a height explicitly or is not rendering content properly

**Plan:**

```
packages/ui/src/components/Carousel/Carousel.tsx
  - Ensure Carousel container has flex:1 / fills parent
  - Verify pagination dots render (add showDots?: boolean, default true)
  - Add autoPlay?: boolean (default false) with autoPlayInterval?: number
  - Add renderEmpty?: ReactNode for empty data

apps/example/app/index.tsx — Carousel section:
  Use text color adaptive to background:
    renderItem={({ item }) => (
      <View style={{ flex: 1, backgroundColor: item.bg, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: item.text, fontWeight: "700", fontSize: 18 }}>{item.title}</Text>
        <Text style={{ color: item.text, opacity: 0.8, fontSize: 13 }}>{item.subtitle}</Text>
      </View>
    )}

  Use slides: [
    { bg: t.color.brand.default, text: "#fff", title: "Slide 1", subtitle: "Brand violet" },
    { bg: t.color.accent.default, text: "#1C1917", title: "Slide 2", subtitle: "Amber accent" },
    { bg: t.color.success.bg, text: t.color.success.text, title: "Slide 3", subtitle: "Success" },
  ]
```

---

### Issue 15 — Toast: Jumpy Animation

**Root cause analysis:**
- `FadeInUp.springify().damping(18).stiffness(280)` — stiffness 280 is very high → causes aggressive bounce
- When second toast appears, first toast shifts position → layout jump
- `FadeInDown` (bottom position) springs down then bounces back up → visually jarring
- Missing `layout` prop on container → items don't animate position changes when list shifts

**Plan:**

```
packages/ui/src/components/Toast/ToastItem.tsx

  Fix spring config:
    // BEFORE
    FadeInUp.springify().damping(18).stiffness(280)

    // AFTER — smooth, no bounce
    const entering = position === "top"
      ? SlideInDown.duration(280).easing(Easing.out(Easing.cubic))
      : SlideInUp.duration(280).easing(Easing.out(Easing.cubic))
    const exiting = position === "top"
      ? FadeOutUp.duration(200)
      : FadeOutDown.duration(200)

packages/ui/src/components/Toast/ToastContainer.tsx
  - Add layout={LinearTransition.duration(250)} to the container View
  - This makes existing toasts animate position smoothly when new one enters
  - Add gap between toasts: gap: 8

  - Consider: limit to 3 visible toasts, queue rest
  - Add swipe-to-dismiss on individual toast items (pan gesture left/right)
```

---

## Additional Improvements (User Requested)

---

### Glassmorphism / Glass Liquid Effect

**Plan:**

```
Dependencies to add: expo-blur (already in Expo ecosystem)

packages/tokens/src/semantic.ts
  Add glass surface tokens:
    surface: {
      ...existing,
      glass: {
        backgroundColor: "rgba(255,255,255,0.72)",    // light mode
        backdropFilter: "blur(20px)",                  // web only
        borderColor: "rgba(255,255,255,0.3)",
        borderWidth: 1,
      }
    }

  darkTokens.surface.glass:
    backgroundColor: "rgba(15,23,42,0.72)"
    borderColor: "rgba(255,255,255,0.08)"

New component: packages/ui/src/components/GlassCard/GlassCard.tsx
  - Uses expo-blur BlurView as background
  - intensity prop (0-100)
  - tint?: "light" | "dark" | "default"
  - Renders children over blurred background
  - Border: 1px rgba white/transparent

  Usage:
    <GlassCard intensity={60} style={{ padding: 16, borderRadius: 16 }}>
      <Text>Glassmorphism content</Text>
    </GlassCard>

Apply glass to:
  - ToastItem: glass background instead of solid dark
  - BottomSheet handle area: glass header
  - FloatingHeader: sticky scroll header with blur background
  - Card: add glass variant prop → <Card variant="glass">
```

---

### Color System Upgrade

**Issues:**
- Current brand violet is strong/saturated — heavy on eyes over long sessions
- No gradient support in tokens
- Missing `surface.glass` tokens

**Plan:**

```
packages/tokens/src/primitive.ts
  Refine violet palette: add violet-550 (#7C48E8) as new brand.default
    — softer than 600 (#7C3AED), more modern

  Add gradient tokens:
    gradient: {
      brand: ["#8B5CF6", "#6D28D9"],          // violet gradient
      accent: ["#F59E0B", "#D97706"],          // amber gradient
      success: ["#34D399", "#059669"],         // green gradient
      sunrise: ["#F59E0B", "#EF4444"],         // warm hero gradient
      ocean: ["#60A5FA", "#7C3AED"],           // cool hero gradient
    }

New utility: packages/ui/src/components/LinearGradient/LinearGradient.tsx
  - Wraps expo-linear-gradient
  - Accepts gradient token keys or raw colors array
  - Usage: <LinearGradient gradient="brand" style={{ flex: 1 }} />
```

---

### Component Tree (Missing)

**Plan:**

```
New file: docs/COMPONENT_TREE.md

Structure:
  RNUI Component Tree
  ├── Layout
  │   ├── Box
  │   ├── Stack (VStack / HStack)
  │   ├── Grid
  │   └── Paper
  ├── Typography
  │   └── Typography (display/h1-h6/body1-2/caption/overline/label/code)
  ├── Forms
  │   ├── Button (solid/outline/ghost/destructive/accent + sizes)
  │   ├── ButtonGroup
  │   ├── Input (text/email/search/number)
  │   ├── PasswordInput
  │   ├── TextArea
  │   ├── Select (single/multi/searchable/async)
  │   ├── Checkbox (checked/unchecked/indeterminate)
  │   ├── Switch (sm/md/lg)
  │   ├── RadioGroup + RadioItem (vertical/horizontal)
  │   ├── Slider (horizontal/vertical/range)
  │   ├── OTPInput (box/underline/circle variants)
  │   ├── DatePicker (calendar/spinner/native modes)
  │   ├── Autocomplete
  │   ├── SegmentedControl
  │   ├── ToggleButton
  │   ├── FormField (label/helper/error)
  │   └── FormGroup
  ├── Data Display
  │   ├── Avatar + AvatarGroup (xs-2xl, status dots)
  │   ├── Badge (default/brand/success/warning/error/info)
  │   ├── Card (default/outlined/glass variants)
  │   ├── Chip
  │   ├── List + ListItem + ListItemText
  │   ├── AnimatedList (FlashList-backed)
  │   ├── Table
  │   ├── Timeline
  │   ├── Rating
  │   ├── LinearProgress / CircularProgress
  │   ├── Skeleton / SkeletonCard / SkeletonText / SkeletonListItem
  │   │   └── Presets: SkeletonProfile / SkeletonMedia / SkeletonForm / SkeletonGrid
  │   └── EmptyState (default/search/error/offline/permission)
  ├── Navigation
  │   ├── AppBar
  │   ├── BottomNavigation
  │   ├── Tabs
  │   ├── Breadcrumbs
  │   ├── Pagination
  │   └── Menu
  ├── Feedback & Overlays
  │   ├── Toast / ToastContainer
  │   ├── Snackbar
  │   ├── Alert
  │   ├── Dialog
  │   ├── Modal
  │   ├── BottomSheet
  │   ├── Drawer
  │   ├── Popover / Popper
  │   ├── Tooltip
  │   └── Fab / SpeedDial
  ├── Media
  │   ├── Image (RnImage)
  │   ├── ImageList
  │   └── Carousel
  ├── Specialized
  │   ├── Accordion
  │   ├── Stepper
  │   ├── GlassCard (NEW)
  │   └── LinearGradient (NEW)
  └── Primitives
      ├── Pressable (feedbackMode: opacity/scale/scaleSubtle/highlight)
      ├── Link
      ├── Icon
      └── Typography
```

---

## Execution Order (Recommended)

### Phase 1 — Critical UX Fixes (do first)
1. OTPInput bug fix (border color + example state) — **30 min**
2. Toast animation smooth fix — **1h**
3. AnimatedList useCallback fix in example — **15 min**
4. SegmentedControl layout fix — **2h**

### Phase 2 — Component Enhancements
5. Input focus speed + FormField semantic padding — **3h**
6. TextArea counter position fix — **1h**
7. Typography system extension — **3h**
8. Checkbox + Radio + Divider showcase additions — **1h**

### Phase 3 — New Features
9. Skeleton presets + SkeletonGroup — **4h**
10. EmptyState visual upgrade + presets — **3h**
11. Select FlashList + async/load-more — **6h**
12. Slider vertical + custom thumb + range — **8h**
13. DatePicker calendar grid rebuild — **16h**

### Phase 4 — Polish & Visual
14. Glassmorphism GlassCard component — **4h**
15. Gradient token system + LinearGradient component — **2h**
16. Carousel fix + adaptive text colors — **2h**
17. Color system refinement — **3h**

### Phase 5 — Documentation
18. Component tree docs — **2h**
19. Update UI_REPORT.md with completed items — **1h**

---

**Total estimated effort: ~62h across 18 tasks**
