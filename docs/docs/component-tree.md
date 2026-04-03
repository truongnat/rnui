# Component Tree

RNUI ships **65+ components** across three packages. All styled components re-export the headless hooks they wrap, so you can drop down to the behavior layer at any time.

## Architecture

```
@truongdq01/tokens        Primitive → Semantic → Component tokens
       ↓
@truongdq01/headless       ThemeProvider, hooks (usePressable, useField, …)
       ↓
@truongdq01/ui             Styled components (Button, Card, …)
```

## Component Map

### Layout

| Component | Description |
|---|---|
| **Box** | Themed container with token-driven padding, margin, and color |
| **Stack** | VStack / HStack with configurable `spacing` and `divider` |
| **Grid** | Column-based responsive grid |
| **Paper** | Elevated surface with `shadow` and `radius` tokens |
| **Divider** | Horizontal or vertical separator line |

### Typography

| Component | Variants |
|---|---|
| **Typography** | `display` · `h1`–`h6` · `body1` · `body2` · `caption` · `overline` · `label` · `code` |

### Forms & Inputs

| Component | Key Props |
|---|---|
| **Button** | `variant`: solid / outline / ghost / destructive / accent · `size`: sm / md / lg · loading / disabled |
| **ButtonGroup** | Group of related buttons |
| **Input** | `leadingElement` · `trailingElement` · focus animation |
| **TextArea** | `minLines` · `maxLength` · character counter |
| **Select** | Searchable bottom-sheet picker · single / multi-select |
| **Checkbox** | Animated check / uncheck / `indeterminate` |
| **Switch** | `size`: sm / md / lg · animated track + thumb |
| **RadioGroup** | `direction`: horizontal / vertical · `RadioItem` composable |
| **Slider** | Horizontal · animated thumb · marks · range display |
| **OTPInput** | Configurable length · auto-focus management |
| **DatePicker** | iOS spinner + Android native · time / date / datetime modes |
| **Autocomplete** | Filtered suggestions with keyboard navigation |
| **SegmentedControl** | Animated indicator · scrollable · multi-option |
| **ToggleButton** | Exclusive or multi-select button group |
| **FormField** | Label + helper text + error message wrapper |
| **FormControl** | Validation context + disabled / required propagation |

### Data Display

| Component | Notes |
|---|---|
| **Avatar** | 6 sizes (xs–2xl) · image / initials / icon · status dot |
| **AvatarGroup** | Overlapping stack · `max` overflow count |
| **Badge** | 6 color variants · icon support · dot / count modes |
| **Card** | Default / outlined variants · composable header / content / actions |
| **Chip** | Deletable · `onDelete` callback · icon support |
| **List** / **ListItem** | Dense mode · dividers · swipe actions · leading / trailing elements |
| **AnimatedList** | FlashList-backed · enter / exit / layout animations |
| **Table** | Sortable columns · pagination · row selection |
| **Timeline** | Vertical step indicator · active / completed / pending states |
| **Rating** | Configurable max · half-star support · controlled / uncontrolled |
| **LinearProgress** | Determinate / indeterminate · color variants |
| **CircularProgress** | Determinate / indeterminate · size / thickness |
| **Skeleton** | Shimmer animation · presets: Text / Card / ListItem / Profile / Media / Form / Grid / Table |
| **EmptyState** | Title + description + icon + action button |

### Navigation

| Component | Notes |
|---|---|
| **AppBar** | Sticky top bar · leading / trailing actions · title |
| **BottomNavigation** | Animated indicator · icon + label · badge support |
| **Tabs** | Scrollable / fixed · animated underline indicator |
| **Breadcrumbs** | Separator customization · collapsed overflow |
| **Pagination** | Numbered pages · prev / next · boundary / sibling control |
| **Menu** | Overlay menu · dividers · icon items · keyboard navigation |

### Feedback & Overlays

| Component | Notes |
|---|---|
| **Toast** / **ToastContainer** | 4 variants (success / error / warning / info) · position top / bottom · auto-dismiss · live region |
| **Snackbar** | Bottom-anchored · action button · auto-dismiss |
| **Alert** | Inline feedback · icon · closable · 4 severity levels |
| **Dialog** | Modal dialog · title / content / actions · backdrop dismiss |
| **Modal** | Full overlay · animated entry / exit · scroll support |
| **BottomSheet** | Snap points · drag handle · backdrop · gesture-driven |
| **Drawer** | Side panel · left / right · overlay or push mode |
| **Popover** | Anchored overlay · arrow · auto-placement |
| **Popper** | Low-level positioning engine for Popover / Tooltip |
| **Tooltip** | Hover / press trigger · auto-placement · accessibility hint |
| **Fab** | Floating action button · extended variant · shadow |
| **SpeedDial** | Expandable FAB · radial / linear action layout |

