# UI Package — Refactor & Demo Plan

> **Goal**: Tất cả components phải: clean code, tách nhỏ sub-components, đủ demo variants
> **Reference pattern**: `Accordion` và `Alert` — xem đây là chuẩn để follow

---

## Chuẩn pattern (lấy từ Accordion + Alert)

```
ComponentName/
  ComponentName.tsx       ← Orchestrator: chỉ wiring context + layout, không có logic nặng
  ComponentNamePart1.tsx  ← Sub-component 1 (1 responsibility)
  ComponentNamePart2.tsx  ← Sub-component 2
  context.ts              ← React context (nếu cần share state giữa sub-components)
  types.ts                ← Tất cả interfaces/types tập trung tại đây
  index.ts                ← Export tất cả public API
  __tests__/
    ComponentName.test.tsx
```

**Quy tắc bắt buộc:**
- Main file chỉ import sub-components, không render DOM trực tiếp ngoại trừ wrapper `<View>`
- Mỗi sub-component `< 80 lines`
- `types.ts` export tất cả props interfaces
- `context.ts` khi có state chia sẻ giữa cha–con
- Mỗi sub-component là `const` function (không dùng `export default`)
- Props không truyền inline style objects

---

## Trạng thái hiện tại

| Nhóm | Đã đúng chuẩn | Cần refactor |
|---|---|---|
| Tốt (split + types.ts) | Accordion, Alert | — |
| Tốt (split nhưng thiếu types.ts) | DatePicker, Input, Toast, FormField | — |
| Monolithic (1 file lớn) | — | 30 components bên dưới |

---

## Phase 1 — Overlays & Navigation (Ưu tiên cao — user tương tác nhiều nhất)

### 1.1 · Dialog

**Hiện tại**: `Dialog.tsx` (1 file, ~138 lines, đã có AnimatedOverlay)
**Vấn đề**: Inline styles trong JSX, title/content/actions cùng 1 file

**Target structure**:
```
Dialog/
  Dialog.tsx            ← Root: Modal wrapper + AnimatedOverlay
  DialogTitle.tsx       ← Typography h5, padding, close icon slot
  DialogContent.tsx     ← Scrollable content area
  DialogActions.tsx     ← Flex row, button group, wrap handling
  types.ts
  index.ts
```

**Variants cần demo**:
- Basic (title + content + actions)
- No title
- No actions (info only)
- Full width
- Long scrollable content
- Destructive confirm (via AlertDialog)
- Custom title node (with back button)

---

### 1.2 · Modal

**Hiện tại**: `Modal.tsx` (monolithic, 1 file)
**Target structure**:
```
Modal/
  Modal.tsx             ← Root: backdrop + positioning
  ModalContent.tsx      ← Rounded container, padding token
  ModalHeader.tsx       ← Title + subtitle slot
  ModalFooter.tsx       ← Action buttons area
  ModalCloseButton.tsx  ← X button, absolute positioned
  types.ts
  index.ts
```

**Variants cần demo**:
- Centered vs bottom sheet style
- With/without close button
- Full screen
- Transparent backdrop
- Nested modal

---

### 1.3 · BottomSheet

**Hiện tại**: `BottomSheet.tsx` (monolithic, complex gesture logic)
**Target structure**:
```
BottomSheet/
  BottomSheet.tsx           ← Root: gesture coordinator + context provider
  BottomSheetHandle.tsx     ← Drag handle indicator (pill)
  BottomSheetContent.tsx    ← ScrollView-wrapped content area
  BottomSheetBackdrop.tsx   ← Animated semi-transparent overlay
  context.ts                ← snap points, translateY SharedValue
  types.ts
  index.ts
```

**Variants cần demo**:
- Simple (1 snap point — full height)
- Multi snap (50% / 90%)
- With ScrollView content
- No handle
- Non-dismissible
- Stacked (bottom sheet inside bottom sheet)

---

### 1.4 · Drawer

**Hiện tại**: `Drawer.tsx` (monolithic)
**Target structure**:
```
Drawer/
  Drawer.tsx            ← Root: context + Modal wrapper
  DrawerContent.tsx     ← Animated slide-in panel
  DrawerHeader.tsx      ← Title + close action
  DrawerFooter.tsx      ← Action area
  DrawerBackdrop.tsx    ← Opacity animated backdrop
  types.ts
  index.ts
```

**Variants cần demo**:
- Left / Right / Top / Bottom anchor
- Permanent (no backdrop)
- With header + footer
- Nested navigation drawer
- Mini drawer (icon-only mode)

---

### 1.5 · Tabs

**Hiện tại**: `Tabs.tsx` (monolithic — tab bar + panels + indicator + scroll all in 1 file)
**Target structure**:
```
Tabs/
  Tabs.tsx              ← Root: context provider (activeTab, onChange)
  TabList.tsx           ← Horizontal scrollable tab bar
  Tab.tsx               ← Individual tab button (pressable + animated indicator)
  TabPanel.tsx          ← Content panel (shown when active)
  TabIndicator.tsx      ← Animated underline/pill indicator
  context.ts            ← activeTab, onChange, variant state
  types.ts
  index.ts
```

**Variants cần demo**:
- Line (underline indicator)
- Pill (filled background indicator)
- Scrollable tabs (many tabs)
- Centered tabs
- Full width tabs
- Icon + label
- Icon only
- Disabled tab
- Controlled vs uncontrolled

---

### 1.6 · Menu

**Hiện tại**: `Menu.tsx` (monolithic)
**Target structure**:
```
Menu/
  Menu.tsx              ← Root: context + Popper wrapper
  MenuItem.tsx          ← Pressable item (icon + label + shortcut)
  MenuDivider.tsx       ← Horizontal separator
  MenuGroup.tsx         ← Labeled group of items
  MenuItemIcon.tsx      ← Leading/trailing icon slot
  types.ts
  index.ts
```

**Variants cần demo**:
- Simple list
- With icons
- With keyboard shortcuts
- With dividers
- With groups
- Disabled items
- Checked/selected items
- Submenu
- Context menu (long press trigger)

---

### 1.7 · BottomNavigation

**Hiện tại**: `BottomNavigation.tsx` (monolithic)
**Target structure**:
```
BottomNavigation/
  BottomNavigation.tsx            ← Root: safe area + context
  BottomNavigationAction.tsx      ← Icon + label + active indicator
  BottomNavigationBadge.tsx       ← Dot/count badge on action
  context.ts                      ← activeIndex, onChange
  types.ts
  index.ts
```

**Variants cần demo**:
- 3 / 4 / 5 tabs
- Icon only
- Icon + label
- With badge
- Active indicator: filled / underline / none
- Floating style (rounded, elevated)

---

### 1.8 · AppBar

**Hiện tại**: `AppBar.tsx` (monolithic)
**Target structure**:
```
AppBar/
  AppBar.tsx            ← Root: safe area + elevation + scroll behavior
  AppBarTitle.tsx       ← Center title + subtitle
  AppBarLeading.tsx     ← Back button / menu icon slot
  AppBarTrailing.tsx    ← Action icons slot (1–3 icons)
  types.ts
  index.ts
```

**Variants cần demo**:
- Default (title centered)
- Large title (iOS style)
- With back button
- With trailing actions
- Transparent over image
- Scroll-hide (hides on scroll down)
- Scroll-reveal (appears on scroll up)
- Dense

---

## Phase 2 — Form Controls (Tương tác trực tiếp với data)

### 2.1 · Select

**Hiện tại**: `Select.tsx` (monolithic — trigger + dropdown + options + search in 1 file)
**Target structure**:
```
Select/
  Select.tsx            ← Root: context + disclosure
  SelectTrigger.tsx     ← Pressable input-like display
  SelectDropdown.tsx    ← Animated list container (Popper-based)
  SelectOption.tsx      ← Individual option row (icon + label + check)
  SelectSearchInput.tsx ← Optional search input inside dropdown
  SelectPlaceholder.tsx ← Empty/loading state inside dropdown
  context.ts            ← value, onValueChange, open state
  types.ts
  index.ts
```

**Variants cần demo**:
- Single select
- Multi select (chips)
- With search
- With groups
- Disabled
- With icons
- Custom option render
- Loading state
- Empty state
- Native picker (iOS/Android fallback)

---

### 2.2 · Autocomplete

**Hiện tại**: `Autocomplete.tsx` (monolithic)
**Target structure**:
```
Autocomplete/
  Autocomplete.tsx          ← Root: input + suggestions coordination
  AutocompleteInput.tsx     ← Text input with clear button
  AutocompleteSuggestions.tsx ← Animated dropdown list
  AutocompleteOption.tsx    ← Individual suggestion row
  AutocompleteChip.tsx      ← Selected item chip (multi mode)
  context.ts
  types.ts
  index.ts
```