### Media

| Component | Notes |
|---|---|
| **Image** (RnImage) | Aspect ratio · placeholder · error fallback |
| **ImageList** | Masonry / grid layout · gap control |
| **Carousel** | Horizontal pager · loop mode · pagination dots · auto-play ready |

### Specialized

| Component | Notes |
|---|---|
| **Accordion** | Animated expand / collapse · `accessibilityState.expanded` |
| **Stepper** | Numeric increment / decrement · min / max / step |
| **GlassCard** | Glassmorphism surface · expo-blur BlurView (optional) · translucent fallback |
| **Gradient** | Token-driven gradients · expo-linear-gradient (optional) · 6 presets |

### Primitives

| Component | Notes |
|---|---|
| **Pressable** | `feedbackMode`: scale / scaleSubtle / opacity / highlight / none · haptic feedback |
| **Link** | Themed anchor · opens URL via Linking · accessibility role |
| **Icon** | Lucide icon wrapper · size + color from tokens |

## Headless Hooks

All behavior primitives live in `@truongdq01/headless` and can be used without the styled layer.

| Hook | Purpose |
|---|---|
| `useTheme` | Access current theme, color scheme, brand switching |
| `useTokens` | Shortcut to `theme.tokens` (SemanticTokens) |
| `useComponentTokens` | Resolved per-component token recipes |
| `useIsDark` | Boolean dark-mode check |
| `useActiveBrand` / `useBrandSwitch` | Multi-brand runtime switching |
| `usePressable` | Gesture + animated style + accessibility for any touchable |
| `useDisclosure` | open / close / toggle state machine |
| `useField` | Form field validation, touched, error state |
| `useCheckbox` | Checked / unchecked / indeterminate logic |
| `useSwitch` | On / off toggle with accessibility |
| `useRadioGroup` | Single-select group with keyboard nav |
| `useSlider` | Pan gesture → value mapping, step snapping |
| `useSelect` | Searchable option list, open/close, selection |
| `useRating` | Star selection with half-star and controlled/uncontrolled |
| `useTabs` | Tab index, content switching |
| `useToggleGroup` | Multi-select button group logic |
| `useAccordion` | Expand / collapse with animation readiness |
| `useModal` | Open / close with backdrop and escape handling |
| `useDrawer` | Side panel state with gesture support |
| `useBottomSheet` | Snap point management, drag gesture, backdrop |
| `useCarousel` | Scroll position, pagination, loop logic |
| `useOTPInput` | Hidden input focus routing, cell state |
| `useSegmentedControl` | Selected index, indicator position |
| `useTable` | Sort, paginate, row selection |
| `useMenu` | Open / close, item focus |
| `useDatePicker` | Date state, mode switching, presets |
| `useTimeline` | Step state, active / completed tracking |
| `useSkeleton` | Shimmer shared value |
| `usePagination` | Page range, boundary, sibling computation |
| `useAutocomplete` | Filter, select, keyboard navigation |
| `useAlert` | Visibility, auto-dismiss timer |
| `useBottomNavigation` | Active tab, badge state |
| `useStepper` | Step state, increment/decrement |
| `useScrollHeader` | Scroll-aware header opacity / transform |
| `useListItem` | Swipe gesture, press state |
| `useReduceMotionEnabled` | OS-level reduce-motion preference |
| `usePersistedColorScheme` | AsyncStorage-backed theme persistence |

## Token System

| Layer | Package | Purpose |
|---|---|---|
| **Primitive** | `@truongdq01/tokens` | Raw values: colors, spacing, radius, typography, gradients |
| **Semantic** | `@truongdq01/tokens` | Design intent: `color.brand.default`, `shadow.md`, `text.xl` |
| **Component** | `@truongdq01/tokens` | Per-component recipes: `buttonTokens`, `cardTokens`, etc. |
| **Motion** | `@truongdq01/tokens` | Spring configs, durations, easing curves, press feedback |
| **Brand** | `@truongdq01/tokens` | `defineBrand()` — runtime color palette switching |