**Variants cần demo**:
- Single value
- Multiple values (chips)
- Free text (creatable)
- Async suggestions (with loading)
- Custom option render
- Grouped options
- Highlighted match text

---

### 2.3 · Slider

**Hiện tại**: `Slider.tsx` (monolithic)
**Target structure**:
```
Slider/
  Slider.tsx            ← Root: gesture coordinator
  SliderTrack.tsx       ← Background + filled track
  SliderThumb.tsx       ← Draggable knob (Reanimated + GestureHandler)
  SliderMark.tsx        ← Step mark dots
  SliderValueLabel.tsx  ← Floating tooltip above thumb
  SliderRange.tsx       ← Range (two thumbs) variant
  types.ts
  index.ts
```

**Variants cần demo**:
- Single value
- Range (two thumbs)
- With marks
- With value label (always / on drag)
- Disabled
- Vertical
- Custom color
- Step increments
- Custom thumb

---

### 2.4 · OTPInput

**Hiện tại**: `OTPInput.tsx` (monolithic)
**Target structure**:
```
OTPInput/
  OTPInput.tsx          ← Root: focus management + context
  OTPCell.tsx           ← Single digit cell (focused/filled/error states)
  OTPSeparator.tsx      ← Dash / dot between cell groups
  context.ts
  types.ts
  index.ts
```

**Variants cần demo**:
- 4 / 6 digits
- With separator (XXX-XXX)
- Numeric only / alphanumeric
- Error state
- Success/verified state
- Secure (dots)
- Autofill from SMS

---

### 2.5 · Checkbox / Radio / Switch

**Hiện tại**: 3 separate monolithic files

**Checkbox target structure**:
```
Checkbox/
  Checkbox.tsx          ← Pressable + animated check
  CheckboxIcon.tsx      ← Animated SVG checkmark / minus (indeterminate)
  CheckboxLabel.tsx     ← Optional label text
  CheckboxGroup.tsx     ← Group context (vertical/horizontal)
  types.ts
  index.ts
```

**Radio target structure**:
```
Radio/
  Radio.tsx             ← Individual radio option
  RadioIcon.tsx         ← Animated filled circle
  RadioLabel.tsx        ← Option label
  RadioGroup.tsx        ← Group: context, value, onChange
  types.ts
  index.ts
```

**Switch already ok** — small component, can keep as single file with `SwitchThumb.tsx` extracted.

**Variants cần demo (Checkbox)**:
- Checked / Unchecked / Indeterminate
- Disabled
- With label (left / right)
- Error state
- Group vertical / horizontal
- Custom color

**Variants cần demo (Radio)**:
- Group of 3+ options
- Horizontal layout
- Disabled option
- Error group
- Custom icon

---

### 2.6 · Rating

**Hiện tại**: `Rating.tsx` (monolithic)
**Target structure**:
```
Rating/
  Rating.tsx            ← Root: value + gesture coordinator
  RatingStar.tsx        ← Animated star (empty/half/filled)
  RatingLabel.tsx       ← Value label (optional)
  types.ts
  index.ts
```

**Variants cần demo**:
- 5 stars (default)
- 10 stars
- Half star precision
- Read-only
- Disabled
- Custom icon (heart, thumbs)
- With label
- Sizes: sm / md / lg

---

## Phase 3 — Data Display

### 3.1 · Table

**Hiện tại**: `Table.tsx` (monolithic — header/body/rows/cells all in 1 file)
**Target structure**:
```
Table/
  Table.tsx             ← Root: scroll wrapper + context
  TableHead.tsx         ← Sticky header section
  TableBody.tsx         ← Scrollable body section
  TableRow.tsx          ← Row with striped/hover support
  TableCell.tsx         ← Cell (th/td logic, align, padding)
  TableSortLabel.tsx    ← Sort icon + interaction for column headers
  TablePagination.tsx   ← Page controls (reuses Pagination)
  context.ts            ← sortColumn, sortDirection, selectedRows
  types.ts
  index.ts
```

**Variants cần demo**:
- Basic (3 columns, 5 rows)
- Striped rows
- Hoverable rows
- Selectable rows (checkbox)
- Sortable columns
- Sticky header
- Dense
- With pagination
- Empty state
- Loading state (Skeleton rows)
- Fixed column widths

---

### 3.2 · List

**Hiện tại**: `List.tsx` (monolithic — các ListItem* export từ 1 file)
**Target structure**:
```
List/
  List.tsx              ← Root: container
  ListItem.tsx          ← Row container (pressable or static)
  ListItemLeading.tsx   ← Avatar / Icon slot (left)
  ListItemContent.tsx   ← Primary + secondary text (flex: 1)
  ListItemTrailing.tsx  ← Action / Icon / Value slot (right)
  ListDivider.tsx       ← Separator line
  ListSubheader.tsx     ← Section header label
  types.ts
  index.ts
```

**Variants cần demo**:
- Simple text list
- With avatar
- With icon
- With trailing action (chevron / switch / checkbox)
- Multi-line (primary + secondary)
- With subheaders
- With dividers
- Draggable (reorder)
- Swipeable (actions)

---

### 3.3 · Timeline

**Hiện tại**: `Timeline.tsx` (monolithic)
**Target structure**:
```
Timeline/
  Timeline.tsx          ← Root: vertical/horizontal orientation
  TimelineItem.tsx      ← Single step container
  TimelineConnector.tsx ← Line between items
  TimelineDot.tsx       ← Circle indicator (filled/outlined/icon)
  TimelineContent.tsx   ← Text/nodes on one side
  TimelineOppositeContent.tsx ← Date/label on opposite side
  types.ts
  index.ts
```

**Variants cần demo**:
- Left aligned
- Right aligned
- Alternating (left-right)
- With icons in dots
- Filled / outlined dots
- Colors: success / error / warning
- Loading/pending item

---

### 3.4 · Stepper

**Hiện tại**: `Stepper.tsx` (monolithic)
**Target structure**:
```
Stepper/
  Stepper.tsx           ← Root: step management context
  Step.tsx              ← Individual step container
  StepIcon.tsx          ← Number / check / error circle
  StepLabel.tsx         ← Title + subtitle
  StepContent.tsx       ← Animated expandable content (vertical stepper)
  StepConnector.tsx     ← Line between steps
  context.ts            ← activeStep, completed steps map
  types.ts
  index.ts
```

**Variants cần demo**:
- Horizontal (3 steps)
- Vertical (with expandable content)
- Non-linear (any step clickable)
- Error step
- Optional step
- Custom icons
- Mobile (dots only)
- Alternative label (below icon)

---

### 3.5 · Carousel

**Hiện tại**: `Carousel.tsx` (monolithic)
**Target structure**:
```
Carousel/
  Carousel.tsx          ← Root: gesture + index management
  CarouselItem.tsx      ← Individual slide wrapper
  CarouselDots.tsx      ← Pagination dots indicator
  CarouselNavigation.tsx← Prev/Next arrow buttons
  CarouselProgress.tsx  ← Linear progress indicator (alt to dots)
  context.ts            ← activeIndex, totalItems, goTo
  types.ts
  index.ts
```

**Variants cần demo**:
- Full width images
- Cards (peek next/prev)
- Dots indicator
- Arrow navigation
- Auto-play
- Vertical scroll
- Loop / no loop
- Lazy image loading

---

### 3.6 · Pagination

**Hiện tại**: `Pagination.tsx` (monolithic)
**Target structure**:
```
Pagination/
  Pagination.tsx        ← Root: page calculation logic
  PaginationItem.tsx    ← Individual page button
  PaginationEllipsis.tsx← "..." indicator
  PaginationNavButton.tsx ← Prev/Next chevron button
  types.ts
  index.ts
```

**Variants cần demo**:
- Basic (5 pages)
- Many pages (with ellipsis)
- Large / small size
- Outlined / text / filled variant
- Disabled prev/next at boundaries
- Custom prev/next icons
- Controlled vs uncontrolled

---

## Phase 4 — Notification & Feedback

### 4.1 · Snackbar

**Hiện tại**: `Snackbar.tsx` (monolithic)
**Target structure**:
```
Snackbar/
  Snackbar.tsx          ← Root: positioning + animation (slide in/out)
  SnackbarContent.tsx   ← Message + action button
  SnackbarIcon.tsx      ← Optional leading icon
  types.ts
  index.ts
```

**Variants cần demo**:
- Bottom center (default)
- Bottom left / right
- Top positions
- With action button (Undo)
- With close button
- Success / Error / Warning / Info
- Auto-hide duration
- Persistent (no auto-hide)
- Queue (multiple snackbars)

---

### 4.2 · Tooltip

**Hiện tại**: `Tooltip.tsx` (monolithic)
**Target structure**:
```
Tooltip/
  Tooltip.tsx           ← Root: visibility + position logic
  TooltipContent.tsx    ← Rounded bubble with text
  TooltipArrow.tsx      ← Triangle pointer
  types.ts
  index.ts
```

**Variants cần demo**:
- All 4 placements (top/bottom/left/right)
- With arrow
- Without arrow
- Rich content (not just text)
- Controlled vs uncontrolled
- Delay open/close
- Custom style

---

### 4.3 · Popover

**Hiện tại**: `Popover.tsx` (monolithic)
**Target structure**:
```
Popover/
  Popover.tsx           ← Root: anchor + position calculation
  PopoverTrigger.tsx    ← Clones child + attaches ref/onPress
  PopoverContent.tsx    ← Animated panel (scale + fade)
  PopoverArrow.tsx      ← Optional directional arrow
  types.ts
  index.ts
```

**Variants cần demo**:
- Simple text
- Rich content (form inside popover)
- Top / Bottom / Left / Right placement
- With arrow
- Trigger: press / long-press
- Close on outside tap

---

## Phase 5 — Visual Components

### 5.1 · Avatar

**Hiện tại**: `Avatar.tsx` (monolithic — likely 1 file for image/fallback/group)
**Target structure**:
```
Avatar/
  Avatar.tsx            ← Root: size + shape token lookup
  AvatarImage.tsx       ← Image with onError fallback trigger
  AvatarFallback.tsx    ← Initials text / placeholder icon
  AvatarBadge.tsx       ← Online/offline dot indicator
  AvatarGroup.tsx       ← Stacked row with +N overflow
  types.ts
  index.ts
```

**Variants cần demo**:
- Image
- Initials fallback
- Icon fallback
- Sizes: xs / sm / md / lg / xl
- Shapes: circle / rounded / square
- With badge (online / offline / busy)
- Group of 3–6 with overflow

---

### 5.2 · Chip

**Hiện tại**: `Chip.tsx` (monolithic)
**Target structure**:
```
Chip/
  Chip.tsx              ← Root: pressable + selected state
  ChipLabel.tsx         ← Text with overflow ellipsis
  ChipAvatar.tsx        ← Small avatar on left
  ChipIcon.tsx          ← Leading icon
  ChipDeleteButton.tsx  ← X button (pressable)
  types.ts
  index.ts
```

**Variants cần demo**:
- Filled / Outlined / Ghost
- With avatar
- With leading icon
- Deletable (X button)
- Selected state
- Disabled
- Colors: all semantic colors
- Sizes: sm / md
- Chip group (filter chips)

---

### 5.3 · Badge

**Hiện tại**: `Badge.tsx` (monolithic)
**Target structure**:
```
Badge/
  Badge.tsx             ← Root: absolute positioning wrapper
  BadgeContent.tsx      ← Number/dot indicator
  types.ts
  index.ts
```

**Variants cần demo**:
- Dot (no number)
- Count (1 / 99 / 99+)
- Positions: top-right / top-left / bottom-right / bottom-left
- Colors: all semantic
- On icon
- On avatar
- Invisible (hidden but reserves space)
- Max value override

---

### 5.4 · SpeedDial

**Hiện tại**: `SpeedDial.tsx` (monolithic)
**Target structure**:
```
SpeedDial/
  SpeedDial.tsx             ← Root: open state + animation coordinator
  SpeedDialFab.tsx          ← Main FAB button (rotates on open)
  SpeedDialAction.tsx       ← Individual action (icon + tooltip)
  SpeedDialBackdrop.tsx     ← Semi-transparent click-outside overlay
  types.ts
  index.ts
```

**Variants cần demo**:
- Up direction (default)
- Down / Left / Right
- With labels
- Without labels
- Open on hover
- Custom main icon
- 2 / 3 / 4 actions
- Controlled open state

---

### 5.5 · SegmentedControl

**Hiện tại**: `SegmentedControl.tsx` (monolithic)
**Target structure**:
```
SegmentedControl/
  SegmentedControl.tsx          ← Root: value + indicator animation
  SegmentedControlItem.tsx      ← Individual option button
  SegmentedControlIndicator.tsx ← Animated sliding background
  types.ts
  index.ts
```

**Variants cần demo**:
- Text only
- Icon only
- Icon + text
- 2 / 3 / 4 / 5 options
- Disabled option
- Full width vs auto width

---

### 5.6 · ToggleButton

**Hiện tại**: `ToggleButton.tsx` (monolithic)
**Target structure**:
```
ToggleButton/
  ToggleButton.tsx       ← Individual toggle button
  ToggleButtonGroup.tsx  ← Group context (single/multiple selection)
  context.ts
  types.ts
  index.ts
```

**Variants cần demo**:
- Single selection
- Multiple selection
- Exclusive (single) vs non-exclusive
- Icon only
- Text only
- Icon + text
- Vertical group
- Disabled button in group

---

### 5.7 · Typography

**Hiện tại**: `Typography.tsx` (1 large file with all variants)
**Target structure**:
```
Typography/
  Typography.tsx        ← Root: variant → style mapping (keep as-is, already clean)
  types.ts              ← TypographyVariant type, TypographyProps interface
  index.ts
```

*Typography is already reasonable as 1 file — chỉ cần tách types.ts ra*

**Variants cần demo**:
- h1 / h2 / h3 / h4 / h5 / h6
- subtitle1 / subtitle2
- body1 / body2
- caption
- overline
- All colors (primary / secondary / error / disabled)
- Truncate (numberOfLines=1)
- Align: left / center / right

---

## Phase 6 — Progress & Loading

### 6.1 · LinearProgress

**Hiện tại**: `LinearProgress.tsx` (1 file — ok size)
**Cần thêm variants demo**:
- Determinate (0% → 100%)
- Indeterminate (animated)
- Buffer (dashed background)
- Reversed
- Rounded / Square caps
- Colors: all semantic
- Label overlay

### 6.2 · CircularProgress

**Hiện tại**: `CircularProgress.tsx` (1 file — ok size)
**Cần thêm variants demo**:
- Indeterminate (spinning)
- Determinate (with percentage)
- Sizes: xs / sm / md / lg
- Colors: all semantic
- With center label
- Track thickness variants

### 6.3 · Skeleton

**Hiện tại**: `Skeleton.tsx` (1 file)
**Cần thêm sub-component + variants demo**:
```
Skeleton/
  Skeleton.tsx          ← Base shimmer component
  SkeletonText.tsx      ← Multi-line text placeholder
  SkeletonAvatar.tsx    ← Circle placeholder
  SkeletonCard.tsx      ← Card placeholder (image + text lines)
  types.ts
  index.ts
```

**Variants cần demo**:
- Text (1 / 2 / 3 lines)
- Circle (avatar)
- Rectangle (image)
- Card composite
- Wave animation
- Pulse animation
- Dark mode

---

## Tóm tắt & Timeline

| Phase | Components | Độ phức tạp | Ghi chú |
|---|---|---|---|
| Phase 1 | Dialog, Modal, BottomSheet, Drawer, Tabs, Menu, BottomNavigation, AppBar | Cao | User tương tác nhiều nhất |
| Phase 2 | Select, Autocomplete, Slider, OTPInput, Checkbox, Radio, Rating | Cao | Form critical path |
| Phase 3 | Table, List, Timeline, Stepper, Carousel, Pagination | Trung bình | Data display |
| Phase 4 | Snackbar, Tooltip, Popover | Trung bình | Notification layer |
| Phase 5 | Avatar, Chip, Badge, SpeedDial, SegmentedControl, ToggleButton, Typography | Thấp–Trung | Visual polish |
| Phase 6 | LinearProgress, CircularProgress, Skeleton | Thấp | Loading states |

**Tổng**: ~35 components cần refactor theo pattern Accordion/Alert

---

## Checklist per component

Khi thực hiện từng component, đánh dấu done khi đạt đủ:

- [ ] File cấu trúc đúng (sub-components tách riêng)
- [ ] `types.ts` tập trung toàn bộ interfaces
- [ ] `context.ts` nếu có shared state
- [ ] Mỗi sub-component < 80 lines
- [ ] Không có inline style objects trong JSX
- [ ] `StyleSheet.create` cho tất cả static styles
- [ ] `useMemo` cho token-derived styles
- [ ] Tất cả variants được demo trong Storybook / stories
- [ ] JSDoc + `@example` trên main component
- [ ] Test file cập nhật cover các variants
